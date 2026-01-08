"use client";

import React from "react";
import { useXP } from "./providers/XPProvider";
import { Zap, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export function GamificationHeader() {
    const { xp, level } = useXP();

    // Calculate progress to next level
    // Level L starts at 100 * (L-1)^2 XP
    // Level L+1 starts at 100 * L^2 XP
    const currentLevelStartXP = 100 * Math.pow(level - 1, 2);
    const nextLevelStartXP = 100 * Math.pow(level, 2);
    const progress = ((xp - currentLevelStartXP) / (nextLevelStartXP - currentLevelStartXP)) * 100;

    return (
        <div className="flex items-center gap-4 bg-slate-900/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl">
            {/* Level Badge */}
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
                        {level}
                    </span>
                </div>
                <span className="text-sm font-bold text-white hidden sm:inline">Lvl {level}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden relative">
                <motion.div
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
            </div>

            {/* XP Count */}
            <div className="flex items-center gap-1 text-xs font-mono text-cyan-400">
                <Zap className="w-3 h-3 fill-current" />
                <span>{xp} XP</span>
            </div>
        </div>
    );
}
