"use client";

import { useCallback } from "react";

// Short, pleasant "ding" for correct answers (Base64 MP3 or WAV)
const CORRECT_SOUND = "data:audio/wav;base64,UklGRnoGAABXQVZ[...truncated_for_brevity...]";
// I will use a real (short) base64 string for a "coin" sound here.
// Since I cannot upload files, I will use a very short synthetic wav string or just a placeholder logic 
// that creates an oscillator if possible, or a real base64 string if I can find one in my training data.
// For robustness, let's use the Web Audio API to synthesize sounds on the fly. It's cleaner and requires no assets.

export function useSound() {
    const playSound = useCallback((type: "correct" | "incorrect" | "levelUp") => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;

            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            const now = ctx.currentTime;

            if (type === "correct") {
                // High pitched "Ding!" (Sine wave, C6 -> E6 appregio-ish)
                osc.type = "sine";
                osc.frequency.setValueAtTime(523.25, now); // C5
                osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.1); // C6
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
            } else if (type === "incorrect") {
                // Low pitched "Buzz" (Sawtooth, descending)
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.linearRampToValueAtTime(100, now + 0.3);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0.001, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
            } else if (type === "levelUp") {
                // Fanfare (Major triad)
                // Note 1
                const osc1 = ctx.createOscillator();
                const gain1 = ctx.createGain();
                osc1.connect(gain1);
                gain1.connect(ctx.destination);
                osc1.frequency.value = 523.25; // C5
                gain1.gain.setValueAtTime(0.1, now);
                gain1.gain.linearRampToValueAtTime(0, now + 0.4);
                osc1.start(now);
                osc1.stop(now + 0.4);

                // Note 2
                const osc2 = ctx.createOscillator();
                const gain2 = ctx.createGain();
                osc2.connect(gain2);
                gain2.connect(ctx.destination);
                osc2.frequency.value = 659.25; // E5
                gain2.gain.setValueAtTime(0.1, now + 0.1);
                gain2.gain.linearRampToValueAtTime(0, now + 0.5);
                osc2.start(now + 0.1);
                osc2.stop(now + 0.5);

                // Note 3
                const osc3 = ctx.createOscillator();
                const gain3 = ctx.createGain();
                osc3.connect(gain3);
                gain3.connect(ctx.destination);
                osc3.frequency.value = 783.99; // G5
                gain3.gain.setValueAtTime(0.1, now + 0.2);
                gain3.gain.linearRampToValueAtTime(0, now + 0.8);
                osc3.start(now + 0.2);
                osc3.stop(now + 0.8);
            }

        } catch (e) {
            console.error("Audio playback error:", e);
        }
    }, []);

    return { playSound };
}
