"use client";

import React, { useState, useEffect } from "react";
import { Send, AlertCircle, FileWarning } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputAreaProps {
    onSubmit: (text: string) => void;
    minWordCount?: number;
    placeholder?: string;
    onPasteAttempt: () => void;
}

export function InputArea({
    onSubmit,
    minWordCount = 5,
    placeholder = "Type your answer here...",
    onPasteAttempt
}: InputAreaProps) {
    const [text, setText] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isValid, setIsValid] = useState(false);

    const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;

    // Validation Logic
    useEffect(() => {
        // 1. Starts with capital letter
        const startsWithCapital = /^[A-Z]/.test(text);
        // 2. Ends with period/punctuation
        const endsWithPunctuation = /[.!?]$/.test(text.trim());
        // 3. Min word count
        const meetsWordCount = wordCount >= minWordCount;

        if (text.length === 0) {
            setIsValid(false);
            setError(null);
            return;
        }

        if (!startsWithCapital) {
            setError("Must start with a capital letter.");
            setIsValid(false);
        } else if (!meetsWordCount) {
            setError(`Minimum ${minWordCount} words required.`);
            setIsValid(false);
        } else if (!endsWithPunctuation) {
            setError("Must end with a period, question mark, or exclamation point.");
            setIsValid(false);
        } else {
            setError(null);
            setIsValid(true);
        }
    }, [text, minWordCount, wordCount]);

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        onPasteAttempt();
    };

    const handleSubmit = () => {
        if (isValid) {
            onSubmit(text);
            setText("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="space-y-3">
            <div className="relative">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onPaste={handlePaste}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={cn(
                        "w-full min-h-[120px] p-4 rounded-xl border bg-background resize-none focus:outline-none focus:ring-2 transition-all",
                        error ? "border-red-300 focus:ring-red-200" : "border-border focus:ring-primary/20 focus:border-primary"
                    )}
                />
                <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                    {wordCount} words
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm">
                    {error && (
                        <div className="flex items-center gap-1.5 text-red-500 animate-in fade-in slide-in-from-left-2 duration-300">
                            <AlertCircle size={14} />
                            <span>{error}</span>
                        </div>
                    )}
                    {!error && text.length > 0 && isValid && (
                        <div className="text-green-600 text-xs font-medium">✨ Perfect sentence structure!</div>
                    )}
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={!isValid}
                    className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-200",
                        isValid
                            ? "bg-primary text-primary-foreground hover:bg-blue-600 shadow-md transform hover:-translate-y-0.5"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    )}
                >
                    Submit Answer
                    <Send size={16} />
                </button>
            </div>
        </div>
    );
}
