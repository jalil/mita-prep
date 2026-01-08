"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        const stored = localStorage.getItem("mita_theme") as Theme;
        if (stored && ["light", "dark"].includes(stored)) {
            setTheme(stored);
        }
    }, []);

    useEffect(() => {
        const html = document.documentElement;
        html.classList.remove("theme-light", "theme-dark");
        html.classList.add(`theme-${theme}`);
        localStorage.setItem("mita_theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
}
