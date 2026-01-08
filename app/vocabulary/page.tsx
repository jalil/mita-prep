"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Book, Search, ExternalLink } from "lucide-react";
import { modules } from "@/lib/data";

export default function VocabularyPage() {
    const [searchQuery, setSearchQuery] = useState("");

    // Aggregate all vocabulary from all modules
    const allVocab = useMemo(() => {
        const vocabList: { word: string; definition: string; week: number }[] = [];

        modules.forEach(module => {
            if (module.vocabulary) {
                module.vocabulary.forEach(v => {
                    vocabList.push({
                        ...v,
                        week: module.id
                    });
                });
            }
        });

        // Add some default ones if none found (fallback for dev) or just return the list
        return vocabList.sort((a, b) => a.week - b.week);
    }, []);

    // Filter based on search
    const filteredVocab = useMemo(() => {
        return allVocab.filter(item =>
            item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
            `week ${item.week}`.includes(searchQuery.toLowerCase())
        );
    }, [allVocab, searchQuery]);

    return (
        <div className="max-w-5xl mx-auto p-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <Link href="/" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-primary transition-colors mb-4">
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Vocabulary Repository
                    </h1>
                    <p className="text-zinc-500">Master the key terms from your weekly readings.</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                    <Book size={32} />
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                <input
                    type="text"
                    placeholder="Search words, definitions, or weeks (e.g. 'week 21')..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
            </div>

            {/* Vocab Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                {filteredVocab.length > 0 ? (
                    filteredVocab.map((item, i) => (
                        <div key={i} className="group p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-primary/50 hover:shadow-md transition-all flex flex-col h-full">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-primary transition-colors">
                                    {item.word}
                                </h3>
                                <span className="text-xs font-bold px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded uppercase tracking-wider">
                                    Week {item.week}
                                </span>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed flex-grow">
                                {item.definition}
                            </p>
                            <div className="mt-4 pt-4 border-t border-zinc-50 dark:border-zinc-800 flex justify-end">
                                <Link href={`/week/${item.week}`} className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                                    Review Source <ExternalLink size={12} />
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center space-y-4">
                        <div className="inline-flex p-4 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-400">
                            <Search size={32} />
                        </div>
                        <p className="text-zinc-500">No matching vocabulary found.</p>
                        <button
                            onClick={() => setSearchQuery("")}
                            className="text-primary font-semibold hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
