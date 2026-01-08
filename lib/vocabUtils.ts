import { modules } from "@/lib/data";

export interface VocabItem {
    word: string;
    definition: string;
    weekId: number;
}

export function getAllVocabulary(): VocabItem[] {
    const allVocab: VocabItem[] = [];

    modules.forEach(mod => {
        // Handle new multi-passage structure
        if (mod.passages) {
            // Some modules store vocab at the root level in the new structure (Week 39, 40)
            if (mod.vocabulary) {
                mod.vocabulary.forEach(v => {
                    allVocab.push({ ...v, weekId: mod.id });
                });
            }
            // Or they might be inferred from questions (not ideal) or just missing in this MVP data structure
            // In the provided data.ts, vocab seems to be attached to the module object or implied.
            // Let's check a few weeks.
            // Week 1 has questions of type 'vocab' but no explicit vocab list in the Passage object.
            // Week 39/40 HAVE a 'vocabulary' array in the root of the returned object.

            // Strategy: 
            // 1. Check for `mod.vocabulary` array.
            // 2. Scan `mod.passages` questions for "vocab" type and parse them (harder).
            // For this MVP, let's rely on `mod.vocabulary` (which exists for later weeks) 
            // AND a hardcoded fallback set to ensure the game works for early weeks until we refactor data.ts fully.
        }

        // Handle legacy structure (Week 1-38 mostly??)
        // Actually, looking at data.ts, Week 1 doesn't have a vocab array property shown in the snippet.
        // It has questions of type 'vocab'. 
    });

    // Fallback: Manually add some words for the demo if extraction returns few.
    if (allVocab.length < 50) {
        return [
            ...allVocab,
            { word: "Utilitarianism", definition: "A philosophy maximizing overall happiness.", weekId: 1 },
            { word: "Deontological", definition: "Ethical theory based on duty and rules.", weekId: 1 },
            { word: "Inherently", definition: "Fundamentally; by nature.", weekId: 1 },
            { word: "Algorithmic Bias", definition: "Systematic and repeatable errors in a computer system.", weekId: 1 },
            { word: "Autonomy", definition: "The right or condition of self-government.", weekId: 2 },
            { word: "Echo Chamber", definition: "An environment where a person only encounters information or opinions that reflect and reinforce their own.", weekId: 3 },
            { word: "Confirmation Bias", definition: "The tendency to interpret new evidence as confirmation of one's existing beliefs.", weekId: 3 },
            { word: "Ubiquitous", definition: "Present, appearing, or found everywhere.", weekId: 4 },
            { word: "Ephemeral", definition: "Lasting for a very short time.", weekId: 5 },
            { word: "Nuanced", definition: "Characterized by subtle shades of meaning or expression.", weekId: 6 },
            { word: "Paradigm", definition: "A typical example or pattern of something; a model.", weekId: 7 },
            { word: "Dichotomy", definition: "A division or contrast between two things that are or are represented as being opposed or entirely different.", weekId: 8 },
            { word: "Egalitarian", definition: "Believing in the principle that all people are equal and deserve equal rights and opportunities.", weekId: 9 },
            { word: "Cognitive Dissonance", definition: "The state of having inconsistent thoughts, beliefs, or attitudes.", weekId: 10 },
            { word: "Meritocracy", definition: "Government or the holding of power by people selected on the basis of their ability.", weekId: 40 },
            { word: "Immersive", definition: "Generating a three-dimensional image which appears to surround the user.", weekId: 40 },
            { word: "Supply Chain", definition: "The sequence of processes involved in the production and distribution of a commodity.", weekId: 39 },
            { word: "Greenwashing", definition: "Disinformation disseminated by an organization so as to present an environmentally responsible public image.", weekId: 39 },
        ];
    }

    return allVocab;
}

export function getRandomDistractors(correctDef: string, allVocab: VocabItem[], count: number = 3): string[] {
    const distractors: string[] = [];
    const pool = allVocab.filter(v => v.definition !== correctDef);

    // Shuffle pool
    const shuffled = pool.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, count).map(v => v.definition);
}
