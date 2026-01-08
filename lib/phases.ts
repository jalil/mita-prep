export type Phase = "phase1" | "phase2" | "phase3";

export interface PhaseConfig {
    showHintBox: boolean;
    enableSimilarityCheck: boolean;
    enableTimer: boolean;
    timerDurationMinutes?: number;
}

export function getPhaseConfig(weekId: number): PhaseConfig {
    // Months 1-4 (Weeks 1-17): Phase 1
    if (weekId <= 17) {
        return {
            showHintBox: true,
            enableSimilarityCheck: false,
            enableTimer: false,
        };
    }
    // Months 5-8 (Weeks 18-35): Phase 2
    else if (weekId <= 35) {
        return {
            showHintBox: false, // Hints removed
            enableSimilarityCheck: true,
            enableTimer: false,
        };
    }
    // Months 9-15 (Weeks 36-60): Phase 3
    else {
        return {
            showHintBox: false,
            enableSimilarityCheck: true,
            enableTimer: true,
            timerDurationMinutes: 60,
        };
    }
}
