"use client";

import React, { useState } from "react";
import { Mic, MicOff, PlayCircle } from "lucide-react";

interface InterviewBridgeProps {
    topic: string;
}

export function InterviewBridge({ topic }: InterviewBridgeProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

    const questions = [
        `How does the concept of ${topic} apply to your daily life?`,
        "Can you describe a time when you faced a similar dilemma?",
        "Why do you think this issue is important for future leaders?"
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
                    <Mic size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-lg">Interview Bridge</h3>
                    <p className="text-sm text-gray-500">Practice speaking clearly with varied intonation.</p>
                </div>
            </div>

            <div className="grid gap-4">
                {questions.map((q, i) => (
                    <div key={i} className="p-4 rounded-xl border border-border bg-gray-50 dark:bg-zinc-800/50 transition-all hover:bg-white hover:shadow-md">
                        <p className="font-medium text-gray-800 dark:text-gray-200 mb-4">"{q}"</p>

                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => {
                                    setActiveQuestion(i);
                                    setIsRecording(!isRecording && activeQuestion === i ? false : true);
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${isRecording && activeQuestion === i
                                        ? "bg-red-500 text-white animate-pulse"
                                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                {isRecording && activeQuestion === i ? (
                                    <>
                                        <MicOff size={14} /> Stop Recording
                                    </>
                                ) : (
                                    <>
                                        <Mic size={14} /> Record Answer
                                    </>
                                )}
                            </button>

                            {/* Fake waveform or status */}
                            {isRecording && activeQuestion === i && (
                                <div className="flex gap-1 items-center h-4">
                                    {[1, 2, 3, 4, 5].map(n => (
                                        <div key={n} className="w-1 bg-red-400 rounded-full animate-bounce" style={{ height: `${Math.random() * 100}%`, animationDelay: `${n * 0.1}s` }} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
