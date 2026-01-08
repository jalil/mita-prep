"use client";

import React, { useState, useEffect, useRef } from "react";
import { useXP } from "./providers/XPProvider";
import { useSound } from "@/hooks/useSound";
import { getAllVocabulary, getRandomDistractors, VocabItem } from "@/lib/vocabUtils";
import { Timer, Zap, Trophy, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function BlitzGame() {
    // Game State
    const [gameState, setGameState] = useState<"menu" | "playing" | "finished">("menu");
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [currentQuestion, setCurrentQuestion] = useState<{ word: string, correct: string, options: string[] } | null>(null);
    const [streak, setStreak] = useState(0);

    // Utils
    const { addXP } = useXP();
    const { playSound } = useSound();
    const vocabPool = useRef<VocabItem[]>([]);

    useEffect(() => {
        vocabPool.current = getAllVocabulary();
    }, []);

    // Timer Logic
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameState === "playing" && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        endGame();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameState, timeLeft]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(60);
        setStreak(0);
        setGameState("playing");
        nextQuestion();
        playSound("levelUp"); // Start sound
    };

    const endGame = () => {
        setGameState("finished");
        playSound("levelUp"); // End sound
        // Award XP based on score
        const xpEarned = Math.floor(score / 2); // 500 score -> 250 XP
        addXP(xpEarned);
    };

    const nextQuestion = () => {
        const pool = vocabPool.current;
        if (pool.length === 0) return;

        const randomItem = pool[Math.floor(Math.random() * pool.length)];
        const distractors = getRandomDistractors(randomItem.definition, pool, 3);

        // Combine and shuffle options
        const options = [randomItem.definition, ...distractors].sort(() => 0.5 - Math.random());

        setCurrentQuestion({
            word: randomItem.word,
            correct: randomItem.definition,
            options: options
        });
    };

    const handleAnswer = (selectedOption: string) => {
        if (!currentQuestion) return;

        if (selectedOption === currentQuestion.correct) {
            const points = 100 + (streak * 10); // Combo bonus!
            setScore(prev => prev + points);
            setStreak(prev => prev + 1);
            playSound("correct");
        } else {
            setStreak(0);
            playSound("incorrect");
            // Penalty? Maybe. For now, just loss of streak.
        }
        nextQuestion();
    };

    if (gameState === "menu") {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-in zoom-in duration-300">
                <div className="p-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                    <Zap size={64} className="text-yellow-500" />
                </div>
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
                    VOCAB BLITZ
                </h1>
                <p className="text-gray-500 max-w-md">
                    60 Seconds. Infinite Words. How high can you score?
                    <br />
                    <span className="text-xs text-yellow-600 font-bold mt-2 block">
                        +100 pts per word • Combo Multipliers • XP Rewards
                    </span>
                </p>
                <button
                    onClick={startGame}
                    className="flex items-center gap-2 px-8 py-4 bg-primary text-white text-xl font-bold rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                    <Play fill="currentColor" />
                    START BLITZ
                </button>
            </div>
        );
    }

    if (gameState === "finished") {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-8 animate-in zoom-in duration-300">
                <div className="p-6 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <Trophy size={64} className="text-green-600" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-500">TIME'S UP!</h2>
                    <div className="text-6xl font-black text-primary mt-2">{score}</div>
                    <p className="text-sm text-gray-400 mt-2">Points Scored</p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-mono font-bold">
                    <Zap size={16} />
                    +{Math.floor(score / 2)} XP EARNED
                </div>

                <button
                    onClick={startGame}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 text-gray-800 dark:text-gray-200 font-bold rounded-lg transition-all"
                >
                    <RotateCcw size={18} />
                    Play Again
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            {/* HUD */}
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                        <Trophy size={24} className="text-yellow-600" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Score</div>
                        <div className="text-2xl font-mono font-black">{score}</div>
                    </div>
                </div>

                {/* Streak Indicator */}
                <div className={cn("text-center transition-all duration-300", streak > 2 ? "scale-110" : "scale-100")}>
                    <div className={cn("text-xs font-bold uppercase tracking-wider", streak > 2 ? "text-orange-500 animate-pulse" : "text-gray-300")}>Streak</div>
                    <div className={cn("text-3xl font-black italic", streak > 2 ? "text-orange-600" : "text-gray-200")}>
                        x{streak}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Time</div>
                        <div className={cn("text-2xl font-mono font-black", timeLeft < 10 ? "text-red-500 animate-pulse" : "")}>
                            {timeLeft}s
                        </div>
                    </div>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Timer size={24} className="text-blue-600" />
                    </div>
                </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                {currentQuestion && (
                    <motion.div
                        key={currentQuestion.word}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-border overflow-hidden"
                    >
                        <div className="p-8 text-center border-b border-border bg-gray-50 dark:bg-black/20">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{currentQuestion.word}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                            {currentQuestion.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(option)}
                                    className="p-4 text-left rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-primary/5 hover:border-primary active:bg-primary/10 transition-all duration-150 text-sm md:text-base font-medium flex items-center gap-3 group"
                                >
                                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-500 group-hover:bg-primary group-hover:text-white transition-colors text-xs font-bold shrink-0">
                                        {["A", "B", "C", "D"][idx]}
                                    </span>
                                    {option}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
