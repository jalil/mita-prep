"use client";

import React from "react";
import { CheckCircle, Search, Clock, Zap, BookOpen } from "lucide-react";

export default function TipsPage() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-12 pb-20">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">How to Ace the Mita IC Reading Section</h1>
                <p className="text-lg text-muted-foreground">
                    A step-by-step guide to understanding, analyzing, and answering questions for the Mita Kokusai International Course exam.
                </p>
            </div>

            {/* STEP 1 & 2: Example Passage */}
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">1</div>
                    <h2 className="text-xl font-semibold">The Passage</h2>
                </div>
                <div className="bg-card border border-border rounded-lg p-8 shadow-sm font-serif leading-relaxed text-lg">
                    <h3 className="font-bold text-center mb-6 text-xl font-sans">The Unseen Angle</h3>

                    <p className="mb-4">
                        <span className="font-sans text-xs font-bold text-muted-foreground mr-2">[1]</span>
                        When Liam joined the Photography Club, he expected to learn about technical settings like ISO and aperture. He spent his first week memorizing the manual for his dad’s old DSLR camera, convinced that knowing every button would make him a great photographer. However, when he submitted his first portfolio—a series of perfectly sharp photos of the school building—Mr. Harrison, the club advisor, frowned. "These are clear," he said, "but they are boring. You are documenting, not seeing."
                    </p>

                    <p className="mb-4">
                        <span className="font-sans text-xs font-bold text-muted-foreground mr-2">[2]</span>
                        Frustrated, Liam left the classroom. He didn't understand what "seeing" meant if it wasn't about clarity. Walking home, he noticed a puddle reflecting the neon sign of a bakery. It was upside down and distorted by ripples. Usually, he would have walked past it. But <u>this anomaly</u> caught his eye. He crouched down and took a shot, focusing not on the sign itself, but on its warped reflection. He realized that the puddle transformed a normal object into something abstract and strange.
                    </p>

                    <p>
                        <span className="font-sans text-xs font-bold text-muted-foreground mr-2">[3]</span>
                        The next day, Mr. Harrison smiled when he saw the photo. "Now you are starting to look," he noted. Liam understood then that photography wasn't just about capturing reality perfectly; it was about finding a perspective that others missed. His earlier photos failed because they lacked a point of view. By changing his angle, he had changed the story.
                    </p>
                </div>
            </section>

            {/* STEP 3: Breakdown */}
            <section className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">2</div>
                    <h2 className="text-xl font-semibold">How to Read (Paragraph by Paragraph)</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {/* Para 1 Analysis */}
                    <div className="bg-accent/30 p-4 rounded-lg border border-border">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-sm">Paragraph 1</span>
                            The Setup
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex gap-2">
                                <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                                <span><strong>Main Idea:</strong> Liam thinks photography is technical, but his teacher tells him he is wrong.</span>
                            </li>
                            <li className="flex gap-2">
                                <Search size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                <span><strong>Focus:</strong> The contrast between Liam's expectation (technical skill) and the teacher's feedback (lack of vision).</span>
                            </li>
                        </ul>
                    </div>

                    {/* Para 2 Analysis */}
                    <div className="bg-accent/30 p-4 rounded-lg border border-border">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-sm">Paragraph 2</span>
                            The Turning Point
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex gap-2">
                                <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                                <span><strong>Main Idea:</strong> Liam discovers a new way of seeing by photographing a reflection.</span>
                            </li>
                            <li className="flex gap-2">
                                <Search size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                <span><strong>Pronoun Reference:</strong> "This anomaly" refers to the distorted reflection of the sign in the puddle.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Para 3 Analysis */}
                    <div className="bg-accent/30 p-4 rounded-lg border border-border">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-sm">Paragraph 3</span>
                            The Realization
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex gap-2">
                                <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                                <span><strong>Main Idea:</strong> Liam learns that photography is about perspective, not just equipment.</span>
                            </li>
                            <li className="flex gap-2">
                                <Search size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                <span><strong>Evidence:</strong> "Earlier photos failed... lacked a point of view." This explains the cause of his earlier failure.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* STEP 4: Exam Strategy */}
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">3</div>
                    <h2 className="text-xl font-semibold">Exam Strategy Map</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="border border-border p-5 rounded-lg">
                        <h3 className="font-bold flex items-center gap-2 mb-3">
                            <BookOpen size={20} className="text-primary" />
                            Where to find answers
                        </h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><strong>Main Idea:</strong> Usually found in the <u>last sentence of the first paragraph</u> or the <u>conclusion</u>. In this story, the lesson is summarized at the very end.</li>
                            <li><strong>Detail Questions:</strong> Look for "Key Words" (like proper nouns or specific numbers). e.g., If the question asks about "Mr. Harrison," scan for his name.</li>
                            <li><strong>Inference Questions:</strong> These ask "Why" or "How." The answer isn't written directly. You must connect the dots. (e.g., Why did Mr. Harrison smile? Becuase Liam finally understood the lesson).</li>
                        </ul>
                    </div>

                    <div className="border border-border p-5 rounded-lg bg-red-50 dark:bg-red-900/10 dark:border-red-900/30">
                        <h3 className="font-bold flex items-center gap-2 mb-3 text-red-600 dark:text-red-400">
                            <Zap size={20} />
                            Trap Answers to Avoid
                        </h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><strong>The "Too Narrow" Trap:</strong> An answer that is true, but only focuses on one small detail (e.g., "Liam took a picture of a bakery"). This is not the main idea.</li>
                            <li><strong>The "Right Words, Wrong Meaning" Trap:</strong> Answers that use words from the text but change the relationship between them.</li>
                            <li><strong>The "Extreme" Trap:</strong> Avoid answers with words like "always," "never," or "hated." The text says Liam was "frustrated," not that he "hated" photography.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* STEP 5: Checklist */}
            <section className="bg-primary/5 border border-primary/20 rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <CheckCircle className="text-primary" />
                    Checklist: What to Look Out For
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2">
                            <Search size={16} />
                            The "Main Idea" Check
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            After reading, ask yourself: <br />
                            <em>"Is this story about [Topic X] or is it really about [Lesson Y]?"</em><br />
                            Mita passages usually have a hidden lesson.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2">
                            <Clock size={16} />
                            Pronoun Tracking
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Circle every "It," "This," or "That." Draw an arrow to what it refers to. Questions often ask about these references.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2">
                            <Zap size={16} />
                            Emotional Shift
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Note how the character feels at the start vs. the end. <br />
                            (e.g., Confident → Frustrated → Enlightened). This usually reveals the main theme.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
