"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

interface XPContextType {
    xp: number;
    level: number;
    streak: number;
    dailyXP: number;
    dailyGoal: number;
    addXP: (amount: number) => void;
    playLevelUpEffect: () => void;
}

const XPContext = createContext<XPContextType | undefined>(undefined);

export function XPProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [xp, setXp] = useState(0);
    const [streak, setStreak] = useState(0);
    const [dailyXP, setDailyXP] = useState(0);
    const dailyGoal = 100; // Fixed daily goal

    // Simple leveling formula: Level = floor(sqrt(XP / 100)) + 1
    const level = Math.floor(Math.sqrt(xp / 100)) + 1;

    // Load Data & Handle Streak Logic
    useEffect(() => {
        if (!user) {
            setXp(0);
            setStreak(0);
            setDailyXP(0);
            return;
        }

        const xpKey = `mita_xp_${user.id}`;
        const streakKey = `mita_streak_${user.id}`;
        const dailyKey = `mita_daily_xp_${user.id}`;
        const lastActiveKey = `mita_last_active_${user.id}`;

        // Load basic generic data
        const savedXP = localStorage.getItem(xpKey);
        if (savedXP) setXp(parseInt(savedXP, 10));

        // Streak Logic
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const lastActive = localStorage.getItem(lastActiveKey);
        const savedStreak = parseInt(localStorage.getItem(streakKey) || "0", 10);
        const savedDaily = parseInt(localStorage.getItem(dailyKey) || "0", 10);

        if (lastActive === today) {
            // Already active today, just load values
            setStreak(savedStreak || 1); // If active today, streak is at least 1
            setDailyXP(savedDaily);
        } else {
            // First time active today

            // Check if yesterday
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            let newStreak = 1;
            if (lastActive === yesterdayStr) {
                newStreak = savedStreak + 1;
            } else {
                // Streak broken (or first time ever)
                newStreak = 1;
            }

            setStreak(newStreak);
            setDailyXP(0); // Reset daily XP for new day

            // Save immediately
            localStorage.setItem(streakKey, newStreak.toString());
            localStorage.setItem(dailyKey, "0");
            localStorage.setItem(lastActiveKey, today);
        }

    }, [user]);

    // Save XP changes
    useEffect(() => {
        if (user) {
            localStorage.setItem(`mita_xp_${user.id}`, xp.toString());
        }
    }, [xp, user]);

    // Save Daily XP & Streak changes
    useEffect(() => {
        if (user) {
            localStorage.setItem(`mita_daily_xp_${user.id}`, dailyXP.toString());
            // We don't need to save streak here usually unless it changes, but good to be safe
            localStorage.setItem(`mita_streak_${user.id}`, streak.toString());
        }
    }, [dailyXP, streak, user]);


    const addXP = (amount: number) => {
        if (!user) return;

        const currentLevel = Math.floor(Math.sqrt(xp / 100)) + 1;
        const newXP = xp + amount;
        const newLevel = Math.floor(Math.sqrt(newXP / 100)) + 1;

        setXp(newXP);
        setDailyXP(prev => prev + amount);

        if (newLevel > currentLevel) {
            playLevelUpEffect();
        }
    };

    const playLevelUpEffect = () => {
        console.log("LEVEL UP! 🎉");
    };

    return (
        <XPContext.Provider value={{ xp, level, streak, dailyXP, dailyGoal, addXP, playLevelUpEffect }}>
            {children}
        </XPContext.Provider>
    );
}

export function useXP() {
    const context = useContext(XPContext);
    if (context === undefined) {
        throw new Error("useXP must be used within an XPProvider");
    }
    return context;
}
