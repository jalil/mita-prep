"use client";

import React, { useState } from "react";
import { PassageViewer } from "@/components/PassageViewer";
import { InputArea } from "@/components/AnswerEngine";
import { Zap, AlertTriangle, RefreshCw, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

// Training Data: 15 Scenarios
const trainingScenarios = [
    {
        id: 1,
        title: "The Art of Paraphrasing",
        content: `
            <p>Paraphrasing is more than just swapping synonyms; it is a cognitive restructuring of information. When students rely on "patchwriting"—keeping the original sentence structure but changing a few adjectives—they falter. True comprehension is demonstrated when a student can ingest a complex idea, metabolize it, and reproduce it in an entirely new form without losing the nutritional value of the original meaning.</p>
            <p>One common pitfall is the fear of inaccuracy. Students worry that by changing the words, they will lose the "correctness" of the source. However, in academic writing, the ability to synthesize multiple sources into a coherent original argument is valued far higher than the ability to parrot a single source. <u>Therefore, the goal of this trainer is to force your brain to break its reliance on the visual crutch of the original text and trust its own linguistic reconstruction capabilities.</u></p>
        `,
        wordCount: 140,
        underlinedSentence: "Therefore, the goal of this trainer is to force your brain to break its reliance on the visual crutch of the original text and trust its own linguistic reconstruction capabilities."
    },
    {
        id: 2,
        title: "The Price of Convenience",
        content: `
            <p>In the digital age, convenience often comes at the expense of privacy. Every click, like, and share generates a data point that tech giants harvest to build detailed profiles of user behavior. While these algorithms improve user experience by offering personalized recommendations, they also create a surveillance economy where personal attention is the primary commodity.</p>
            <p>Many users accept these terms without reading the fine print, believing they have nothing to hide. <u>However, experts argue that the erosion of privacy is not just a personal risk but a societal one, as data can be used to manipulate public opinion and sway democratic elections.</u></p>
        `,
        wordCount: 120,
        underlinedSentence: "However, experts argue that the erosion of privacy is not just a personal risk but a societal one, as data can be used to manipulate public opinion and sway democratic elections."
    },
    {
        id: 3,
        title: "Fast Fashion's Hidden Cost",
        content: `
            <p>The "fast fashion" industry has revolutionized how we consume clothing, offering trendy items at rock-bottom prices. This model relies on rapid production cycles and cheap labor, often in developing nations with lax labor laws. Consumers benefit from affordable wardrobes, but the environmental toll is staggering, with textile waste becoming one of the largest contributors to global landfills.</p>
            <p>Beyond the waste, the chemical dyes used in production pollute water sources near factories. <u>Critically, the true cost of a five-dollar t-shirt is not paid by the consumer at the register, but by the environment and the workers who produce it.</u></p>
        `,
        wordCount: 130,
        underlinedSentence: "Critically, the true cost of a five-dollar t-shirt is not paid by the consumer at the register, but by the environment and the workers who produce it."
    },
    {
        id: 4,
        title: "Designing Walkable Cities",
        content: `
            <p>Urban planning in the mid-20th century prioritized the automobile, leading to sprawling suburbs and highway-dependent infrastructure. Today, a "New Urbanism" movement seeks to reverse this by designing cities focused on pedestrians and cyclists. Zones that mix residential, commercial, and recreational spaces reduce the need for cars and foster stronger community bonds.</p>
            <p>Critics of car-centric design point to the health issues associated with sedentary lifestyles and pollution. <u>Proponents of walkable cities maintain that designing streets for people rather than cars leads to happier, healthier, and more economically vibrant communities.</u></p>
        `,
        wordCount: 125,
        underlinedSentence: "Proponents of walkable cities maintain that designing streets for people rather than cars leads to happier, healthier, and more economically vibrant communities."
    },
    {
        id: 5,
        title: "The Mars Colonization Debate",
        content: `
            <p>The race to colonize Mars has captured the imagination of billionaires and scientists alike. Proponents argue that becoming a multi-planetary species is humanity's best insurance policy against extinction events on Earth. Technological advancements in rocketry have made this sci-fi dream a potential reality within our lifetime.</p>
            <p>However, the ethical and financial implications are vast. <u>Skeptics question whether the trillions of dollars required for Mars colonization would be better spent solving urgent problems on Earth, such as climate change and poverty.</u></p>
        `,
        wordCount: 130,
        underlinedSentence: "Skeptics question whether the trillions of dollars required for Mars colonization would be better spent solving urgent problems on Earth, such as climate change and poverty."
    },
    {
        id: 6,
        title: "Antibiotic Resistance",
        content: `
            <p>The discovery of antibiotics was one of the greatest medical breakthroughs of the 20th century, saving countless lives. Yet, the overuse of these drugs in both medicine and agriculture has accelerated the evolution of resistant bacteria. These "superbugs" are immune to standard treatments, threatening to return humanity to a pre-antibiotic era where minor infections could be fatal.</p>
            <p>Addressing this crisis requires a global coordinated effort. <u>Unless strict regulations on antibiotic use are implemented immediately, we face a future where common surgical procedures become dangerously high-risk due to the threat of untreatable infections.</u></p>
        `,
        wordCount: 135,
        underlinedSentence: "Unless strict regulations on antibiotic use are implemented immediately, we face a future where common surgical procedures become dangerously high-risk due to the threat of untreatable infections."
    },
    {
        id: 7,
        title: "The Remote Work Revolution",
        content: `
            <p>The pandemic forced a global experiment in remote work, proving that physical presence in an office is not always necessary for productivity. Employees gained flexibility and saved time on commuting, while companies reduced overhead costs. This shift has fundamentally panicked commercial real estate markets and redefined work-life balance.</p>
            <p>Discussion now focuses on the long-term psychological effects. <u>While remote work offers autonomy, sociologists warn that the lack of spontaneous social interaction in the workplace could lead to increased feelings of isolation and weaker team cohesion.</u></p>
        `,
        wordCount: 125,
        underlinedSentence: "While remote work offers autonomy, sociologists warn that the lack of spontaneous social interaction in the workplace could lead to increased feelings of isolation and weaker team cohesion."
    },
    {
        id: 8,
        title: "Vertical Farming Solutions",
        content: `
            <p>As the global population grows, traditional agriculture struggles to keep up due to limited arable land. Vertical farming offers a solution by growing crops in stacked layers within controlled indoor environments. This method uses significantly less water and eliminates the need for pesticides, while allowing food to be grown year-round near urban centers.</p>
            <p>The energy costs, however, remain a barrier. <u>Although vertical farming creates more food per square foot, its reliance on artificial lighting and climate control currently makes it more energy-intensive than traditional outdoor farming.</u></p>
        `,
        wordCount: 130,
        underlinedSentence: "Although vertical farming creates more food per square foot, its reliance on artificial lighting and climate control currently makes it more energy-intensive than traditional outdoor farming."
    },
    {
        id: 9,
        title: "The Volatility of Crypto",
        content: `
            <p>Cryptocurrencies were introduced as a decentralized alternative to traditional banking, promising secure and anonymous transactions. Enthusiasts view them as the future of money, free from government manipulation. However, the market is notoriously volatile, with values fluctuating wildly based on speculation and regulatory news.</p>
            <p>This instability prevents widespread adoption for daily commerce. <u>Financial analysts warn that until cryptocurrencies can demonstrate price stability, they will remain speculative assets rather than a reliable medium of exchange for the general public.</u></p>
        `,
        wordCount: 120,
        underlinedSentence: "Financial analysts warn that until cryptocurrencies can demonstrate price stability, they will remain speculative assets rather than a reliable medium of exchange for the general public."
    },
    {
        id: 10,
        title: "E-Sports Recognition",
        content: `
            <p>Competitive video gaming, or e-sports, has exploded into a billion-dollar industry with professional leagues and massive global audiences. Players train for hours daily, refining their reflexes and strategic thinking. Despite this, a debate persists over whether e-sports should be classified as "real" sports alongside traditional athletics.</p>
            <p>The definition of sport is evolving. <u>Supporters argue that if chess and shooting are considered sports due to their mental and precision components, then e-sports certainly qualify based on the immense skill and mental endurance required.</u></p>
        `,
        wordCount: 125,
        underlinedSentence: "Supporters argue that if chess and shooting are considered sports due to their mental and precision components, then e-sports certainly qualify based on the immense skill and mental endurance required."
    },
    {
        id: 11,
        title: "Universal Basic Income",
        content: `
            <p>Automation threatens to displace millions of workers in the coming decades. In response, economists are debating the concept of Universal Basic Income (UBI)—a guaranteed regular payment to all citizens regardless of need. Proponents claim this would reduce poverty and encourage creativity by providing a safety net.</p>
            <p>Opponents fear it would disincentivize work and bankrupt governments. <u>The core of the debate is whether UBI would liberate humans to pursue meaningful work or simply create a dependent class relying on state handouts.</u></p>
        `,
        wordCount: 125,
        underlinedSentence: "The core of the debate is whether UBI would liberate humans to pursue meaningful work or simply create a dependent class relying on state handouts."
    },
    {
        id: 12,
        title: "The Microplastic Threat",
        content: `
            <p>Plastic production has soared over the last century, but its durability is a double-edged sword. Plastics do not biodegrade; they break down into tiny particles known as microplastics. These particles have been found in the deepest oceans, in Arctic ice, and even in the human bloodstream.</p>
            <p>The health consequences are still being studied. <u>Scientists are deeply concerned that because microplastics accumulate in the food chain, they pose a significant and potentially irreversible threat to both marine ecosystems and human health.</u></p>
        `,
        wordCount: 120,
        underlinedSentence: "Scientists are deeply concerned that because microplastics accumulate in the food chain, they pose a significant and potentially irreversible threat to both marine ecosystems and human health."
    },
    {
        id: 13,
        title: "Renewable Energy Storage",
        content: `
            <p>The transition to renewable energy sources like solar and wind is essential for combating climate change. However, these sources are intermittent—the sun doesn't always shine, and the wind doesn't always blow. The challenge lies not in generating the power, but in storing it efficiently for later use.</p>
            <p>Battery technology is advancing but faces material shortages. <u>To achieve a truly green grid, engineers must develop sustainable, high-capacity storage solutions that can smooth out the inconsistencies of renewable energy generation.</u></p>
        `,
        wordCount: 120,
        underlinedSentence: "To achieve a truly green grid, engineers must develop sustainable, high-capacity storage solutions that can smooth out the inconsistencies of renewable energy generation."
    },
    {
        id: 14,
        title: "The Ethics of Gene Editing",
        content: `
            <p>CRISPR technology allows scientists to edit DNA with unprecedented precision, holding the promise of curing genetic diseases. However, the ability to modify the human genome raises profound ethical questions. The prospect of "designer babies," selected for traits like intelligence or physical appearance, is no longer purely science fiction.</p>
            <p>Regulation struggles to keep pace with science. <u>Ethicists warn that without strict global guidelines, gene editing could exacerbate social inequality, creating a genetic divide between the wealthy and the poor.</u></p>
        `,
        wordCount: 125,
        underlinedSentence: "Ethicists warn that without strict global guidelines, gene editing could exacerbate social inequality, creating a genetic divide between the wealthy and the poor."
    },
    {
        id: 15,
        title: "Globalization and Culture",
        content: `
            <p>Globalization has connected the world through trade and technology, allowing for the rapid exchange of goods and ideas. While this has lifted many out of poverty, it has also led to concerns about cultural homogenization. Western fast food, movies, and fashion are becoming dominant in every corner of the globe.</p>
            <p>Preservationists worry about the loss of local traditions. <u>The challenge for modern societies is to embrace the economic benefits of global connectivity while actively protecting and celebrating distinct local cultural identities.</u></p>
        `,
        wordCount: 125,
        underlinedSentence: "The challenge for modern societies is to embrace the economic benefits of global connectivity while actively protecting and celebrating distinct local cultural identities."
    }
];

export default function TrainerPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [key, setKey] = useState(0); // To reset the input area

    const currentScenario = trainingScenarios[currentIndex];

    // Handlers for navigation
    const handleNext = () => {
        if (currentIndex < trainingScenarios.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setKey(prev => prev + 1); // Reset input
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setKey(prev => prev + 1); // Reset input
        }
    };

    const handleReset = () => {
        setKey(prev => prev + 1);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="flex items-center gap-3 text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
                        <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                            <Zap size={32} />
                        </div>
                        No-Copy Reflex Trainer
                    </h1>
                    <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
                        Gym for your mind. rewrite the underlined sentence.
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Scenario</span>
                    <span className="text-xl font-extrabold text-amber-600">{currentIndex + 1}</span>
                    <span className="text-zinc-400">/</span>
                    <span className="text-zinc-500 font-bold">{trainingScenarios.length}</span>
                </div>
            </div>

            {/* Warning Banner */}
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex gap-3 text-amber-800 dark:text-amber-200">
                <AlertTriangle className="shrink-0" />
                <p className="text-sm font-medium">
                    Strict Mode Active: Copying and pasting are disabled. Right-click is disabled.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 h-[600px]">
                {/* Left: Passage */}
                <div className="h-full border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-zinc-900 flex flex-col">
                    <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex justify-between items-center shrink-0">
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Source Text</span>
                        <span className="text-xs font-medium text-zinc-400">{currentScenario.wordCount} words</span>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <PassageViewer
                            title={currentScenario.title}
                            content={currentScenario.content}
                            onCopyAttempt={() => { }}
                        />
                    </div>
                </div>

                {/* Right: Input */}
                <div className="flex flex-col h-full space-y-4">
                    <div className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg">Your Paraphrase</h3>
                            <button
                                onClick={handleReset}
                                className="text-xs flex items-center gap-1 text-zinc-400 hover:text-zinc-900 transition-colors"
                            >
                                <RefreshCw size={12} /> Reset
                            </button>
                        </div>

                        <div className="flex-1">
                            <InputArea
                                key={key}
                                placeholder="Type your paraphrase here. Remember: Change the structure, keep the meaning."
                                minWordCount={10}
                                onSubmit={handleNext}
                                onPasteAttempt={() => { }}
                            />
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex gap-4">
                        <button
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed
                                bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        >
                            <ChevronLeft size={20} /> Previous
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={currentIndex === trainingScenarios.length - 1}
                            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed
                                bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20"
                        >
                            Next Challenge <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
