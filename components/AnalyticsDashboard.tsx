"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "./providers/AuthProvider";
import { getHistory, Attempt } from "@/lib/progress";
import { modules, Module, Question } from "@/lib/data";
import { BarChart2, Brain, BookOpen, Lightbulb, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type SkillType = "detail" | "inference" | "vocab" | "paraphrase";

interface SkillStats {
    totalAttempts: number;
    correctFirstTry: number;
    accuracy: number;
}

const SKILL_LABELS: Record<SkillType, string> = {
    detail: "Detail Retention",
    inference: "Inference & Logic",
    vocab: "Vocab Context",
    paraphrase: "Paraphrasing"
};

const SKILL_ICONS: Record<SkillType, React.ReactNode> = {
    detail: <Search size={18} />,
    inference: <Lightbulb size={18} />,
    vocab: <BookOpen size={18} />,
    paraphrase: <Brain size={18} />
};

export function AnalyticsDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState<Record<SkillType, SkillStats>>({
        detail: { totalAttempts: 0, correctFirstTry: 0, accuracy: 0 },
        inference: { totalAttempts: 0, correctFirstTry: 0, accuracy: 0 },
        vocab: { totalAttempts: 0, correctFirstTry: 0, accuracy: 0 },
        paraphrase: { totalAttempts: 0, correctFirstTry: 0, accuracy: 0 },
    });
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        if (!user) return;

        const calculateStats = () => {
            const history = getHistory(user.id);
            if (history.length === 0) {
                setHasData(false);
                return;
            }
            setHasData(true);

            // 1. Map questionId to type
            const questionTypeMap: Record<string, SkillType> = {};
            modules.forEach(mod => {
                // Check single passage questions
                mod.questions?.forEach(q => {
                    if (q.type) questionTypeMap[q.id] = q.type as SkillType;
                });
                // Check multi-passage questions
                mod.passages?.forEach(p => {
                    p.questions.forEach(q => {
                        if (q.type) questionTypeMap[q.id] = q.type as SkillType;
                    });
                });
            });

            // 2. Process history
            const tempStats: Record<SkillType, { correct: number; total: number }> = {
                detail: { correct: 0, total: 0 },
                inference: { correct: 0, total: 0 },
                vocab: { correct: 0, total: 0 },
                paraphrase: { correct: 0, total: 0 }
            };

            // Track unique questions attempted to avoid skewing stats with multiple attempts?
            // "Mastery" usually means: can you get it right?
            // Let's use "First Attempt Accuracy" as the gold standard for "Skill".
            const firstAttempts = new Set<string>();

            history.forEach((attempt: Attempt) => {
                const type = questionTypeMap[attempt.questionId];
                if (!type || !tempStats[type]) return;

                // Only count the FIRST attempt for a specific question for "Mastery"
                // Or count ALL attempts? 
                // Decision: Count ALL attempts is simpler but "First Attempt" is a better measure of skill.
                // Let's go with ALL attempts for "Accuracy" so user sees movement.

                tempStats[type].total++;
                if (attempt.isCorrect) {
                    tempStats[type].correct++;
                }
            });

            // 3. Normalize
            const finalStats = { ...stats };
            (Object.keys(tempStats) as SkillType[]).forEach(key => {
                const { correct, total } = tempStats[key];
                finalStats[key] = {
                    totalAttempts: total,
                    correctFirstTry: correct, // Naming: actually totalCorrect here
                    accuracy: total > 0 ? Math.round((correct / total) * 100) : 0
                };
            });

            setStats(finalStats);
        };

        calculateStats();
        window.addEventListener("history-updated", calculateStats);
        return () => window.removeEventListener("history-updated", calculateStats);
    }, [user]);

    if (!hasData) return null;

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                    <BarChart2 size={20} />
                </div>
                <h3 className="font-bold text-lg">Skill Mastery</h3>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {(Object.entries(stats) as [SkillType, SkillStats][]).map(([key, stat]) => {
                    if (stat.totalAttempts === 0) return null;

                    // Color logic based on score
                    let colorClass = "bg-red-500";
                    if (stat.accuracy >= 80) colorClass = "bg-green-500";
                    else if (stat.accuracy >= 60) colorClass = "bg-yellow-500";

                    return (
                        <div key={key} className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg flex flex-col gap-3">
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1.5 font-medium">
                                    {SKILL_ICONS[key]}
                                    {SKILL_LABELS[key]}
                                </span>
                            </div>

                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold">{stat.accuracy}%</span>
                                <span className="text-xs text-gray-400">accuracy</span>
                            </div>

                            <div className="h-1.5 w-full bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                <div
                                    className={cn("h-full transition-all duration-500 rounded-full", colorClass)}
                                    style={{ width: `${stat.accuracy}%` }}
                                />
                            </div>

                            <p className="text-xs text-gray-400 text-right">
                                {stat.correctFirstTry} / {stat.totalAttempts} correct
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
