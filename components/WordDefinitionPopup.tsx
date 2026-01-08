import React, { useEffect, useState } from "react";
import { Volume2, X, Loader2, BookOpen, WifiOff, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WordDefinitionPopupProps {
    word: string;
    position: { x: number; y: number };
    onClose: () => void;
    offlineDefinition?: string;
}

interface DefinitionData {
    phonetic?: string;
    audio?: string;
    meanings: {
        partOfSpeech: string;
        definitions: { definition: string }[];
    }[];
    isOffline?: boolean;
}

export function WordDefinitionPopup({ word, position, onClose, offlineDefinition }: WordDefinitionPopupProps) {
    const [data, setData] = useState<DefinitionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchDefinition = async () => {
            if (!word) return;

            // Priority 1: Use provided offline definition
            if (offlineDefinition) {
                setData({
                    meanings: [{
                        partOfSpeech: "Curated Vocabulary",
                        definitions: [{ definition: offlineDefinition }]
                    }],
                    isOffline: true
                });
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(false);
            try {
                // Remove punctuation
                const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
                const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`);
                if (!res.ok) throw new Error("Not found");
                const json = await res.json();

                const entry = json[0];
                const audio = entry.phonetics?.find((p: any) => p.audio)?.audio;

                setData({
                    phonetic: entry.phonetic,
                    audio: audio,
                    meanings: entry.meanings.slice(0, 2) // Limit to top 2 meanings
                });
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchDefinition();
    }, [word, offlineDefinition]);

    const playAudio = () => {
        if (data?.audio) {
            new Audio(data.audio).play();
        }
    };

    // Calculate style to keep it on screen (simple logic)
    // We assume positioning is handled somewhat by parent, but let's add some constraints
    // Actually, fixed position based on viewport coordinates is easiest for a popup
    const style: React.CSSProperties = {
        top: position.y + 20, // slightly below cursor
        left: Math.min(position.x - 100, window.innerWidth - 320), // Prevent going off right edge
        position: "fixed",
        zIndex: 50
    };

    return (
        <div style={style} className="w-80 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-border p-4 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-xl font-bold capitalize text-foreground flex items-center gap-2">
                        {word}
                        {data?.audio && (
                            <button
                                onClick={playAudio}
                                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-indigo-500 transition-colors"
                            >
                                <Volume2 size={18} />
                            </button>
                        )}
                    </h3>
                    {data?.phonetic && (
                        <span className="text-xs font-mono text-gray-500">{data.phonetic}</span>
                    )}
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <X size={18} />
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-4 text-indigo-500">
                    <Loader2 className="animate-spin" />
                </div>
            ) : error ? (
                <div className="text-sm text-gray-500 text-center py-2">
                    Could not find definition.
                </div>
            ) : (
                <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
                    {data?.isOffline && (
                        <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md mb-2">
                            <CheckCircle2 size={12} />
                            <span>Verified Course Vocabulary</span>
                        </div>
                    )}

                    {data?.meanings.map((m, i) => (
                        <div key={i} className="text-sm">
                            <span className="font-bold text-gray-400 italic mr-2">{m.partOfSpeech}</span>
                            <span className="text-gray-700 dark:text-gray-300">
                                {m.definitions[0].definition}
                            </span>
                        </div>
                    ))}

                    {!data?.isOffline && (
                        <div className="pt-2 border-t border-border mt-2">
                            <a
                                href={`https://www.google.com/search?q=define+${word}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-indigo-500 hover:underline flex items-center gap-1"
                            >
                                <BookOpen size={12} />
                                <span>More details</span>
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
