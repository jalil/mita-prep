import React, { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, Lock, Highlighter } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckpointGateProps {
    onUnlock: () => void;
    index: number;
    hasHighlight: boolean;
}

export function CheckpointGate({ onUnlock, index, hasHighlight }: CheckpointGateProps) {
    const [summary, setSummary] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);

    const handleTrue = () => {
        onUnlock();
    };

    const handleFalse = () => {
        setShowFailureMessage(true);
        // Optional: shake animation or similar feedback could go here
    };

    const handleRetry = () => {
        setIsExpanded(false);
        setShowFailureMessage(false);
        // User goes back to read, then clicks the gate again
    };

    // Simple validation: just ensure they typed something meaningful (~10 chars)
    const isValid = summary.trim().length > 10;

    const handleSubmit = () => {
        if (isValid) {
            onUnlock();
        }
    };

    if (!hasHighlight) {
        return (
            <div className="my-6 flex flex-col items-center animate-in fade-in zoom-in duration-300 opacity-75">
                <div className="w-full h-px bg-border mb-4 relative">
                    <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white dark:bg-zinc-900 px-3 text-xs font-bold text-gray-300 uppercase tracking-widest">
                        Checkpoint {index}
                    </div>
                </div>

                <div className="flex items-center gap-2 text-gray-400 bg-gray-100 dark:bg-zinc-800 px-4 py-2 rounded-full text-sm font-medium cursor-not-allowed">
                    <Lock size={14} />
                    <span>Highlight a key sentence to unlock</span>
                    <Highlighter size={14} className="ml-1 text-yellow-500" />
                </div>
            </div>
        );
    }

    if (!isExpanded) {
        // Minimal state before interaction
        return (
            <div className="my-6 flex flex-col items-center animate-in fade-in zoom-in duration-300">
                <div className="w-full h-px bg-border mb-4 relative">
                    <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white dark:bg-zinc-900 px-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Checkpoint {index}
                    </div>
                </div>

                <button
                    onClick={() => setIsExpanded(true)}
                    className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                    <HelpCircle size={16} />
                    <span>Answer question to continue...</span>
                </button>
            </div>
        )
    }

    return (
        <div className="my-8 mx-auto max-w-lg bg-card border border-indigo-100 dark:border-indigo-900/50 rounded-xl p-5 shadow-lg animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <HelpCircle size={20} />
                </div>
                <h3 className="font-bold text-foreground">Comprehension Check</h3>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                To unlock the next paragraph, briefly summarize <strong>what just happened</strong> or what the <strong>main idea</strong> was.
            </p>

            <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Type your summary here..."
                className="w-full h-24 p-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
                autoFocus
            />

            <div className="mt-4 flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={!isValid}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all",
                        isValid
                            ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:scale-105"
                            : "bg-gray-100 dark:bg-zinc-800 text-gray-400 cursor-not-allowed"
                    )}
                >
                    <span>Continue Reading</span>
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}
