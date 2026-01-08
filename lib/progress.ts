"use client";

// Simple local storage wrapper for progress tracking

export interface Mistake {
    weekId: number;
    questionId: string;
    timestamp: number;
}

function getProgressKey(userId: string) {
    return `mita_progress_${userId}`;
}

function getMistakesKey(userId: string) {
    return `mita_mistakes_${userId}`;
}

export function getCompletedWeeks(userId: string): number[] {
    if (typeof window === "undefined" || !userId) return [];
    const stored = localStorage.getItem(getProgressKey(userId));
    if (!stored) return [];
    try {
        return JSON.parse(stored);
    } catch {
        return [];
    }
}

export function markWeekComplete(userId: string, weekId: number) {
    if (typeof window === "undefined" || !userId) return;
    const completed = getCompletedWeeks(userId);
    if (!completed.includes(weekId)) {
        const updated = [...completed, weekId];
        localStorage.setItem(getProgressKey(userId), JSON.stringify(updated));
        // Dispatch a custom event so components can react immediately
        window.dispatchEvent(new Event("progress-updated"));
    }
}

export function isWeekComplete(userId: string, weekId: number): boolean {
    return getCompletedWeeks(userId).includes(weekId);
}

// --- Mistake Tracking ---

export function getMistakes(userId: string): Mistake[] {
    if (typeof window === "undefined" || !userId) return [];
    const stored = localStorage.getItem(getMistakesKey(userId));
    if (!stored) return [];
    try {
        return JSON.parse(stored);
    } catch {
        return [];
    }
}

export function recordMistake(userId: string, weekId: number, questionId: string) {
    if (typeof window === "undefined" || !userId) return;
    const mistakes = getMistakes(userId);
    // Only add if not already there for this question
    if (!mistakes.some(m => m.weekId === weekId && m.questionId === questionId)) {
        const newMistake: Mistake = {
            weekId,
            questionId,
            timestamp: Date.now()
        };
        const updated = [...mistakes, newMistake];
        localStorage.setItem(getMistakesKey(userId), JSON.stringify(updated));
        window.dispatchEvent(new Event("mistakes-updated"));
    }
}

export function clearMistake(userId: string, weekId: number, questionId: string) {
    if (typeof window === "undefined" || !userId) return;
    const mistakes = getMistakes(userId);
    const updated = mistakes.filter(m => !(m.weekId === weekId && m.questionId === questionId));
    localStorage.setItem(getMistakesKey(userId), JSON.stringify(updated));
    localStorage.setItem(getMistakesKey(userId), JSON.stringify(updated));
    window.dispatchEvent(new Event("mistakes-updated"));
}

// --- History Tracking (for Analytics) ---

export interface Attempt {
    weekId: number;
    questionId: string;
    isCorrect: boolean;
    timestamp: number;
}

function getHistoryKey(userId: string) {
    return `mita_history_${userId}`;
}

export function getHistory(userId: string): Attempt[] {
    if (typeof window === "undefined" || !userId) return [];
    const stored = localStorage.getItem(getHistoryKey(userId));
    if (!stored) return [];
    try {
        return JSON.parse(stored);
    } catch {
        return [];
    }
}

export function logAttempt(userId: string, weekId: number, questionId: string, isCorrect: boolean) {
    if (typeof window === "undefined" || !userId) return;
    const history = getHistory(userId);

    // We append EVERY attempt to track accuracy over time
    const newAttempt: Attempt = {
        weekId,
        questionId,
        isCorrect,
        timestamp: Date.now()
    };

    const updated = [...history, newAttempt];
    localStorage.setItem(getHistoryKey(userId), JSON.stringify(updated));
    // Dispatch event for analytics updates
    window.dispatchEvent(new Event("history-updated"));
}
