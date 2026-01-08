"use client";

import React, { useState, useEffect } from "react";
import { AlertTriangle, ZoomIn, ZoomOut, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { HighlighterToolbar } from "./HighlighterToolbar";

import { WordDefinitionPopup } from "./WordDefinitionPopup";

interface PassageViewerProps {
    title: string;
    content: string; // HTML string
    onCopyAttempt: () => void;
    vocabulary?: { word: string, definition: string }[];
    mainIdeaHint?: string;
    hideHints?: boolean;
}

export function PassageViewer({ title, content, onCopyAttempt, vocabulary, mainIdeaHint, hideHints }: PassageViewerProps) {
    const [fontSize, setFontSize] = useState(16);

    const [definitionPopup, setDefinitionPopup] = useState<{ word: string, position: { x: number, y: number }, offlineDefinition?: string } | null>(null);
    const [highlightedParagraphs, setHighlightedParagraphs] = useState<Set<number>>(new Set());
    const contentRef = React.useRef<HTMLDivElement>(null);

    // Parse content into paragraphs
    // Robustness: Split by closing tag to keep structure, or better yet, inject IDs?
    // Simple approach: Split by </p> and rejoin with it, or just use regex to match all <p>...</p> blocks?
    // Let's try splitting by `</p>` to get chunks.
    const [paragraphs, setParagraphs] = useState<string[]>([]);

    useEffect(() => {
        // Initialize paragraphs from content prop
        const newParagraphs = content.split("</p>").filter(p => p.trim().length > 0).map(p => p + "</p>");
        setParagraphs(newParagraphs);
    }, [content]);

    const updateParagraphContent = (index: number, newHtml: string) => {
        setParagraphs(prev => {
            const newArr = [...prev];
            newArr[index] = newHtml;
            return newArr;
        });
    };

    const handleHighlight = (color: "yellow" | "green" | "pink") => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return;

        // Ensure selection is inside our content
        if (contentRef.current && !contentRef.current.contains(selection.anchorNode)) return;

        const range = selection.getRangeAt(0);
        let colorClass = "";
        if (color === "yellow") colorClass = "bg-yellow-200 dark:bg-yellow-600/40 text-black dark:text-white";
        if (color === "green") colorClass = "bg-green-200 dark:bg-green-600/40 text-black dark:text-white";
        if (color === "pink") colorClass = "bg-pink-200 dark:bg-pink-600/40 text-black dark:text-white";

        const highlightClassName = `${colorClass} px-0.5 rounded shadow-sm`;

        // Helper to wrap text in a highlight span
        const wrapTextNode = (textNode: Text, startOffset: number, endOffset: number) => {
            const span = document.createElement("span");
            span.className = highlightClassName;
            span.dataset.highlight = "true";

            const rangeToCheck = document.createRange();
            rangeToCheck.setStart(textNode, startOffset);
            rangeToCheck.setEnd(textNode, endOffset);

            try {
                rangeToCheck.surroundContents(span);
            } catch (e) {
                console.error("Failed to wrap node", e);
            }
        };

        // Recursive function to find text nodes within range
        const getTextNodes = (node: Node, range: Range, textNodes: { node: Text, start: number, end: number }[]) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const textNode = node as Text;
                if (range.intersectsNode(textNode)) {
                    let start = 0;
                    let end = textNode.length;

                    if (textNode === range.startContainer) {
                        start = range.startOffset;
                    }
                    if (textNode === range.endContainer) {
                        end = range.endOffset;
                    }

                    // Handle edge case where end < start (shouldn't happen in valid range but good to check)
                    if (start < end) {
                        textNodes.push({ node: textNode, start, end });
                    }
                }
            } else {
                // Check children
                if (range.intersectsNode(node)) {
                    for (let i = 0; i < node.childNodes.length; i++) {
                        getTextNodes(node.childNodes[i], range, textNodes);
                    }
                }
            }
        };

        const textNodesToHighlight: { node: Text, start: number, end: number }[] = [];

        // Validation: simple single-node selection
        if (range.startContainer === range.endContainer && range.startContainer.nodeType === Node.TEXT_NODE) {
            wrapTextNode(range.startContainer as Text, range.startOffset, range.endOffset);
        } else {
            // Complex selection
            const commonAncestor = range.commonAncestorContainer;
            getTextNodes(commonAncestor, range, textNodesToHighlight);

            // Process in reverse to avoid offsetting indices
            textNodesToHighlight.reverse().forEach(({ node, start, end }) => {
                wrapTextNode(node, start, end);
            });
        }

        selection.removeAllRanges();

        // ------------------------------------------------------------
        // CRITICAL FIX: Persist DOM changes to React State
        // ------------------------------------------------------------

        // Find the paragraph container(s) that were modified and update state.
        // Since a selection could span multiple paragraphs (though our split logic usually prevents cross-block selection issues if display blocks are used),
        // we should check the startNode's container.
        // For robustness, we can just find *all* affected paragraphs. 
        // But simplifying: usually user selects within one block.
        // If selection spans blocks, identifying all is tricky. 
        // Let's assume the start container gives us the primary index.

        const startNode = range.startContainer.nodeType === Node.TEXT_NODE
            ? range.startContainer.parentElement
            : range.startContainer as Element;

        const paragraphContainer = startNode?.closest('[data-paragraph-index]');
        if (paragraphContainer) {
            const index = parseInt(paragraphContainer.getAttribute('data-paragraph-index') || "-1");
            if (index >= 0) {
                // Capture the new HTML with the span we just added
                updateParagraphContent(index, paragraphContainer.innerHTML);
                setHighlightedParagraphs(prev => new Set(prev).add(index));
            }
        }
    };

    const handleClear = () => {
        const selection = window.getSelection();
        if (!selection) return;

        // Helper: Unwrap a span (remove highlight)
        // Returns the parent element (paragraph container) to update state
        const removeHighlight = (element: HTMLElement): HTMLElement | null => {
            const parent = element.parentElement; // This is likely the paragraph container or another span

            const fragment = document.createDocumentFragment();
            while (element.firstChild) {
                fragment.appendChild(element.firstChild);
            }
            element.parentNode?.replaceChild(fragment, element);

            // Return closest paragraph container to update state
            return parent?.closest('[data-paragraph-index]') as HTMLElement || null;
        };

        let modifiedParagraphIndex = -1;
        let modifiedParagraphContainer: HTMLElement | null = null;

        // Case 1: Collapsed selection (Cursor). check parent.
        if (selection.isCollapsed && selection.anchorNode) {
            const parent = selection.anchorNode.parentElement;
            if (parent && parent.tagName === "SPAN" && parent.className.includes("bg-")) {
                const pContainer = removeHighlight(parent);
                if (pContainer) {
                    modifiedParagraphContainer = pContainer;
                }
            }
        }
        // Case 2: Range selection. Find intersecting highlights.
        else if (selection.rangeCount > 0 && contentRef.current) {
            const range = selection.getRangeAt(0);
            const spans = contentRef.current.querySelectorAll("span");

            spans.forEach((span) => {
                // Check if it's one of our highlights (has bg- class) AND intersects selection
                if (span.className.includes("bg-") && range.intersectsNode(span)) {
                    const pContainer = removeHighlight(span as HTMLElement);
                    if (pContainer) modifiedParagraphContainer = pContainer;
                }
            });
            selection.removeAllRanges();
        }

        // Apply state update if something changed
        if (modifiedParagraphContainer) {
            const index = parseInt(modifiedParagraphContainer.getAttribute('data-paragraph-index') || "-1");
            if (index >= 0) {
                updateParagraphContent(index, modifiedParagraphContainer.innerHTML);
            }
        }
    };

    const handleCopy = (e: React.ClipboardEvent) => {
        e.preventDefault();
        onCopyAttempt();
    };

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        onCopyAttempt();
    };

    const handleDoubleClick = (e: React.MouseEvent) => {
        const selection = window.getSelection();
        if (!selection) return;

        const word = selection.toString().trim();
        if (word && word.length > 1) {
            // Basic position calculation: relative to viewport
            let offlineDef = undefined;
            if (vocabulary) {
                const entry = vocabulary.find(v => v.word.toLowerCase() === word.toLowerCase());
                if (entry) {
                    offlineDef = entry.definition;
                }
            }

            setDefinitionPopup({
                word,
                position: { x: e.clientX, y: e.clientY },
                offlineDefinition: offlineDef
            });
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-border shadow-sm flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                <h2 className="font-bold text-lg text-foreground">{title}</h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setFontSize(Math.max(12, fontSize - 1))}
                        className="p-1.5 hover:bg-accent rounded-md text-gray-500"
                        title="Decrease font size"
                    >
                        <ZoomOut size={16} />
                    </button>
                    <span className="text-xs font-mono text-gray-400 w-8 text-center">{fontSize}px</span>
                    <button
                        onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                        className="p-1.5 hover:bg-accent rounded-md text-gray-500"
                        title="Increase font size"
                    >
                        <ZoomIn size={16} />
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="px-4 py-2 border-b border-border bg-gray-50/50 dark:bg-zinc-800/50 flex justify-center">
                <HighlighterToolbar onHighlight={handleHighlight} onClear={handleClear} />
            </div>

            {/* Content Area */}
            <div
                ref={contentRef}
                className="flex-1 overflow-y-auto p-6" // Removed select-none to allow highlighting
                onCopy={handleCopy}
                onContextMenu={handleContextMenu}
                onDoubleClick={handleDoubleClick}
                style={{ fontSize: `${fontSize}px`, lineHeight: "1.6" }}
            >
                {/* Title inside content area for flow */}
                {/* Main Idea Hint */}
                {mainIdeaHint && !hideHints && (
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 text-blue-800 dark:text-blue-300 flex gap-3 text-base">
                        <div className="shrink-0 pt-0.5">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2 1.5-3.5a6 6 0 0 0-11 0c0 1 .5 2 1.5 2.5.8.8 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
                        </div>
                        <div>
                            <span className="font-bold block mb-1 text-xs uppercase tracking-wider opacity-70">Focus Hint</span>
                            {mainIdeaHint}
                        </div>
                    </div>
                )}

                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">{title}</h1>

                {paragraphs.map((para, index) => {
                    return (
                        <div key={index} className="relative mb-4" data-paragraph-index={index}>
                            <div
                                className="prose dark:prose-invert max-w-none transition-all duration-500 opacity-100"
                                dangerouslySetInnerHTML={{ __html: para }}
                            />
                        </div>
                    );
                })}
            </div>

            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border-t border-yellow-100 dark:border-yellow-900/30 text-xs text-yellow-700 dark:text-yellow-400 flex items-center gap-2 justify-center">
                <AlertTriangle size={14} />
                <span>Anti-Copy Mode Active: Text selection is allowed for highlighting, but copying is disabled.</span>
            </div>

            {/* Definition Popup */}
            {definitionPopup && (
                <WordDefinitionPopup
                    word={definitionPopup.word}
                    position={definitionPopup.position}
                    onClose={() => setDefinitionPopup(null)}
                    offlineDefinition={definitionPopup.offlineDefinition}
                />
            )}
        </div>
    );
}
