// Library of topics for the Mita 52-week curriculum
// Rotating Themes: Ethics -> Media -> Global -> Education

export interface TopicDef {
    title: string;
    theme: "Ethics" | "Media" | "Global" | "Education";
    description: string; // Brief summary for the dashboard/preview
}

export const curriculumTopics: TopicDef[] = [
    // Month 1
    { title: "Utilization & AI Ethics", theme: "Ethics", description: "The Trolley Problem in autonomous systems." },
    { title: "Foods of the Future", theme: "Global", description: "Sustainable nutrition and insect protein." }, // Note: Theme adjusted to Global in previous steps, mapping might be slightly off cycle but that's fine.
    { title: "The Portrait", theme: "Media", description: "Artistic interpretation and value." },
    { title: "Math Anxiety", theme: "Education", description: "Psychological barriers to STEM success." },

    // Month 2
    { title: "CRISPR & Gene Editing", theme: "Ethics", description: "Moral implications of 'Designer Babies'." },
    { title: "The Death of the Author", theme: "Media", description: "AI-generated art and copyright ownership." },
    { title: "Water Scarcity 2050", theme: "Global", description: "Geopolitical conflicts over fresh water." },
    { title: "The Finnish Model", theme: "Education", description: "Why less homework leads to better scores." },

    // Month 3
    { title: "Surveillance Capitalism", theme: "Ethics", description: "Data privacy vs. convenience." },
    { title: "Deepfakes & Truth", theme: "Media", description: "Erosion of trust in digital media." },
    { title: "Climate Refugees", theme: "Global", description: "Migration patterns due to rising sea levels." },
    { title: "Standardized Testing", theme: "Education", description: "Does the SAT predict success?" },

    // Month 4
    { title: "Animal Rights", theme: "Ethics", description: "Personhood for non-human primates." },
    { title: "Social Algorithm Bias", theme: "Media", description: "Echo chambers and polarization." },
    { title: "Fast Fashion Costs", theme: "Global", description: "Environmental impact of cheap clothing." },
    { title: "Montessori vs. Traditional", theme: "Education", description: "Student-led vs. Teacher-led learning." },

    // Month 5
    { title: "Universal Basic Income", theme: "Ethics", description: "Work and meaning in an automated world." },
    { title: "The Influencer Economy", theme: "Media", description: "Parasocial relationships and marketing." },
    { title: "Plastic in the Oceans", theme: "Global", description: "The Great Pacific Garbage Patch." },
    { title: "Bilingual Brains", theme: "Education", description: "Cognitive benefits of learning languages." },

    // Month 6
    { title: "Euthanasia Debates", theme: "Ethics", description: "The right to die with dignity." },
    { title: "Streaming vs. Cinema", theme: "Media", description: "The changing landscape of film." },
    { title: "Urbanization Trends", theme: "Global", description: "Megacities and sustainable living." },
    { title: "Growth Mindset", theme: "Education", description: "Carol Dweck's theory on intelligence." },

    // Month 7
    { title: "Space Colonization", theme: "Ethics", description: "Do we have the right to terraform Mars?" },
    { title: "Video Games as Art", theme: "Media", description: "Interactive storytelling narrative." },
    { title: "Pandemic Preparedness", theme: "Global", description: "Global health cooperation." },
    { title: "Digital Literacy", theme: "Education", description: "Teaching critical thinking online." },

    // Month 8
    { title: "Privacy in Public", theme: "Ethics", description: "Face recognition technology." },
    { title: "Nostalgia Marketing", theme: "Media", description: "Why reboots dominate media." },
    { title: "Renewable Energy Transition", theme: "Global", description: "Nuclear vs. Solar vs. Wind." },
    { title: "Arts in School", theme: "Education", description: "Impact of music on math skills." },

    // Month 9
    { title: "Corporate Responsibility", theme: "Ethics", description: "Shareholder vs. Stakeholder capitalism." },
    { title: "Clickbait Culture", theme: "Media", description: "Attention economy mechanics." },
    { title: "Endangered Languages", theme: "Global", description: "Loss of cultural heritage." },
    { title: "Gamification in Learning", theme: "Education", description: "Using game mechanics to teach." },

    // Month 10
    { title: "Genetic Privacy", theme: "Ethics", description: "Who owns your DNA data?" },
    { title: "Representation in Film", theme: "Media", description: "Impact of diversity on screen." },
    { title: "Micro-financing", theme: "Global", description: "Alleviating poverty through small loans." },
    { title: "Single-Sex Education", theme: "Education", description: "Pros and cons of separated schooling." },

    // Month 11
    { title: "AI in Judiciary", theme: "Ethics", description: "Algorithmic sentencing and bias." },
    { title: "The 24-Hour News Cycle", theme: "Media", description: "Impact on mental health." },
    { title: "Sustainable Tourism", theme: "Global", description: "Traveling without destroying." },
    { title: "Critical Race Theory", theme: "Education", description: "Teaching history and perspective." },

    // Month 12
    { title: "Human Cloning", theme: "Ethics", description: "The final biological frontier." },
    { title: "Virtual Reality Futures", theme: "Media", description: "Escapism vs. Enhancement." },
    { title: "Global Supply Chains", theme: "Global", description: "Fragility of interconnected trade." },
    { title: "The Future of University", theme: "Education", description: "Is the 4-year degree obsolete?" },

    // Month 13 (Extended to 60)
    { title: "Screen Addiction", theme: "Media", description: "Tech's impact on the teenage brain." },
    { title: "Failure & Mastery", theme: "Education", description: "Why teaching for mastery matters." },
    { title: "Resilience", theme: "Ethics", description: "How internal grit overcomes external challenges." },
    { title: "Happiness Science", theme: "Global", description: "The cultural and biological roots of joy." },

    // Month 14
    { title: "Advertising Secrets", theme: "Media", description: "Hidden psychological tricks in ads." },
    { title: "Gaming & The Brain", theme: "Global", description: "The neurobiology of play and reward." },
    { title: "Nature vs. Nurture", theme: "Ethics", description: "The age-old debate on identity." },
    { title: "Social Conformity", theme: "Global", description: "Why we follow the crowd." },

    // Month 15
    { title: "Introversion & Learning", theme: "Education", description: "The value of quiet reflection in schools." },
    { title: "Human Engineering", theme: "Global", description: "From Inca terraces to terraforming Mars." },
];
