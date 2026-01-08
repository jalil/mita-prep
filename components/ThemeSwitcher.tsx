"use client";

import React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const modes = [
        { id: "light", label: "Light", icon: Sun },
        { id: "dark", label: "Dark", icon: Moon },
    ] as const;

    return (
        <div className="flex bg-accent/50 p-1 rounded-xl items-center gap-1 border border-border/50">
            {modes.map((mode) => (
                <button
                    key={mode.id}
                    onClick={() => setTheme(mode.id)}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200",
                        theme === mode.id
                            ? "bg-white dark:bg-zinc-800 text-primary shadow-sm scale-[1.02]"
                            : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-white/50 dark:hover:bg-zinc-800/50"
                    )}
                >
                    <mode.icon size={14} />
                    <span className="hidden lg:inline">{mode.label}</span>
                </button>
            ))}
        </div>
    );
}
