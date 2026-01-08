"use client";

import React from "react";
import { useAuth } from "./providers/AuthProvider";
import { LoginScreen } from "./LoginScreen";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-background text-foreground">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return <LoginScreen />;
    }

    return <>{children}</>;
}
