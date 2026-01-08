"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getModule, Module } from "@/lib/data";
import { getPhaseConfig } from "@/lib/phases";
import { markWeekComplete, recordMistake, clearMistake, isWeekComplete, logAttempt } from "@/lib/progress";
import { PassageViewer } from "@/components/PassageViewer";
import { InputArea } from "@/components/AnswerEngine";
import { InterviewBridge } from "@/components/InterviewBridge";
import { AlertCircle, Lightbulb, Clock, CheckCircle2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useXP } from "@/components/providers/XPProvider";
import { useAuth } from "@/components/providers/AuthProvider";
import { useSound } from "@/hooks/useSound";

export default function ModulePage() {
    const params = useParams();
    const id = Number(params?.id);
    const { user } = useAuth();
    const { addXP } = useXP();
    const { playSound } = useSound();

    const [activePassageIndex, setActivePassageIndex] = useState(0);
    const [isPassageDropdownOpen, setIsPassageDropdownOpen] = useState(false);
    const [module, setModule] = useState<Module | undefined>(undefined);
    const [showCopyWarning, setShowCopyWarning] = useState(false);
    const [showInterview, setShowInterview] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
    const [checkedQuestions, setCheckedQuestions] = useState<{ [key: string]: boolean }>({});
    const [isCompleted, setIsCompleted] = useState(false);

    // State for Exam Mode
    const [isExamMode, setIsExamMode] = useState(false);

    // Initial check and subscription to progress
    useEffect(() => {
        if (!user) return;
        setIsCompleted(isWeekComplete(user.id, id));

        const handleUpdate = () => setIsCompleted(isWeekComplete(user.id, id));
        window.addEventListener("progress-updated", handleUpdate);
        return () => window.removeEventListener("progress-updated", handleUpdate);
    }, [id, user]);

    // Load module data
    useEffect(() => {
        if (id) {
            const mod = getModule(id);
            setModule(mod);
            setActivePassageIndex(0); // Reset to first passage on module change
            setSelectedOptions({}); // Reset for new module
            setCheckedQuestions({});
        }
    }, [id]);

    const handleOptionSelect = (questionId: string, option: string, isCorrect: boolean) => {
        // Prevent re-selection if already checked
        if (checkedQuestions[questionId]) return;

        setSelectedOptions(prev => ({ ...prev, [questionId]: option }));
        setCheckedQuestions(prev => ({ ...prev, [questionId]: true }));

        if (user) {
            logAttempt(user.id, id, questionId, isCorrect);
        }

        if (!isCorrect) {
            if (user) recordMistake(user.id, id, questionId);
            playSound("incorrect");
        } else {
            if (user) clearMistake(user.id, id, questionId);
            playSound("correct");
            addXP(15); // Award XP for correct answer
        }
    };

    const phase = getPhaseConfig(id || 1);

    // Timer Logic (Phase 3 OR Exam Mode)
    useEffect(() => {
        // Enable timer if Phase 3 or Exam Mode is active
        const shouldEnableTimer = phase.enableTimer || isExamMode;

        // Start timer if enabled and not already running
        if (shouldEnableTimer && timeLeft === null) {
            const duration = isExamMode ? 10 : (phase.timerDurationMinutes || 10);
            setTimeLeft(duration * 60);
        } else if (!shouldEnableTimer && !isExamMode) {
            // Reset if turned off (and not in exam mode which forces it)
            // Actually, let's keep it simple: if exam mode toggled ON, force reset to 10 mins?
        }

        // If Exam Mode is toggled ON, force reset timer to 10 mins if not already set by exam mode
        if (isExamMode && timeLeft === null) {
            setTimeLeft(600);
        }

        if (timeLeft !== null && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(prev => (prev ? prev - 1 : 0)), 1000);
            return () => clearInterval(timer);
        }
    }, [phase.enableTimer, phase.timerDurationMinutes, timeLeft, isExamMode]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleCopyAlert = () => {
        setShowCopyWarning(true);
        setTimeout(() => setShowCopyWarning(false), 3000);
    };

    if (!module) return <div className="p-8">Loading Module...</div>;

    // Normalize passages (Handle both new array structure and legacy single structure)
    // @ts-ignore - Temporary ignore for migration
    const passages = module.passages || (module.passage ? [{ passage: module.passage, questions: module.questions }] : []);
    const activeData = passages[activePassageIndex];

    if (!activeData) return <div>Data Error: No passage found.</div>;

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background">
            {/* Module Header */}
            <header className="h-16 border-b border-border bg-white dark:bg-zinc-900 flex items-center justify-between px-6 shrink-0 z-10">
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "px-2.5 py-1 text-xs font-bold rounded uppercase tracking-wide transition-colors",
                        isCompleted
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-primary/10 text-primary"
                    )}>
                        Week {module.id}
                    </div>
                    <h1 className="font-bold text-lg">{module.title}</h1>

                    {/* Passage Dropdown (Only show if > 1 passage) */}
                    {passages.length > 1 && (
                        <div className="relative ml-6">
                            <button
                                onClick={() => setIsPassageDropdownOpen(!isPassageDropdownOpen)}
                                className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md transition-all"
                            >
                                Day {activePassageIndex + 1}
                                <ChevronDown size={16} />
                            </button>

                            {isPassageDropdownOpen && (
                                <div className="absolute top-full left-0 mt-1 w-32 bg-white dark:bg-zinc-800 border border-border rounded-md shadow-lg py-1 z-50">
                                    {passages.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setActivePassageIndex(idx);
                                                setIsPassageDropdownOpen(false);
                                            }}
                                            className={cn(
                                                "w-full text-left px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                                                activePassageIndex === idx ? "font-bold text-primary" : "text-gray-600 dark:text-gray-400"
                                            )}
                                        >
                                            Day {idx + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                </div>

                <div className="flex items-center gap-4">
                    {/* Exam Mode Toggle */}
                    <div className="flex items-center gap-2 mr-4 border-r border-border pr-4">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Exam Mode</span>
                        <button
                            onClick={() => {
                                setIsExamMode(!isExamMode);
                                // Reset timer when toggling
                                if (!isExamMode) setTimeLeft(600);
                                else setTimeLeft(null);
                            }}
                            className={cn(
                                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                                isExamMode ? "bg-red-500" : "bg-gray-200 dark:bg-zinc-700"
                            )}
                        >
                            <span
                                className={cn(
                                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                    isExamMode ? "translate-x-6" : "translate-x-1"
                                )}
                            />
                        </button>
                    </div>

                    {(phase.enableTimer || isExamMode) && timeLeft !== null && (
                        <div className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-full font-mono font-bold text-sm",
                            timeLeft < 300 ? "bg-red-100 text-red-600 animate-pulse" : "bg-gray-100 text-gray-700"
                        )}>
                            <Clock size={16} />
                            {formatTime(timeLeft)}
                        </div>
                    )}
                    <div className="text-sm font-medium text-gray-500">
                        Phase: {isExamMode ? 'Exam Simulation' : (phase.showHintBox ? 'Foundation' : 'Precision')}
                    </div>
                </div>
            </header>

            {/* Main Workspace */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left: Reading Passage (Scrollable) */}
                <div className="w-1/2 p-6 overflow-hidden flex flex-col relative border-r border-border bg-white dark:bg-black/20">
                    <PassageViewer
                        title={activeData.passage.title}
                        content={activeData.passage.content}
                        onCopyAttempt={handleCopyAlert}
                        vocabulary={module.vocabulary}
                        mainIdeaHint={module.mainIdeaHint}
                        hideHints={isExamMode}
                    />

                    {/* Copy Warning Toast */}
                    {showCopyWarning && (
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 text-sm font-bold animate-in fade-in slide-in-from-top-4 z-50">
                            <AlertCircle size={16} />
                            NO COPYING ALLOWED!
                        </div>
                    )}
                </div>

                <div className="w-1/2 flex flex-col h-full bg-white dark:bg-zinc-900">

                    {/* Score Header (Sticky) */}
                    <div className="p-4 border-b border-border bg-gray-50 dark:bg-zinc-800 flex items-center justify-between">
                        <div>
                            <h2 className="font-bold text-sm text-gray-500 uppercase tracking-wide">Current Score</h2>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {activeData.questions ? activeData.questions.filter(q => selectedOptions[q.id] === q.correctAnswer).length : 0}
                                    <span className="text-gray-400 text-sm font-normal">
                                        /{activeData.questions ? activeData.questions.length : 0}
                                    </span>
                                </span>
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                    ({activeData.questions && activeData.questions.length > 0
                                        ? Math.round((activeData.questions.filter(q => selectedOptions[q.id] === q.correctAnswer).length / activeData.questions.length) * 100)
                                        : 0}%)
                                </span>
                            </div>
                        </div>
                        {isCompleted && (
                            <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                                <CheckCircle2 size={12} />
                                Completed
                            </div>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-8">

                        {/* Phase 1 Hint Box */}
                        {phase.showHintBox && !isExamMode && (
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 text-blue-800 dark:text-blue-300">
                                <div className="flex items-center gap-2 font-bold mb-2">
                                    <Lightbulb size={18} />
                                    <span>Main Idea Hint</span>
                                </div>
                                <p className="text-sm">
                                    {module.mainIdeaHint || "Focus on the author's argument. Identify the core conflict."}
                                </p>
                            </div>
                        )}

                        {/* Questions Loop */}
                        {activeData.questions && activeData.questions.map((q, idx) => (
                            <div key={q.id} className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-bold text-gray-600 shrink-0 mt-0.5">
                                        {idx + 1}
                                    </span>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                            {q.type === 'paraphrase' ? 'Paraphrase Challenge' : 'Comprehension Question'}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{q.text}</p>

                                        {/* Render Options for MCQ types (inference, detail, vocab) */}
                                        {(q.type === 'inference' || q.type === 'detail' || q.type === 'vocab') && q.options && (
                                            <div className="mt-4 space-y-2">
                                                {q.options.map((opt, i) => {
                                                    const isSelected = selectedOptions[q.id] === opt;
                                                    const isChecked = checkedQuestions[q.id];
                                                    const isCorrect = q.correctAnswer === opt;

                                                    return (
                                                        <label
                                                            key={i}
                                                            onClick={() => !isChecked && handleOptionSelect(q.id, opt, isCorrect)}
                                                            className={cn(
                                                                "flex items-center gap-3 p-3 rounded-lg border transition-all group",
                                                                !isChecked ? "hover:bg-accent cursor-pointer border-border" : "cursor-default",
                                                                isChecked && isCorrect && "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
                                                                isChecked && isSelected && !isCorrect && "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
                                                                isChecked && !isSelected && isCorrect && "border-green-200 dark:border-green-800 opacity-70"
                                                            )}
                                                        >
                                                            <div className={cn(
                                                                "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                                                                isSelected ? "border-primary bg-primary" : "border-gray-300",
                                                                isChecked && isCorrect && "border-green-500 bg-green-500",
                                                                isChecked && isSelected && !isCorrect && "border-red-500 bg-red-500"
                                                            )}>
                                                                {(isSelected || (isChecked && isCorrect)) && (
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                                                )}
                                                            </div>
                                                            <span className={cn(
                                                                "text-sm",
                                                                isChecked && isCorrect && "text-green-700 dark:text-green-300 font-medium",
                                                                isChecked && isSelected && !isCorrect && "text-red-700 dark:text-red-300"
                                                            )}>
                                                                {opt}
                                                            </span>
                                                            {isChecked && isCorrect && <CheckCircle2 size={14} className="text-green-500 ml-auto" />}
                                                            {isChecked && isSelected && !isCorrect && <AlertCircle size={14} className="text-red-500 ml-auto" />}
                                                        </label>
                                                    );
                                                })}
                                                {checkedQuestions[q.id] && selectedOptions[q.id] !== q.correctAnswer && (
                                                    <div className="mt-2 text-xs text-red-600 font-medium flex items-center gap-1.5 px-1">
                                                        <AlertCircle size={12} />
                                                        <span>Incorrect. Added to Mistakes Review.</span>
                                                    </div>
                                                )}
                                                {checkedQuestions[q.id] && selectedOptions[q.id] === q.correctAnswer && (
                                                    <div className="mt-2 text-xs text-green-600 font-medium flex items-center gap-1.5 px-1">
                                                        <CheckCircle2 size={12} />
                                                        <span>Correct!</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Answer Input - ONLY for paraphrase questions */}
                                {q.type === 'paraphrase' && (
                                    <div className="pl-9">
                                        <InputArea
                                            onSubmit={(ans) => {
                                                console.log("Submitted:", ans);
                                                playSound("correct");
                                                addXP(30); // Higher reward for writing
                                            }}
                                            minWordCount={10}
                                            onPasteAttempt={handleCopyAlert}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Interview Bridge Section (End of Module) */}
                        <hr className="border-border my-8" />

                        <div className="flex justify-center py-8">
                            <button
                                onClick={() => {
                                    setShowInterview(!showInterview);
                                }}
                                className={cn(
                                    "px-6 py-3 font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2",
                                    showInterview
                                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        : "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                                )}
                            >
                                <div className={cn("p-1 rounded-full", showInterview ? "bg-gray-300" : "bg-white/20")}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                        <line x1="12" x2="12" y1="19" y2="22" />
                                    </svg>
                                </div>
                                {showInterview ? "Hide Interview Bridge" : "Show Interview Bridge"}
                            </button>
                        </div>

                        {showInterview && (
                            <div className="animate-in fade-in slide-in-from-top-4 duration-500 pb-12 space-y-8">
                                <InterviewBridge topic={module.theme} />

                                <div className="flex justify-center">
                                    {isCompleted ? (
                                        <div className="flex items-center gap-2 px-6 py-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-bold animate-in zoom-in spin-in-1">
                                            <CheckCircle2 size={20} />
                                            Module Completed
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                if (user) markWeekComplete(user.id, id);
                                                setIsCompleted(true); // Immediate UI update
                                                playSound("levelUp"); // Major reward sound
                                                addXP(100); // Massive XP for finishing week
                                            }}
                                            className="px-8 py-3 bg-primary text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                                        >
                                            <CheckCircle2 size={20} />
                                            Mark Module Complete
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div >
    );
}
