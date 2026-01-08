"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";

export default function ParaphraseTrainingPage() {
    return (
        <div className="max-w-4xl mx-auto p-8 space-y-12">

            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Paraphrasing Training
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    Master the art of rewriting text in your own words. This is the #1 skill for avoiding plagiarism.
                </p>
            </div>

            {/* Dos and Don'ts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* DOs */}
                <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800 rounded-2xl p-6">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-green-700 dark:text-green-400 mb-4">
                        <CheckCircle2 size={24} /> The DOs
                    </h2>
                    <ul className="space-y-3">
                        <li className="flex gap-3 text-green-900 dark:text-green-100">
                            <span className="font-bold">•</span>
                            <span><strong>Switch the direction.</strong> If the sentence says <em>"The boy kicked the ball"</em> (Active), flip it to <em>"The ball was kicked by the boy"</em> (Passive). It's the same story, just told backwards!</span>
                        </li>
                        <li className="flex gap-3 text-green-900 dark:text-green-100">
                            <span className="font-bold">•</span>
                            <span><strong>Use synonyms carefully.</strong> A synonym is a word with the same meaning, but be careful! "Cool" might mean "cold" or "popular," so pick the right one.</span>
                        </li>
                        <li className="flex gap-3 text-green-900 dark:text-green-100">
                            <span className="font-bold">•</span>
                            <span><strong>Keep the true meaning.</strong> Don't add your own feelings or leave out the big facts. You are a reporter, not a storyteller.</span>
                        </li>
                    </ul>
                </div>

                {/* DON'Ts */}
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800 rounded-2xl p-6">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-red-700 dark:text-red-400 mb-4">
                        <XCircle size={24} /> The DON'Ts
                    </h2>
                    <ul className="space-y-3">
                        <li className="flex gap-3 text-red-900 dark:text-red-100">
                            <span className="font-bold">•</span>
                            <span><strong>Don't just swap words.</strong> If you take a sentence and just change "happy" to "glad," that's cheating! You actully have to change the shape of the sentence.</span>
                        </li>
                        <li className="flex gap-3 text-red-900 dark:text-red-100">
                            <span className="font-bold">•</span>
                            <span><strong>Don't copy-paste chains.</strong> Try not to use more than 3 words in a row from the original text. If you must, put them in "quotation marks."</span>
                        </li>
                        <li className="flex gap-3 text-red-900 dark:text-red-100">
                            <span className="font-bold">•</span>
                            <span><strong>Don't change special words.</strong> You don't need to change names (like "Abraham Lincoln") or science words (like "Oxygen"). Just let them be!</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Practice Section */}
            <div className="space-y-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <Lightbulb size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">15 Practice Examples</h2>
                        <p className="text-zinc-500">Study how the sentence structure changes in the examples below.</p>
                    </div>
                </div>

                <div className="p-4 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-r-md">
                    <p className="text-red-700 dark:text-red-400 font-bold uppercase">
                        NOTE: THE 15 PRACTICE EXAMPLES SHOULD BE WRITTEN DOWN ON PAPER WITH A PEN OR PENCIL.
                    </p>
                </div>

                <div className="space-y-6">
                    {examples.map((ex, i) => (
                        <ExampleCard key={i} index={i + 1} original={ex.original} paraphrase={ex.paraphrase} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Example Data
const examples = [
    {
        original: "Students often find it difficult to manage their time effectively because of the numerous distractions available online.",
        paraphrase: "The abundance of online distractions frequently makes effective time management a challenge for students."
    },
    {
        original: "The rapid development of artificial intelligence has raised concerns about job security in various industries.",
        paraphrase: "Workers in many sectors are worried that their jobs may be at risk due to the fast-paced evolution of AI technology."
    },
    {
        original: "To maintain a healthy lifestyle, experts recommend eating a balanced diet and exercising regularly.",
        paraphrase: "Regular physical activity and proper nutrition are suggested by professionals as key components of a healthy life."
    },
    {
        original: "Despite the heavy rain, the soccer match continued until the final whistle.",
        paraphrase: "The soccer game was played to completion regardless of the intense downpour."
    },
    {
        original: "The updated policy requires all employees to wear identification badges at all times while in the building.",
        paraphrase: "Staff members must display their ID badges whenever they are on the premises, according to the new rules."
    },
    {
        original: "Many tourists visit Kyoto to experience its traditional temples and beautiful gardens.",
        paraphrase: "Kyoto attracts numerous visitors who wish to see its scenic gardens and historic religious sites."
    },
    {
        original: "Global warming is causing polar ice caps to melt, which leads to rising sea levels.",
        paraphrase: "Rising sea levels are a direct result of melting polar ice, a phenomenon driven by global warming."
    },
    {
        original: "The novel was criticized for its weak plot, although the characters were well-developed.",
        paraphrase: "Critics praised the character development in the book but found the storyline lacking."
    },
    {
        original: "Before starting the experiment, ensure that all safety equipment is properly checked.",
        paraphrase: "Verify that all safety gear is in good working order prior to beginning the experiment."
    },
    {
        original: "Successful communication depends not only on speaking clearly but also on listening actively.",
        paraphrase: "Active listening is just as important as clear speech for effective communication."
    },
    {
        original: "The construction project was delayed for several months due to unexpected funding issues.",
        paraphrase: "Unforeseen financial problems caused the building work to be postponed for months."
    },
    {
        original: "Scientists are studying the effects of microplastics on marine life to understand the long-term impact on the ecosystem.",
        paraphrase: "Researchers are investigating how ocean ecosystems are affected over time by microplastic contamination."
    },
    {
        original: "Although the restaurant is small and crowded, the food is widely considered to be excellent.",
        paraphrase: "Despite its cramped size, the eatery is highly regarded for the quality of its meals."
    },
    {
        original: "Parents should encourage their children to read books daily to improve their vocabulary and comprehension skills.",
        paraphrase: "To boost vocabulary and understanding, it is recommended that parents urge their kids to read every day."
    },
    {
        original: "The city council voted to ban single-use plastics in an effort to reduce environmental pollution.",
        paraphrase: "In a move to cut down on pollution, the local government decided to prohibit disposable plastic items."
    }
];

// Interactive Card Component
function ExampleCard({ index, original, paraphrase }: { index: number, original: string, paraphrase: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
                <div className="flex gap-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 text-zinc-600 font-bold text-sm shrink-0">
                        {index}
                    </span>
                    <div className="space-y-2 flex-1">
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Original</h4>
                        <p className="text-lg font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">
                            "{original}"
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between px-6 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
                >
                    {isOpen ? "Hide Paraphrase" : "Show Best Paraphrase"}
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isOpen && (
                    <div className="px-6 pb-6 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <h4 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Better Version</h4>
                        <p className="text-lg text-zinc-700 dark:text-zinc-300 italic">
                            "{paraphrase}"
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
