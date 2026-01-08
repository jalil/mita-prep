"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
    id: string; // For now, id is just the normalized username
    name: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "mita_current_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session on mount
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user session", e);
                localStorage.removeItem(USER_STORAGE_KEY);
            }
        }
        setIsLoading(false);
    }, []);

    const login = (username: string) => {
        if (!username.trim()) return;

        // Simple id generation: lowercase and trimmed
        const id = username.trim().toLowerCase();
        const newUser = { id, name: username.trim() };

        setUser(newUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(USER_STORAGE_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
