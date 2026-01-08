"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle, CheckCircle2, RefreshCw, ChevronRight } from "lucide-react";
import { getMistakes, clearMistake, Mistake } from "@/lib/progress";
import { modules } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function MistakesPage() {
    const [mistakes, setMistakes] = useState<Mistake[]>([]);

    useEffect(() => {
        setMistakes(getMistakes());

        const handleUpdate = () => setMistakes(getMistakes());
        window.addEventListener("mistakes-updated", handleUpdate);
        return () => window.removeEventListener("mistakes-updated", handleUpdate);
    }, []);

    const mistakeList = useMemo(() => {
        return mistakes.map(m => {
            const module = modules.find(mod => mod.id === m.weekId);
            // Handle dual passages - find the question in passages
            let questionText = "Question not found";
            let questionType = "";
            let correctAnswer = "";

            if (module) {
                const passages = module.passages || (module.passage ? [{ passage: module.passage, questions: module.questions }] : []);
                for (const p of passages) {
                    const q = p.questions?.find(quest => quest.id === m.questionId);
                    if (q) {
                        questionText = q.text;
                        questionType = q.type;
                        correctAnswer = q.correctAnswer || "";
                        break;
                    }
                }
            }

            return {
                ...m,
                moduleTitle: module?.title || `Week ${m.weekId}`,
                questionText,
                questionType,
                correctAnswer
            };
        });
    }, [mistakes]);

    const handleClear = (weekId: number, questionId: string) => {
        clearMistake(weekId, questionId);
    };

    return (
        <div className="max-w-4xl mx-auto p-8 space-y-8">
            <header className="space-y-1">
                <Link href="/" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-primary transition-colors mb-4">
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </Link>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                        <AlertCircle size={24} />
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Mistakes Review</h1>
                </div>
                <p className="text-zinc-500">Review and master the questions you struggled with.</p>
            </header>

            <div className="space-y-4">
                {mistakeList.length > 0 ? (
                    mistakeList.map((m, i) => (
                        <div key={`${m.weekId}-${m.questionId}`} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                            <span>Week {m.weekId}</span>
                                            <span>•</span>
                                            <span>{m.moduleTitle}</span>
                                        </div>
                                        <h3 className="font-semibold text-lg">{m.questionText}</h3>
                                    </div>
                                    <button
                                        onClick={() => handleClear(m.weekId, m.questionId)}
                                        className="p-2 text-zinc-400 hover:text-green-600 transition-colors"
                                        title="Mark as Mastered"
                                    >
                                        <CheckCircle2 size={20} />
                                    </button>
                                </div>

                                {m.correctAnswer && (
                                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-100 dark:border-zinc-800 text-sm">
                                        <span className="font-bold text-zinc-500 mr-2 uppercase text-[10px]">Correct Answer:</span>
                                        <span className="text-zinc-900 dark:text-zinc-100">{m.correctAnswer}</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center pt-2">
                                    <div className="text-xs text-zinc-400">
                                        Added {new Date(m.timestamp).toLocaleDateString()}
                                    </div>
                                    <Link
                                        href={`/week/${m.weekId}`}
                                        className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                                    >
                                        Return to Module
                                        <ChevronRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-20 text-center space-y-4 bg-gray-50 dark:bg-zinc-900/50 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                        <div className="inline-flex p-4 bg-green-100 text-green-600 rounded-full">
                            <CheckCircle2 size={32} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold">All caught up!</h3>
                            <p className="text-zinc-500">You have no pending mistakes to review. Keep up the great work!</p>
                        </div>
                        <Link href="/">
                            <button className="mt-4 px-6 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-bold hover:bg-zinc-50 transition-colors shadow-sm">
                                Go to Dashboard
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
