"use client";

import React, { useState } from "react";
import { GraduationCap, ArrowRight } from "lucide-react";
import { useAuth } from "./providers/AuthProvider";

export function LoginScreen() {
    const [username, setUsername] = useState("");
    const { login } = useAuth();
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedName = username.trim();

        if (!trimmedName) {
            setError("Please enter your name");
            return;
        }

        const allowedUsers = ["aio", "jalil"];
        if (!allowedUsers.includes(trimmedName.toLowerCase())) {
            setError("Access denied. Please contact administrator.");
            return;
        }

        login(trimmedName);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-zinc-800">
                <div className="flex flex-col items-center mb-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                        <GraduationCap size={40} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Mita International School Prep
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Enter your name to continue your progress
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError("");
                            }}
                            placeholder="e.g. Jalil"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                            autoFocus
                        />
                        {error && (
                            <p className="mt-2 text-sm text-red-500 font-medium">
                                {error}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20"
                    >
                        Start Learning
                        <ArrowRight size={20} />
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-gray-400">
                    Your progress is saved locally to this browser.
                </div>
            </div>
        </div>
    );
}
