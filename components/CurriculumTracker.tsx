"use client";

import React, { useEffect, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Trophy, Book, Globe, Cpu } from "lucide-react";
import { modules } from "@/lib/data";
import { getCompletedWeeks } from "@/lib/progress";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const themeConfig = {
    Ethics: { label: "Ethics & Society", color: "bg-ethics", icon: Trophy },
    Media: { label: "Media & Tech", color: "bg-media", icon: Cpu },
    Global: { label: "Global Citizenship", color: "bg-global", icon: Globe },
    Education: { label: "Education Theory", color: "bg-education", icon: Book },
};

import { useAuth } from "./providers/AuthProvider";

// ... existing imports

export function CurriculumTracker() {
    const { user } = useAuth();
    const [progressData, setProgressData] = useState<any[]>([]);

    const calculateProgress = () => {
        if (!user) return;
        const completedIds = getCompletedWeeks(user.id);

        const stats = {
            Ethics: { total: 0, completed: 0 },
            Media: { total: 0, completed: 0 },
            Global: { total: 0, completed: 0 },
            Education: { total: 0, completed: 0 },
        };

        modules.forEach(mod => {
            const themeKey = mod.theme as keyof typeof themeConfig;
            if (stats[themeKey]) {
                stats[themeKey].total++;
                if (completedIds.includes(mod.id)) {
                    stats[themeKey].completed++;
                }
            }
        });

        const data = Object.entries(themeConfig).map(([key, config]) => {
            const stat = stats[key as keyof typeof stats];
            const percentage = stat.total > 0 ? Math.round((stat.completed / stat.total) * 100) : 0;
            return {
                id: key.toLowerCase(),
                ...config,
                progress: percentage
            };
        });

        setProgressData(data);
    };

    useEffect(() => {
        if (user) {
            calculateProgress();
        }

        const handleUpdate = () => calculateProgress();
        window.addEventListener("progress-updated", handleUpdate);
        return () => window.removeEventListener("progress-updated", handleUpdate);
    }, [user]);

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-border shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Trophy className="text-yellow-500" size={20} />
                Curriculum Mastery
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {progressData.map((theme) => (
                    <div key={theme.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                                <theme.icon size={14} className="text-gray-400" />
                                {theme.label}
                            </span>
                            <span className="font-bold text-gray-900 dark:text-gray-100">{theme.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-50 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div
                                className={cn("h-full rounded-full transition-all duration-500", theme.color)}
                                style={{ width: `${theme.progress}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
