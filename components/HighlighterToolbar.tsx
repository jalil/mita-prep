import React from "react";
import { Highlighter, Eraser } from "lucide-react";
import { cn } from "@/lib/utils";

type HighlightColor = "yellow" | "green" | "pink";

interface HighlighterToolbarProps {
    onHighlight: (color: HighlightColor) => void;
    onClear: () => void;
}

export function HighlighterToolbar({ onHighlight, onClear }: HighlighterToolbarProps) {
    return (
        <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-zinc-800 border border-border rounded-lg shadow-sm">
            <div className="flex items-center gap-1 border-r border-border pr-2 mr-1">
                <span className="text-xs font-semibold text-gray-500 px-1">Paint:</span>

                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onHighlight("yellow")}
                    className="w-6 h-6 rounded-full bg-yellow-200 dark:bg-yellow-500/50 border border-yellow-300 hover:scale-110 transition-transform"
                    title="Main Idea (Yellow)"
                />
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onHighlight("green")}
                    className="w-6 h-6 rounded-full bg-green-200 dark:bg-green-500/50 border border-green-300 hover:scale-110 transition-transform"
                    title="Evidence/Fact (Green)"
                />
                <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onHighlight("pink")}
                    className="w-6 h-6 rounded-full bg-pink-200 dark:bg-pink-500/50 border border-pink-300 hover:scale-110 transition-transform"
                    title="Confusion (Pink)"
                />
            </div>

            <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={onClear}
                className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors flex items-center gap-1.5"
                title="Clear Selection"
            >
                <Eraser size={14} />
                <span className="text-xs font-medium">Clear</span>
            </button>
        </div>
    );
}
