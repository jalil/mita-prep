import { curriculumTopics } from '@/lib/topics';
export type QuestionType = "inference" | "detail" | "vocab" | "paraphrase";

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[]; // For MCQ
  correctAnswer?: string; // For auto-checking (optional)
  hint?: string;
}

export interface Passage {
  passage: {
    title: string;
    content: string;
    wordCount: number;
    underlinedSentence?: string;
  };
  questions: Question[];
}

export interface Module {
  id: number;
  title: string;
  theme: "Ethics" | "Media" | "Global" | "Education" | "Economics" | "Society" | "History";
  mainIdeaHint?: string;
  // Deprecated single-passage fields (kept for migration)
  passage?: {
    title: string;
    content: string; // HTML or Markdown content
    wordCount: number;
    underlinedSentence?: string; // For paraphrase challenge
  };
  questions?: Question[];
  // New multi-passage field
  passages?: Passage[];
  vocabulary?: { word: string; definition: string }[];
}

// Helper to generate 52 weeks
export const modules: Module[] = Array.from({ length: 60 }, (_, i) => {
  const weekNum = i + 1;
  const themes = ["Ethics", "Media", "Global", "Education"] as const;
  const theme = themes[i % 4];

  // Week 1: Utilization & AI Ethics (Ethics) -> Updated to "Cause & Effect"
  if (weekNum === 1) {
    return {
      id: 1,
      title: "Small Choices, Big Consequences",
      theme: "Ethics",
      mainIdeaHint: "Focus on the chain of events. How does a single small decision lead to a larger outcome?",
      passages: [
        {
          passage: {
            title: "The Anatomy of Error",
            wordCount: 510,
            content: `
              <p>In complex systems, from aviation to software engineering, the cause of a catastrophic failure is rarely a single dramatic event. Rather, it is often the result of a sequence of minor, seemingly insignificant errors that accumulate over time. This phenomenon, often referred to within safety science as the "Swiss Cheese Model," suggests that organizations have multiple layers of defense—policies, technologies, and human supervisors—that usually prevent accidents. However, these layers are not impenetrable; they have holes, like Swiss cheese. A disaster occurs only when the holes in every layer align perfectly, allowing a small initial error to pass through unchecked and cause a systemic collapse.</p>
              <p>One of the most persistent catalysts for this alignment is the concept of "verification bias," or the tendency to bypass standard checking procedures when an outcome feels intuitively correct. In high-pressure environments, individuals frequently rely on heuristics—mental shortcuts—to save time. For instance, a data entry clerk might assume a file labeled "Final_v3" is the correct version without opening it to verify the timestamp. While this assumption is statistically likely to be true, it introduces a probability of error that, while small, is non-zero. When time pressure increases, the perceived cost of verification (spending five minutes to check a file) often outweighs the perceived risk of error, leading to a "normalization of deviance" where cutting corners becomes the accepted standard of behavior.</p>
              <p>The consequences of such shortcuts are rarely immediate, which reinforces the behavior. A worker who skips a safety check and sees no negative result is likely to skip it again, believing the check is redundant. This creates a feedback loop of complacency. However, in a tightly coupled system, a minor input error—such as an incorrect date in a bibliography or a wrong variable in a line of code—can propagate downstream. By the time the error is visible, it has often embedded itself into the final product, rendering the entire output invalid. The "final" product typically reveals the error only when it is too late to correct, as the reviewing mechanisms were bypassed in the earlier stages.</p>
              <p>Ultimately, the integrity of any final output relies less on the talent of the individuals involved and more on the rigidity of the verification protocols they follow. Experts argue that reliability is not a natural state but a manufactured one, maintained only by a disciplined adherence to process over speed. When the "last person to touch the work" prioritizes efficiency over verification, they essentially remove the final slice of cheese in the safety model, creating a clear path for potential failure.</p>
            `,
            underlinedSentence: "When the 'last person to touch the work' prioritizes efficiency over verification, they essentially remove the final slice of cheese in the safety model, creating a clear path for potential failure."
          },
          questions: [
            {
              id: "q_w1_p1_1",
              type: "detail",
              text: "Which title best summarizes the central thesis of the passage?",
              options: [
                "The History of Swiss Cheese",
                "The Dangers of Computer Files",
                "The Anatomy of Error: How Small Oversights Lead to Systemic Failure",
                "Why Workers are Lazy"
              ],
              correctAnswer: "The Anatomy of Error: How Small Oversights Lead to Systemic Failure"
            },
            {
              id: "q_w1_p1_2",
              type: "detail",
              text: "According to the passage, what is the 'Swiss Cheese Model'?",
              options: [
                "A theory about nutrition.",
                "A model suggesting that disasters occur when 'holes' (flaws) in multiple defensive layers align to allow an error to pass through.",
                "A method for organizing files on a computer.",
                "A manufacturing technique for steel."
              ],
              correctAnswer: "A model suggesting that disasters occur when 'holes' (flaws) in multiple defensive layers align to allow an error to pass through."
            },
            {
              id: "q_w1_p1_3",
              type: "detail",
              text: "What is 'verification bias' as described in the text?",
              options: [
                "The tendency to double-check everything twice.",
                "The tendency to bypass standard checking procedures when an outcome feels intuitively correct or likely.",
                "The belief that all data is false.",
                "A software bug."
              ],
              correctAnswer: "The tendency to bypass standard checking procedures when an outcome feels intuitively correct or likely."
            },
            {
              id: "q_w1_p1_4",
              type: "detail",
              text: "Why do individuals often rely on 'heuristics' in high-pressure environments?",
              options: [
                "To save time by using mental shortcuts.",
                "To make their work more difficult.",
                "Because they do not know the rules.",
                "To impress their supervisors."
              ],
              correctAnswer: "To save time by using mental shortcuts."
            },
            {
              id: "q_w1_p1_5",
              type: "inference",
              text: "What does the passage imply is the danger of 'normalization of deviance'?",
              options: [
                "It makes workers faster.",
                "It creates a false sense of security where unsafe practices become the accepted standard because they haven't caused an accident *yet*.",
                "It reduces the cost of doing business.",
                "It requires too much paperwork."
              ],
              correctAnswer: "It creates a false sense of security where unsafe practices become the accepted standard because they haven't caused an accident *yet*."
            },
            {
              id: "q_w1_p1_6",
              type: "vocab",
              text: "In the phrase 'catalysts for this alignment,' what does 'catalyst' mean?",
              options: [
                "A person who causes trouble.",
                "A substance or factor that precipitates or accelerates an event or reaction.",
                "A type of file format.",
                "A defensive layer."
              ],
              correctAnswer: "A substance or factor that precipitates or accelerates an event or reaction."
            },
            {
              id: "q_w1_p1_7",
              type: "detail", // Using detail for pronoun reference
              text: "In the sentence 'it introduces a probability of error,' what does 'it' refer to?",
              options: [
                "The file labeled 'Final_v3'.",
                "The assumption that the file is correct without verifying (the mental shortcut).",
                "The timestamp.",
                "The likelihood of truth."
              ],
              correctAnswer: "The assumption that the file is correct without verifying (the mental shortcut)."
            },
            {
              id: "q_w1_p1_8",
              type: "inference",
              text: "What conclusion does the passage draw about 'reliability'?",
              options: [
                "It happens naturally if you hire smart people.",
                "It is impossible to achieve.",
                "It is a 'manufactured state' that requires disciplined adherence to protocols rather than just speed or talent.",
                "It is less important than efficiency."
              ],
              correctAnswer: "It is a 'manufactured state' that requires disciplined adherence to protocols rather than just speed or talent."
            }
          ]
        },
        {
          passage: {
            title: "The Paradox of Efficiency",
            wordCount: 520,
            content: `
              <p>In modern management theory, efficiency is often viewed as the ultimate virtue. The goal is to maximize output while minimizing time, effort, and resources. This drive for "optimization" shapes everything from logistics networks to student study schedules. However, systems theorists have identified a counterintuitive phenomenon known as the "Efficiency Paradox," where the pursuit of hyper-efficiency actually increases fragility and the likelihood of catastrophic failure.</p>
              <p>The core of this paradox lies in the removal of "redundancy." In engineering terms, redundancy refers to the inclusion of extra components—backup systems, spare parts, or additional time buffers—that are not strictly necessary for normal operation. In an optimized system, these redundancies are often identified as "waste." For example, a project manager might view a mandatory one-hour safety meeting or a secondary review process as an unproductive use of time that could be better spent on "real work." By eliminating these buffers, the manager increases the theoretical speed of the system.</p>
              <p>However, this streamlining assumes a static, predictable environment. Real-world systems are dynamic and prone to unexpected variables, such as a sudden change in regulations or a mechanical malfunction. When a system is stripped of its buffers in the name of efficiency, it loses its "slack"—the flexibility to absorb shock. A schedule packed with "mosaic-like" precision may be highly productive when everything goes right, but it lacks the capacity to adapt when a single variable changes. A minor disruption, which a redundant system could easily absorb, causes a ripple effect that can paralyze the entire operation.</p>
              <p>Furthermore, the pursuit of efficiency can lead to a form of cognitive myopia, or "tunnel vision." When the metric for success is purely speed or output, individuals may unknowingly violate other critical constraints, such as safety codes or ethical guidelines. This is often not an act of malice but of prioritization. If a goal is framed solely in terms of hitting a deadline, adherence to "invisible" or procedural rules—like routing cables correctly—may be subconsciously deprioritized as an impediment.</p>
              <p>Ultimately, research suggests that true effectiveness requires balancing efficiency with resilience. While efficiency focuses on the best-case scenario (maximum speed), resilience accounts for the worst-case scenario (system failure). A robust system accepts a certain amount of "inefficiency"—redundant checks, extra time, slower processes—as the necessary insurance premium for long-term survival. Efficiency without compliance or flexibility is often just a faster path to systemic breakdown.</p>
            `,
            underlinedSentence: "A robust system accepts a certain amount of 'inefficiency'—redundant checks, extra time, slower processes—as the necessary insurance premium for long-term survival."
          },
          questions: [
            {
              id: "q_w1_p2_1",
              type: "detail",
              text: "What is the central thesis of the passage regarding efficiency?",
              options: [
                "Efficiency is the most important goal for any organization.",
                "The pursuit of hyper-efficiency can paradoxically increase fragility and the risk of failure by removing necessary buffers.",
                "Redundancy is always wasteful and should be eliminated.",
                "Managers create too many schedules."
              ],
              correctAnswer: "The pursuit of hyper-efficiency can paradoxically increase fragility and the risk of failure by removing necessary buffers."
            },
            {
              id: "q_w1_p2_2",
              type: "detail",
              text: "How does the passage define 'redundancy' in engineering terms?",
              options: [
                "Useless workers who do nothing.",
                "The inclusion of extra components (backups, buffers) that are not strictly necessary for normal operation but provide safety.",
                "Repeating the same word twice.",
                "A type of computer virus."
              ],
              correctAnswer: "The inclusion of extra components (backups, buffers) that are not strictly necessary for normal operation but provide safety."
            },
            {
              id: "q_w1_p2_3",
              type: "detail",
              text: "Why might an 'optimized' system be dangerous?",
              options: [
                "It is too fast for humans to understand.",
                "By removing buffers (redundancy) to reduce 'waste,' it loses the flexibility ('slack') to absorb unexpected shocks or changes.",
                "It costs too much money.",
                "It requires too much electricity."
              ],
              correctAnswer: "By removing buffers (redundancy) to reduce 'waste,' it loses the flexibility ('slack') to absorb unexpected shocks or changes."
            },
            {
              id: "q_w1_p2_4",
              type: "inference",
              text: "What is implied about a 'schedule packed with mosaic-like precision'?",
              options: [
                "It is beautiful to look at.",
                "It lacks the flexibility to adapt; if one small thing goes wrong, the whole schedule fails because there is no free time (slack).",
                "It takes too long to create.",
                "It is the best way to study."
              ],
              correctAnswer: "It lacks the flexibility to adapt; if one small thing goes wrong, the whole schedule fails because there is no free time (slack)."
            },
            {
              id: "q_w1_p2_5",
              type: "vocab",
              text: "In the phrase 'cognitive myopia,' what does 'myopia' metaphorically refer to?",
              options: [
                "Nearsightedness or lack of foresight; focusing too narrowly on one thing (speed) and missing the bigger picture (safety).",
                "A type of eye disease.",
                "A high level of intelligence.",
                "A memory loss condition."
              ],
              correctAnswer: "Nearsightedness or lack of foresight; focusing too narrowly on one thing (speed) and missing the bigger picture (safety)."
            },
            {
              id: "q_w1_p2_6",
              type: "detail",
              text: "According to the passage, is violating rules in an efficient system always an act of malice?",
              options: [
                "Yes, efficient people are bad.",
                "No, it is often a result of prioritization where procedural rules are viewed as impediments to the primary goal of speed/output.",
                "No, it is because they don't know the rules.",
                "Yes, they want to cause accidents."
              ],
              correctAnswer: "No, it is often a result of prioritization where procedural rules are viewed as impediments to the primary goal of speed/output."
            },
            {
              id: "q_w1_p2_7",
              type: "detail", // Using detail for pronoun reference
              text: "In the sentence 'it lacks the capacity to adapt,' what does 'it' refer to?",
              options: [
                "The environment.",
                "A schedule packed with 'mosaic-like' precision.",
                "The redundancy.",
                "The project manager."
              ],
              correctAnswer: "A schedule packed with 'mosaic-like' precision."
            },
            {
              id: "q_w1_p2_8",
              type: "detail",
              text: "What is the suggested balance for a 'robust system'?",
              options: [
                "100% Efficiency.",
                "Balancing efficiency with resilience (accepting some inefficiency/redundancy as insurance).",
                "Ignoring deadlines entirely.",
                "Focusing only on safety and ignoring output."
              ],
              correctAnswer: "Balancing efficiency with resilience (accepting some inefficiency/redundancy as insurance)."
            }
          ]
        },
        {
          passage: {
            title: "The Signal of Disorder",
            wordCount: 515,
            content: `
              <p>In 1982, social scientists James Q. Wilson and George Kelling introduced a criminological theory that would fundamentally alter urban policing: the "Broken Windows Theory." The theory rests on a simple cause-and-effect premise: visible signs of civil disorder, such as broken windows, graffiti, or piles of trash, create an environment that encourages further and more serious crime. The argument is not that a broken window causes a person to become a criminal, but rather that the *unchecked existence* of the broken window sends a signal. It communicates to the community that no one cares, no one is watching, and order has collapsed.</p>
              <p>This signal operates on a psychological level. In a neighborhood where small norms are rigorously maintained—where graffiti is painted over within hours and litter is swept up—potential offenders feel a sense of surveillance and community cohesion. Conversely, in an environment of visible neglect, the social constraints against deviant behavior are weakened. A single unrepaired window suggests that the building is abandoned. Soon, all the windows are broken. Then, squatters move in. Finally, the building becomes a hub for drug dealing or arson. A minor act of vandalism, if left unaddressed, becomes the catalyst for a spiral of urban decay.</p>
              <p>The theory suggests that crime is not just the result of individual depravity or economic poverty, but also of environmental signaling. It implies that "order maintenance"—policing low-level offenses like turnstile jumping or public drinking—acts as a preventative measure against major felonies. By reinforcing the "norms of order," authorities can theoretically stop the feedback loop of decay before it accelerates.</p>
              <p>However, the application of this theory has generated significant controversy. Critics argue that it confuses correlation with causation. Does the broken window *cause* the crime, or do high-crime areas simply happen to have more broken windows due to underlying economic factors? Furthermore, the aggressive policing of minor offenses—often called "Zero Tolerance"—has been accused of disproportionately targeting marginalized communities. While the logic of the "signal" is compelling, the *human cost* of interpreting every minor infraction as a precursor to anarchy remains a subject of intense ethical debate.</p>
            `,
            underlinedSentence: "A minor act of vandalism, if left unaddressed, becomes the catalyst for a spiral of urban decay."
          },
          questions: [
            {
              id: "q_w1_p3_1",
              type: "detail",
              text: "What is the core premise of the 'Broken Windows Theory'?",
              options: [
                "Glass acts as a magnifying glass for crime.",
                "Visible signs of disorder (like broken windows) signal a lack of care, which encourages further and more serious crime.",
                "Criminals prefer to break windows rather than steal.",
                "Police should ignore minor crimes to focus on murder."
              ],
              correctAnswer: "Visible signs of disorder (like broken windows) signal a lack of care, which encourages further and more serious crime."
            },
            {
              id: "q_w1_p3_2",
              type: "detail",
              text: "According to the passage, what does an 'unrepaired window' communicate to the community?",
              options: [
                "That the glass repair shop is closed.",
                "That the building is well-ventilated.",
                "That no one cares, no one is watching, and order has collapsed.",
                "That the residents are on vacation."
              ],
              correctAnswer: "That no one cares, no one is watching, and order has collapsed."
            },
            {
              id: "q_w1_p3_3",
              type: "inference",
              text: "measure Why does the passage suggest that 'painting over graffiti' helps prevent crime?",
              options: [
                "Graffiti is ugly.",
                "It maintains a sense of 'surveillance and community cohesion,' signaling that norms are enforced.",
                "Paint fumes drive criminals away.",
                "It is a legal requirement."
              ],
              correctAnswer: "It maintains a sense of 'surveillance and community cohesion,' signaling that norms are enforced."
            },
            {
              id: "q_w1_p3_4",
              type: "vocab",
              text: "In the phrase 'acts as a preventative measure,' what does 'preventative' mean?",
              options: [
                "Something that causes an event.",
                "Something designed to stop an event from happening.",
                "Something that makes an event worse.",
                "Something related to punishment."
              ],
              correctAnswer: "Something designed to stop an event from happening."
            },
            {
              id: "q_w1_p3_5",
              type: "inference",
              text: "What is the 'feedback loop' mentioned in the third paragraph?",
              options: [
                "A sound made by a microphone.",
                "The cycle where neglect leads to more disorder, which leads to more crime, which leads to further decay.",
                "The interaction between police and criminals.",
                "The relationship between landlords and tenants."
              ],
              correctAnswer: "The cycle where neglect leads to more disorder, which leads to more crime, which leads to further decay."
            },
            {
              id: "q_w1_p3_6",
              type: "detail",
              text: "What is a major criticism of the theory mentioned in the text?",
              options: [
                "It costs too much to fix windows.",
                "It confuses correlation with causation and may lead to unfair policing of marginalized communities.",
                "Broken windows are artistic.",
                "The theory was written by criminals."
              ],
              correctAnswer: "It confuses correlation with causation and may lead to unfair policing of marginalized communities."
            }
          ]
        },
        {
          passage: {
            title: "The Trophic Cascade",
            wordCount: 530,
            content: `
              <p>In ecology, the concept of a "trophic cascade" describes how the addition or removal of a top predator can trigger a ripple effect that alters the entire ecosystem, traversing down the food chain to the very geography of the land. A classic example of this phenomenon occurred in Yellowstone National Park. For seventy years, wolves had been absent from the park, having been hunted to extinction in the region by the 1930s. In their absence, the deer population exploded. Without a natural predator to check their numbers, the deer grazed unchecked, stripping the valleys of vegetation, particularly willow and aspen trees along the riverbanks.</p>
              <p>In 1995, park rangers made the controversial decision to reintroduce wolves to Yellowstone. The immediate effect was predictable: the wolves killed deer. However, the subsequent effects were surprisingly complex. The presence of wolves did not just reduce the *number* of deer; it altered their *behavior*. To avoid predation, the deer began to avoid the valleys and gorges where they could be easily trapped. They moved to higher ground and denser cover.</p>
              <p>This behavioral shift allowed the vegetation in the valleys to recover. Within six years, the height of the trees in the valleys quintupled. This regeneration provided nesting grounds for birds and beavers, whose populations surged. The beavers, as ecosystem engineers, built dams that created ponds for otters, muskrats, and fish. The roots of the recovering trees stabilized the riverbanks, reducing soil erosion. The channels narrowed, and the pools deepened.</p>
              <p>Remarkably, the reintroduction of a single predator had changed the physical course of the rivers. This illustrates the profound interconnectedness of biological systems. A small intervention at the top of the food chain (the reintroduction of the wolf) did not simply subtract a prey animal; it fundamentally reorganized the energy flow and physical structure of the entire park. It serves as a powerful reminder that in a complex system, no element exists in isolation, and the consequences of a single change are often far greater than the sum of its parts.</p>
            `,
            underlinedSentence: "A small intervention at the top of the food chain did not simply subtract a prey animal; it fundamentally reorganized the energy flow and physical structure of the entire park."
          },
          questions: [
            {
              id: "q_w1_p4_1",
              type: "detail",
              text: "What is a 'trophic cascade' as defined in the passage?",
              options: [
                "A type of waterfall in Yellowstone.",
                "A ripple effect where the addition/removal of a top predator alters the entire ecosystem down the food chain.",
                "A disease affecting deer.",
                "A method of planting trees."
              ],
              correctAnswer: "A ripple effect where the addition/removal of a top predator alters the entire ecosystem down the food chain."
            },
            {
              id: "q_w1_p4_2",
              type: "detail",
              text: "Why did the deer population explode in Yellowstone prior to 1995?",
              options: [
                "People were feeding them.",
                "The wolves had been hunted to extinction, removing their natural predator.",
                "The weather was unusually warm.",
                "The deer were imported from Canada."
              ],
              correctAnswer: "The wolves had been hunted to extinction, removing their natural predator."
            },
            {
              id: "q_w1_p4_3",
              type: "inference",
              text: "How did the wolves change the deer's behavior?",
              options: [
                "The deer became friendlier.",
                "The deer avoided valleys/gorges where they were vulnerable, allowing vegetation there to recover.",
                "The deer learned to swim.",
                "The deer started hunting the wolves."
              ],
              correctAnswer: "The deer avoided valleys/gorges where they were vulnerable, allowing vegetation there to recover."
            },
            {
              id: "q_w1_p4_4",
              type: "detail",
              text: "What effect did the recovering vegetation have on the rivers?",
              options: [
                "It clogged the rivers.",
                "Tree roots stabilized the banks, reducing erosion and changing the river's course.",
                "It made the water poisonous.",
                "It dried up the rivers."
              ],
              correctAnswer: "Tree roots stabilized the banks, reducing erosion and changing the river's course."
            },
            {
              id: "q_w1_p4_5",
              type: "vocab",
              text: "In the phrase 'stabilized the riverbanks,' what does 'stabilized' mean?",
              options: [
                "Made firm or steady; prevented from collapsing or changing.",
                "Moved around.",
                "Destroyed.",
                "Flooded."
              ],
              correctAnswer: "Made firm or steady; prevented from collapsing or changing."
            },
            {
              id: "q_w1_p4_6",
              type: "inference",
              text: "What is the 'powerful reminder' mentioned in the conclusion?",
              options: [
                "Wolves are dangerous.",
                "In complex systems, elements are interconnected, and a single change can have consequences far greater than expected.",
                "Yellowstone is a beautiful park.",
                "We should hunt more deer."
              ],
              correctAnswer: "In complex systems, elements are interconnected, and a single change can have consequences far greater than expected."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Rationalizing", definition: "Attempting to explain or justify behavior with logical reasons, even if inappropriate." },
        { word: "Integrity", definition: "The quality of being honest and having strong moral principles." },
        { word: "Redundant", definition: "Not or no longer needed or useful." },
        { word: "Systemic", definition: "Relating to a system, especially as opposed to a particular part." }
      ]
    };
  }

  // Week 2: Perspective & Bias (Academic Pivot)
  if (weekNum === 2) {
    return {
      id: 2,
      title: "Perspective & Bias",
      theme: "Global",
      mainIdeaHint: "Don't get lost in the specific examples. Ask yourself: What is the ONE big point all these details support?",
      passages: [
        {
          passage: {
            title: "The Architecture of Memory",
            wordCount: 520,
            content: `
              <p>In the field of educational psychology, a distinction is often drawn between "shallow processing" and "deep processing." This concept, first proposed by Craik and Lockhart in 1972, suggests that the durability of a memory is not determined by how long a student studies, but by the depth of mental analysis performed during the learning process. Many students, however, fall into the trap of confusing the *appearance* of learning with actual cognitive retention. This is frequently observed in the phenomenon of "aesthetic note-taking," where the learner focuses on the visual organization of information—color-coding, highlighting, and transcribing—rather than its semantic meaning.</p>
              <p>Consider the student who spends hours transcribing a textbook into a notebook, meticulously using different colored inks for dates, names, and definitions. On the surface, this appears to be the behavior of a diligent learner. The resulting notes are often visually flawless, creating a sense of accomplishment. However, cognitive scientists argue that this activity is often passive. The brain is engaged in a mechanical act of copying rather than an intellectual act of synthesis. The student is processing the *physical features* of the words (their color, shape, and placement) rather than their *meaning*. This is analogous to a computer saving a file without indexing its contents; the data is stored, but it is not connected to a searchable network of ideas.</p>
              <p>In contrast, "deep processing" involves elaboration and distinctiveness. It requires the learner to actively alter the information—to rephrase it, connect it to prior knowledge, or diagram the relationships between concepts. A messy notebook filled with arrows, scribbles, and self-generated diagrams often indicates a higher level of cognitive engagement than a pristine, color-coded transcript. The arrows represent the student's attempt to build a mental model of cause and effect, transforming isolated facts into a coherent narrative. For example, rather than simply memorizing that the Steam Engine was invented in 1712, a deep processor would analyze how that invention acted as a catalyst for the Industrial Revolution and subsequent global conflicts.</p>
              <p>The danger of aesthetic note-taking is that it creates an "illusion of competence." Because the notes look organized, the student assumes their mind is equally organized. They recognize the material when they see it (recognition), but they cannot retrieve or apply it in a novel context (recall). When faced with an exam question that asks for analysis—"Why did X lead to Y?"—the rote learner is often paralyzed. They have memorized the dots, but they have not drawn the lines. True academic mastery, therefore, is not found in the precision of one's penmanship, but in the messiness of one's critical thinking.</p>
            `,
            underlinedSentence: "True academic mastery, therefore, is not found in the precision of one's penmanship, but in the messiness of one's critical thinking."
          },
          questions: [
            {
              id: "q_w2_p1_1",
              type: "detail",
              text: "What is the central thesis of the passage regarding note-taking?",
              options: [
                "Neat notes are the best way to get good grades.",
                "The visual appearance of notes often masks a lack of deep cognitive processing; understanding comes from synthesis, not just transcription.",
                "Students should never use highlighters.",
                "Deep processing was invented in 1972."
              ],
              correctAnswer: "The visual appearance of notes often masks a lack of deep cognitive processing; understanding comes from synthesis, not just transcription."
            },
            {
              id: "q_w2_p1_2",
              type: "detail",
              text: "How does the passage define 'shallow processing' in the context of note-taking?",
              options: [
                "Writing very small.",
                "Focusing on the visual organization (color-coding, copying) rather than the semantic meaning.",
                "Studying in a shallow pool.",
                "Listening to music while studying."
              ],
              correctAnswer: "Focusing on the visual organization (color-coding, copying) rather than the semantic meaning."
            },
            {
              id: "q_w2_p1_3",
              type: "detail",
              text: "What is the 'illusion of competence'?",
              options: [
                "Considering oneself smart because one's notes resemble a textbook, mistaking recognition for the ability to recall/apply.",
                "Cheating on a test.",
                "The belief that one can learn without studying.",
                "A magic trick."
              ],
              correctAnswer: "Considering oneself smart because one's notes resemble a textbook, mistaking recognition for the ability to recall/apply."
            },
            {
              id: "q_w2_p1_4",
              type: "inference",
              text: "measure that a 'messy notebook' might be better than a neat one?",
              options: [
                "It shows the student was rushing.",
                "The arrows and scribbles represent active mental engagement and the construction of connections (cause and effect).",
                "Teachers prefer messy handwriting.",
                "It saves money on expensive pens."
              ],
              correctAnswer: "The arrows and scribbles represent active mental engagement and the construction of connections (cause and effect)."
            },
            {
              id: "q_w2_p1_5",
              type: "vocab",
              text: "In the third paragraph, what does the word 'catalyst' mean?",
              options: [
                "A person who writes history books.",
                "Something that precipitates or speeds up a significant change or action.",
                "A type of engine.",
                "A catastrophic failure."
              ],
              correctAnswer: "Something that precipitates or speeds up a significant change or action."
            },
            {
              id: "q_w2_p1_6",
              type: "detail",
              text: "According to the passage, 'deep processing' requires the learner to:",
              options: [
                "Copy the textbook exactly.",
                "Use at least three different colors.",
                "Actively alter information, rephrase it, and connect it to prior knowledge.",
                "Sleep with the book under their pillow."
              ],
              correctAnswer: "Actively alter information, rephrase it, and connect it to prior knowledge."
            },
            {
              id: "q_w2_p1_7",
              type: "detail", // Using detail for pronoun reference
              text: "In the sentence 'It requires the learner to actively alter the information,' what does 'It' refer to?",
              options: [
                "Shallow processing.",
                "Deep processing.",
                "The textbook.",
                "The computer."
              ],
              correctAnswer: "Deep processing."
            },
            {
              id: "q_w2_p1_8",
              type: "inference",
              text: "What is the difference between 'recognition' and 'recall'?",
              options: [
                "Recognition is simpler (seeing and knowing); Recall is harder (retrieving and applying without prompts).",
                "They are the same thing.",
                "Recall happens before Recognition.",
                "Recognition is for math, Recall is for history."
              ],
              correctAnswer: "Recognition is simpler (seeing and knowing); Recall is harder (retrieving and applying without prompts)."
            }
          ]
        },
        {
          passage: {
            title: "The Cognitive Map",
            wordCount: 500,
            content: `
              <p>Navigation is one of the most fundamental cognitive skills, yet even developed experts are prone to disorientation. A key concept in the psychology of navigation is the "Cognitive Map"—a mental representation of one's physical environment. However, these mental maps are not objecitve recordings like a satellite image; they are subjective interpretations filtered through human bias. One of the most dangerous of these biases in high-stakes environments, such as mountaineering or aviation, is "Confirmation Bias," specifically a form known as "Cognitive Tunnel Vision."</p>
              <p>This phenomenon occurs when a navigator forms an initial hypothesis about their location—for example, "I am at Landmark A"—and then subconsciously filters all subsequent information to support that hypothesis. Once the brain has "locked on" to a specific interpretation, it actively suppresses contradictory evidence. A rock formation that *vaguely* resembles a landmark in the guidebook becomes *definitely* that landmark in the navigator's mind. The navigator will over-emphasize the similarities (e.g., the shape of the peak) while ignoring glaring discrepancies (e.g., the direction it faces or the slope of the surrounding terrain).</p>
              <p>This bias is often exacerbated by stress or fatigue. In a survival situation, the brain desires certainty and closure. The discomfort of being "lost" is psychologically taxing, so the mind seizes upon the first plausible solution to alleviate that anxiety. This is sometimes called "plan continuation bias" or "get-there-itis" in aviation—the overwhelming compulsion to stick to the original plan even when the situation has changed. A hiking group leader, feeling the pressure of responsibility, might convince themselves that a minor geological feature is the critical waypoint they were seeking, simply because *needing* it to be true feels safer than admitting they are off-course.</p>
              <p>The danger of this cognitive trap is that it leads to a "spiral of divergence." By accepting a false landmark as a true reference point, every subsequent navigational decision is based on a flawed premise. Turning left because "Landmark A" indicates a left turn is fatal if one is actually at "Rock B." The only defense against this is "situational awareness," which requires a deliberate effort to disconfirm one's own hypothesis—to actively look for reasons why the rock *cannot* be the landmark, rather than reasons why it *could* be.</p>
            `,
            underlinedSentence: "The danger of this cognitive trap is that it leads to a 'spiral of divergence.'"
          },
          questions: [
            {
              id: "q_w2_p2_1",
              type: "detail",
              text: "What is the central thesis of the passage regarding navigation?",
              options: [
                "Maps are always accurate.",
                "Human navigation is prone to 'Confirmation Bias,' where the brain distorts reality to fit a desired hypothesis, leading to dangerous errors.",
                "Hiking is a safe activity if you have a compass.",
                "Satellites have replaced cognitive maps."
              ],
              correctAnswer: "Human navigation is prone to 'Confirmation Bias,' where the brain distorts reality to fit a desired hypothesis, leading to dangerous errors."
            },
            {
              id: "q_w2_p2_2",
              type: "detail",
              text: "How does the passage define 'Cognitive Map'?",
              options: [
                "A paper map used by hikers.",
                "A subjective mental representation of the physical environment, filtered through bias.",
                "A GPS device.",
                "A type of brain surgery."
              ],
              correctAnswer: "A subjective mental representation of the physical environment, filtered through bias."
            },
            {
              id: "q_w2_p2_3",
              type: "detail",
              text: "What is 'Cognitive Tunnel Vision'?",
              options: [
                "Being unable to see the horizon.",
                "A state where the brain locks onto a hypothesis and actively suppresses contradictory evidence.",
                "A beneficial skill for pilots.",
                "A vision problem caused by snow."
              ],
              correctAnswer: "A state where the brain locks onto a hypothesis and actively suppresses contradictory evidence."
            },
            {
              id: "q_w2_p2_4",
              type: "inference",
              text: "Why implies that 'stress or fatigue' makes this bias worse?",
              options: [
                "The brain becomes lazy.",
                "The brain desires certainty and closure to alleviate the anxiety of being lost, leading it to seize the first plausible solution.",
                "Tired people walk slower.",
                "Stress improves eyesight."
              ],
              correctAnswer: "The brain desires certainty and closure to alleviate the anxiety of being lost, leading it to seize the first plausible solution."
            },
            {
              id: "q_w2_p2_5",
              type: "vocab",
              text: "In the phrase 'exacerbated by stress,' what does 'exacerbated' mean?",
              options: [
                "Made better.",
                "Made worse or more severe.",
                "Created.",
                "Ignored."
              ],
              correctAnswer: "Made worse or more severe."
            },
            {
              id: "q_w2_p2_6",
              type: "detail",
              text: "What is 'plan continuation bias' (or 'get-there-itis')?",
              options: [
                "The compulsion to stick to the original plan even when the situation has changed.",
                "The desire to change plans frequently.",
                "A fear of flying.",
                "A navigational tool."
              ],
              correctAnswer: "The compulsion to stick to the original plan even when the situation has changed."
            },
            {
              id: "q_w2_p2_7",
              type: "detail", // Using detail for pronoun reference
              text: "In the sentence 'it actively suppresses contradictory evidence,' what does 'it' refer to?",
              options: [
                "The brain.",
                "The landmark.",
                "The hypothesis.",
                "The guidebook."
              ],
              correctAnswer: "The brain."
            },
            {
              id: "q_w2_p2_8",
              type: "inference",
              text: "What is the suggested 'defense' against this bias?",
              options: [
                "Walking faster.",
                " 'Situational awareness' involving an active effort to *disconfirm* one's own hypothesis (looking for why you might be wrong).",
                "Buying a better compass.",
                "Never hiking alone."
              ],
              correctAnswer: " 'Situational awareness' involving an active effort to *disconfirm* one's own hypothesis (looking for why you might be wrong)."
            }
          ]
        },
        {
          passage: {
            title: "The Anchoring Effect",
            wordCount: 505,
            content: `
              <p>In a famous experiment conducted by psychologists Amos Tversky and Daniel Kahneman, a group of participants was asked to spin a wheel of fortune that was rigged to land on either the number 10 or 65. After the wheel stopped, the participants were then asked to estimate the percentage of African nations in the United Nations. The results were startling. Those who saw the wheel land on 10 estimated, on average, that 25% of African nations were in the UN. Those who saw the number 65 estimated 45%. The random number on the wheel had absolutely no logical connection to African geography, yet it exerted a powerful gravitational pull on the participants' judgments. This phenomenon is known as the "Anchoring Effect," a cognitive bias where an individual relies too heavily on an initial piece of information—the "anchor"—when making decisions.</p>
              <p>This bias permeates nearly every aspect of human negotiation and estimation. In the world of commerce, the sticker price on a car acts as an anchor. Even if the buyer knows the price is inflated, the final negotiated price will likely be higher than if the starting price had been lower, because the negotiation revolves around the initial number. Similarly, in salary negotiations, the first figure put on the table sets the range of possibilities. A low starting offer "anchors" the employee's expectations downward, making a slightly higher counter-offer seem like a victory, even if it is still below market value.</p>
              <p>The danger of anchoring lies in its subtlety. Most people believe they are immune to such arbitrary influences, confident that their judgments are based on facts and logic. However, research suggests that even experts—judge sentencing criminals, real estate agents pricing homes—are susceptible. The anchor creates a mental adjustment process. We start from the anchor and adjust away from it, but our adjustments are almost always insufficient. We stop adjusting once we reach a value that feels "plausible," leaving our final estimate biased toward the initial, irrelevant number.</p>
              <p>To combat this, cognitive psychologists suggest a strategy of "counter-anchoring." This involves deliberately rejecting the initial number and proposing a new, strictly logic-based figure to reset the mental baseline. Recognizing that the first number heard is not neutral information, but a psychological lever, is the first step in reclaiming objectivity.</p>
            `,
            underlinedSentence: "We start from the anchor and adjust away from it, but our adjustments are almost always insufficient."
          },
          questions: [
            {
              id: "q_w2_p3_1",
              type: "detail",
              text: "What is the 'Anchoring Effect' as defined in the passage?",
              options: [
                "A sailing technique.",
                "A cognitive bias where an individual relies too heavily on an initial piece of information (the anchor) when making decisions.",
                "The tendency to stay in one place.",
                "A method for memorizing numbers."
              ],
              correctAnswer: "A cognitive bias where an individual relies too heavily on an initial piece of information (the anchor) when making decisions."
            },
            {
              id: "q_w2_p3_2",
              type: "detail",
              text: "In the Tversky and Kahneman experiment, how did the number on the wheel affect participants' estimates?",
              options: [
                "It didn't affect them at all.",
                "Participants who saw a lower number (10) gave lower estimates, and those who saw a higher number (65) gave higher estimates.",
                "It made them angry.",
                "They guessed the exact number correctly."
              ],
              correctAnswer: "Participants who saw a lower number (10) gave lower estimates, and those who saw a higher number (65) gave higher estimates."
            },
            {
              id: "q_w2_p3_3",
              type: "inference",
              text: "measure Why is the initial sticker price on a car considered an 'anchor'?",
              options: [
                "It keeps the car from rolling away.",
                "It is the only price the dealer will accept.",
                "It sets the baseline for negotiation, influencing the final price even if the buyer negotiates it down.",
                "It is a legal requirement."
              ],
              correctAnswer: "It sets the baseline for negotiation, influencing the final price even if the buyer negotiates it down."
            },
            {
              id: "q_w2_p3_4",
              type: "vocab",
              text: "In the phrase 'exerted a powerful gravitational pull,' what does 'exerted' mean?",
              options: [
                "Removed.",
                "Applied or brought to bear (a force, influence, or quality).",
                "Ignored.",
                "Measured."
              ],
              correctAnswer: "Applied or brought to bear (a force, influence, or quality)."
            },
            {
              id: "q_w2_p3_5",
              type: "inference",
              text: "What does the passage imply about our ability to adjust away from an anchor?",
              options: [
                "We are very good at it.",
                "We usually adjust too much.",
                "Our adjustments are typically insufficient; we stop once we reach a 'plausible' value that is still biased toward the anchor.",
                "We ignore the anchor completely."
              ],
              correctAnswer: "Our adjustments are typically insufficient; we stop once we reach a 'plausible' value that is still biased toward the anchor."
            },
            {
              id: "q_w2_p3_6",
              type: "detail",
              text: "What strategy does the passage suggest to combat anchoring?",
              options: [
                "Agreeing with the first number.",
                "Counter-anchoring: deliberately rejecting the initial number and proposing a new, logic-based figure.",
                "Walking away from the negotiation.",
                "Flipping a coin."
              ],
              correctAnswer: "Counter-anchoring: deliberately rejecting the initial number and proposing a new, logic-based figure."
            }
          ]
        },
        {
          passage: {
            title: "The Invisible Evidence",
            wordCount: 525,
            content: `
              <p>During World War II, the U.S. military faced a critical problem: their bomber planes were getting shot down at an alarming rate. To solve this, they turned to the Statistical Research Group (SRG) at Columbia University. The military officers presented the statisticians with data from the planes that had returned from combat missions. The data showed a consistent pattern: the bullet holes were concentrated on the wings, the tail, and the center of the fuselage. The officers, applying logical intuition, concluded that these areas needed more armor plating. After all, that was where the planes were getting hit.</p>
              <p>However, a Hungarian-born mathematician named Abraham Wald intervened. He argued that the officers were making a fundamental error. They were only looking at the planes that had *survived*. The reason there were bullet holes in the wings and tail was that a plane *could* take a hit there and still fly home. The reason there were *no* bullet holes in the cockpit or the engines on the returning planes was not because the enemy never hit those spots. It was because the planes that were hit in the cockpit or engines never came back.</p>
              <p>Wald's insight is the defining example of "Survivorship Bias," a logical error where we concentrate on the people or things that made it past some selection process and overlook those that did not, typically because of their lack of visibility. We study the habits of successful billionaires and assume their strategies (like "waking up at 4 A.M.") caused their success, ignoring the thousands of people who also woke up at 4 A.M. but failed. We look at ancient buildings and marvel at their durability, concluding that "they don't build them like they used to," forgetting that all the poorly built ancient buildings collapsed centuries ago and are no longer there to serve as evidence.</p>
              <p>In the case of the bombers, Wald recommended putting the armor on the engines and cockpit—precisely the places where there were no bullet holes on the surviving planes. The military followed his advice, and the survival rate of the bombers increased dramatically. Wald proved that sometimes, the most important information is not in the data we can see, but in the data that is missing.</p>
            `,
            underlinedSentence: "Wald proved that sometimes, the most important information is not in the data we can see, but in the data that is missing."
          },
          questions: [
            {
              id: "q_w2_p4_1",
              type: "detail",
              text: "What problem was the U.S. military trying to solve in the passage?",
              options: [
                "They needed faster planes.",
                "Their bomber planes were being shot down at an alarming rate.",
                "They ran out of fuel.",
                "They needed better pilots."
              ],
              correctAnswer: "Their bomber planes were being shot down at an alarming rate."
            },
            {
              id: "q_w2_p4_2",
              type: "detail",
              text: "Where were the bullet holes concentrated on the returning planes?",
              options: [
                "The cockpit and engines.",
                "Everywhere equally.",
                "The wings, the tail, and the center of the fuselage.",
                "There were no bullet holes."
              ],
              correctAnswer: "The wings, the tail, and the center of the fuselage."
            },
            {
              id: "q_w2_p4_3",
              type: "inference",
              text: "Why did the military officers initially want to put armor on the wings and tail?",
              options: [
                "It was cheaper.",
                "They saw the damage there and assumed those were the most vulnerable spots.",
                "Abraham Wald told them to.",
                "They wanted to hide the holes."
              ],
              correctAnswer: "They saw the damage there and assumed those were the most vulnerable spots."
            },
            {
              id: "q_w2_p4_4",
              type: "inference",
              text: "Why did Abraham Wald argue that the armor should go on the engines and cockpit?",
              options: [
                "He liked those parts better.",
                "He realized the returning planes had no holes there because planes hit in those spots crashed and didn't return (the missing data).",
                "The metal was lighter.",
                "He was guessing."
              ],
              correctAnswer: "He realized the returning planes had no holes there because planes hit in those spots crashed and didn't return (the missing data)."
            },
            {
              id: "q_w2_p4_5",
              type: "vocab",
              text: "In the phrase 'overlook those that did not... because of their lack of visibility,' what does 'overlook' mean?",
              options: [
                "To supervise.",
                "To fail to notice or consider.",
                "To look down from a high place.",
                "To stare at."
              ],
              correctAnswer: "To fail to notice or consider."
            },
            {
              id: "q_w2_p4_6",
              type: "detail",
              text: "What is 'Survivorship Bias'?",
              options: [
                "Hating people who survive.",
                "A logical error where we focus on survivors/successes and overlook failures because the failures are not visible.",
                "A type of plane armor.",
                "A history book about wars."
              ],
              correctAnswer: "A logical error where we focus on survivors/successes and overlook failures because the failures are not visible."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Aesthetic", definition: "Concerned with beauty or the appreciation of beauty." },
        { word: "Synthesis", definition: "Combination or composition, in particular." },
        { word: "Redundancy", definition: "The state of being not or no longer needed or useful." },
        { word: "Confirmation Bias", definition: "The tendency to interpret new evidence as confirmation of one's existing beliefs or theories." }
      ]
    };
  }

  // Week 3: Group Dynamics (Academic Pivot)
  if (weekNum === 3) {
    return {
      id: 3,
      title: "Group Dynamics",
      theme: "Society",
      mainIdeaHint: "Focus on the mechanism. How does the group influence the individual's behavior or perception?",
      passages: [
        {
          passage: {
            title: "The Spiral of Silence",
            wordCount: 500,
            content: `
              <p>In the realm of mass communication and political science, the "Spiral of Silence" is a theory proposed by German political scientist Elisabeth Noelle-Neumann in 1974. It posits that an individual's willingness to express their opinion on public issues is heavily influenced by their perception of the public climate. The theory rests on a foundational assumption about human nature: the fear of isolation. Noelle-Neumann argued that individuals have an innate fear of social exclusion, which drives them to constantly monitor their environment—often through mass media—to determine which opinions are gaining popularity and which are falling out of favor.</p>
              <p>When an individual perceives their opinion to be in the minority or losing ground, they are more likely to remain silent to avoid social repercussions. Conversely, those who believe their opinion aligns with the majority or the rising trend feel emboldened to speak out. This dynamic creates a spiraling effect: as the "loud" majority speaks more frequent, the "silent" minority speaks less, making the majority opinion appear even stronger and more universal than it may actually be. The "silence" of the minority essentially reinforces the dominance of the majority, creating a feedback loop that distorts the true distribution of public opinion.</p>
              <p>A critical component of this theory is the "quasi-statistical sense." Noelle-Neumann suggested that people possess a sixth sense that allows them to intuitively gauge the climate of opinion, much like one might gauge the weather. However, this sense is imperfect and susceptible to manipulation, particularly by mass media. If the media disproportionately represents one viewpoint, individuals may mistakenly believe it is the consensus, leading them to suppress their opposing views. This phenomenon is often referred to as "pluralistic ignorance," where a majority of group members privately reject a norm, but incorrectly assume that most others accept it, and therefore go along with it.</p>
              <p>The theory has significant implications for democratic discourse. If minority views are systematically silenced, the "marketplace of ideas" becomes constricted, potentially preventing necessary corrections or innovations in policy. However, the Spiral of Silence is not absolute. Noelle-Neumann identified the "hard core"—a minority group that remains defiant and willing to pay the price of isolation to express their views. These individuals, often innovators or radicals, are immune to the threats of the spiral and are essential for shifting public opinion over time.</p>
            `,
            underlinedSentence: "This phenomenon is often referred to as 'pluralistic ignorance,' where a majority of group members privately reject a norm, but incorrectly assume that most others accept it, and therefore go along with it."
          },
          questions: [
            {
              id: "q_w3_p1_1",
              type: "detail",
              text: "What is the 'foundational assumption' of the Spiral of Silence theory?",
              options: [
                "People love to argue.",
                "Mass media is always honest.",
                "Individuals have an innate fear of social exclusion (isolation).",
                "The majority is always right."
              ],
              correctAnswer: "Individuals have an innate fear of social exclusion (isolation)."
            },
            {
              id: "q_w3_p1_2",
              type: "detail",
              text: "According to the passage, how does the 'spiral' effect occur?",
              options: [
                "Everyone speaks at the same time.",
                "The minority speaks less, while the majority speaks more, making the majority view appear stronger than it is.",
                "The government creates laws to silence people.",
                "People stop watching the news."
              ],
              correctAnswer: "The minority speaks less, while the majority speaks more, making the majority view appear stronger than it is."
            },
            {
              id: "q_w3_p1_3",
              type: "detail",
              text: "What is the 'quasi-statistical sense'?",
              options: [
                "A mathematical formula for voting.",
                "An intuitive ability to gauge the climate of public opinion.",
                "The ability to predict the lottery.",
                "A method for counting votes."
              ],
              correctAnswer: "An intuitive ability to gauge the climate of public opinion."
            },
            {
              id: "q_w3_p1_4",
              type: "detail",
              text: "Who are the 'hard core' described in the final paragraph?",
              options: [
                "The silent majority.",
                "People who work in the media.",
                "A defiant minority willing to face isolation to express their views.",
                "Politicians who lie."
              ],
              correctAnswer: "A defiant minority willing to face isolation to express their views."
            },
            {
              id: "q_w3_p1_5",
              type: "inference",
              text: "What does the term 'pluralistic ignorance' imply about social norms?",
              options: [
                "People are generally unintelligent.",
                "People can be trapped in a norm they privately reject because they wrongly assume everyone else supports it.",
                "Majorities are always ignorant of minority struggles.",
                "Ignorance is bliss in a democracy."
              ],
              correctAnswer: "People can be trapped in a norm they privately reject because they wrongly assume everyone else supports it."
            },
            {
              id: "q_w3_p1_6",
              type: "vocab",
              text: "In the phrase 'susceptible to manipulation,' what does 'susceptible' mean?",
              options: [
                "Immune to.",
                "Likely to be influenced or harmed by.",
                "Suspicious of.",
                "Creating."
              ],
              correctAnswer: "Likely to be influenced or harmed by."
            },
            {
              id: "q_w3_p1_7",
              type: "detail", // Using detail for pronoun reference
              text: "In the sentence 'which drives them to constantly monitor their environment,' what does 'them' refer to?",
              options: [
                "The media.",
                "The opinions.",
                "The individuals.",
                "The repercussions."
              ],
              correctAnswer: "The individuals."
            },
            {
              id: "q_w3_p1_8",
              type: "inference",
              text: "Why might the Spiral of Silence be dangerous for 'democratic discourse'?",
              options: [
                "It makes debates too loud.",
                "It prevents necessary corrections or innovations by silencing valid minority viewpoints.",
                "It costs too much money to survey people.",
                "It makes politicians more popular."
              ],
              correctAnswer: "It prevents necessary corrections or innovations by silencing valid minority viewpoints."
            }
          ]
        },
        {
          passage: {
            title: "The Mechanics of Groupthink",
            wordCount: 510,
            content: `
              <p>"Groupthink" is a psychological phenomenon that occurs within a group of people in which the desire for harmony or conformity results in an irrational or dysfunctional decision-making outcome. Coined by social psychologist Irving Janis in 1972, the term describes a mode of thinking that happens when the members' strivings for unanimity override their motivation to scientifically appraise alternative courses of action. Janis analyzed historical fiascos, such as the Bay of Pigs invasion and the escalation of the Vietnam War, and found that the groups responsible for these decisions shared specific structural faults, most notably a high degree of "cohesion."</p>
              <p>While group cohesion—the sense of solidarity and bonding among members—is generally seen as a positive attribute, Janis argued that in high-stakes situations, it can become a liability. In a highly cohesive group, members often value their relationships with one another more than the quality of the decision they are making. This prioritization leads to "concurrence-seeking," where the primary goal becomes maintaining the group's shared view rather than critically examining the reality of the situation. Dissent is viewed not as a necessary tool for error-correction, but as a threat to the group's unity.</p>
              <p>Janis identified several symptoms of groupthink. One is the "illusion of invulnerability," where the group develops an excessive optimism that encourages taking extreme risks. Another is "self-censorship," where individuals with doubts choose not to voice them to avoid deviating from the perceived consensus. This is often reinforced by "mindguards"—members who effectively protect the group (and its leader) from troublesome or contradictory information. The result is a false consensus; the group believes everyone agrees, not because they actually do, but because the disagreement has been effectively filtered out.</p>
              <p>The consequences of groupthink can be catastrophic. When a group isolates itself from outside opinions and suppresses internal dissent, it fails to consider contingency plans or evaluate the risks of its chosen path. To combat this, organizations are encouraged to appoint a "devil's advocate"—a person whose specific role is to challenge the group's assumptions. By institutionalizing dissent, groups can force themselves to engage in the critical thinking that their natural desire for harmony effectively suppresses.</p>
            `,
            underlinedSentence: "This prioritization leads to 'concurrence-seeking,' where the primary goal becomes maintaining the group's shared view rather than critically examining the reality of the situation."
          },
          questions: [
            {
              id: "q_w3_p2_1",
              type: "detail",
              text: "What is the core definition of 'Groupthink'?",
              options: [
                "A method for brainstorming new ideas.",
                "A phenomenon where the desire for harmony/conformity overrides the realistic appraisal of alternatives.",
                "A way to memorize facts in a group.",
                "A political party strategy."
              ],
              correctAnswer: "A phenomenon where the desire for harmony/conformity overrides the realistic appraisal of alternatives."
            },
            {
              id: "q_w3_p2_2",
              type: "detail",
              text: "According to Janis, how can 'cohesion' be a liability?",
              options: [
                "It makes people fight too much.",
                "Members may prioritize their relationships and unity over the quality of the decision.",
                "It makes the group work too slowly.",
                "It prevents the group from having a leader."
              ],
              correctAnswer: "Members may prioritize their relationships and unity over the quality of the decision."
            },
            {
              id: "q_w3_p2_3",
              type: "detail",
              text: "What is the 'illusion of invulnerability'?",
              options: [
                "The belief that the group cannot fail, leading to excessive risk-taking.",
                "The fear of being attacked.",
                "A military strategy.",
                "The ability to see through walls."
              ],
              correctAnswer: "The belief that the group cannot fail, leading to excessive risk-taking."
            },
            {
              id: "q_w3_p2_4",
              type: "detail",
              text: "What is a 'mindguard'?",
              options: [
                "A helmet worn for safety.",
                "A member who protects the group from contradictory or troublesome information.",
                "A type of security system.",
                "The leader of the group."
              ],
              correctAnswer: "A member who protects the group from contradictory or troublesome information."
            },
            {
              id: "q_w3_p2_5",
              type: "inference",
              text: "Why implies that 'self-censorship' leads to a 'false consensus'?",
              options: [
                "It makes people lie to their bosses.",
                "It makes the group look bigger than it is.",
                "The group appears to agree unanimously only because doubts are never spoken, not because they don't exist.",
                "It prevents voting."
              ],
              correctAnswer: "The group appears to agree unanimously only because doubts are never spoken, not because they don't exist."
            },
            {
              id: "q_w3_p2_6",
              type: "vocab",
              text: "In the phrase 'scientifically appraise alternative courses,' what does 'appraise' mean?",
              options: [
                "To praise or compliment.",
                "To assess the value or quality of.",
                "To ignore.",
                "To create."
              ],
              correctAnswer: "To assess the value or quality of."
            },
            {
              id: "q_w3_p2_7",
              type: "detail", // Using detail for pronoun reference
              text: "In the sentence 'where individuals with doubts choose not to voice them,' what does 'them' refer to?",
              options: [
                "The individuals.",
                "The doubts.",
                "The decisions.",
                "The leaders."
              ],
              correctAnswer: "The doubts."
            },
            {
              id: "q_w3_p2_8",
              type: "inference",
              text: "What is the purpose of appointing a 'devil's advocate'?",
              options: [
                "To create chaos.",
                "To institutionalize dissent and force the group to challenge its assumptions (combat groupthink).",
                "To verify the budget.",
                "To ensure everyone is friends."
              ],
              correctAnswer: "To institutionalize dissent and force the group to challenge its assumptions (combat groupthink)."
            }
          ]
        },
        {
          passage: {
            title: "The Abilene Paradox",
            wordCount: 510,
            content: `
              <p>On a hot July afternoon in Coleman, Texas, a family is comfortably playing dominoes on a shaded porch. The father-in-law suggests, "Let's take a trip to Abilene for dinner." The wife says, "That sounds like a great idea." The husband, despite knowing the drive will be hot, dusty, and long, says, "Sounds good to me. I just hope your mother wants to go." The mother-in-law says, "Of course I want to go. I haven't been to Abilene in a long time."</p>
              <p>The four of them pile into a car with no air conditioning and drive 53 miles through a dust storm. They eat a mediocre meal at a cafeteria and endure the grueling drive back. When they return, exhausted and irritable, they sit in silence. Finally, the husband says, "It was a great trip, wasn't it?"</p>
              <p>The mother-in-law replies, "Actually, I would have rather stayed here. I only went because the rest of you were so enthusiastic." The husband says, "I didn't want to go. I only went to satisfy the rest of you." The wife says, "I just went along to keep you happy. I would have preferred to play dominoes." Finally, the father-in-law, who suggested the trip, says, "I only suggested it because I thought we might get bored. I didn't actually want to go."</p>
              <p>This anecdote, popularized by management expert Jerry Harvey, illustrates the "Abilene Paradox." It describes a situation where a group of people collectively decide on a course of action that is counter to the preferences of many or all of the individuals in the group. Unlike "Groupthink," where members conform to a perceived consensus because they prioritize unity, the Abilene Paradox arises from a failure to communicate desires accurately. Each member mistakenly believes that their own preference is contrary to the group's, and therefore sets aside their own desires to please the others. The irony is that by trying to please everyone, they end up pleasing no one. The group takes a trip to Abilene that *nobody* wanted to take.</p>
            `,
            underlinedSentence: "The irony is that by trying to please everyone, they end up pleasing no one."
          },
          questions: [
            {
              id: "q_w3_p3_1",
              type: "detail",
              text: "What is the 'Abilene Paradox'?",
              options: [
                "A paradox where a group decides to do something that nobody in the group actually wants to do.",
                "A complex map of Texas.",
                "A disagreement about where to eat dinner.",
                "A rule about playing dominoes."
              ],
              correctAnswer: "A paradox where a group decides to do something that nobody in the group actually wants to do."
            },
            {
              id: "q_w3_p3_2",
              type: "detail",
              text: "In the story, why did the husband agree to go to Abilene?",
              options: [
                "He really wanted to go.",
                "He only agreed because he thought the others wanted to go (and to please his mother-in-law).",
                "He needed to buy something in Abilene.",
                "He hated playing dominoes."
              ],
              correctAnswer: "He only agreed because he thought the others wanted to go (and to please his mother-in-law)."
            },
            {
              id: "q_w3_p3_3",
              type: "detail",
              text: "How does the Abilene Paradox differ from Groupthink, according to the passage?",
              options: [
                "It involves fewer people.",
                "It happens in Texas.",
                "Groupthink involves prioritizing unity/consensus; Abilene involves a failure to communicate desires accurately (mismanagement of agreement).",
                "It is the same thing."
              ],
              correctAnswer: "Groupthink involves prioritizing unity/consensus; Abilene involves a failure to communicate desires accurately (mismanagement of agreement)."
            },
            {
              id: "q_w3_p3_4",
              type: "inference",
              text: "What was the result of the family trying to 'please everyone'?",
              options: [
                "Everyone was happy.",
                "They had a great meal.",
                "They ended up doing something that pleased no one.",
                "They saved money."
              ],
              correctAnswer: "They ended up doing something that pleased no one."
            },
            {
              id: "q_w3_p3_5",
              type: "vocab",
              text: "In the phrase 'endure the grueling drive,' what does 'grueling' mean?",
              options: [
                "Fun and exciting.",
                "Extremely tiring and demanding.",
                "Quick.",
                "Scenic."
              ],
              correctAnswer: "Extremely tiring and demanding."
            },
            {
              id: "q_w3_p3_6",
              type: "inference",
              text: "What is the main lesson of the Abilene Paradox?",
              options: [
                "Always check the weather before traveling.",
                "Honest communication of individual preferences is necessary to avoid collective misery.",
                "Parents know best.",
                "Never go to Texas."
              ],
              correctAnswer: "Honest communication of individual preferences is necessary to avoid collective misery."
            }
          ]
        },
        {
          passage: {
            title: "The Tragedy of the Commons",
            wordCount: 520,
            content: `
              <p>In 1968, ecologist Garrett Hardin published an essay titled "The Tragedy of the Commons," describing a dilemma that occurs when individuals acting in their own self-interest ultimately deplete a shared resource, even when it is clear that doing so is not in anyone’s long-term interest.</p>
              <p>Hardin asks us to imagine a pasture that is open to all herdsmen in a village. The pasture is the "commons." Each herdsman wants to maximize his gain, so he asks himself, "What is the utility to me of adding one more animal to my herd?" The benefit is clear: he receives all the proceeds from the sale of the additional animal. The cost, however, is the additional overgrazing created by one more animal. Since the effects of overgrazing are shared by *all* the herdsmen, the cost to the individual herdsman is only a fraction of the total damage.</p>
              <p>The rational herdsman concludes that the only sensible course for him is to add another animal to his herd. And another. And another. But this is the conclusion reached by each and every rational herdsman sharing the commons. Therein is the tragedy. Each man is locked into a system that compels him to increase his herd without limit—in a world that is limited. Eventually, the pasture is overgrazed and destroyed, and all the herdsmen lose their livelihood.</p>
              <p>The "Tragedy of the Commons" applies far beyond agriculture. It explains traffic congestion (each driver gains by driving, but too many drivers clog the road), ocean overfishing, and pollution. The atmosphere itself is a commons; each factory gains by emitting cheaper pollutants, but the collective cost is global climate change. Hardin argued that this problem has no technical solution; it requires a fundamental change in human values or, more pragmatically, "mutual coercion, mutually agreed upon"—laws and regulations that limit individual freedom to protect the collective good.</p>
            `,
            underlinedSentence: "Each man is locked into a system that compels him to increase his herd without limit—in a world that is limited."
          },
          questions: [
            {
              id: "q_w3_p4_1",
              type: "detail",
              text: "What is the 'commons' in Hardin's example?",
              options: [
                "A shared pasture open to all herdsmen.",
                "A private garden.",
                "A grocery store.",
                "A type of animal."
              ],
              correctAnswer: "A shared pasture open to all herdsmen."
            },
            {
              id: "q_w3_p4_2",
              type: "detail",
              text: "Why does the herdsman decide to add another animal?",
              options: [
                "He likes animals.",
                "The benefit (profit) goes entirely to him, while the cost (overgrazing) is shared by everyone.",
                "He is forced to by the government.",
                "He doesn't know any better."
              ],
              correctAnswer: "The benefit (profit) goes entirely to him, while the cost (overgrazing) is shared by everyone."
            },
            {
              id: "q_w3_p4_3",
              type: "inference",
              text: "Why is the situation described as a 'tragedy'?",
              options: [
                "It is a sad story.",
                "The inevitable destruction of the resource caused by rational individual actions leads to ruin for everyone.",
                "The cows get sick.",
                "The herdsmen fight each other."
              ],
              correctAnswer: "The inevitable destruction of the resource caused by rational individual actions leads to ruin for everyone."
            },
            {
              id: "q_w3_p4_4",
              type: "vocab",
              text: "In the phrase 'deplete a shared resource,' what does 'deplete' mean?",
              options: [
                "To increase.",
                "To use up the supply or resources of.",
                "To share.",
                "To protect."
              ],
              correctAnswer: "To use up the supply or resources of."
            },
            {
              id: "q_w3_p4_5",
              type: "inference",
              text: "According to the passage, what is the atmosphere considered?",
              options: [
                "A commons.",
                "private property.",
                "A limitless resource.",
                "A factory."
              ],
              correctAnswer: "A commons."
            },
            {
              id: "q_w3_p4_6",
              type: "detail",
              text: "What did Hardin suggest as a solution?",
              options: [
                "Everyone should stop farming.",
                "There is no solution.",
                "Mutual coercion, mutually agreed upon' (laws/regulations).",
                "New technology."
              ],
              correctAnswer: "'Mutual coercion, mutually agreed upon' (laws/regulations)."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Conformity", definition: "Compliance with standards, rules, or laws; behavior in accordance with socially accepted conventions." },
        { word: "Consensus", definition: "General agreement among a group of people." },
        { word: "Repercussions", definition: "An unintended consequence occurring some time after an event or action, especially an unwelcome one." },
        { word: "Dissent", definition: "The expression or holding of opinions at variance with those previously, commonly, or officially held." }
      ]
    };
  }

  // Week 4: Ethics (Academic Pivot)
  if (weekNum === 4) {
    return {
      id: 4,
      title: "Ethics",
      theme: "Ethics",
      mainIdeaHint: "Ethics isn't about feeling good; it's about doing right. Notice how the 'fair' choice often feels cold or unkind.",
      passages: [
        {
          passage: {
            title: "The Calculus of Consequence",
            wordCount: 510,
            content: `
              <p>In the study of moral philosophy, two dominant frameworks often stand in opposition: Utilitarianism and Deontology. These systems offer fundamentally different answers to the question, "What makes an action right?" Utilitarianism, a form of consequentialism championed by philosophers like Jeremy Bentham and John Stuart Mill, posits that the morality of an action is determined solely by its outcome. The core principle is the "Greatest Happiness Principle," which argues that the best action is the one that maximizes overall well-being and minimizes suffering for the greatest number of people. From a strict utilitarian perspective, no action is inherently wrong; its value is purely a calculation of its consequences.</p>
              <p>In sharp contrast, Deontology, most famously associated with Immanuel Kant, argues that morality is grounded in moral duties and rules, regardless of the consequences. For a deontologist, certain actions—such as lying, stealing, or killing—are inherently wrong, even if doing them would bring about a positive outcome. Kant proposed the "Categorical Imperative," a rule suggesting that one should only act according to rules that could be universally applied to everyone. If it is wrong for one person to lie, it is wrong for everyone, and no amount of "good consequences" can justify a lie.</p>
              <p>The tension between these two frameworks is often illustrated through the "Trolley Problem," a famous thought experiment introduced by Philippa Foot in 1967. In this scenario, a runaway trolley is heading towards five people tied to the tracks. A bystander has the option to pull a lever that will divert the trolley onto a sidetrack, where it will kill only one person. A utilitarian would argue that pulling the lever is the moral imperative, as saving five lives at the cost of one results in a net "profit" of four lives. The calculation is simple mathematics.</p>
              <p>However, a deontologist might argue that pulling the lever is ethically impermissible. By actively intervening, the bystander is treating the single person on the sidetrack as a mere means to an end. In the deontological view, we have a duty not to kill innocent people, and shifting the trolley violates this duty, regardless of how many others are saved. While Utilitarianism focuses on the *ends*, Deontology focuses on the *means*. This philosophical divide remains significant today, influencing debates in law, medicine, and public policy, where the rights of the individual often clash with the welfare of the collective.</p>
            `,
            underlinedSentence: "While Utilitarianism focuses on the *ends*, Deontology focuses on the *means*."
          },
          questions: [
            {
              id: "q_w4_p1_1",
              type: "detail",
              text: "What is the core difference between Utilitarianism and Deontology?",
              options: [
                "Utilitarianism is for politics; Deontology is for religion.",
                "Utilitarianism judges actions by their outcomes; Deontology judges them by inherent duties/rules.",
                "Utilitarianism was invented by Kant; Deontology by Mill.",
                "There is no difference."
              ],
              correctAnswer: "Utilitarianism judges actions by their outcomes; Deontology judges them by inherent duties/rules."
            },
            {
              id: "q_w4_p1_2",
              type: "detail",
              text: "What is the 'Greatest Happiness Principle'?",
              options: [
                "You should always do what makes you happy.",
                "The best action is the one that maximizes well-being for the greatest number of people.",
                "Happiness is impossible to achieve.",
                "The government should provide free entertainment."
              ],
              correctAnswer: "The best action is the one that maximizes well-being for the greatest number of people."
            },
            {
              id: "q_w4_p1_3",
              type: "detail",
              text: "How would a strict utilitarian view the action of lying?",
              options: [
                "It is always wrong, no matter what.",
                "It is only wrong if you get caught.",
                "It is not inherently wrong; its morality depends on whether the lie leads to a positive or negative outcome.",
                "It is always right."
              ],
              correctAnswer: "It is not inherently wrong; its morality depends on whether the lie leads to a positive or negative outcome."
            },
            {
              id: "q_w4_p1_4",
              type: "detail",
              text: "What is the 'Categorical Imperative'?",
              options: [
                "A rule that says we should only act on principles that can be universally applied to everyone.",
                "A law against speeding.",
                "A mathematical formula for calculating happiness.",
                "A religious commandment."
              ],
              correctAnswer: "A rule that says we should only act on principles that can be universally applied to everyone."
            },
            {
              id: "q_w4_p1_5",
              type: "inference",
              text: "Why might a deontologist refuse to pull the lever in the Trolley Problem?",
              options: [
                "They are afraid of trains.",
                "They believe that actively killing one person violates a moral duty, regardless of the consequences.",
                "They want the five people to die.",
                "They don't know how to use the lever."
              ],
              correctAnswer: "They believe that actively killing one person violates a moral duty, regardless of the consequences."
            },
            {
              id: "q_w4_p1_6",
              type: "vocab",
              text: "In the phrase 'ethically impermissible,' what does 'impermissible' mean?",
              options: [
                "Allowed.",
                "Not allowed; forbidden.",
                "Encouraged.",
                "Possible."
              ],
              correctAnswer: "Not allowed; forbidden."
            },
            {
              id: "q_w4_p1_7",
              type: "detail", // Using detail for pronoun reference
              text: "In the sentence 'where it will kill only one person,' who (or what) does 'it' refer to?",
              options: [
                "The lever.",
                "The bystander.",
                "The trolley.",
                "The track."
              ],
              correctAnswer: "The trolley."
            },
            {
              id: "q_w4_p1_8",
              type: "inference",
              text: "What does the passage suggest about the relationship between individual rights and collective welfare?",
              options: [
                "They never conflict.",
                "Collective welfare is always more important.",
                "They often clash, with Utilitarianism favoring the collective and Deontology often protecting the individual.",
                "Individual rights don't exist."
              ],
              correctAnswer: "They often clash, with Utilitarianism favoring the collective and Deontology often protecting the individual."
            }
          ]
        },
        {
          passage: {
            title: "The Moral Machine",
            wordCount: 500,
            content: `
              <p>For decades, ethical dilemmas like the Trolley Problem were confined to university classrooms—hypothetical scenarios designed to probe the limits of human morality. However, with the advent of artificial intelligence (AI) and autonomous vehicles (AVs), these abstract thought experiments have transitioned into urgent engineering challenges. When a self-driving car encounters an unavoidable accident scenario—for instance, choosing between swerving into a barrier (killing the passenger) or striking a pedestrian—the vehicle’s algorithm must make a split-second decision. This decision is not merely a technical reaction; it is an encoded ethical value judgment.</p>
              <p>The challenge lies in defining *whose* ethics should be encoded. In 2016, researchers at MIT launched the "Moral Machine," a massive online experiment that presented millions of users worldwide with variations of these accident scenarios. The goal was to crowdsource a global perspective on machine ethics. The results revealed significant cultural divergences. In some cultures, respondents consistently chose to save the young over the elderly; in others, there was a strong preference for saving higher-status individuals or strictly adhering to traffic laws regardless of the casualty count.</p>
              <p>This variance presents a profound difficulty for engineers and policymakers. If a car manufacturer in Germany programs a vehicle to prioritize passenger safety above all else, but a market in Asia prefers a utilitarian approach that minimizes total casualties, can the same software be used globally? Furthermore, there is the problem of "responsibility gaps." In traditional accidents, human drivers are held accountable for their split-second reactions. But when an algorithm makes a pre-meditated decision to sacrifice one life to save another, who is responsible? The programmer? The manufacturer? The passenger?</p>
              <p>Ultimately, the "Moral Machine" demonstrates that technology is not value-neutral. Every line of code in an autonomous system represents a choice about what—and who—matters. As machines become more autonomous, we are forced to externalize and standardize our internal moral compasses. We can no longer rely on human instinct or ambiguity; we must translate the messy, complex, and often contradictory nature of human ethics into the rigid, binary logic of machine code. The car is no longer just a machine; it is a moral agent.</p>
            `,
            underlinedSentence: "This decision is not merely a technical reaction; it is an encoded ethical value judgment."
          },
          questions: [
            {
              id: "q_w4_p2_1",
              type: "detail",
              text: "How has the status of the 'Trolley Problem' changed with the arrival of AI?",
              options: [
                "It has been forgotten.",
                "It has moved from an abstract thought experiment to an urgent engineering/coding challenge.",
                "It has been solved by computers.",
                "It is now only used in history classes."
              ],
              correctAnswer: "It has moved from an abstract thought experiment to an urgent engineering/coding challenge."
            },
            {
              id: "q_w4_p2_2",
              type: "detail",
              text: "What was the 'Moral Machine' experiment?",
              options: [
                "A robot that could fight.",
                "An online experiment by MIT to crowdsource global perspectives on how autonomous vehicles should handle accident scenarios.",
                "A new type of engine.",
                "A video game."
              ],
              correctAnswer: "An online experiment by MIT to crowdsource global perspectives on how autonomous vehicles should handle accident scenarios."
            },
            {
              id: "q_w4_p2_3",
              type: "detail",
              text: "What did the results of the Moral Machine experiment reveal?",
              options: [
                "Everyone in the world agrees on ethics.",
                "Significant cultural divergences in ethical preferences (e.g., saving young vs. old).",
                "No one cares about self-driving cars.",
                "Computers are smarter than humans."
              ],
              correctAnswer: "Significant cultural divergences in ethical preferences (e.g., saving young vs. old)."
            },
            {
              id: "q_w4_p2_4",
              type: "inference",
              text: "What is the 'responsibility gap' mentioned in the passage?",
              options: [
                "The gap between the front and back seats.",
                "The difficulty in assigning blame/accountability when an algorithm makes a decision, compared to a human driver.",
                "The time it takes for a car to stop.",
                "The price difference between electric and gas cars."
              ],
              correctAnswer: "The difficulty in assigning blame/accountability when an algorithm makes a decision, compared to a human driver."
            },
            {
              id: "q_w4_p2_5",
              type: "vocab",
              text: "In the phrase 'cultural divergences,' what does 'divergences' mean?",
              options: [
                "Similarities.",
                "Differences or separations.",
                "Meetings.",
                "Agreements."
              ],
              correctAnswer: "Differences or separations."
            },
            {
              id: "q_w4_p2_6",
              type: "detail", // Using detail for pronoun reference
              text: "In the sentence 'choosing between swerving into a barrier... or striking a pedestrian,' who is the 'passenger' contrast with?",
              options: [
                "The pedestrian.",
                "The driver.",
                "The car.",
                "The robot."
              ],
              correctAnswer: "The pedestrian."
            },
            {
              id: "q_w4_p2_7",
              type: "detail",
              text: "Why does the passage argue that technology is not 'value-neutral'?",
              options: [
                "Because computers are expensive.",
                "Because every line of code represents a choice about what matters (ethics).",
                "Because robots have feelings.",
                "Because better technology costs more."
              ],
              correctAnswer: "Because every line of code represents a choice about what matters (ethics)."
            },
            {
              id: "q_w4_p2_8",
              type: "inference",
              text: "What is the fundamental difficulty in programming ethics, according to the final paragraph?",
              options: [
                "Computers are too slow.",
                "Translating messy, complex human ethics into rigid, binary machine code.",
                "There aren't enough programmers.",
                "Cars cannot drive themselves."
              ],
              correctAnswer: "Translating messy, complex human ethics into rigid, binary machine code."
            }
          ]
        },
        {
          passage: {
            title: "The Veil of Ignorance",
            wordCount: 515,
            content: `
              <p>In his 1971 masterpiece *A Theory of Justice*, philosopher John Rawls introduced a thought experiment designed to solve the problem of unfairness in society. He asked us to imagine a group of people gathering to create a new social contract—the laws and rules that will govern their future society. However, there is a catch: they must make these decisions from behind a "Veil of Ignorance."</p>
              <p>Behind this veil, no one knows who they will be in this new society. They do not know if they will be rich or poor, healthy or sick, intelligent or not, male or female, or what race or religion they will belong to. They are stripped of all bias regarding their own personal advantages or disadvantages. Rawls argued that rational people in this "Original Position" would inevitably choose a system of justice that is fair to everyone, simply because they have to hedge their bets. Fearing that they might end up as the poorest or most marginalized member of society, they would ensure that the worst-off person is as well-off as possible.</p>
              <p>For example, would you design a society where 10% of the population owns slaves and 90% are slaves? Behind the Veil of Ignorance, you would reject this, because there is a 90% chance you would be a slave. Would you design a society with no healthcare for the poor? You would reject this too, fearing you might be poor and sick. Therefore, Rawls concluded, the only rational choice is a society based on "Fairness as Justice," prioritizing basic liberties for all and allowing inequality only if it benefits the least advantaged.</p>
              <p>The "Veil of Ignorance" serves as a powerful tool for testing our own political and ethical beliefs. It forces us to separate "what is good for me" from "what is just." If a law or policy seems fair only when you know you will be on the winning side of it, then, according to Rawls, it is not truly just.</p>
            `,
            underlinedSentence: "If a law or policy seems fair only when you know you will be on the winning side of it, then, according to Rawls, it is not truly just."
          },
          questions: [
            {
              id: "q_w4_p3_1",
              type: "detail",
              text: "What is the 'Veil of Ignorance'?",
              options: [
                "A magic cloak.",
                "A thought experiment where people design a society without knowing their own future position (wealth, talent, race, etc.) in it.",
                "A religious ceremony.",
                "A lack of education."
              ],
              correctAnswer: "A thought experiment where people design a society without knowing their own future position (wealth, talent, race, etc.) in it."
            },
            {
              id: "q_w4_p3_2",
              type: "detail",
              text: "What did Rawls argue rational people would do behind the Veil?",
              options: [
                "Gamble on being king.",
                "Choose a system that is fair to everyone, ensuring the worst-off person is protected.",
                "Fight each other.",
                "Refuse to participate."
              ],
              correctAnswer: "Choose a system that is fair to everyone, ensuring the worst-off person is protected."
            },
            {
              id: "q_w4_p3_3",
              type: "inference",
              text: "Why would someone reject a slave-owning society from behind the Veil?",
              options: [
                "They dislike history.",
                "There is a high statistical probability (e.g., 90%) that they would end up as a slave.",
                "Slaves are expensive.",
                "They prefer robots."
              ],
              correctAnswer: "There is a high statistical probability (e.g., 90%) that they would end up as a slave."
            },
            {
              id: "q_w4_p3_4",
              type: "vocab",
              text: "In the phrase 'hedge their bets,' what does 'hedge' mean?",
              options: [
                "To plant a bush.",
                "To protect oneself against loss or a negative outcome.",
                "To gamble recklessly.",
                "To jump over."
              ],
              correctAnswer: "To protect oneself against loss or a negative outcome."
            },
            {
              id: "q_w4_p3_5",
              type: "inference",
              text: "What implies that the Veil of Ignorance creates 'fairness'?",
              options: [
                "It makes everyone rich.",
                "It removes the bias of self-interest ('what is good for me') from the decision-making process.",
                "It looks pretty.",
                "It is a law."
              ],
              correctAnswer: "It removes the bias of self-interest ('what is good for me') from the decision-making process."
            },
            {
              id: "q_w4_p3_6",
              type: "detail",
              text: "What is the result of the 'Original Position' according to Rawls?",
              options: [
                "Anarchy.",
                "A society based on 'Fairness as Justice.'",
                "Communism.",
                "Monarchy."
              ],
              correctAnswer: "A society based on 'Fairness as Justice.'"
            }
          ]
        },
        {
          passage: {
            title: "The Banality of Evil",
            wordCount: 525,
            content: `
              <p>In 1961, the political theorist Hannah Arendt traveled to Jerusalem to report on the trial of Adolf Eichmann, a major organizer of the Holocaust. Eichmann had been responsible for the logistics of mass deportation, managing the train schedules that transported millions of Jews to extermination camps. The world expected to see a monster—a man seething with hatred, a fanatic shouting anti-Semitic slurs, a demon in human form. This expectation stemmed from the belief that monstrous acts must be committed by monstrous people.</p>
              <p>Instead, Arendt found a man who was terrifyingly ordinary. Eichmann was not a fanatic; he was a bureaucrat. He spoke in clichés and bureaucratic jargon. He did not seem driven by a burning hatred for Jews, but rather by a desire to advance his career and please his superiors. He described his work not as murder, but as "administration." He was concerned with efficiency, schedules, and following orders. When confronted with the horror of his actions, he defended himself by claiming he was simply "doing his job" and following the law of the state.</p>
              <p>Arendt coined the phrase "the banality of evil" to describe this phenomenon. She argued that the great evils in history are not executed by fanatics or sociopaths, but by ordinary people who accept the premises of their state and therefore participate in these premises with the view that their actions are normal. It is the failure to think—the inability to engage in an internal dialogue with oneself about the morality of one's actions—that permits such evil to occur. Eichmann had ceased to be a moral agent; he had become a cog in a machine, disassociating himself from the consequences of his paperwork.</p>
              <p>Arendt’s thesis was controversial. Many felt it trivialized the Holocaust or absolved Eichmann of guilt. However, Arendt argued the opposite: recognizing the "banality" of evil is urgent because it suggests that evil is not a rare anomaly, but a potential lurking within any system where individuals surrender their moral judgment to authority. It is a warning that the most dangerous person is not necessarily the screaming zealot, but the quiet functionary who signs the death warrant without ever looking up from his desk.</p>
            `,
            underlinedSentence: "It is a warning that the most dangerous person is not necessarily the screaming zealot, but the quiet functionary who signs the death warrant without ever looking up from his desk."
          },
          questions: [
            {
              id: "q_w4_p4_1",
              type: "detail",
              text: "What did the world expect Adolf Eichmann to be like?",
              options: [
                "A quiet bureaucrat.",
                "A monster, a fanatic seething with hatred.",
                "A genius.",
                "A soldier."
              ],
              correctAnswer: "A monster, a fanatic seething with hatred."
            },
            {
              id: "q_w4_p4_2",
              type: "detail",
              text: "How did Arendt describe Eichmann's actual demeanor?",
              options: [
                "Terrifyingly ordinary; a bureaucrat concerned with career and schedules.",
                "Angry and violent.",
                "Sad and apologetic.",
                "Funny and charming."
              ],
              correctAnswer: "Terrifyingly ordinary; a bureaucrat concerned with career and schedules."
            },
            {
              id: "q_w4_p4_3",
              type: "detail",
              text: "What does the phrase 'the banality of evil' mean?",
              options: [
                "Evil is boring.",
                "Great evils are often committed by ordinary people who stop thinking and blindly follow orders/bureaucracy.",
                "Evil doesn't exist.",
                "Evil is rare."
              ],
              correctAnswer: "Great evils are often committed by ordinary people who stop thinking and blindly follow orders/bureaucracy."
            },
            {
              id: "q_w4_p4_4",
              type: "inference",
              text: "Why did Eichmann defend himself by saying he was 'doing his job'?",
              options: [
                "He was lying.",
                "He had disassociated himself from the moral consequences of his actions, viewing them as administrative tasks.",
                "He wanted a promotion.",
                "He was forced to say that."
              ],
              correctAnswer: "He had disassociated himself from the moral consequences of his actions, viewing them as administrative tasks."
            },
            {
              id: "q_w4_p4_5",
              type: "vocab",
              text: "In the phrase 'the quiet functionary,' what does 'functionary' mean?",
              options: [
                "A machine.",
                "A person who has to perform official functions or duties; an official.",
                "A mathematician.",
                "A soldier."
              ],
              correctAnswer: "A person who has to perform official functions or duties; an official."
            },
            {
              id: "q_w4_p4_6",
              type: "inference",
              text: "What is the warning inherent in Arendt's thesis?",
              options: [
                "Beware of monsters.",
                "Evil is a potential within any system where individuals surrender moral judgment to authority.",
                "Don't trust trains.",
                "All bureaucrats are evil."
              ],
              correctAnswer: "Evil is a potential within any system where individuals surrender moral judgment to authority."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Consequentialism", definition: "The doctrine that the morality of an action is to be judged solely by its consequences." },
        { word: "Imperative", definition: "Of vital importance; crucial. In philosophy, a duty or rule." },
        { word: "Autonomous", definition: "(of a vehicle) Moving or operating without a human driver." },
        { word: "Divergence", definition: "The process or state of separating or differing." }
      ]
    };
  }

  // Week 5: Digital Communication
  if (weekNum === 5) {
    return {
      id: 5,
      title: "Lost in Transmission",
      theme: "Media",
      mainIdeaHint: "Communication is more than words. When we remove face and voice, what do we lose?",
      passages: [
        {
          passage: {
            title: "The Text Trap",
            wordCount: 530,
            content: `
              <p>Jason stared at his phone, his thumb hovering anxiously over the "send" button. He had been trying to draft a simple text message for twenty minutes. The recipient was Miles, his lab partner for the upcoming Chemistry finals. Jason had missed their scheduled study session that afternoon because he had frankly fallen asleep, but explaining that felt pathetic.</p>
              <p>The problem was tone. Every way he typed the apology looked wrong. "Sorry about today" seemed too casual, like he didn't care about Miles's time. "I deeply regret my absence" sounded stiff and robotic, like a corporate press release. "I fell asleep, my bad" sounded irresponsible. Finally, he opted for brevity. He typed, "My bad. Won't happen again," and hit send.</p>
              <p>He expected a quick reply—maybe a thumbs-up emoji or a "No worries." Instead, three grey dots bubbled on the screen for a long, agonizing minute. Then, they disappeared. Another minute passed. Finally, a single word appeared on the screen: "Fine."</p>
              <p>Jason’s stomach dropped. In person, the word "fine" could mean a dozen different things, depending on the pitch, volume, and facial expression accompanying it. Spoken with a warm smile, it was a granting of forgiveness. Spoken with a shrug, it was indifference. But on the screen, stripped of all human context, "fine" looked cold. It looked sharp. To Jason, it looked like barely suppressed rage.</p>
              <p>*He hates me,* Jason thought, pacing around his bedroom. *He thinks I'm a slacker and he's going to ask for a new partner.* The anxiety spiraled. Jason text his other friend, Sarah, to ask for advice. "He just said 'Fine.' Is he mad?" Sarah replied, "Oof. The period at the end? Definitely mad. Using a period in a text is practically shouting."</p>
              <p>The next day at school, Jason moved through the hallways like a fugitive. He avoided the cafeteria where Miles usually ate lunch, eating his sandwich in the library instead. He was convinced that a confrontation was inevitable. When they finally bumped into each other near the lockers, Jason flinched. "Where were you?" Miles asked, looking genuinely confused. "I waited for you to text me back about the new study time."</p>
              <p>"You... you said 'Fine,'" Jason stammered, gripping his backpack straps. "I thought you were furious. Sarah said the period meant you were shouting."</p>
              <p>Miles burst out laughing, shaking his head in disbelief. "I was in the middle of a Ranked match in *Valorant*. I typed 'Fine' with one thumb while trying to defuse a spike. I wasn't angry; I was just busy. I didn't even know I used a period."</p>
              <p>Jason felt the tension drain out of him, replaced by a wave of embarrassment. He had projected his own guilt and insecurity onto the blank screen. Without the context of a voice or a face, he had filled in the silence with his worst fears. He learned then that digital text is a remarkably poor container for emotional nuance. In the future, he decided, he would skip the agonizing analysis and just make a two-minute phone call—which is often worth a thousand text messages.</p>
            `,
            underlinedSentence: "He learned then that digital text is a remarkably poor container for emotional nuance."
          },
          questions: [
            {
              id: "q_w5_p1_1",
              type: "detail",
              text: "Which title best captures the main theme of the passage?",
              options: [
                "The Importance of Study Sessions",
                "Miles's Video Game Addiction",
                "The Danger of Misinterpreting Digital Tone",
                "Jason’s Apology Letter"
              ],
              correctAnswer: "The Danger of Misinterpreting Digital Tone"
            },
            {
              id: "q_w5_p1_2",
              type: "detail",
              text: "Why did Jason struggle to send the initial text?",
              options: [
                "His phone battery was low",
                "He couldn't find the right phrasing to convey the correct level of sorry without sounding weird",
                "He didn't want to apologize",
                "He deleted Miles's number"
              ],
              correctAnswer: "He couldn't find the right phrasing to convey the correct level of sorry without sounding weird"
            },
            {
              id: "q_w5_p1_3",
              type: "detail",
              text: "Why did the word 'Fine' make Jason anxious?",
              options: [
                "It was typed in all capital letters",
                "It was followed by an angry emoji",
                "Lacking vocal tone or facial expression, he interpreted it as cold or angry",
                "It was a word Miles never used"
              ],
              correctAnswer: "Lacking vocal tone or facial expression, he interpreted it as cold or angry"
            },
            {
              id: "q_w5_p1_4",
              type: "inference",
              text: "What role did Sarah play in the situation?",
              options: [
                "She helped Jason write the apology.",
                "She validated Jason's anxiety and made it worse by over-analyzing the punctuation.",
                "She told Miles that Jason was hiding.",
                "She offered to be their new lab partner."
              ],
              correctAnswer: "She validated Jason's anxiety and made it worse by over-analyzing the punctuation."
            },
            {
              id: "q_w5_p1_5",
              type: "vocab",
              text: "In the final paragraph, what does the phrase 'projected his own guilt' mean?",
              options: [
                "Jason displayed his guilt on a projector screen",
                "Jason assumed Miles felt the way Jason expected him to feel (angry) because Jason himself felt guilty",
                "Jason blamed Miles for the mistake",
                "Jason wrote an essay about guilt"
              ],
              correctAnswer: "Jason assumed Miles felt the way Jason expected him to feel (angry) because Jason himself felt guilty"
            },
            {
              id: "q_w5_p1_6",
              type: "inference",
              text: "What is the 'lesson' Jason learned at the end of the passage?",
              options: [
                "Never text his friends.",
                "Always use emojis to be clear.",
                "Digital text is often ambiguous, and hearing a voice is better for resolving emotional situations.",
                "Miles is a bad lab partner."
              ],
              correctAnswer: "Digital text is often ambiguous, and hearing a voice is better for resolving emotional situations."
            },
            {
              id: "q_w5_p1_7",
              type: "detail", // Using detail for pronoun reference
              text: "In the third paragraph ('Then, they disappeared...'), what does the pronoun 'they' refer to?",
              options: [
                "The text messages.",
                "The three grey dots (typing indicator).",
                "Jason and Miles.",
                "The chemistry notes."
              ],
              correctAnswer: "The three grey dots (typing indicator)."
            },
            {
              id: "q_w5_p1_8",
              type: "detail",
              text: "What was Miles actually doing when he sent the text?",
              options: [
                "He was studying.",
                "He was eating lunch.",
                "He was in the middle of a video game and was distracted.",
                "He was talking to Sarah."
              ],
              correctAnswer: "He was in the middle of a video game and was distracted."
            }
          ]
        },
        {
          passage: {
            title: "The Curated Self",
            wordCount: 510,
            content: `
              <p>For three years, Kaito had been building a digital monument to himself. His social media profile was a masterpiece of "The Curated Self," a carefully edited gallery designed to impress. It featured photos of him hiking in the Swiss Alps, holding debate trophies, and volunteering at animal shelters. To his 2,000 followers, Kaito was an adventurer, a scholar, and a saint. He was the main character of a perfect life.</p>
              <p>In reality, Kaito was tired. The hiking photo was from a family trip two years ago where he had actually spent most of the time in the rental car with motion sickness; he had stepped out for exactly five minutes to take the picture. The debate trophy was for "Participation," not "First Place," though the angle of the photo conveniently hid the engraving. And while he did volunteer at the shelter, he often spent half the shift trying to frame the perfect selfie with a golden retriever rather than cleaning the cages.</p>
              <p>The crack in his carefully constructed façade appeared during his interview for the prestigious Student Leadership Program. The interviewer, Ms. Vance, had clearly done her research. She sat with a printed copy of his online profile on her desk. "You seem to have a very... active and successful life," she said, tapping the photo of him on a mountain peak. "You never seem to struggle. Tell me about a time you failed."</p>
              <p>Kaito froze. His brain scrambled for an answer. His online narrative didn't have room for failure. He had deleted every blurry photo, every bad grade, every moment of awkwardness or defeat. He had trained himself to present only the highlights, the victories, the "best angles." He realized with a shock that he couldn't remember the last time he had admitted to a mistake, even to himself.</p>
              <p>"I... I don't really fail," he said, instantly regretting the arrogance of the statement.</p>
              <p>Ms. Vance raised an eyebrow, unimpressed. "That is unfortunate," she said, closing his file. "Leaders aren't people who never fall. They are people who know how to get back up. If you've never failed, you've never pushed yourself hard enough. We are looking for resilience, Kaito, not perfection."</p>
              <p>Kaito left the interview feeling exposed. He walked home in the rain, resisting the urge to take a moody, "aesthetic" photo of the droplets on the window. He realized that by filtering out his flaws, he had also filtered out his humanity. He had become a character in a story, two-dimensional and brittle. The digital Kaito was perfect, untouchable, and admired. But the real Kaito was lonely, trapped behind a glossy wall of his own making, afraid that if people saw the real him, they would click "unfollow."</p>
            `,
            underlinedSentence: "The digital Kaito was perfect, but the real Kaito was lonely, trapped behind a wall of his own making."
          },
          questions: [
            {
              id: "q_w5_p2_1",
              type: "detail",
              text: "What is the central message of the passage?",
              options: [
                "Social media is a great way to make friends",
                "Building a perfect online persona can alienate you from your real self and limit your growth",
                "Photography is a useful skill for leadership",
                "Interviews are unfair"
              ],
              correctAnswer: "Building a perfect online persona can alienate you from your real self and limit your growth"
            },
            {
              id: "q_w5_p2_2",
              type: "detail",
              text: "What does the term 'The Curated Self' imply?",
              options: [
                "A self-portrait painted in a museum",
                "A version of oneself that is carefully selected and edited for display, highlighting only the good parts",
                "A chaotic and disorganized personality",
                "A person who works in a library"
              ],
              correctAnswer: "A version of oneself that is carefully selected and edited for display, highlighting only the good parts"
            },
            {
              id: "q_w5_p2_3",
              type: "inference",
              text: "Why did Kaito struggle to answer Ms. Vance's question about failure?",
              options: [
                "He was too humble.",
                "He had conditioned himself to ignore and hide his failures to maintain his image.",
                "He truly never failed at anything.",
                "He didn't understand the question."
              ],
              correctAnswer: "He had conditioned himself to ignore and hide his failures to maintain his image."
            },
            {
              id: "q_w5_p2_4",
              type: "detail",
              text: "What was the truth behind the debate trophy photo?",
              options: [
                "Kaito bought it at a store.",
                "It was actually a tennis trophy.",
                "It was a 'Participation' trophy, not a first-place prize.",
                "He stole it from a friend."
              ],
              correctAnswer: "It was a 'Participation' trophy, not a first-place prize."
            },
            {
              id: "q_w5_p2_5",
              type: "vocab",
              text: "In the dialogue, what does the word 'resilience' mean?",
              options: [
                "The ability to recover quickly from difficulties; toughness.",
                "The ability to take good photos.",
                "The state of being perfect.",
                "The ability to avoid making mistakes."
              ],
              correctAnswer: "The ability to recover quickly from difficulties; toughness."
            },
            {
              id: "q_w5_p2_6",
              type: "detail", // Using detail for pronoun reference
              text: "In the final paragraph ('...they would click 'unfollow'...'), who does the pronoun 'they' refer to?",
              options: [
                "Ms. Vance.",
                "His family.",
                "His followers / other people.",
                "The animals at the shelter."
              ],
              correctAnswer: "His followers / other people."
            },
            {
              id: "q_w5_p2_7",
              type: "detail",
              text: "How did Ms. Vance react to Kaito's claim that he doesn't fail?",
              options: [
                "She hired him immediately.",
                "She raised an eyebrow and told him that leaders need to know how to recover from failure.",
                "She asked for proof.",
                "She looked at his Instagram again."
              ],
              correctAnswer: "She raised an eyebrow and told him that leaders need to know how to recover from failure."
            },
            {
              id: "q_w5_p2_8",
              type: "inference",
              text: "Why did Kaito resist the urge to take a photo in the rain?",
              options: [
                "His phone was dead.",
                "He didn't want to get his phone wet.",
                "He was starting to reject his habit of turning every moment into content for his online persona.",
                "He thought the rain was ugly."
              ],
              correctAnswer: "He was starting to reject his habit of turning every moment into content for his online persona."
            }
          ]
        },
        {
          passage: {
            title: "The Paradox of Connectivity",
            wordCount: 515,
            content: `
              <p>In the early days of the internet, sociologists and technologists alike predicted a new golden age of human connection. The logic was simple and compelling: if we remove the barriers of geography, if we allow instantaneous communication between any two people on the planet, loneliness will become a thing of the past. We built a global network of fiber-optic cables, launched satellites, and put a smartphone in nearly every pocket. We are now, statistically, the most connected society in human history.</p>
              <p>Yet, a strange paradox has emerged. As our digital connections have multiplied, our reported rates of loneliness have skyrocketed. Social psychologists call this the "Paradox of Connectivity." It suggests that while the *quantity* of our interactions has increased, the *quality* has degraded. We have traded deep, messy, high-bandwidth face-to-face interactions for shallow, curated, low-bandwidth digital signals.</p>
              <p>The core of the problem lies in the nature of digital intimacy. When we communicate through screens, we filter out the "friction" of real life. We can edit our texts, choose our best photos, and delay our responses. This control feels safe, but it prevents the vulnerability required for true bonding. In a physical conversation, we cannot delete a stutter or filter out a tired expression. We are exposed. It is precisely this exposure—this shared experience of authentic imperfection—that creates trust. By removing the risk of social interaction, we have also removed the reward.</p>
              <p>Furthermore, digital connection often replaces "active" socializing with "passive" consumption. Scrolling through a friend's vacation photos feels like a social interaction, but neurologically, it is closer to watching television. We are observing their life, not participating in it. This creates a phenomenon known as "social snacking"—brief, unsatisfying hits of connection that temporarily distract us from our hunger for community but never truly nourish us. We are starving in a grocery store, surrounded by images of food but eating nothing.</p>
            `,
            underlinedSentence: "This creates a phenomenon known as 'social snacking'—brief, unsatisfying hits of connection that temporarily distract us from our hunger for community but never truly nourish us."
          },
          questions: [
            {
              id: "q_w5_p3_1",
              type: "detail",
              text: "What was the initial prediction about the internet's effect on society?",
              options: [
                "It would make everyone rich.",
                "It would destroy privacy.",
                "It would solve loneliness by removing geographical barriers.",
                "It would make cars fly."
              ],
              correctAnswer: "It would solve loneliness by removing geographical barriers."
            },
            {
              id: "q_w5_p3_2",
              type: "detail",
              text: "What is the 'Paradox of Connectivity'?",
              options: [
                "The internet is slow.",
                "We are more connected than ever, yet reported rates of loneliness have increased.",
                "Smartphones are expensive.",
                "People prefer letters to email."
              ],
              correctAnswer: "We are more connected than ever, yet reported rates of loneliness have increased."
            },
            {
              id: "q_w5_p3_3",
              type: "inference",
              text: "Why does the author argue that 'friction' or imperfection is necessary for true bonding?",
              options: [
                "Imperfection is annoying.",
                "Shared vulnerability and authentic exposure (which require risk) are what create trust.",
                "Perfect people are boring.",
                "Stuttering is good."
              ],
              correctAnswer: "Shared vulnerability and authentic exposure (which require risk) are what create trust."
            },
            {
              id: "q_w5_p3_4",
              type: "vocab",
              text: "In the phrase 'curated, low-bandwidth digital signals,' what does 'curated' mean?",
              options: [
                "Random.",
                "Fast.",
                "Carefully selected, organized, and presented (often to look better than reality).",
                "Broken."
              ],
              correctAnswer: "Carefully selected, organized, and presented (often to look better than reality)."
            },
            {
              id: "q_w5_p3_5",
              type: "detail",
              text: "What is 'social snacking'?",
              options: [
                "Eating while texting.",
                "Brief, unsatisfying digital interactions (like scrolling) that distract from loneliness but don't cure it.",
                "Going to parties.",
                "Sharing food photos."
              ],
              correctAnswer: "Brief, unsatisfying digital interactions (like scrolling) that distract from loneliness but don't cure it."
            },
            {
              id: "q_w5_p3_6",
              type: "inference",
              text: "What is the main difference between 'active' socializing and 'passive' consumption mentioned in the text?",
              options: [
                "One costs money.",
                "Active socializing involves participating; passive consumption involves just observing (like watching TV).",
                "Passive is better.",
                "Active requires sports."
              ],
              correctAnswer: "Active socializing involves participating; passive consumption involves just observing (like watching TV)."
            }
          ]
        },
        {
          passage: {
            title: "The Architecture of Attention",
            wordCount: 525,
            content: `
              <p>If you have ever felt completely unable to look away from your phone, even when you want to, you are not weak; you are outmatched. The modern smartphone app is not a neutral tool like a hammer or a wrench. It is a carefully engineered environment designed by some of the smartest behavioral psychologists in the world, with a single goal: to capture and hold your attention for as long as possible. In the "attention economy," your time is the product being sold to advertisers, so apps are optimized to maximize "time on device."</p>
              <p>Designers achieve this by exploiting the brain’s primitive reward systems, specifically the dopamine loops that evolved to help us find food and social status. One common technique is the "Variable Reward Schedule." This is the same psychological mechanism that makes slot machines addictive. When you pull the lever on a slot machine, you don't know if you will win. Most of the time, you get nothing. But occasionally, you get a jackpot. The unpredictability keeps you pulling.</p>
              <p>Social media feeds work the same way. When you pull down to refresh (a motion remarkably similar to pulling a slot machine lever), you don't know what you will get. A boring news update? A photo of lunch? or a "Jackpot"—a notification that your crush liked your post? This uncertainty triggers a spike of dopamine before you even see the content. Your brain learns to associate the *action* of refreshing with the *anticipation* of reward, creating a compulsion Loop that is difficult to break.</p>
              <p>Another technique is the removal of "stopping cues." In the physical world, activities have natural end points. A book has a last page. A TV show ends. A newspaper runs out of articles. But the "Infinite Scroll" feature removes these boundaries. There is no bottom of the page. Content regenerates endlessly, removing the psychological friction that would normally prompt you to ask, "Should I stop now?" Without these stopping cues, we drift into a "zombie state" of consumption, losing hours to a feed we didn't intend to watch.</p>
            `,
            underlinedSentence: "But the 'Infinite Scroll' feature removes these boundaries... removing the psychological friction that would normally prompt you to ask, 'Should I stop now?'"
          },
          questions: [
            {
              id: "q_w5_p4_1",
              type: "detail",
              text: "What is the primary goal of the 'attention economy'?",
              options: [
                "To make people happy.",
                "To help people connect.",
                "To capture and hold user attention for as long as possible to sell it to advertisers.",
                "To sell smartphones."
              ],
              correctAnswer: "To capture and hold user attention for as long as possible to sell it to advertisers."
            },
            {
              id: "q_w5_p4_2",
              type: "detail",
              text: "What is a 'Variable Reward Schedule'?",
              options: [
                "Getting paid a different salary every month.",
                "A system where rewards are given unpredictably (like a slot machine), which increases the behavior's frequency.",
                "A schedule for homework.",
                "A game where you always win."
              ],
              correctAnswer: "A system where rewards are given unpredictably (like a slot machine), which increases the behavior's frequency."
            },
            {
              id: "q_w5_p4_3",
              type: "inference",
              text: "Why is the motion of 'pull to refresh' compared to a slot machine lever?",
              options: [
                "They look the same.",
                "Both actions trigger an unpredictable outcome that stimulates the brain's dopamine/reward system.",
                "Smartphones are made by casinos.",
                "It costs money to refresh."
              ],
              correctAnswer: "Both actions trigger an unpredictable outcome that stimulates the brain's dopamine/reward system."
            },
            {
              id: "q_w5_p4_4",
              type: "vocab",
              text: "In the phrase 'exploiting the brain’s primitive reward systems,' what does 'exploiting' mean?",
              options: [
                "Helping.",
                "Ignoring.",
                "Making use of (a situation/resource) in a way that is unfair or underhand to gain an advantage.",
                "Studying."
              ],
              correctAnswer: "Making use of (a situation/resource) in a way that is unfair or underhand to gain an advantage."
            },
            {
              id: "q_w5_p4_5",
              type: "detail",
              text: "What is the function of the 'Infinite Scroll'?",
              options: [
                "It makes the phone faster.",
                "It removes natural 'stopping cues' (like the end of a page), encouraging continuous, mindless consumption.",
                "It saves battery.",
                "It helps you find old posts."
              ],
              correctAnswer: "It removes natural 'stopping cues' (like the end of a page), encouraging continuous, mindless consumption."
            },
            {
              id: "q_w5_p4_6",
              type: "inference",
              text: "What does the passage imply about willpower vs. app design?",
              options: [
                "If you are addicted, you are just weak.",
                "App design is stronger than individual willpower because it exploits biological vulnerabilities.",
                "Apps are neutral tools.",
                "We should go back to flip phones."
              ],
              correctAnswer: "App design is stronger than individual willpower because it exploits biological vulnerabilities."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Nuance", definition: "A subtle difference in or shade of meaning, expression, or sound." },
        { word: "Tone", definition: "The general character or attitude of a place, piece of writing, situation, etc." },
        { word: "Curated", definition: "Carefully chosen and thoughtfully organized or presented." },
        { word: "Façade", definition: "An outward appearance that is maintained to conceal a less pleasant or creditable reality." }
      ]
    };
  }

  // Week 6: Information, AI, Trust
  if (weekNum === 6) {
    return {
      id: 6,
      title: "The Mirage of Truth",
      theme: "Media",
      mainIdeaHint: "Trust is the currency of the digital age. When machines can fake reality, who do you believe?",
      passages: [
        {
          passage: {
            title: "The Shortcut",
            wordCount: 520,
            content: `
                <p>Maya sat at her desk, the blue light of her monitor washing over her face. Her history essay on the Industrial Revolution was due in exactly two hours, and she hadn’t written a single word. She had spent the weekend procrastinating, convinced she could knock it out in a burst of last-minute energy. But now, staring at the blinking cursor, her mind was a blank slate.</p>
                <p>Desperate, she opened a new tab and typed a prompt into "Omni-Think," the most popular AI writing assistant. "Summarize the impact of steam engines on 19th-century textile factories. Include specific examples and one primary source."</p>
                <p>Within seconds, the AI churned out three perfect paragraphs. The writing was detailed, articulate, and authoritative. It even cited a specific book: *The Iron Loom: A History of Steam* by historian Arthur P. Sterling. Maya sighed in relief. It felt like magic. She tweaked a few sentences to make them sound more like her own voice, pasted the text into her document, and hit submit. She told herself she was just using the tool for "research," not cheating.</p>
                <p>The next day, her history teacher, Mr. Albright, asked her to stay after class. He held her essay in his hand, his expression unreadable. "This is a compelling essay, Maya," he said. "The analysis of factory efficiency is impeccable. However, I’m having trouble finding your primary source."</p>
                <p>Maya felt a prickle of heat on her neck. "It’s *The Iron Loom*," she said quickly, trying to keep her voice steady. "By Arthur Sterling."</p>
                <p>Mr. Albright nodded slowly, pushing his glasses up his nose. "I know. That’s what your bibliography cited. The problem is, I’ve been a historian for twenty years, and I’ve never heard of that book. I checked the Library of Congress, university archives, and every major academic database. It doesn't exist."</p>
                <p>Maya froze. "But... the program found it. It had a publication date and everything."</p>
                <p>"The program didn't *find* it, Maya. It *invented* it," Mr. Albright explained gently but firmly. "These models are prediction engines, not truth engines. They predict the next likely word in a sentence based on patterns. Sometimes, the most likely combination of words is a completely believable lie. It created a title that *sounded* real and an author name that *sounded* historical, but neither is real."</p>
                <p>Maya looked at the red circle around the fake title on her paper. She realized with a sinking feeling that in her rush to finish, she hadn't just taken a shortcut; she had surrendered her judgment to a machine. She had traded her intellectual integrity for convenience, trusting an algorithm that prioritized fluency over fact. She walked out of the classroom with a zero on the assignment, but a much more valuable lesson about the nature of truth in the digital age.</p>
              `,
            underlinedSentence: "She realized with a sinking feeling that in her rush to finish, she hadn't just taken a shortcut; she had surrendered her judgment to a machine."
          },
          questions: [
            {
              id: "q_w6_p1_1",
              type: "detail",
              text: "Which title best captures the main theme of the passage?",
              options: [
                "The History of the Industrial Revolution",
                "Mr. Albright's Strict Grading Policy",
                "The Trap of AI Hallucination and the Need for Verification",
                "Maya’s Excellent Essay"
              ],
              correctAnswer: "The Trap of AI Hallucination and the Need for Verification"
            },
            {
              id: "q_w6_p1_2",
              type: "detail",
              text: "Why did Maya decide to use the AI tool?",
              options: [
                "She wanted to learn more about steam engines.",
                "She was running out of time and desperate to finish her essay.",
                "Mr. Albright told her to use it as an experiment.",
                "Her computer was broken and she needed help."
              ],
              correctAnswer: "She was running out of time and desperate to finish her essay."
            },
            {
              id: "q_w6_p1_3",
              type: "detail",
              text: "What specific piece of information did the AI fabricate (make up)?",
              options: [
                "The date of the Industrial Revolution.",
                "The existence of a book titled *The Iron Loom* by Arthur P. Sterling.",
                "The fact that steam engines were used in factories.",
                "Maya's name."
              ],
              correctAnswer: "The existence of a book titled *The Iron Loom* by Arthur P. Sterling."
            },
            {
              id: "q_w6_p1_4",
              type: "inference",
              text: "Why did Mr. Albright suspect the source was fake?",
              options: [
                "He hates technology.",
                "The book title sounded silly.",
                "As an expert historian, he didn't recognize it, and his research confirmed it didn't exist.",
                "Another student used the same source."
              ],
              correctAnswer: "As an expert historian, he didn't recognize it, and his research confirmed it didn't exist."
            },
            {
              id: "q_w6_p1_5",
              type: "vocab",
              text: "In the dialogue, what does the phrase 'prediction engines, not truth engines' mean?",
              options: [
                "The AI predicts the future.",
                "The AI is programmed to lie.",
                "The AI generates text based on probable language patterns, not on verifying facts.",
                "The AI is actually a search engine like Google."
              ],
              correctAnswer: "The AI generates text based on probable language patterns, not on verifying facts."
            },
            {
              id: "q_w6_p1_6",
              type: "detail", // Using detail for pronoun reference
              text: "In the sentence 'It created a title that sounded real...', what does the pronoun 'It' refer to?",
              options: [
                "The Library of Congress.",
                "The essay.",
                "The AI program (Omni-Think).",
                "Mr. Albright."
              ],
              correctAnswer: "The AI program (Omni-Think)."
            },
            {
              id: "q_w6_p1_7",
              type: "detail",
              text: "How did Maya initially justify using the AI to herself?",
              options: [
                "She thought everyone else was doing it.",
                "She told herself she was just using it for 'research,' not cheating.",
                "She didn't care about the rules.",
                "She thought the teacher wouldn't read it."
              ],
              correctAnswer: "She told herself she was just using it for 'research,' not cheating."
            },
            {
              id: "q_w6_p1_8",
              type: "inference",
              text: "What is the 'valuable lesson' Maya learned?",
              options: [
                "Never use computers for homework.",
                "History is too difficult to understand.",
                "One cannot blindly trust generated information; intellectual integrity requires verifying the truth.",
                "Mr. Albright is a mean teacher."
              ],
              correctAnswer: "One cannot blindly trust generated information; intellectual integrity requires verifying the truth."
            }
          ]
        },
        {
          passage: {
            title: "The Uncanny Feedback",
            wordCount: 540,
            content: `
                <p>Leo had always struggled with the mechanical side of music. He could hear soaring melodies and complex harmonies in his head, but his fingers stumbled on the piano keys. His technical skills simply couldn't keep up with his imagination. Then he discovered "Muse-AI," a cutting-edge software that could complete any musical phrase he played. It felt like magic. He would play a clumsy, simple chord progression, and the AI would extend it into a rich, emotional symphony, filling in the gaps with perfect precision.</p>
                <p>For the school talent show, Leo prepared a piece titled "Starlight." In reality, he had written maybe 10% of the notes. The rest—the sweeping bridge, the intricate harmonies, the emotional crescendo—was generated by the algorithm. He just curated the options, picking the ones that sounded best. When he played the recording for his friends during rehearsal, they were stunned.</p>
                <p>"I didn't know you had that kind of soul, Leo," his best friend Sam said, looking genuinely moved. "It feels so... human. It really speaks to me."</p>
                <p>Leo smiled and said "Thanks," but a cold knot formed in his stomach. The praise felt borrowed. It felt like someone complimenting him on a painting he had bought at a store. He wasn't the composer; he was just the editor. He had selected the best options from a drop-down menu, but he hadn't bled for the art. He hadn't struggled through the frustration of finding the right note.</p>
                <p>The night of the show, Leo sat at the grand piano in the center of the stage. The spotlight blinded him, turning the audience into a sea of darkness. He looked down at the sheet music, the black notes perfectly arranged by the machine. He realized that if he played this piece, he would be performing a lie. The audience would be applauding a ghost, a mathematical model that felt nothing.</p>
                <p>Suddenly, Leo closed the sheet music and set it on the floor.</p>
                <p>He took a deep breath and placed his hands on the keys. He began to play a simple, hesitant melody—the one he had written himself before the AI touched it. It was imperfect. He missed a note in the second bar. The rhythm was a little shaky. There were no soaring, complex harmonies, just a simple, lonely tune that reflected exactly how scared he felt in that moment.</p>
                <p>When he finished, there was a pause. The audience didn't roar with thunderous applause like they might have for the AI symphony. There was polite, scattered clapping. It wasn't a standing ovation. But as Leo walked off stage, the knot in his stomach was gone. Sam met him in the wings, looking confused. "That was different," Sam said. "Simpler."</p>
                <p>"Yeah," Leo said, feeling lighter than he had in weeks. "It was simpler. But it was *mine*." He had failed to impress them with a fabrication, but he had succeeded in being real.</p>
              `,
            underlinedSentence: "He had failed to impress them with a fabrication, but he had succeeded in being real."
          },
          questions: [
            {
              id: "q_w6_p2_1",
              type: "detail",
              text: "What is the central conflict in the passage?",
              options: [
                "Leo vs. the audience who hates his music",
                "Leo vs. his broken piano",
                "Leo's internal struggle between the perfection of AI art and the authenticity of his own imperfect creation",
                "Leo vs. Sam, who is jealous"
              ],
              correctAnswer: "Leo's internal struggle between the perfection of AI art and the authenticity of his own imperfect creation"
            },
            {
              id: "q_w6_p2_2",
              type: "detail",
              text: "Why did Leo initially use the Muse-AI software?",
              options: [
                "He was lazy and didn't want to practice.",
                "His technical skills on the piano couldn't keep up with the melodies in his head.",
                "It was required for the class.",
                "He wanted to make electronic music."
              ],
              correctAnswer: "His technical skills on the piano couldn't keep up with the melodies in his head."
            },
            {
              id: "q_w6_p2_3",
              type: "detail",
              text: "How did Sam react to the AI-generated version of 'Starlight'?",
              options: [
                "He thought it sounded robotic.",
                "He was moved and said it felt 'human' and had 'soul.'",
                "He laughed at it.",
                "He asked Leo to turn it off."
              ],
              correctAnswer: "He was moved and said it felt 'human' and had 'soul.'"
            },
            {
              id: "q_w6_p2_4",
              type: "inference",
              text: "Why did Leo decide not to play the AI piece at the last minute?",
              options: [
                "He lost the sheet music.",
                "He forgot how to play it.",
                "He realized it would be performing a lie and he wanted to be authentic, even if it meant being imperfect.",
                "The piano was broken."
              ],
              correctAnswer: "He realized it would be performing a lie and he wanted to be authentic, even if it meant being imperfect."
            },
            {
              id: "q_w6_p2_5",
              type: "vocab",
              text: "In the final paragraph, what does the word 'fabrication' mean?",
              options: [
                "A piece of cloth.",
                "A beautiful song.",
                "something that is manufactured or invented, often with the intent to deceive (a fake).",
                "A difficult performance."
              ],
              correctAnswer: "something that is manufactured or invented, often with the intent to deceive (a fake)."
            },
            {
              id: "q_w6_p2_6",
              type: "detail", // Using detail for pronoun reference
              text: "In the sentence 'It feels so... human,' what does 'It' refer to?",
              options: [
                "Leo.",
                "Sam.",
                "The AI-generated music.",
                "The piano."
              ],
              correctAnswer: "The AI-generated music."
            },
            {
              id: "q_w6_p2_7",
              type: "detail",
              text: "How did the audience react to Leo's real performance?",
              options: [
                "They booed him off stage.",
                "They gave him a standing ovation.",
                "There was polite, scattered clapping.",
                "They all left."
              ],
              correctAnswer: "There was polite, scattered clapping."
            },
            {
              id: "q_w6_p2_8",
              type: "inference",
              text: "What does the ending suggest about the value of art?",
              options: [
                "Art is only good if it is perfect.",
                "AI makes better art than humans.",
                "Imperfect, authentic human expression has a personal value that technical perfection cannot replace.",
                "Leo should quit music."
              ],
              correctAnswer: "Imperfect, authentic human expression has a personal value that technical perfection cannot replace."
            }
          ]
        },
        {
          passage: {
            title: "The Black Box Problem",
            wordCount: 510,
            content: `
              <p>In classical computer programming, code is transparent. If a program makes a decision—for example, denying a loan application or flagging a transaction as fraudulent—a programmer can look at the code and trace exactly why that happened. "If credit score < 600, then deny." It is a logic of "If X, then Y." However, the new generation of Artificial Intelligence, specifically Deep Learning neural networks, operates differently. These systems are not programmed with explicit rules; they are "trained" on vast amounts of data.</p>
              <p>This shift has created what experts call the "Black Box Problem." A neural network might analyze a million loan applications and "learn" to identify patterns that correlate with repayment. Once trained, it can predict with high accuracy who will repay a loan. But here is the catch: even the engineers who built the system often cannot explain *how* it reached a specific decision. The decision-making process is hidden inside a complex web of millions of weighted connections, a "black box" that is opaque to human understanding.</p>
              <p>This opacity becomes dangerous when AI is used in high-stakes areas like criminal justice or healthcare. For instance, an AI system used to predict recidivism (the likelihood of a criminal re-offending) might flag a defendant as "high risk." If the defendant asks, "Why?" the answer is simply, "Because the model said so." There is no line of code to point to. The system may have latched onto a proxy variable—like zip code—that serves as a subtle cover for racial or economic bias, but without transparency, this bias is difficult to detect or challenge.</p>
              <p>This creates a crisis of accountability. In a democratic society, we believe in "due process"—the right to know the evidence used against us and the logic behind a judgment. If we hand over authority to black-box algorithms, we surrender this right. We are judged by an oracle that we cannot question. As these systems become more integrated into daily life, society faces a critical question: should we accept an increase in efficiency and accuracy if the cost is the loss of explainability?</p>
            `,
            underlinedSentence: "The system may have latched onto a proxy variable—like zip code—that serves as a subtle cover for racial or economic bias, but without transparency, this bias is difficult to detect or challenge."
          },
          questions: [
            {
              id: "q_w6_p3_1",
              type: "detail",
              text: "What is the fundamental difference between classical programming and Deep Learning mentioned in the text?",
              options: [
                "Classical programming is faster.",
                "Classical programming uses explicit 'If X, then Y' logic and is transparent; Deep Learning learns patterns from data and is often opaque.",
                "Deep Learning uses robots.",
                "Classical programming is for old computers."
              ],
              correctAnswer: "Classical programming uses explicit 'If X, then Y' logic and is transparent; Deep Learning learns patterns from data and is often opaque."
            },
            {
              id: "q_w6_p3_2",
              type: "detail",
              text: "What is the 'Black Box Problem'?",
              options: [
                "Computers are black.",
                "The inability to explain *how* a complex AI system reached a specific decision despite knowing the input and output.",
                "The power button is broken.",
                "A box that records flight data."
              ],
              correctAnswer: "The inability to explain *how* a complex AI system reached a specific decision despite knowing the input and output."
            },
            {
              id: "q_w6_p3_3",
              type: "inference",
              text: "Why is the lack of transparency in AI dangerous in fields like criminal justice?",
              options: [
                "It makes the judges lose their jobs.",
                "It prevents defendants from challenging biased decisions because the logic is hidden (undermining due process).",
                "Robots are scary.",
                "It costs too much money."
              ],
              correctAnswer: "It prevents defendants from challenging biased decisions because the logic is hidden (undermining due process)."
            },
            {
              id: "q_w6_p3_4",
              type: "vocab",
              text: "In the context of the passage, what does 'opaque' mean?",
              options: [
                "Transparent.",
                "Clear.",
                "Not able to be seen through; not transparent (hidden/hard to understand).",
                "Shiny."
              ],
              correctAnswer: "Not able to be seen through; not transparent (hidden/hard to understand)."
            },
            {
              id: "q_w6_p3_5",
              type: "detail",
              text: "What is a 'proxy variable' as described in the text?",
              options: [
                "A variable that stands in for another (e.g., zip code standing in for race/economics).",
                "A broken variable.",
                "A secret code.",
                "A type of server."
              ],
              correctAnswer: "A variable that stands in for another (e.g., zip code standing in for race/economics)."
            },
            {
              id: "q_w6_p3_6",
              type: "inference",
              text: "What is the 'crisis of accountability' mentioned in the final paragraph?",
              options: [
                "No one knows who owns the AI.",
                "If we cannot explain why a decision was made, we cannot hold the decision-maker (the system) responsible or correct errors.",
                "Computers are too expensive.",
                "People are lazy."
              ],
              correctAnswer: "If we cannot explain why a decision was made, we cannot hold the decision-maker (the system) responsible or correct errors."
            }
          ]
        },
        {
          passage: {
            title: "The Death of Authorship",
            wordCount: 535,
            content: `
              <p>For centuries, the concept of "authorship" was clear. If you wrote a poem, painted a canvas, or composed a symphony, it belonged to you. Check the copyright date on any book, and you will see a name. That name represents a human mind that labored to produce a unique expression of ideas. However, the rise of Generative AI has blurred this definition to the point of collapse, sparking a fierce debate about ownership, creativity, and theft.</p>
              <p>Generative molecules like GPT-4 or Midjourney do not "create" in the human sense. They do not have experiences, emotions, or intentions. Instead, they are trained on billions of existing human works—books, articles, paintings, and photos—scraped from the internet. When you ask an AI to "write a story in the style of Hemingway," it statistically analyzes Hemingway's actual books and assembles new sentences that mimic his sentence structure and vocabulary. It is, in essence, a high-tech collage machine.</p>
              <p>This raises a thorny ethical question: Is this inspiration or plagiarism? Proponents argue that AI learns just like a human student. A human artist studies Picasso to learn cubism; why can't a machine? They view AI as a tool that democratizes creativity, allowing anyone to produce high-quality work regardless of technical skill. To them, the "prompter" (the human giving instructions) is the new author.</p>
              <p>Critics, however, argue that this is "intellectual laundering." They point out that human students add their own lived experience to their influences, creating something new. AI merely remixes existing data without understanding it. Furthermore, the original artists whose work was used to train the model are rarely compensated or credited. Their life's work is ingested into a database to build a product that might eventually replace them. If an illustrator loses their job to an AI that can perfectly mimic their style because it was *trained on their own portfolio*, the concept of "fair use" seems to have been violated.</p>
              <p>As we move forward, society must redefine what it means to be a "creator." If a machine does the heavy lifting of composition, does the human deserve the credit? Or are we entering a "post-authorship" era, where content is abundant, cheap, and ownerless, generated by the collective ghost of human culture?</p>
            `,
            underlinedSentence: "If an illustrator loses their job to an AI that can perfectly mimic their style because it was *trained on their own portfolio*, the concept of 'fair use' seems to have been violated."
          },
          questions: [
            {
              id: "q_w6_p4_1",
              type: "detail",
              text: "How does Generative AI create new content according to the passage?",
              options: [
                "It has a soul and gets inspired.",
                "It statistically analyzes billions of existing human works and assembles new patterns that mimic them.",
                "It copies and pastes text directly.",
                "It asks a human for help."
              ],
              correctAnswer: "It statistically analyzes billions of existing human works and assembles new patterns that mimic them."
            },
            {
              id: "q_w6_p4_2",
              type: "detail",
              text: "What is the main argument of the 'critics' mentioned in the text?",
              options: [
                "AI is too slow.",
                "AI is 'intellectual laundering' or theft because it uses artists' work without consent/compensation to build a product that replaces them.",
                "AI art is ugly.",
                "Computers should not write poems."
              ],
              correctAnswer: "AI is 'intellectual laundering' or theft because it uses artists' work without consent/compensation to build a product that replaces them."
            },
            {
              id: "q_w6_p4_3",
              type: "inference",
              text: "Why does the author call AI a 'high-tech collage machine'?",
              options: [
                "It uses glue.",
                "It assembles bits and pieces of existing data (training material) rather than creating something from nothing or personal experience.",
                "It makes pictures.",
                "It is messy."
              ],
              correctAnswer: "It assembles bits and pieces of existing data (training material) rather than creating something from nothing or personal experience."
            },
            {
              id: "q_w6_p4_4",
              type: "vocab",
              text: "In the phrase 'intellectual laundering,' what is the author implying by using the word 'laundering' (usually associated with money)?",
              options: [
                "They are cleaning the data.",
                "They are hiding the illegal or unethical origin of the material to make it appear legitimate.",
                "They are washing books.",
                "It is expensive."
              ],
              correctAnswer: "They are hiding the illegal or unethical origin of the material to make it appear legitimate."
            },
            {
              id: "q_w6_p4_5",
              type: "detail",
              text: "What argument do 'proponents' use to defend AI?",
              options: [
                "It is cheaper.",
                "It learns just like a human student (inspiration) and democratizes creativity.",
                "It doesn't make mistakes.",
                "It helps with math."
              ],
              correctAnswer: "It learns just like a human student (inspiration) and democratizes creativity."
            },
            {
              id: "q_w6_p4_6",
              type: "inference",
              text: "What is the central ethical dilemma regarding the 'original artists'?",
              options: [
                "They are jealous.",
                "Their work is used to train the very machines that compete with them, without their permission or payment.",
                "They don't know how to use computers.",
                "They paint too slowly."
              ],
              correctAnswer: "Their work is used to train the very machines that compete with them, without their permission or payment."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Hallucination", definition: "A perception of something not present; in AI, confident but false information." },
        { word: "Integrity", definition: "The quality of being honest and having strong moral principles." },
        { word: "Fabrication", definition: "The action or process of manufacturing or inventing something." },
        { word: "Curator", definition: "A keeper or custodian of a collection." },
        { word: "Crescendo", definition: "A gradual increase in loudness in a piece of music." }
      ]
    };
  }

  // Week 7: Bias & Assumptions
  if (weekNum === 7) {
    return {
      id: 7,
      title: "The Lens We Look Through",
      theme: "Global",
      mainIdeaHint: "We don't see the world as it is; we see it as we are. Watch how characters filter information.",
      passages: [
        {
          passage: {
            title: "The Silent Partner",
            wordCount: 510,
            content: `
              <p>Alex groaned audibly when he saw the name typed next to his on the chemistry project list: *Priya*. In the high-stakes world of their Grade 9 Chemistry class, partners could make or break a grade, and Alex was aiming for an A. Priya was the "ghost" of the classroom. She sat in the back row, huddled in an oversized hoodie, never raised her hand, and spoke in a barely-there whisper if the teacher forced her to answer. Alex, who prided himself on his dynamic presentations and loud confidence, assumed the worst. He instantly decided that he would have to carry the entire project on his shoulders.</p>
              <p>"Great," he muttered to his friend Ryan. "I got the mute. Looks like I'm doing a solo project with a dead weight attached."</p>
              <p>When they met in the library to start working on their rocket fuel simulation, Alex took charge immediately. He spread his notes out on the table, dominating the space. "Okay, so the project is complex," he said, speaking slowly as if to a child. "We need to calculate the burn rate and the thrust trajectory. I'll handle all the math and the coding for the simulation because that's the hard part. You can just... glue the photos on the display board and maybe check for typos. Sound good?"</p>
              <p>Priya adjusted her glasses and stared at the table. "Um, actually..." she started, her voice soft.</p>
              <p>Alex cut her off. "Don't worry, I know it's a lot of math. I've got it covered. Just focus on making the poster look nice." He pulled out his laptop and launched the simulation software, feeling a martyr’s sense of burden. He spent the next twenty minutes struggling to set up the differential equations, frowning as the code threw error after error. "Stupid program," he grumbled. "Why won't the thrust vector align?"</p>
              <p>Priya watched him silently for a moment, then reached into her bag and pulled out a worn notebook. She slid it across the table. "I ran the trajectory simulations last night," she said, her voice still quiet but steady. "I found that if we adjust the fin angle by three degrees and increase the oxidizer ratio, we can increase altitude by 15%. Also, your code has a syntax error on line 42. You missed a semicolon."</p>
              <p>Alex blinked. He looked at the notebook. It was filled with neat, complex calculus and Python code that was far beyond what they were learning in class. He looked at his screen, then back at Priya. He felt a hot flush of embarrassment creep up his neck. He realized he had **conflated** silence with incompetence. He had assumed that because Priya didn't perform her intelligence for an audience—because she didn't brag or shout—she didn't have any.</p>
              <p>"I... I didn't know you knew coding," Alex stammered, his confidence evaporating.</p>
              <p>"I do competitive programming on weekends," Priya said, a small, shy smile appearing. "I just don't like talking in front of thirty people. It makes me anxious. But I like the math."</p>
              <p>Alex sat back, humbled. He looked at the "dead weight" he had complained about and saw, for the first time, the "silent partner" who was actually the brains of the operation. "Okay," he said, pushing his laptop toward her. "How about you drive the simulation, and I'll work on the poster?"</p>
            `,
            underlinedSentence: "He realized he had conflated silence with incompetence. Just because Priya didn't perform her intelligence for an audience didn't mean she lacked it."
          },
          questions: [
            {
              id: "q_w7_p1_1",
              type: "detail",
              text: "Which title best captures the central theme of the passage?",
              options: [
                "Alex’s Science Fair Victory",
                "The Hidden Talent of Priya",
                "How to Build a Rocket",
                "The Danger of Judging Competence by Volume"
              ],
              correctAnswer: "The Danger of Judging Competence by Volume"
            },
            {
              id: "q_w7_p1_2",
              type: "detail",
              text: "Why did Alex initially assume he would have to do all the work?",
              options: [
                "Priya told him she was lazy.",
                "He had worked with her before and she failed.",
                "He equated her quietness and lack of participation in class with a lack of intelligence.",
                "The teacher told him Priya needed help."
              ],
              correctAnswer: "He equated her quietness and lack of participation in class with a lack of intelligence."
            },
            {
              id: "q_w7_p1_3",
              type: "detail",
              text: "What specific evidence in the text proves Priya’s competence?",
              options: [
                "She had a nice backpack.",
                "She had already run trajectory simulations and identified a syntax error in Alex's code.",
                "She promised to try hard.",
                "She was good at gluing photos."
              ],
              correctAnswer: "She had already run trajectory simulations and identified a syntax error in Alex's code."
            },
            {
              id: "q_w7_p1_4",
              type: "inference",
              text: "What does the 'worn notebook' suggest about Priya?",
              options: [
                "She is poor and cannot afford a new one.",
                "She spends a lot of time working in it, suggesting dedication and practice.",
                "She doesn't care about school supplies.",
                "She stole it from Alex."
              ],
              correctAnswer: "She spends a lot of time working in it, suggesting dedication and practice."
            },
            {
              id: "q_w7_p1_5",
              type: "vocab",
              text: "In the phrase 'conflated silence with incompetence,' what does 'conflated' mean?",
              options: [
                "To separate two distinct ideas.",
                "To combine or confuse two different things as if they are the same.",
                "To inflate a balloon.",
                "To ignore completely."
              ],
              correctAnswer: "To combine or confuse two different things as if they are the same"
            },
            {
              id: "q_w7_p1_6",
              type: "detail", // Using detail for pronoun reference
              text: "In the sentence 'It makes me anxious,' what does the pronoun 'It' refer to?",
              options: [
                "Coding.",
                "Doing competitive programming.",
                "The math.",
                "Talking in front of thirty people."
              ],
              correctAnswer: "Talking in front of thirty people."
            },
            {
              id: "q_w7_p1_7",
              type: "detail",
              text: "How did Alex try to divide the work initially?",
              options: [
                "He wanted Priya to do the math and him to do the poster.",
                "He wanted to split everything 50/50.",
                "He assigned Priya the 'easy' task of the poster while he did the 'hard' math.",
                "He asked the teacher for a new partner."
              ],
              correctAnswer: "He assigned Priya the 'easy' task of the poster while he did the 'hard' math."
            },
            {
              id: "q_w7_p1_8",
              type: "inference",
              text: "Why does Alex offer to do the poster at the end?",
              options: [
                "He is lazy and wants the easy job now.",
                "He realizes Priya is better at the simulation than he is and is showing her respect.",
                "He is mocking her.",
                "He wants to quit the project."
              ],
              correctAnswer: "He realizes Priya is better at the simulation than he is and is showing her respect."
            }
          ]
        },
        {
          passage: {
            title: "The Evidence Hunter",
            wordCount: 500,
            content: `
              <p>Ben considered himself a detective of the highest order. He saw patterns where others saw only chaos. His latest investigation was what he called "The Leftover Conspiracy." Ben was convinced that the school cafeteria was unhygienically recycling leftover food from one day to create the menu for the next. His theory was simple: if they served roasted chicken on Tuesday, the "Chicken Soup" on Wednesday was definitely made from the scraps. If they served hamburgers on Monday, the "Beef Tacos" on Tuesday were suspect.</p>
              <p>"It's obvious," Ben told his skepticism friend, Sam, as they stood in the lunch line. "They think we don't notice. But I notice."</p>
              <p>On Wednesday, Ben decided to gather "hard evidence." He bought the Chicken Vegetable Soup. He sat down, pulled out his phone, and began his forensic analysis. He fished out a piece of shredded chicken with his spoon and held it up to the light.</p>
              <p>"Look at this," Ben whispered intensely. "See how the edge is slightly browned? That’s from roasting. It proves this isn't fresh boiled chicken. It’s yesterday’s leftovers."</p>
              <p>Sam rolled his eyes, taking a bite of his sandwich. "Ben, it's soup. Maybe they sauté the chicken first for flavor. Or maybe it's just a dark piece of meat. Besides, I saw the delivery truck arrive this morning. It was unloading boxes of raw chicken breasts. I saw the logo."</p>
              <p>Ben shook his head, dismissing the comment immediately. "That's just a cover," he argued. "They bring in a few fresh boxes to look good, but the bulk of it is recycled. Or maybe the fresh stuff goes to the teachers' lounge. Look at this carrot coin. It's cut exactly the same thickness as the glazed carrots from yesterday."</p>
              <p>"They use an industrial slicer, Ben," Sam pointed out. "Every carrot is cut exactly the same way every single day. That’s how machines work."</p>
              <p>"No," Ben insisted, his eyes narrowing. "It's too coincidental." He took a photo of the "browned" chicken and the "suspicious" carrot. He logged into the school forum and posted the images with the caption: *CAUGHT RED HANDED: The Truth About Our Lunch.* He felt a rush of victorious satisfaction. He had found the proof he was looking for.</p>
              <p>What Ben failed to realize was that he wasn't finding the truth; he was manufacturing it. He was falling victim to **Confirmation Bias**. He had started with a firm conclusion ("The cafeteria is cheating") and then filtered the world to find only the data that supported that conclusion. He interpreted a browned edge as proof of recycling rather than cooking method. He interpreted standard carrot slicing as evidence of reuse. Crucially, he actively ignored the strongest piece of objective evidence—Sam’s eyewitness account of the fresh delivery—because it contradicted his theory. He wasn't a detective collecting clues to solve a mystery; he was a lawyer building a case for a verdict he had already reached.</p>
            `,
            underlinedSentence: "He wasn't searching for the truth; he was searching for victory."
          },
          questions: [
            {
              id: "q_w7_p2_1",
              type: "detail",
              text: "What is the central message of the passage regarding Ben's investigation?",
              options: [
                "The school cafeteria is definitely recycling food.",
                "Ben is a brilliant detective who uncovered a conspiracy.",
                "Ben's investigation was flawed because he only looked for evidence that supported his pre-existing belief (confirmation bias).",
                "Sam is jealous of Ben's popularity on the forum."
              ],
              correctAnswer: "Ben's investigation was flawed because he only looked for evidence that supported his pre-existing belief (confirmation bias)."
            },
            {
              id: "q_w7_p2_2",
              type: "detail",
              text: "What was Ben's 'Leftover Conspiracy' theory?",
              options: [
                "The cafeteria was buying food from a different school.",
                "The cafeteria was using leftover food from one day to make the next day's meals (e.g., roast chicken to chicken soup).",
                "The cafeteria was serving plastic food.",
                "The teachers were eating all the good food."
              ],
              correctAnswer: "The cafeteria was using leftover food from one day to make the next day's meals (e.g., roast chicken to chicken soup)."
            },
            {
              id: "q_w7_p2_3",
              type: "detail",
              text: "What evidence did Sam provide to counter Ben's theory?",
              options: [
                "He tasted the soup and it was fresh.",
                "He saw the delivery truck unloading fresh boxes of raw chicken that morning.",
                "He asked the lunch lady.",
                "He showed Ben the menu."
              ],
              correctAnswer: "He saw the delivery truck unloading fresh boxes of raw chicken that morning."
            },
            {
              id: "q_w7_p2_4",
              type: "inference",
              text: "How did Ben handle the evidence of the delivery truck?",
              options: [
                "He accepted it and changed his mind.",
                "He ignored it or explained it away as a 'cover' because it didn't fit his theory.",
                "He went to check the truck himself.",
                "He asked Sam for more details."
              ],
              correctAnswer: "He ignored it or explained it away as a 'cover' because it didn't fit his theory."
            },
            {
              id: "q_w7_p2_5",
              type: "vocab",
              text: "In the final paragraph, what does the term 'Confirmation Bias' describe?",
              options: [
                "The tendency to search for, interpret, and favor information that confirms one's pre-existing beliefs while ignoring contradictory evidence.",
                "The ability to confirm facts using a microscope.",
                "A legal term for being a good lawyer.",
                "Being biased against cafeteria food."
              ],
              correctAnswer: "The tendency to search for, interpret, and favor information that confirms one's pre-existing beliefs while ignoring contradictory evidence."
            },
            {
              id: "q_w7_p2_6",
              type: "detail", // Using detail for pronoun reference
              text: "In the sentence 'It proved this isn't fresh boiled chicken,' what does 'It' refer to?",
              options: [
                "The carrot.",
                "The delivery truck.",
                "The slightly browned edge of the chicken piece.",
                "Sam's sandwich."
              ],
              correctAnswer: "The slightly browned edge of the chicken piece."
            },
            {
              id: "q_w7_p2_7",
              type: "detail",
              text: "Why did the carrots actually look the same as the day before?",
              options: [
                "They were the same carrots.",
                "The cafeteria uses an industrial slicer that cuts everything identically.",
                "Ben imagined it.",
                "They were glazed."
              ],
              correctAnswer: "The cafeteria uses an industrial slicer that cuts everything identically."
            },
            {
              id: "q_w7_p2_8",
              type: "inference",
              text: "The author compares Ben to a 'lawyer building a case' rather than a 'detective'. What is the difference implied here?",
              options: [
                "Lawyers make more money.",
                "Detectives follow the evidence wherever it leads; lawyers (in this context) argue for a specific side regardless of the whole truth.",
                "Detectives are smarter.",
                "Lawyers wear suits."
              ],
              correctAnswer: "Detectives follow the evidence wherever it leads; lawyers (in this context) argue for a specific side regardless of the whole truth."
            }
          ]
        },
        {
          passage: {
            title: "The Halo Effect",
            wordCount: 515,
            content: `
              <p>In 1920, psychologist Edward Thorndike noticed a strange pattern in military officers' evaluations of their subordinates. If an officer rated a soldier high in "physique" (physical appearance), they almost invariably rated them high in "intelligence," "leadership," and "character" as well. Conversely, soldiers with poor physical ratings were rated poorly across the board. Thorndike realized that the specific ratings were not independent assessments; they were all contaminated by a general impression. He called this the "Halo Effect."</p>
              <p>The Halo Effect is a cognitive bias where our overall impression of a person influences how we feel and think about their character. Essentially, if we see one positive trait (like attractiveness or confidence), we subconsciously assume the person possesses other positive traits (like kindness or intelligence), even without evidence. The "halo" of that one good quality shines over everything else, blinding us to their flaws.</p>
              <p>This bias has profound implications in the real world. In job interviews, attractive candidates are statistically more likely to be hired than less attractive ones with identical resumes. In courtrooms, juries are more lenient toward attractive defendants. In schools, teachers often expect better academic performance from well-behaved or polite students, subconsciously giving them more support while neglecting disruptive students who might be equally bright. The "halo" creates a self-fulfilling prophecy: because we treat "haloed" individuals better, they often get more opportunities to succeed.</p>
              <p>The reverse is also true, known as the "Horn Effect." If our first impression of someone is negative—perhaps they are dressed sloppily or have a firm frown—we tend to interpret everything they do through a negative lens. A quiet person might be labeled "thoughtful" if they have a halo, but "standoffish" or "hostile" if they have horns. Recognizing this bias is the first step to dismantling it. We must learn to separate our feeling about a person from our assessment of their skills.</p>
            `,
            underlinedSentence: "The 'halo' of that one good quality shines over everything else, blinding us to their flaws."
          },
          questions: [
            {
              id: "q_w7_p3_1",
              type: "detail",
              text: "What did Edward Thorndike observe in military evaluations?",
              options: [
                "Soldiers were lazy.",
                "Officers' ratings of specific traits (like intelligence) were highly influenced by their rating of physical appearance.",
                "The army needed better uniforms.",
                "Tall soldiers were faster."
              ],
              correctAnswer: "Officers' ratings of specific traits (like intelligence) were highly influenced by their rating of physical appearance."
            },
            {
              id: "q_w7_p3_2",
              type: "detail",
              text: "What is the 'Halo Effect'?",
              options: [
                "A religious experience.",
                "A cognitive bias where a positive impression in one area (like looks) influences our opinion in other, unrelated areas (like intelligence).",
                "A ring of light.",
                "Being a good person."
              ],
              correctAnswer: "A cognitive bias where a positive impression in one area (like looks) influences our opinion in other, unrelated areas (like intelligence)."
            },
            {
              id: "q_w7_p3_3",
              type: "inference",
              text: "How does the Halo Effect influence job interviews?",
              options: [
                "Candidates wear halos.",
                "Interviewers talk too much.",
                "Interviewers are more likely to hire attractive candidates, assuming they are also competent, regardless of actual skill.",
                "It makes interviews shorter."
              ],
              correctAnswer: "Interviewers are more likely to hire attractive candidates, assuming they are also competent, regardless of actual skill."
            },
            {
              id: "q_w7_p3_4",
              type: "vocab",
              text: "In the sentence 'they were all contaminated by a general impression,' what does 'contaminated' mean?",
              options: [
                "Cleaned.",
                "Infected or influenced negatively (made impure).",
                "Improved.",
                "Written down."
              ],
              correctAnswer: "Infected or influenced negatively (made impure)."
            },
            {
              id: "q_w7_p3_5",
              type: "detail",
              text: "What is the 'Horn Effect'?",
              options: [
                "The opposite of the Halo Effect: a negative first impression leads to negative assumptions about other traits.",
                "A loud noise.",
                "Being musical.",
                "Having sharp elbows."
              ],
              correctAnswer: "The opposite of the Halo Effect: a negative first impression leads to negative assumptions about other traits."
            },
            {
              id: "q_w7_p3_6",
              type: "inference",
              text: "What is the 'self-fulfilling prophecy' mentioned in the text?",
              options: [
                "Predicting the future.",
                "Because 'haloed' people are treated better/given more chances, they actually end up succeeding more, confirming the initial bias.",
                "A magic spell.",
                "Reading a horoscope."
              ],
              correctAnswer: "Because 'haloed' people are treated better/given more chances, they actually end up succeeding more, confirming the initial bias."
            }
          ]
        },
        {
          passage: {
            title: "The Pygmalion Effect",
            wordCount: 520,
            content: `
              <p>In a famous 1968 experiment, researchers Robert Rosenthal and Lenore Jacobson visited an elementary school and administered an IQ test to the students. They then told the teachers that the test had identified certain students as "late bloomers" who were on the verge of a massive intellectual growth spurt. In reality, these students had been chosen completely at random. There was no difference between them and their classmates. The only difference existed in the *minds of the teachers*.</p>
              <p>When the researchers returned at the end of the year, they found something purely astonishing. The randomly selected "late bloomers" had actually increased their IQ scores significantly more than the control group. Why? Because the teachers had treated them differently. Expecting greatness, the teachers had unconsciously given these students more time to answer questions, more specific feedback, and more warmth. They created a climate of success.</p>
              <p>This phenomenon is known as the "Pygmalion Effect": high expectations lead to improved performance in a given area. It is named after the Greek myth of Pygmalion, a sculptor who fell in love with a statue he had carved, and whose love brought the statue to life. The psychological principle is that people tend to rise (or fall) to the level of expectations placed upon them.</p>
              <p>The implications extend far beyond the classroom. In the workplace, a manager who believes an employee is "high potential" will entrust them with challenging projects and mentorship. The employee, feeling trusted, gains confidence and works harder, proving the manager right. Conversely, the "Golem Effect" occurs when low expectations lead to decreased performance. If a coach believes an athlete is clumsy, they will bench them, criticize their mistakes, and offer less training. The athlete loses confidence, plays worse, and the coach says, "See? I knew it." In this way, our beliefs about others are not just observations; they are active forces that shape reality.</p>
            `,
            underlinedSentence: "In this way, our beliefs about others are not just observations; they are active forces that shape reality."
          },
          questions: [
            {
              id: "q_w7_p4_1",
              type: "detail",
              text: "What was the setup of the 1968 experiment?",
              options: [
                "Students were given new books.",
                "Researchers told teachers that randomly selected students were 'late bloomers' about to get smarter.",
                "Teachers were fired.",
                "Students were given candy."
              ],
              correctAnswer: "Researchers told teachers that randomly selected students were 'late bloomers' about to get smarter."
            },
            {
              id: "q_w7_p4_2",
              type: "detail",
              text: "What was the result of the experiment?",
              options: [
                "The teachers quit.",
                "The random students actually increased their IQ scores significantly because the teachers treated them better.",
                "The students failed.",
                "Nothing happened."
              ],
              correctAnswer: "The random students actually increased their IQ scores significantly because the teachers treated them better."
            },
            {
              id: "q_w7_p4_3",
              type: "inference",
              text: "Why is it named the 'Pygmalion Effect'?",
              options: [
                "After a scientist named Pygmalion.",
                "After a Greek myth where a sculptor's belief/love brought a statue to life (metaphor for belief bringing out potential).",
                "Because it sounds smart.",
                "It is a pig."
              ],
              correctAnswer: "After a Greek myth where a sculptor's belief/love brought a statue to life (metaphor for belief bringing out potential)."
            },
            {
              id: "q_w7_p4_4",
              type: "vocab",
              text: "In the sentence 'mentorship... entrust them with challenging projects,' what does 'entrust' mean?",
              options: [
                "To assign the responsibility for doing something to someone.",
                "To take away.",
                "To yell at.",
                "To pay."
              ],
              correctAnswer: "To assign the responsibility for doing something to someone."
            },
            {
              id: "q_w7_p4_5",
              type: "detail",
              text: "What is the 'Golem Effect'?",
              options: [
                "A monster movie.",
                "When low expectations lead to decreased performance.",
                "When high expectations fail.",
                "A type of cheese."
              ],
              correctAnswer: "When low expectations lead to decreased performance."
            },
            {
              id: "q_w7_p4_6",
              type: "inference",
              text: "What is the 'active force' mentioned in the conclusion?",
              options: [
                "Gravity.",
                "Our beliefs/expectations about others, which actually influence their behavior and outcome.",
                "The wind.",
                "Money."
              ],
              correctAnswer: "Our beliefs/expectations about others, which actually influence their behavior and outcome."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Conflate", definition: "To combine (two or more texts, ideas, etc.) into one, often in a confusing way." },
        { word: "Implicit", definition: "Implied though not plainly expressed." },
        { word: "Confirmation Bias", definition: "The tendency to interpret new evidence as confirmation of one's existing beliefs or theories." },
        { word: "Validate", definition: "To check or prove the validity or accuracy of (something)." },
        { word: "Premise", definition: "A previous statement or proposition from which another is inferred or follows as a conclusion." }
      ]
    };
  }

  // Week 8: Growth over time
  if (weekNum === 8) {
    return {
      id: 8,
      title: "The Long Game",
      theme: "Education",
      mainIdeaHint: "Real growth is often invisible or uncomfortable. Look for the difference between 'changing' and 'evolving'.",
      passages: [
        {
          passage: {
            title: "The Bamboo Architect",
            wordCount: 520,
            content: `
              <p>Lucas had been working on his martial arts form, "The Iron Horse," for six months. The stance looked simple to an outsider—feet wide, knees deeply bent, back rigid and straight—but holding it for more than a minute felt like torture. Every day after school, Lucas stood in the dojo, sweat stinging his eyes, his quadriceps burning as if they were on fire. He checked the mirror constantly, hoping to see some change. A bulging muscle? A sharper jawline? Anything to prove that his suffering was yielding results. But the reflection showed the same skinny, fourteen-year-old boy.</p>
              <p>When Sensei Tanaka told him he wasn't ready to test for the next belt, Lucas finally snapped. He untied his white belt and threw his towel onto the bench.</p>
              <p>"It's useless," Lucas complained, his voice cracking with frustration. "I've put in hundreds of hours. I hold the stance until I can't walk. But I'm exactly the same as when I started. It's like pouring water into a cracked bucket. Nothing stays."</p>
              <p>Sensei Tanaka, a man whose silence was often heavier than his words, motioned for Lucas to follow him. They walked out to the small garden behind the dojo and stopped in front of a patch of bare, brown dirt.</p>
              <p>"Do you know the story of the Chinese Bamboo?" Sensei asked.</p>
              <p>Lucas crossed his arms, still fuming. "No."</p>
              <p>"For the first year," Sensei began, "the farmer waters the ground every single day. He fertilizes it. He tends to it with great care. But nothing happens. No sprout. No leaf. No stem. The ground remains brown and empty."</p>
              <p>"Sounds like a waste of time," Lucas muttered.</p>
              <p>"The second year is the same," Sensei continued, ignoring him. "And the third. And the fourth. For four years, the farmer works with no visible reward. If he stops watering for even one week, the seed dies."</p>
              <p>He turned to Lucas, his eyes sharp. "But in the fifth year, a tiny sprout breaks the surface. And then, a miracle happens. In just six weeks, the bamboo grows ninety feet tall."</p>
              <p>Lucas looked at the dirt, then at the towering bamboo stalks in the corner of the garden. "Ninety feet in six weeks?"</p>
              <p>"Yes," Sensei said. "But tell me, Lucas: did it grow ninety feet in six weeks, or in five years?"</p>
              <p>Lucas thought for a moment. "Five years," he admitted. "If the farmer hadn't watered it those first four years, there would be no six weeks."</p>
              <p>"Precisely," Sensei said, tapping Lucas’s leg with a bamboo cane. "You think nothing is happening because you cannot see it. But underground, that bamboo was building a massive, complex root system. It had to build the foundation to support the height that was coming. If it shot up without those roots, the first wind would topple it." He looked Lucas in the eye. "Do not mistake invisibility for inactivity. You are in your root-building phase. The shaking in your legs isn't weakness leaving the body; it is the roots taking hold."</p>
              <p>Lucas looked down at his trembling legs. He realized that the burning sensation wasn't failure; it was the silent, invisible work of architecture. He picked up his towel, bowed to his Sensei, and returned to the mat. He settled into the Iron Horse stance, visualized the roots extending deep into the earth, and prepared to wait for his fifth year.</p>
            `,
            underlinedSentence: "Do not mistake invisibility for inactivity."
          },
          questions: [
            {
              id: "q_w8_p1_1",
              type: "detail",
              text: "Which title best captures the theme of the passage?",
              options: [
                "The Cracked Bucket",
                "Lucas’s Failure",
                "The Bamboo Principle: The Power of Invisible Growth",
                "Gardening Tips for Beginners"
              ],
              correctAnswer: "The Bamboo Principle: The Power of Invisible Growth"
            },
            {
              id: "q_w8_p1_2",
              type: "detail",
              text: "Why was Lucas frustrated with his training?",
              options: [
                "His Sensei was mean to him.",
                "He was putting in huge effort but seeing no visible physical changes.",
                "He lost his belt.",
                "The dojo was too hot."
              ],
              correctAnswer: "He was putting in huge effort but seeing no visible physical changes."
            },
            {
              id: "q_w8_p1_3",
              type: "detail",
              text: "According to Sensei Tanaka, what happens during the first four years of the bamboo's life?",
              options: [
                "Nothing happens; it is dormant.",
                "It grows very slowly, one inch per year.",
                "It builds a massive root system underground to support future growth.",
                "It dies if you don't talk to it."
              ],
              correctAnswer: "It builds a massive root system underground to support future growth."
            },
            {
              id: "q_w8_p1_4",
              type: "vocab",
              text: "In the sentence 'Do not mistake invisibility for inactivity,' what distinction is Sensei making?",
              options: [
                "Just because you can't see progress doesn't mean it isn't happening.",
                "Invisible things are dangerous.",
                "Lazy people are invisible.",
                "Activity requires movement."
              ],
              correctAnswer: "Just because you can't see progress doesn't mean it isn't happening."
            },
            {
              id: "q_w8_p1_5",
              type: "inference",
              text: "How does Lucas's perspective change at the end of the passage?",
              options: [
                "He decides to quit martial arts and take up gardening.",
                "He realizes his shaking legs and burning muscles are signs of 'roots taking hold' rather than failure.",
                "He decides to challenge Sensei Tanaka to a fight.",
                "He realizes he needs new shoes."
              ],
              correctAnswer: "He realizes his shaking legs and burning muscles are signs of 'roots taking hold' rather than failure."
            },
            {
              id: "q_w8_p1_6",
              type: "detail",
              text: "What specific action did the farmer have to take during the 'invisible' years?",
              options: [
                "He had to sing to the bamboo.",
                "He had to water and fertilize the ground every day.",
                "He had to dig up the seeds to check on them.",
                "He had to plant more seeds."
              ],
              correctAnswer: "He had to water and fertilize the ground every day."
            },
            {
              id: "q_w8_p1_7",
              type: "detail", // Using detail for pronoun reference
              text: "In the sentence 'It had to build the foundation to support the height that was coming,' what does 'It' refer to?",
              options: [
                "The farmer.",
                "The dirt.",
                "The bamboo.",
                "The root system."
              ],
              correctAnswer: "The bamboo."
            },
            {
              id: "q_w8_p1_8",
              type: "inference",
              text: "If Lucas is currently in his 'root-building phase,' what can we predict about his future in martial arts if he keeps practicing?",
              options: [
                "He will never get his black belt.",
                "He will suddenly experience a rapid improvement (a 'growth spurt') once his foundation is solid.",
                "He will get injured.",
                "He will become a farmer."
              ],
              correctAnswer: "He will suddenly experience a rapid improvement (a 'growth spurt') once his foundation is solid."
            }
          ]
        },
        {
          passage: {
            title: "The Ship of Theseus",
            wordCount: 540,
            content: `
              <p>Elias walked through the halls of his old middle school on "Alumni Night," feeling like a traveler returning to a foreign land that he used to call home. The lockers were painted the same chipped blue. The smell of lemon floor wax was identical. But Elias felt different. He had walked these halls three years ago as a shy, invisible boy who sat in the library during lunch playing *Magic: The Gathering*. He remembered keeping his head down, terrified that someone would ask him a question. Now, he returned as the captain of the high school debate team—louder, taller, and armed with a confidence that felt like armor.</p>
              <p>He bumped into Mr. Henderson, his favorite English teacher. "Elias!" Mr. Henderson beamed, shaking his hand. "Look at you. You haven't changed a bit."</p>
              <p>Elias smiled politely, "Good to see you, sir," he said. But the comment bothered him. As he walked away, the words echoed in his head: *Haven't changed a bit.* It felt insulting. He *had* changed. In his mind, he had replaced every single part of himself. He had traded his fantasy cards for political briefs. He had traded his silence for speeches. He had traded his fear for strategy.</p>
              <p>He remembered the philosophical paradox Mr. Henderson had taught them in 8th grade: "The Ship of Theseus." The puzzle asked: *If you replace every single plank of wood in a ship over time, until not one original piece remains, is it still the same ship?*</p>
              <p>Elias felt like that ship. He had renovated himself plank by plank. Surely, the old Elias—the shy, quiet boy—was gone, replaced by this new, improved vessel.</p>
              <p>He wandered into the library, seeking a quiet place to think. In the corner, he saw a group of middle schoolers huddled around a table, slapping down cards with colorful dragons and wizards on them. He watched them argue over the rules.</p>
              <p>"No, the Fire text says I deal double damage!" one boy insisted.</p>
              <p>"But my counter-spell blocks it!" another argued back.</p>
              <p>A wave of nostalgia hit Elias so hard it almost knocked the wind out of him. He watched the first boy analyze the board, calculating probabilities, predicting his opponent's moves, and constructing a trap. Elias realized with a jolt that he did the exact same thing in debate tournaments. The content was different—health care policy instead of dragon battles—but the *skill* was identical. The love for strategy, the thrill of the mental duel, the joy of outsmarting an opponent—that hadn't changed at all.</p>
              <p>He realized then that while his "planks" (his hobbies, his height, his voice) had changed, the "keel"—the structural spine that held the ship together—remained exactly the same. He wasn't a different person; he was just an evolved version of the same one.</p>
              <p>He found Mr. Henderson again by the punch bowl. "You were right," Elias said, grinning. "I haven't changed. I've just been... renovated."</p>
              <p>Mr. Henderson chuckled, understanding the reference immediately. "We are all just ships staying afloat, Elias. The paint changes, but the vessel remembers where it launched."</p>
            `,
            underlinedSentence: "We are all just ships staying afloat, Elias. The paint changes, but the vessel remembers where it launched."
          },
          questions: [
            {
              id: "q_w8_p2_1",
              type: "detail",
              text: "What is the central message of the passage regarding identity?",
              options: [
                "People never change, no matter how much time passes.",
                "Change is bad and should be avoided.",
                "Identity is complex; we can evolve significantly (change our 'planks') while maintaining our core traits (the 'keel').",
                "High school ruins your childhood hobbies."
              ],
              correctAnswer: "Identity is complex; we can evolve significantly (change our 'planks') while maintaining our core traits (the 'keel')."
            },
            {
              id: "q_w8_p2_2",
              type: "detail",
              text: "Why did Mr. Henderson's comment that Elias 'haven't changed a bit' initially bother Elias?",
              options: [
                "Elias thought Mr. Henderson was mocking his height.",
                "Elias felt he had undergone a complete transformation and didn't want to be associated with his shy past self.",
                "Elias wanted to be told he looked older.",
                "Mr. Henderson forgot his name."
              ],
              correctAnswer: "Elias felt he had undergone a complete transformation and didn't want to be associated with his shy past self."
            },
            {
              id: "q_w8_p2_3",
              type: "detail",
              text: "What is the 'Ship of Theseus' paradox used to explain?",
              options: [
                "How to build a boat.",
                "The continuity of identity despite physical or psychological replacement of parts.",
                "The history of Greek sailing.",
                "Why Elias likes debate."
              ],
              correctAnswer: "The continuity of identity despite physical or psychological replacement of parts."
            },
            {
              id: "q_w8_p2_4",
              type: "inference",
              text: "In the library, what realization does Elias have when watching the kids play cards?",
              options: [
                "He realizes he is better than them.",
                "He realizes that despite his new hobbies (debate), his core love for strategy and mental duels is the same skill he used in gaming.",
                "He realizes he forgot how to play *Magic: The Gathering*.",
                "He wants to bully them."
              ],
              correctAnswer: "He realizes that despite his new hobbies (debate), his core love for strategy and mental duels is the same skill he used in gaming."
            },
            {
              id: "q_w8_p2_5",
              type: "vocab",
              text: "What does the term 'renovated' suggest in Elias's final statement?",
              options: [
                "He has had plastic surgery.",
                "He has improved and updated his 'structure' without destroying the original foundation.",
                "He is a house.",
                "He is tired."
              ],
              correctAnswer: "He has improved and updated his 'structure' without destroying the original foundation."
            },
            {
              id: "q_w8_p2_6",
              type: "detail", // Using detail for pronoun reference
              text: "In the sentence 'If you replace every single plank of wood in a ship over time... is it still the same ship?', what does 'it' refer to?",
              options: [
                "The wood.",
                "The time.",
                "The ship (after the replacements).",
                "Mr. Henderson."
              ],
              correctAnswer: "The ship (after the replacements)."
            },
            {
              id: "q_w8_p2_7",
              type: "detail",
              text: "How does Elias describe his 'old' self from middle school?",
              options: [
                "A loud, popular athlete.",
                "A shy, invisible boy who played card games in the library.",
                "A debate champion.",
                "A troublemaker."
              ],
              correctAnswer: "A shy, invisible boy who played card games in the library."
            },
            {
              id: "q_w8_p2_8",
              type: "inference",
              text: "What does the metaphor of the 'keel' represent in the story?",
              options: [
                "The parts of Elias that have changed (voice, height).",
                "The bottom of a boat.",
                "The core, unchanging essence of Elias's personality (his love for strategy).",
                "Mr. Henderson's teaching style."
              ],
              correctAnswer: "The core, unchanging essence of Elias's personality (his love for strategy)."
            }
          ]
        },
        {
          passage: {
            title: "Neuroplasticity",
            wordCount: 510,
            content: `
              <p>For most of the 20th century, neuroscientists believed that the adult brain was "fixed." They thought that once a person reached adulthood, their neural pathways were set in concrete; they could lose brain cells (due to aging or injury), but they certainly couldn't grow new ones or fundamentally reorganize the structure. This view painted a grim picture of human potential: if you hadn't learned a skill by age 20, you probably never would.</p>
              <p>However, modern research has shattered this dogma. We now know that the brain possesses a remarkable quality called "neuroplasticity"—the ability to reorganize itself by forming new neural connections throughout life. Every time you learn a new fact, practice a skill, or have a new experience, your brain physically changes. It is like a muscle that grows with exercise, or a city map that is constantly being redrawn.</p>
              <p>The mechanism behind this is summarized by the Hebbian principle: "Neurons that fire together, wire together." When you struggle to learn a guitar chord, your brain is firing a specific pattern of neurons. At first, the connection is weak, like a faint trail through a dense forest. But as you repeat the action—as you struggle and fail and try again—the brain reinforces that pathway. The trail becomes a road, then a highway. Eventually, the signal travels so fast that the action feels automatic. This is why "struggle" is not a sign of failure, but a biological requirement for growth. The feeling of frustration is literally the feeling of the brain rewiring itself.</p>
              <p>This discovery has profound implications for rehabilitation and education. Stroke victims can relearn how to walk by training healthy parts of the brain to take over the functions of damaged areas. Students who believe they are "bad at math" can physically restructure their brains to become good at it through deliberate practice. We are not prisoners of our genetics; we are the architects of our own minds.</p>
            `,
            underlinedSentence: "The feeling of frustration is literally the feeling of the brain rewiring itself."
          },
          questions: [
            {
              id: "q_w8_p3_1",
              type: "detail",
              text: "What was the 'dogma' or fixed belief held by scientists in the 20th century?",
              options: [
                "The brain is made of plastic.",
                "The adult brain is fixed/unchangeable; you cannot grow new connections after a certain age.",
                "Adults are smarter than children.",
                "The brain shrinks at night."
              ],
              correctAnswer: "The adult brain is fixed/unchangeable; you cannot grow new connections after a certain age."
            },
            {
              id: "q_w8_p3_2",
              type: "detail",
              text: "What is 'neuroplasticity'?",
              options: [
                "The brain's ability to reorganize itself by forming new neural connections throughout life.",
                "A type of surgery.",
                "The hardening of the brain.",
                "Memory loss."
              ],
              correctAnswer: "The brain's ability to reorganize itself by forming new neural connections throughout life."
            },
            {
              id: "q_w8_p3_3",
              type: "inference",
              text: "How does the author reframe the feeling of 'struggle' or 'frustration' while learning?",
              options: [
                "It is a sign you should quit.",
                "It indicates you are not smart enough.",
                "It is a positive biological signal that the brain is actively rewiring (neurons firing together).",
                "It is painful."
              ],
              correctAnswer: "It is a positive biological signal that the brain is actively rewiring (neurons firing together)."
            },
            {
              id: "q_w8_p3_4",
              type: "vocab",
              text: "In the sentence 'modern research has shattered this dogma,' what does 'dogma' mean?",
              options: [
                "A dog.",
                "A principle or set of principles laid down by an authority as incontrovertibly true.",
                "A glass window.",
                "A new invention."
              ],
              correctAnswer: "A principle or set of principles laid down by an authority as incontrovertibly true."
            },
            {
              id: "q_w8_p3_5",
              type: "detail",
              text: "What does the phrase 'Neurons that fire together, wire together' describe?",
              options: [
                "Electrical fires.",
                "The process of strengthening neural pathways through repetition.",
                "How muscles work.",
                "Why we sleep."
              ],
              correctAnswer: "The process of strengthening neural pathways through repetition."
            },
            {
              id: "q_w8_p3_6",
              type: "inference",
              text: "What is the 'profound implication' for students mentioned in the conclusion?",
              options: [
                "They should study less.",
                "Intelligence is not fixed; they can change their brains to become good at subjects they find hard.",
                "School is too long.",
                "Math is easy."
              ],
              correctAnswer: "Intelligence is not fixed; they can change their brains to become good at subjects they find hard."
            }
          ]
        },
        {
          passage: {
            title: "The Plateau of Latent Potential",
            wordCount: 515,
            content: `
              <p>We often expect progress to be linear. If we put in one hour of work, we expect one unit of result. If we diet for a week, we expect to lose two pounds. We visualize success as a straight line sloping upward. However, in reality, the results of our efforts are often delayed. It is not linear; it is exponential, but with a delayed onset.</p>
              <p>Consider the melting of an ice cube. Imagine an ice cube sitting on a table in a room that is 25 degrees Fahrenheit. You slowly heat the room. 26 degrees. Nothing happens. 27. 28. 29. Still nothing. The ice cube looks exactly the same. To an outside observer, your efforts to heat the room seem completely wasted. Then you hit 30 degrees. 31. Still nothing. But at 32 degrees, the ice begins to melt. A one-degree shift, no different from the previous shifts, has unlocked a massive change.</p>
              <p>James Clear calls a similar phenomenon the "Plateau of Latent Potential." When you start a new habit—learning French, lifting weights, or writing a novel—you are often in the "Valley of Disappointment." You are putting in the work (heating the room), but you can't see the results yet (the ice hasn't melted). Many people quit during this phase because they don't see immediate feedback. They think, "I've been running for a month and my body hasn't changed. It's not working."</p>
              <p>But it *is* working. The work is not wasted; it is stored. You are building the potential energy required to break through the plateau. When the breakthrough finally comes—when the weight falls off, or the language clicks—it will look like an "overnight success" to the outside world. But in reality, it was the result of all the invisible work done in the valley. Mastery requires the patience to heat the room from 25 to 31 degrees, knowing that the melt is coming.</p>
            `,
            underlinedSentence: "But it *is* working. The work is not wasted; it is stored."
          },
          questions: [
            {
              id: "q_w8_p4_1",
              type: "detail",
              text: "How do people typically visualize progress vs. how it actually happens?",
              options: [
                "They visualize it as a circle.",
                "They expect linear progress (1 unit work = 1 unit result), but reality is often exponential with a delayed onset.",
                "They expect it to be fast.",
                "They expect failure."
              ],
              correctAnswer: "They expect linear progress (1 unit work = 1 unit result), but reality is often exponential with a delayed onset."
            },
            {
              id: "q_w8_p4_2",
              type: "detail",
              text: "What analogy is used to explain delayed results?",
              options: [
                "Boiling water.",
                "Melting an ice cube by slowly heating a room.",
                "Driving a car.",
                "Climbing a mountain."
              ],
              correctAnswer: "Melting an ice cube by slowly heating a room."
            },
            {
              id: "q_w8_p4_3",
              type: "inference",
              text: "Why do many people quit during the 'Valley of Disappointment'?",
              options: [
                "They get tired.",
                "They don't see immediate visible feedback and incorrectly assume their effort is wasted.",
                "They run out of money.",
                "It is too cold."
              ],
              correctAnswer: "They don't see immediate visible feedback and incorrectly assume their effort is wasted."
            },
            {
              id: "q_w8_p4_4",
              type: "vocab",
              text: "In the phrase 'Plateau of Latent Potential,' what does 'latent' mean?",
              options: [
                "Late.",
                "Existing but not yet developed or manifest; hidden or concealed.",
                "Visible.",
                "Obvious."
              ],
              correctAnswer: "Existing but not yet developed or manifest; hidden or concealed."
            },
            {
              id: "q_w8_p4_5",
              type: "detail",
              text: "What happens at 32 degrees in the analogy?",
              options: [
                "The room explodes.",
                "The ice begins to melt (the visible breakthrough occurs).",
                "Nothing.",
                "The ice freezes harder."
              ],
              correctAnswer: "The ice begins to melt (the visible breakthrough occurs)."
            },
            {
              id: "q_w8_p4_6",
              type: "inference",
              text: "What does the author imply about 'overnight success'?",
              options: [
                "It is lucky.",
                "It is actually the result of long periods of invisible work (stored potential) that finally broke through.",
                "It happens to everyone.",
                "It is a myth."
              ],
              correctAnswer: "It is actually the result of long periods of invisible work (stored potential) that finally broke through."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Inactivity", definition: "The state of being inactive; idleness." },
        { word: "Paradox", definition: "A situation, person, or thing that combines contradictory features or qualities." },
        { word: "Nostalgia", definition: "A sentimental longing or wistful affection for the past." },
        { word: "Essence", definition: "The intrinsic nature or indispensable quality of something." },
        { word: "Renovated", definition: "Restored to a good state of repair." }
      ]
    };
  }

  // Week 9: The Industrialized Diet (Global)
  if (weekNum === 9) {
    return {
      id: 9,
      title: "The Cog and the Machine",
      theme: "Society",
      mainIdeaHint: "How much power does one person have in a complex system? Look for the ripple effects.",
      passages: [
        {
          passage: {
            title: "The Drop in the Ocean",
            wordCount: 520,
            content: `
              <p>Kael stood in the cavernous warehouse of the "City Harvest" food bank, staring at a mountain of canned black beans. The air smelled of cardboard dust and old pallets. His job was simple: take a can, check the expiration date, ensure the label wasn't torn, and pack it into a cardboard box. He had been doing this for three hours. He calculated that he had packed about two hundred boxes. Then he made the mistake of looking at the news notification on his phone: *"City Poverty Rate Hits Record High: 50,000 Families Facing Food Insecurity."*</p>
              <p>Kael felt a hollowness in his chest. He sighed loudly and dropped a can of corn into a box with a dull thud.</p>
              <p>"What’s the point?" he muttered to the volunteer next to him, a retired history teacher named Mrs. Gable. She was moving with the steady, rhythmic efficiency of someone who had done this a thousand times. "I'm packing lunch for maybe fifty people today. Maybe. There are fifty *thousand* hungry people out there. This isn't even a dent. It's just a drop in the ocean."</p>
              <p>Mrs. Gable didn't stop packing. Her hands moved fluidly—grab, check, pack, seal. "You know the old saying about the ocean, Kael?" she asked, her voice calm amidst the warehouse clatter. "It’s made entirely of drops."</p>
              <p>Kael rolled his eyes, feeling the cynical weight of his sixteen years. "That's just a nice slogan for bumper stickers," he argued. "It doesn't change the math. The scale is off. The system is broken. We need policy changes, tax reform, supply chain adjustments—not two hundred cans of corn."</p>
              <p>"We do need policy changes," Mrs. Gable agreed, taping a box shut with a sharp *zip*. "But systems are just people. Giant, complicated webs of people. If everyone waits for the 'system' to fix it, nothing happens. The system doesn't have hands. You do."</p>
              <p>She paused and looked him in the eye. "You think this box is small because you are looking at the statistics. But statistics numb us. To the mother who receives this box tonight, it is not small. It is everything. It is the difference between her child sleeping hungry or full. It is the difference between despair and relief."</p>
              <p>She placed a hand on the cardboard box Kael was holding. "You are not failing to feed fifty thousand people. You are successfully feeding one person, fifty times. Do not let the things you cannot do stop you from doing the things you can."</p>
              <p>Kael looked down at the box. He didn't see a statistic anymore. He imagined a specific kitchen table. He imagined a tired mother opening the flaps. He imagined the sound of a can opener and the smell of cooking corn. He realized that while he couldn't fix the whole broken world, he could fix *someone's* Tuesday night. The hollowness in his chest filled, just a little. He picked up another can.</p>
            `,
            underlinedSentence: "But systems are made of people. If everyone waits for the 'system' to fix it, nothing happens."
          },
          questions: [
            {
              id: "q_w9_p1_1",
              type: "detail",
              text: "Which title best captures the theme of the passage?",
              options: [
                "The Broken System",
                "Mrs. Gable’s Lecture",
                "The Drop in the Ocean: The Power of Individual Action",
                "How to Pack Canned Food"
              ],
              correctAnswer: "The Drop in the Ocean: The Power of Individual Action"
            },
            {
              id: "q_w9_p1_2",
              type: "detail",
              text: "What caused Kael to feel discouraged initially?",
              options: [
                "He was tired of standing.",
                "He saw a news statistic about 50,000 families in need and felt his efforts were too small to matter.",
                "He didn't like corn.",
                "His phone battery died."
              ],
              correctAnswer: "He saw a news statistic about 50,000 families in need and felt his efforts were too small to matter."
            },
            {
              id: "q_w9_p1_3",
              type: "detail",
              text: "How did Mrs. Gable respond to Kael's claim that his work was 'just a drop in the ocean'?",
              options: [
                "She agreed and told him to go home.",
                "She told him to work faster.",
                "She reminded him that the ocean is made entirely of drops.",
                "She offered him a sandwich."
              ],
              correctAnswer: "She reminded him that the ocean is made entirely of drops."
            },
            {
              id: "q_w9_p1_4",
              type: "inference",
              text: "Mrs. Gable argues that 'The system doesn't have hands. You do.' What does she mean by this metaphor?",
              options: [
                "Systems are robotic.",
                "Abstract concepts (like 'the system' or 'government') cannot perform physical acts of care; only actual people can do the work.",
                "Kael has big hands.",
                "The warehouse automation was broken."
              ],
              correctAnswer: "Abstract concepts (like 'the system' or 'government') cannot perform physical acts of care; only actual people can do the work."
            },
            {
              id: "q_w9_p1_5",
              type: "vocab",
              text: "In the sentence 'Statistics numb us,' what does 'numb' mean in this context?",
              options: [
                "To make cold.",
                "To desensitize or make us unable to feel the emotional reality of individual suffering.",
                "To improve math skills.",
                "To make sleepy."
              ],
              correctAnswer: "To desensitize or make us unable to feel the emotional reality of individual suffering."
            },
            {
              id: "q_w9_p1_6",
              type: "detail",
              text: "What distinction does Mrs. Gable make about the value of the box?",
              options: [
                "It is worth five dollars.",
                "It is statistically insignificant to the city, but vitally important ('everything') to the specific family receiving it.",
                "It is heavy.",
                "It is recyclable."
              ],
              correctAnswer: "It is statistically insignificant to the city, but vitally important ('everything') to the specific family receiving it."
            },
            {
              id: "q_w9_p1_7",
              type: "detail", // Using detail for pronoun reference
              text: "In the sentence 'It is the difference between her child sleeping hungry or full,' what does 'It' refer to?",
              options: [
                "The system.",
                "The ocean.",
                "The box of food.",
                "The policy change."
              ],
              correctAnswer: "The box of food."
            },
            {
              id: "q_w9_p1_8",
              type: "inference",
              text: "How does Kael’s perspective shift at the end?",
              options: [
                "He decides to run for mayor to change the policy.",
                "He quits volunteering.",
                "He reframes his action from 'failing to save everyone' to 'successfully helping someone,' visualizing the specific impact.",
                "He decides to only pack beans."
              ],
              correctAnswer: "He reframes his action from 'failing to save everyone' to 'successfully helping someone,' visualizing the specific impact."
            }
          ]
        },
        {
          passage: {
            title: "The Traffic Theory",
            wordCount: 540,
            content: `
              <p>The debate team bus was late. Again. On the way to the Regional Championship, they had hit a wall of red lights in downtown. Now, they were stuck in gridlock. Miles of cars stood bumper to bumper, shimmering in the heat waves rising from the asphalt. Engines idled, spewing exhaust. Drivers honked in futile, rhythmic rage, as if the noise could somehow push the cars forward.</p>
              <p>"We're going to miss the registration deadline," groaned Sarah, checking her watch for the third time. "Why is traffic always so bad in this city? The city planners are incompetent. They need to widen the roads."</p>
              <p>David, the team captain known for his cool logic, looked out the window. "It's not just the planners," he said, pointing. "Look at that intersection."</p>
              <p>Ahead of them, the traffic light had turned green for the cross street, but no one could move. A massive blue pickup truck had tried to squeeze through the previous yellow light but hadn't made it. Now, it was stuck in the middle of the box, blocking the entire intersection. Because that one truck was selfishly blocking the lane to gain five feet, the twenty cars with the green light couldn't move. Then, a taxi tried to drive around the truck and got stuck too, sealing the knot.</p>
              <p>"It's a perfect example of the **Tragedy of the Commons**," David muttered. "Everyone acts in their own rational self-interest—trying to gain five seconds—but by doing so, they destroy the shared resource for everyone."</p>
              <p>"So what?" Sarah snapped, wiping sweat from her forehead. "That's human nature. We can't change it."</p>
              <p>"Watch," David said.</p>
              <p>The bus driver, Mr. Henderson, saw a gap opening up in front of them. The light was yellow. He could have jammed the nose of the bus into the intersection, claiming the space. It would have saved them ten seconds. But Mr. Henderson stopped. He waited behind the white line, leaving the "box" clear.</p>
              <p>The driver in the sedan next to them revved his engine, ready to cut in, but then saw the bus waiting. He hesitated. He looked at the gridlock ahead, then at the open space Mr. Henderson had left. He stopped too.</p>
              <p>Suddenly, the cross-traffic—which had been paralyzed—saw the opening. One car slipped through the gap the bus had left. Then another. The knot began to untie. A minute later, the intersection cleared, and traffic began to flow again—for everyone.</p>
              <p>"He didn't force his way in," David observed, impressed. "He chose to lose five seconds to fix the flow. He realized the truth."</p>
              <p>"What truth?" Sarah asked.</p>
              <p>"That we aren't *stuck* in traffic," David said, watching the cars start to move. "We *are* traffic. The system isn't something that happens to us. It's something we are doing."</p>
            `,
            underlinedSentence: "He realized he isn't *stuck* in traffic. He *is* traffic."
          },
          questions: [
            {
              id: "q_w9_p2_1",
              type: "detail",
              text: "What is the central message of the passage?",
              options: [
                "City planners are to blame for all traffic.",
                "Buses are slower than cars.",
                "Individuals are not just passive victims of systems; their choices actively create or solve the system's problems.",
                "Never take a bus to a debate tournament."
              ],
              correctAnswer: "Individuals are not just passive victims of systems; their choices actively create or solve the system's problems."
            },
            {
              id: "q_w9_p2_2",
              type: "detail",
              text: "What caused the initial gridlock at the intersection?",
              options: [
                "A broken traffic light.",
                "A pickup truck driver acting selfishly to 'squeeze through,' impeding the flow for everyone else.",
                "Construction work.",
                "A car accident."
              ],
              correctAnswer: "A pickup truck driver acting selfishly to 'squeeze through,' impeding the flow for everyone else."
            },
            {
              id: "q_w9_p2_3",
              type: "detail",
              text: "How does David explain the situation using the '**Tragedy of the Commons**'?",
              options: [
                "He says traffic is a tragedy.",
                "He explains that when everyone pursues their own short-term gain (blocking the box), it ruins the shared resource (the road) for everyone.",
                "He says common people drive badly.",
                "He thinks they should have taken the train."
              ],
              correctAnswer: "He explains that when everyone pursues their own short-term gain (blocking the box), it ruins the shared resource (the road) for everyone."
            },
            {
              id: "q_w9_p2_4",
              type: "detail",
              text: "What pivotal choice did the bus driver, Mr. Henderson, make?",
              options: [
                "He honked his horn loudly.",
                "He drove on the sidewalk.",
                "He chose *not* to advance, sacrificing his own immediate progress to keep the intersection clear for the greater good.",
                "He turned the bus around."
              ],
              correctAnswer: "He chose *not* to advance, sacrificing his own immediate progress to keep the intersection clear for the greater good."
            },
            {
              id: "q_w9_p2_5",
              type: "vocab",
              text: "In the sentence 'Drivers honked in futile rage,' what does 'futile' mean?",
              options: [
                "Loud.",
                "Effective.",
                "Pointless or incapable of producing any useful result.",
                "Rhythmic."
              ],
              correctAnswer: "Pointless or incapable of producing any useful result."
            },
            {
              id: "q_w9_p2_6",
              type: "inference",
              text: "Why did the driver in the sedan stop as well?",
              options: [
                "His car broke down.",
                "He was influenced by the bus driver's example (social proof) and decided to cooperate.",
                "He was afraid of the bus.",
                "He fell asleep."
              ],
              correctAnswer: "He was influenced by the bus driver's example (social proof) and decided to cooperate."
            },
            {
              id: "q_w9_p2_7",
              type: "detail", // Using detail for pronoun reference
              text: "In the sentence 'It would have saved them ten seconds,' what does 'It' refer to?",
              options: [
                "The bus.",
                "Jamming the nose of the bus into the intersection.",
                "The green light.",
                "The traffic jam."
              ],
              correctAnswer: "Jamming the nose of the bus into the intersection."
            },
            {
              id: "q_w9_p2_8",
              type: "inference",
              text: "What does David mean when he says 'We are traffic'?",
              options: [
                "We are made of cars.",
                "We are responsible for the condition of the road because our collective bodies/vehicles *make up* the jam; we are participants, not just observers.",
                "We are moving slowly.",
                "We should walk."
              ],
              correctAnswer: "We are responsible for the condition of the road because our collective bodies/vehicles *make up* the jam; we are participants, not just observers."
            }
          ]
        },
        {
          passage: {
            title: "The Butterfly Effect in Systems",
            wordCount: 510,
            content: `
              <p>In 1961, meteorologist Edward Lorenz was running a computer simulation to predict weather patterns. He wanted to re-examine a sequence, so he typed in the numbers from the previous run. However, instead of typing the full precision (0.506127), he rounded it off to 0.506 to save time. He assumed that such a tiny difference—less than one-thousandth of a percent—would have no significant effect on the outcome. He went to get a cup of coffee.</p>
              <p>When he returned, he was shocked. The new simulation had diverged completely from the original. The tiny initial difference had cascaded through the system, creating a radically different weather pattern. Lorenz realized that in complex, dynamic systems, small inputs can produce massive, non-linear outputs. He famously asked, "Does the flap of a butterfly’s wings in Brazil set off a tornado in Texas?" This concept became known as the "Butterfly Effect," a core principle of Chaos Theory.</p>
              <p>This principle applies to more than just weather. In ecology, the removal of a single species (like wolves in Yellowstone) can fundamentally alter rivers and forests. In economics, a small default on a mortgage in Ohio can trigger a global financial crisis. Systems are not linear machines where Effect = Input. They are sensitive webs of interdependence. A minor disruption in one node can amplify as it travels through the network, leading to systemic collapse or unexpected growth.</p>
              <p>Understanding this helps us respect the complexity of the world we inhabit. Humans often try to control systems with simple, linear interventions—"Build a road here," "Kill this pest there." But because we often fail to account for the ripples, our solutions frequently create new problems. The Butterfly Effect teaches us that we cannot just change one thing; when we change one thing, we change everything connected to it.</p>
            `,
            underlinedSentence: "But because we often fail to account for the ripples, our solutions frequently create new problems."
          },
          questions: [
            {
              id: "q_w9_p3_1",
              type: "detail",
              text: "What mistake did Edward Lorenz make in his simulation?",
              options: [
                "He spilled coffee on the computer.",
                "He rounded off a number (0.506127 to 0.506), assuming the tiny difference wouldn't matter.",
                "He used the wrong formula.",
                "He forgot to save his work."
              ],
              correctAnswer: "He rounded off a number (0.506127 to 0.506), assuming the tiny difference wouldn't matter."
            },
            {
              id: "q_w9_p3_2",
              type: "detail",
              text: "What was the result of Lorenz's rounding error?",
              options: [
                "The computer crashed.",
                "The new simulation diverged completely from the original, producing a radically different weather pattern.",
                "It predicted a sunny day.",
                "Nothing changed."
              ],
              correctAnswer: "The new simulation diverged completely from the original, producing a radically different weather pattern."
            },
            {
              id: "q_w9_p3_3",
              type: "inference",
              text: "What is the 'Butterfly Effect'?",
              options: [
                "Butterflies are dangerous.",
                "The concept that in complex systems, small inputs can produce massive, non-linear outputs (ripples).",
                "A type of tornado.",
                "A theory about insects."
              ],
              correctAnswer: "The concept that in complex systems, small inputs can produce massive, non-linear outputs (ripples)."
            },
            {
              id: "q_w9_p3_4",
              type: "vocab",
              text: "In the sentence 'creating a radically different weather pattern,' what does 'radically' mean?",
              options: [
                "Slightly.",
                "Fundamentally or completely (extreme change).",
                "Slowly.",
                "Colorfully."
              ],
              correctAnswer: "Fundamentally or completely (extreme change)."
            },
            {
              id: "q_w9_p3_5",
              type: "detail",
              text: "Which of the following is NOT an example of the Butterfly Effect mentioned in the passage?",
              options: [
                "Wolves in Yellowstone altering rivers.",
                "A mortgage default causing a financial crisis.",
                "A butterfly landing on a flower.",
                "Rounding numbers in a weather simulation."
              ],
              correctAnswer: "A butterfly landing on a flower."
            },
            {
              id: "q_w9_p3_6",
              type: "inference",
              text: "What lesson does the Butterfly Effect teach us about human intervention in systems?",
              options: [
                "We should not build roads.",
                "We must respect complexity because simple linear solutions often cause unintended ripples/new problems.",
                "Computers are always right.",
                "Nature is simple."
              ],
              correctAnswer: "We must respect complexity because simple linear solutions often cause unintended ripples/new problems."
            }
          ]
        },
        {
          passage: {
            title: "The Invisible Chain",
            wordCount: 525,
            content: `
              <p>When you buy a t-shirt for five dollars, it feels like a simple transaction: you give money, you get a shirt. But if you were to trace the life of that shirt backward, you would uncover a staggering web of global connections known as a "supply chain." That cotton may have been grown in India, irrigated by water from a shrinking river. It was likely shipped to Vietnam to be spun into thread, then to Bangladesh to be woven and sewn, perhaps by a worker earning less than a living wage. The shirt was then packaged in plastic made from Saudi Arabian oil, shipped on a vessel registered in Panama, and driven by a truck to your local store.</p>
              <p>We call this chain "invisible" because the modern consumer is shielded from its complexity. We see only the finished product, divorced from its history. This invisibility is a feature, not a bug, of globalization. It allows us to enjoy low prices without confronting the environmental or human costs embedded in the goods we consume. This concept, Marx dubbed "commodity fetishism"—the way the market transforms a product of social labor into a mysterious object that seems to appear out of nowhere.</p>
              <p>However, this invisibility creates fragility. Because the chain is so long and interconnected, a break in one link disrupts the whole. A blocked canal in Egypt can delay furniture deliveries in New York. A drought in Taiwan can stop car production in Detroit (due to chip shortages). These "choke points" reveal that our independence is an illusion. We are not isolated individuals; we are nodes in a single, throbbing global organism.</p>
              <p>Furthermore, the invisibility makes ethical consumption difficult. If we cannot see the factory conditions or the carbon footprint, we cannot easily vote with our wallets. Transparency initiatives—like "Fair Trade" labels or blockchain tracking—attempt to make the invisible visible again, restoring the link between the consumer and the creator. They remind us that there is no such thing as a product without a history.</p>
            `,
            underlinedSentence: "We are not isolated individuals; we are nodes in a single, throbbing global organism."
          },
          questions: [
            {
              id: "q_w9_p4_1",
              type: "detail",
              text: "Why does the author call the supply chain 'invisible'?",
              options: [
                "It is made of glass.",
                "Consumers see only the finished product and are shielded from the complex history and labor behind it.",
                "It is underground.",
                "It is a secret."
              ],
              correctAnswer: "Consumers see only the finished product and are shielded from the complex history and labor behind it."
            },
            {
              id: "q_w9_p4_2",
              type: "detail",
              text: "What is 'commodity fetishism' as explained in the text?",
              options: [
                "Loving shopping.",
                "The way the market masks the social labor behind a product, making it seem like it appeared out of nowhere.",
                "Collecting rare items.",
                "Buying cheap clothes."
              ],
              correctAnswer: "The way the market masks the social labor behind a product, making it seem like it appeared out of nowhere."
            },
            {
              id: "q_w9_p4_3",
              type: "inference",
              text: "How does the complexity of the global supply chain create 'fragility'?",
              options: [
                "Foreign products break easily.",
                "Because everything is interconnected, a problem in one distant place (like a blocked canal) can disrupt the entire system globally.",
                "Ships are slow.",
                "People buy too much."
              ],
              correctAnswer: "Because everything is interconnected, a problem in one distant place (like a blocked canal) can disrupt the entire system globally."
            },
            {
              id: "q_w9_p4_4",
              type: "vocab",
              text: "In the sentence 'shipped on a vessel registered in Panama,' what is a 'vessel'?",
              options: [
                "A cup.",
                "A large ship or boat.",
                "A blood vessel.",
                "A box."
              ],
              correctAnswer: "A large ship or boat."
            },
            {
              id: "q_w9_p4_5",
              type: "detail",
              text: "What is the purpose of transparency initiatives like 'Fair Trade'?",
              options: [
                "To make packaging clear.",
                "To make the invisible history (labor/environment) visible again so consumers can make ethical choices.",
                "To raise prices.",
                "To sell more cotton."
              ],
              correctAnswer: "To make the invisible history (labor/environment) visible again so consumers can make ethical choices."
            },
            {
              id: "q_w9_p4_6",
              type: "inference",
              text: "What does the author mean by 'We are not isolated individuals; we are nodes in a single, throbbing global organism'?",
              options: [
                "We are all related.",
                "We are mutually dependent on a global system; our lives rely on the labor and resources of the entire planet.",
                "The earth is alive.",
                "We are robots."
              ],
              correctAnswer: "We are mutually dependent on a global system; our lives rely on the labor and resources of the entire planet."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Cumulative", definition: "Increasing or increased in quantity, degree, or force by successive additions." },
        { word: "Gridlock", definition: "A traffic jam affecting a whole network of intersecting streets." },
        { word: "Futile", definition: "Incapable of producing any useful result; pointless." },
        { word: "Tragedy of the Commons", definition: "A situation where individuals acting in their own interest deplete a shared resource." },
        { word: "Systemic", definition: "Relating to a system, especially as opposed to a particular part." }
      ]
    };
  }


  // Week 10: Communication & intention
  if (weekNum === 10) {
    return {
      id: 10,
      title: "The Ghost in the Machine",
      theme: "Media",
      mainIdeaHint: "Communication is more than words. Look for what is *not* said.",
      passages: [
        {
          passage: {
            title: "The Echo of a Text",
            wordCount: 380,
            content: `
              <p>"Fine."</p>
              <p>That was all Leo sent. Just one word, followed by a period. Elena stared at her phone screen, analyzing the four letters as if they were a secret code. Was it "Fine" as in "That works for me"? Or was it "Fine" as in "I’m furious but I’m not going to tell you why"?</p>
              <p>They were supposed to be working on their history presentation. Elena had just texted him to say she would be late because of band practice. Leo, who was usually the chill one, had responded instantly.</p>
              <p>"It's the period," Elena told her friend Maya at lunch. "You don't put a period in a text unless you want to end the conversation. It's aggressive."<br> "Maybe he just likes grammar," Maya suggested.<br> "No," Elena insisted. "He's mad. I can feel the tone."</p>
              <p>Anxious, Elena spent the rest of the day avoiding Leo. She drafted three different apology texts but sent none. When she finally walked into the library for their meeting, she was ready for a fight. "Look, I'm sorry about practice," she blurted out.</p>
              <p>Leo looked up from his laptop, confused. "What? Oh, that. No worries. I got a lot of reading done."<br> Elena blinked. "But... you texted 'Fine.'"<br> "Yeah. Because it was fine." Leo paused, realizing. "Wait, did you think I was mad?"</p>
              <p>Elena slumped into a chair, laughing nervously. "I spent four hours decoding a single punctuation mark."<br> "Next time," Leo grinned, "I'll use an emoji. Or maybe I'll just, you know, talk to you."</p>
            `,
            underlinedSentence: "Or maybe I'll just, you know, talk to you."
          },
          questions: [
            {
              id: "q_w10_p1_1",
              type: "detail",
              text: "Which title best captures the theme of the passage?",
              options: [
                "The History Presentation",
                "Leo’s Anger",
                "The Echo of a Text: Digital Misinterpretation",
                "Grammar Rules"
              ],
              correctAnswer: "The Echo of a Text: Digital Misinterpretation"
            },
            {
              id: "q_w10_p1_2",
              type: "detail",
              text: "Why did Elena interpret Leo's text as aggressive?",
              options: [
                "He used all caps",
                "He used a period, which she perceived as a signal of finality or anger in the context of casual texting",
                "He said 'I hate you'",
                "He didn't use an emoji"
              ],
              correctAnswer: "He used a period, which she perceived as a signal of finality or anger in the context of casual texting"
            },
            {
              id: "q_w10_p1_3",
              type: "inference",
              text: "What does this situation illustrate about digital communication?",
              options: [
                "It is faster than talking",
                "It strips away non-verbal cues (tone, face, voice), leading to 'projection,' where the receiver fills in the emotional gaps, often incorrectly",
                "Teenagers spend too much time on phones",
                "Period use is declining"
              ],
              correctAnswer: "It strips away non-verbal cues (tone, face, voice), leading to 'projection,' where the receiver fills in the emotional gaps, often incorrectly"
            },
            {
              id: "q_w10_p1_4",
              type: "detail",
              text: "How does Maya's reaction differ from Elena's?",
              options: [
                "Maya is angry at Leo too",
                "Maya suggests a literal interpretation ('Maybe he just likes grammar'), offering a contrast to Elena's emotional reading",
                "Maya tells Elena to skip the meeting",
                "Maya cries"
              ],
              correctAnswer: "Maya suggests a literal interpretation ('Maybe he just likes grammar'), offering a contrast to Elena's emotional reading"
            },
            {
              id: "q_w10_p1_5",
              type: "detail",
              text: "What is the resolution of the conflict?",
              options: [
                "They break up",
                "Leo admits he was actually mad",
                "They realize it was a misunderstanding caused by the medium (texting) and the lack of tone",
                "They fail the project"
              ],
              correctAnswer: "They realize it was a misunderstanding caused by the medium (texting) and the lack of tone"
            },
            {
              id: "q_w10_p1_6",
              type: "inference",
              text: "In the final sentence ('Or maybe I'll just, you know, talk to you'), what is the implied lesson?",
              options: [
                "Face-to-face communication removes ambiguity",
                "Leo hates texting",
                "They should use email instead",
                "Talking is slower"
              ],
              correctAnswer: "Face-to-face communication removes ambiguity"
            }
          ]
        },
        {
          passage: {
            title: "The Polite Fiction",
            wordCount: 400,
            content: `
              <p>Sam was excited to visit his exchange student host family in Tokyo. He had studied the language for two years and felt ready. On his first night, his host mother, Mrs. Sato, prepared a massive feast. "Please, eat," she urged. "Is it good?"</p>
              <p>"It's delicious!" Sam said honestly. He ate three bowls of rice to show his appreciation. When Mrs. Sato offered a fourth, Sam rubbed his stomach and smiled. "I couldn't possibly. I am so full."</p>
              <p>Mrs. Sato smiled but looked concerned. "Oh, but you must not like it. There is so much left." She served him another bowl.<br> Sam, not wanting to be rude, forced himself to eat it. He felt sick, but he kept smiling.</p>
              <p>The next day, Sam met his friend Kenji. "I don't understand," Sam groaned. "I told her I was full. Why did she keep feeding me?"<br> Kenji laughed. "In Japan, we have *honne* (true feeling) and *tatemae* (public face). But here, it's about the 'dance' of hospitality. If you just refuse once, it sounds like you are being polite. To really refuse, you have to leave rice in your bowl."</p>
              <p>"Leave it?" Sam was shocked. "My mom taught me to clean my plate. It shows respect for the cook."<br> "Here," Kenji explained, "an empty bowl means 'I am still hungry; you didn't feed me enough.' A little rice left means 'You have provided so abundantly that I am satisfied.'"</p>
              <p>Sam realized that language was not just a code of words; it was a code of behavior. He had been speaking Japanese, but he hadn't been "listening" to the culture. He had assumed his "No" meant "No," when in this context, it had meant "Please ask me again."</p>
            `,
            underlinedSentence: "He had been speaking Japanese, but he hadn't been 'listening' to the culture."
          },
          questions: [
            {
              id: "q_w10_p2_1",
              type: "detail",
              text: "What is the central conflict of the passage?",
              options: [
                "Sam hates Japanese food",
                "A cultural misunderstanding regarding the signals for 'fullness' and hospitality",
                "Mrs. Sato is a bad cook",
                "Sam doesn't know the word for 'rice'"
              ],
              correctAnswer: "A cultural misunderstanding regarding the signals for 'fullness' and hospitality"
            },
            {
              id: "q_w10_p2_2",
              type: "detail",
              text: "Why did Sam initially eat the fourth bowl of rice?",
              options: [
                "He was still hungry",
                "He didn't want to be rude, thinking that refusing the host's offer was impolite",
                "It was his favorite food",
                "He was in a eating contest"
              ],
              correctAnswer: "He didn't want to be rude, thinking that refusing the host's offer was impolite"
            },
            {
              id: "q_w10_p2_3",
              type: "detail",
              text: "What does the concept of 'an empty bowl' signify in Sam's culture versus Mrs. Sato's culture?",
              options: [
                "Sam's culture: Respect/Finished. Mrs. Sato's culture: Hunger/Insufficient food",
                "Sam's culture: Hunger. Mrs. Sato's culture: Respect",
                "Both cultures view it as rude",
                "Both cultures view it as polite"
              ],
              correctAnswer: "Sam's culture: Respect/Finished. Mrs. Sato's culture: Hunger/Insufficient food"
            },
            {
              id: "q_w10_p2_4",
              type: "detail",
              text: "Kenji explains the situation using which cultural concepts?",
              options: [
                "Yin and Yang",
                "*Honne* and *tatemae* (though the specific rule discussed is about the signal of the rice bowl)",
                "Supply and Demand",
                "War and Peace"
              ],
              correctAnswer: "*Honne* and *tatemae* (though the specific rule discussed is about the signal of the rice bowl)"
            },
            {
              id: "q_w10_p2_5",
              type: "inference",
              text: "In the sentence 'He had been speaking Japanese, but he hadn't been listening to the culture,' what does Sam realize?",
              options: [
                "He needs hearing aids",
                "Fluency requires understanding cultural subtext and intention, not just vocabulary and grammar",
                "Japanese is too hard",
                "He should stop talking"
              ],
              correctAnswer: "Fluency requires understanding cultural subtext and intention, not just vocabulary and grammar"
            },
            {
              id: "q_w10_p2_6",
              type: "detail",
              text: "What is the 'Polite Fiction' in this scenario?",
              options: [
                "The food was fake",
                "The ritual where the guest pretends to refuse to be modest, and the host insists to be generous",
                "Sam lied about liking the food",
                "Mrs. Sato lied about her name"
              ],
              correctAnswer: "The ritual where the guest pretends to refuse to be modest, and the host insists to be generous"
            }
          ]
        },
        {
          passage: {
            title: "High-Context Cultures",
            wordCount: 510,
            content: `
              <p>Anthropologist Edward T. Hall categorized cultures into two types: High-Context and Low-Context. In Low-Context cultures (like the United States, Germany, or Australia), communication is explicit. "Yes" means yes, and "No" means no. The message is largely contained in the words themselves. If you want something, you ask for it. Being direct is seen as a sign of honesty and efficiency.</p>
              <p>However, in High-Context cultures (like Japan, China, or many Arab nations), communication is implicit. The meaning is not just in the words, but in the *context*: the relationship between the speakers, their social status, their body language, and even their silence. In these cultures, saying a direct "No" is often considered rude or harmonious. Instead, a person might say, "That will be difficult," or "I will think about it." To a Low-Context listener, this sounds like a "Maybe." To a High-Context listener, it is a clear refusal.</p>
              <p>This difference causes endless confusion in international business and diplomacy. A classic example involves a Western businessman pitching a deal to a Japanese executive. The executive nods frequently and says "Hai" (Yes). The American thinks the deal is signed. Later, he is shocked to learn the deal was rejected. He feels lied to. He didn't understand that the nod meant "I am listening" or "I respect you," not "I agree with your contract."</p>
              <p>High-Context communication requires "reading the air" (a Japanese phrase, *Kuuki wo yomu*). It relies on a shared cultural understanding where listeners are expected to actively interpret the speaker's intent. It values harmony and saving face over brutal honesty. To navigate a globalized world, we must learn to hear not just what is said, but what is left unsaid.</p>
            `,
            underlinedSentence: "In these cultures, saying a direct 'No' is often considered rude or harmonious."
          },
          questions: [
            {
              id: "q_w10_p3_1",
              type: "detail",
              text: "How is 'Low-Context' culture defined?",
              options: [
                "People speak quietly.",
                "Communication is explicit; the message is in the words themselves (Yes means Yes).",
                "People talk a lot.",
                "Communication is very confusing."
              ],
              correctAnswer: "Communication is explicit; the message is in the words themselves (Yes means Yes)."
            },
            {
              id: "q_w10_p3_2",
              type: "detail",
              text: "How is 'High-Context' culture defined?",
              options: [
                "Communication is implicit; meaning depends on context, relationships, and non-verbal cues.",
                "People only use emojis.",
                "People are rude.",
                "Everyone yells."
              ],
              correctAnswer: "Communication is implicit; meaning depends on context, relationships, and non-verbal cues."
            },
            {
              id: "q_w10_p3_3",
              type: "inference",
              text: "Why might a High-Context speaker say 'That will be difficult' instead of 'No'?",
              options: [
                "They don't know the word for No.",
                "They value social harmony and saving face, so they avoid direct confrontation/refusal.",
                "They are lying.",
                "They are confused."
              ],
              correctAnswer: "They value social harmony and saving face, so they avoid direct confrontation/refusal."
            },
            {
              id: "q_w10_p3_4",
              type: "vocab",
              text: "In the phrase 'communication is explicit,' what does 'explicit' mean?",
              options: [
                "Rude.",
                "Stated clearly and in detail, leaving no room for confusion or doubt.",
                "Hidden.",
                "Fast."
              ],
              correctAnswer: "Stated clearly and in detail, leaving no room for confusion or doubt."
            },
            {
              id: "q_w10_p3_5",
              type: "detail",
              text: "What misunderstanding occurred between the Western businessman and the Japanese executive?",
              options: [
                "The businessman lost his wallet.",
                "The businessman interpreted the nod/listing signal ('Hai') as agreement to the contract, when it just meant respect/listening.",
                "The executive fell asleep.",
                "They spoke different languages."
              ],
              correctAnswer: "The businessman interpreted the nod/listing signal ('Hai') as agreement to the contract, when it just meant respect/listening."
            },
            {
              id: "q_w10_p3_6",
              type: "inference",
              text: "What does the phrase 'reading the air' imply?",
              options: [
                "Checking the weather.",
                "The ability to intuitively understand the mood, unspoken tension, or subtext of a situation.",
                "Breathing exercises.",
                "Being a pilot."
              ],
              correctAnswer: "The ability to intuitively understand the mood, unspoken tension, or subtext of a situation."
            }
          ]
        },
        {
          passage: {
            title: "The 7-38-55 Rule",
            wordCount: 520,
            content: `
              <p>You have probably heard the statistic: "93% of communication is non-verbal." It is one of the most famous and oft-quoted "facts" in psychology. It suggests that our words barely matter (7%), while our tone of voice (38%) and our body language (55%) do all the heavy lifting. This is known as the "7-38-55 Rule," derived from studies by Dr. Albert Mehrabian in the 1960s.</p>
              <p>There is just one problem: most people misuse it. Mehrabian's study was very specific. He was studying how people communicate *feelings* and *attitudes*, particularly when those feelings conflict with the words. For example, if someone screams "I LOVE YOU!" with a red face and clenched fists, we believe the fists (55%) and the screaming tone (38%) over the word "Love" (7%). In this specific case of incongruence, non-verbal cues dominate.</p>
              <p>However, this rule does *not* apply to all communication. If I am giving you directions to the airport, or explaining how a nuclear reactor works, my words are definitely more than 7% of the message. If I stand perfectly still and say "Turn left at the light," the information is conveyed 100% by the words. If you tried to guess the directions based solely on my facial expression, you would get lost.</p>
              <p>The danger of the 7-38-55 myth is that it leads people to over-analyze body language and undervalue content. In job interviews or negotiations, people obsess over "power poses" or eye contact while neglecting to prepare intelligent answers. While presentation matters, substance is still king in information-heavy contexts. Communication is a holistic engine; you cannot drive it with just the wheels (body language) while ignoring the engine (logic and words).</p>
            `,
            underlinedSentence: "In this specific case of incongruence, non-verbal cues dominate."
          },
          questions: [
            {
              id: "q_w10_p4_1",
              type: "detail",
              text: "What does the popular 7-38-55 Rule claim?",
              options: [
                "7% of people listen.",
                "Communication is 7% words, 38% tone, and 55% body language.",
                "You should talk 55% of the time.",
                "Numbers are important."
              ],
              correctAnswer: "Communication is 7% words, 38% tone, and 55% body language."
            },
            {
              id: "q_w10_p4_2",
              type: "detail",
              text: "What was the specific context of Dr. Mehrabian's original study?",
              options: [
                "Giving directions.",
                "Communicating feelings/attitudes, specifically when they conflict with the words (incongruence).",
                "Talking to babies.",
                "Teaching math."
              ],
              correctAnswer: "Communicating feelings/attitudes, specifically when they conflict with the words (incongruence)."
            },
            {
              id: "q_w10_p4_3",
              type: "inference",
              text: "Why is the rule considered a 'myth' or 'misused' in general contexts?",
              options: [
                "Because Dr. Mehrabian was lying.",
                "Because in information-heavy contexts (like directions or facts), words convey significantly more than 7% of the meaning.",
                "Because body language doesn't exist.",
                "Because people don't like math."
              ],
              correctAnswer: "Because in information-heavy contexts (like directions or facts), words convey significantly more than 7% of the meaning."
            },
            {
              id: "q_w10_p4_4",
              type: "vocab",
              text: "In the sentence 'In this specific case of incongruence,' what does 'incongruence' mean?",
              options: [
                "Harmony.",
                "A mismatch or lack of agreement (e.g., words say one thing, body says another).",
                "Silence.",
                "Happiness."
              ],
              correctAnswer: "A mismatch or lack of agreement (e.g., words say one thing, body says another)."
            },
            {
              id: "q_w10_p4_5",
              type: "detail",
              text: "What example does the author use to disprove the universal application of the rule?",
              options: [
                "Ordering pizza.",
                "Giving directions to the airport or explaining a nuclear reactor.",
                "Singing a song.",
                "Writing a poem."
              ],
              correctAnswer: "Giving directions to the airport or explaining a nuclear reactor."
            },
            {
              id: "q_w10_p4_6",
              type: "inference",
              text: "What is the danger of believing the myth too strongly?",
              options: [
                "You might get lost.",
                "You might focus too much on 'power poses'/presentation and neglect the actual substance/logic of your message.",
                "You will look silly.",
                "You will talk too loudly."
              ],
              correctAnswer: "You might focus too much on 'power poses'/presentation and neglect the actual substance/logic of your message."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Ambiguity", definition: "A situation where a statement or action can be interpreted in more than one way." },
        { word: "Projection", definition: "The unconscious act of ascribing one's own feelings or states of mind to others." },
        { word: "Nuance", definition: "A subtle difference in or shade of meaning, expression, or sound." },
        { word: "Context", definition: "The circumstances that form the setting for an event or statement and in terms of which it can be fully understood." },
        { word: "Hospitality", definition: "The friendly and generous reception and entertainment of guests, visitors, or strangers." }
      ]
    };
  }

  // Week 11: Mixed IC difficulty
  if (weekNum === 11) {
    return {
      id: 11,
      title: "The Lens of Time",
      theme: "History",
      mainIdeaHint: "Compare how we value the past. Is it about the object, or the memory attached to it?",
      passages: [
        {
          passage: {
            title: "The Time Capsule",
            wordCount: 510,
            content: `
              <p>When the massive oak tree in the town square was struck by lightning, shattering its trunk, the town council decided it had to come down. Beneath its gnarled roots, workers discovered a rusted metal box: a time capsule from 1950. The town buzzed with excitement. Mayor Higgins, sensing a PR opportunity, announced a public opening ceremony for the following Saturday.</p>
              <p>"It will be a window into the souls of our ancestors," the Mayor declared to the local news crew.</p>
              <p>Leo, a high school history student with a cynical streak, was skeptical. "It's probably just old newspapers and some bottle caps," he told his grandmother, Nana Rose, as they walked to the square. "People always think they're leaving something profound, but it's usually just junk."</p>
              <p>"Don't be so quick to judge," Nana Rose scolded gently, leaning on her cane. "People put what mattered to them in there. Value isn't always about money or fame."</p>
              <p>The square was packed. When the box was finally pried open with a loud *creak*, the crowd leaned in, phone cameras ready. The Mayor reached in with gloved hands. But inside, there were no profound letters to the future, no gold coins, no headlines about world peace.</p>
              <p>There was a handwritten recipe for apple pie, stained with grease. There was a report card with straight Cs. There was a broken toy soldier with missing paint. and a small, black-and-white photograph of a scruffy dog, stamped "Buster, 1950."</p>
              <p>The crowd quieted, their disappointment palpable. Someone near the front laughed. "That's it? A bad report card and a dead dog?"</p>
              <p>Leo felt a smirk forming, ready to say *I told you so*. But then he felt Nana Rose tremble beside him. He looked down and saw her wiping a tear from her cheek.</p>
              <p>"That was my brother's dog," she whispered, her voice shaking. "Tommy put that picture in. He died in the war the next year. He loved that dog more than anything in the world. And that report card... he was so proud because he finally passed math."</p>
              <p>Leo froze. He looked at the objects again. Suddenly, they transformed. They weren't just random trash; they were emotional anchors. The report card wasn't about grades; it was about a child's struggle and victory. The recipe wasn't about food; it was about Sunday dinners and a mother's love. The broken soldier wasn't a toy; it was a treasure.</p>
              <p>"We expected a history book," Leo realized aloud, his cynicism evaporating, "but we got a heartbeat."</p>
              <p>He understood then that history isn't just dates, battles, and famous speeches. It is the accumulation of ordinary, fragile moments that people try desperately to save from the erasing flow of time. The capsule wasn't a disappointment; it was a perfect mirror of what it means to be human: holding onto the small things when everything else fades.</p>
            `,
            underlinedSentence: "But "
          },
          questions: [
            {
              id: "q_w11_p1_1",
              type: "detail",
              text: "Which title best captures the theme of the passage?",
              options: [
                "The Lightning Strike",
                "The Disappointing Box",
                "The Time Capsule: History’s Heartbeat",
                "Buster the Dog"
              ],
              correctAnswer: "The Time Capsule: History’s Heartbeat"
            },
            {
              id: "q_w11_p1_2",
              type: "detail",
              text: "Why was the crowd initially disappointed?",
              options: [
                "The box was empty.",
                "The objects seemed mundane and trivial (a recipe, a broken toy) rather than grand or valuable.",
                "The Mayor gave a bad speech.",
                "It started raining."
              ],
              correctAnswer: "The objects seemed mundane and trivial (a recipe, a broken toy) rather than grand or valuable."
            },
            {
              id: "q_w11_p1_3",
              type: "detail",
              text: "What changed Leo’s perspective?",
              options: [
                "He found a gold coin.",
                "His grandmother's emotional reaction revealed the deep personal significance behind the 'junk.'",
                "The Mayor explained the items.",
                "He read the newspaper."
              ],
              correctAnswer: "His grandmother's emotional reaction revealed the deep personal significance behind the 'junk.'"
            },
            {
              id: "q_w11_p1_4",
              type: "inference",
              text: "What does the 'broken toy soldier' likely represent?",
              options: [
                "A careless child.",
                "The reality of war.",
                "A cherished personal possession, flawed but meaningful to its owner.",
                "Poor manufacturing in 1950."
              ],
              correctAnswer: "A cherished personal possession, flawed but meaningful to its owner."
            },
            {
              id: "q_w11_p1_5",
              type: "detail",
              text: "How does the passage define 'history' in the conclusion?",
              options: [
                "A series of dates and battles.",
                "The accumulation of ordinary, fragile moments and personal memories.",
                "A waste of time.",
                "Something written by mayors."
              ],
              correctAnswer: "The accumulation of ordinary, fragile moments and personal memories."
            },
            {
              id: "q_w11_p1_6",
              type: "vocab",
              text: "What is the 'erasing flow of time'?",
              options: [
                "A river near the town.",
                "A metaphor for how time naturally causes memories and physical objects to decay or be forgotten.",
                "A cleaning product.",
                "The lightning storm."
              ],
              correctAnswer: "A metaphor for how time naturally causes memories and physical objects to decay or be forgotten."
            },
            {
              id: "q_w11_p1_7",
              type: "detail", // Using detail for pronoun reference
              text: "In the sentence 'He died in the war the next year,' who does 'He' refer to?",
              options: [
                "Buster the dog.",
                "Mayor Higgins.",
                "Nana Rose's brother, Tommy.",
                "Leo."
              ],
              correctAnswer: "Nana Rose's brother, Tommy."
            },
            {
              id: "q_w11_p1_8",
              type: "inference",
              text: "Why did Leo initially think the capsule would be 'junk'?",
              options: [
                "He hates history.",
                "He is cynical and values 'profound' or official history over personal sentiment.",
                "He knew what was in it.",
                "He barely knows his grandmother."
              ],
              correctAnswer: "He is cynical and values 'profound' or official history over personal sentiment."
            }
          ]
        },
        {
          passage: {
            title: "The Restoration Paradox",
            wordCount: 530,
            content: `
              <p>The debate in the museum gallery was hushed but heated. In front of the curators stood "The Weeping Saint," a 17th-century masterpiece darkened by centuries of varnish, soot, and grime. To one side stood Dr. Aris, a chemist armed with a laser cleaner and a microscope. To the other stood Elias, an art historian who frowned at the equipment.</p>
              <p>"We have the technology to return it to the artist's original vision," Dr. Aris argued, pointing to a small test patch on the canvas where the blue robe shone with brilliant, electric intensity. "Look at that color! Why should we view the painting through a dirty window? We owe it to the artist to reveal the truth."</p>
              <p>"But what is the truth?" Elias countered, his voice tight. "The artist painted this to be seen by flickering candlelight, not bright LED gallery spots. And the 'dirt' you want to scrub away includes the glazes of previous restorers, the candle smoke from the church where it hung for years. That **patina** is the visual evidence of its survival. It is the painting's history."</p>
              <p>The Director of the museum looked back and forth between them. The saint's face was currently shadowy and tragic, veiled in a golden-brown haze. Dr. Aris's test patch, while bright, looked almost cartoonish in comparison.</p>
              <p>"If you strip the layers," Elias warned, "you don't get the original. You get a sterile ghost. You erase the passage of time. The painting becomes a shiny new object that just happens to be old."</p>
              <p>"And if we leave it," Dr. Aris shot back, "we let the decay win. We are letting the painting slowly die under a shroud of filth. In fifty years, it will be black. Is that respecting the history?"</p>
              <p>Elias pointed to the test patch. "But look at the blue. It’s too bright. It destroys the **chiaroscuro**—the balance of light and dark. The artist might have intended for the varnish to yellow over time to soften the edges. We don't know. By 'cleaning' it, we are imposing our modern aesthetic of brightness onto a 17th-century object."</p>
              <p>"We are not imposing," Aris insisted. "We are revealing."</p>
              <p>"We are choosing," the Director corrected, speaking for the first time. She realized there was no neutral choice. To clean it was to intervene, to alter the object based on a guess about the past. To leave it was to neglect it, allowing time to obscure the image.</p>
              <p>"Authenticity," she said slowly, "is not a fixed point in the past. It is a negotiation between the object, its history, and the present viewer." She looked at the Weeping Saint. "We will clean it," she decided, "but only halfway. We will leave the varnish in the shadows. We will let it be both old and new."</p>
            `,
            underlinedSentence: "Authenticity, she understood, was not a fixed point in the past, but a negotiation between the object, its history, and the present viewer."
          },
          questions: [
            {
              id: "q_w11_p2_1",
              type: "detail",
              text: "What is the central philosophical conflict of the passage?",
              options: [
                "Which chemical to use.",
                "Whether to restore a painting to its 'original' bright state vs. preserving the visible history (patina) of its age.",
                "How much the painting is worth.",
                "Who painted 'The Weeping Saint.'"
              ],
              correctAnswer: "Whether to restore a painting to its 'original' bright state vs. preserving the visible history (patina) of its age."
            },
            {
              id: "q_w11_p2_2",
              type: "detail",
              text: "What does Dr. Aris mean by 'view the painting through a dirty window'?",
              options: [
                "The gallery has dirty windows.",
                "The accumulated varnish and soot obscure the original colors and intent of the artist.",
                "He needs glasses.",
                "The painting is behind glass."
              ],
              correctAnswer: "The accumulated varnish and soot obscure the original colors and intent of the artist."
            },
            {
              id: "q_w11_p2_3",
              type: "detail",
              text: "Why does Elias call the restored version a 'sterile ghost'?",
              options: [
                "It looks scary.",
                "He believes stripping the history removes the painting's character and organic life, leaving something artificial.",
                "The saint looks like a ghost.",
                "He dislikes the color blue."
              ],
              correctAnswer: "He believes stripping the history removes the painting's character and organic life, leaving something artificial."
            },
            {
              id: "q_w11_p2_4",
              type: "vocab",
              text: "What is *patina*, as described by Elias?",
              options: [
                "A type of paint.",
                "The visual evidence of the painting's history (smoke, old glaze, age) that gives it character.",
                "The artist's name.",
                "A laser tool."
              ],
              correctAnswer: "The visual evidence of the painting's history (smoke, old glaze, age) that gives it character."
            },
            {
              id: "q_w11_p2_5",
              type: "inference",
              text: "Why does the Director decide to clean it 'only halfway'?",
              options: [
                "To save money.",
                "To reach a compromise that acknowledges both the original color and the historical age of the object.",
                "She didn't like Dr. Aris.",
                "She ran out of time."
              ],
              correctAnswer: "To reach a compromise that acknowledges both the original color and the historical age of the object."
            },
            {
              id: "q_w11_p2_6",
              type: "detail",
              text: "What argument does Dr. Aris make about *not* cleaning the painting?",
              options: [
                "It saves time.",
                "It lets 'decay win' and allows the painting to eventually become invisible (black) under the filth.",
                "It is better for the canvas.",
                "Tourists prefer dirty paintings."
              ],
              correctAnswer: "It lets 'decay win' and allows the painting to eventually become invisible (black) under the filth."
            },
            {
              id: "q_w11_p2_7",
              type: "detail", // Using detail for pronoun reference
              text: "In the sentence 'It is a negotiation between the object, its history, and the present viewer,' what does 'It' refer to?",
              options: [
                "The painting.",
                "Authenticity.",
                "The Director.",
                "The laser."
              ],
              correctAnswer: "Authenticity."
            },
            {
              id: "q_w11_p2_8",
              type: "inference",
              text: "What does the term 'chiaroscuro' refer to in the context of Elias's argument?",
              options: [
                "The chemical composition of the paint.",
                "The artistic balance/contrast of light and dark, which might be ruined by over-cleaning.",
                "The name of the artist.",
                "The price of the restoration."
              ],
              correctAnswer: "The artistic balance/contrast of light and dark, which might be ruined by over-cleaning."
            }
          ]
        },
        {
          passage: {
            title: "The Ethics of Archaeology",
            wordCount: 515,
            content: `
              <p>For centuries, archaeology was driven by a spirit of discovery that closely resembled treasure hunting. Explorers from Western nations traveled to Egypt, Greece, and Mesopotamia, excavating ancient sites and bringing the most spectacular finds back to museums in London, Paris, and Berlin. At the time, this was framed as "preservation"—saving fragile artifacts from neglect or destruction in their home countries. The "Elgin Marbles," taken from the Parthenon in Athens to the British Museum in the early 19th century, are the most famous example of this practice.</p>
              <p>Today, however, the ethics of archaeology have shifted. This "finders keepers" mentality is increasingly viewed as a form of cultural theft, a remnant of colonialism. Nations like Greece, Egypt, and Nigeria are demanding the **repatriation** (return) of their cultural heritage. They argue that these objects are not just art; they are vital pieces of their national identity that were taken without consent. A statue of a pharaoh or a bronze plaque from Benin, they insist, belongs in the context of the culture that created it, not in a glass case thousands of miles away.</p>
              <p>Museums resist these demands, citing their role as "universal" institutions. They argue that by housing art from all over the world in one place, they allow millions of international visitors to see the interconnectedness of human history. They also raise concerns about the safety and facilities in source countries, warning that returning artifacts might put them at risk of damage or theft. They propose "shared heritage" models, where objects are loaned rather than permanently returned.</p>
              <p>This debate touches on a fundamental question: Who owns the past? Is human history a collective resource that belongs to everyone, or does it belong specifically to the modern descendants of the creators? There is no easy answer. While the legal ownership might be debated in courts, the moral argument is gaining ground: that a culture has a right to its own history, and that the "universal" museum often privileges the perspective of the collector over the creator.</p>
            `,
            underlinedSentence: "While the legal ownership might be debated in courts, the moral argument is gaining ground: that a culture has a right to its own history."
          },
          questions: [
            {
              id: "q_w11_p3_1",
              type: "detail",
              text: "How was archaeology historically framed by Western explorers?",
              options: [
                "As a way to make money.",
                "As 'preservation'—saving fragile artifacts from neglect or destruction.",
                "As a military operation.",
                "As a hobby."
              ],
              correctAnswer: "As 'preservation'—saving fragile artifacts from neglect or destruction."
            },
            {
              id: "q_w11_p3_2",
              type: "detail",
              text: "What is the main argument for 'repatriation'?",
              options: [
                "Museums are too crowded.",
                "Objects are vital pieces of national identity taken without consent and belong in their original cultural context.",
                "Shipping costs are low.",
                "The objects are fake."
              ],
              correctAnswer: "Objects are vital pieces of national identity taken without consent and belong in their original cultural context."
            },
            {
              id: "q_w11_p3_3",
              type: "inference",
              text: "Why do 'universal' museums resist returning artifacts?",
              options: [
                "They hate travel.",
                "They believe housing global art in one place serves a higher educational purpose and fear for the safety of the artifacts.",
                "They want to sell them.",
                "They lost the receipts."
              ],
              correctAnswer: "They believe housing global art in one place serves a higher educational purpose and fear for the safety of the artifacts."
            },
            {
              id: "q_w11_p3_4",
              type: "vocab",
              text: "In the sentence 'a remnant of colonialism,' what does 'remnant' mean?",
              options: [
                "A new beginning.",
                "A small remaining quantity of something.",
                "A type of fabric.",
                "A law."
              ],
              correctAnswer: "A small remaining quantity of something."
            },
            {
              id: "q_w11_p3_5",
              type: "detail",
              text: "What famous example of disputed artifacts is mentioned in the text?",
              options: [
                "The Mona Lisa.",
                "The Elgin Marbles (Parthenon Sculptures).",
                "The Magna Carta.",
                "The Hope Diamond."
              ],
              correctAnswer: "The Elgin Marbles (Parthenon Sculptures)."
            },
            {
              id: "q_w11_p3_6",
              type: "inference",
              text: "What is the central ethical dilemma presented in the conclusion?",
              options: [
                "Whether to charge admission fees.",
                "Whether history is a collective global resource vs. the specific property of the descendants of the creators.",
                "Which museum is the biggest.",
                "How to clean statues."
              ],
              correctAnswer: "Whether history is a collective global resource vs. the specific property of the descendants of the creators."
            }
          ]
        },
        {
          passage: {
            title: "Collective Memory",
            wordCount: 520,
            content: `
              <p>We often think of history as a fixed record of facts: dates, battles, and kings. We assume that if we read a textbook, we are learning "what happened." However, sociologists distinguish between "history" (the academic study of the past) and "collective memory" (how a group *remembers* the past). While history aims for objectivity, collective memory is inherently subjective. It is a story that a society tells itself to build a shared identity.</p>
              <p>Collective memory is selective. Just as an individual might repress a traumatic childhood memory, nations often "forget" the darker chapters of their past while celebrating the heroic ones. Statues are erected to victors, not losers. National holidays celebrate independence or revolution, reinforcing a specific narrative of struggle and triumph. This selective remembering creates social cohesion—it helps people feel like they belong to a single "us"—but it often comes at the cost of the truth.</p>
              <p>Ideally, memory is dynamic. It changes as the values of the present change. A figure considered a hero in 1900 might be re-evaluated as a villain in 2020 as societal views on human rights evolve. This re-evaluation is often painful. When protesters topple a statue, they are not erasing history; they are challenging the collective memory. They are arguing that the specific "story" the statue represents no longer aligns with the values of the community.</p>
              <p>The danger arises when collective memory completely overrides historical fact. When political leaders manipulate memory to fuel nationalism or hatred—claiming "We have always been the victims" or "Our past was perfect"—they turn history into a weapon. A healthy society must constantly negotiate the gap between history and memory, acknowledging that while we need stories to bind us together, we need the cold, hard facts to keep us honest.</p>
            `,
            underlinedSentence: "When protesters topple a statue, they are not erasing history; they are challenging the collective memory."
          },
          questions: [
            {
              id: "q_w11_p4_1",
              type: "detail",
              text: "How does the passage distinguish between 'history' and 'collective memory'?",
              options: [
                "History is boring; memory is fun.",
                "History aims for objectivity (facts); collective memory is subjective (stories for identity).",
                "History is oral; memory is written.",
                "There is no difference."
              ],
              correctAnswer: "History aims for objectivity (facts); collective memory is subjective (stories for identity)."
            },
            {
              id: "q_w11_p4_2",
              type: "detail",
              text: "Why is collective memory described as 'selective'?",
              options: [
                "People have bad memories.",
                "Nations choose to remember heroic chapters and 'forget' darker ones to build cohesion.",
                "History books are too short.",
                "It only focuses on recent events."
              ],
              correctAnswer: "Nations choose to remember heroic chapters and 'forget' darker ones to build cohesion."
            },
            {
              id: "q_w11_p4_3",
              type: "inference",
              text: "What does the author imply about the act of toppling a statue?",
              options: [
                "It is simple vandalism.",
                "It is an act of 'challenging collective memory'—signaling that current values no longer align with the story the statue tells.",
                "It erases history forever.",
                "It creates more gravity."
              ],
              correctAnswer: "It is an act of 'challenging collective memory'—signaling that current values no longer align with the story the statue tells."
            },
            {
              id: "q_w11_p4_4",
              type: "vocab",
              text: "In the sentence 'It is inherent subjective,' what does 'subjective' mean?",
              options: [
                "Based on facts.",
                "Based on or influenced by personal feelings, tastes, or opinions.",
                "Scientific.",
                "Universal."
              ],
              correctAnswer: "Based on or influenced by personal feelings, tastes, or opinions."
            },
            {
              id: "q_w11_p4_5",
              type: "detail",
              text: "What creates social cohesion according to the text?",
              options: [
                "Everyone eating the same food.",
                "The 'selective remembering' of a shared narrative (struggle/triumph).",
                "Strict laws.",
                "Free internet."
              ],
              correctAnswer: "The 'selective remembering' of a shared narrative (struggle/triumph)."
            },
            {
              id: "q_w11_p4_6",
              type: "inference",
              text: "What constitutes a 'healthy society' regarding this topic?",
              options: [
                "One that forgets the past.",
                "One that negotiates the gap between history (facts) and memory (stories), using facts to keep the stories honest.",
                "One with many statues.",
                "One with no history books."
              ],
              correctAnswer: "One that negotiates the gap between history (facts) and memory (stories), using facts to keep the stories honest."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Patina", definition: "A film that forms on metal or other materials over a long period due to oxidation or wear." },
        { word: "Restoration", definition: "The action of returning something to a former owner, place, or condition." },
        { word: "Authenticity", definition: "The quality of being authentic; genuineness." },
        { word: "Cynical", definition: "Believing that people are motivated by self-interest; distrustful of human sincerity or integrity." },
        { word: "Chiaroscuro", definition: "The treatment of light and shade in drawing and painting." }
      ]
    };
  }

  // Week 12: Full IC Level (Exam Simulation)
  if (weekNum === 12) {
    return {
      id: 12,
      title: "Real-World Challenges",
      theme: "Society",
      mainIdeaHint: "Focus on how individuals navigate complex systems (bureaucracy, economics) to achieve practical goals.",
      passages: [
        {
          passage: {
            title: "The Community Garden",
            wordCount: 500,
            content: `
              <p>The vacant lot on the corner of Elm Street and 4th Avenue had been an eyesore for as long as anyone in the neighborhood could remember. Overgrown with weeds and littered with plastic bottles, it was a space that people hurried past, avoiding eye contact with the neglect. For Leo, however, the lot represented potential. As a high school junior needing a community service project, he saw not a dumping ground, but a future community garden—a green space where residents could grow their own vegetables and connect with one another.</p>
              <p>Leo’s initial proposal to the neighborhood council was met with skepticism. Mr. Henderson, the council president, adjusted his glasses and pointed to a thick binder of regulations. "It’s not just about planting seeds, Leo," he explained patiently. "You strictly need liability insurance, a water source agreement, and a long-term maintenance plan. Three groups have tried to clean up that lot in the last decade. All of them failed because they ran out of money or interest after the first summer."</p>
              <p>Discouraged but not defeated, Leo decided to change his approach. Instead of promising a complete transformation overnight, he focused on building a team. He contacted the local gardening club and secured a commitment for soil donations. He spoke with Mrs. Gable, a retired lawyer living down the street, who agreed to help him navigate the legal paperwork for free. Most importantly, he went door-to-door, asking residents not for money, but for time. He asked them to commit to just two hours of work per month.</p>
              <p>The breakthrough came when Leo presented his revised plan at the next meeting. He didn't just show drawings of flowers; he placed a signed petition and a volunteer roster with fifty names on Mr. Henderson’s desk. He also presented a partnership letter from a nearby hardware store, promising free tools in exchange for a small sponsorship sign. The council’s skepticism turned into cautious approval. They granted him a probationary permit: six months to prove the project was sustainable.</p>
              <p>The first workday was chaotic. The soil was harder than expected, and they discovered buried rubble that broke two shovels. Yet, as the sun set, the lot was clear of trash for the first time in years. Neighbors who had lived on the same street for a decade introduced themselves to each other over bags of mulch. By mid-summer, the first tomatoes were ripening, but the real harvest was the renewed sense of community. The garden had become a meeting place, a neutral ground where the only thing that mattered was the collective effort to make something grow.</p>
              <p>This experience taught Leo that vision alone is not enough to create change. Real progress requires logistics, coalition-building, and the humility to ask for help. A good idea can inspire people, but it is the boring, practical work of organizing that allows that idea to take root and survive.</p>
            `,
            underlinedSentence: "A good idea can inspire people, but it is the boring, practical work of organizing that allows that idea to take root and survive."
          },
          questions: [
            {
              id: "q_w12_p1_1",
              type: "detail",
              text: "Which title best fits this passage?",
              options: [
                "Mr. Henderson’s Rules",
                "The Empty Lot",
                "Gardening for Beginners",
                "From Vision to Reality"
              ],
              correctAnswer: "From Vision to Reality"
            },
            {
              id: "q_w12_p1_2",
              type: "detail",
              text: "Why did Mr. Henderson initially reject Leo’s proposal?",
              options: [
                "He disliked Leo personally.",
                "The city had already sold the lot to a developer.",
                "Previous groups had failed due to a lack of long-term planning and resources.",
                "He believed a garden would attract too many insects."
              ],
              correctAnswer: "Previous groups had failed due to a lack of long-term planning and resources."
            },
            {
              id: "q_w12_p1_3",
              type: "detail",
              text: "What specific role did Mrs. Gable play in the project?",
              options: [
                "She donated money for the liability insurance.",
                "She helped Leo with the legal paperwork.",
                "She provided the water source agreement.",
                "She organized the volunteer roster."
              ],
              correctAnswer: "She helped Leo with the legal paperwork."
            },
            {
              id: "q_w12_p1_4",
              type: "detail",
              text: "What challenge did the volunteers face during the first workday?",
              options: [
                "No one showed up to help.",
                "The hardware store refused to provide the tools.",
                "Mr. Henderson tried to shut down the project.",
                "The soil was hard and contained buried rubble that broke shovels."
              ],
              correctAnswer: "The soil was hard and contained buried rubble that broke shovels."
            },
            {
              id: "q_w12_p1_5",
              type: "inference",
              text: "Based on the passage, why did the neighborhood council likely change their minds and grant the permit?",
              options: [
                "They were afraid Leo would sue them if they said no.",
                "Leo proved he had the community support and resources to make the project last.",
                "Mr. Henderson realized he needed fresh vegetables.",
                "The hardware store threatened to withdraw their sponsorship."
              ],
              correctAnswer: "Leo proved he had the community support and resources to make the project last."
            },
            {
              id: "q_w12_p1_6",
              type: "inference",
              text: "What does the author imply about the previous groups who tried to clean up the lot?",
              options: [
                "They were not as passionate as Leo.",
                "They likely underestimated the logistical and financial requirements.",
                "They were sabotaged by the neighborhood council.",
                "They did not have access to quality soil."
              ],
              correctAnswer: "They likely underestimated the logistical and financial requirements."
            },
            {
              id: "q_w12_p1_7",
              type: "detail", // Using detail for pronoun reference as per current type system
              text: "In the second paragraph, what does the word 'them' refer to?",
              options: [
                "The regulations in the binder.",
                "The three groups that previously tried to clean the lot.",
                "The residents of the neighborhood.",
                "The members of the neighborhood council."
              ],
              correctAnswer: "The three groups that previously tried to clean the lot."
            },
            {
              id: "q_w12_p1_8",
              type: "detail",
              text: "What is the primary message of the passage?",
              options: [
                "Growing vegetables is an easy way to save money on groceries.",
                "Neighborhood councils are often too strict and discourage young people.",
                "Successful community projects require detailed planning and collaboration, not just good intentions.",
                "Cleaning up vacant lots is the responsibility of the city government, not residents."
              ],
              correctAnswer: "Successful community projects require detailed planning and collaboration, not just good intentions."
            }
          ]
        },
        {
          passage: {
            title: "The Digital Balance",
            wordCount: 520,
            content: `
              <p>The monthly meeting of the Oak Creek School District Board was usually a quiet affair, attended only by a few teachers and parents. However, this Tuesday, the cafeteria was packed. The agenda item causing such a stir was "Proposal 402," a plan to reallocate sixty percent of the library’s annual budget from physical books to digital e-readers and tablet subscriptions.</p>
              <p>Proponents of the plan, led by Mrs. Alvarez, the district’s technology coordinator, argued that the shift was an economic necessity. "Physical books are fragile, easily lost, and expensive to replace," she stated during her presentation, projecting a graph showing rising publishing costs. "A single digital license can be checked out by hundreds of students over time without wear and tear. Furthermore, these tablets give our students access to updated encyclopedias and research databases that print books simply cannot match. We are preparing them for a digital workforce."</p>
              <p>On the other side of the aisle sat Mr. Halloway, the head librarian, who had managed the collection for thirty years. He acknowledged the utility of digital tools but argued that the proposal ignored the "intangible value" of a physical library. "A library is not just a content delivery system," he countered, holding up a worn copy of a classic novel. "It is a physical space that encourages focus. When a student opens a tablet, they are one click away from distractions, games, and social media. A book offers no such escape. It demands sustained attention, a skill that is rapidly disappearing in our economy of attention."</p>
              <p>The debate quickly moved beyond simple economics to a discussion about how students learn. One parent, an architect, pointed out that reading on a screen affects retention. She cited a study suggesting that people remember less detail when scrolling than when turning pages. Conversely, a student representative argued that carrying a heavy backpack full of textbooks caused back strain, and having all materials on one lightweight device was a health benefit.</p>
              <p>The turning point occurred when the board treasurer, Mr. Chen, asked a practical question. "If we switch to digital, what happens to the students who don't have reliable internet access at home?" The room grew quiet. Mrs. Alvarez admitted that the current plan assumed students could download materials at school, but it didn't fully account for homework gaps. This highlighted a digital divide that the physical library had always bridged simply by being open.</p>
              <p>In the end, the board voted for a compromise. They approved a smaller purchase of tablets for research purposes but maintained the budget for the physical fiction and non-fiction collections. The decision reflected a complex reality: while efficiency and modernization are important, they cannot completely replace the foundational tools of learning. The school would move forward with technology, but not at the expense of equity or deep reading.</p>
            `,
            underlinedSentence: "The school would move forward with technology, but not at the expense of equity or deep reading."
          },
          questions: [
            {
              id: "q_w12_p2_1",
              type: "detail",
              text: "Which title is the most appropriate for this passage?",
              options: [
                "The End of Books",
                "Mrs. Alvarez’s Mistake",
                "The Library Budget Debate",
                "How to Save Money"
              ],
              correctAnswer: "The Library Budget Debate"
            },
            {
              id: "q_w12_p2_2",
              type: "detail",
              text: "According to Mrs. Alvarez, what is one major economic advantage of digital licenses?",
              options: [
                "They are always free for schools.",
                "They can be checked out by many students without physical wear and tear.",
                "They increase the resale value of the library.",
                "They allow the school to fire library staff."
              ],
              correctAnswer: "They can be checked out by many students without physical wear and tear."
            },
            {
              id: "q_w12_p2_3",
              type: "detail",
              text: "What specific concern did Mr. Halloway raise about tablets?",
              options: [
                "They run out of battery too quickly.",
                "They are too heavy for students to carry.",
                "They offer easy access to distractions like games and social media.",
                "They emit harmful blue light."
              ],
              correctAnswer: "They offer easy access to distractions like games and social media."
            },
            {
              id: "q_w12_p2_4",
              type: "detail",
              text: "What issue did Mr. Chen, the treasurer, identify with the full digital switch?",
              options: [
                "The tablets were too expensive to insure.",
                "Students without reliable home internet would be disadvantaged.",
                "The school’s Wi-Fi network was too slow to handle the traffic.",
                "Teachers did not know how to use the new devices."
              ],
              correctAnswer: "Students without reliable home internet would be disadvantaged."
            },
            {
              id: "q_w12_p2_5",
              type: "inference",
              text: "Why did the board likely vote for a compromise instead of the full proposal?",
              options: [
                "They realized that a full digital switch would create inequality for some students.",
                "They wanted to punish Mrs. Alvarez for her aggressive presentation.",
                "Mr. Halloway threatened to quit if they approved the plan.",
                "They ran out of money for the full project."
              ],
              correctAnswer: "They realized that a full digital switch would create inequality for some students."
            },
            {
              id: "q_w12_p2_6",
              type: "inference",
              text: "What does the author imply about the 'economy of attention'?",
              options: [
                "It is a financial system where people pay to focus.",
                "It is a modern condition where sustained focus is a valuable but scarce resource.",
                "It refers to the cost of buying books.",
                "It is a class taught by Mr. Halloway."
              ],
              correctAnswer: "It is a modern condition where sustained focus is a valuable but scarce resource."
            },
            {
              id: "q_w12_p2_7",
              type: "detail",
              text: "In the third paragraph, what does the word 'it' refer to?",
              options: [
                "The digital license.",
                "A library.",
                "The classic novel.",
                "The content delivery system."
              ],
              correctAnswer: "The classic novel."
            },
            {
              id: "q_w12_p2_8",
              type: "detail",
              text: "What is the main conflict described in the passage?",
              options: [
                "A disagreement between students and teachers about homework amounts.",
                "A debate over whether to shift the library budget from physical books to digital resources.",
                "A legal battle between the school district and a tablet manufacturer.",
                "A personal argument between Mrs. Alvarez and Mr. Halloway."
              ],
              correctAnswer: "A debate over whether to shift the library budget from physical books to digital resources."
            }
          ]
        },
        {
          passage: {
            title: "The Free Rider Problem",
            wordCount: 525,
            content: `
              <p>Imagine a small village where everyone relies on a lighthouse to guide their fishing boats safely home at night. The lighthouse costs money to operate—fuel for the lamp, repairs for the structure, and a salary for the keeper. If the village chief asks for voluntary contributions to pay for it, a problem arises. Each fisherman reasons: "If everyone else pays, the lighthouse will be on, and I can use the light whether I pay or not. If no one else pays, my small contribution won't be enough to keep it running anyway."</p>
              <p>This creates a temptation to contribute nothing while still enjoying the benefit. This scenario is known in economics as the **"Free Rider Problem."** It occurs with "public goods"—resources that are **non-excludable** (you can't stop people from using them) and **non-rivalrous** (one person's use doesn't reduce it for others).</p>
              <p>Public radio is a classic modern example. Listeners can tune in without donating during the fund drive. If too many people "free ride," the station runs out of money and shuts down, hurting everyone. Clean air is another: factories might want clean air but refuse to install expensive filters, hoping other factories will do it instead.</p>
              <p>To solve this, societies often move from voluntary systems to mandatory ones. This is why we have taxes. The government compels everyone to pay for roads, defense, and streetlights because if we relied on charity, the temptation to free ride would be too strong. The paradox is that individual rationality (saving your own money) leads to collective irrationality (the collapse of the systems we all need).</p>
            `,
            underlinedSentence: "The paradox is that individual rationality (saving your own money) leads to collective irrationality (the collapse of the systems we all need)."
          },
          questions: [
            {
              id: "q_w12_p3_1",
              type: "detail",
              text: "What is the 'lighthouse' example used to illustrate?",
              options: [
                "The difficulty of fishing at night.",
                "How to build a structure.",
                "The Free Rider Problem.",
                "The history of sailing."
              ],
              correctAnswer: "The Free Rider Problem."
            },
            {
              id: "q_w12_p3_2",
              type: "detail",
              text: "What defines a 'public good' in this context?",
              options: [
                "It is owned by the public.",
                "It is non-excludable (can't stop use) and non-rivalrous (use doesn't deplete it).",
                "It is free.",
                "It is popular."
              ],
              correctAnswer: "It is non-excludable (can't stop use) and non-rivalrous (use doesn't deplete it)."
            },
            {
              id: "q_w12_p3_3",
              type: "inference",
              text: "Why does the author suggest taxes are necessary?",
              options: [
                "To punish people.",
                "Because voluntary contributions often fail due to the Free Rider temptation; taxes force everyone to contribute to necessary public goods.",
                "Governments are greedy.",
                "People like paying them."
              ],
              correctAnswer: "Because voluntary contributions often fail due to the Free Rider temptation; taxes force everyone to contribute to necessary public goods."
            },
            {
              id: "q_w12_p3_4",
              type: "vocab",
              text: "In the sentence 'individual rationality leads to collective irrationality,' what does 'rationality' mean?",
              options: [
                "Madness.",
                "Acting according to logic or reason (in one's own self-interest).",
                "Emotion.",
                "Speed."
              ],
              correctAnswer: "Acting according to logic or reason (in one's own self-interest)."
            },
            {
              id: "q_w12_p3_5",
              type: "detail",
              text: "What happens to the radio station if too many people free ride?",
              options: [
                "It gets more popular.",
                "It runs out of money and shuts down.",
                "It plays better music.",
                "Nothing."
              ],
              correctAnswer: "It runs out of money and shuts down."
            },
            {
              id: "q_w12_p3_6",
              type: "inference",
              text: "Which of the following would NOT be a public good subject to the Free Rider problem?",
              options: [
                "National Defense.",
                "A private sandwich (if you eat it, no one else can).",
                "Street lighting.",
                "Clean air."
              ],
              correctAnswer: "A private sandwich (if you eat it, no one else can)."
            }
          ]
        },
        {
          passage: {
            title: "Gentrification and Urban Dynamics",
            wordCount: 530,
            content: `
              <p>In many major cities, a predictable pattern unfolds. A neglected, low-income neighborhood—often with cheap rent and historic architecture—starts to attract artists and students. They open cafes and galleries, creating a vibrant "bohemian" atmosphere. This cultural capital attracts wealthier professionals, causing property values to rise. Developers arrive, renovating old buildings into luxury condos. Soon, the original residents—often working-class families and minorities—can no longer afford the rent and are forced to leave.</p>
              <p>This process is called **gentrification**. It is a controversial topic because it brings both revitalization and displacement. Proponents argue that it reduces crime, improves schools, and increases tax revenue for the city. They point to the renovated parks and new businesses as signs of progress. To them, a safer neighborhood benefits everyone.</p>
              <p>Critics, however, view it as a form of economic colonization. They argue that the improvements are not *for* the existing community but for the newcomers. When a long-standing family is evicted to make way for a coffee shop they can't afford, the neighborhood loses its history and social fabric. The cultural diversity that made the area attractive in the first place is often erased, replaced by a homogenous landscape of corporate chains and high-income residents.</p>
              <p>Urban planners now struggle to find a middle ground: **"Equitable Development."** This involves policies like rent control, mandatory affordable housing in new developments, and community land trusts. The goal is to allow investment in a neighborhood without displacing the people who call it home. It asks the difficult question: Can we improve a city without leaving its most vulnerable citizens behind?</p>
            `,
            underlinedSentence: "The cultural diversity that made the area attractive in the first place is often erased, replaced by a homogenous landscape of corporate chains and high-income residents."
          },
          questions: [
            {
              id: "q_w12_p4_1",
              type: "detail",
              text: "What is the typical starting point of gentrification described in the passage?",
              options: [
                "Rich people buy everything.",
                "Artists and students move into a neglected, low-income area for cheap rent.",
                "The government builds a mall.",
                "Crime increases."
              ],
              correctAnswer: "Artists and students move into a neglected, low-income area for cheap rent."
            },
            {
              id: "q_w12_p4_2",
              type: "detail",
              text: "What is a main argument *for* gentrification?",
              options: [
                "It raises rent.",
                "It revitalizes areas, reduces crime, and increases tax revenue.",
                "It evicts people.",
                "It closes schools."
              ],
              correctAnswer: "It revitalizes areas, reduces crime, and increases tax revenue."
            },
            {
              id: "q_w12_p4_3",
              type: "inference",
              text: "Why do critics call it 'economic colonization'?",
              options: [
                "Because it comes from another country.",
                "Because wealthier newcomers take over the space and resources, displacing existing residents who can't compete financially.",
                "Because they don't like coffee.",
                "Because it uses colonial architecture."
              ],
              correctAnswer: "Because wealthier newcomers take over the space and resources, displacing existing residents who can't compete financially."
            },
            {
              id: "q_w12_p4_4",
              type: "vocab",
              text: "In the sentence 'replaced by a homogenous landscape,' what does 'homogenous' mean?",
              options: [
                "Diverse.",
                "Of the same kind; alike (lacking variety).",
                "Colorful.",
                "Dangerous."
              ],
              correctAnswer: "Of the same kind; alike (lacking variety)."
            },
            {
              id: "q_w12_p4_5",
              type: "detail",
              text: "What is 'Equitable Development'?",
              options: [
                "Stopping all building.",
                "Strategies (like rent control) to improve neighborhoods without displacing original residents.",
                "Building only luxury condos.",
                "Demolishing old buildings."
              ],
              correctAnswer: "Strategies (like rent control) to improve neighborhoods without displacing original residents."
            },
            {
              id: "q_w12_p4_6",
              type: "inference",
              text: "What irony does the author note about the end result of gentrification?",
              options: [
                "It becomes cheaper.",
                "The cultural diversity/vibe that attracted people is erased by the wealth it brings.",
                "Nobody wants to live there.",
                "It becomes a farm."
              ],
              correctAnswer: "The cultural diversity/vibe that attracted people is erased by the wealth it brings."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Skeptical", definition: "Having doubts or reservations; not easily convinced." },
        { word: "Logistics", definition: "The detailed coordination of a complex operation giving rise to effective organization." },
        { word: "Externality", definition: "A side effect or consequence of an industrial or commercial activity that affects other parties." },
        { word: "Intangible", definition: "Unable to be touched or grasped; not having physical presence." },
        { word: "Compromise", definition: "An agreement reached by each side making concessions." },
        { word: "Equity", definition: "The quality of being fair and impartial." }
      ]
    };
  }

  // Week 13: Animal Rights (Ethics)
  if (weekNum === 13) {
    return {
      id: 13,
      title: "Beyond Human",
      theme: "Ethics",
      mainIdeaHint: "Expand the 'moral circle'. Does a being need to be human to have rights?",
      passages: [
        {
          passage: {
            title: "Breaking the Binary: Non-Human Personhood",
            wordCount: 296,
            content: `
              <p>For centuries, the law has had two categories: "persons," who have rights, and "things," which are property. Humans are persons; everything else—from a toaster to a chimp—is property. This allows us to own and use animals. However, a new legal movement argues that some highly intelligent animals deserve a new status: **"Non-Human Personhood."**</p>
              <p>This argument is based on science. Research on **"Great Apes"** shows they are not so different from us. They have self-awareness, memory, and empathy. The famous "mirror test," where an animal recognizes itself, proves they have a sense of self. <u>If these beings have a conscious experience of life—if they can suffer, plan, and remember—advocates argue it is morally indefensible to treat them as mere objects to be caged or owned.</u></p>
              <p>This fight is now in the courtroom. The **Nonhuman Rights Project** has filed cases for chimpanzees and elephants in zoos. In the case of **Happy the Elephant**, lawyers argued that her solitary confinement violated her right to liberty. Although they lost in 2022, the judges admitted that the legal meaning of "person" might need to change as science evolves.</p>
              <p>Critics warn of a **"Slippery Slope"**: if we give rights to an elephant, will cows or insects be next? Will farming end? Supporters say the goal is not to give a chimp the right to vote, but just the right *not* to be imprisoned. They see this as expanding our "moral circle," which has slowly grown to include all humans.</p>
            `,
            underlinedSentence: "If these beings have a conscious experience of life—if they can suffer, plan, and remember—advocates argue it is morally indefensible to treat them as mere objects to be caged or owned."
          },
          questions: [
            { id: "q_w13_1", type: "inference", text: "What is the author’s primary purpose?" },
            { id: "q_w13_2", type: "detail", text: "What is the 'binary' mentioned in the text?" },
            { id: "q_w13_3", type: "vocab", text: "What is 'Habeas Corpus'?", options: ["A dead body", "The right to challenge detention", "Animal food", "A scientific theory"] },
            { id: "q_w13_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "Culture in the Deep: The Cetacean Mind",
            wordCount: 290,
            content: `
              <p>For a long time, we thought **"Culture"**—passing knowledge through teaching—was unique to humans. However, scientists studying whales and dolphins have found that the ocean is full of complex cultures. These underwater societies have their own languages, hunting methods, and rules.</p>
              <p>Consider the orca (killer whale). Orca groups in the Pacific Northwest live in tight families led by **"Matriarchs."** Each group speaks a unique "dialect" of clicks that other groups can't understand. They also eat different things; some eat only salmon, while others hunt seals. This is **"Cultural Transmission."** If you moved a baby orca to a different group, it wouldn't know how to hunt. <u>Just as a human child learns to use a fork or speak Spanish from their parents, a young whale learns the critical skills of survival and social etiquette from its elders.</u></p>
              <p>Sperm whales also have culture. They live in clans with their own **"Codas"**—rhythmic clicking patterns used to talk. Different clans have different codas, like a badge of identity. When two clans meet, they usually don't mix, preferring to stay with their own "cultural group," just like humans do.</p>
              <p>This means that losing a group of whales is not just a loss of animals, but the extinction of a unique culture—a language and history that can never be recovered. Saving species means saving their cultures too.</p>
            `,
            underlinedSentence: "Just as a human child learns to use a fork or speak Spanish from their parents, a young whale learns the critical skills of survival and social etiquette from its elders."
          },
          questions: [
            { id: "q_w13_p2_1", type: "detail", text: "What distinguishes resident orca pods from transient ones?" },
            { id: "q_w13_p2_2", type: "inference", text: "Why does the author discuss 'Codas'?" },
            { id: "q_w13_p2_3", type: "vocab", text: "What is 'Cultural Transmission'?", options: ["Spreading disease", "Passing knowledge via teaching", "Genetic inheritance", "Radio signals"] },
            { id: "q_w13_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ]
    };
  }

  // Week 14: Social Algorithms (Media)
  if (weekNum === 14) {
    return {
      id: 14,
      title: "The Echo Chamber Effect",
      theme: "Media",
      mainIdeaHint: "Analyze how personalization creates polarization. Is the algorithm showing you the world, or a mirror?",
      passages: [
        {
          passage: {
            title: "Fragmentation of Reality: The Filter Bubble",
            wordCount: 510,
            content: `
              <p>In the early days of the internet, we thought connecting the world would bring peace. We believed that seeing different views would end prejudice. But today, it seems to be the opposite. Social media platforms, driven by **"Engagement Algorithms,"** haven't united us; they have split us into **"Filter Bubbles."**</p>
              <p>The problem is the **"Attention Economy."** Apps like TikTok and YouTube make money by selling your time to advertisers. To keep you watching, algorithms study what you like and show you more of it. This creates **"Confirmation Bias"** on a huge scale. You only see posts that agree with you. If you are on the left, you never see good arguments from the right, and vice versa. This makes the "other side" seem crazy or invisible.</p>
              <p>This hurts democracy. When we don't share the same facts, we can't debate. Disagreement turns into **"Polarization,"** where we see opponents as enemies. Also, algorithms prefer content that makes people angry or scared because that gets the most clicks. This encourages people to be extreme.</p>
              <p>Some say platforms just reflect what we want. <u>However, whistleblowers contend that the design of these systems actively amplifies our worst impulses, prioritizing profit over social cohesion by hacking our psychological vulnerabilities.</u> The question is: should these algorithms be regulated like newspapers?</p>
            `,
            underlinedSentence: "However, whistleblowers contend that the design of these systems actively amplifies our worst impulses, prioritizing profit over social cohesion by hacking our psychological vulnerabilities."
          },
          questions: [
            { id: "q_w14_1", type: "inference", text: "What is the primary function of an 'Engagement Algorithm'?" },
            { id: "q_w14_2", type: "detail", text: "How does the 'Attention Economy' work?" },
            { id: "q_w14_3", type: "vocab", text: "What is a 'Filter Bubble'?", options: ["A soap bubble", "An isolated intellectual environment", "A computer virus", "A type of camera lens"] },
            { id: "q_w14_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "Hacking the Brain: Persuasive Design",
            wordCount: 480,
            content: `
              <p>Have you ever checked your phone for a minute and realized an hour passed? This isn't your fault; it's by design. Tech companies hire psychologists to hack your brain's **"Dopamine Reward System."** This is called **"Persuasive Design,"** and it treats your attention as a product to be mined, using tricks from gambling.</p>
              <p>One tool is the **"Variable Reward Schedule."** This idea says that unpredictable rewards are the most addictive. When you refresh your feed, you don't know what you'll get—a like, a funny video, or nothing. This surprise releases dopamine, making you want to do it again, like a slot machine. Also, the **"Infinite Scroll"** means there is no stopping point, so you keep watching without thinking.</p>
              <p>This constant connection is harmful. Studies show social media is linked to anxiety, depression, and poor sleep, especially in teens. Constantly comparing yourself to others' "highlight reels" makes you feel inadequate. Also, it ruins our ability to focus heavily.</p>
              <p><u>In response, a 'Digital Wellness' movement is emerging, arguing that we must redesign technology to respect human autonomy rather than exploit it.</u> Experts call for **"Humane Technology"** that respects us. They argue our tools should help us, not control us.</p>
            `,
            underlinedSentence: "In response, a 'Digital Wellness' movement is emerging, arguing that we must redesign technology to respect human autonomy rather than exploit it."
          },
          questions: [
            { id: "q_w14_p2_1", type: "detail", text: "What is 'Persuasive Design'?" },
            { id: "q_w14_p2_2", type: "inference", text: "Why is 'Infinite Scroll' effective at keeping users engaged?" },
            { id: "q_w14_p2_3", type: "vocab", text: "What is 'Dopamine'?", options: ["A stress hormone", "A neurotransmitter linked to pleasure", "A computer chip", "A type of battery"] },
            { id: "q_w14_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ]
    };
  }

  // Week 15: Fast Fashion (Global)
  if (weekNum === 15) {
    return {
      id: 15,
      title: "The True Cost of a T-Shirt",
      theme: "Global",
      mainIdeaHint: "Look beyond the price tag. Who pays the hidden costs of cheap clothing?",
      passages: [
        {
          passage: {
            title: "Fast Fashion: The Economics of Waste",
            wordCount: 510,
            content: `
              <p>Walk into a modern clothing retailer, and you are greeted by an overwhelming abundance of choices: trendy t-shirts, designer-inspired dresses, and seasonal accessories, all priced cheaper than a lunch sandwich. This phenomenon is known as **"Fast Fashion,"** a business model that prioritizes rapid production and low costs to deliver the latest runway trends to the mass market instantly. Unlike the traditional fashion cycle, which operated on two or four seasons a year, fast fashion brands now operate on 52 "micro-seasons," dropping new inventory weekly. However, this hyper-speed cycle relies heavily on **"Planned Obsolescence."** Garments are intentionally designed to be fragile—using low-quality fabrics and weak stitching—so that they lose shape or tear after just a few washes. This strategy forces consumers to constantly discard and replace their clothing, treating textiles as disposable goods rather than durable investments.</p>
              <p>The environmental toll of this disposable culture is staggering. The fashion industry is responsible for approximately 10% of global carbon emissions, which is more than all international flights and maritime shipping combined. Producing a single pair of jeans requires around 7,500 liters of water—enough for one person to drink for seven years. Furthermore, the dyeing and finishing of textiles creates massive pollution. In manufacturing hubs like Bangladesh and India, untreated toxic wastewater from factories is often dumped directly into local rivers, turning the water unnatural shades of purple or red. This chemical runoff destroys aquatic ecosystems and poisons the drinking water sources for millions of people, creating a public health crisis.</p>
              <p>The human cost of cheap clothing is equally devastating. To maintain rock-bottom prices, brands put immense pressure on factories to cut costs, which inevitably leads to the exploitation of workers. Millions of garment workers, primarily women in developing nations, toil in unsafe conditions for wages that do not cover basic living expenses. <u>The collapse of the **Rana Plaza** factory in 2013, which killed over a thousand workers in Bangladesh, served as a grim wake-up call to the global community, engaging a spotlight on the deadly 'Race to the Bottom.'</u> Despite this tragedy, systemic issues remain, as workers are often trapped in cycles of poverty while Western corporations report record profits.</p>
              <p>Critics argue that consumers are partly to blame for demanding impossibly cheap goods. However, labor rights advocates insist that the responsibility lies with the corporations. They call for strict laws regarding **"Supply Chain Transparency,"** forcing brands to disclose exactly where and how their products are made. Without such regulation, the "hidden cost" of a five-dollar shirt will continue to be paid by the planet and its most vulnerable workers.</p>
            `,
            underlinedSentence: "The collapse of the Rana Plaza factory in 2013, which killed over a thousand workers in Bangladesh, served as a grim wake-up call to the global community, engaging a spotlight on the deadly 'Race to the Bottom.'"
          },
          questions: [
            { id: "q_w15_1", type: "inference", text: "What is the primary function of 'Planned Obsolescence' in fast fashion?" },
            { id: "q_w15_2", type: "detail", text: "Why do rivers in Bangladesh turn unnatural colors?" },
            { id: "q_w15_3", type: "vocab", text: "What is 'Supply Chain Transparency'?", options: ["See-through clothes", "Knowing exactly how and where a product is made", "Cheaper shipping", "A type of plastic"] },
            { id: "q_w15_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "Closing the Loop: The Circular Economy",
            wordCount: 480,
            content: `
              <p>If the current model of fast fashion is **"Linear"**—a "take-make-waste" system where resources are extracted, used briefly, and then discarded—then the sustainable alternative is to make it **"Circular."** The **"Circular Economy"** aims to design waste out of the system entirely. In nature, there is no landfill; the waste of one organism becomes the food for another. Circular fashion attempts to mimic this biological cycle, keeping materials in use for as long as possible through repair, reuse, and eventually, recycling. The goal is to close the loop, ensuring that an old shirt creates the raw material for a new one, rather than ending up in a trash heap.</p>
              <p>One promising innovation in this field is **"Regenerative Design."** Instead of relying on oil-based synthetic fibers like polyester, which take centuries to decompose, forward-thinking brands are developing textiles from agricultural waste. We now see "leather" made from pineapple leaves, mushrooms, or apple peels. Another major shift is the business model of **"Product-as-a-Service."** Clothing rental apps and subscription boxes allow customers to access high-quality designer wear without owning it effectively sharing the item among many users. This model incentivizes companies to manufacture durable, high-quality garments that can withstand many rentals, reversing the logic of planned obsolescence.</p>
              <p><u>While these technologies are promising, skeptics argue that 'Greenwashing' is rampant in the industry, where brands release small 'sustainable' collections to distract from their overall polluting business models.</u> For example, a brand might launch a line of "organic cotton" t-shirts while simultaneously producing millions of plastic-based items per week. Activists argue that true sustainability cannot coexist with a business model based on infinite growth and overconsumption; simply using better materials is not enough if the volume of production remains unchanged.</p>
              <p>Nevertheless, legislation is beginning to drive change. The European Union is currently drafting ambitious laws to ban the destruction of unsold stock and enforce strict durability standards. This regulatory pressure, combined with changing consumer habits, suggests a future where fashion might finally slow down. Ultimately, a circular economy requires a shift in mindset: valuing the longevity and story of a garment over the fleeting excitement of buying something new.</p>
            `,
            underlinedSentence: "While these technologies are promising, skeptics argue that 'Greenwashing' is rampant in the industry, where brands release small 'sustainable' collections to distract from their overall polluting business models."
          },
          questions: [
            { id: "q_w15_p2_1", type: "detail", text: "What is 'Greenwashing'?" },
            { id: "q_w15_p2_2", type: "inference", text: "How does the 'Product-as-a-Service' model help the environment?" },
            { id: "q_w15_p2_3", type: "vocab", text: "What does 'Linear' mean in this context?", options: ["Straight", "A one-way process of waste", "Recyclable", "Expensive"] },
            { id: "q_w15_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ]
    };
  }

  // Week 16: Montessori vs. Traditional (Education)
  if (weekNum === 16) {
    return {
      id: 16,
      title: "The Classroom Wars",
      theme: "Education",
      mainIdeaHint: "Compare the 'factory' model with the 'garden' model. Which prepares children for the future?",
      passages: [
        {
          passage: {
            title: "The Industrial Classroom vs. The Montessori Mind",
            wordCount: 515,
            content: `
              <p>The design of the traditional American classroom has remained largely unchanged since the late 19th century. Rows of desks facing forward, rigid bells signaling the end of potential flow states, and a teacher delivering information to a silent audience—this system was explicitly modeled after the factory. It was designed to prepare students for industrial labor, where obedience, punctuality, and repetitive tasks were paramount. This educational philosophy relies heavily on **"Behaviorism,"** a theory that uses external rewards (grades, gold stars) and punishments (detention, bad marks) to condition student behavior. While effective for standardization, critics argue that this "industrial model" suppresses creativity and treats children as empty vessels to be passively filled with facts.</p>
              <p>In stark contrast stands the **"Montessori Method,"** developed by Italian physician Dr. Maria Montessori in the early 1900s. She viewed the child not as a worker to be managed, but as a natural scientist driven by curiosity. The core philosophy here is **"Constructivism"**: the idea that learners construct knowledge through experience and interaction with their environment. Walk into a Montessori classroom, and you will not see rows of desks. Instead, you see mixed-age children moving freely, choosing their own activities from specialized materials. The teacher acts as a guide on the side rather than a sage on the stage, observing and facilitating rather than lecturing.</p>
              <p>The long-term impact of this approach can be profound. Many innovators, including the founders of Google (Larry Page and Sergey Brin) and Amazon (Jeff Bezos), credit their Montessori education for their ability to think outside the box. <u>By allowing children to follow their own interests ('intrinsic motivation') rather than chasing grades ('extrinsic motivation'), the method reportedly builds deeper concentration and executive function.</u> Studies suggest that Montessori students often develop superior social skills and a greater ability to adapt to complex, unstructured problems—skills highly valued in the modern information economy.</p>
              <p>However, the method is not without its critics. Many argue that Montessori education is **"Elitist,"** as most certified schools are private and expensive, making this superior pedagogy inaccessible to low-income families. Furthermore, some traditionalists worry that the lack of strict structure does not prepare children for the realities of the conventional workforce, where one must often complete boring tasks on a deadline. The debate reflects a deeper question about the purpose of school: is it to train compliant employees, or to cultivate independent thinkers?</p>
            `,
            underlinedSentence: "By allowing children to follow their own interests ('intrinsic motivation') rather than chasing grades ('extrinsic motivation'), the method reportedly builds deeper concentration and executive function."
          },
          questions: [
            { id: "q_w16_1", type: "inference", text: "Why does the author describe the traditional classroom as inspired by a 'factory'?" },
            { id: "q_w16_2", type: "detail", text: "What is the teacher's role in a Montessori classroom?" },
            { id: "q_w16_3", type: "vocab", text: "What is 'Constructivism'?", options: ["Building houses", "A theory that learners build knowledge through experience", "Strict discipline", "A type of art"] },
            { id: "q_w16_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "Less Is More: The Finnish Miracle",
            wordCount: 490,
            content: `
              <p>In the global race for educational dominance, one country consistently tops the charts by breaking almost every rule in the playbook: Finland. While students in East Asian powerhouses study late into the night and American students struggle with mountains of homework, Finnish children have the shortest school days in the Western world and virtually no homework. They don't start formal schooling until age seven, and play is considered a critical part of the curriculum. This counter-intuitive success story is known as the **"Finnish Paradox"**: the idea that achieving more requires doing less.</p>
              <p>The central pillar of the Finnish system is **"Equity over Excellence."** In many countries, including the US, school quality depends on local property taxes, meaning rich neighborhoods have great schools and poor neighborhoods have failing ones. In Finland, this is illegal. All schools are public and funded equally. Private schools are practically non-existent. This ensures that a child in a remote rural village receives the same high-quality education as a child in downtown Helsinki. Furthermore, Finland rejects **"Accountability via Testing."** There are no standardized tests until the end of high school. They believe that constant testing forces teachers to "teach to the test" rather than encouraging deep learning.</p>
              <p>Instead of testing, Finland focuses on **"Professionalization."** Teaching is viewed as a prestigious, high-status career, on par with medicine or law. All teachers must hold a master's degree, and getting into a teacher training program is as competitive as getting into medical school. Because they are so highly selected and trained, teachers are granted immense **"Pedagogical Autonomy."** The government trusts them to design their own lessons and assess students as they see fit, without bureaucratic interference.</p>
              <p><u>Critics argue that this model is difficult to replicate in larger, more diverse nations, as Finland has a relatively small, homogenous population.</u> What works for a nation of 5.5 million people might struggle in a country of 330 million with deep social inequalities. However, Finland stands as a powerful proof of concept, demonstrating that reducing stress, prioritizing equity, and trusting teachers can lead to world-class educational outcomes.</p>
            `,
            underlinedSentence: "Critics argue that this model is difficult to replicate in larger, more diverse nations, as Finland has a relatively small, homogenous population."
          },
          questions: [
            { id: "q_w16_p2_1", type: "detail", text: "What is the 'Finnish Paradox'?" },
            { id: "q_w16_p2_2", type: "inference", text: "How does Finland ensure equity in education?" },
            { id: "q_w16_p2_3", type: "vocab", text: "What is 'Pedagogical Autonomy'?", options: ["Freedom to teach as one chooses", "Government control", "Student rebellion", "No homework"] },
            { id: "q_w16_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ]
    };
  }

  // Week 17: Universal Basic Income (Ethics)
  if (weekNum === 17) {
    return {
      id: 17,
      title: "Money for Nothing?",
      theme: "Ethics",
      mainIdeaHint: "Evaluate the purpose of simple cash. Is it a handout, or a human right?",
      passages: [
        {
          passage: {
            title: "The End of Work: Automation and UBI",
            wordCount: 505,
            content: `
              <p>For centuries, the fundamental social contract has been simple: you work, you get paid. This adherence to the **"Protestant Work Ethic"**—the cultural belief that hard work is inherently virtuous and idleness is a moral failing—forms the bedrock of modern capitalism. But what happens if the work disappears? As Artificial Intelligence and robotics become increasingly sophisticated, economists are sounding the alarm about **"Technological Unemployment."** We face a future where machines could outperform humans in nearly every sector, from driving trucks to writing legal contracts. In this potential jobless future, many experts are advocating for a **"Universal Basic Income" (UBI).**</p>
              <p>The concept of UBI is radically simple: the government provides every citizen with a regular, unconditional cash payment, regardless of their income or employment status. Supporters argue that this would create a foolproof **"Safety Net,"** eliminating extreme poverty ensuring that everyone can afford food and shelter. Furthermore, it would give workers **"Bargaining Power."** If people are not desperate to survive, they can refuse dangerous or exploitative jobs, forcing employers to improve conditions. Advocates also suggest it would unleash human creativity, freeing people to pursue education, art, or caregiving without the fear of starvation.</p>
              <p><u>This idea challenges the deep-seated cultural anxiety that "free money" breeds laziness, yet pilot programs suggest the opposite.</u> In controlled experiments ranging from Stockton, California to nationwide tests in Finland, researchers found that recipients did not quit the workforce. Instead, the financial stability allowed them to fix broken cars to get to interviews, pay for childcare, or retrain for better careers. The security of a floor under their feet actually helped them stand taller.</p>
              <p>However, feasible implementation faces massive hurdles. Critics point out the astronomical cost; a national UBI in the US would cost trillions of dollars annually, requiring unprecedented tax increases. Additionally, skeptics worry about the **"Free Rider Problem"**: the fear that if too many people opt out of productive work, the economy will collapse, leaving no money to fund the system. The debate forces us to ask a profound question: is paid labor the only source of human dignity and purpose?</p>
            `,
            underlinedSentence: "This idea challenges the deep-seated cultural anxiety that 'free money' breeds laziness, yet pilot programs suggest the opposite."
          },
          questions: [
            { id: "q_w17_1", type: "inference", text: "Why does the author mention 'Protestant Work Ethic'?" },
            { id: "q_w17_2", type: "detail", text: "What did participants in the Stockton and Finland pilot programs do with the money?" },
            { id: "q_w17_3", type: "vocab", text: "What is 'Technological Unemployment'?", options: ["Unemployment caused by lazy workers", "Jobs lost to automation and AI", "A computer virus", "Working in tech"] },
            { id: "q_w17_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "The Alaska Model: Resource Sovereignty",
            wordCount: 480,
            content: `
              <p>Universal Basic Income often sounds like a utopian fantasy, but one US state has been running a version of it for over 40 years. Alaska is unique: it has no state income tax, and instead of taking money from its citizens, it sends them a check. Since 1982, the **"Alaska Permanent Fund"** has distributed an annual dividend—ranging from roughly $1,000 to over $3,000—to every eligible resident. This system is based on the principle of **"Resource Sovereignty"**: the idea that the natural wealth of the land (in this case, oil) belongs collectively to the people, not just to the government or corporations.</p>
              <p>The economic impact of this long-running experiment has been remarkable. Alaska consistently has one of the lowest rates of income inequality in the United States. Contrary to fears that free money would destroy motivation, Alaskans have not stopped working. In fact, the dividend stimulates the local economy through the **"Multiplier Effect."** When families receive their checks, they spend that money at local businesses—buying groceries, fixing homes, or purchasing appliances—which in turn supports local jobs. The fund acts as a vital buffer against poverty, helping families survive harsh winters and save for education.</p>
              <p><u>However, the Alaska model relies entirely on a finite resource: oil.</u> The dividend's value fluctuates wildly with global crude oil prices, and as the world transitions toward green energy, the future of the fund is uncertain. Critics argue that this model is an anomaly that cannot be easily copied by countries without massive natural resources. Funding a UBI in a resource-poor nation like Japan or the UK would require high taxation on income or wealth, which is politically much more difficult than sharing oil profits.</p>
              <p>Nevertheless, the Alaska example provides a powerful case study. It challenges the assumption that life must always be a struggle for survival. It suggests that when a society shares its collective wealth directly with its citizens, it fosters a stronger, more resilient community where everyone has a stake in the common good.</p>
            `,
            underlinedSentence: "However, the Alaska model relies entirely on a finite resource: oil."
          },
          questions: [
            { id: "q_w17_p2_1", type: "detail", text: "How is the Alaska Permanent Fund funded?" },
            { id: "q_w17_p2_2", type: "inference", text: "What does the 'Multiplier Effect' refer to in this context?" },
            { id: "q_w17_p2_3", type: "vocab", text: "What is 'Resource Sovereignty'?", options: ["The King owns the land", "Natural resources belong to the people", "Oil companies rule the state", "Strict environmental laws"] },
            { id: "q_w17_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ],
      vocabulary: [
        { word: "Precarious", definition: "Not securely held or in position; dangerously likely to fall or collapse." },
        { word: "Hostile Architecture", definition: "An urban design strategy that uses elements of the built environment to purposefully guide or restrict behavior." },
        { word: "Aesthetics", definition: "A set of principles concerned with the nature and appreciation of beauty." },
        { word: "Loitering", definition: "Standing or waiting around idly without apparent purpose." },
        { word: "Safety Net", definition: "A collection of services provided by the state or other institutions which prevent people from falling into poverty." }
      ]
    };
  }

  // Week 18: Influencer Economy (Media)
  if (weekNum === 18) {
    return {
      id: 18,
      title: "The Influencer Economy",
      theme: "Media",
      mainIdeaHint: "Analyze the shift from traditional celebrity to 'relatable' influence. What is being sold?",
      passages: [
        {
          passage: {
            title: "Parasocial Relationships in the Digital Age",
            wordCount: 243,
            content: `
              <p>Marketing has changed. Brands used to use movie stars to sell things. Now, they use "influencers"—ordinary people who connect brands to fans. This works because of **"Parasocial Relationships."** Followers feel like they know the influencer, even though they've never met. It's a one-sided friendship.</p>
              <p>This false intimacy is powerful. An influencer's advice feels like a tip from a friend, not an ad. Brands pay billions for this trust. But the line between real life and ads is blurry. **"CGI Influencers"** like Lil Miquela—a computer-made character—show how fake it can be. If a robot sells you shampoo, is it "authentic"?</p>
              <p>This affects young people. Teens want to be like influencers, who show only perfect lives of travel and beauty. This leads to **"Social Comparison Theory,"** where we judge our worth by looking at others. <u>When the benchmark is a heavily edited highlight reel, legitimate feelings of inadequacy and depression often follow.</u></p>
              <p>Critics call this economy unstable. Sociology experts say it turns friendship into a **"Commodity,"** or something to be sold. Every interaction becomes a chance to make money. The question is: if everyone is a brand, can anyone just be a person?</p>
            `,
            underlinedSentence: "When the benchmark is a heavily edited highlight reel, legitimate feelings of inadequacy and depression often follow."
          },
          questions: [
            { id: "q_w18_1", type: "inference", text: "Why do brands find influencers more effective than traditional commercials?" },
            { id: "q_w18_2", type: "detail", text: "Who is Lil Miquela?" },
            { id: "q_w18_3", type: "vocab", text: "What is a 'Commodity'?", options: ["A raw material or product that can be bought and sold", "A type of friend", "A social media app", "A law"] },
            { id: "q_w18_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "Sharenting: The Child in the Lens",
            wordCount: 239,
            content: `
              <p>There is a new trend in the influencer world: family vlogging, or **"Sharenting."** Parents film their kids' lives—from birth to bad moods—for the world to see. **Ryan Kaji** started reviewing toys on YouTube at age three and became the top earner. It makes money, but is it right?</p>
              <p>The main issue is **"Informed Consent."** Adults can choose fame, but a toddler can't understand that their potty training is on the internet forever. As these "kidfluencers" grow up, they might be mad that their lives were sold. Critics call this **"Digital Child Labor."** In many places, these kids have no right to the money they earn, unlike child actors who have laws to protect them.</p>
              <p><u>Proponents argue that family channels provide entertainment, build community for isolated parents, and create generational wealth that secures the child's future.</u> They say parents know what is best for their kids.</p>
              <p>However, the mental cost is real. Growing up with a camera can change how a child sees reality. They might act differently just for "likes." Laws in France and the US are starting to change, but the debate goes on: is it okay to turn a childhood into a TV show?</p>
            `,
            underlinedSentence: "Proponents argue that family channels provide entertainment, build community for isolated parents, and create generational wealth that secures the child's future."
          },
          questions: [
            { id: "q_w18_p2_1", type: "detail", text: "What is 'Sharenting'?" },
            { id: "q_w18_p2_2", type: "inference", text: "Why does the author distinguish between child actors and kidfluencers?" },
            { id: "q_w18_p2_3", type: "vocab", text: "What is 'Informed Consent'?", options: ["Giving permission with full understanding of the consequences", "Signing a contract quickly", "Parents deciding for children", "Asking for money"] },
            { id: "q_w18_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ],
      vocabulary: [
        { word: "Parasocial", definition: "Relationships that are one-sided, where one person extends emotional energy, interest and time, and the other party is completely unaware of the other's existence." },
        { word: "Commodity", definition: "A raw material or primary agricultural product that can be bought and sold." },
        { word: "Sharenting", definition: "The overuse of social media by parents to share content about their children." },
        { word: "Informed Consent", definition: "Permission granted in full knowledge of the possible consequences, typically given by a patient to a doctor for treatment with full knowledge of the possible risks and benefits." },
        { word: "Social Comparison Theory", definition: "The idea that individuals determine their own social and personal worth based on how they stack up against others." }
      ]
    };
  }

  // Week 19: Plastic in the Oceans (Global)
  if (weekNum === 19) {
    return {
      id: 19,
      title: "The Plastic Pandemic",
      theme: "Global",
      mainIdeaHint: "Trace the lifecycle of plastic. Is recycling a solution or a stalling tactic?",
      passages: [
        {
          passage: {
            title: "The Myth of Recycling",
            wordCount: 510,
            content: `
              <p>Consumers are told that to save the planet, they just need to recycle. But this is mostly a lie. **"Wishcycling"** is when we throw things in the blue bin and hope they get recycled, but less than 10% of plastic actually is. The rest goes to dumps, burns, or the ocean.</p>
              <p>The problem is plastic itself. Glass and aluminum can be recycled forever, but plastic gets worse every time. Most "recycled" plastic is **"Downcycled"** into cheaper things like carpet, which eventually gets thrown away. Also, the recycling market crashed in 2018 when China stopped taking the world's trash with its "National Sword" policy. Now, the West has nowhere to send its waste.</p>
              <p>Because of this, **"Microplastics"**—tiny bits of plastic—are everywhere. They are in the deepest oceans, Arctic snow, and even human blood. <u>By focusing on consumer behavior rather than corporate production, the recycling myth has allowed companies to continue pumping out single-use plastics while shifting the blame to the individual.</u></p>
              <p>Critics say we need **"Extended Producer Responsibility" (EPR)** laws. This means companies who make the plastic must pay to clean it up. If they sell a bottle, they should pay for what happens to it. Until we stop making so much plastic, recycling is just a comforting illusion.</p>
            `,
            underlinedSentence: "By focusing on consumer behavior rather than corporate production, the recycling myth has allowed companies to continue pumping out single-use plastics while shifting the blame to the individual."
          },
          questions: [
            { id: "q_w19_1", type: "inference", text: "Why does the author call recycling a 'comforting illusion'?" },
            { id: "q_w19_2", type: "detail", text: "What happened after China's 'National Sword' policy was implemented?" },
            { id: "q_w19_3", type: "vocab", text: "What is 'Downcycling'?", options: ["Recycling into higher value products", "Converting waste into lower-quality materials", "Burving trash underground", "Shipping waste south"] },
            { id: "q_w19_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "Greenwashing the Crisis",
            wordCount: 480,
            content: `
              <p>Go to any store, and you see "eco-friendly" and "natural" everywhere. This is **"Greenwashing"**: lying about how good a product is for the planet. It uses our fear of climate change to sell us things without really fixing the problem.</p>
              <p>A good example is "bioplastic" bottles. Brands say they are made from plants and will disappear in nature. But most only break down in special industrial factories. If you throw them in the ocean, they last for centuries, just like normal plastic. The label makes us feel good, but the damage is the same.</p>
              <p>Big oil companies do this too. They spend millions on ads showing their green energy projects, but they spend very little money on actually doing them. <u>This "halo effect" distracts the public and regulators from the core activities that drive climate change, effectively buying the industry a "social license to operate" for a few more decades.</u></p>
              <p>Governments are starting to fight back. The EU is making laws to ban vague green claims. Companies will have to prove what they say. But as long as selling more stuff is the goal, companies will try to trick us. Real change needs truth, not just a green label.</p>
            `,
            underlinedSentence: "This 'halo effect' distracts the public and regulators from the core activities that drive climate change, effectively buying the industry a 'social license to operate' for a few more decades."
          },
          questions: [
            { id: "q_w19_p2_1", type: "detail", text: "What represents a 'tiny fraction' of fossil fuel companies' budgets?" },
            { id: "q_w19_p2_2", type: "inference", text: "Why are 'bioplastics' often misleading?" },
            { id: "q_w19_p2_3", type: "vocab", text: "What is 'Greenwashing'?", options: ["Cleaning with green soap", "Deceptive marketing about environmental benefits", "Planting trees", "Recycling money"] },
            { id: "q_w19_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ]
    };
  }

  // Week 20: Bilingual Brains (Education)
  if (weekNum === 20) {
    return {
      id: 20,
      title: "Bilingual Brains",
      theme: "Education",
      mainIdeaHint: "Analyze how language shapes thought. Is it a tool or a lens?",
      passages: [
        {
          passage: {
            title: "The Cognitive Gym",
            wordCount: 475,
            content: `
              <p>For years, people thought teaching kids two languages would confuse them. They were wrong. Today, scientists know that being bilingual is like a gym workout for the brain. It improves **"Executive Functions"**: the skills that help you focus, remember, and solve problems.</p>
              <p>A bilingual brain is always busy. Both languages are active, so the brain has to push one down to use the other. This strengthens the **"Prefrontal Cortex,"** just like lifting weights builds muscle. Studies show bilingual kids are better at multitasking and solving conflicts.</p>
              <p>The biggest benefit might be **"Cognitive Reserve."** Switching languages creates new paths in the brain. This can delay diseases like Alzheimer's by up to five years. <u>While it does not prevent the physical deterioration of the brain, bilingualism allows the mind to function longer despite the damage, proving that language is a shield against aging.</u></p>
              <p>However, you have to be good at both languages to get these benefits. Just taking a few Spanish classes isn't enough. The brain needs to be challenged to get stronger.</p>
            `,
            underlinedSentence: "While it does not prevent the physical deterioration of the brain, bilingualism allows the mind to function longer despite the damage, proving that language is a shield against aging."
          },
          questions: [
            { id: "q_w20_1", type: "inference", text: "Why does the author compare bilingualism to a 'workout'?" },
            { id: "q_w20_2", type: "detail", text: "What is the 'interference hypothesis'?" },
            { id: "q_w20_3", type: "vocab", text: "What are 'Executive Functions'?", options: ["Job titles in a company", "Cognitive processes for control and focus", "Computer programs", "Gym exercises"] },
            { id: "q_w20_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "The Critical Period Hypothesis",
            wordCount: 460,
            content: `
              <p>There is a famous idea in linguistics called the **"Critical Period Hypothesis"** (CPH). It says there is a special window of time to learn a language, usually ending at puberty. Before this closes, kids can learn a new language easily and sound like a native speaker. After it closes, it is much harder.</p>
              <p>The story of **"Genie"** supports this. She was a child kept alone until age 13. Even with help, she learned words but never grammar. Her brain had missed the chance to build those structures. This suggests language is a biological instinct that must happen at the right time.</p>
              <p>However, new research says the window might not be fully closed. Adults might not get a perfect accent, but they have **"Metalinguistic Awareness"**—they can understand grammar rules better than kids. They use what they know about the world to learn fast.</p>
              <p><u>Nevertheless, the existence of a critical period has profound implications for education policy, suggesting that foreign language instruction should begin in kindergarten rather than high school if we truly value fluency.</u> Waiting until high school might be too late.</p>
            `,
            underlinedSentence: "Nevertheless, the existence of a critical period has profound implications for education policy, suggesting that foreign language instruction should begin in kindergarten rather than high school if we truly value fluency."
          },
          questions: [
            { id: "q_w20_p2_1", type: "detail", text: "Who was 'Genie'?" },
            { id: "q_w20_p2_2", type: "inference", text: "Why might adults be better at learning grammar rules than children?" },
            { id: "q_w20_p2_3", type: "vocab", text: "What is the 'Critical Period Hypothesis'?", options: ["A time to criticize others", "A biological window for effortless language learning", "A history lesson", "A grammar rule"] },
            { id: "q_w20_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ],
      vocabulary: [
        { word: "Executive Functions", definition: "A set of cognitive processes that are necessary for the cognitive control of behavior." },
        { word: "Debunked", definition: "Exposed the falseness or hollowness of a myth, idea, or belief." },
        { word: "Incentive", definition: "A thing that motivates or encourages someone to do something." },
        { word: "Plagiarism", definition: "The practice of taking someone else's work or ideas and passing them off as one's own." },
        { word: "Scaffold", definition: "In education, a variety of instructional techniques used to move students toward stronger understanding." }
      ]
    };
  }

  // Week 21: The Connected Life (Media & Tech)
  if (weekNum === 21) {
    return {
      id: 21,
      title: "The Connected Life",
      theme: "Media",
      mainIdeaHint: "Explore how constant connectivity affects our relationships and self-image.",
      passages: [
        {
          passage: {
            title: "Alone Together: The Goldilocks Effect",
            wordCount: 470,
            content: `
              <p>Technology has changed how we relate to each other. Sociologist Sherry Turkle says we are **"Alone Together."** We are physically with people but mentally on our phones. We text at dinner and check email during dates. Turkle believes we do this because people are messy and unpredictable, but technology is clean and controllable.</p>
              <p>This need for control leads to the **"Goldilocks Effect"**: we want people not too close, not too far, but just right. Texting lets us edit what we say and look perfect. A real conversation is risky because we can't delete our mistakes. Over time, we trade deep conversation for simple connection. We choose the safety of distance over real intimacy.</p>
              <p>The danger is that we are losing **"Solitude."** Solitude is not loneliness; it is the good kind of being alone, where we find ourselves. When we fill every quiet moment with a screen, we forget how to just be. We panic if we are offline for even a minute.</p>
              <p><u>As we expect more from technology and less from each other, we risk creating a society where we are hyper-connected yet emotionally isolated, forgetting that the most important app on our phone is the one that turns it off.</u> We must learn to talk again.</p>
            `,
            underlinedSentence: "As we expect more from technology and less from each other, we risk creating a society where we are hyper-connected yet emotionally isolated, forgetting that the most important app on our phone is the one that turns it off."
          },
          questions: [
            { id: "q_w21_1", type: "inference", text: "Why do people prefer texting over talking, according to the text?" },
            { id: "q_w21_2", type: "detail", text: "What is the difference between solitude and loneliness?" },
            { id: "q_w21_3", type: "vocab", text: "What does 'Vulnerability' mean in this context?", options: ["Weakness", "The state of being exposed to the possibility of being attacked or harmed", "Openness and emotional honesty", "Defense"] },
            { id: "q_w21_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "The Curated Self: Life as a Highlight Reel",
            wordCount: 460,
            content: `
              <p>Social media is often called a "highlight reel"—a collection of everyone's best moments. We see vacations and promotions, but not the struggles or boring days. This constant stream of perfect images triggers **"Social Comparison Theory."** This idea suggests we judge our own worth by comparing ourselves to others.</p>
              <p>When we compare our messy real lives with everyone else's perfect online lives, we feel envious and not good enough. This gets worse because we want **"Validation."** We post photos to get "likes" and comments, which give us a quick rush of happiness. This turns our life into a performance. We start living for the camera instead of the moment.</p>
              <p>This creates a gap between our **"Actual Self"** (who we really are) and our **"Ideal Self"** (who we pretend to be online). The wider this gap gets, the more anxious we feel. We become afraid that people will find out we aren't as cool or successful as our profile looks.</p>
              <p><u>True digital well-being requires breaking this cycle of comparison by recognizing that social media is a curated exhibit, not a documentary, and that a life lived without an audience is still a life worth living.</u> We need to disconnect to reconnect with reality.</p>
            `,
            underlinedSentence: "True digital well-being requires breaking this cycle of comparison by recognizing that social media is a curated exhibit, not a documentary, and that a life lived without an audience is still a life worth living."
          },
          questions: [
            { id: "q_w21_p2_1", type: "inference", text: "How does the 'highlight reel' effect impact self-esteem?" },
            { id: "q_w21_p2_2", type: "detail", text: "What drives the 'performative existence' described in the text?" },
            { id: "q_w21_p2_3", type: "vocab", text: "What is 'Validation'?", options: ["Parking a car", "Recognition or affirmation that a person or their feelings or opinions are valid or worthwhile", "Checking a ticket", "Ignoring someone"] },
            { id: "q_w21_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ],
      vocabulary: [
        { word: "Vulnerability", definition: "The quality or state of being exposed to the possibility of being attacked or harmed, either physically or emotionally." },
        { word: "Solitude", definition: "The state or situation of being alone, often emphasized as a constructive or pleasant state." },
        { word: "Curated", definition: "Select, organize, and present (content, merchandise, information, etc.), typically using professional or expert knowledge." },
        { word: "Validation", definition: "Recognition or affirmation that a person or their feelings or opinions are valid or worthwhile." },
        { word: "Tethered", definition: "Tie (an animal) with a rope or chain so as to restrict its movement; here, figuratively bound to a device." }
      ]
    };
  }
  // Week 22: Streaming vs Cinema (Media)
  if (weekNum === 22) {
    return {
      id: 22,
      title: "The Death of Cinema?",
      theme: "Media",
      mainIdeaHint: "Compare the communal experience of theater vs. convenience of home. What is lost?",
      passages: [
        {
          passage: {
            title: "The Death of the Shared Experience",
            wordCount: 480,
            content: `
              <p>For a hundred years, the movie theater was the "church" of American culture. It was a place where strangers gathered in the dark to share a dream, laughing and screaming together. Today, that church is falling apart. Streaming services have changed how we watch movies, moving the experience from the theater to the living room. Directors like **Martin Scorsese** say this is bad because "cinema" is not just the movie, but the shared experience of watching it with others.</p>
              <p>Streaming is easy and cheap. During the pandemic, it grew even faster as big movies went straight to the internet. But critics say we lose something when we watch a movie on a phone instead of a big screen. The "cinema experience"—the big sound, the focus, the lack of distractions—cannot be copied at home.</p>
              <p>Also, streaming changes the movies themselves. Theaters need big opening weekends, so they show loud action movies. Streaming apps want you to stay on the app, so they prefer **"Binge-able"** shows that keep you watching for hours. This has hurt mid-sized drama movies, which are now mostly made for TV.</p>
              <p><u>While convenient, the privatization of the movie-going experience means we act less as a community sharing a cultural moment and more as isolated consumers feeding our individual preferences.</u> Whether the movie theater survives depends on whether we still care about sitting in the dark together.</p>
            `,
            underlinedSentence: "While convenient, the privatization of the movie-going experience means we act less as a community sharing a cultural moment and more as isolated consumers feeding our individual preferences."
          },
          questions: [
            { id: "q_w22_1", type: "inference", text: "Martin Scorsese's argument implies that:" },
            { id: "q_w22_2", type: "detail", text: "What type of content do streaming algorithms favor?" },
            { id: "q_w22_3", type: "vocab", text: "What does 'Secular Cathedral' mean?", options: ["A non-religious place treated with reverence", "A church without a roof", "A shopping mall", "A government building"] },
            { id: "q_w22_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "Content Democratization vs. The Repository",
            wordCount: 465,
            content: `
              <p>Fans of streaming say it leads to **"Content Democratization"**. This means it is easier for new filmmakers to share their work. In the old days, a few rich bosses decided what movies got made. Now, platforms like Netflix and YouTube allow all kinds of stories to find an audience. A Korean show like *Squid Game* can become a huge hit worldwide without needing permission from Hollywood.</p>
              <p>However, having too many choices has a downside: the "Paradox of Choice." When we scroll through thousands of titles, we get stressed and tired. We spend more time choosing than watching. To help, apps use algorithms to suggest shows, creating **"Filter Bubbles."** These only show us what we already like.</p>
              <p>This turns the service into a storage room, or "repository," instead of a library. Instead of trying new things, we just watch the same kind of stuff over and over. The risk is that movies stop being art that challenges us and become just a product that keeps us happy.</p>
              <p><u>True democratization requires not just access to everything, but the curiosity to explore beyond the algorithm's suggestions.</u> Without that, we are just drowning in content.</p>
            `,
            underlinedSentence: "True democratization requires not just access to everything, but the curiosity to explore beyond the algorithm's suggestions."
          },
          questions: [
            { id: "q_w22_p2_1", type: "detail", text: "How has streaming democratized content?" },
            { id: "q_w22_p2_2", type: "inference", text: "Why does the author call streaming platforms a 'repository'?" },
            { id: "q_w22_p2_3", type: "vocab", text: "What is 'Decision Fatigue'?", options: ["Being tired from making too many choices", "Being tired from running", "Being angry at a decision", "Sleeping during a movie"] },
            { id: "q_w22_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ],
      vocabulary: [
        { word: "Democratization", definition: "The action of making something accessible to everyone." },
        { word: "Locus", definition: "A specific point, place, or center of activity." },
        { word: "Secular", definition: "Not connected with religious or spiritual matters." },
        { word: "Gatekeeper", definition: "A person or thing that controls access to something." },
        { word: "Repository", definition: "A place, building, or receptacle where things are or may be stored." }
      ]
    };
  }

  // Week 23: Urbanization Trends (Global)
  if (weekNum === 23) {
    return {
      id: 23,
      title: "Megacities",
      theme: "Global",
      mainIdeaHint: "Assess the sustainability of rapid urban growth. Are cities the problem or the solution?",
      passages: [
        {
          passage: {
            title: "The Urban Metabolism",
            wordCount: 475,
            content: `
              <p>Biologists say cities are like living animals with a simple **"Metabolism"**: they eat resources (food, water) and create waste (trash, pollution). Just as a big animal is more efficient than a small one, cities have "super-linear scaling." As they double in size, they produce more than double the money and ideas. But they also struggle to handle all the trash. This is the challenge of the **"Megacity"**—a city with over 10 million people.</p>
              <p>In poor countries, cities are growing faster than the government can build **"Infrastructure,"** like roads and pipes. Millions of people move to cities like Lagos or Mumbai for jobs, but end up living in slums with no water or power. These crowded areas can become sick zones where disease spreads easily.</p>
              <p>Planners disagree on the solution. Some say we should tear down slums and build high-rise apartments. Others argue for "slum upgrading," which means keeping the community but adding water and electricity. They say slums are full of energy and business, not just poverty.</p>
              <p><u>Ultimately, the sustainability of our species depends on whether we can re-engineer the urban metabolism to be circular, turning the city's waste back into resources rather than allowing it to poison the environment.</u> A city that cannot handle its own waste will fail.</p>
            `,
            underlinedSentence: "Ultimately, the sustainability of our species depends on whether we can re-engineer the urban metabolism to be circular, turning the city's waste back into resources rather than allowing it to poison the environment."
          },
          questions: [
            { id: "q_w23_1", type: "inference", text: "Why does the author compare a city to a living organism?" },
            { id: "q_w23_2", type: "detail", text: "What is 'super-linear scaling' in the context of cities?" },
            { id: "q_w23_3", type: "vocab", text: "What is 'Infrastructure Debt'?", options: ["Owing money to a bank", "When a city grows faster than its ability to build necessary services", "A broken bridge", "High taxes"] },
            { id: "q_w23_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "Arrival Cities: The Slum as Function",
            wordCount: 460,
            content: `
              <p>We often think slums are bad places that should be removed. But journalist Doug Saunders calls them the **"Arrival City."** He says these places help poor families move into the middle class. For a farmer moving to the city, the slum is a cheap place to save money and start a business.</p>
              <p>History shows this is true. The slums of London or New York 100 years ago were dirty, but they helped immigrants succeed. The problem happens when the "escalator" of success breaks. If a family stays in a slum for generations without schools or legal rights, the area becomes a trap of crime and anger.</p>
              <p>The solution is not to bulldoze these homes, but to improve them. This means giving people **"Land Tenure"** (legal ownership). When people know their home won't be destroyed, they spend money to fix it up. They build better roofs and floors.</p>
              <p><u>By legalizing the informal city rather than fighting it, governments can tap into the immense entrepreneurial energy of the poor, transforming the 'problem' of the slum into the solution for economic growth.</u> The city must be open to everyone.</p>
            `,
            underlinedSentence: "By legalizing the informal city rather than fighting it, governments can tap into the immense entrepreneurial energy of the poor, transforming the 'problem' of the slum into the solution for economic growth."
          },
          questions: [
            { id: "q_w23_p2_1", type: "detail", text: "What is the function of an 'Arrival City'?" },
            { id: "q_w23_p2_2", type: "inference", text: "What happens when the 'escalator' of social mobility breaks?" },
            { id: "q_w23_p2_3", type: "vocab", text: "What does 'Tenure' mean here?", options: ["The length of time holding a job", "The legal right to hold or own property", "A musical note", "A teacher's salary"] },
            { id: "q_w23_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ],
      vocabulary: [
        { word: "Metabolism", definition: "The chemical processes that occur within a living organism in order to maintain life; applied here to city resource use." },
        { word: "Infrastructure", definition: "The basic physical and organizational structures (e.g., buildings, roads, power supplies) needed for the operation of a society." },
        { word: "Tenure", definition: "The conditions under which land or buildings are held or occupied; legal ownership." },
        { word: "Social Mobility", definition: "The movement of individuals, families, or groups through a system of social hierarchy or stratification." },
        { word: "Incubator", definition: "A place or situation that encourages the development or growth of something new." }
      ]
    };
  }

  // Week 24: Future of University (Education)
  if (weekNum === 24) {
    return {
      id: 24,
      title: "The Future of University",
      theme: "Education",
      mainIdeaHint: "Analyze the true value of a degree. Is it about skills, or is it just a signal?",
      passages: [
        {
          passage: {
            title: "The Signaling Theory of Education",
            wordCount: 470,
            content: `
              <p>For a long time, people thought university degrees were valuable because of their skills. This is the "Human Capital Theory": college teaches you things that make you a better worker. But economist Michael Spence had a different idea: **"Signaling Theory."** He said a degree doesn't prove you learned anything useful. Instead, it is a signal to employers that you are smart, hard-working, and obedient.</p>
              <p>In this view, the diploma is like a peacock's tail—an expensive sign to show off. This leads to **"Credentialism,"** where jobs that used to be simple now require a degree. Employers use degrees as a quick filter, not because the job needs it, but because it's an easy way to sort people.</p>
              <p>Critics say this forces young people to go into huge debt just to get a piece of paper. If everyone has a degree, the signal stops working. Then students need even higher degrees, like a master's, just to stand out.</p>
              <p><u>Ultimately, if universities are merely credential factories rather than centers of learning, we are wasting billions of dollars and years of human potential on a sorting mechanism that could be replaced by simpler aptitude tests.</u> We should focus on real skills, not just titles.</p>
            `,
            underlinedSentence: "Ultimately, if universities are merely credential factories rather than centers of learning, we are wasting billions of dollars and years of human potential on a sorting mechanism that could be replaced by simpler aptitude tests."
          },
          questions: [
            { id: "q_w24_1", type: "inference", text: "How does 'Signaling Theory' differ from 'Human Capital Theory'?" },
            { id: "q_w24_2", type: "detail", text: "What is 'Credentialism'?" },
            { id: "q_w24_3", type: "vocab", text: "What does 'Human Capital' refer to?", options: ["Money held by humans", "The economic value of a worker's experience and skills", "The capital city", "A type of loan"] },
            { id: "q_w24_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "Holistic Education vs. Vocational Training",
            wordCount: 465,
            content: `
              <p>Because college is so expensive, many students want degrees that lead straight to a job. This has made **"Vocational Training"** popular. Examples include coding bootcamps that skip history and philosophy to teach only job skills. Fans say this is faster and fairer for the modern economy.</p>
              <p>However, supporters of the **"Liberal Arts"** say this is a mistake. In a world of Artificial Intelligence, technical skills change every few years. The most important skills are critical thinking and understanding history. A coder who only knows code might be replaced by AI. A person who understands human behavior is safe.</p>
              <p>This debate is about the purpose of college. Is it a job training center, or a place for **"Self-Actualization"**? By treating students as future workers, we might create people who know *how* to build things, but not *why* they should build them.</p>
              <p><u>Perhaps the ideal future is a hybrid model, where the "ivory tower" of academia opens its doors to the practical necessities of the market without selling its soul to them.</u> We need thinkers who can also do.</p>
            `,
            underlinedSentence: "Perhaps the ideal future is a hybrid model, where the 'ivory tower' of academia opens its doors to the practical necessities of the market without selling its soul to them."
          },
          questions: [
            { id: "q_w24_p2_1", type: "detail", text: "What is the main criticism of the 'Vocational Training' model?" },
            { id: "q_w24_p2_2", type: "inference", text: "Why might a liberal arts background be valuable in the age of AI?" },
            { id: "q_w24_p2_3", type: "vocab", text: "What defines 'Liberal Arts' education?", options: ["Painting and drawing", "A broad education in humanities and sciences", "Political liberalism", "Free arts supplies"] },
            { id: "q_w24_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ],
      vocabulary: [
        { word: "Signaling", definition: "In economics, conveying information about oneself (e.g., via a degree) to another party (e.g., an employer) to resolve uncertainty." },
        { word: "Credentialism", definition: "Belief in or reliance on academic or other formal qualifications as the best measure of a person's intelligence or ability." },
        { word: "Vocational", definition: "Relating to an occupation or employment; training for a specific job." },
        { word: "Utilitarian", definition: "Designed to be useful or practical rather than attractive; prioritizing effectiveness." },
        { word: "Self-Actualization", definition: "The realization or fulfillment of one's talents and potentialities." }
      ]
    };
  }

  // Week 25: Space Colonization (Ethics)
  if (weekNum === 25) {
    return {
      id: 25,
      title: "Space Colonization",
      theme: "Ethics",
      mainIdeaHint: "Consider the moral obligation. Is space a new frontier or a new crime scene?",
      passages: [
        {
          passage: {
            title: "Planetary Protection: The Bacterial Ethical Dilemma",
            wordCount: 480,
            content: `
              <p>As humans prepare to live on Mars, a new field of ethics called **"Planetary Protection"** has emerged. This deals with the risk of biological contamination. If we go to Mars, we bring our bacteria with us. If Mars has its own tiny life forms, our bacteria could kill them. This would be an ecological disaster.</p>
              <p>Supporters of "Terraforming" (making a planet livable for humans) say we must go to space to save our species. They argue that becoming a "multi-planetary species" protects us from extinction events on Earth, like nuclear war. In this view, saving humanity is more important than saving Martian bacteria.</p>
              <p>However, others argue that this is arrogant. They say we shouldn't destroy an alien ecosystem just because we can. A unique alien world has value, even if we can't use it. Destroying it would be a moral crime.</p>
              <p><u>The question remains: does our right to survive justify the potential genocide of an entire alien ecosystem, or do we have a moral obligation to leave the "pristine wilderness" of the cosmos untouched?</u> Maybe we should leave Mars alone.</p>
            `,
            underlinedSentence: "The question remains: does our right to survive justify the potential genocide of an entire alien ecosystem, or do we have a moral obligation to leave the 'pristine wilderness' of the cosmos untouched?"
          },
          questions: [
            { id: "q_w25_1", type: "inference", text: "What is the 'Bacterial Ethical Dilemma'?" },
            { id: "q_w25_2", type: "detail", text: "Why do proponents of terraforming argue it is necessary?" },
            { id: "q_w25_3", type: "vocab", text: "What defines a 'Biocentric' view?", options: ["Believing biology is boring", "Believing all living things have intrinsic value", "Believing humans are the center of the universe", "Believing robots should rule"] },
            { id: "q_w25_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "The Great Filter",
            wordCount: 460,
            content: `
              <p>The universe is huge and old, so there should be aliens everywhere. But we haven't found any. This puzzle is called the **"Fermi Paradox."** One explanation is the **"Great Filter."** This is the idea that there is a difficult barrier that stops life from traveling to the stars.</p>
              <p>This filter could be behind us or ahead of us. If it is behind us, it means life is very rare, and we are lucky to be here. We are alone, but safe. But if the filter is *ahead* of us, that is scary. It means advanced civilizations usually destroy themselves before they can leave their planet. Maybe they use nuclear war or AI to wipe themselves out.</p>
              <p>This implies that finding life on Mars would be *bad* news. It would mean life is common, so the filter hasn't happened yet. It means our doom is likely still coming.</p>
              <p><u>If the Great Filter lies in our future, then our current political squabbles and environmental negligence are not just annoyances, but symptoms of the very disease that has extinguished every other civilization that came before us.</u> We might be running out of time.</p>
            `,
            underlinedSentence: "If the Great Filter lies in our future, then our current political squabbles and environmental negligence are not just annoyances, but symptoms of the very disease that has extinguished every other civilization that came before us."
          },
          questions: [
            { id: "q_w25_p2_1", type: "detail", text: "What is the 'Fermi Paradox'?" },
            { id: "q_w25_p2_2", type: "inference", text: "Why would finding life on Mars be 'bad news' according to the Great Filter theory?" },
            { id: "q_w25_p2_3", type: "vocab", text: "What does 'Inevitably' mean?", options: ["Rarely", "Certain to happen; unavoidable", "By accident", "Happily"] },
            { id: "q_w25_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ],
      vocabulary: [
        { word: "Indigenous", definition: "Native or original to a specific place." },
        { word: "Utilitarian", definition: "Designed to be useful or practical; defined by the greatest good for the greatest number." },
        { word: "Intrinsic", definition: "Belonging naturally; essential." },
        { word: "Paradox", definition: "A seemingly absurd or self-contradictory statement or proposition that when investigated or explained may prove to be well founded or true." },
        { word: "Terraforming", definition: "Modifying a planet's environment to make it habitable for humans." }
      ]
    };
  }

  // Week 26: Video Games as Art (Media)
  if (weekNum === 26) {
    return {
      id: 26,
      title: "Interactive Art",
      theme: "Media",
      mainIdeaHint: "Analyze the unique storytelling power of interactivity. Does 'playing' lessen the seriousness?",
      passages: [
        {
          passage: {
            title: "Ludology vs. Narratology: The Battle for the Soul of Games",
            wordCount: 470,
            content: `
              <p>Since people started studying video games, there has been a fight between two groups: **Ludologists** and **Narratologists**. Narratologists look at games like books or movies. They care about the story and characters. For them, playing *The Last of Us* is like watching a movie where you control the hero.</p>
              <p>Ludologists disagree. They say games are special because of **"gameplay"** (rules and fun), not story. They point to *Tetris*, which has no story or characters but is a perfect game. To them, studying *Tetris* as a story is silly. They believe games are about **"agency"**—the power of the player to make choices.</p>
              <p>Today, most people agree that games can be both. An RPG like *Mass Effect* has a big story, while a game like *Doom* is mostly about shooting. <u>Yet, the tension remains: does a heavy focus on cinematic storytelling interrupt the flow of play, or does it elevate the medium from a pastime to a profound emotional experience?</u></p>
              <p>The magic of games might be in the mix. Sometimes the story says you are a hero, but the game makes you do bad things to win. This friction makes us think.</p>
            `,
            underlinedSentence: "Yet, the tension remains: does a heavy focus on cinematic storytelling interrupt the flow of play, or does it elevate the medium from a pastime to a profound emotional experience?"
          },
          questions: [
            { id: "q_w26_1", type: "inference", text: "How would a strict Ludologist view the game 'Tetris'?" },
            { id: "q_w26_2", type: "detail", text: "What is the core disagreement between Ludologists and Narratologists?" },
            { id: "q_w26_3", type: "vocab", text: "What does 'Agency' refer to in this text?", options: ["A business organization", "The capacity of a player to make choices and exert power", "A secret spy group", "A narrative structure"] },
            { id: "q_w26_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "Empathy Machines: The Psychology of Virtual Worlds",
            wordCount: 465,
            content: `
              <p>Video games are often called "just games," but psychologists call them **"Empathy Machines."** In a book, you read about a character's pain. In a game, you *feel* it because you are them. This is the **"Proteus Effect"**: we act like our avatar. When we play as a soldier or a refugee, we understand their life better.</p>
              <p>This has led to **"Serious Games"**—games made for learning, not just fun. For example, *Papers, Please* makes you play as an immigration officer in a strict country. You have to feed your family, but also follow cruel rules. This makes the idea of "doing your job" scary and real. Games show us *why* people make hard choices.</p>
              <p>Critics say games are just distractions or can be addictive. But supporters say **"Embodied Cognition"** (learning by doing) is the best way to learn empathy. Maybe the future of moral teaching isn't in books, but in simulations.</p>
              <p><u>By navigating these ethical minefields, players practice moral reasoning in a safe environment, potentially building the "muscle memory" of empathy needed to navigate a polarized real world.</u> We learn by playing.</p>
            `,
            underlinedSentence: "By navigating these ethical minefields, players practice moral reasoning in a safe environment, potentially building the 'muscle memory' of empathy needed to navigate a polarized real world."
          },
          questions: [
            { id: "q_w26_p2_1", type: "inference", text: "What is the core concept of the 'Proteus Effect'?" },
            { id: "q_w26_p2_2", type: "detail", text: "How does 'Papers, Please' illustrate the concept of complicity?" },
            { id: "q_w26_p2_3", type: "vocab", text: "What defines 'Serious Games'?", options: ["Games that are not fun", "Games designed for education or social change", "Games with no jokes", "Games for adults only"] },
            { id: "q_w26_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ],
      vocabulary: [
        { word: "Ludology", definition: "The study of games and gaming, especially video games." },
        { word: "Narratology", definition: "The branch of knowledge or criticism that deals with the structure and function of narrative and its themes, conventions, and symbols." },
        { word: "Dissonance", definition: "A tension or clash resulting from the combination of two disharmonious or unsuitable elements." },
        { word: "Embodied", definition: "To be a tangible or visible form of an idea, quality, or feeling." },
        { word: "Visceral", definition: "Relating to deep inward feelings rather than to the intellect." }
      ]
    };
  }

  // Week 27: Pandemic Preparedness (Global)
  if (weekNum === 27) {
    return {
      id: 27,
      title: "Pandemic Preparedness",
      theme: "Global",
      mainIdeaHint: "Evaluate global cooperation. Why are viruses a borderless threat?",
      passages: [
        {
          passage: {
            title: "The One Health Approach",
            wordCount: 475,
            content: `
              <p>The COVID-19 pandemic showed us a big problem: we treat human health, animal health, and nature as separate things. But they are connected. Most new diseases (75%) are **"zoonotic,"** meaning they jump from animals to humans. To fix this, experts suggest the **"One Health"** approach. This means protecting people, animals, and the environment together.</p>
              <p>Diseases spill over because of humans. When we cut down forests or sell wild animals, we get closer to viruses. When we destroy a bat's home, we invite sickness into ours. "One Health" means catching diseases early in animals before they reach us. It focuses on prevention, not just cure.</p>
              <p>This requires teamwork. Doctors, vets, and ecologists must share information. If a farmer sees sick chickens, doctors in the city need to know immediately. <u>Ultimately, nature does not recognize our political borders or academic distinctions; viruses flow freely between species, and our defense systems must be equally fluid and interconnected.</u> We cannot be healthy if the planet is sick.</p>
              <p>This also links to climate change. As the world gets hotter, mosquitoes move to new places, bringing diseases like malaria. Protecting the rainforest is a way to protect our hospitals.</p>
            `,
            underlinedSentence: "Ultimately, nature does not recognize our political borders or academic distinctions; viruses flow freely between species, and our defense systems must be equally fluid and interconnected."
          },
          questions: [
            { id: "q_w27_p1_1", type: "detail", text: "What is a 'zoonotic' disease?", options: ["A disease found only in zoos.", "A disease that spills over from animals to humans.", "A plant virus.", "An illness caused by pollution."], correctAnswer: "A disease that spills over from animals to humans." },
            { id: "q_w27_p1_2", type: "inference", text: "How does deforestation contribute to pandemics according to the text?", options: ["It makes the air dirtier.", "It brings humans into closer contact with wildlife, facilitating disease spillover.", "It reduces the number of trees.", "It has no effect."], correctAnswer: "It brings humans into closer contact with wildlife, facilitating disease spillover." },
            { id: "q_w27_p1_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "The Swiss Cheese Model of Defense",
            wordCount: 465,
            content: `
              <p>No single way to stop a virus is perfect. Vaccines, masks, and tests all have small problems. To understand how we stay safe, experts use the **"Swiss Cheese Model."** Imagine slices of cheese lined up. Each slice is a layer of protection. Each slice has holes, which are the imperfections.</p>
              <p>If you have only one slice, the virus can pass through a hole. But if you have many slices, the holes won't line up. The solid part of one slice blocks the hole in another. This is called **"Layered Defense."** It means we need many different protections to be safe. We shouldn't rely on just one "silver bullet."</p>
              <p>Some layers are personal (masks, washing hands). Others are shared (government rules, clean air in buildings). <u>The metaphor serves as a powerful reminder that public health is a collective endeavor; while my mask protects you and your vaccine protects me, it is only by stacking our efforts that we create a solid wall against infection.</u> When one thing fails (like a mask breaks), the other things (like a vaccine) help.</p>
              <p>Critics say sometimes we do useless things just to look busy. This is called "security theater." But the main idea is true: in a complex world, we need multiple layers of safety to stop a threat.</p>
            `,
            underlinedSentence: "The metaphor serves as a powerful reminder that public health is a collective endeavor; while my mask protects you and your vaccine protects me, it is only by stacking our efforts that we create a solid wall against infection."
          },
          questions: [
            { id: "q_w27_p2_1", type: "detail", text: "What does the 'Swiss Cheese Model' illustrate?", options: ["How to make cheese.", "That relying on a single defense is dangerous because every measure has flaws (holes).", "That viruses like cheese.", "That we need more food."], correctAnswer: "That relying on a single defense is dangerous because every measure has flaws (holes)." },
            { id: "q_w27_p2_2", type: "inference", text: "What is the role of 'redundancy' in this model?", options: ["It is a waste of time.", "It ensures that if one layer fails, another is there to stop the threat.", "It makes things complicated.", "It is only for airplanes."], correctAnswer: "It ensures that if one layer fails, another is there to stop the threat." },
            { id: "q_w27_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ],
      vocabulary: [
        { word: "Pathogen", definition: "A bacterium, virus, or other microorganism that can cause disease." },
        { word: "Zoonotic", definition: "A disease that can be transmitted from animals to humans." },
        { word: "Reservoir", definition: "Any person, animal, plant, soil or substance in which an infectious agent normally lives and multiplies." },
        { word: "Vector", definition: "An organism, typically a biting insect or tick, that transmits a disease or parasite from one animal or plant to another." },
        { word: "Redundancy", definition: "The inclusion of extra components which are not strictly necessary to functioning, in case of failure in other components." }
      ]
    };
  }

  // Week 28: Digital Literacy (Education)
  if (weekNum === 28) {
    return {
      id: 28,
      title: "Digital Literacy",
      theme: "Education",
      mainIdeaHint: "If we cannot agree on basic facts, how can we solve shared problems?",
      passages: [
        {
          passage: {
            title: "The Epistemic Crisis",
            wordCount: 475,
            content: `
              <p>In the past, most people agreed on basic facts. We might disagree on solutions, but we agreed on the problems. Today, sociologists describe an **"Epistemic Crisis,"** or a breakdown in truth. This isn't just about lying; it's about not agreeing on reality. On the internet, everyone sees different news. Two neighbors can live in different worlds, each seeing proof that the other is crazy.</p>
              <p>This is called **"Truth Decay."** It happens when opinions blur with facts. "Truth" becomes about what team you are on, not what is real. If a fact hurts my group, I reject it and attack the person who found it. This destroys trust in experts like scientists and journalists. Without a neutral referee, every argument becomes a power struggle.</p>
              <p><u>The danger of an epistemic crisis is that it paralyzes democracy; we cannot negotiate solutions if we cannot even agree on the premises of the argument.</u> When we can't tell truth from lies, we are easily tricked by leaders who offer simple, emotional answers instead of hard truths.</p>
              <p>To fix this, we need **"Epistemic Humility."** We must admit what we don't know and test our own beliefs. We need to learn not just *what* to think, but *how* to know what is true.</p>
            `,
            underlinedSentence: "The danger of an epistemic crisis is that it paralyzes democracy; we cannot negotiate solutions if we cannot even agree on the premises of the argument."
          },
          questions: [
            { id: "q_w28_p1_1", type: "detail", text: "What is 'Truth Decay'?", options: ["When books get old.", "The blurring of the line between fact and opinion, and the rejection of objective data.", "A type of tooth decay.", "When the internet crashes."], correctAnswer: "The blurring of the line between fact and opinion, and the rejection of objective data." },
            { id: "q_w28_p1_2", type: "inference", text: "Why does the author argue that checking facts is not enough?", options: ["Because facts are boring.", "Because we also need 'Epistemic Humility' and to rebuild trust in shared reality.", "Because computers break.", "Because no one cares."], correctAnswer: "Because we also need 'Epistemic Humility' and to rebuild trust in shared reality." },
            { id: "q_w28_p1_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "Algorithmic Radicalization",
            wordCount: 460,
            content: `
              <p>Social media algorithms have one goal: to keep you scrolling. To do this, they show you things that make you emotional, especially angry or scared. This has a dangerous effect on politics. Studies show algorithms push users toward extreme content. If you watch a video about jogging, the next one might be about extreme survival.</p>
              <p>This is called **"Algorithmic Radicalization."** A person reading a mild political story might soon be shown wild conspiracy theories. The algorithm doesn't care about truth; it cares about engagement. Extreme views are exciting, so they get more clicks. This creates a "content funnel" that pulls people away from the middle and toward the edge.</p>
              <p><u>This invisible hand of the algorithm shapes our political landscape by amplifying the most divisive voices while silencing the moderates.</u> It creates a loop where users think their extreme views are normal because that's all they see. To stop this, we need to change how the platforms work. As long as "time on site" is the goal, polarization will be profitable.</p>
              <p>We need "algorithmic literacy." We must understand that our news feed is not a mirror of the world. It is a list designed to trigger us. We must actively look for boring, balanced news to fight the machine.</p>
            `,
            underlinedSentence: "This invisible hand of the algorithm shapes our political landscape by amplifying the most divisive voices while silencing the moderates."
          },
          questions: [
            { id: "q_w28_p2_1", type: "detail", text: "Why do algorithms prioritize extreme content?", options: ["Because it is true.", "Because it provokes strong emotional reactions and keeps users scrolling.", "Because the government wants them to.", "Because it is shorter."], correctAnswer: "Because it provokes strong emotional reactions and keeps users scrolling." },
            { id: "q_w28_p2_2", type: "inference", text: "What is the 'content funnel' described in the text?", options: ["A way to pour water.", "A process where the algorithm guides users from moderate topics to increasingly extreme ones.", "A type of cake.", "A new social media app."], correctAnswer: "A process where the algorithm guides users from moderate topics to increasingly extreme ones." },
            { id: "q_w28_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ],
      vocabulary: [
        { word: "Epistemic", definition: "Relating to knowledge or to the degree of its validation." },
        { word: "Polarization", definition: "Division into two sharply contrasting groups or sets of opinions or beliefs." },
        { word: "Radicalization", definition: "The process by which an individual or group comes to adopt increasingly extreme political, social, or religious ideals." },
        { word: "Tribalism", definition: "The behavior and attitudes that stem from strong loyalty to one's own social group." },
        { word: "Curated", definition: "Selected, organized, and presented using professional or expert knowledge." }
      ]
    };
  }

  // Week 29: Privacy in Public (Ethics)
  if (weekNum === 29) {
    return {
      id: 29,
      title: "Universal Basic Income",
      theme: "Economics",
      mainIdeaHint: "If robots do all the work, how will humans survive?",
      passages: [
        {
          passage: {
            title: "The Post-Work Society",
            wordCount: 470,
            content: `
              <p>In 1930, economist John Maynard Keynes predicted that by now, we would only work 15 hours a week. He thought technology would do all the hard work, leaving us with free time. Instead, we work more than ever. Now, Artificial Intelligence is doing jobs like writing and coding. We face a future where human work might not be needed.</p>
              <p>This is why people are talking about **Universal Basic Income (UBI)**. This is a plan where the government gives everyone free money every month, whether they work or not. Supporters say this is necessary if robots take our jobs. It would separate "work" from "survival," letting people learn or make art without fear of starving.</p>
              <p><u>Critics, however, worry that without a job, society would lose its purpose.</u> They believe work gives us dignity and community, not just money. Also, UBI would be very expensive. The debate asks a big question: do we need work to be happy, or can we find meaning in leisure?</p>
              <p>Whatever happens, the old system is breaking. We need a new safety net for a world where "jobs for everyone" might be impossible.</p>
            `,
            underlinedSentence: "Critics, however, worry that without a job, society would lose its purpose."
          },
          questions: [
            { id: "q_w29_p1_1", type: "detail", text: "What did John Maynard Keynes predict in 1930?", options: ["That robots would take over the world.", "That we would work only 15 hours a week due to technological progress.", "That everyone would be rich.", "That the internet would be invented."], correctAnswer: "That we would work only 15 hours a week due to technological progress." },
            { id: "q_w29_p1_2", type: "inference", text: "Why is UBI considered a solution to 'technological unemployment'?", options: ["Because it forces people to work.", "Because it provides a safety net in a world where machines do the jobs.", "Because it stops technology.", "Because it makes robots pay taxes."], correctAnswer: "Because it provides a safety net in a world where machines do the jobs." },
            { id: "q_w29_p1_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "The Bullshit Jobs Theory",
            wordCount: 465,
            content: `
              <p>In 2013, David Graeber wrote a famous essay called "On the Phenomenon of Bullshit Jobs." He said that 30-40% of jobs are pointless. The people doing them feel they shouldn't exist. He called them "box tickers" or "taskmasters." He said this work damages the soul because workers feel they aren't helping society.</p>
              <p>Graeber asked: if companies want to save money, why do they pay people to do nothing? He argued the reason is political. "Bullshit jobs" keep people busy so they don't have time to change the world. We have created a culture where "work" is seen as good, even if it produces nothing.</p>
              <p><u>This phenomenon creates a paradox: the most essential workers (nurses, teachers, trash collectors) are often paid the least, while those with the most abstract, arguably useless roles are paid the most.</u> Graeber thought UBI could fix this. If people didn't *have* to work to live, they would quit their useless jobs. This would force society to value real work, like teaching and caring, more than busy work.</p>
              <p>In a future without forced work, a successful life would be about helping the community and growing as a person, not just a job title.</p>
            `,
            underlinedSentence: "This phenomenon creates a paradox: the most essential workers (nurses, teachers, trash collectors) are often paid the least, while those with the most abstract, arguably useless roles are paid the most."
          },
          questions: [
            { id: "q_w29_p2_1", type: "detail", text: "What is a 'bullshit job' according to David Graeber?", options: ["A job that involves farming.", "A job that is difficult and dirty.", "A job that is essentially pointless, where even the worker believes it shouldn't exist.", "A job that pays very little."], correctAnswer: "A job that is essentially pointless, where even the worker believes it shouldn't exist." },
            { id: "q_w29_p2_2", type: "inference", text: "What does the author imply about the relationship between salary and societal value?", options: ["They are perfectly matched.", "They are often inversely related; essential jobs pay less than useless ones.", "Rich people work harder.", "Teachers are paid too much."], correctAnswer: "They are often inversely related; essential jobs pay less than useless ones." },
            { id: "q_w29_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ],
      vocabulary: [
        { word: "Automation", definition: "The use of largely automatic equipment in a system of manufacturing or other production process." },
        { word: "Destitution", definition: "Poverty so extreme that one lacks the means to provide for oneself." },
        { word: "Paradox", definition: "A seemingly absurd or self-contradictory statement or proposition that when investigated or explained may prove to be well founded or true." },
        { word: "Unconditional", definition: "Not subject to any conditions." },
        { word: "Bureaucracy", definition: "Excessively complicated administrative procedure, seen as characteristic of large organizations." }
      ]
    };
  }

  // Week 30: Nostalgia Marketing (Media)
  if (weekNum === 30) {
    return {
      id: 30,
      title: "Genetic Engineering",
      theme: "Ethics",
      mainIdeaHint: "If we can edit our children's genes, should we?",
      passages: [
        {
          passage: {
            title: "Somatic vs. Germline Editing",
            wordCount: 475,
            content: `
              <p>In the last decade, science has found a new tool called CRISPR-Cas9. It works like "molecular scissors" to cut and change DNA. Scientists use it in two ways: **"somatic"** and **"germline"** editing. Somatic editing changes cells in one person to cure a disease, like sickle cell anemia. These changes stop with that person. This is like surgery—it fixes the patient but doesn't change the species.</p>
              <p>**Germline editing** is different. It changes the DNA in an embryo or egg. These changes will be passed down to all future children and grandchildren. This crosses an ethical line. Supporters say it could wipe out diseases like Huntington's forever. They argue we have a moral duty to save future babies from pain.</p>
              <p><u>Critics, however, argue that germline editing is an act of dangerous hubris that treats human biology as a software code to be optimized.</u> They worry about "eugenics," or trying to design perfect humans. If we edit for health, will we soon edit for height or intelligence? This could create a "genetic aristocracy," where rich people buy better genes for their kids, making inequality permanent.</p>
              <p>Also, the unborn child cannot say yes to having their DNA changed. We are making permanent choices for people who don't exist yet, with risks we don't fully understand.</p>
            `,
            underlinedSentence: "Critics, however, argue that germline editing is an act of dangerous hubris that treats human biology as a software code to be optimized."
          },
          questions: [
            { id: "q_w30_p1_1", type: "detail", text: "What is the key difference between somatic and germline editing?", options: ["Somatic is cheaper.", "Somatic affects only the patient, while germline changes are passed to future generations.", "Germline takes place in a hospital.", "Somatic editing uses lasers."], correctAnswer: "Somatic affects only the patient, while germline changes are passed to future generations." },
            { id: "q_w30_p1_2", type: "inference", text: "Why do critics fear germline editing could lead to inequality?", options: ["Because it is too fast.", "Because wealthy parents might buy genetic enhancements for their children.", "Because insurance won't pay for it.", "Because it hurts."], correctAnswer: "Because wealthy parents might buy genetic enhancements for their children." },
            { id: "q_w30_p1_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "The Precautionary Principle",
            wordCount: 460,
            content: `
              <p>When facing powerful new tech like CRISPR or AI, many experts use **"The Precautionary Principle."** This rule says that if an action might cause harm, the person doing it must prove it is safe first. It means "look before you leap." Usually, science keeps going until we find a problem. But for things that can't be undone—like changing the human species—the Precautionary Principle says we should be extra careful.</p>
              <p>Critics say this rule stops progress. They argue that all new things have risks. If we demanded perfect safety, we would never have invented vaccines or planes. They prefer a "Proactionary Principle," which says we should focus on the benefits and manage the risks as they happen.</p>
              <p><u>The debate between precaution and proaction is the defining conflict of our time; as our technological power grows, the cost of a mistake grows with it.</u> When we invented the steam engine, a mistake might blow up a building. With genetic engineering, a mistake could change humanity forever. Can we afford to learn from mistakes when the mistakes might be fatal?</p>
              <p>We need "Scientific Citizenship." We can't let scientists or companies decide alone. Every person needs to understand these tools so we can vote on how to use them.</p>
            `,
            underlinedSentence: "The debate between precaution and proaction is the defining conflict of our time; as our technological power grows, the cost of a mistake grows with it."
          },
          questions: [
            { id: "q_w30_p2_1", type: "detail", text: "What does the Precautionary Principle state?", options: ["Science is always right.", "The burden of proof falls on those taking an action to prove it is not harmful.", "We should take big risks.", "Innovation is bad."], correctAnswer: "The burden of proof falls on those taking an action to prove it is not harmful." },
            { id: "q_w30_p2_2", type: "inference", text: "What is the main argument against the Precautionary Principle?", options: ["It protects the environment.", "It might stifle innovation and progress because all progress involves risk.", "It is too hard to understand.", "It costs too much money."], correctAnswer: "It might stifle innovation and progress because all progress involves risk." },
            { id: "q_w30_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ],
      vocabulary: [
        { word: "Hubris", definition: "Excessive pride or self-confidence." },
        { word: "Eugenics", definition: "The study of how to arrange reproduction within a human population to increase the occurrence of heritable characteristics regarded as desirable." },
        { word: "Precautionary", definition: "Carried out as a precaution; preventive." },
        { word: "Irreversible", definition: "Not able to be undone or altered." },
        { word: "Consensus", definition: "A general agreement." }
      ]
    };
  }

  // Week 31: Renewable Energy Transition (Global)
  if (weekNum === 31) {
    return {
      id: 31,
      title: "Renewable Energy",
      theme: "Global",
      mainIdeaHint: "If we make energy cheaper, do we use less of it?",
      passages: [
        {
          passage: {
            title: "The Jevons Paradox",
            wordCount: 470,
            content: `
              <p>In 1865, economist William Stanley Jevons noticed something strange. James Watt had just made the steam engine more efficient, so it used less coal. Logic said this should result in less coal being used overall. Instead, coal use exploded. This is the **"Jevons Paradox"**: when technology makes a resource easier and cheaper to use, we end up using more of it, not less.</p>
              <p>Why does this happen? Efficiency saves money, which encourages people to use the resource for new things. Today, we see this with energy. We have better insulation and LED lights, but global energy demand keeps rising. If we make our devices "greener" but simply buy more of them, we are not fixing the problem. We are just expanding the scale of our consumption.</p>
              <p><u>This suggests that technology alone cannot solve climate change; without policies that limit absolute consumption (like carbon caps), efficiency gains will simply be eaten up by economic growth.</u> We cannot engineer our way out of a problem caused by endless demand.</p>
              <p>The Jevons Paradox shows us a hard truth: "green growth" might be a contradiction. As long as our economy demands constant growth, efficiency will be used to produce more, not to conserve.</p>
            `,
            underlinedSentence: "This suggests that technology alone cannot solve climate change; without policies that limit absolute consumption (like carbon caps), efficiency gains will simply be eaten up by economic growth."
          },
          questions: [
            { id: "q_w31_p1_1", type: "detail", text: "What did William Stanley Jevons observe about coal consumption?", options: ["It went down when engines got efficient.", "It stayed the same.", "It increased as engines became more efficient because the resource became more useful/cheaper.", "It was banned."], correctAnswer: "It increased as engines became more efficient because the resource became more useful/cheaper." },
            { id: "q_w31_p1_2", type: "inference", text: "Why might 'green growth' be an oxymoron according to the passage?", options: ["Because green is not a good color for money.", "Because growth implies more consumption, which negates efficiency gains.", "Because trees don't grow in cities.", "Because solar panels are expensive."], correctAnswer: "Because growth implies more consumption, which negates efficiency gains." },
            { id: "q_w31_p1_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "The Hidden Cost of Clean Energy",
            wordCount: 455,
            content: `
              <p>Solar panels and electric cars (EVs) are clean when they run, but making them is dirty. The switch to green energy needs huge amounts of minerals like lithium, cobalt, and copper. These are the "building blocks" of batteries. Mining them often destroys local environments and harms workers. The rush for "clean" energy in rich countries often relies on "dirty" mining in poorer ones.</p>
              <p>For example, in the Democratic Republic of Congo, cobalt mining often involves child labor and dangerous conditions. In Chile, lithium mining uses up vast amounts of water in the desert, hurting local farmers. <u>This creates a "green paradox": in our rush to save the global climate, we may be devastating local environments and communities in the developing world.</u> We are solving one problem but creating another.</p>
              <p>A true solution must fix these supply chains. We need a **"circular economy"** where we recycle old batteries instead of always mining new rocks. We also need new types of batteries that don't use rare metals. Energy justice means the benefits of the green revolution must be shared by everyone, not just the rich.</p>
              <p>We must face the fact that there is no "free lunch" in physics. Every energy source has a cost. The goal is to find the option with the fewest harms and be honest about the trade-offs.</p>
            `,
            underlinedSentence: "This creates a \"green paradox\": in our rush to save the global climate, we may be devastating local environments and communities in the developing world."
          },
          questions: [
            { id: "q_w31_p2_1", type: "detail", text: "What minerals are mentioned as essential for the green transition?", options: ["Gold and Silver.", "Iron and Steel.", "Lithium, cobalt, and copper.", "Coal and Oil."], correctAnswer: "Lithium, cobalt, and copper." },
            { id: "q_w31_p2_2", type: "inference", text: "What does the 'green paradox' refer to?", options: ["That green energy is actually black.", "The idea that saving the global climate might cause local environmental or social harm elsewhere.", "That batteries don't work.", "That the sun doesn't shine enough."], correctAnswer: "The idea that saving the global climate might cause local environmental or social harm elsewhere." },
            { id: "q_w31_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ],
      vocabulary: [
        { word: "Intermittent", definition: "Not continuous; happening at irregular intervals." },
        { word: "Imperative", definition: "Of vital importance; crucial." },
        { word: "Paradox", definition: "A situation that seems self-contradictory but may be true." },
        { word: "Sustainable", definition: "Able to be maintained at a certain rate or level." },
        { word: "Supply Chain", definition: "The sequence of processes involved in the production and distribution of a commodity." }
      ]
    };
  }

  // Week 32: Arts in School (Education)
  if (weekNum === 32) {
    return {
      id: 32,
      title: "Arts in Education",
      theme: "Education",
      mainIdeaHint: "Defend the 'useless' subjects. How does creativity feed logic?",
      passages: [
        {
          passage: {
            title: "The Case for STEAM, not just STEM",
            wordCount: 475,
            content: `
              <p>Schools have been focusing on STEM (Science, Technology, Engineering, and Math) to help students get good jobs. This emphasis often leads to cutting funds for music, art, and drama. Many people think arts are just "nice to have," not essential. But this is a mistake. The arts are key to helping students think clearly and creatively.</p>
              <p>This is why some schools are pushing for **"STEAM"**—adding "A" for Art. Studies show that learning art helps in other subjects. For example, learning music helps the brain understand patterns, which is useful for math. Drawing teaches students to observe details, which is critical for doctors and engineers.</p>
              <p>Also, the arts teach "soft skills" like empathy and teamwork. In a world full of Artificial Intelligence, these human skills are more important than ever. <u>Education should not be a factory for producing workers, but a garden for growing whole human beings; stripping away the arts deprives students of the tools they need to express themselves and understand the human condition.</u></p>
              <p>Finally, the "creative economy" is huge. Jobs in game design, advertising, and film need people who understand both technology and beauty. By ignoring the arts, we risk creating a workforce that can compute but cannot create.</p>
            `,
            underlinedSentence: "Education should not be a factory for producing workers, but a garden for growing whole human beings; stripping away the arts deprives students of the tools they need to express themselves and understand the human condition."
          },
          questions: [
            { id: "q_w32_p1_1", type: "detail", text: "How does learning music help with math, according to the passage?", options: ["It helps you count beats.", "It strengthens the brain's ability to process patterns.", "It relaxes you.", "It doesn't help at all."], correctAnswer: "It strengthens the brain's ability to process patterns." },
            { id: "q_w32_p1_2", type: "inference", text: "The metaphor of education as a 'factory' suggests:", options: ["Schools are dirty.", "Students are treated like identical products on an assembly line.", "Teachers are robots.", "We need more buildings."], correctAnswer: "Students are treated like identical products on an assembly line." },
            { id: "q_w32_p1_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "The Intersections of Art and Science",
            wordCount: 465,
            content: `
              <p>Many great breakthroughs happen where art meets science. Leonardo da Vinci is the perfect example. He didn't see a wall between drawing human bodies and designing machines. To him, observation was everything. He knew that to draw a muscle right, he had to know how it worked. This helped him imagine flying machines centuries before they were built.</p>
              <p>Modern scientists do this too. Albert Einstein played the violin to help him think about physics. He said, "It is not possible to be a great scientist without being a creative person." The father of neuroscience, Santiago Ramón y Cajal, was an artist who drew detailed pictures of brain cells in order to understand them. For them, art was a tool to see the invisible laws of nature. <u>By separating art and science into rigid silos in our schools, we are limiting the potential for the kind of cross-disciplinary thinking that solves complex problems.</u></p>
              <p>In the tech world, **"Design Thinking"** is a popular method. It uses artistic skills like sketching and empathy to solve problems. An engineer who can tell a story can explain their work better. An architect who understands light can build healthier homes. Real innovation comes from connecting different fields in new ways.</p>
              <p>The problems of the future—like climate change—are too big for one subject alone. We need scientists who think like artists, and artists who understand science. Brilliance lies in the mix.</p>
            `,
            underlinedSentence: "By separating art and science into rigid silos in our schools, we are limiting the potential for the kind of cross-disciplinary thinking that solves complex problems."
          },
          questions: [
            { id: "q_w32_p2_1", type: "detail", text: "Who is mentioned as an example of someone who did not see a boundary between art and science?", options: ["Albert Einstein.", "Leonardo da Vinci.", "Isaac Newton.", "Steve Jobs."], correctAnswer: "Leonardo da Vinci." },
            { id: "q_w32_p2_2", type: "inference", text: "What is the author's main argument for keeping arts in the curriculum?", options: ["To give students a break from hard work.", "To foster cross-disciplinary thinking and innovation.", "To make schools look more beautiful.", "To help students find hobbies."], correctAnswer: "To foster cross-disciplinary thinking and innovation." },
            { id: "q_w32_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ],
      vocabulary: [
        { word: "Utilitarian", definition: "Designed to be useful or practical rather than attractive." },
        { word: "Reductive", definition: "Oversimplifying a complex issue." },
        { word: "Cognitive", definition: "Relating to the mental action or process of acquiring knowledge." },
        { word: "Quintessential", definition: "Representing the most perfect or typical example of a quality or class." },
        { word: "Silo", definition: "A system or process that operates in isolation from others." }
      ]
    };
  }

  // Week 33: Corporate Responsibility (Ethics)
  if (weekNum === 33) {
    return {
      id: 33,
      title: "Corporate Conscience",
      theme: "Ethics",
      mainIdeaHint: "Shift from 'Shareholder' to 'Stakeholder'. Who does a company owe?",
      passages: [
        {
          passage: {
            title: "Shareholder vs. Stakeholder Capitalism",
            wordCount: 470,
            content: `
              <p>For a long time, the main rule for companies was **"Shareholder Primacy."** This idea, made famous by economist Milton Friedman, said a company's only job was to make money for its owners (shareholders). Doing good things for the environment or community was seen as a waste of money. This focus on profit helped companies grow, but it also caused problems like pollution and inequality.</p>
              <p>Now, a new idea called **"Stakeholder Capitalism"** is rising. This says a company is responsible to everyone it touches (stakeholders)—including workers, customers, and the planet. In 2019, major CEOs agreed that companies must serve all these groups, not just investors.</p>
              <p>A key term here is the **"Triple Bottom Line"**: People, Planet, Profit. This means success isn't just about money. <u>A business that destroys the society in which it operates is ultimately cannibalizing its own future; therefore, ethical responsibility is not just charity, but a necessary strategy for long-term survival.</u> For example, if a factory pollutes the local water, it hurts the workers who live there, which eventually hurts the business.</p>
              <p>Critics worry that trying to please everyone will make companies inefficient. But in a world where everyone has a smartphone, companies can't hide their bad actions. Today, being good is good for business.</p>
            `,
            underlinedSentence: "A business that destroys the society in which it operates is ultimately cannibalizing its own future; therefore, ethical responsibility is not just charity, but a necessary strategy for long-term survival."
          },
          questions: [
            { id: "q_w33_p1_1", type: "detail", text: "Who are 'stakeholders'?", options: ["Only shareholders.", "Employees, customers, community, environment, and investors.", "Government officials.", "People who eat steak."], correctAnswer: "Employees, customers, community, environment, and investors." },
            { id: "q_w33_p1_2", type: "inference", text: "The author suggests that ethical responsibility is:", options: ["A waste of money.", "A necessary strategy for long-term survival.", "Only for charity.", "A legal burden."], correctAnswer: "A necessary strategy for long-term survival." },
            { id: "q_w33_p1_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "The Rise of Greenwashing",
            wordCount: 460,
            content: `
              <p>As people start caring more about nature, companies want to look "green" to get their money. This has led to **"Greenwashing"**—when a company pretends to be eco-friendly but isn't. They might use green packaging or words like "all-natural," while still polluting the air or water.</p>
              <p>Greenwashing can be a big lie, like when a car company cheats on emissions tests. Or it can be a small trick, like highlighting one recycled part of a product while ignoring the rest. These tricks exploit our desire to do good.</p>
              <p><u>Greenwashing is not just a marketing trick; it is a dangerous form of deception that allows companies to profit from our conscience while delaying the real systemic changes needed to protect the planet.</u> It makes people cynical. When we see false claims everywhere, we stop believing in the real ones. It also makes us feel like we are solving climate change by shopping, which hides the need for bigger changes.</p>
              <p>To stop this, governments are making stricter rules for ads. Customers are also getting smarter, looking for proof behind the slogans. In the end, honesty is the only way forward. Companies that want to look green must actually *be* green.</p>
            `,
            underlinedSentence: "Greenwashing is not just a marketing trick; it is a dangerous form of deception that allows companies to profit from our conscience while delaying the real systemic changes needed to protect the planet."
          },
          questions: [
            { id: "q_w33_p2_1", type: "detail", text: "What is 'greenwashing'?", options: ["Washing clothes with environmentally friendly soap.", "Making misleading claims about the environmental benefits of a product.", "Planting trees to offset carbon emissions.", "Painting buildings green."], correctAnswer: "Making misleading claims about the environmental benefits of a product." },
            { id: "q_w33_p2_2", type: "inference", text: "What is the danger of greenwashing mentioned in the text?", options: ["It is too expensive.", "It tricks consumers and delays actual systemic environmental changes.", "It makes products look ugly.", "It causes pollution."], correctAnswer: "It tricks consumers and delays actual systemic environmental changes." },
            { id: "q_w33_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ],
      vocabulary: [
        { word: "Doctrine", definition: "A set of beliefs held and taught by a group." },
        { word: "Stakeholder", definition: "A person with an interest or concern in something, especially a business." },
        { word: "Cannibalize", definition: "To reduce the sales or profit of a company's own products by introducing a new one; here, to destroy one's own support system." },
        { word: "Greenwashing", definition: "Misleading marketing used to portray a company as environmentally friendly." },
        { word: "Deception", definition: "The action of deceiving someone." }
      ]
    };
  }

  // Week 34: Clickbait Culture (Media)
  if (weekNum === 34) {
    return {
      id: 34,
      title: "Clickbait Culture",
      theme: "Media",
      mainIdeaHint: "Analyze the mechanics of curiosity. Why are you manipulated to click?",
      passages: [
        {
          passage: {
            title: "You Won't Believe How This Headline Manipulates You",
            wordCount: 470,
            content: `
              <p>In the digital age, attention is money. Apps and websites fight for your eyes. Their main tool is **"Clickbait"**—headlines designed to make you click. They use the **"Curiosity Gap"**: they tell you just enough to make you curious, but you have to click to find the answer. When you see "You Won't Believe This," your brain feels an urge to know more.</p>
              <p>This seems harmless, but it changes how news is made. In the past, newspapers made money from subscriptions, so they cared about trust. Now, websites make money from clicks. This creates a "race to the bottom," where shock and anger are more important than truth. If a story isn't wild or scary, it doesn't get clicks.</p>
              <p><u>By rewarding sensation over substance, we have created an information ecosystem that feeds us intellectual junk food, satisfying our momentary cravings while leaving us malnourished in our understanding of the world.</u> We become "skimmers," reading headlines but never understanding the full story. We snack on information without digesting it.</p>
              <p>To fix this, we need "intentional consumption." We should choose what we read, not just scroll until something grabs us. We must learn to ignore the tricks and support writers who care about the truth.</p>
            `,
            underlinedSentence: "By rewarding sensation over substance, we have created an information ecosystem that feeds us intellectual junk food, satisfying our momentary cravings while leaving us malnourished in our understanding of the world."
          },
          questions: [
            { id: "q_w34_p1_1", type: "detail", text: "What is the 'curiosity gap'?", options: ["A hole in the ground.", "The difference between what you know and what you want to know.", "Being bored.", "A type of website."], correctAnswer: "The difference between what you know and what you want to know." },
            { id: "q_w34_p1_2", type: "inference", text: "Why do publishers use clickbait?", options: ["They want to be funny.", "They want to earn money from ad views.", "They lack writing skills.", "They want to educate the public."], correctAnswer: "They want to earn money from ad views." },
            { id: "q_w34_p1_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "The Danger of Doomscrolling",
            wordCount: 465,
            content: `
              <p>Clickbait often uses fear because bad news grabs our attention faster than good news. This leads to **"Doomscrolling"**—looking at bad news on your phone for hours, even when it makes you sad. Our brains are built to look for danger to stay safe. But social media tricks this survival instinct to keep us watching.</p>
              <p>Algorithms on apps like TikTok or X (Twitter) want you to stay online. They know that angry or scared people stay longer. So, if you look at one disaster story, they show you ten more. <u>The result is an audience that is perpetually on edge, reacting to the latest crisis rather than thinking deeply about long-term solutions.</u> This causes "information fatigue," where people feel helpless and stop trying to fix anything.</p>
              <p>Doomscrolling also hurts our mental health. It can make us anxious and depressed. The world on our screen feels much more dangerous than the real world. We start to think everything is bad, ignoring the slow progress happening around us.</p>
              <p>To fight this, we need **"Digital Mindfulness."** We must notice when an app is making us upset and turn it off. We need to set limits and look for positive news too. By taking control of our attention, we can stop being victims of the algorithm.</p>
            `,
            underlinedSentence: "The result is an audience that is perpetually on edge, reacting to the latest crisis rather than thinking deeply about long-term solutions."
          },
          questions: [
            { id: "q_w34_p2_1", type: "detail", text: "What is 'doomscrolling'?", options: ["Scrolling through fantasy art.", "Continuously scrolling through bad news despite it being disheartening.", "Playing video games for too long.", "Watching gardening videos."], correctAnswer: "Continuously scrolling through bad news despite it being disheartening." },
            { id: "q_w34_p2_2", type: "inference", text: "Why do algorithms prioritize negative content?", options: ["Because they are evil.", "Because fear and outrage keep users engaged on the platform longer.", "Because there is no good news.", "Because positive news is too expensive to produce."], correctAnswer: "Because fear and outrage keep users engaged on the platform longer." },
            { id: "q_w34_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ],
      vocabulary: [
        { word: "Commodification", definition: "Treating something like a product to be bought and sold." },
        { word: "Virality", definition: "The tendency of an image, video, or piece of information to be circulated rapidly and widely from one Internet user to another." },
        { word: "Nuance", definition: "A subtle difference in or shade of meaning, expression, or sound." },
        { word: "Disheartening", definition: "Causing someone to lose determination or confidence; discouraging." },
        { word: "Diet", definition: "The kinds of food (or here, information) that a person habitually consumes." }
      ]
    };
  }

  // Week 35: Endangered Languages (Global)
  if (weekNum === 35) {
    return {
      id: 35,
      title: "Endangered Languages",
      theme: "Global",
      mainIdeaHint: "Language is culture. When a tongue dies, a world view disappears.",
      passages: [
        {
          passage: {
            title: "Silenced Voices: The Loss of Linguistic Diversity",
            wordCount: 475,
            content: `
              <p>Experts say half of the 7,000 languages spoken today will die by the year 2100. This is a "mass extinction" of human culture. It happens because of globalization. Rural people move to cities and switch to "super-languages" like English or Mandarin to get jobs. A language is not just words; it is a library of history and stories.</p>
              <p>When a language dies, we lose knowledge. Indigenous languages often have names for plants and medicine that science doesn't know yet. This is **"traditional ecological knowledge."** When the last speaker dies, this wisdom disappears. It is like burning a book of unique secrets about nature.</p>
              <p>Also, language shapes how we think. Some languages have no words for "left" and "right," using "north" and "south" instead. This gives speakers amazing navigation skills. <u>We often mourn the loss of biological species, yet we should be equally alarmed by the loss of linguistic diversity, for each language represents a unique experiment in what it means to be human.</u> Losing a language means losing a unique way of seeing the world.</p>
              <p>Today, technology can hurt or help. Search engines work best in big languages, creating a "digital divide." But apps can also help people learn and save endangered languages. Saving a language isn't just about the past; it's about keeping our species smart and diverse.</p>
            `,
            underlinedSentence: "We often mourn the loss of biological species, yet we should be equally alarmed by the loss of linguistic diversity, for each language represents a unique experiment in what it means to be human."
          },
          questions: [
            { id: "q_w35_p1_1", type: "inference", text: "Why does the author compare languages to biological species?", options: ["Both are made of cells.", "Both are essential components of global diversity and are currently under threat.", "Both can be found in a lab.", "Languages are alive."], correctAnswer: "Both are essential components of global diversity and are currently under threat." },
            { id: "q_w35_p1_2", type: "detail", text: "What is the main driver of language extinction mentioned?", options: ["War.", "Globalization and the dominance of major languages.", "Lack of teachers.", "The internet."], correctAnswer: "Globalization and the dominance of major languages." },
            { id: "q_w35_p1_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        },
        {
          passage: {
            title: "The Miracle of Hebrew: A Language Reborn",
            wordCount: 460,
            content: `
              <p>Most endangered languages fade away, but Hebrew came back. For 2,000 years, Hebrew was only used for prayer. Nobody spoke it as a daily language. Then, in the late 1800s, Eliezer Ben-Yehuda started a movement to revive it. He believed a nation needed its own language. He raised his son to speak only Hebrew, making him the first native speaker in centuries.</p>
              <p>It wasn't easy. Ancient Hebrew had no words for modern things like "ice cream" or "bicycle." <u>This required the creation of thousands of new words for modern concepts—from "electricity" to "airplane"—that did not exist in biblical texts.</u> Ben-Yehuda invented these words using old roots. Today, millions of people speak Modern Hebrew.</p>
              <p>Hebrew proves that language death isn't final. It takes hard work, schools, and pride to bring a language back. Now, people trying to save languages like Maori in New Zealand and Welsh in the UK look at Hebrew as a model.</p>
              <p>Reviving a language is about identity. It connects us to our ancestors. While the world is becoming more the same, language helps us keep our unique cultures alive. It gives us the words to describe our changing world.</p>
            `,
            underlinedSentence: "This required the creation of thousands of new words for modern concepts—from \"electricity\" to \"airplane\"—that did not exist in biblical texts."
          },
          questions: [
            { id: "q_w35_p2_1", type: "detail", text: "How did Hebrew survive for 2,000 years before its revival?", options: ["As a secret code.", "As a sacred tongue for scripture and prayer.", "In remote villages.", "It didn't survive at all."], correctAnswer: "As a sacred tongue for scripture and prayer." },
            { id: "q_w35_p2_2", type: "inference", text: "What was a major challenge in reviving Hebrew for the modern world?", options: ["Nobody wanted to speak it.", "It lacked vocabulary for modern concepts like technology.", "It was too hard to write.", "There were no books."], correctAnswer: "It lacked vocabulary for modern concepts like technology." },
            { id: "q_w35_p2_p", type: "paraphrase", text: "Paraphrase the underlined sentence." }
          ]
        }
      ],
      vocabulary: [
        { word: "Extinct", definition: "No longer in existence." },
        { word: "Repository", definition: "A place, container, or person where things are stored." },
        { word: "Revitalization", definition: "The action of imbueing something with new life and vitality." },
        { word: "Blueprint", definition: "A design plan or other technical drawing; here, a guide or model." },
        { word: "Sacred", definition: "Connected with God or dedicated to a religious purpose." }
      ]
    };
  }

  // Week 36: Gamification in Learning (Education)

  if (weekNum === 36) {
    return {
      id: 36,
      title: "Gamification",
      theme: "Education",
      mainIdeaHint: "Does points-based learning help or hurt? Compare classroom vs. workplace logic.",
      passages: [
        {
          passage: {
            title: "Level Up: Gamification in the Classroom",
            wordCount: 470,
            content: `
              <p>Gamification is the practice of using game design mechanics in non-game contexts like the classroom. These mechanics include experience points (XP), leaderboards, badges, and quest-like progression. At its core, gamification seeks to "hack" the brain's reward system. It targets the release of dopamine, a chemical associated with achievement. In a well-designed gamified environment, students aren't just memorizing facts. They are "leveling up" their knowledge, embarking on "learning quests," and receiving immediate feedback. This approach can turn the often-dry process of education into an engaging experience that mimics the pull of popular video games. The goal is to maximize "Engagement," making learning as addictive as a mobile app.</p>
              <p>Proponents of gamification point to the psychological concept of "Flow." This is a state of deep focus where a person is so absorbed in an activity that they lose track of time. Games are experts at creating flow by balancing the difficulty of a challenge with the player's skill level. When applied to education, this means students are constantly pushed to the edge of their capabilities without being overwhelmed. Entire schools, such as "Quest to Learn" in New York City, have been designed around these principles. In these schools, the curriculum is organized into "Boss Battles" and "Missions" rather than traditional exams. Apps like Duolingo also use these mechanics to keep millions of users engaged, proving that the desire for digital "streaks" can be a powerful motivator.</p>
              <p>However, the use of game mechanics in education is not without its critics. Some psychologists warn about the "Overjustification Effect." This occurs when providing external rewards (points, badges) for an interesting activity destroys intrinsic motivation. <u>However, critics warn that relying too heavily on points can destroy intrinsic motivation, turning education into a transactional 'chase for the next high score.'</u> Once the "points" are removed, the student may lose their desire to learn for the sake of curiosity. Critics argue that this shallow form of engagement creates "Skinner Box" students who only perform when a reward is promised. Education should be about the pursuit of wisdom for its own sake, not the accumulation of digital tokens.</p>
              <p>The challenge for modern educators is to use gamification as a scaffolding tool rather than a crutch. The goal should be "Meaningful Gamification," where game elements reinforce learning objectives rather than distracting from them. For example, a "leaderboard" might encourage healthy competition, but it could also discourage struggling students who feel they can never win. A truly effective system focuses on individual mastery and the "journey" of learning rather than just the destination. It ensures that the student is motivated by the growth of their own mind, even if there isn't a badge waiting at the end. We must design specific systems that value "Deep Learning" over "Quick Wins."</p>
            `,
            underlinedSentence: "However, critics warn that relying too heavily on points can destroy intrinsic motivation, turning education into a transactional 'chase for the next high score.'"
          },
          questions: [
            {
              id: "q_w36_p1_1",
              type: "detail",
              text: "What is 'gamification' in education?",
              options: ["Playing video games in class.", "Using game mechanics like points and leaderboards to motivate students.", "Removing all tests.", "Building computers."],
              correctAnswer: "Using game mechanics like points and leaderboards to motivate students."
            },
            {
              id: "q_w36_p1_2",
              type: "inference",
              text: "A risk of gamification mentioned is:",
              options: ["It is too expensive.", "It may replace natural curiosity with a focus on external rewards.", "Students will stop playing games.", "Teachers will lose their jobs."],
              correctAnswer: "It may replace natural curiosity with a focus on external rewards."
            },
            {
              id: "q_w36_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "Gamification in the Workplace",
            wordCount: 465,
            content: `
              <p>Gamification is not limited to the classroom; it has firmly entrenched itself in the modern workplace. Companies like Uber, Amazon, and Target use game-like mechanics to manage their flexible workforces. For an Uber driver, the app might flash a "Quest" offering a bonus for completing a certain number of rides in a row. At an Amazon warehouse, workers might play a digital game where they race against a dragon or a sports rival to fulfill orders. These systems use the same dopamine-driven loops as video games to increase productivity and engagement. By turning work into a game, companies can extract more effort from employees without necessarily paying them more.</p>
              <p>Proponents argue that this makes repetitive work more fun and rewarding. It provides clear goals and immediate feedback, which can be motivating. However, critics view it as a form of "Electronic Taylorism"—using technology to control every movement of a worker. <u>While gamification can boost productivity, critics argue it turns employees into data points, stripping away their autonomy and dignity.</u> Instead of a human manager, an algorithm nudges workers to work faster and longer. This can lead to burnout and a sense of constant surveillance. This "Quantified Self" at work means every pause, every mistake, and every second of efficiency is tracked and scored.</p>
              <p>Furthermore, workplace gamification often relies on "Dark Patterns." These are design choices that manipulate users into doing things they might not want to do. For example, an app might use a "Sunk Cost Fallacy" by showing a driver they are only one ride away from a goal, encouraging them to stay on the road when they are tired. This blurs the line between motivation and manipulation. The "Nudge Theory" behind these designs exploits human psychology to prioritize the company's metrics over the worker's well-being.</p>
              <p>The ethical challenge is to use these tools to empower workers, not just to extract more labor from them. True engagement comes from fair pay, respect, and a sense of purpose, not just digital badges. As work becomes more digitized, we must ensure that the "game" is fair for the players, not just for the house. If the "Gamified Workplace" becomes the norm, we risk creating a future where we are all just "NPCs" (Non-Player Characters) in someone else's profit-maximizing simulation.</p>
            `,
            underlinedSentence: "While gamification can boost productivity, critics argue it turns employees into data points, stripping away their autonomy and dignity."
          },
          questions: [
            {
              id: "q_w36_p2_1",
              type: "detail",
              text: "How do companies like Uber use gamification?",
              options: ["To help drivers learn maps.", "To offer bonuses for completing specific 'quests' or ride targets.", "To lower gas prices.", "To make cars faster."],
              correctAnswer: "To offer bonuses for completing specific 'quests' or ride targets."
            },
            {
              id: "q_w36_p2_2",
              type: "inference",
              text: "Why might critics disapprove of workplace gamification?",
              options: ["It is too expensive.", "It creates a fun environment.", "It can manipulate workers and reduce their autonomy.", "It awards too much money."],
              correctAnswer: "It can manipulate workers and reduce their autonomy."
            },
            {
              id: "q_w36_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Entrenched", definition: "Firmly established and difficult or unlikely to change; ingrained." },
        { word: "Autonomy", definition: "The right or condition of self-government; freedom from external control." },
        { word: "Surveillance", definition: "Close observation, especially of a suspected spy or criminal." },
        { word: "Manipulation", definition: " The action of manipulating something in a skillful manner." },
        { word: "Incentive", definition: "A thing that motivates or encourages one to do something." }
      ]
    };
  }

  // Week 37: The Right to Repair (Ethics)
  if (weekNum === 37) {
    return {
      id: 37,
      title: "Right to Repair",
      theme: "Ethics",
      mainIdeaHint: "If you bought it, do you truly own it?",
      passages: [
        {
          passage: {
            title: "Built to Break",
            wordCount: 470,
            content: `
              <p>In the past, if a toaster or a tractor broke, you fixed it. You opened it up, found the broken part, and replaced it. Today, this is becoming impossible. Modern electronics are often glued shut, use "proprietary screws" (like the Pentalobe), or require software codes that only the manufacturer possesses. This phenomenon is known as "Planned Obsolescence," a strategy where products are designed with an artificially limited lifespan. The most famous historical example is the "Phoebus Cartel" of the 1920s, where lightbulb manufacturers secretly agreed to limit the life of bulbs to 1,000 hours to sell more replacements. Today, this practice has evolved into a digital form, where software updates can slow down older phones or disable features if unauthorized parts are detected.</p>
              <p>This creates a monopolistic control over the product even after it has been sold, a concept some economists call "Techno-Feudalism." <u>Manufacturers deliberately design products to be difficult or impossible to repair, forcing consumers to participate in a cycle of endless consumption.</u> For farmers using John Deere tractors, this means they cannot fix their own machinery during a critical harvest. They must wait for an authorized technician to plug in a specialized laptop, costing time and money. For smartphone owners, "Part Pairing" ensures that even genuine replacement parts won't work unless activated by the manufacturer's server. This erodes the fundamental concept of ownership. If you cannot fix your property, do you truly own it, or are you merely renting it from the corporation?</p>
              <p>The environmental cost of this disposable culture is staggering. Electronic waste (e-waste) is the fastest-growing waste stream in the world, with over 50 million metric tons generated annually. Millions of fixable devices end up in landfills, ignoring the principles of a "Circular Economy." These devices contain rare earth metals like gold, cobalt, and lithium, which are toxic to mine and toxic to dump. By prematurely discarding these complex machines, we are throwing away valuable resources and polluting the planet. The energy required to manufacture a new smartphone is equal to the energy it consumes over ten years of use, making longevity the key to sustainability.</p>
              <p>Critics, primarily large tech companies, argue that restricted repair is necessary for safety and security. They claim that unauthorized repairs could cause batteries to explode or allow "Hackers" to bypass security features. However, advocates argue these are excuses to protect lucrative repair monopolies and product sales. They point out that cars have been repairable by independent mechanics for decades without catastrophic results. The "Right to Repair" is about restoring the balance of power between the creator and the user, ensuring that technology serves us rather than controlling us.</p>
            `,
            underlinedSentence: "Manufacturers deliberately design products to be difficult or impossible to repair, forcing consumers to participate in a cycle of endless consumption."
          },
          questions: [
            {
              id: "q_w37_p1_1",
              type: "detail",
              text: "What is 'Planned Obsolescence'?",
              options: ["Designing a product to last forever.", "Designing a product with an artificially limited useful life.", "Planning a party.", "Buying old things."],
              correctAnswer: "Designing a product with an artificially limited useful life."
            },
            {
              id: "q_w37_p1_2",
              type: "inference",
              text: "Why is 'Right to Repair' an environmental issue?",
              options: ["Repairing things uses too much energy.", "It prevents fixable devices from becoming e-waste in landfills.", "Old things are ugly.", "New things are always better."],
              correctAnswer: "It prevents fixable devices from becoming e-waste in landfills."
            },
            {
              id: "q_w37_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "The Repair Revolution",
            wordCount: 460,
            content: `
              <p>A global "Right to Repair" movement is fighting back against the tide of disposability. Activists, hackers, and legislators are pushing for laws that require companies to provide service manuals, spare parts, and diagnostic tools to the public on fair terms. In 2021, the movement achieved significant victories. The European Union implemented "Eco-Design" directives, and New York State passed the "Digital Fair Repair Act." France has gone a step further, requiring a "Repairability Score" (from 1 to 10) to be displayed on electronics at the point of sale. This simple label uses market forces to encourage better design, as consumers naturally gravitate toward more durable and fixable products.</p>
              <p>This movement is not just about saving money; it is about "Technological Sovereignty." It empowers individuals to understand and control the tools they depend on. <u>The 'Right to Repair' movement is not just about fixing phones; it is about reclaiming ownership of our property and reducing the mountain of toxic e-waste.</u> "Repair Cafés" have sprung up in thousands of communities worldwide. In these free meeting places, volunteer "fixers" help their neighbors repair everything from broken lamps to slow laptops. These community hubs foster a culture of care, maintenance, and skill-sharing, countering the "Throwaway Culture" that values constant novelty. Learning to solder a wire or replace a battery changes one's relationship with technology from passive consumer to active master.</p>
              <p>For manufacturers, this shift necessitates a fundamental redesign of their products. Instead of using copious amounts of industrial glue, they must return to using screws. Instead of custom, proprietary chips, they must use standard, replaceable components. Some forward-thinking companies are embracing this, realizing that durability can be a premium selling point. The rise of "Modular Electronics," like the Fairphone or Framework Laptop, demonstrates that high-tech devices can be user-serviceable. A modular phone that can be upgraded over five years is ultimately more valuable—and sustainable—than a fragile glass slab that becomes obsolete in two.</p>
              <p>Ultimately, repair is an act of resistance. It values the immense labor, energy, and resources that went into making an object. By choosing to repair, we choose to respect the planet limits and trust in our own capabilities. It creates a robust "Circular Economy" where materials are kept in use for as long as possible. As we face the challenges of climate change and resource depletion, the most sustainable gadget is the one you already own. Repairing it is a radical act of environmental stewardship.</p>
            `,
            underlinedSentence: "The 'Right to Repair' movement is not just about fixing phones; it is about reclaiming ownership of our property and reducing the mountain of toxic e-waste."
          },
          questions: [
            {
              id: "q_w37_p2_1",
              type: "detail",
              text: "What is a 'Repairability Score'?",
              options: ["A score in a video game.", "A label telling consumers how easy a product is to repair.", "A price tag.", "A warranty."],
              correctAnswer: "A label telling consumers how easy a product is to repair."
            },
            {
              id: "q_w37_p2_2",
              type: "inference",
              text: "How does the Right to Repair relate to 'Technological Sovereignty'?",
              options: ["It lets the government control technology.", "It empowers individuals to understand and control their own devices.", "It makes technology more expensive.", "It bans computers."],
              correctAnswer: "It empowers individuals to understand and control their own devices."
            },
            {
              id: "q_w37_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Obsolescence", definition: "The process of becoming obsolete or outdated and no longer used." },
        { word: "Proprietary", definition: "Relating to an owner or ownership; often used for technology that is legally restricted." },
        { word: "Monopoly", definition: "The exclusive possession or control of the supply or trade in a commodity or service." },
        { word: "Sovereignty", definition: "Supreme power or authority." },
        { word: "Modular", definition: "Employing or involving a module or modules as the basis of design or construction." }
      ]
    };
  }

  // Week 38: The Influencer Economy (Media)
  if (weekNum === 38) {
    return {
      id: 38,
      title: "Influencer Economy",
      theme: "Media",
      mainIdeaHint: "Is your favorite creator a friend or a billboard?",
      passages: [
        {
          passage: {
            title: "Parasocial Relationships",
            wordCount: 465,
            content: `
              <p>The rise of social media has created a new type of celebrity: the "Influencer." Unlike movie stars who live distant, glamorous lives, influencers build their fame on "Relatability." They vlog their daily routines, share their struggles, and talk directly to the camera as if speaking to a friend. This creates a powerful psychological bond known as a "Parasocial Relationship." Coined by sociologists in the 1950s, this term describes a one-sided relationship where one person extends emotional energy, interest, and time, while the other party represents a persona completely unaware of the other's existence. Today, this bond is the currency of the digital age.</p>
              <p>This intimacy is the engine of the "Creator Economy," an industry now valued at over $100 billion. Because followers trust the influencer, they are more likely to buy what they recommend. Brands know this. They pay billions of dollars for "Sponsored Content" and "Affiliate Marketing." <u>Unlike traditional celebrities, influencers cultivate a sense of intimacy with their followers, blurring the line between genuine friendship and commercial transaction.</u> When a friend recommends a product, you listen. Influencers monetize this trust, effectively turning their social circle into a marketplace. This commercialization of friendship raises profound questions about authenticity and manipulation.</p>
              <p>However, this can lead to exploitation. "Sharenting"—parents sharing their children's lives online for profit—raises ethical questions about consent and privacy. Also, young followers may not realize that the "lifestyle" they are watching is a staged performance. The pressure to buy the "right" makeup or clothes to fit in is immense, often leading to financial strain and feelings of inadequacy. The line between entertainment and advertisement has never been thinner.</p>
              <p>Consumers must develop "Media Literacy" to navigate this new landscape. We must recognize that an influencer is a brand, not a buddy. The content we see is often a curated highlight reel, not reality. Understanding the business incentives behind the post is key to protecting our wallets and our self-esteem. We must ask ourselves: are we engaging with a person, or pitch?</p>
            `,
            underlinedSentence: "Unlike traditional celebrities, influencers cultivate a sense of intimacy with their followers, blurring the line between genuine friendship and commercial transaction."
          },
          questions: [
            {
              id: "q_w38_p1_1",
              type: "detail",
              text: "What is a 'parasocial relationship'?",
              options: ["A relationship between two ghosts.", "A one-sided psychological bond where a viewer feels connected to a media figure.", "A business partnership.", "A family feud."],
              correctAnswer: "A one-sided psychological bond where a viewer feels connected to a media figure."
            },
            {
              id: "q_w38_p1_2",
              type: "inference",
              text: "Why do brands pay influencers?",
              options: ["Because they are nice.", "Because followers trust influencers' recommendations more than traditional ads.", "Because influencers are poor.", "Because the law requires it."],
              correctAnswer: "Because followers trust influencers' recommendations more than traditional ads."
            },
            {
              id: "q_w38_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "The Authenticity Trap",
            wordCount: 460,
            content: `
              <p>In the early days of the internet, "authenticity" was king. People loved the raw, unedited nature of blogs and YouTube videos. It felt like a rebellion against the polished perfection of TV. But as the industry grew, authenticity became a commodity. Now, we see "Staged Authenticity." An influencer might pose in a messy room to look "real," but the lighting and mess are carefully arranged. Even vulnerability—crying on camera or sharing a failure—can be a tactic to gain engagement. This phenomenon, sometimes called "Sadfishing," exploits genuine emotions for clicks and sympathy.</p>
              <p>This creates a paradox. <u>The pressure to perform 'authenticity' for an audience created a paradox where the most 'real' moments are often the most carefully curated and commercialized.</u> For the creators, this leads to "Creator Burnout." They feel they must constantly perform a version of themselves that is both relatable and aspirational. They cannot have a bad day without explaining it to millions, or worse, worrying that it won't be "content-worthy." The line between their public persona and private self erodes, leaving them feeling hollow and objectified.</p>
              <p>For the audience, it creates unrealistic standards. We compare our messy, unedited lives to the "Curated Imperfections" of others. This fuels "Social Comparison Theory," leading to higher rates of anxiety, depression, and body dysmorphia. We must remember that social media is a "Highlight Reel," even when it pretends not to be. Even the "no filter" photos are chosen from hundreds of outtakes.</p>
              <p>The future of the creator economy may lie in smaller, tighter communities rather than massive followings. Subscriptions and direct support (like Patreon) might reduce the reliance on ads and performance. Real connection happens when we stop performing and start being. We need to reclaim our right to be boring, private, and un-monetized.</p>
            `,
            underlinedSentence: "The pressure to perform 'authenticity' for an audience created a paradox where the most 'real' moments are often the most carefully curated and commercialized."
          },
          questions: [
            {
              id: "q_w38_p2_1",
              type: "detail",
              text: "What is 'staged authenticity'?",
              options: ["Acting in a play.", "Creating content that looks raw and real but is actually carefully planned.", "Being honest.", "Lying about your name."],
              correctAnswer: "Creating content that looks raw and real but is actually carefully planned."
            },
            {
              id: "q_w38_p2_2",
              type: "inference",
              text: "How does this affect creators?",
              options: ["They get rich and happy.", "It can lead to burnout and a loss of privacy.", "It makes them better actors.", "It has no effect."],
              correctAnswer: "It can lead to burnout and a loss of privacy."
            },
            {
              id: "q_w38_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Parasocial", definition: "Describing one-sided relationships, where one person extends emotional energy, interest and time, and the other party, the persona, is completely unaware of the other's existence." },
        { word: "Curate", definition: "Select, organize, and look after the items in a collection or exhibition." },
        { word: "Commodity", definition: "A raw material or primary agricultural product that can be bought and sold." },
        { word: "Lucrative", definition: "Producing a great deal of profit." },
        { word: "Literacy", definition: "Competence or knowledge in a specified area." }
      ]
    };
  }

  // Week 39: Fast Fashion (Global)
  if (weekNum === 39) {
    return {
      id: 39,
      title: "Fast Fashion",
      theme: "Global",
      mainIdeaHint: "Your shirt cost $5. Who paid the real price?",
      passages: [
        {
          passage: {
            title: "The High Cost of Cheap Clothing",
            wordCount: 475,
            content: `
              <p>We all love a bargain. A $5 t-shirt feels like a steal. But this cheap clothing comes at a high cost, hidden in the complex supply chains of the "Fast Fashion" industry. This business model relies on rapid production cycles, churning out new trends weekly to encourage constant consumption. To keep prices low, brands often cut corners on labor and environmental safety. The collapse of the Rana Plaza factory in Bangladesh in 2013, which killed over 1,100 garment workers, exposed the deadly reality of this system. Workers were forced to produce clothes for major Western brands in a building known to be structurally unsafe, highlighting the industry's prioritization of profit over human life.</p>
              <p>The environmental impact is equally devastating. The fashion industry is responsible for 10% of global carbon emissions—more than international flights and maritime shipping combined. Producing a single pair of jeans requires over 7,000 liters of water, often diverting this precious resource from local communities. Furthermore, synthetic fabrics like polyester shed millions of "Microplastics" into the oceans with every wash. These tiny particles enter the food chain, harming marine life and eventually ending up on our own plates.</p>
              <p>This "Disposability Culture" creates massive waste. In the US alone, 11 million tons of textile waste end up in landfills each year. Clothing, once a durable good, has become single-use plastic. We buy, wear once for a photo, and discard. <u>This linear "Take-Make-Waste" model is unsustainable on a finite planet.</u></p>
              <p>Critics argue that consumers are complicit. By demanding ever-cheaper clothes, we vote for exploitation with our wallets. However, activists argue that the responsibility lies with the corporations. They call for a "Living Wage" for garment workers and strict environmental regulations. We cannot shop our way out of this crisis; we need systemic change.</p>
            `,
            underlinedSentence: "This linear 'Take-Make-Waste' model is unsustainable on a finite planet."
          },
          questions: [
            {
              id: "q_w39_p1_1",
              type: "detail",
              text: "What is 'Fast Fashion'?",
              options: ["Clothing that makes you run fast.", "A business model based on rapid production and cheap prices.", "Fashion for cars.", "Expensive luxury clothing."],
              correctAnswer: "A business model based on rapid production and cheap prices."
            },
            {
              id: "q_w39_p1_2",
              type: "inference",
              text: "Why is the fashion industry bad for the environment?",
              options: ["It uses too much water and creates carbon emissions and microplastics.", "Clothes are ugly.", "Fashion shows are loud.", "Models are too tall."],
              correctAnswer: "It uses too much water and creates carbon emissions and microplastics."
            },
            {
              id: "q_w39_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "Closing the Loop",
            wordCount: 389,
            content: `
              <p>The solution to the fashion crisis is "Circularity." A "Circular Economy" aims to eliminate waste by keeping materials in use for as long as possible. In fashion, this means designing clothes that are durable, repairable, and recyclable from the very beginning. It implies a shift from "ownership" to "usership." Companies like Rent the Runway and Nuuly allow users to subscribe to a rotating wardrobe, reducing the need to buy new items for every occasion. Outdoor brands like Patagonia have pioneered repair programs, encouraging customers to trade in their worn gear for credit through their "Worn Wear" initiative, proving that profitability does not require endless new production.</p>
              <p>However, "Greenwashing" remains a major obstacle in this transition. Many fast fashion brands launch "Conscious Collections" made with a small percentage of recycled plastic while continuing to churn out billions of cheap, synthetic garments annually. <u>Critics call this 'Greenwashing,' arguing that using a small percentage of recycled material distracts consumers from the brand's overall massive environmental footprint.</u> For instance, a shirt made of recycled bottles is still a shirt that sheds microplastics. True sustainability requires a holistic approach, including fair labor practices and a drastic reduction in total output. We cannot "recycle" our way out of a crisis caused by overconsumption.</p>
              <p>Technology plays a key role, but it is not a silver bullet. Innovations in "Textile-to-Textile" recycling could eventually allow us to turn old t-shirts into new ones without losing quality. Currently, most clothes are "downcycled" into insulation or cleaning rags because separating blended fabrics (like cotton-polyester mixes) is chemically difficult. New methods using enzymes and solvents are promising, but they are not yet scalable. Reliance on future technology can be a dangerous excuse to delay immediate action on reducing production volumes today.</p>
              <p>Ultimately, systemic change requires government intervention. France has led the way with a groundbreaking anti-waste law that bans the destruction of unsold non-food goods. The European Union is implementing a "Digital Product Passport" that will track a garment's journey from raw material to disposal, ensuring transparency. These laws force companies to take financial responsibility for the waste they create. The future of fashion must be slow, circular, and transparent. It requires us to view clothing not as disposable content for social media, but as valuable artifacts of human labor and natural resources.</p>
            `,
            underlinedSentence: "Critics call this 'Greenwashing,' arguing that using a small percentage of recycled material distracts consumers from the brand's overall massive environmental footprint."
          },
          questions: [
            {
              id: "q_w39_p2_1",
              type: "detail",
              text: "What is 'Greenwashing'?",
              options: ["Washing clothes with green soap.", "Deceptive marketing that makes a product seem more environmentally friendly than it is.", "Painting a factory green.", "Planting trees."],
              correctAnswer: "Deceptive marketing that makes a product seem more environmentally friendly than it is."
            },
            {
              id: "q_w39_p2_2",
              type: "inference",
              text: "What is a goal of a 'Circular Economy' in fashion?",
              options: ["To sell more cheap clothes.", "To keep materials in use for as long as possible through repair and recycling.", "To burn old clothes.", "To make clothes out of metal."],
              correctAnswer: "To keep materials in use for as long as possible through repair and recycling."
            },
            {
              id: "q_w39_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Supply Chain", definition: "The sequence of processes involved in the production and distribution of a commodity." },
        { word: "Microplastics", definition: "Extremely small pieces of plastic debris in the environment resulting from the disposal and breakdown of consumer products and industrial waste." },
        { word: "Circularity", definition: "A circular economy is a model of production and consumption, which involves sharing, leasing, reusing, repairing, refurbishing and recycling existing materials and products as long as possible." },
        { word: "Greenwashing", definition: "Disinformation disseminated by an organization so as to present an environmentally responsible public image." },
        { word: "Complicit", definition: "Involved with others in an illegal activity or wrongdoing." }
      ]
    };
  }

  // Week 40: Future of Education (Education)
  if (weekNum === 40) {
    return {
      id: 40,
      title: "The Future of Education",
      theme: "Education",
      mainIdeaHint: "How will technology and economics change how we learn?",
      passages: [
        {
          passage: {
            title: "The Holodeck Classroom",
            wordCount: 460,
            content: `
              <p>Imagine a history class where you don't just read about the Roman Empire; you stand in the center of the Forum as Julius Caesar speaks, hearing the roar of the crowd. This is the promise of "Immersive Learning" through Virtual Reality (VR) and Augmented Reality (AR). Traditional education relies heavily on "Abstract" symbols—text on a page or equations on a board. VR offers "Experiential" learning, hacking the brain's natural ability to learn by doing. Studies show that "Retention Rates" soar when students can physically manipulate virtual objects or walk through historical sites in a digital space. It transforms the student from a passive consumer of information into an active explorer of knowledge.</p>
              <p>However, significant barriers remain before this cyber-utopia becomes a reality. High-quality VR headsets are still prohibitively expensive for many underfunded school districts, risking a "Digital Divide" where only rich schools can afford the future. There is also the challenge of "Simulation Sickness," where the disconnect between visual input and physical motion causes nausea. But as technology improves and costs plummet, the walls of the classroom will eventually dissolve. Students in rural Kansas could dissect a virtual frog with a partner in Tokyo, or explore the surface of Mars during recess. <u>This shift from passive consumption to active immersion promises to democratize experience, making elite educational opportunities available to anyone with a headset.</u> Education will move from "Instruction" to "Discovery," with the teacher serving as a guide in a boundless digital world rather than a lecturer at a podium.</p>
              <p>Critics, however, worry about the implications of increased "Screen Time" and the loss of genuine physical interaction. They argue that VR cannot replace the subtle, non-verbal human connection of a physical classroom. Handshakes, eye contact, and shared laughter are difficult to fully digitize. There is a fear that we might raise a generation that is more comfortable with avatars than with real people, leading to a profound sense of isolation. We must ensure that technology enhances reality, not replaces it, and that the "Metaverse" serves human needs.</p>
              <p>Ultimately, the "Holodeck Classroom" is about solving the crisis of engagement. It turns learning into an adventure rather than a chore. If we can make mastering algebra as exciting and visually stimulating as playing a top-tier video game, we may finally solve the age-old problem of student motivation. The future school isn't a building; it's a simulation that unlocks the infinite potential of the human imagination.</p>
            `,
            underlinedSentence: "This shift from passive consumption to active immersion promises to democratize experience, making elite educational opportunities available to anyone with a headset."
          },
          questions: [
            {
              id: "q_w40_p1_1",
              type: "detail",
              text: "How does VR differ from traditional education described in the text?",
              options: ["VR is cheaper.", "VR offers experiential learning instead of abstract symbols.", "VR doesn't require teachers.", "VR is only for history."],
              correctAnswer: "VR offers experiential learning instead of abstract symbols."
            },
            {
              id: "q_w40_p1_2",
              type: "inference",
              text: "A potential drawback of VR mentioned is:",
              options: ["It makes students smarter.", "Simulation sickness and cost.", "It is too colorful.", "It breaks easily."],
              correctAnswer: "Simulation sickness and cost."
            },
            {
              id: "q_w40_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "The End of Diplomas",
            wordCount: 460,
            content: `
              <p>For decades, the university degree has been viewed as the "Golden Ticket" to the middle class—a virtually guaranteed path to stability and high wages. But today, its value is eroding rapidly. Tuition costs have skyrocketed, outpacing inflation by huge margins and leaving students with crippling debt that delays major life milestones like buying a home. At the same time, employers increasingly complain that graduates lack practical, job-ready skills. This "Skills Gap" between academic theory and workplace reality is driving a massive shift toward "Micro-credentialing" and alternative certifications.</p>
              <p>Instead of a monolithic four-year degree, imagine a verified portfolio of specific "Badges" and "Certificates." You might have a badge in "Python Programming" from Google, a badge in "Public Speaking" from a local community college, and a certification in "Project Management" from a specialized institute. This "Unbundling" of education allows for radical flexibility and personalization. In a rapidly changing economy where technologies evolve every few years, a degree earned twenty years ago is often obsolete. <u>The future of work will require 'Life-Long Learning,' where education is not a onetime event but a continuous subscription to new knowledge.</u> You don't just graduate once; you are constantly upskilling to stay relevant.</p>
              <p>This paradigm shift challenges the traditional business model of the university. Higher education institutions may face an "Existential Crisis" if they cannot justify their high price tags. Why pay $200,000 for a general liberal arts degree if a focused $1,000 boot camp guarantees a high-paying job in six months? However, defenders argue that universities offer more than just vocational training. They are crucial spaces for "Socialization," "Civic Formation," and the exposure to diverse ideas that challenge one's worldview. Losing the campus experience would be a significant cultural loss that online courses cannot replicate.</p>
              <p>The future is likely a hybrid model. Traditional degrees will remain essential for licensed professions like medicine and law where deep, structured learning is mandatory. But for the vast majority of careers in tech, business, and media, the "Portfolio" will replace the "Diploma." Employers will stop asking "Where did you go?" and start asking "What can you *do*?" Meritocracy may finally find its digital form, valuing competence over pedigree.</p>
            `,
            underlinedSentence: "The future of work will require 'Life-Long Learning,' where education is not a onetime event but a continuous subscription to new knowledge."
          },
          questions: [
            {
              id: "q_w40_p2_1",
              type: "detail",
              text: "What is the 'hidden curriculum'?",
              options: ["Secret books.", "Unconscious biases and expectations that influence how students are treated.", "A new math formula.", "A school's secret plan."],
              correctAnswer: "Unconscious biases and expectations that influence how students are treated."
            },
            {
              id: "q_w40_p2_2",
              type: "inference",
              text: "What is an advantage of co-educational learning mentioned in the text?",
              options: ["It is easier to grade.", "It fosters social intelligence and collaboration between different genders.", "It allows for more sports.", "It is only for girls."],
              correctAnswer: "It fosters social intelligence and collaboration between different genders."
            },
            {
              id: "q_w40_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Segregation", definition: "The action or state of setting someone or something apart from other people or things." },
        { word: "Integration", definition: "The action or process of integrating." },
        { word: "Fluidity", definition: "The quality of being likely to change; flexibility." },
        { word: "Nuanced", definition: "Characterized by subtle shades of meaning or expression." },
        { word: "Bias", definition: "Prejudice in favor of or against one thing, person, or group compared with another." }
      ]
    };
  }

  // Week 41: Algorithmic Justice (Ethics)
  if (weekNum === 41) {
    return {
      id: 41,
      title: "Algorithmic Justice",
      theme: "Ethics",
      mainIdeaHint: "If code decides your future, who checks the code?",
      passages: [
        {
          passage: {
            title: "Code is Not Law",
            wordCount: 470,
            content: `
              <p>As artificial intelligence (AI) begins to make critical decisions about our lives, the concept of "Algorithmic Justice" has moved to the center of ethical debate. These decisions range from determining who receives a bank loan to deciding which prisoners are granted parole. For many decades, a persistent "Neutrality Myth" has surrounded technology. This is the mistaken belief that because code is based on mathematics, it must be inherently objective and fair. However, we are beginning to realize that "Code is not Law." Instead, it is a reflection of the human values, biases, and historical data of its creators. If the data used to train an AI is skewed by past discrimination, the machine will not only learn those biases but also automate them. It effectively amplifies the prejudice, often with a level of opacity that makes it impossible for an individual to challenge the results.</p>
              <p>One of the primary challenges in algorithmic justice is the "Black Box" problem. Many modern machine learning systems, particularly deep neural networks, are so complex that even their own creators cannot fully explain how they reached a specific conclusion. <u>When an algorithm makes a life-altering decision, we must be able to ask 'why' and receive a transparent, human-understandable answer.</u> This necessity has led to a growing movement for "Explainable AI" (XAI). These are systems designed from the ground up to be transparent and accountable to the people they affect. Without true explainability, we risk creating a "Technological Autocracy." In this scenario, important decisions are made by invisible, unchallengeable systems that operate entirely outside the bounds of traditional dual process and legal oversight.</p>
              <p>Furthermore, we must urgently address the issue of "Algorithmic Accountability." If an autonomous vehicle causes a serious accident, or if a medical AI misdiagnoses a critical patient, who is responsible? Is it the developer who wrote the initial code, the company that deployed the system, or the user who relied on it? Current legal frameworks are ill-equipped to handle these novel questions. They often treat software merely as a "service" rather than as a decision-maker with moral or legal consequences. We need new laws that treat algorithms not just as tools, but as agents. These agents must adhere to the same ethical standards as the humans they are replacing.</p>
              <p>Ultimately, algorithmic justice is about ensuring that technology serves humanity, rather than the other way around. It requires a multidisciplinary approach involving not just programmers, but also sociologists, lawyers, and ethicists. We must move beyond "technological solutionism," which is the dangerous idea that every problem has a technical fix. We must recognize that many of our most pressing challenges are social and political in nature. As we delegate more of our agency to machines, we must ensure that we are not just building more efficient versions of our own worst impulses. Instead, we should use technology to help us build a world that is more just, transparent, and equitable for everyone.</p>
            `,
            underlinedSentence: "When an algorithm makes a life-altering decision, we must be able to ask 'why' and receive a transparent, human-understandable answer."
          },
          questions: [
            {
              id: "q_w41_p1_1",
              type: "detail",
              text: "What is the 'Black Box' problem?",
              options: ["A broken computer.", "The difficulty in explaining how complex AI systems reach their decisions.", "A secret government project.", "A way to store data."],
              correctAnswer: "The difficulty in explaining how complex AI systems reach their decisions."
            },
            {
              id: "q_w41_p1_2",
              type: "inference",
              text: "Why is explainability important in AI?",
              options: ["It makes the code run faster.", "It ensures that individuals can understand and contest decisions that affect their lives.", "It helps in marketing the AI.", "It reduces the cost of electricity."],
              correctAnswer: "It ensures that individuals can understand and contest decisions that affect their lives."
            },
            {
              id: "q_w41_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "The Weaponization of Data",
            wordCount: 510,
            content: `
              <p>The collection of "Big Data" has given governments and corporations unprecedented power to monitor, predict, and control human behavior. When this data is used to target marginalized groups or to restrict individual freedoms, it becomes a form of "data weaponization." One of the most prominent examples is "Predictive Policing." In this system, algorithms analyze historical crime data to determine exactly where to deploy officers. While this sounds efficient, it often leads to a "Feedback Loop" of bias. If an area was over-policed in the past, the algorithm will "predict" more crime there. This leads to more arrests and even more biased data, regardless of the actual crime rate in that neighborhood.</p>
              <p>Beyond policing, "Social Scoring" systems represent a significant threat to individual autonomy. In some contexts, data from social media, credit history, and even digital surveillance is used to assign citizens a "score." This score determines their access to travel, education, and employment. <u>When our digital footprints are used to rank our 'trustworthiness,' we risk creating a new form of digital surveillance that punishes non-conformity.</u> This leads to a "Chilling Effect" on free speech and creativity. Individuals begin to self-censor their behavior to avoid a low score. The "Digital Panopticon" is no longer just a metaphor. It is a reality for millions of people whose every action is being judged by invisible systems.</p>
              <p>The only antidote to the weaponization of data is robust "Data Sovereignty" and strong privacy laws. We must recognize the "Right to be Forgotten." This is the ability of individuals to demand that their historical data be deleted after a certain period. This right is essential for allowing people to grow and change without being permanently haunted by their digital past. We also need "Data Minimalism." This is the principle that corporations and governments should only collect the minimum amount of data necessary for a specific, transparent purpose. Our digital lives are not just "raw material" for algorithmic processing. They are an extension of our identity and must be protected as a fundamental human right.</p>
              <p>Ultimately, the battle for algorithmic justice will be fought over who wins the "Right to the Future." Will the future be decided by opaque systems that prioritize profit and control? Or will it be a collaborative effort between humans and machines? It must be guided by transparency, empathy, and justice. As we move further into the data age, we must remain vigilant. We must question the results of every "score" and "prediction." We must ensure that the machines we build are worthy of our trust. The path to a better future is not paved with more data, but with more wisdom in how we use it. We must prioritize human dignity above efficiency.</p>
            `,
            underlinedSentence: "When our digital footprints are used to rank our 'trustworthiness,' we risk creating a new form of digital surveillance that punishes non-conformity."
          },
          questions: [
            {
              id: "q_w41_p2_1",
              type: "detail",
              text: "What is 'Predictive Policing'?",
              options: ["Police predicting the weather.", "Using algorithms to analyze data and determine where to deploy police resources.", "A new type of police car.", "A way to hire more officers."],
              correctAnswer: "Using algorithms to analyze data and determine where to deploy police resources."
            },
            {
              id: "q_w41_p2_2",
              type: "inference",
              text: "What is the 'Chilling Effect' mentioned in the text?",
              options: ["It gets colder in the winter.", "The tendency of individuals to self-censor their behavior to avoid negative digital records or scores.", "A new type of refrigerant.", "The feeling of being scared of computers."],
              correctAnswer: "The tendency of individuals to self-censor their behavior to avoid negative digital records or scores."
            },
            {
              id: "q_w41_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Opacity", definition: "The quality of being difficult to understand or explain." },
        { word: "Autocracy", definition: "A system of government by one person with absolute power." },
        { word: "Panopticon", definition: "A circular prison with cells arranged around a central well, from which prisoners could at all times be observed; here, a metaphor for constant surveillance." },
        { word: "Sovereignty", definition: "Supreme power or authority; here, control over one's own data." },
        { word: "Conformity", definition: "Compliance with standards, rules, or laws." }
      ]
    };
  }

  // Week 42: The 24-Hour News Cycle (Media)
  if (weekNum === 42) {
    return {
      id: 42,
      title: "The News Cycle",
      theme: "Media",
      mainIdeaHint: "Analyze how the constant stream of news affects our perception of reality.",
      passages: [
        {
          passage: {
            title: "Information Overload",
            wordCount: 475,
            content: `
              <p>Before the digital age, news was a daily event. It was something you consumed in the morning paper or during a scheduled evening broadcast. Today, we live in a "24-Hour News Cycle" where we are bombarded with updates instantly and incessantly. While this connectivity keeps us informed in real-time, it has fundamentally changed our relationship with information. Networks and websites are now under immense pressure to fill every second of the day with content. This pressure often leads to "headline stress disorder." This condition describes the anxiety and despair caused by a constant stream of negative, sensationalized news. It prioritizes shock value over accuracy or deep analysis.</p>
              <p>In the "Attention Economy," news outlets are not just competing for facts; they are competing for eyeballs. This competition incentivizes "Clickbait" and sensationalism. Complex geopolitical events are reduced to a single, polarizing headline designed to trigger fear or anger. <u>While this connectivity keeps us informed, it often leads to 'headline stress disorder,' as networks prioritize sensationalism to fill airtime.</u> The quest for being "first" to report a story frequently overrides the traditional journalistic duty to be right. This has led to the spread of "Infodemics." In these situations, misinformation and rumors spread faster than verified facts, leaving the public confused and exhausted.</p>
              <p>Furthermore, the 24-hour cycle has led to the "Death of Nuance." When a story is updated every few minutes, there is little time for reflection or context. We are often presented with a series of disconnected "takes" rather than a coherent narrative. This contributes to a "Crisis of Truth." Individuals retreat into echo chambers that confirm their existing biases, further polarizing society. To navigate this landscape, we must practice "Information Hygiene." We must be intentional about where we get our news and set boundaries on our consumption. Real knowledge requires time, patience, and the willingness to look beyond the immediate headline.</p>
              <p>Ultimately, the challenge of the modern news cycle is not a lack of information, but a surplus of it. We must learn to distinguish between "Signal" and "Noise." We must separate the information that truly matters from the sensationalist chatter that only serves to distract us. As we move deeper into the information age, our ability to think critically will be tested. Maintaining our mental well-being in the face of constant updates will be one of our most important survival skills. The news should be a tool for understanding the world. It should not be a source of constant stress that prevents us from participating in it.</p>
            `,
            underlinedSentence: "While this connectivity keeps us informed, it often leads to 'headline stress disorder,' as networks prioritize sensationalism to fill airtime."
          },
          questions: [
            {
              id: "q_w42_p1_1",
              type: "detail",
              text: "What is 'headline stress disorder'?",
              options: ["A problem with font sizes.", "Anxiety caused by the constant consumption of negative and sensationalized news.", "Poor internet connection.", "A type of headache."],
              correctAnswer: "Anxiety caused by the constant consumption of negative and sensationalized news."
            },
            {
              id: "q_w42_p1_2",
              type: "inference",
              text: "Why might accuracy suffer in the modern news cycle?",
              options: ["Journalists are lazy.", "The extreme pressure to be the first to report a story leads to cutting corners and neglecting verification.", "Lack of computers.", "People don't care about facts."],
              correctAnswer: "The extreme pressure to be the first to report a story leads to cutting corners and neglecting verification."
            },
            {
              id: "q_w42_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "The Death of Local News",
            wordCount: 505,
            content: `
              <p>While national and global news networks dominate the airwaves, local journalism is quietly vanishing at an alarming rate. Over the past two decades, thousands of small local newspapers have closed their doors. This has left millions of people living in "news deserts." <u>This creates 'news deserts' where residents have no local watchdog to report on city councils or school boards.</u> This loss is not just a blow to the media industry; it is a fundamental threat to democracy. Local reporters serve as the primary "watchdogs" of our communities. They hold local government officials accountable and shine a light on issues that national networks will never cover. These include board meetings, zoning changes, and local corruption.</p>
              <p>Without a local paper to report on the truth, civic engagement inevitably drops. When people don't know what is happening in their own backyards, they are less likely to vote in local elections. They are also less likely to volunteer for community projects or attend city council meetings. This lack of oversight makes corruption and mismanagement more likely to occur and go unnoticed. Furthermore, the loss of local news contributes to national polarization. When people lose touch with their local community, they tend to view the world through the lens of national partisan conflicts. These conflicts are often more abstract and divisive. Local news provides a shared set of facts that brings people together, regardless of their political leanings.</p>
              <p>The decline of local news is driven largely by "Consolidation." Large media conglomerates often buy up local papers, slash their budgets, and replace local reporting with generic national content. These "Ghost Newspapers" may still have a local name, but they no longer have the staff or the resources to provide actual journalism. We must recognize that local news is a "Public Good," much like clean water or public roads. Supporting local journalism is essential. We can do this through subscriptions, nonprofit models, or community-led initiatives. It is vital for the health of our communities and the survival of our democratic institutions. We must put money into the systems that keep us informed.</p>
              <p>In conclusion, the survival of local news is a test of our commitment to our own communities. We must find ways to sustain the reporters who tell our stories and watch over our local institutions. The future of journalism may be digital, but its heart must remain local. A world without local news is a world where we are more connected to events thousands of miles away than to the people and problems right next door. Rebuilding our local information ecosystems is one of the most pressing challenges of our time. It starts with valuing the "watchdog" in our own town.</p>
            `,
            underlinedSentence: "This creates 'news deserts' where residents have no local watchdog to report on city councils or school boards."
          },
          questions: [
            {
              id: "q_w42_p2_1",
              type: "detail",
              text: "What are 'news deserts'?",
              options: ["Places where it never rains.", "Areas where local news coverage has significantly declined or disappeared, leaving residents uninformed.", "Libraries without books.", "TV channels that only show weather."],
              correctAnswer: "Areas where local news coverage has significantly declined or disappeared, leaving residents uninformed."
            },
            {
              id: "q_w42_p2_2",
              type: "inference",
              text: "What is a major consequence of the loss of local journalists?",
              options: ["Lower taxes.", "Higher likelihood of local government issues and potential corruption going unreported due to lack of oversight.", "Better national TV.", "More free time for citizens."],
              correctAnswer: "Higher likelihood of local government issues and potential corruption going unreported due to lack of oversight."
            },
            {
              id: "q_w42_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Sensationalism", definition: "The use of exciting or shocking stories at the expense of accuracy." },
        { word: "Connectivity", definition: "The state of being connected or interconnected." },
        { word: "Civic", definition: "Relating to a city or town, especially its administration." },
        { word: "Watchdog", definition: "A person or group that monitors an organization for illegal or unethical behavior." },
        { word: "Engagement", definition: "Participation or involvement in something." }
      ]
    };
  }

  // Week 43: Sustainable Tourism (Global)
  if (weekNum === 43) {
    return {
      id: 43,
      title: "Overtourism",
      theme: "Global",
      mainIdeaHint: "Can we travel without destroying the places we love?",
      passages: [
        {
          passage: {
            title: "The Paradox of Tourism",
            wordCount: 470,
            content: `
              <p>Tourism is one of the world's largest industries. It accounts for roughly 10% of global GDP and provides livelihoods for millions of people. However, many of the world's most iconic destinations are currently being "smothered" by their own popularity. This phenomenon, known as "Overtourism," occurs when the number of visitors exceeds the "Carrying Capacity" of a destination. This is the point at which the local environment, infrastructure, and quality of life for residents begin to deteriorate. In places like Venice, Barcelona, and Kyoto, the influx of tourists has led to a "hollowing out" of city centers. Residential apartments are converted into short-term rentals, and local shops are replaced by tacky souvenir stalls.</p>
              <p>The rise of social media has significantly exacerbated the problem. The quest for the perfect "Instagrammable" photo has driven massive crowds to previously quiet and fragile sites. These range from the lavender fields of Provence to the remote peaks of the Himalayas. <u>In Venice and Barcelona, locals are being priced out as residential apartments are turned into short-term rentals.</u> This leads to "Venice-ification," where a city becomes a living museum rather than a functioning community. When the local population leaves, the very cultural charm and authenticity that attracted visitors in the first place are eroded. The paradox of tourism is that by seeking out the beautiful and the unique, we often end up destroying it.</p>
              <p>Furthermore, overtourism causes severe environmental damage. Fragile ecosystems are trampled, historical monuments are worn down by millions of feet, and local water supplies are often depleted to meet the demands of luxury hotels. The carbon footprint of global travel—particularly long-haul flights—is also a major contributor to climate change. To address these issues, many cities are beginning to implement "De-marketing" strategies. They actively discourage tourists from visiting during peak seasons or steer them toward less-visited neighborhoods. Others are imposing "Tourist Taxes" to fund the maintenance of public infrastructure and environmental protection to save their cities.</p>
              <p>Ultimately, we must move toward a more "Mindful" approach to travel. This involves recognizing that we are guests in someone else's home and taking responsibility for our impact on the local community. We must value quality over quantity, choosing to stay longer in one place rather than rushing through a "bucket list" of famous landmarks. By supporting local businesses and respecting local customs, we can ensure that tourism remains a force for good. It can be a way to build bridges between cultures rather than a source of conflict and destruction. The future of travel depends on our ability to find a balance between our desire to explore and our duty to preserve.</p>
            `,
            underlinedSentence: "In Venice and Barcelona, locals are being priced out as residential apartments are turned into short-term rentals."
          },
          questions: [
            {
              id: "q_w43_p1_1",
              type: "detail",
              text: "What is the 'Carrying Capacity' of a destination?",
              options: ["How many suitcases a hotel can hold.", "The limit of visitors a site can handle before the environment and community suffer.", "The total number of airplanes in a country.", "The weight of the tourists."],
              correctAnswer: "The limit of visitors a site can handle before the environment and community suffer."
            },
            {
              id: "q_w43_p1_2",
              type: "inference",
              text: "Why is overtourism considered a 'paradox'?",
              options: ["It makes people poor.", "The popularity of a destination can lead to the destruction of the very qualities that make it attractive.", "It is too quiet.", "It only happens in winter."],
              correctAnswer: "The popularity of a destination can lead to the destruction of the very qualities that make it attractive."
            },
            {
              id: "q_w43_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "Bhutan's High-Value Model",
            wordCount: 505,
            content: `
              <p>While many nations struggle with the fallout of mass tourism, the Kingdom of Bhutan offers a different path. It is a model known as "High Value, Low Volume." For decades, Bhutan has tightly controlled the number of visitors entering the country by charging a significant "Sustainable Development Fee" (SDF). This fee is used directly to fund the nation's free healthcare and education systems, as well as to protect its pristine environment and unique Buddhist culture. <u>This regenerative approach ensures that tourism supports the environment and the local community rather than depleting them.</u> By making travel expensive, Bhutan limits the crowds and ensures that every visitor is a meaningful contributor to the country's well-being.</p>
              <p>Bhutan is also the world's only "Carbon Negative" country. This means it absorbs more CO2 than it produces. This is achieved through a constitutional mandate to keep at least 60% of the land under forest cover and a commitment to sustainable agriculture. Tourism plays a key role in this green strategy, providing the funds necessary to maintain these protected areas. The Bhutanese model shifts the focus from "Travel as Consumption" to "Travel as Contribution." Visitors are encouraged to participate in local life. They learn about the philosophy of "Gross National Happiness" and understand the importance of spiritual and environmental health over mere economic growth.</p>
              <p>Following Bhutan's lead, other destinations are beginning to adopt similar "Regenerative" models. For example, some islands in the Pacific are requiring tourists to sign an "Eco-Pledge" upon arrival, promising to respect the reef and the local culture. Others are implementing strict caps on the daily number of visitors to sensitive sites like Machu Picchu or the Galapagos Islands. These measures recognize that the environment is not a "resource" to be exploited for profit, but a living system that must be nurtured and protected. Regenerative tourism seeks to leave a place better than it was found, by restoring ecosystems and strengthening local social fabrics.</p>
              <p>Transitioning to a regenerative model requires a fundamental shift in how we measure success in tourism. Instead of counting "Visitor Arrivals," we should be measuring "Community Well-being" and "Environmental Health." It requires a partnership between governments, businesses, and travelers to prioritize the long-term health of the destination over short-term profit. As we emerge from a global pandemic that brought travel to a standstill, we have a unique opportunity to "Reset" our habits. We can build a more sustainable, equitable, and beautiful future for global tourism. A world that is worth exploring is a world that is worth protecting. We must all be better guests.</p>
            `,
            underlinedSentence: "This regenerative approach ensures that tourism supports the environment and the local community rather than depleting them."
          },
          questions: [
            {
              id: "q_w43_p2_1",
              type: "detail",
              text: "How does Bhutan use the funds from its 'Sustainable Development Fee'?",
              options: ["To buy more airplanes.", "To fund free healthcare, education, and environmental protection.", "To build luxury resorts.", "To lower taxes for corporations."],
              correctAnswer: "To fund free healthcare, education, and environmental protection."
            },
            {
              id: "q_w43_p2_2",
              type: "inference",
              text: "What does it mean for a country to be 'Carbon Negative'?",
              options: ["It has no electricity.", "It absorbs more carbon dioxide than it emits into the atmosphere.", "It bans all cars.", "It has a cold climate."],
              correctAnswer: "It absorbs more carbon dioxide than it emits into the atmosphere."
            },
            {
              id: "q_w43_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "GDP", definition: "Gross Domestic Product; the total value of goods and services produced in a country." },
        { word: "Erosion", definition: "The gradual destruction or diminution of something." },
        { word: "Regenerative", definition: "Tending to restore or bring new life." },
        { word: "Depleting", definition: "Using up the supply or resources of." },
        { word: "Iconic", definition: "Widely recognized and well-established." }
      ]
    };
  }

  // Week 44: History and Perspective (Education)
  if (weekNum === 44) {
    return {
      id: 44,
      title: "History & Perspective",
      theme: "Education",
      mainIdeaHint: "Whose story are we telling? Evaluate how history is taught in schools.",
      passages: [
        {
          passage: {
            title: "The Battle over History Class",
            wordCount: 475,
            content: `
              <p>History is not merely a collection of dates and names; it is a powerful narrative of identity and a primary tool for nation-building. Because of its influence on how we perceive ourselves and others, the history curriculum has become a site of intense "culture wars" in many countries. <u>Recent debates over curriculum focus on whether schools should emphasize national achievements or confront systemic injustices.</u> On one side of the debate are the "Traditionalists." They argue that history should foster national pride and unity by highlighting the triumphs and values of the nation's founders. They fear that a "Critical" approach—one that examines past atrocities, slavery, and systemic inequality—will demoralize students and fragment society. They believe that a shared, positive story is essential for a stable democracy.</p>
              <p>On the other side are the proponents of "Critical History." They believe that a sanitized version of the past is a disservice to students. They argue that to truly progress, a society must have the courage to confront its "difficult heritage." This involves moving away from the "Great Man Theory"—which focuses on the actions of powerful leaders—and toward "Social History." Social history explores the lives of ordinary people, laborers, and marginalized groups. By understanding the roots of contemporary social problems, students are better equipped to participate in the democratic process. The goal of this approach is not to induce guilt. Instead, the goal is to foster "Critical Literacy," which is the ability to analyze how power is maintained and whose interests are served by certain historical narratives.</p>
              <p>The "Politics of Memory" also plays a key role in what is included in the "Canon." The canon is the set of stories and texts that are deemed essential for every student to know. For decades, the history canon in many Western nations was exclusively "Eurocentric." It focused on the achievements of Western civilization while ignoring the complex histories of Africa, Asia, and the indigenous peoples of the Americas. Rewriting the canon to be more inclusive is a slow and controversial process. It requires acknowledging that there is no single "objective" history. Rather, history is a collection of often conflicting perspectives. The battle over the history classroom is, at its heart, a battle over the future: what kind of citizens do we want to produce, and what kind of world do we want them to build?</p>
              <p>Ultimately, a healthy democracy requires a "History of Questions" rather than a "History of Answers." Instead of memorizing a fixed story of the past, students should be taught to act as "Historical Detectives." They should analyze primary sources and question the motivations of the authors. This builds the critical thinking skills necessary for navigating a modern world full of misinformation and propaganda. By learning to sit with the complexity and the contradictions of our shared past, we can build a more empathetic and resilient society. History is not a closed book; it is a living conversation that we are all a part of. The way we teach it determines the depth of that conversation.</p>
            `,
            underlinedSentence: "Recent debates over curriculum focus on whether schools should emphasize national achievements or confront systemic injustices."
          },
          questions: [
            {
              id: "q_w44_p1_1",
              type: "detail",
              text: "What is the primary concern of 'Traditionalists' in the history curriculum debate?",
              options: ["Textbook costs.", "That a critical approach will demoralize students and damage national unity.", "That there aren't enough dates to memorize.", "The use of technology in class."],
              correctAnswer: "That a critical approach will demoralize students and damage national unity."
            },
            {
              id: "q_w44_p1_2",
              type: "inference",
              text: "How does 'Social History' differ from the 'Great Man Theory'?",
              options: ["It is only about parties.", "It focuses on the lives of ordinary people and marginalized groups rather than just powerful leaders.", "It doesn't use any books.", "It is much older."],
              correctAnswer: "It focuses on the lives of ordinary people and marginalized groups rather than just powerful leaders."
            },
            {
              id: "q_w44_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "Perspective-Driven Learning",
            wordCount: 470,
            content: `
              <p>In response to the limitations of traditional history instruction, modern educators are adopting an approach known as "Multiperspectivity." This involves examining a single historical event through the eyes of various participants. For example, a class might analyze a colonial war from the perspective of the colonizing power, the indigenous people, and the common soldiers on both sides. <u>Instead of one 'correct' story, students learn to evaluate bias and recognize that history looks different depending on who is holding the pen.</u> This method teaches students that history is not a "Truth" to be discovered. It is a "Construction" based on the available evidence and the worldview of the person telling the story.</p>
              <p>Key to this approach is the use of "Primary Sources." These include diaries, letters, legal documents, and photographs from the time. By engaging directly with these raw materials, students learn to identify bias, detect silences in the record, and understand the "Historical Context" that shaped people's actions. This fosters "Historical Empathy"—the ability to understand the motivations and beliefs of people in the past, even if those beliefs are alien or offensive to us today. It is important to distinguish empathy from sympathy. We do not have to agree with historical actors to understand the "Logic" of their world. This intellectual exercise is vital for developing the "Global Mindset" needed in our interconnected world.</p>
              <p>Another important facet is "Oral History"—the collection of personal accounts from individuals whose stories have been excluded from traditional written archives. For many cultures, especially those with strong oral traditions or those that have faced systemic suppression, these living accounts are the only way to preserve their heritage. By interviewing elders and community members, students learn that history is not just about what happened in distant places or centuries ago. It is a living force that shapes their own families and neighborhoods. This "Lived History" makes the past feel personal and relevant. It encourages students to see themselves as active participants in the ongoing story of humanity.</p>
              <p>Ultimately, perspective-driven learning transforms students from passive consumers of information into active makers of meaning. It empowers them to question authority, respect diversity, and build their own informed opinions. In an era where "Post-Truth" and "Alternative Facts" are common, the ability to weigh evidence and understand multiple viewpoints is a critical survival skill. By teaching history as a dialogue between the past and the present, we prepare students to be compassionate, thoughtful, and engaged citizens of the world. The pen of history is now in their hands. The perspectives they include will determine the shape of the next chapter.</p>
            `,
            underlinedSentence: "Instead of one 'correct' story, students learn to evaluate bias and recognize that history looks different depending on who is holding the pen."
          },
          questions: [
            {
              id: "q_w44_p2_1",
              type: "detail",
              text: "What is 'Multiperspectivity' in history education?",
              options: ["Watching movies.", "Analyzing a single event from the viewpoints of multiple different groups.", "Using a telescope.", "Memorizing several books."],
              correctAnswer: "Analyzing a single event from the viewpoints of multiple different groups."
            },
            {
              id: "q_w44_p2_2",
              type: "inference",
              text: "Why is 'Historical Empathy' considered different from 'Sympathy'?",
              options: ["It is colder.", "It involves understanding a person's logic and worldview without necessarily agreeing with or supporting their actions.", "It is only for experts.", "It requires a higher grade."],
              correctAnswer: "It involves understanding a person's logic and worldview without necessarily agreeing with or supporting their actions."
            },
            {
              id: "q_w44_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Narrative", definition: "A spoken or written account of connected events; a story." },
        { word: "Injustice", definition: "Lack of fairness or justice." },
        { word: "Curriculum", definition: "The subjects comprising a course of study." },
        { word: "Perspective", definition: "A particular attitude toward or way of regarding something; a point of view." },
        { word: "Globalized", definition: "Developing or being developed so as to make international influence possible." }
      ]
    };
  }

  // Week 45: Human Cloning (Ethics)
  if (weekNum === 45) {
    return {
      id: 45,
      title: "Human Cloning",
      theme: "Ethics",
      mainIdeaHint: "Examine the technical and moral boundaries of genetic replication.",
      passages: [
        {
          passage: {
            title: "The Ethics of Cloning",
            wordCount: 475,
            content: `
              <p>Cloning—the process of creating a genetically identical copy of a biological entity—has moved from the realm of science fiction into the spotlight of serious ethical and scientific debate. There are two primary types of cloning being discussed today: "Therapeutic Cloning" and "Reproductive Cloning." Therapeutic cloning involves creating cloned embryos to harvest stem cells. These stem cells have the potential to treat a wide range of debilitating diseases, from Alzheimer's to Spinal Cord injuries. While this offers immense medical promise, it is highly controversial because it involves the destruction of human embryos. Reproductive cloning, on the other hand, involves the creation of a whole human being who is a genetic copy of another. This practice is almost universally condemned by the international scientific and ethical community.</p>
              <p>One of the primary moral objections to reproductive cloning is the fear of "Commodification"—treating human beings as manufactured products rather than unique individuals with their own dignity. <u>The primary concern is that cloning commodifies human life, treating individuals as products to be manufactured rather than unique lives to be born.</u> Critics argue that cloning would allow for the creation of "designer babies." Parents could select for specific traits, effectively turning procreation into a form of consumerism. This raises the specter of a new "Eugenics," where society begins to value people based on their genetic makeup rather than their inherent worth. The "Slippery Slope" argument suggests that even well-intentioned genetic technologies could eventually lead to a world where human diversity is diminished in favor of specific "optimal" genetic templates.</p>
              <p>Beyond the moral questions, there are significant safety concerns. The process of "Somatic Cell Nuclear Transfer" (SCNT)—the technique used to create Dolly the Sheep—is far from perfect. In animal studies, the success rate of cloning is extremely low. Those clones that do survive often suffer from severe health problems, including premature aging, organ failure, and immune system deficiencies. Attempting to clone a human being under these conditions would be considered highly unethical and a violation of the "Do No Harm" principle of medicine. The risk of producing a child with profound physical and developmental disabilities is simply too high. This makes reproductive cloning a dangerous and irresponsible venture for the foreseeable future.</p>
              <p>Ultimately, the debate over cloning forces us to ask fundamental questions about the nature of life and the boundaries of human intervention in the natural order. We must weigh the potential for revolutionary medical cures against the risk of devaluing human life. It requires a Global Moral Consensus to ensure that our scientific capabilities do not outpace our ethical wisdom. As we stand at the threshold of a new biological era, we must proceed with extreme caution. We must ensure that our technologies serve to enhance the dignity of all humans, rather than reducing us to "raw material" for experimentation. The heart of being human is not our DNA, but our unique, unrepeatable journey through life.</p>
            `,
            underlinedSentence: "The primary concern is that cloning commodifies human life, treating individuals as products to be manufactured rather than unique lives to be born."
          },
          questions: [
            {
              id: "q_w45_p1_1",
              type: "detail",
              text: "What is the primary difference between therapeutic and reproductive cloning?",
              options: ["One is for plants, one is for animals.", "Therapeutic cloning creates stem cells for medical treatment; reproductive cloning aims to create a whole human being.", "Reproductive cloning is much cheaper.", "There is no difference."],
              correctAnswer: "Therapeutic cloning creates stem cells for medical treatment; reproductive cloning aims to create a whole human being."
            },
            {
              id: "q_w45_p1_2",
              type: "inference",
              text: "What does 'commodifies' mean in the context of the passage?",
              options: ["To make something expensive.", "To treat a human being as a tradable item or commercial product rather than a unique individual.", "To improve someone's health.", "To study biology."],
              correctAnswer: "To treat a human being as a tradable item or commercial product rather than a unique individual."
            },
            {
              id: "q_w45_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "The Right to an 'Open Future'",
            wordCount: 470,
            content: `
              <p>Philosophers who oppose human cloning often argue that the greatest harm is not physical, but psychological. The "Open Future" argument, popularized by ethicist Joel Feinberg, suggests that every child has a right to enter the world without their life path being predetermined by the expectations of others. A child cloned from a talented ancestor—say, a world-class athlete or a brilliant scientist—would live under the "Shadow of the Predecessor." <u>This 'shadow' violates the child's right to an 'open future,' where they can define their own identity without being compared to a genetic predecessor.</u> Their successes would be attributed to their "superior" genes, while their failures would be seen as a disappointing deviation from the template.</p>
              <p>This concern is rooted in the fallacy of "Genetic Determinism"—the mistaken belief that our genes are our destiny. While DNA provides the blueprint for many of our traits, it is the environment, upbringing, and personal choices that determine who we ultimately become. Even identical twins, who are natural clones, develop distinct personalities and pursue different paths in life. However, a "designed" clone might never be allowed to forget their origin. They would be constantly monitored for traits similar to their predecessor, creating a "Self-Fulfilling Prophecy" that prevents them from discovering their own unique talents and interests. The psychological pressure of "living up to a legacy" could be a cage more restrictive than any physical boundary.</p>
              <p>Furthermore, cloning threatens the traditional understanding of "Family" and "Generation." A clone created from his "father" would be both a son and a twin brother to that person. This creates a confusing web of social and emotional relationships. This could lead to a "Identity Crisis" on a societal scale, as we struggle to define the roles and responsibilities of cloned individuals. We must ask whether we are creating human beings to satisfy our own narcissism—our desire to "live forever" through our genetic copies—or whether we are truly acting in the best interest of the child. True love requires welcoming a new life as a gift, with all its unpredictability and mystery, rather than as a project to be controlled.</p>
              <p>In conclusion, the right to an "Open Future" is a call to protect the essential mystery of human individuality. We are more than the sum of our base pairs. Our value lies in our capacity for change, for growth, and for surprising the world (and ourselves) with our choices. By rejecting human cloning, we are choosing to value the individual as a unique and unrepeatable miracle. As we continue to unlock the secrets of the genome, we must remain humble. We must recognize that some boundaries are there to protect our humanity, not to limit our progress. The future must remain an open book, written by each individual in their own unique hand.</p>
            `,
            underlinedSentence: "This 'shadow' violates the child's right to an 'open future,' where they can define their own identity without being compared to a genetic predecessor."
          },
          questions: [
            {
              id: "q_w45_p2_1",
              type: "detail",
              text: "What is the 'Open Future' argument?",
              options: ["The future will be bright for everyone.", "The right of a child to live without their life path and identity being overshadowed by genetic expectations and comparisons.", "Opening more schools.", "Moving to another planet."],
              correctAnswer: "The right of a child to live without their life path and identity being overshadowed by genetic expectations and comparisons."
            },
            {
              id: "q_w45_p2_2",
              type: "inference",
              text: "What is 'Genetic Determinism'?",
              options: ["The study of DNA.", "The belief that our genes entirely determine our destiny and personality, ignoring environmental factors.", "A way to grow plants.", "A type of forensic science."],
              correctAnswer: "The belief that our genes entirely determine our destiny and personality, ignoring environmental factors."
            },
            {
              id: "q_w45_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Therapeutic", definition: "Relating to the healing of disease." },
        { word: "Taboo", definition: "Prohibited or restricted by social custom." },
        { word: "Predecessor", definition: "A person who held a job or office before the current holder; a genetic precursor." },
        { word: "Expectation", definition: "A strong belief that something will happen or be the case." },
        { word: "Ancestor", definition: "A person from whom one is descended." }
      ]
    };
  }


  // Week 46: Digital Empathy (Ethics)
  if (weekNum === 46) {
    return {
      id: 46,
      title: "Digital Empathy",
      theme: "Ethics",
      mainIdeaHint: "Does technology enhance or erode our ability to connect with others?",
      passages: [
        {
          passage: {
            title: "Can Robots Learn to Care?",
            wordCount: 475,
            content: `
              <p>As Artificial Intelligence becomes increasingly integrated into our daily lives—from customer service chatbots to robotic caregivers for the elderly—the field of "Affective Computing" is gaining prominence. This branch of computer science aims to develop systems that can recognize, interpret, and process human emotions. <u>Researchers are developing AI that can detect human emotions through facial recognition and voice analysis, but can a machine ever truly 'empathize'?</u> The distinction between "Cognitive Empathy"—the ability to logically understand another person's perspective—and "Affective Empathy"—the capacity to actually feel what another person is feeling—is central to this debate. While a machine can be programmed to simulate the former, the latter remains a uniquely biological and conscious experience.</p>
              <p>The ethical implications of "Emotional Mimicry" are profound. If an AI can convincingly mirror human empathy, it could be used to manipulate vulnerable individuals. The lonely or the grieving could be exploited for commercial or political gain. This raises the question of whether we are creating tools for connection or sophisticated "Digital Puppets" that only serve to further isolate us. Critics argue that relying on machines for emotional support could lead to a "De-skilling" of human empathy. If we stop practicing the difficult work of relating to one another face-to-face, our own social muscles may atrophy. We must ask whether we want a world where our most intimate feelings are analyzed as "data points" by a silicon mind.</p>
              <p>Proponents, however, see immense potential in "Empathetic AI." In healthcare, robotic companions can provide a non-judgmental "listening ear" for patients with social anxiety or autism, helping them practice social interactions in a safe environment. In education, intelligent tutoring systems can detect when a student is frustrated or bored and adjust their teaching style accordingly. These applications suggest that AI doesn't have to "feel" in order to be "helpful." The goal should be "Augmented Empathy," where technology assists humans in being more present and attentive to one another, rather than replacing the human connection entirely. This requires a "Human-in-the-Loop" design philosophy. Ethical safeguards must be built into every level of the system.</p>
              <p>Ultimately, the "Turing Test for Emotion" is not about whether a machine can fool us into thinking it has a heart. It is about whether it can help us be more heart-centered in our own lives. We must resist the temptation to anthropomorphize our machines. At the same time, we should be open to the ways they can help us understand the complexity of our own emotional landscapes. Real empathy is a messy, vulnerable, and deeply human process. It requires a physical and spiritual presence that code can never replicate. As we move further into the digital age, the most important "smart" technology we can develop is the wisdom to know the difference between a programmed response and a genuine human soul.</p>
            `,
            underlinedSentence: "Researchers are developing AI that can detect human emotions through facial recognition and voice analysis, but can a machine ever truly 'empathize'?"
          },
          questions: [
            {
              id: "q_w46_p1_1",
              type: "detail",
              text: "What is 'Affective Computing'?",
              options: ["A type of math.", "The study and development of systems that can recognize and process human emotions.", "Building faster processors.", "Repairing computers."],
              correctAnswer: "The study and development of systems that can recognize and process human emotions."
            },
            {
              id: "q_w46_p1_2",
              type: "inference",
              text: "Why is 'Affective Empathy' considered difficult for AI to achieve?",
              options: ["It requires too much memory.", "It involves a subjective, biological experience of feeling that machines currently lack.", "It is illegal.", "Computers don't have cameras."],
              correctAnswer: "It involves a subjective, biological experience of feeling that machines currently lack."
            },
            {
              id: "q_w46_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "The Empathy Gap in a Digital World",
            wordCount: 470,
            content: `
              <p>While the internet has the power to connect us with people from across the globe, it also seems to be creating a widening "Empathy Gap." This is due in part to the "Online Disinhibition Effect." The lack of physical presence and eye contact in digital spaces makes people more likely to act out, use toxic language, and ignore the feelings of others. <u>Psychologists suggest that the lack of eye contact in digital spaces contributes to the 'online disinhibition effect,' where users act more aggressively than they would in person.</u> This digital barrier acts as a "de-humanizing" filter that turns complex individuals into mere text on a screen. Without the immediate feedback of a person's facial expressions or tone of voice, our natural empathetic instincts are often suppressed.</p>
              <p>Furthermore, the architecture of social media sites often prioritizes "Engagement" over "Understanding." Algorithmic "Filter Bubbles" and "Echo Chambers" surround us with people who share our views and biases. This makes it increasingly difficult to empathize with those who are different from us. This leads to "Outgroup Homogeneity," where we view members of other groups as a nameless, faceless mass rather than as unique individuals. When we are only exposed to one side of an argument, our capacity for "Perspective-Taking"—a key component of empathy—is severely compromised. The digital world often rewards "Outrage" and "Conflict" rather than "Compassion" and "Nuance." This further polarizes our societies.</p>
              <p>To bridge this gap, we must practice "Digital Citizenship" and intentionality in our online interactions. This involves slowing down, seeking out diverse viewpoints, and remembering that there is a real human being on the other side of every comment. Schools are increasingly integrating "Social-Emotional Learning" (SEL) into their curricula. This teaches students how to navigate the complex social dynamics of the web with kindness and integrity. We must also demand that tech companies design platforms that encourage "Pro-social behavior" rather than profit-driven conflict. The internet is a tool, and like any tool, its impact depends on the skill and character of the person using it.</p>
              <p>In conclusion, the challenge of digital empathy is a call to bring our humanity into every space we inhabit, whether physical or virtual. Reflection, patience, and the willingness to be wrong are the antidotes to the "fast" and "loud" nature of the web. By choosing to use our digital power to build up rather than tear down, we can transform the internet into a truly global community. Empathy is not a finite resource that is drained by the screen; it is a skill that we must actively choose to practice every time we log on. The "Empathy Gap" can only be closed by our individual and collective commitment to seeing the human behind the handle.</p>
            `,
            underlinedSentence: "Psychologists suggest that the lack of eye contact in digital spaces contributes to the 'online disinhibition effect,' where users act more aggressively than they would in person."
          },
          questions: [
            {
              id: "q_w46_p2_1",
              type: "detail",
              text: "What is the 'Online Disinhibition Effect'?",
              options: ["A computer virus.", "The tendency for people to act more freely and sometimes more aggressively online due to anonymity and lack of physical presence.", "A way to increase internet speed.", "The fear of using the internet."],
              correctAnswer: "The tendency for people to act more freely and sometimes more aggressively online due to anonymity and lack of physical presence."
            },
            {
              id: "q_w46_p2_2",
              type: "inference",
              text: "How do 'Echo Chambers' affect empathy?",
              options: ["They make you hear better.", "They limit exposure to different viewpoints, making it harder to understand and empathize with people outside of your own social circle.", "They help you find new friends.", "They are only for music."],
              correctAnswer: "They limit exposure to different viewpoints, making it harder to understand and empathize with people outside of your own social circle."
            },
            {
              id: "q_w46_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Anonymity", definition: "The condition of being anonymous." },
        { word: "Accountable", definition: "Required or expected to justify actions or decisions; responsible." },
        { word: "Trolling", definition: "Making a deliberately offensive or provocative online post." },
        { word: "Disinhibition", definition: "A lack of restraint manifested in disregard for social conventions." },
        { word: "Antidote", definition: "A medicine taken or given to counteract a particular poison. Also, anything that relieves a harmful situation." }
      ]
    };
  }

  // Week 47: Remote Work (Media)
  if (weekNum === 47) {
    return {
      id: 47,
      title: "The Remote Revolution",
      theme: "Media",
      mainIdeaHint: "Is the office dead? Analyze the shift from centralized to distributed work models.",
      passages: [
        {
          passage: {
            title: "The Death of the Office?",
            wordCount: 465,
            content: `
              <p>For over a century, the centralized office was the undisputed heart of the professional world. It was a legacy of the Industrial Age's factory floor. However, the rapid advancement of digital communication tools and the unexpected "global experiment" of the 2020 pandemic have fundamentally challenged this model. <u>We are currently witnessing a shift toward "Distributed Work," where the location of an employee is secondary to their output and contribution.</u> This revolution offers immense benefits. These include the elimination of stressful commutes, a better "Work-Life Balance," and a significant reduction in the environmental impact associated with massive commercial office buildings. For companies, a "Remote-First" approach provides access to a truly global talent pool, unconstrained by the geographic proximity to a physical headquarters.</p>
              <p>Despite these advantages, the transition to remote work is not without its Friction. Many managers worry about the loss of "Organizational Culture" and the erosion of spontaneous collaboration—those "Water Cooler" moments where creative ideas are often born. "Zoom Fatigue" and the exhaustion of back-to-back video calls have become common complaints. These highlight the limitations of digital interaction compared to face-to-face connection. There is also a deepening concern about the "Triple Bottom Line" of social, environmental, and economic health. While some businesses save millions in overhead costs, the surrounding urban ecosystems—local cafes, retail shops, and transit systems—often languish as their customer base stays home. This "Urban Hollowing" requires us to rethink the role of city centers in an era of distributed labor.</p>
              <p>Furthermore, remote work has blurred the boundaries between our personal and professional lives. Without the physical act of "leaving the office," many employees find themselves in a state of constant connectivity. They respond to emails and messages long after the traditional workday has ended. This "Always-On" culture can lead to profound psychological stress and the eventual "Burnout" of even the most dedicated workers. To sustain this revolution, we must develop new "Digital Boundaries" and prioritize "Asynchronous Communication." This is the ability to work and collaborate across different time zones without requiring everyone to be online at the same moment. This requires a high degree of trust and a focus on "Results-Oriented" management rather than "Eyes-on-Seats" surveillance.</p>
              <p>In conclusion, the office is likely not "dead," but its purpose is being radically redefined. It is evolving into a "Hub" for social connection and strategic alignment, rather than a place for solitary desk work. The future of work will likely be a "Hybrid" model that combines the flexibility of remote labor with the intentional community of occasional physical presence. As we navigate this transition, we must ensure that the "Remote Revolution" doesn't just benefit the highly skilled elite. It must also lead to a more inclusive, equitable, and sustainable economy for all. The true measure of our success will be our ability to design a world where work is something we do, not just somewhere we go.</p>
            `,
            underlinedSentence: "We are currently witnessing a shift toward 'Distributed Work,' where the location of an employee is secondary to their output and contribution."
          },
          questions: [
            {
              id: "q_w47_p1_1",
              type: "detail",
              text: "What historical model is the centralized office a legacy of?",
              options: ["The Agricultural Age.", "The Industrial Age factory floor.", "Ancient Rome.", "Space exploration."],
              correctAnswer: "The Industrial Age factory floor."
            },
            {
              id: "q_w47_p1_2",
              type: "inference",
              text: "What is 'Urban Hollowing'?",
              options: ["Building subways.", "The decline of local businesses and services in city centers as office workers stay home.", "A type of gardening.", "Making cities cleaner."],
              correctAnswer: "The decline of local businesses and services in city centers as office workers stay home."
            },
            {
              id: "q_w47_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "The Rise of the Digital Nomad",
            wordCount: 460,
            content: `
              <p>While remote work is often discussed in the context of the "home office," it has also birthed a more radical lifestyle: the "Digital Nomad." These are professionals who leverage reliable internet and laptop computers to perform their jobs from various locations around the globe. They often stay in co-living spaces specifically designed for this mobile workforce. <u>The lack of separation between home and office can lead to 'burnout,' as employees feel they are always 'on' and can never truly leave their work behind.</u> While the image of working from a tropical beach is seductive, the reality of the nomad life is often a complex balance of productivity, travel logistics, and a quest for community in an inherently transient environment.</p>
              <p>The impact of digital nomads on their "Host Communities" is a subject of intense debate. In cities like Lisbon, Medellín, and Chiang Mai, the influx of high-earning foreign workers has provided an economic boost. However, it has also led to "Gentrification" and the displacement of local residents. As digital nomads outbid locals for housing and drive up the price of services, they can inadvertently contribute to the same "Overtourism" issues seen in major vacation spots. To address this, some nations are introducing "Digital Nomad Visas." These require workers to pay a local tax or contribute to a community development fund. This ensures that the benefits of the mobile workforce are shared more equitably with the people whose homes they are visiting.</p>
              <p>Psychologically, the nomad life can be a double-edged sword. While it offers unparalleled "Freedom," it can also lead to a "Loneliness Epidemic." Without a stable social circle or the daily check-ins of a permanent office, long-term nomads often struggle with feelings of isolation and a lack of belonging. "Asynchronous Communication" becomes a vital skill, as nomads navigate working with teams in distant time zones. This requires extreme self-discipline and the ability to build "Virtual Communities" that can provide the emotional support typically found in a traditional neighborhood. Successful nomads are those who can find a sense of "Home" within themselves and their digital networks, rather than in a physical address.</p>
              <p>In the final analysis, the rise of the digital nomad is a preview of a possible future where "Identity" and "Place" are increasingly disconnected. As the technology for "Holographic Collaboration" and "Virtual Presence" improves, the barriers to working from anywhere will continue to fall. However, we must ensure that our move toward mobility doesn't lead to a fragmented society of "Rootless" individuals. We need to build new institutions and social structures that support a floating population while also preserving the unique character and stability of our physical communities. The digital nomad is not just a traveler; they are the pioneers of a new, globalized way of being.</p>
            `,
            underlinedSentence: "The lack of separation between home and office can lead to 'burnout,' as employees feel they are always 'on' and can never truly leave their work behind."
          },
          questions: [
            {
              id: "q_w47_p2_1",
              type: "detail",
              text: "What is a negative impact digital nomads can have on host communities?",
              options: ["Too much noise.", "Gentrification and the displacement of local residents due to rising housing costs.", "A lack of internet.", "Lower taxes."],
              correctAnswer: "Gentrification and the displacement of local residents due to rising housing costs."
            },
            {
              id: "q_w47_p2_2",
              type: "inference",
              text: "Why is 'Asynchronous Communication' vital for digital nomads?",
              options: ["It is cheaper.", "It allows them to collaborate with teams in different time zones without needing to be online at the same time.", "It is faster.", "Because they don't like talking."],
              correctAnswer: "It allows them to collaborate with teams in different time zones without needing to be online at the same time."
            },
            {
              id: "q_w47_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Centralized", definition: "Concentrated under a single authority or in a single place." },
        { word: "Distributed", definition: "Shared or spread out over an area or among a number of people." },
        { word: "Asynchronous", definition: "Not occurring at the same time." },
        { word: "Languish", definition: "Lose or lack vitality; grow weak or feeble." },
        { word: "Surveillance", definition: "Close observation, especially of a suspected spy or criminal." }
      ]
    };
  }

  // Week 48: Citizen Science (Global)
  if (weekNum === 48) {
    return {
      id: 48,
      title: "Citizen Science",
      theme: "Global",
      mainIdeaHint: "Science for everyone. How do non-experts contribute to research?",
      passages: [
        {
          passage: {
            title: "The Power of the Crowd",
            wordCount: 505,
            content: `
              <p>For centuries, the pursuit of scientific knowledge was largely restricted to a small circle of elite professionals working in university labs and government institutions. This traditional model is being disrupted by "Citizen Science." This is a movement that invites the general public to actively participate in real research and data collection. <u>By using apps to track bird migrations or analyzing satellite images for new planets, millions of volunteers are helping scientists process data at a scale that was previously impossible.</u> This "Crowdsourcing" of observation allows for the monitoring of vast environmental patterns. These patterns include the spread of invasive species or the impact of climate change on local flora, spanning entire continents and decades. This democratization of science transforms passive observers into active "Knowledge Co-creators."</p>
              <p>The rise of high-quality mobile hardware has fueled this revolution. Modern smartphones are equipped with sophisticated sensors, high-resolution cameras, and GPS tracking. This effectively turns every citizen into a mobile "Data Node." For example, the iNaturalist platform allows users to upload photos of plants and animals. These are then identified by a global community of experts and enthusiastic amateurs. This generates massive datasets that researchers use to map biodiversity and identify ecosystems in distress. The cumulative power of millions of individual observations provides a "Granular View" of our planet's health. No single research team could ever achieve this on their own. It is a testament to the idea that science is a collective human endeavor, not just a career path for the few.</p>
              <p>Beyond the data, citizen science serves a vital educational and social purpose. By engaging with the scientific method firsthand, participants develop a deeper "Scientific Literacy." They also gain a greater appreciation for the complexity of the natural world. It fosters a sense of "Environmental Stewardship" and civic responsibility. People see the direct impact of their contributions on conservation policy. Furthermore, projects like "Zooniverse" allow people to contribute to fields as diverse as astronomy, archaeology, and history from their own living rooms. This "Cognitive Surplus"—the collective brainpower of millions of people—is being harnessed to solve some of the world's most pressing puzzles. These range from classifying distant galaxies to transcribing ancient ship logs.</p>
              <p>Ultimately, citizen science bridges the gap between "Expertise" and "Engagement." It promotes transparency and trust in scientific institutions. It does this by making the research process more inclusive and accessible. As we face global challenges like pandemics and biodiversity loss, the ability to mobilize a global network of "Citizen Observers" is more critical than ever. We must ensure that these projects are designed to be inclusive. They should reach diverse communities and provide the training necessary for reliable participation. By valuing the "wisdom of the crowd," we can build a more resilient and informed society. This society will be capable of making data-driven decisions for the common good. The next great discovery might not happen in a lab, but in a backyard or on a hiking trail.</p>
            `,
            underlinedSentence: "By using apps to track bird migrations or analyzing satellite images for new planets, millions of volunteers are helping scientists process data at a scale that was previously impossible."
          },
          questions: [
            {
              id: "q_w48_p1_1",
              type: "detail",
              text: "What has disruptions the traditional model of scientific research?",
              options: ["Higher costs.", "The Citizen Science movement and the democratization of data collection.", "Better textbooks.", "New lab safety rules."],
              correctAnswer: "The Citizen Science movement and the democratization of data collection."
            },
            {
              id: "q_w48_p1_2",
              type: "inference",
              text: "How do smartphones contribute to citizen science?",
              options: ["They allow scientists to call each other.", "They act as mobile 'data nodes' with built-in sensors and cameras for research.", "They are used to pay for experiments.", "They make the labs cleaner."],
              correctAnswer: "They act as mobile 'data nodes' with built-in sensors and cameras for research."
            },
            {
              id: "q_w48_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "Gaming for a Cure: Foldit and Zooniverse",
            wordCount: 500,
            content: `
              <p>One of the most innovative branches of citizen science is "Gamification." This involves using game-design elements in non-game contexts to solve complex problems. Foldit, an online protein-folding puzzle, is a prime example. In this game, players compete to manipulate biological structures into their most stable shapes. <u>In 2011, gamers solved the structure of an AIDS-related enzyme that had baffled professional scientists for over a decade.</u> This breakthrough showed that the human brain's natural "Spatial Reasoning" and pattern-recognition abilities can sometimes outperform the most sophisticated computer algorithms. Gamers didn't need a PhD in biochemistry; they just needed a keen eye and a competitive spirit.</p>
              <p>However, the reliance on non-experts raises critical questions about "Data Integrity." Scientists must implement rigorous quality control measures to ensure that crowdsourced findings are accurate and reliable. This often involves "Standardization"—providing clear protocols and training for volunteers. It also involves "Multiple-Source Verification," where a single data point is confirmed by several independent observers. In many cases, the sheer "Power of Numbers" acts as a filter. While an individual amateur might make a mistake, the statistical consensus of thousands of participants tends to drift toward the truth. This is the "Wisdom of the Crowd" in action, where collective intelligence overcomes individual bias.</p>
              <p>Projects like Zooniverse further demonstrate the breadth of this potential. Users are invited to classify galaxies based on their shape. They can transcribe historical documents that are unreadable by AI. They can even listen to underwater recordings to identify whale songs. This "Distributed Intelligence" allows for the processing of gargantuan amounts of multimedia data. This data would otherwise languish in archives. It also highlights the "Intuition Gap" between humans and machines. While AI is excellent at repetitive tasks, humans remain superior at identifying "Outliers" and "Anomalies" that don't fit into a pre-defined pattern. This synergy between human curiosity and digital scale is the hallmark of modern research.</p>
              <p>In conclusion, gaming for a cure is a reminder that everyone has something to contribute to the global knowledge pool. It challenges the "ivory tower" image of science. It also shows that play can be a powerful tool for discovery. As we continue to develop more sophisticated "Virtual Labs" and "Citizen Platforms," the line between "Player" and "Researcher" will continue to blur. The key is to design systems that respect the participant's contribution while maintaining the highest scientific standards. By harnessing the collective passion and spatial brilliance of the global gaming community, we can accelerate the pace of medical and scientific breakthroughs. This proves that even a "puzzle" can change the world.</p>
            `,
            underlinedSentence: "In 2011, gamers solved the structure of an AIDS-related enzyme that had baffled professional scientists for over a decade."
          },
          questions: [
            {
              id: "q_w48_p2_1",
              type: "detail",
              text: "What human ability does Foldit leverage?",
              options: ["Speed typing.", "Spatial reasoning and pattern recognition.", "Memory of facts.", "Luck."],
              correctAnswer: "Spatial reasoning and pattern recognition."
            },
            {
              id: "q_w48_p2_2",
              type: "inference",
              text: "How is 'Data Integrity' maintained in citizen science?",
              options: ["By only hiring professionals.", "Through standardization, training, and multiple-source verification.", "By ignoring the data.", "By using more expensive sensors."],
              correctAnswer: "Through standardization, training, and multiple-source verification."
            },
            {
              id: "q_w48_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Democratization", definition: "The action of making something accessible to everyone." },
        { word: "Granular", definition: "Detailed; consisting of small parts." },
        { word: "Stewardship", definition: "The job of supervising or taking care of something, such as an organization or property." },
        { word: "Anomalies", definition: "Something that deviates from what is standard, normal, or expected." },
        { word: "Synergy", definition: "The interaction or cooperation of two or more organizations, substances, or other agents to produce a combined effect greater than the sum of their separate effects." }
      ]
    };
  }

  // Week 49: Review - Ethics
  if (weekNum === 49) {
    return {
      id: 49,
      title: "Review: Ethics",
      theme: "Ethics",
      mainIdeaHint: "Synthesize your ethical toolkit. How do Utilitarianism and Rights collide?",
      passages: [
        {
          passage: {
            title: "The Ethical Labyrinth",
            wordCount: 530,
            content: `
              <p>As we conclude our exploration of Ethics, we must synthesize the diverse frameworks we have studied throughout the curriculum. From the classic "Trolley Problem" to the modern dilemmas of Genetic Privacy, AI Judging, and Digital Empathy, we have consistently encountered a recurring tension. This tension exists between two dominant moral philosophies: "Utilitarianism" and "Deontology." Utilitarianism, championed by thinkers like Jeremy Bentham and John Stuart Mill, argues that the "right" action is the one that produces the "greatest good for the greatest number." It is a morality of mathematics and outcomes. It is often favored in policy-making and engineering. Deontology, rooted in the work of Immanuel Kant, argues that morality is based on absolute rules, duties, and inherent rights, regardless of the consequences. For a deontologist, human beings have dignity. They cannot be used as mere "means to an end."</p>
              <p>One of the key tools for navigating these conflicting views is the "Precautionary Principle." This principle suggests that if an action or a new technology has a suspected risk of causing severe or irreversible harm to the public or the environment, the burden of proof falls on those proposing the action. They must prove it is NOT harmful. In an era of rapid technological change—where we are deploying global-scale AI and genetic editing before we fully understand their long-term effects—this principle serves as a vital safeguard. It encourages "Ethical Humility." It reminds us that our scientific capabilities often outpace our moral wisdom. We must ask not just "Can we do it?" but "Should we do it?" and "What if we are wrong?"</p>
              <p>Furthermore, the complexity of modern life requires a "Global Moral Consensus." Technologies like the internet and biotechnology do not respect national borders. Therefore, ethical standards must be international. We need common "Ethical Guardrails" to prevent a "Race to the Bottom." This is where companies or nations ignore safety and rights in the pursuit of profit or power. This involves the creation of international bodies and treaties. These can hold actors to "Algorithmic Accountability." We must ensure that the benefits of progress are shared equitably. We must also ensure that the risks do not fall disproportionately on the most vulnerable members of society. Transparency is the antidote to the "Black Box" nature of many modern systems. It allows for public scrutiny and democratic control.</p>
              <p>Ultimately, <u>true ethical wisdom does not lie in memorizing rules, but in the courage to face uncertainty, armed with the empathy to understand how our choices affect the lives of others.</u> It is the practice of "Reflective Equilibrium"—the constant process of adjusting our principles and our actions. This ensures they are in harmony with our deepest values. Ethics is not a destination, but a journey. It is the ongoing conversation about what kind of world we want to build and what kind of people we want to be. As you move forward, carry this "Ethical Compass" with you. It is the only tool that can guide us through the labyrinth of the future.</p>
            `,
            underlinedSentence: "True ethical wisdom does not lie in memorizing rules, but in the courage to face uncertainty, armed with the empathy to understand how our choices affect the lives of others."
          },
          questions: [
            {
              id: "q_w49_p1_1",
              type: "detail",
              text: "What is the 'Precautionary Principle'?",
              options: ["Taking risks to move faster.", "The idea that if an action might cause harm, the burden of proof of its safety falls on those proposing it.", "Always following the leader.", "Waiting for others to act first."],
              correctAnswer: "The idea that if an action might cause harm, the burden of proof of its safety falls on those proposing it."
            },
            {
              id: "q_w49_p1_2",
              type: "inference",
              text: "Why is a 'Global Moral Consensus' necessary in the modern era?",
              options: ["Because everyone should speak the same language.", "Because technologies like the internet and biotechnology cross national borders and require international standards.", "To make products cheaper.", "To stop all scientific research."],
              correctAnswer: "Because technologies like the internet and biotechnology cross national borders and require international standards."
            },
            {
              id: "q_w49_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "Case Study: The Autonomous Vehicle Dilemma",
            wordCount: 505,
            content: `
              <p>The 21st century has brought ethics into the realm of biology and engineering. Technologies like CRISPR-Cas9 allow us to edit the very code of life. Self-driving cars force machines to make life-and-death choices. <u>While these tools promise to cure genetic diseases, they also threaten to create a 'genetic divide' between those who can afford enhancements and those who cannot.</u> Similarly, the "Trolley Problem" is no longer a theoretical exercise for philosophy students. It is a practical engineering challenge. If an autonomous vehicle is faced with an unavoidable crash, should it prioritize the safety of its passengers? Or should it swerve to protect a larger number of pedestrians? The answer depends entirely on the "Ethical Framework" programmed into its software.</p>
              <p>The "Moral Machine" project at MIT explored this dilemma. It collected millions of decisions from people around the world. The results showed significant cultural variations in ethical preferences. Some cultures prioritized the young, others the elderly. Some prioritized law-abiding citizens, others the sheer number of lives saved. This highlights the difficulty of creating a "Universal Algorithm" for morality. To address this, we need "Algorithmic Accountability"—a transparent look at the values and biases that are baked into our code. We must ensure that these systems are not "Black Boxes" that make decisions in a vacuum. Instead, they must be subject to public review and democratic oversight.</p>
              <p>Furthermore, we must guard against "Technological Determinism"—the belief that technology is an unstoppable force. This force shapes society regardless of our intentions. We have the power to steer the development of these tools. This requires "Ethical Design." Values like privacy, fairness, and safety are integrated from the very beginning of the engineering process. They are not added as an afterthought. We must also consider the "Secondary Effects" of our inventions. How will self-driving cars change our city planning? How will they change our transit systems and our sense of community? The goal must be "Human-Centric AI." This AI enhances human agency and dignity rather than replacing it.</p>
              <p>In the final analysis, the "Bioethics Revolution" and the rise of autonomous systems are calls to remain human in a world of machines. We must value the "Essential Mystery" of life over the efficiency of the algorithm. This requires us to be "Perpetual Students" of ethics. We must constantly question our assumptions and adjust our course. By fostering a culture of "Moral Inquiry," we can ensure that our technologies serve as bridges to a more just and compassionate world. The future is not something that happens to us. It is something we create with every choice we make. Let us choose wisely.</p>
            `,
            underlinedSentence: "While these tools promise to cure genetic diseases, they also threaten to create a 'genetic divide' between those who can afford enhancements and those who cannot."
          },
          questions: [
            {
              id: "q_w49_p2_1",
              type: "detail",
              text: "What did the 'Moral Machine' project at MIT reveal?",
              options: ["Most people agree on everything.", "There are significant cultural variations in ethical preferences across different regions.", "Computers are better at ethics than humans.", "People don't care about self-driving cars."],
              correctAnswer: "There are significant cultural variations in ethical preferences across different regions."
            },
            {
              id: "q_w49_p2_2",
              type: "inference",
              text: "What is 'Technological Determinism'?",
              options: ["The belief that technology is the only thing that matters.", "The mistaken belief that technology is an unstoppable force that shapes society regardless of human choice or intention.", "Using computers to make decisions.", "A type of engineering degree."],
              correctAnswer: "The mistaken belief that technology is an unstoppable force that shapes society regardless of human choice or intention."
            },
            {
              id: "q_w49_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Synthesize", definition: "Combine elements to form a connected whole." },
        { word: "Equilibrium", definition: "A state in which opposing forces or influences are balanced." },
        { word: "Oversight", definition: "The action of overseeing something." },
        { word: "Determinism", definition: "The doctrine that all events, including human action, are ultimately determined by causes external to the will." },
        { word: "Perpetual", definition: "Never ending or changing." }
      ]
    };
  }

  // Week 50: Review - Media
  if (weekNum === 50) {
    return {
      id: 50,
      title: "Review: Media",
      theme: "Media",
      mainIdeaHint: "Reflect on the mirror. Do we shape media, or does it shape us?",
      passages: [
        {
          passage: {
            title: "Navigating the Information Age",
            wordCount: 520,
            content: `
              <p>As we conclude our study of Media, we find ourselves at the center of the greatest paradox in human history. We are the most connected humans to ever live. The sum total of human knowledge is available at our fingertips. Yet, we often report feeling more isolated and polarized than ever before. Our journey through the "24-Hour News Cycle," "Digital Empathy," and the "Remote Revolution" has revealed a fundamental truth: technology is not a neutral tool. It is an ecosystem that shapes our perceptions, our relationships, and our very sense of reality. The internet has democratized knowledge. It has broken down the gates of traditional institutions. However, it has also empowered the "Attention Economy"—a business model where human attention is the primary commodity being traded for profit.</p>
              <p>This attention-driven ecosystem is designed to exploit human psychology. Social media platforms use "Variable Reward" schedules—similar to slot machines—to keep users engaged for as long as possible. <u>Platforms are designed to exploit human psychology, prioritizing content that triggers fear or anger because that is what keeps us scrolling.</u> This "Outrage Loop" leads to the creation of "Filter Bubbles" and "Echo Chambers." Here, we are only exposed to information that confirms our existing biases. When we are constantly bombarded with "Clickbait" and sensationalized headlines, our capacity for deep reading and critical thinking begins to erode. We must remember the foundational rule of the digital age: If you are not paying for the product, *you* are the product.</p>
              <p>To navigate this landscape, we must cultivate "Media Literacy"—the ability to access, analyze, evaluate, and create media in all its forms. This involves understanding "Motivated Reasoning"—our tendency to accept information that fits our worldview and reject information that challenges it. By practicing "Lateral Reading"—checking multiple sources to verify a claim rather than staying on one page—we can build a more accurate map of the world. We must also demand "Algorithmic Transparency." This ensures that the systems that curate our information are subject to public oversight and ethical standards. Protecting the "Public Square" of ideas requires both individual responsibility and collective action.</p>
              <p>In conclusion, the information age is a call to become "Digital Citizens" rather than just passive consumers. We have the power to choose what we pay attention to and what we share. By slowing down, seeking out diverse perspectives, and prioritizing "Nuance" over consensus, we can reclaim the internet as a tool for genuine connection and understanding. Media is a mirror. It reflects the best and worst of our humanity. The question for the future is whether we have the wisdom to see ourselves clearly. Do we have the character to build a media environment that supports the common good? Truth is not just something we find; it is something we must actively defend.</p>
            `,
            underlinedSentence: "Platforms are designed to exploit human psychology, prioritizing content that triggers fear or anger because that is what keeps us scrolling."
          },
          questions: [
            {
              id: "q_w50_p1_1",
              type: "detail",
              text: "What is the primary commodity in the 'Attention Economy'?",
              options: ["High-speed internet.", "Human attention and engagement.", "New smartphone hardware.", "Government data."],
              correctAnswer: "Human attention and engagement."
            },
            {
              id: "q_w50_p1_2",
              type: "inference",
              text: "What is 'Lateral Reading'?",
              options: ["Reading a book from side to side.", "The practice of checking multiple sources to verify a claim rather than staying on a single website.", "Skipping the headlines.", "Only reading one newspaper."],
              correctAnswer: "The practice of checking multiple sources to verify a claim rather than staying on a single website."
            },
            {
              id: "q_w50_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "The Future of Information Integrity",
            wordCount: 510,
            content: `
              <p>Looking ahead, the challenge of maintaining "Information Integrity" is becoming increasingly complex. The rise of Artificial Intelligence and "Synthetically Generated Content" has brought us into a "Post-Truth" era. In this era, the line between reality and fabrication is intentionally blurred. "Deepfakes"—hyper-realistic AI-generated images, audio, and videos—make it possible to depict anyone doing or saying anything, anywhere. <u>This 'post-truth' era threatens the foundation of democracy, which relies on a shared set of facts to make collective decisions.</u> Without a shared reality, "Democratic Deliberation" becomes impossible. Citizens cannot even agree on the basic facts of a situation. This leads to "Truth Decay," the diminishing role of evidence and analysis in public life.</p>
              <p>One response to this crisis is the "Slow Journalism" movement. This movement prioritizes accuracy, depth, and context over the "Fast Food" logic of the 24-hour news cycle. By focusing on long-form reporting and investigative work, these outlets aim to provide the "Deep Context" necessary to understand complex global issues. They reject the click-driven metrics of the attention economy. They favor "Sub-stack" and "Patreon" models, where readers directly support the creators they trust. This "Decentralized Media" landscape offers hope for a more diverse and resilient information ecosystem. However, it also places a greater burden on the individual reader to act as their own "Fact-Checker." Trust must be earned through transparency and a track record of reliability.</p>
              <p>Furthermore, we must practice "Intellectual Humility"—the willingness to admit that we might be wrong. We must also have the openness to change our minds when presented with new evidence. In a world of "Echo Chambers," this is a radical act of resistance. It requires us to actively seek out "Outgroup Voices." It also requires us to engage in "Good Faith" debate even with those we disagree with. We must also support the development of "Detection Technologies"—AI tools that can identify deepfakes and attribute the source of a piece of content. However, technology alone cannot fix a problem that is fundamentally social and psychological. We need a "New Enlightenment," where reason and empathy are valued above outrage and tribalism.</p>
              <p>In the final analysis, the future of information is in our hands. As we move further into the digital century, the skills we have practiced this year—inference, critical analysis, and nuanced paraphrasing—will be the "Armor" that protects us from manipulation. We must remain curious, skeptical, and committed to the truth, even when it is uncomfortable. The information age doesn't have to be a "Dark Age" of misinformation. It can be an era of "Radical Transparency" and global collaboration. By choosing to be informed, active, and empathetic participants in our media environment, we can ensure that the "Mirror" of media reflects a world that is more just, more informed, and more human.</p>
            `,
            underlinedSentence: "This 'post-truth' era threatens the foundation of democracy, which relies on a shared set of facts to make collective decisions."
          },
          questions: [
            {
              id: "q_w50_p2_1",
              type: "detail",
              text: "What is 'Truth Decay'?",
              options: ["Forgetting things as you get older.", "The diminishing role of evidence, data, and analysis in public life.", "A type of tooth disease.", "Libraries closing down."],
              correctAnswer: "The diminishing role of evidence, data, and analysis in public life."
            },
            {
              id: "q_w50_p2_2",
              type: "inference",
              text: "What characterizes the 'Slow Journalism' movement?",
              options: ["News that is delivered by mail.", "A focus on accuracy, depth, and context over speed and clicks.", "Journalists who walk slowly.", "A lack of internet access."],
              correctAnswer: "A focus on accuracy, depth, and context over speed and clicks."
            },
            {
              id: "q_w50_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Paradox", definition: "A seemingly absurd or self-contradictory statement or proposition that when investigated or explained may prove to be true." },
        { word: "Gargantuan", definition: "Enormous." },
        { word: "Integrity", definition: "The quality of being honest and having strong moral principles; here, the state of being whole and undivided." },
        { word: "Deliberation", definition: "Long and careful consideration or discussion." },
        { word: "Humility", definition: "A modest or low view of one's own importance; humbleness." }
      ]
    };
  }
  // Week 51: Screen Addiction (Media & Tech)
  if (weekNum === 51) {
    return {
      id: 51,
      title: "Screen Addiction",
      theme: "Media",
      mainIdeaHint: "Is your phone changing your brain? Compare the dopamine loop to traditional addiction.",
      passages: [
        {
          passage: {
            title: "Screen Addiction: The Dopamine Loop",
            wordCount: 475,
            content: `
              <p>In the digital age, the sight of people hunched over glowing screens in public spaces has become ubiquitous. While some dismiss this as a mere cultural shift, psychologists are increasingly concerned about the neurobiological impact of "Screen Addiction." <u>Psychologists argue that the mechanics of social media—infinite scrolls, likes, and notifications—are intentionally designed to trigger dopamine releases similar to gambling.</u> This creates a "Variable Reward" schedule. In this system, the uncertainty of the next "hit" (a new like, an interesting post, or a message) keeps the user engaged in a state of perpetual anticipation. This "Dopamine-Driven Feedback Loop" is not an accident of design. It is a deliberate application of behavioral psychology intended to maximize "User Retention" and platform engagement.</p>
              <p>The core of this issue lies in the brain's "Reward System." When we receive a notification, our brain releases a small burst of dopamine—a neurotransmitter associated with pleasure and motivation. Over time, the brain begins to crave this chemical stimulus, leading to the development of a "Tolerance." Users find they need more screen time and more intense digital interactions to achieve the same sense of satisfaction. When deprived of their devices, many individuals experience "Digital Withdrawal." This is characterized by anxiety, irritability, and a profound sense of FOMO (Fear of Missing Out). This mimics the classic patterns seen in substance abuse and gambling disorders. It has led to a debate about whether "Internet Addiction Disorder" should be formally recognized as a clinical condition.</p>
              <p>Furthermore, the design of modern apps often removes "Stopping Cues." These are natural points where a user would typically pause or finish an activity. Features like "Infinite Scroll" on social media and "Auto-play" on video platforms ensure that the flow of information never ends. This makes it psychologically difficult for the user to disengage. This bypasses the "Prefrontal Cortex," the part of the brain responsible for impulse control and logical decision-making. By the time the user realizes they have spent hours scrolling, their cognitive resources are depleted. This "Decision Fatigue" makes it even harder to exert the willpower necessary to put the phone down, creating a self-reinforcing cycle of consumption.</p>
              <p>In conclusion, screen addiction is a complex interplay between sophisticated technology and primitive biology. As we continue to integrate digital devices into every aspect of our lives, we must develop a greater awareness of the "Invisible Hooks" that keep us tethered to our screens. We need to move toward "Ethical Design" that respects human agency rather than exploiting our neural vulnerabilities. On an individual level, practicing "Digital Hygiene" is essential. This involves setting firm boundaries for screen use and maintaining mental well-being. The true measure of our technological progress is not how long we spend on our devices. It is whether we remain the masters of our tools rather than their servants.</p>
            `,
            underlinedSentence: "Psychologists argue that the mechanics of social media—infinite scrolls, likes, and notifications—are intentionally designed to trigger dopamine releases similar to gambling."
          },
          questions: [
            {
              id: "q_w51_p1_1",
              type: "detail",
              text: "What characterizes a 'Variable Reward' schedule in social media?",
              options: ["Receiving a reward at fixed intervals.", "The uncertainty of when the next 'like' or interesting post will appear.", "Never receiving a reward.", "Paying for rewards."],
              correctAnswer: "The uncertainty of when the next 'like' or interesting post will appear."
            },
            {
              id: "q_w51_p1_2",
              type: "inference",
              text: "Why are 'Stopping Cues' important for healthy digital behavior?",
              options: ["They make the apps run faster.", "They provide natural pause points that allow the user to consciously decide to stop.", "They increase ad revenue.", "They make the screen brighter."],
              correctAnswer: "They provide natural pause points that allow the user to consciously decide to stop."
            },
            {
              id: "q_w51_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "The Distracted Brain and the Need for Detox",
            wordCount: 460,
            content: `
              <p>The impact of constant screen use is particularly profound on the adolescent brain. This brain is still in a critical stage of development. The prefrontal cortex, which is responsible for higher-order functions like planning, focus, and impulse control, does not fully mature until the mid-twenties. <u>Constant multitasking between apps prevents the brain from entering 'deep work' states, leading to a fragmented attention span.</u> This "Continuous Partial Attention" prevents the deep processing of information. It hinders the ability to form complex memories. Instead of mastering one subject, we become "Digital Grazers." We skim the surface of many topics without ever achieving a deeper understanding. This has significant implications for education and the future of work.</p>
              <p>Beyond the cognitive costs, screen addiction has a "Social and Emotional Toll." When we are physically present with others but mentally occupied by our devices—a phenomenon known as "Phubbing"—we erode the quality of our real-world relationships. Digital interactions lack the "Social Cues" of face-to-face communication. These cues, such as tone of voice, body language, and eye contact, are essential for building empathy and trust. This can lead to a sense of "Connected Loneliness," where we have thousands of "Friends" online but feel profoundly isolated in our daily lives. The "Comparison Trap"—constantly measuring our lives against the curated, perfect versions of others seen on social media—further contributes to rising rates of anxiety and depression.</p>
              <p>To combat these effects, many are turning to a "Digital Detox." This is a period of time during which a person refrains from using electronic devices. This is supported by "Attention Restoration Theory." This theory suggests that spending time in natural, non-digital environments allows the brain to recover its "Involuntary Attention" resources. A detox helps to reset the brain's reward system and break the "Dopamine Loop." It allows for the rediscovery of slower, more meaningful activities like reading, conversation, and hobbies. It's not about abandoning technology altogether, but about regaining "Cognitive Agency." By intentionally disconnecting, we can reconnect with our own thoughts and the world around us.</p>
              <p>In the final analysis, our screens are powerful windows into a world of information, but they can also become cages that limit our focus and our freedom. Achieving "Digital Balance" requires a conscious effort to prioritize "Quality over Quantity" in our interactions. We must learn to use technology "Mindfully," checking our motives before we pick up the phone. This might involve setting "No-Phone Zones," turning off non-human notifications, or using apps that track and limit our screen time. The goal is to ensure that our digital lives serve our human goals, not the other way around. Reclaiming our attention is the first step toward reclaiming our lives.</p>
            `,
            underlinedSentence: "Constant multitasking between apps prevents the brain from entering 'deep work' states, leading to a fragmented attention span."
          },
          questions: [
            {
              id: "q_w51_p2_1",
              type: "detail",
              text: "What part of the brain is still developing in adolescents and is affected by constant screen use?",
              options: ["The cerebellum.", "The prefrontal cortex.", "The amygdala.", "The hippocampus."],
              correctAnswer: "The prefrontal cortex."
            },
            {
              id: "q_w51_p2_2",
              type: "inference",
              text: "What is 'Phubbing'?",
              options: ["Playing a video game.", "Ignoring the person you are with in favor of your smartphone.", "A type of physical exercise.", "Fixing a broken phone."],
              correctAnswer: "Ignoring the person you are with in favor of your smartphone."
            },
            {
              id: "q_w51_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Ubiquitous", definition: "Present, appearing, or found everywhere." },
        { word: "Phubbing", definition: "The practice of ignoring one's companion or companions in order to pay attention to one's phone." },
        { word: "Restoration", definition: "The action of returning something to a former owner, place, or condition." },
        { word: "Agency", definition: "The capacity of an individual to act independently and to make their own free choices." },
        { word: "Adolescence", definition: "The period following the onset of puberty during which a young person develops from a child into an adult." }
      ]
    };
  }

  // Week 52: Failure & Mastery (Education)
  if (weekNum === 52) {
    return {
      id: 52,
      title: "Failure & Mastery",
      theme: "Education",
      mainIdeaHint: "Is the fear of failing the biggest barrier to learning?",
      passages: [
        {
          passage: {
            title: "Lessons from Failure: The Growth Mindset",
            wordCount: 475,
            content: `
              <p>In many modern educational environments, failure is treated as a catastrophe. It is seen as a permanent red mark on a transcript that lowers a student's grade and, by extension, their perceived potential. However, this focus on "Performance Orientation" often overlooks the most critical aspect of the learning process: the evolution of understanding through error. In the worlds of science, engineering, and high-level innovation, failure is not a dead end. It is simply "Data." <u>The most profound learning occurs not when we get the answer right the first time, but when our errors force us to re-examine our assumptions.</u> This "Productive Struggle" is the heart of intellectual growth. It builds the neural pathways necessary for complex problem-solving and resilience.</p>
              <p>Psychologist Carol Dweck identifies this as the difference between a "Fixed Mindset" and a "Growth Mindset." Individuals with a fixed mindset believe that intelligence and talent are static traits. For them, failure is a shameful proof of inadequacy. This leads to "Self-Handicapping," where students avoid challenges for fear of looking "stupid." Conversely, those with a growth mindset view their abilities as muscles that can be developed through effort and persistence. For them, failure is a signal to try a different strategy or to put in more "Deliberate Practice." By fostering a "Culture of Error" in the classroom, we can encourage students to take the intellectual risks necessary for original thought and creative breakthrough.</p>
              <p>The history of human achievement is littered with "Successful Failures." Thomas Edison's thousands of attempts to create a viable lightbulb were not "Mistakes" in his eyes, but a necessary process of elimination. This "Iterative Process"—failing fast and learning faster—is now the hallmark of the most successful technology companies. It requires a high degree of "Psychological Safety," where individuals feel comfortable admitting ignorance and sharing their half-baked ideas without fear of ridicule. When we remove the stigma of failure, we unlock the door to "Divergent Thinking." This allows for a more expansive and adventurous approach to learning. We must move from a model of "Right vs. Wrong" to one of "Not Yet."</p>
              <p>Ultimately, the goal of education should not be to produce "Error-Free" students, but to develop individuals who can navigate the "Complexity" of a world that has no easy answers. We must value the "Scaffolding" process—the messy, sometimes frustrating work of building understanding from the ground up. This requires "Grit," the passion and perseverance for long-term goals. By embracing the "Wisdom of Failure," we teach students that setbacks are not an obstacle to success; they are the path to it. The true test of a person's education is not what they know when things go well, but how they behave when things go wrong.</p>
            `,
            underlinedSentence: "The most profound learning occurs not when we get the answer right the first time, but when our errors force us to re-examine our assumptions."
          },
          questions: [
            {
              id: "q_w52_p1_1",
              type: "detail",
              text: "According to Carol Dweck, what is the difference between a 'Fixed Mindset' and a 'Growth Mindset'?",
              options: ["Fixed mindset believes intelligence is static, growth mindset believes abilities can be developed.", "Fixed mindset leads to success, growth mindset leads to failure.", "Fixed mindset is for adults, growth mindset is for children.", "Fixed mindset is about memorization, growth mindset is about creativity."],
              correctAnswer: "Fixed mindset believes intelligence is static, growth mindset believes abilities can be developed."
            },
            {
              id: "q_w52_p1_2",
              type: "inference",
              text: "Why is 'Psychological Safety' important for innovation?",
              options: ["It makes people feel comfortable doing nothing.", "It encourages individuals to admit ignorance and share ideas without fear of ridicule, fostering divergent thinking.", "It ensures everyone agrees on the same ideas.", "It prevents any mistakes from happening."],
              correctAnswer: "It encourages individuals to admit ignorance and share ideas without fear of ridicule, fostering divergent thinking."
            },
            {
              id: "q_w52_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "Mastery-Based Learning: Beyond Grades",
            wordCount: 475,
            content: `
              <p>Traditional education often relies on a "Time-Based" model. Students move through content at a fixed pace, regardless of whether they have truly mastered the material. This system often leaves gaps in understanding. It can lead to a fragile foundation for future learning. In contrast, "Mastery-Based Learning" (MBL) focuses on ensuring that students achieve a deep understanding of concepts before moving on. <u>In MBL, the "constant" is the level of understanding achieved, and the "variable" is the time it takes each student to reach that mastery.</u> This approach recognizes that learning is not a race. It is a process that unfolds at different rates for different individuals.</p>
              <p>The core principle of MBL is "Formative Assessment." This means continuous feedback and opportunities for revision. Students are not simply graded and moved on. Instead, they receive targeted support to address their specific areas of weakness. This fosters a "Growth Mindset" by emphasizing improvement over innate ability. It also reduces "Performance Anxiety." Students know they will have multiple chances to demonstrate their understanding. This leads to more "Durable Learning." Knowledge becomes "sticky." It remains in long-term memory. It can be applied in new situations. This is a significant shift from "Rote Memorization," where information is quickly forgotten after a test.</p>
              <p>Implementing MBL requires a flexible curriculum and "Differentiated Instruction." Teachers must be able to provide varied pathways for students to learn and demonstrate mastery. This might involve offering different resources, activities, or assessment formats. Technology can play a crucial role here. "Adaptive Learning Platforms" can personalize the learning experience. They provide immediate feedback and adjust the difficulty of tasks based on student performance. This allows teachers to act as "Facilitators" and "Coaches." They can focus on individual student needs rather than delivering one-size-fits-all lectures. This creates a more "Student-Centered" learning environment.</p>
              <p>In conclusion, Mastery-Based Learning is not just a pedagogical trend. It is a fundamental rethinking of what it means to learn and to teach. By prioritizing deep understanding and individual progress, MBL prepares students not just for tests, but for life. It cultivates "Self-Directed Learners" who are resilient in the face of challenges. They are confident in their ability to acquire new skills. It moves beyond the "Tyranny of the Average." It celebrates the unique learning journey of each student. The ultimate goal is to empower every individual to reach their full "Intellectual Potential." This ensures they are equipped to tackle the complex problems of the 21st century.</p>
            `,
            underlinedSentence: "In MBL, the 'constant' is the level of understanding achieved, and the 'variable' is the time it takes each student to reach that mastery."
          },
          questions: [
            {
              id: "q_w52_p2_1",
              type: "detail",
              text: "In Mastery-Based Learning, what is the 'constant'?",
              options: ["The time spent on a topic.", "The level of understanding achieved.", "The teacher's lecture.", "The textbook used."],
              correctAnswer: "The level of understanding achieved."
            },
            {
              id: "q_w52_p2_2",
              type: "inference",
              text: "What does knowledge being 'sticky' mean in this context?",
              options: ["It is hard to use.", "It remains in long-term memory and can be applied in new situations.", "It is messy.", "It is only for one test."],
              correctAnswer: "It remains in long-term memory and can be applied in new situations."
            },
            {
              id: "q_w52_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Orientation", definition: "A person's basic attitude, belief, or feelings." },
        { word: "Iterative", definition: "Relating to or involving iteration, especially of a mathematical or computational process." },
        { word: "Stigma", definition: "A mark of disgrace associated with a particular circumstance, quality, or person." },
        { word: "Scaffolding", definition: "A variety of instructional techniques used to move students toward stronger understanding and, ultimately, greater independence in the learning process." },
        { word: "Differentiated", definition: "Recognized as different." }
      ]
    };
  }

  // Week 53: Resilience (Ethics)
  if (weekNum === 53) {
    return {
      id: 53,
      title: "Resilience",
      theme: "Ethics",
      mainIdeaHint: "Is resilience a 'bounce back' or a 'move forward'?",
      passages: [
        {
          passage: {
            title: "How Resilience Works: The Stockdale Paradox",
            wordCount: 475,
            content: `
              <p>Resilience is often defined as the capacity to recover quickly from difficulties. In reality, it is more than just "bouncing back." It is a complex interplay of individual traits, social support, and environmental factors. It is not an innate quality that people either have or don't. <u>In reality, resilience is a set of skills and behaviors that can be practiced and developed over time.</u> One of the most powerful concepts in this field is the "Stockdale Paradox." This concept is named after Admiral James Stockdale, a prisoner of war. It involves the ability to retain absolute faith that you will prevail in the end, regardless of the difficulties. At the same time, you must confront the most "Brutal Facts" of your current reality. This balance of "Realistic Optimism" prevents false hope while maintaining the motivation to endure.</p>
              <p>At the core of resilience is the cognitive ability known as "Reframing." This involves shifting your perspective on a negative event to see it in a more manageable light. Instead of seeing a setback as a permanent failure, a resilient individual sees it as a "Temporary Challenge" or an opportunity to learn. This "Cognitive Flexibility" allows a person to avoid the "Victim Narrative" and instead focus on what they can control. "Self-Efficacy"—the belief in one's own ability to succeed in specific situations—is a vital component of this process. When we believe that our actions can make a difference, we are more likely to exert the effort necessary to overcome obstacles. This sense of "Agency" is the engine of survival.</p>
              <p>Furthermore, resilience is significantly bolstered by "Social Capital"—the network of relationships that provide emotional and practical support. No one is an island. The ability to reach out for help is a sign of "Inner Strength," not weakness. Strong bonds with family, friends, and community members act as a "Buffer" against the physiological impacts of stress. These connections provide a "Safe Harbor" where individuals can process their emotions and gain new perspectives on their problems. In many cases, the collective resilience of a community can sustain individuals who might otherwise break under pressure. This "Interdependence" highlights that our survival is a shared endeavor.</p>
              <p>In conclusion, resilience is a dynamic process of "Adaptation" and "Post-Traumatic Growth." Some individuals don't just return to their original state after a trauma; they emerge with a deeper sense of purpose and stronger relationships. This "Anti-Fragility"—a term coined by Nassim Taleb—describes systems that actually gain strength from disorder and stress. By cultivating the skills of reframing, building social support, and maintaining realistic optimism, we can develop a resilient core. This allows us to withstand the storms of life. Resilience is the quiet "Endurance" that allows us to move forward, even when the path is unclear. It is the ultimate human "Resource."</p>
            `,
            underlinedSentence: "In reality, resilience is a set of skills and behaviors that can be practiced and developed over time."
          },
          questions: [
            {
              id: "q_w53_p1_1",
              type: "detail",
              text: "What is the 'Stockdale Paradox'?",
              options: ["The belief that everything will be easy.", "The ability to balance absolute faith in ultimate victory with the confrontation of brutal current facts.", "Always being pessimistic.", "Expecting others to save you."],
              correctAnswer: "The ability to balance absolute faith in ultimate victory with the confrontation of brutal current facts."
            },
            {
              id: "q_w53_p1_2",
              type: "inference",
              text: "How does 'Anti-Fragility' differ from simple resilience?",
              options: ["It means breaking easily.", "While resilience is about staying the same, anti-fragility is about gaining strength and improving because of stress.", "It is a type of crystal.", "It only applies to machines."],
              correctAnswer: "While resilience is about staying the same, anti-fragility is about gaining strength and improving because of stress."
            },
            {
              id: "q_w53_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "The Narrative of Growth: Turning Suffering into Wisdom",
            wordCount: 460,
            content: `
              <p>Cultivating resilience requires a fundamental shift in our "Internal Narrative." When faced with a major setback, the instinctive human response is often to ask "Why is this happening to me?" This "Victim Mentality" can be paralyzing. It leads to a sense of helplessness and despair. Resilient individuals, however, learn to ask a different question: "What can I learn from this?" <u>By framing challenges as opportunities for growth, we transform suffering into wisdom.</u> This process of "Sense-Making" allows us to integrate negative experiences into a stronger, more complex self-concept. It doesn't mean ignoring the pain or pretending that a tragedy is a "blessing." It means finding a way to move forward with the "Scars" as a testament to our survival.</p>
              <p>This narrative shift is supported by "Physical Self-Care" and "Mindfulness." The mind and body are deeply interconnected. The physiological symptoms of stress—such as a racing heart and shallow breathing—can be managed through intentional "Regulation" techniques. Regular exercise, adequate sleep, and "Meditation" provide the biological foundation for mental toughness. By practicing "Presence," we can avoid being "Triggered" by past traumas or overwhelmed by future anxieties. This "Groundedness" allows us to respond to challenges with "Clarity" rather than "Reactivity." It creates a mental "Space" where we can choose our response rather than being driven by instinct.</p>
              <p>Another vital strategy is the pursuit of "Meaningful Goals." Having a "Sense of Purpose"—a reason to get out of bed in the morning—is a powerful "Anchor" in turbulent times. Whether it is a career, a creative project, or caring for a loved one, "Voluntary Responsibility" provides the structure and motivation necessary to endure hardship. This is the central thesis of Viktor Frankl's "Man's Search for Meaning," written after his survival of the Holocaust. He observed that those who had a "task" waiting for them were more likely to survive. Our "Why" provides the strength for any "How." By focusing on our contributions to the world, we can transcend our individual pain.</p>
              <p>In the final analysis, resilience is a "Lifelong Practice," not a destination. It requires the constant maintenance of our mental, emotional, and physical "Health." We must be "Perpetual Students" of our own reactions. We must learn to identify our "Triggers" and practice our "Coping Strategies" long before the next crisis hits. By building a "Community of Resilience," we can support each other through the inevitable ups and downs of the human experience. The true measure of our resilience is not that we never fall, but that we always find the strength to "Get Back Up." It is the "Indomitable Spirit" that defines our species. Every challenge is a "Masterclass" in the art of living.</p>
            `,
            underlinedSentence: "By framing challenges as opportunities for growth, we transform suffering into wisdom."
          },
          questions: [
            {
              id: "q_w53_p2_1",
              type: "detail",
              text: "What was Viktor Frankl's observation about survival in the Holocaust?",
              options: ["Only the strongest survived.", "Those who had a sense of purpose or a 'task' waiting for them were more likely to survive.", "Luck was the only factor.", "Escape was the only way."],
              correctAnswer: "Those who had a sense of purpose or a 'task' waiting for them were more likely to survive."
            },
            {
              id: "q_w53_p2_2",
              type: "inference",
              text: "How does 'Groundedness' help in responding to challenges?",
              options: ["It makes you faster.", "It allows for responses based on clarity rather than reactive instinct.", "It helps you hide better.", "It means you don't feel any pain."],
              correctAnswer: "It allows for responses based on clarity rather than reactive instinct."
            },
            {
              id: "q_w53_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Anti-Fragility", definition: "A property of systems in which they increase in capability, resilience, or robustness as a result of stressors, shocks, volatility, noise, mistakes, faults, attacks, or failures." },
        { word: "Buffer", definition: "A person or thing that reduces a shock or that forms a barrier between incompatible or antagonistic people or things." },
        { word: "Indomitable", definition: "Impossible to subdue or defeat." },
        { word: "Triggers", definition: "An event or situation that causes something to happen, especially a physical or emotional reaction." },
        { word: "Transcend", definition: "Be or go beyond the range or limits of (something abstract, typical a conceptual field or division)." }
      ]
    };
  }

  // Week 54: Happiness Science (Global)
  if (weekNum === 54) {
    return {
      id: 54,
      title: "Happiness Science",
      theme: "Global",
      mainIdeaHint: "Is happiness a destination or a practice?",
      passages: [
        {
          passage: {
            title: "The Empirical Study of Well-Being: Beyond the Treadmill",
            wordCount: 475,
            content: `
              <p>For centuries, philosophers have debated the nature of the "Good Life," but only recently has it become a subject of rigorous scientific inquiry. Positive psychology, a field pioneered by researchers like Martin Seligman, seeks to understand the "Empirical Keys" to human flourishing. Modern research suggests that happiness is not merely the absence of suffering or the result of good luck. It is a combination of high-quality social relationships, a sense of autonomy, and the pursuit of meaningful goals. <u>Surprisingly, once basic needs are met, additional wealth has a diminishing return on overall life satisfaction.</u> This phenomenon is known as the "Easterlin Paradox." It suggests that our "Subjective Well-Being" is more closely tied to our relative status and the quality of our daily experiences than to the size of our bank accounts.</p>
              <p>The primary psychological barrier to lasting joy is the "Hedonic Treadmill"—our tendency to quickly adapt to improved circumstances and return to a stable "Baseline" of happiness. When we get a promotion or buy a new car, we experience a temporary "Dopamine Spike." However, the luxury soon becomes the new "Normal," and we begin to crave the next upgrade. This "Acquisition Loop" is fueled by "Social Comparison," where we measure our success against those who have more than we do. To break this cycle, psychologists recommend shifting focus from "Extrinsic Goals" like wealth to "Intrinsic Goals" like personal growth and community. According to "Self-Determination Theory," these intrinsic pursuits satisfy fundamental human needs for "Competence" and "Connection."</p>
              <p>Another vital component of happiness is the "Flow State," a term coined by Mihaly Csikszentmihalyi. Flow is the state of being so fully immersed in an activity that time seems to disappear. This occurs whether it is painting, coding, playing a sport, or having a deep conversation. In this state, the "Self-Conscious" mind shuts down. We operate at the peak of our "Creative Potential." Achieving flow requires a balance between the "Complexity" of the challenge and our own "Skill Level." If a task is too easy, we remain bored; if it is too hard, we become anxious. Frequent experiences of flow are highly correlated with long-term life satisfaction and "Eudaimonia"—the sense of "Human Excellence."</p>
              <p>In conclusion, the science of happiness teaches us that well-being is more of a "Practice" than a "Product." We must move away from the "Consumption Model" of joy and toward an "Engagement Model." This requires a conscious effort to cultivate "Gratitude" for what we have, rather than dwelling on what we lack. It also involves setting "Bounded Goals" and learning to say "Enough." By understanding the "Biological and Psychological Mechanisms" that drive our moods, we can take more "Intentional Control" over our emotional lives. Happiness is not something that happens to us. It is something we create through the quality of our "Attention" and the depth of our "Character." The "Good Life" is a "Direction," not a "Destination."</p>
            `,
            underlinedSentence: "Surprisingly, once basic needs are met, additional wealth has a diminishing return on overall life satisfaction."
          },
          questions: [
            {
              id: "q_w54_p1_1",
              type: "detail",
              text: "What is the 'Easterlin Paradox'?",
              options: ["The idea that more money always makes you happier.", "The observation that after a certain point, increased wealth does not lead to a significant increase in life satisfaction.", "The belief that happiness is random.", "The study of how news affects moods."],
              correctAnswer: "The observation that after a certain point, increased wealth does not lead to a significant increase in life satisfaction."
            },
            {
              id: "q_w54_p1_2",
              type: "inference",
              text: "Why is the 'Flow State' important for happiness?",
              options: ["It makes you rich.", "It provides a deep sense of engagement and human excellence by balancing challenge and skill.", "It helps you sleep better.", "It allows you to multitask effectively."],
              correctAnswer: "It provides a deep sense of engagement and human excellence by balancing challenge and skill."
            },
            {
              id: "q_w54_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "Cultivating the Positive Brain: Neuroplasticity and Habit",
            wordCount: 460,
            content: `
              <p>While genetics play a significant role in our "Happiness Baseline," research indicates that approximately 40% of our overall satisfaction is determined by our "Intentional Activities." This is an empowering finding. It suggests that we have considerable "Agency" over our emotional well-being. <u>Practices like expressing gratitude, performing acts of kindness, and mindfulness can physically rewire the brain for positivity.</u> This "Neuroplasticity" means that the more we focus on positive thoughts and behaviors, the more those neural pathways are "Strengthened." This makes happiness increasingly "Automatic" over time. Much like training a muscle, the brain can be conditioned to look for "Opportunities" rather than "Threats."</p>
              <p>One of the most effective "Interventions" is the practice of "Gratitude." By intentionally listing "Three Good Things" that happened during the day, we force our brain to scan our environment for positive events. This counteracts the "Negative Bias" that was evolutionarily advantageous for our ancestors' survival. This simple habit lowers levels of "Cortisol"—the stress hormone—and increases levels of "Serotonin" and "Dopamine." Similarly, "Mindfulness-Based Stress Reduction" (MBSR) has been shown to shrink the "Amygdala"—the brain's fear center. It also thickens the "Prefrontal Cortex." This allows for better "Emotional Regulation" and a greater capacity to remain "Equanimous" in the face of life's inevitable stressors.</p>
              <p>Social connection remains the most "Reliable Predictor" of long-term health and happiness. The "Grant Study," a 75-year longitudinal study from Harvard, concluded that "Happiness is love. Full stop." However, the "Quality" of connection matters far more than the "Quantity." In an era of "Digital Superficiality," we must prioritize "Vulnerable Communication" and "Shared Meaning" over "Likes" and "Followers." Performing "Random Acts of Kindness" shifts our focus from our own problems to the "Needs of Others." This triggers a "Helper's High." This altruistic behavior benefits the recipient and reinforces our own "Sense of Worth" and "Interconnectedness." It is the ultimate "Win-Win" for human psychology.</p>
              <p>Ultimately, happiness is often a "Side Effect" of a life lived with "Purpose" and "Integrity." When we align our daily actions with our "Core Values," we experience a sense of "Congruence" that provides deep satisfaction. This requires "Self-Awareness"—the ability to recognize our own "Triggers" and "Conditioned Responses." By becoming "Architects of our own Environment," we can set up "Nudges" to encourage positive habits. This might include keeping a gratitude journal on the nightstand or scheduling "Tech-Free Time" with friends. The "Science of Well-Being" provides us with the "Blueprint," but the "Construction" of a happy life is an ongoing, "Deliberate Act." We are their "Active Participants," not just "Observers" of our moods.</p>
            `,
            underlinedSentence: "Practices like expressing gratitude, performing acts of kindness, and mindfulness can physically rewire the brain for positivity."
          },
          questions: [
            {
              id: "q_w54_p2_1",
              type: "detail",
              text: "What did the Harvard 'Grant Study' conclude about happiness?",
              options: ["Rich people are the happiest.", "Happiness is primarily about the quality of our social connections and love.", "Happiness is 100% genetic.", "Success in career is the only key."],
              correctAnswer: "Happiness is primarily about the quality of our social connections and love."
            },
            {
              id: "q_w54_p2_2",
              type: "inference",
              text: "How does 'Gratitude' help counteract our 'Negative Bias'?",
              options: ["It makes us forget the bad stuff.", "It trains the brain to actively look for positive events in the environment.", "It is a type of magic.", "It doesn't help at all."],
              correctAnswer: "It trains the brain to actively look for positive events in the environment."
            },
            {
              id: "q_w54_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Eudaimonia", definition: "A Greek word commonly translated as happiness or welfare; 'human flourishing' or 'living well'." },
        { word: "Extrinsic", definition: "Not part of the essential nature of someone or something; coming or derived from outside." },
        { word: "Intrinsic", definition: "Belonging naturally; essential." },
        { word: "Equanimous", definition: "Calm and composed." },
        { word: "Altruistic", definition: "Showing a disinterested and selfless concern for the well-being of others; unselfish." }
      ]
    };
  }

  // Week 55: Advertising Secrets (Media)
  if (weekNum === 55) {
    return {
      id: 55,
      title: "Advertising Secrets",
      theme: "Media",
      mainIdeaHint: "Are you buying the product, or the feeling the ad promises?",
      passages: [
        {
          passage: {
            title: "The Psychology of Persuasion: Beyond the Billboard",
            wordCount: 475,
            content: `
              <p>Advertising is the invisible engine of the global economy, a multi-billion dollar industry dedicated to the "Fine Art of Persuasion." While many consumers believe they are immune to marketing, psychologists argue that modern ads are sophisticated biological "Hooks." They are designed to bypass our rational defenses. <u>Effective ads rarely focus on the technical features of a product; instead, they sell an identity, a lifestyle, or an emotional solution to a problem you didn't know you had.</u> This shift from "Informational Advertising" to "Image-Based Advertising" began in the mid-20th century. Companies realized that consumers are driven more by their "Subconscious Desires" for status, belonging, and security than by logical price comparisons. By linking a brand to these needs, advertisers create a "Psychological Bond."</p>
              <p>One of the most powerful strategies used today is "Identity Branding." Instead of telling you that a watch keeps good time, an ad might suggest that wearing it makes you part of an "Elite Circle" of successful high-achievers. This is known as "Aspirational Marketing"—selling the version of yourself that you wish to become. We project our own "Insecurities" onto products, believing that a certain perfume will make us more attractive or a specific software will make us more "Productive." Advertisers also use "Repetition" and "Emotional Priming" to ensure that their brand is the first thing that comes to mind in a retail environment. This "Top-of-Mind Awareness" is often achieved through "Subliminal Cues," such as specific color palettes or soundtracks.</p>
              <p>Furthermore, the digital age has introduced "Micro-Targeting." Algorithms analyze our browsing history to serve us ads that are tailor-made for our specific "Psychological Profile." If the data suggests you are an extrovert who values travel, you will see ads that emphasize social adventure. If it suggests you are an introvert concerned with health, you will see ads for quiet wellness retreats. This "Precision Persuasion" makes it even harder to maintain our "Critical Distance." We are no longer seeing the same ads as everyone else; we are seeing a "Curated Reality." This is designed to exploit our individual "Cognitive Vulnerabilities." This level of manipulation raises significant ethical questions about "Consumer Autonomy" and the "Right to Mental Privacy."</p>
              <p>In conclusion, the secrets of advertising lie in its ability to talk to our "Primal Selves" while we think we are making "Logical Choices." Reclaiming our agency requires a high degree of "Media Literacy." This is the ability to deconstruct an ad and see the "Persuasive Machinery" behind it. We must learn to ask: "What emotion is this ad trying to trigger?" and "Who is this ad telling me I should be?" By becoming aware of the "Invisible Hooks," we can move from being passive targets to being "Active and Informed Participants" in the marketplace. Understanding the psychology of advertising is not about avoiding consumption, but about ensuring that our purchases are driven by our "Actual Needs." The first step toward freedom is recognizing the strings.</p>
            `,
            underlinedSentence: "Effective ads rarely focus on the technical features of a product; instead, they sell an identity, a lifestyle, or an emotional solution to a problem you didn't know you had."
          },
          questions: [
            {
              id: "q_w55_p1_1",
              type: "detail",
              text: "What is 'Aspirational Marketing'?",
              options: ["Selling products at the lowest price.", "Marketing that targets a person's desire to become a better or more idealized version of themselves.", "Selling products exclusively to famous people.", "A type of marketing used only for cars."],
              correctAnswer: "Marketing that targets a person's desire to become a better or more idealized version of themselves."
            },
            {
              id: "q_w55_p1_2",
              type: "inference",
              text: "Why is 'Micro-Targeting' considered more manipulative than traditional advertising?",
              options: ["It costs more money.", "It uses personal data to exploit individual cognitive vulnerabilities and psychological profiles.", "It is only seen by children.", "It is used by the government."],
              correctAnswer: "It uses personal data to exploit individual cognitive vulnerabilities and psychological profiles."
            },
            {
              id: "q_w55_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "The Architecture of Choice: Neuromarketing and Retail",
            wordCount: 460,
            content: `
              <p>The secrets of advertising are not limited to screens and billboards. They are embedded in the very "Physical Architecture" of our retail spaces. Every detail of a modern grocery store or mall is calculated to maximize "Dwell Time" and encourage "Impulse Buys." This field is known as "Neuromarketing." It uses brain-scanning technology like fMRI to measure how consumers react to subtle cues. <u>Neuromarketing uses brain scans to see how consumers react to subtle cues, such as the 'scent of fresh bread' in a supermarket or the specific shade of red in a fast-food logo.</u> These "Sensory Triggers" bypass the logical mind and stimulate the "Limbic System." This is the part of the brain that handles basic emotions and survival instincts. By the time we reach the checkout counter, our "Willpower" has often been depleted.</p>
              <p>Retailers also use "Nudge Theory" to influence our behavior without our realizing it. The "Anchoring Effect" is a classic example. By showing a high "Original Price" next to a lower "Sale Price," the retailer creates a psychological "Anchor." This makes the current price look like a bargain, even if it is still higher than the item's "Actual Value." Product placement is equally strategic. "High-Margin Items" are placed at eye level, while "Essentials" like milk and bread are often hidden at the back of the store. This forces the customer to walk past thousands of other products. This "Forced Navigation" increases the likelihood that they will pick up something they didn't plan to buy. The "Music" played in stores is also carefully selected to influence pace and spending.</p>
              <p>Even the "Language" of selling is designed to override our "Rational Skepticism." Phrases like "Limited Time Only" or "While Supplies Last" create a "Sense of Urgency" and a "Fear of Missing Out" (FOMO). This prevents us from taking the time to "Compare Prices" or truly consider if we need the item. "Social Proof"—showing how many other people have bought a product—leverages our "Conformity Instinct." It makes us feel that a purchase is "Safe" or "Expected." These "Cognitive Shortcuts" were useful in our evolutionary past for quick decision-making. But in a modern consumer environment, they are often turned against us. We are being "Nudged" toward consumption at every turn.</p>
              <p>To defend ourselves, we must become "Architects of our own Choices." This starts with "Mindful Shopping." This is the practice of pausing and checking our "Motives" before putting an item in the cart. Asking "Do I need this, or am I being nudged?" can break the spell of neuromarketing. We can also use "Pre-Commitment Strategies," like sticking to a strict shopping list or leaving credit cards at home. Reclaiming the "Physical Environment" of our shops as a place of utility rather than a "Psychological Minefield" is essential for financial and mental health. The ultimate secret of advertising is that its power depends on our "Unawareness." Once we see the "Invisible Architecture," we can choose to walk our own path. Awareness is the only "Discount" that truly matters.</p>
            `,
            underlinedSentence: "Neuromarketing uses brain scans to see how consumers react to subtle cues, such as the 'scent of fresh bread' in a supermarket or the specific shade of red in a fast-food logo."
          },
          questions: [
            {
              id: "q_w55_p2_1",
              type: "detail",
              text: "What is the 'Anchoring Effect'?",
              options: ["A way to stop a ship.", "A psychological bias where the first piece of information (like a high original price) influences subsequent judgments.", "Painting the walls of a store blue.", "Using heavy boxes for products."],
              correctAnswer: "A psychological bias where the first piece of information (like a high original price) influences subsequent judgments."
            },
            {
              id: "q_w55_p2_2",
              type: "inference",
              text: "Why are essentials like milk and bread often placed at the back of the store?",
              options: ["To keep them cold.", "To force customers to walk past other products, increasing the chance of impulse buys.", "Because the delivery trucks arrive at the back.", "To save space at the front."],
              correctAnswer: "To force customers to walk past other products, increasing the chance of impulse buys."
            },
            {
              id: "q_w55_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Micro-Targeting", definition: "A marketing strategy that uses consumer data and demographics to identify the interests of specific individuals or very small groups of like-minded individuals." },
        { word: "Limbic System", definition: "A complex system of nerves and networks in the brain, involving several areas near the edge of the cortex concerned with instinct and mood." },
        { word: "Anchoring", definition: "A cognitive bias that describes the common human tendency to rely too heavily on the first piece of information offered (the 'anchor') when making decisions." },
        { word: "Skepticism", definition: "A skeptical attitude; doubt as to the truth of something." },
        { word: "Literacy", definition: "The ability to read and write. Also, competence or knowledge in a specified area." }
      ]
    };
  }

  // Week 56: Gaming & The Brain (Global)
  if (weekNum === 56) {
    return {
      id: 56,
      title: "Gaming & The Brain",
      theme: "Global",
      mainIdeaHint: "Is gaming a mental exercise or a digital trap?",
      passages: [
        {
          passage: {
            title: "The Neurobiology of Play: Inside the Compulsion Loop",
            wordCount: 475,
            content: `
              <p>Modern video games have evolved far beyond simple pastimes. They are now sophisticated "Psychological Environments" engineered by teams of data scientists and behavioral psychologists. The primary goal of many modern games, particularly those in the "Free-to-Play" genre, is to maximize "User Engagement" and monetization. <u>Developers use 'compulsion loops'—short cycles of challenge and reward—to keep players engaged for hours on end.</u> This loop operates on the brain's "Dopaminergic System," triggering a burst of pleasure every time a player levels up, finds a rare item, or defeats an opponent. This "Variable Ratio Schedule" of reinforcement is the same mechanism used in slot machines. It creates a pattern of behavior that is extremely difficult to break. By providing a constant stream of "Micro-Goals," games keep the player in a state of "Perpetual Anticipation."</p>
              <p>One of the most controversial features of modern gaming is the "Loot Box"—a virtual container that provides a random selection of in-game items. Because the quality of the item is uncertain, opening a loot box provides a larger "Dopamine Hit" than a guaranteed reward. Critics argue that these mechanics are "Digital Gambling" disguised as play. They target younger audiences who may not have fully developed "Impulse Control." Furthermore, games often use "Dark Patterns" to encourage spending, such as "Artificial Scarcity" (limited-time offers) and "Social Pressure" (leaderboards). These "Psychological Hooks" are designed to exploit our "Cognitive Biases." They make us feel that we are "investing" in our virtual avatars rather than simply spending money on digital assets.</p>
              <p>However, it is important to recognize that gaming also offers significant "Cognitive Benefits." Action games have been shown to improve "Spatial Navigation," "Hand-Eye Coordination," and "Processing Speed." Strategy games can enhance "Problem-Solving" and "Executive Function" by requiring players to manage complex systems and make quick decisions under pressure. This has led to the rise of "Serious Games" used in education and professional training. The key difference lies in the "Nature of the Engagement." Is the game a tool for "Skill Acquisition" and "Social Connection," or is it a "Digital Crate" designed to harvest time and money? Achieving "Digital Literacy" in the context of gaming means understanding the difference between "Mastery" and "Compulsion."</p>
              <p>In conclusion, the impact of gaming on the brain is a double-edged sword. While it can be a powerful tool for learning and "Creative Expression," it can also become a "Digital Trap" that suppresses real-world agency. We must move toward a more "Mindful Style of Play," where we are aware of the "Algorithms" trying to influence our behavior. This might involve setting "Hard Limits" on play time and avoiding games with "Predatory Monetization." It also means prioritizing titles that offer "Deep Narrative" and "Meaningful Interaction." The goal of technology should be to "Augment" human life, not to replace it with a virtual substitute. As players, we need to ensure that we are the ones "Leveling Up" our own lives, not just our digital characters.</p>
            `,
            underlinedSentence: "Developers use 'compulsion loops'—short cycles of challenge and reward—to keep players engaged for hours on end."
          },
          questions: [
            {
              id: "q_w56_p1_1",
              type: "detail",
              text: "What is a 'Variable Ratio Schedule' of reinforcement?",
              options: ["A fixed reward for every action.", "A reward that is given after a random or unpredictable number of responses.", "No reward at all.", "Paying for a reward."],
              correctAnswer: "A reward that is given after a random or unpredictable number of responses."
            },
            {
              id: "q_w56_p1_2",
              type: "inference",
              text: "Why are 'Serious Games' different from standard commercial games?",
              options: ["They are not fun.", "They are designed specifically for education or professional training rather than just pure entertainment or profit.", "They cost more.", "They use better graphics."],
              correctAnswer: "They are designed specifically for education or professional training rather than just pure entertainment or profit."
            },
            {
              id: "q_w56_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "Virtual Worlds and Real-World Opportunity Costs",
            wordCount: 460,
            content: `
              <p>As virtual reality and immersive gaming become more prevalent, we must confront the concept of "Opportunity Cost." This refers to the value of the activities we give up in order to spend time in digital spaces. While the "Sense of Achievement" in a game can be powerful, it often comes at the expense of "Real-World Social Capital" and "Physical Well-Being." <u>When time spent in virtual worlds replaces the development of real-world social skills and physical health, the 'leveling up' of a character can lead to the 'leveling down' of the individual's actual life.</u> This is particularly concerning for young people. Their "Critical Period" of social and emotional development is increasingly dominated by "Mediated Interactions" rather than face-to-face connection.</p>
              <p>The "Allure of the Virtual" often lies in its "Predictability" and "Safety." In a game, the rules are clear, the rewards are immediate, and failure is easily "Undone" with a restart. The real world, by contrast, is "Messy," "Uncertain," and "Socially Taxing." For many, gaming becomes a form of "Digital Escapism." It is a way to avoid the "Anxiety" of real-world challenges or the "Boredom" of daily life. However, by constantly choosing the "Easy Rewards" of the virtual world, we may be "Atrophying" our capacity for "Grit" and "Persistence" in the face of genuine difficulty. Real growth requires the "Risk of Failure" and the "Tolerance for Discomfort"—qualities that are often "Shielded" by the protective bubble of a game's design.</p>
              <p>Furthermore, the "Social Dynamics" of online gaming can be a mixed blessing. On one hand, games provide a "Platform for Collaboration" and a sense of "Global Community." On the other hand, the "Anonymity" of the internet can foster "Toxic Behavior" and "Social Isolation." When our primary social identity is tied to a "Digital Alias," we may find it harder to navigate the "Nuances" of real-world empathy. We run the risk of becoming "Isolated together," sitting in the same room but lost in different "Parallel Realities." To prevent this, we must maintain a "Healthy Balance," treating gaming as a "Supplement" to life rather than a "Replacement" for it. Integration, rather than "Enclave-Building," should be the goal.</p>
              <p>In the final analysis, the "Mastery" we achieve in a game is only valuable if it translates into "Practical Wisdom" in our daily lives. We should ask ourselves: "Is this game making me a more creative, resilient, or connected person?" If the answer is no, it may be time to "Log Off" and "Re-Engage" with the "Analog World." Reclaiming our time is the first step toward reclaiming our "Potential." We are the "Protagonists" of our own stories. The most important "Levels" we will ever beat are the ones that exist right here in reality. Let us use our "Digital Skills" to build a better world, not just a better "Leaderboard." The game of life is the only one that truly matters.</p>
            `,
            underlinedSentence: "When time spent in virtual worlds replaces the development of real-world social skills and physical health, the 'leveling up' of a character can lead to the 'leveling down' of the individual's actual life."
          },
          questions: [
            {
              id: "q_w56_p2_1",
              type: "detail",
              text: "What is 'Digital Escapism'?",
              options: ["Escaping from a virtual prison.", "Using the internet or gaming to avoid real-world problems or emotions.", "A new type of computer security.", "Going on vacation without a phone."],
              correctAnswer: "Using the internet or gaming to avoid real-world problems or emotions."
            },
            {
              id: "q_w56_p2_2",
              type: "inference",
              text: "Why might games 'atrophy' our capacity for grit?",
              options: ["Because they are too hard.", "By providing easy, immediate, and predictable rewards that don't require the same level of persistence as real-world challenges.", "Because they use too much energy.", "By making us too tired to work."],
              correctAnswer: "By providing easy, immediate, and predictable rewards that don't require the same level of persistence as real-world challenges."
            },
            {
              id: "q_w56_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Atrophying", definition: "Gradually decline in effectiveness or vigor due to underuse or neglect." },
        { word: "Anonymity", definition: "The condition of being anonymous; lack of outstanding, individual, or unusual features; impersonality." },
        { word: "Mediated", definition: "Connected through an intermediate agency; not direct." },
        { word: "Prevalent", definition: "Widespread in a particular area or at a particular time." },
        { word: "Augment", definition: "Make (something) greater by adding to it; increase." }
      ]
    };
  }

  // Week 57: Nature vs. Nurture (Ethics)
  if (weekNum === 57) {
    return {
      id: 57,
      title: "Nature vs. Nurture",
      theme: "Ethics",
      mainIdeaHint: "Are we born with our destiny, or do our environments shape us?",
      passages: [
        {
          passage: {
            title: "The Great Debate: Genetics vs. Environment",
            wordCount: 475,
            content: `
              <p>The debate between "Nature" (our genetic inheritance) and "Nurture" (our environment and upbringing) is one of the oldest and most fundamental in psychology. For centuries, philosophers and scientists have sought to determine which factor is more influential in shaping human identity. <u>Nature proponents argue that our personality, intelligence, and even our political leanings are largely predetermined by our DNA.</u> This "Biological Determinism" suggests that we are born with a "Blueprint" that dictates our potential and our limitations. In contrast, nurture proponents, following the "Empiricist" tradition of John Locke, believe the human mind is a "Tabula Rasa" or blank slate. According to this view, we are purely products of our culture, education, and the specific "Reinforcements" we receive from our caregivers and peers.</p>
              <p>To unravel this mystery, researchers often turn to "Twin Studies." By comparing "Monozygotic" (identical) twins, who share 100% of their DNA, with "Dizygotic" (fraternal) twins, who share only 50%, scientists can estimate the "Heritability" of various traits. If identical twins are significantly more similar in a trait than fraternal twins—even when raised in different environments—it suggests a strong "Genetic Component." Studies have found that traits like "Extraversion," "Neuroticism," and even "Abstract Reasoning" have high heritability scores. However, the environment still plays a crucial role in "Actualizing" these genetic predispositions. A child with a high genetic potential for music may never become a pianist if they never have access to an instrument. This is the "Fertile Soil" vs. "Quality Seed" analogy of development.</p>
              <p>Furthermore, the early childhood environment is critical because of the high "Plasticity" of the developing brain. "Sensitive Periods" exist for various functions, such as language acquisition and emotional attachment. If a child is deprived of "Nurturing Interactions" during these windows, the developmental "Scaffolding" may be compromised, leading to lifelong challenges. This is why "Early Intervention Programs" are so vital. They attempt to provide the "Optimal Environment" necessary for every child to reach their "Biological Ceiling." It is not just about "Intelligence Quotients" (IQ), but about the development of "Executive Function" and "Emotional Intelligence." The Nurture side of the debate emphasizes our "Shared Humanity" and the power of "Equal Opportunity."</p>
              <p>In conclusion, the modern scientific consensus has moved beyond the "Either/Or" approach. We now understand that nature and nurture are "Inextricably Linked." We are not just passive recipients of our genes, nor are we purely products of our surroundings. We are "Active Agents" who interact with our environment based on our biological "Temperament." A shy child might avoid social situations, which in turn reinforces their shyness—a "Feedback Loop" between nature and nurture. Understanding this complexity is essential for fields ranging from education to medicine. We are the "Dynamic Result" of an ongoing conversation between our biology and our biography. Our destiny is not "Written," but "Negotiated."</p>
            `,
            underlinedSentence: "Nature proponents argue that our personality, intelligence, and even our political leanings are largely predetermined by our DNA."
          },
          questions: [
            {
              id: "q_w57_p1_1",
              type: "detail",
              text: "What is 'Heritability'?",
              options: ["The process of inheriting money.", "The proportion of variation in a trait that is due to genetic variation.", "A type of biology textbook.", "The study of old buildings."],
              correctAnswer: "The proportion of variation in a trait that is due to genetic variation."
            },
            {
              id: "q_w57_p1_2",
              type: "inference",
              text: "How do 'Twin Studies' help isolate the influence of nature?",
              options: ["By showing that twins always dress the same.", "By comparing identical twins (100% shared DNA) with fraternal twins (50% shared DNA) to see how much genes influence traits.", "By proving that environment doesn't matter.", "By studying twins only in the same house."],
              correctAnswer: "By comparing identical twins (100% shared DNA) with fraternal twins (50% shared DNA) to see how much genes influence traits."
            },
            {
              id: "q_w57_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "The Epigenetic Revolution: Beyond the DNA Sequence",
            wordCount: 460,
            content: `
              <p>For decades, the "Central Dogma" of biology was that DNA is a fixed "Instruction Manual" that cannot be changed. However, the emerging field of "Epigenetics" is revolutionizing our understanding of the nature-nurture relationship. Epigenetics is the study of chemical modifications—often called "Markers"—that sit on top of the DNA molecule. They turn genes "On" or "Off" without changing the underlying genetic sequence. <u>Epigenetics reveals that our environment can actually turn certain genes 'on' or 'off,' meaning our nurture can influence how our nature is expressed.</u> Factors such as "Diet," "Stress Levels," and "Toxic Exposures" can leave a "Molecular Footprint" on our genome. This influences our health and well-being for decades. It can even affect future generations through "Intergenerational Inheritance."</p>
              <p>This discovery provides the "Missing Link" in the nature-nurture debate: the "Gene-Environment Interaction." A person may have a genetic "Vulnerability" to a certain condition, such as heart disease or depression. However, that gene may remain "Dormant" unless it is "Triggered" by a specific environmental stressor. This is the "Loaded Gun" analogy: genetics loads the gun, but environment pulls the trigger. This means that our "Lifestyle Choices" have a direct impact on our biological expression. By practicing "Mindfulness," eating a "Nutrient-Dense Diet," and maintaining "Strong Social Connections," we can promote an "Epigenetic Profile" that favors health. We are not just "Prisoners of our DNA"; we are its "Caretakers."</p>
              <p>The implications of epigenetics for "Mental Health" are particularly profound. Studies have shown that "Nurturing Care" in infancy can lead to epigenetic changes that make an individual more resilient to stress later in life. Conversely, "Childhood Trauma" can leave marks that increase the "Sensitivity" of the brain's "Reward and Stress Systems." This research bridges the gap between "Psychology" and "Molecular Biology." It proves that our "Subjective Experiences" have "Physical Consequences" in our cells. It also highlights the importance of "Social Justice," as the "Stress of Poverty" can be biologically "Embedded" in a population. This leads to "Health Disparities" that are passed down through the bloodline.</p>
              <p>In the final analysis, epigenetics shows that we are much more than the sum of our "Inherited Parts." We are an "Ongoing Experiment" in biological adaptation. This "New Biology" encourages a more "Holistic View" of human development. In this view, "Compassion" and "Environmental Reform" are seen as "Biological Necessities." By improving our "Living Conditions" and our "Internal Narratives," we can quite literally "Change ourselves" at the cellular level. The "Nature vs. Nurture" debate is finally being replaced by a more sophisticated understanding of "Nature through Nurture." The power to "Re-Write" aspects of our biological future is in our hands. Every breath and every choice is a "Molecular Event."</p>
            `,
            underlinedSentence: "Epigenetics reveals that our environment can actually turn certain genes 'on' or 'off,' meaning our nurture can influence how our nature is expressed."
          },
          questions: [
            {
              id: "q_w57_p2_1",
              type: "detail",
              text: "What are 'Epigenetic Markers'?",
              options: ["Changes to the actual DNA sequence.", "Chemical modifications that turn genes on or off without changing the sequence itself.", "A type of permanent marker used in labs.", "A genetic disease."],
              correctAnswer: "Chemical modifications that turn genes on or off without changing the sequence itself."
            },
            {
              id: "q_w57_p2_2",
              type: "inference",
              text: "What does the 'Loaded Gun' analogy imply about genetics and disease?",
              options: ["Genes are dangerous.", "While genes provide the potential for a condition, environmental factors are often the trigger that causes the gene to be expressed.", "Environment doesn't matter if you have bad genes.", "Everyone will eventually get sick."],
              correctAnswer: "While genes provide the potential for a condition, environmental factors are often the trigger that causes the gene to be expressed."
            },
            {
              id: "q_w57_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Heritability", definition: "A statistic used in the fields of breeding and genetics that estimates the degree of variation in a phenotypic trait in a population that is due to genetic variation between individuals in that population." },
        { word: "Empiricist", definition: "A person who supports the theory that all knowledge is based on experience derived from the senses." },
        { word: "Epigenetics", definition: "The study of changes in organisms caused by modification of gene expression rather than alteration of the genetic code itself." },
        { word: "Predisposition", definition: "A liability or tendency to suffer from a particular condition, hold a particular attitude, or act in a particular way." },
        { word: "Dormant", definition: "Having normal physical functions suspended or slowed down for a period of time; in or as if in a deep sleep." }
      ]
    };
  }

  // Week 58: Social Conformity (Ethics)
  if (weekNum === 58) {
    return {
      id: 58,
      title: "Social Conformity",
      theme: "Global",
      mainIdeaHint: "Why is it so hard to stand alone in a crowd?",
      passages: [
        {
          passage: {
            title: "The Pull of the Tribe: Evolutionary Roots of Conformity",
            wordCount: 475,
            content: `
              <p>Humans are inherently social animals. This trait was essential for our ancestors' survival in a harsh and unforgiving wilderness. In prehistoric times, being part of a tribe was not just a matter of social preference; it was a biological necessity. A lone individual faced almost certain death from predators, starvation, or exposure. <u>This ancient fear of social isolation still drives modern behavior, causing individuals to suppress their own opinions in order to align with the majority.</u> This "Conformity Instinct" is hardwired into our brains. It acts as a "Glue" that allows for large-scale cooperation and social harmony. However, this same instinct can lead us to ignore our own senses and convictions when they conflict with the "Group Consensus." This is the psychological price we pay for "Belonging."</p>
              <p>Psychologists identify two primary types of social influence: "Informational" and "Normative." Informational social influence occurs when we look to others for guidance because we are uncertain about the correct course of action. We assume that if everyone else is doing it, they must know something we don't. This "Social Proof" is particularly powerful in emergency situations or complex environments. Normative social influence, on the other hand, is driven by the desire to be "Liked and Accepted." We conform to "Social Norms" to avoid the "Pain of Rejection." Functional neuroimaging (fMRI) studies have shown that social exclusion activates the same regions of the brain as "Physical Pain." This explains why the pressure to "Fit In" is so visceral and persistent. We are biologically designed to "Follow the Crowd."</p>
              <p>The danger of excessive conformity is most evident in the phenomenon of "Groupthink." Groupthink occurs when a desire for "Consensus" overrides a realistic appraisal of alternative courses of action. In a groupthink environment, "Dissent" is viewed as disloyalty. Individuals "Self-Censor" their doubts to maintain the appearances of harmony. This can lead to disastrous "Collective Decisions," as seen in historical events where highly intelligent individuals ignored obvious warning signs. "Deindividuation"—the loss of "Self-Awareness" and individual accountability in a group—can also lead to "Mob Mentality" and aggressive behavior. When we feel anonymous and part of a larger force, we may engage in actions that we would never consider on our own. The "Bystander Effect" is another manifestation of this same principle.</p>
              <p>In conclusion, social conformity is a "Survival Mechanism" that has become a "Cognitive Trap" in the modern world. Reclaiming our "Intellectual Independence" requires a conscious awareness of the "Invisible Pressures" that shape our choices. We must cultivate "Critical Thinking"—the ability to objectively analyze information regardless of the majority opinion. This doesn't mean becoming "Contrarian" for the sake of it, but rather maintaining a "Skepticism" toward easy answers and "Mass Movements." True "Courage" is the ability to stand alone when the group is heading in a dangerous direction. By valuing "Diversity of Thought" and encouraging healthy dissent, we can build societies that are both "Cohesive and Truth-Seeking." The tribe survives through cooperation, but it thrives through "Individual Vision."</p>
            `,
            underlinedSentence: "This ancient fear of social isolation still drives modern behavior, causing individuals to suppress their own opinions in order to align with the majority."
          },
          questions: [
            {
              id: "q_w58_p1_1",
              type: "detail",
              text: "What is 'Informational Social Influence'?",
              options: ["Conforming because you want to be liked.", "Looking to others for guidance in uncertain situations because you assume they are better informed.", "A type of internet speed.", "Using a map to find your way."],
              correctAnswer: "Looking to others for guidance in uncertain situations because you assume they are better informed."
            },
            {
              id: "q_w58_p1_2",
              type: "inference",
              text: "How does 'Deindividuation' affect behavior in a crowd?",
              options: ["It makes people more polite.", "It leads to a loss of self-awareness and individual accountability, potentially fueling aggressive or 'mob' behavior.", "It helps people remember their names.", "It improves coordination."],
              correctAnswer: "It leads to a loss of self-awareness and individual accountability, potentially fueling aggressive or 'mob' behavior."
            },
            {
              id: "q_w58_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "Asch's Line Study: The Power of the Majority",
            wordCount: 460,
            content: `
              <p>In the 1950s, psychologist Solomon Asch conducted a series of landmark experiments that revealed the shocking extent of human conformity. In his basic setup, a participant was placed in a room with several "Confederates" (actors working for the researcher). The group was shown a card with a "Standard Line" and another card with three "Comparison Lines." Their task was simple: identify which of the comparison lines matched the standard line. The answer was always obvious. However, during "Critical Trials," the confederates would all intentionally give the same wrong answer. <u>Asch's work demonstrates that 'informational' or 'normative' influence can be so strong that it overrides our own sensory perception.</u> Even when their own eyes told them the truth, many participants "Conformed" to the group's falsehood simply to avoid standing out.</p>
              <p>The results were startling: about 75% of participants conformed at least once during the trials. When interviewed later, many admitted that they didn't actually believe the group was right, but they felt a "Visceral Discomfort" in being the "Odd One Out." They feared the "Social Sanction" of being perceived as "Different" or "Wrong." This highlights that "Logic" is often secondary to "Social Survival." We are often more afraid of "Being Alone" than we are of "Being Mistaken." Interestingly, Asch found that the presence of even a "Single Dissenter"—one person who gave the correct answer—drastically reduced the rates of conformity among the real participants. This "Ally Effect" proves that one voice can break the "Spell of Majority Influence," providing the psychological support needed for others to speak their truth.</p>
              <p>Asch's findings have profound implications for "Jury Deliberations," "Boardroom Meetings," and "Political Discourse." In any situation where "Group Harmony" is prioritized over "Evidence," the truth is at risk. This is why "Anonymous Voting" is so critical in democratic institutions; it removes the "Normative Pressure" that leads to conformity. Without the fear of "Social Retaliation," individuals are free to express their actual "Convictions." The "Devil's Advocate"—the person assigned to challenge the group's assumptions—is another vital role in preventing groupthink. By "Institutionalizing Dissent," organizations can protect themselves from the "Echo Chamber" effect. They can make more robust, evidence-based decisions. We must learn to value the "Whistleblower" and the "Maverick" as essential guardians of "Objective Reality."</p>
              <p>Ultimately, the lesson of Asch's study is that "Autonomy" is a fragile state that must be actively defended. We must develop the "Resilience" to withstand the "Pressure to Comply" when our "Inner Compass" is pointing in a different direction. This requires a deep "Confidence" in our own "Sensory and Logical Faculties." By recognizing the "Mechanisms of Influence," we gain the power to resist them. We should strive to be "Constructive Non-Conformists." These are individuals who cooperate for the common good but who refuse to compromise their "Integrity" for the sake of "Convenience." As Asch himself observed, the fact that reasonable people can be induced to deny the evidence of their own senses is a warning. The path of the "Majority" is not always the path of the "Truth."</p>
            `,
            underlinedSentence: "Asch's work demonstrates that 'informational' or 'normative' influence can be so strong that it overrides our own sensory perception."
          },
          questions: [
            {
              id: "q_w58_p2_1",
              type: "detail",
              text: "What happened to conformity rates in the Asch study when a 'Single Dissenter' was introduced?",
              options: ["Rates stayed the same.", "Conformity rates dropped significantly.", "Everyone started arguing.", "The participants stopped paying attention."],
              correctAnswer: "Conformity rates dropped significantly."
            },
            {
              id: "q_w58_p2_2",
              type: "inference",
              text: "Why is anonymous voting important for preventing conformity?",
              options: ["It saves time.", "It removes the normative pressure and fear of social retaliation, allowing individuals to vote according to their actual convictions.", "It is only for large elections.", "It makes the results more interesting."],
              correctAnswer: "It removes the normative pressure and fear of social retaliation, allowing individuals to vote according to their actual convictions."
            },
            {
              id: "q_w58_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Consensus", definition: "A general agreement." },
        { word: "Visceral", definition: "Relating to deep inward feelings rather than to the intellect." },
        { word: "Institutionalizing", definition: "Establish (something, typically a practice or activity) as a convention or norm in an organization or culture." },
        { word: "Retaliation", definition: "The action of returning a military attack; counterattack. Also, returning an injury or insult." },
        { word: "Maverick", definition: "An unorthodox or independent-minded person." }
      ]
    };
  }

  // Week 59: Introversion & Learning (Education)
  if (weekNum === 59) {
    return {
      id: 59,
      title: "Introversion & Learning",
      theme: "Education",
      mainIdeaHint: "Does our education system favor the loudest voices?",
      passages: [
        {
          passage: {
            title: "How to Teach a Young Introvert: Beyond the Extrovert Ideal",
            wordCount: 465,
            content: `
              <p>Modern classrooms are often designed around the "Extrovert Ideal." This is an environment that prioritizes group work, oral participation, and fast-paced social interaction. In these settings, "Participation" is often equated solely with "Speaking Up." This metric can leave introverted students feeling undervalued or even "Inadequate." However, introverts—who process information more deeply and prefer quiet reflection—often thrive when given the space to think before they act. <u>Education systems that equate 'participation' solely with 'speaking up' may be overlooking some of their most brilliant and creative minds.</u> By recognizing the value of "Quiet Strength," educators can create a more inclusive environment that allows all personality types to flourish. This is not about favoring one style over another, but about "Balance."</p>
              <p>The "Biological Basis" of introversion lies in the "Reticular Activating System" (RAS), which regulates arousal levels. Introverts are more sensitive to "External Stimuli" and can become "Overstimulated" in loud or chaotic environments. This is why the traditional "Factory Model" of education—with its crowded hallways and constant chatter—can be physically and mentally "Exhausting" for introverts. To learn effectively, they often require a "Restorative Niche." This is a quiet space or a period of time where they can return to their "Optimal Level" of arousal. This "Solitary Processing" is not a sign of "Social Anxiety" or "Antisocial Behavior." It is a necessary requirement for their "Cognitive Functioning." They are not "Shy"; they are simply "Wired" differently.</p>
              <p>Effective "Differentiated Instruction" for introverts includes providing "Wait Time" after a question is asked. It also means allowing for "Written Reflection" before a group discussion and offering "Independent Study" options. When introverts are given the chance to "Synthesize" their thoughts in a low-pressure environment, their contributions are often remarkably "Deep and Insightful." They tend to be "Excellent Listeners" and "Analytical Thinkers" who notice "Nuance" that others might miss. By validating these "Quiet Contributions," schools can help introverts develop a "Confidence" that isn't dependent on being the "Loudest Voice" in the room. This shift in perspective is essential for cultivating the "Full Spectrum" of human intelligence.</p>
              <p>In conclusion, the goal of education should be to "Augment" the natural strengths of every student. We must move away from a "One-Size-Fits-All" model that treats introversion as a "Problem to be Solved." Instead, we should view it as a "Trait to be Leveraged." By incorporating "Quiet Time" and "Solitary Work" into the curriculum, we provide all students with the opportunity for "Deep Focus" and "Creative Contemplation." This "Inclusive Design" benefits both introverts and extroverts alike, as it encourages everyone to develop their "Internal World." The "Loudest Voices" don't always have the best ideas; sometimes, the most "Revolutionary Thoughts" are born in silence. We must listen to the "Quiet Ones."</p>
            `,
            underlinedSentence: "Education systems that equate 'participation' solely with 'speaking up' may be overlooking some of their most brilliant and creative minds."
          },
          questions: [
            {
              id: "q_w59_p1_1",
              type: "detail",
              text: "What is the 'Extrovert Ideal' in the context of education?",
              options: ["A classroom where everyone is quiet.", "An environment that prioritizes group work, oral participation, and fast-paced interaction.", "Teaching only extroverts.", "Using technology to teach."],
              correctAnswer: "An environment that prioritizes group work, oral participation, and fast-paced interaction."
            },
            {
              id: "q_w59_p1_2",
              type: "inference",
              text: "How does a 'Restorative Niche' help an introverted student?",
              options: ["It makes them more extroverted.", "It provides a quiet space to return to an optimal level of arousal after being overstimulated.", "It is a type of snack.", "It helps them sleep."],
              correctAnswer: "It provides a quiet space to return to an optimal level of arousal after being overstimulated."
            },
            {
              id: "q_w59_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "The Solitude of Self: Creativity and the Power of Alone Time",
            wordCount: 460,
            content: `
              <p>Solitude is often misunderstood in a culture that values constant "Connectivity" and "Social Networking." However, for many of history's most "Original Thinkers," solitude is not a state of "Loneliness" but the "Oxygen" of creativity. <u>Deep focus requires the removal of social distractions, allowing the mind to synthesize ideas without the pressure to conform to a group.</u> When we are alone, we are free from the "Normative Influences" that can stifle "Divergent Thinking." This "Autonomy" allows the brain's "Default Mode Network" to engage in "Inner Narrative" and "Future Planning." This leads to those "Eureka Moments" that are rarely found in a committee meeting. The "Solitude of Self" is a sanctuary for the "Creative Spirit."</p>
              <p>In a classroom setting, the push for "Collaborative Learning" can sometimes "Crowd Out" the need for "Individual Synthesis." While collaboration is important for "Soft Skills," it can also lead to "Social Loafing" or the "Suppression of Minority Opinions" due to group pressure. Introverts, in particular, often do their best work when they are allowed to "Deep Dive" into a topic without interruption. This "Immersion" allows for a level of "Mastery" that is hard to achieve in a frantic group setting. By providing "Individual Workstations" and "Silent Reading" periods, schools acknowledge that "Reflection" is just as important as "Interaction." We must teach students how to be "Productively Alone." This is the foundation of "Self-Reliance."</p>
              <p>Furthermore, the digital world offers "Asynchronous Tools" that can give a voice to those who are hesitant to speak up in a live setting. Online forums, "Collaborative Documents," and "Reflective Blogs" allow students to take the time they need to "Compose" their thoughts. This "Buffer" between thought and expression is particularly beneficial for introverts. They often find that their "Best Ideas" occur long after the conversation has moved on. By using a "Hybrid Model" of participation, we can ensure that "Contribution" is measured by "Quality" rather than "Volume." This levels the "Playing Field" and ensures that the "Quiet Strength" of introverts is integrated into the collective "Knowledge Base" of the class.</p>
              <p>In the final analysis, celebrating quiet strength is not just about helping introverts. It is about "Valuing the Human Mind" in all its forms. We must broaden our definition of "Success" to include "Deep Thought," "Empathy," and "Integrity." These qualities are often cultivated in the "Quiet Spaces" of life. When we give students the "Permission to be Quiet," we are giving them the "Permission to be Themselves." This "Psychological Safety" is the bedrock of a truly "Inclusive Learning Community." We need both the "Action" of the extrovert and the "Reflection" of the introvert to solve the complex problems of our age. Solitude is the "Quiet Revolution" that allows the soul to speak. Let us listen to the "Silence."</p>
            `,
            underlinedSentence: "Deep focus requires the removal of social distractions, allowing the mind to synthesize ideas without the pressure to conform to a group."
          },
          questions: [
            {
              id: "q_w59_p2_1",
              type: "detail",
              text: "What is the 'Default Mode Network' associated with in the text?",
              options: ["Playing video games.", "Inner narrative, future planning, and creativity.", "Social networking.", "Sleeping."],
              correctAnswer: "Inner narrative, future planning, and creativity."
            },
            {
              id: "q_w59_p2_2",
              type: "inference",
              text: "Why might introverts find 'Asynchronous Tools' beneficial?",
              options: ["They are faster.", "They provide a buffer between thought and expression, allowing for more composed and high-quality contributions.", "They are cheaper.", "They don't use electricity."],
              correctAnswer: "They provide a buffer between thought and expression, allowing for more composed and high-quality contributions."
            },
            {
              id: "q_w59_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Stimuli", definition: "A thing or event that evokes a specific functional reaction in an organ or tissue." },
        { word: "Arousal", definition: "The state of being physiologically alert, awake, and attentive." },
        { word: "Niche", definition: "A comfortable or suitable position in life or employment." },
        { word: "Asynchronous", definition: "Not existing or happening at the same time." },
        { word: "Divergent", definition: "Tending to be different or develop in different directions." }
      ]
    };
  }

  // Week 60: Human Engineering (Global)
  if (weekNum === 60) {
    return {
      id: 60,
      title: "Human Engineering",
      theme: "Global",
      mainIdeaHint: "Compare the engineering of the past with the engineering of the future.",
      passages: [
        {
          passage: {
            title: "The Inca: Engineering an Empire in the Clouds",
            wordCount: 475,
            content: `
              <p>The Inca Empire, which stretched across the rugged peaks of the Andes Mountains, stands as a testament to the power of "Human Engineering." Without the use of the wheel, iron tools, or a written alphabet in the traditional sense, the Inca built a sophisticated civilization. It supported millions of people in one of the most inhospitable environments on Earth. <u>The Inca were master engineers, building a 25,000-mile road network and cities like Machu Picchu without the help of modern tools.</u> Their ability to manipulate the landscape to serve their needs—shifting mountains and redirecting rivers—is a feat of "Structural Genius." It continues to baffle modern architects and archaeologists. At the heart of their success was "Terracing"—the practice of carving giant steps into the mountainsides to create usable farmland and prevent "Soil Erosion."</p>
              <p>In addition to their agricultural feats, the Inca were masters of "Lithic Technology." They developed a method of stone masonry known as "Ashlar." Here, stones were carved to fit together so precisely that a "Knife Blade" could not be inserted between them. This was achieved without the use of "Mortar," making their structures remarkably "Earthquake-Resistant." When the ground shook, the stones would "Dance" in place and then settle back into their original positions. More modern buildings would crumble in comparison. Their road network, the "Qhapaq Ñan," was equally impressive. It spanned over 25,000 miles and featured "Suspension Bridges" made of hand-woven grass. This "Infrastructural Backbone" allowed for the rapid movement of armies, goods, and "Chasquis" (messengers). This ensured the "Political Unity" of a vast and diverse empire.</p>
              <p>Managing such a complex system required a sophisticated method of "Data Storage." In place of writing, the Inca used "Quipus"—intricate systems of knotted strings. By varying the color, position, and type of knot, "Quipucamayocs" (accountants) could record everything from "Census Data" to "Tax Records." This "Analog Computer" allowed the empire to maintain a "Highly Centralized Economy" and to distribute resources effectively during times of famine. The Inca also practiced "Advanced Hydrology," building stone canals and fountains that provided "Clean Water" to cities thousands of feet above sea level. Their "Social Engineering"—the "Mita System" of mandatory public service—ensured that there was always a "Labor Force" available for these massive projects. Every citizen was a "Stakeholder" in the empire's infrastructure.</p>
              <p>In conclusion, the Inca remind us that "Progress" is not always a linear path fueled by technology. Their achievements were born from a deep understanding of their "Environment" and a collective "Willpower" to overcome the impossible. They engineered not just buildings, but a "Socio-Technical System" that provided for its people while living in "Symmetry" with the earth. As we face the challenges of the 21st century, we can look to the "Inca Legacy" for inspiration on how to build "Resilient and Sustainable" civilizations. Their "Stones of History" still stand today. They are silent witnesses to the "Indomitable Human Spirit." Engineering is, at its core, the art of "Possibility."</p>
            `,
            underlinedSentence: "The Inca were master engineers, building a 25,000-mile road network and cities like Machu Picchu without the help of modern tools."
          },
          questions: [
            {
              id: "q_w60_p1_1",
              type: "detail",
              text: "What was the 'Qhapaq Ñan'?",
              options: ["A type of Inca food.", "A 25,000-mile road network that connected the Inca Empire.", "A religious ceremony.", "The name of the Inca King."],
              correctAnswer: "A 25,000-mile road network that connected the Inca Empire."
            },
            {
              id: "q_w60_p1_2",
              type: "inference",
              text: "Why were Inca buildings so earthquake-resistant?",
              options: ["They were made of wood.", "The 'Ashlar' masonry allowed stones to fit together without mortar, letting them 'dance' during tremors without collapsing.", "They were built underground.", "They used modern steel reinforcements."],
              correctAnswer: "The 'Ashlar' masonry allowed stones to fit together without mortar, letting them 'dance' during tremors without collapsing."
            },
            {
              id: "q_w60_p1_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        },
        {
          passage: {
            title: "Future Horizons: Terraforming and the Next Frontier",
            wordCount: 460,
            content: `
              <p>While the Inca engineered mountains, the future of "Human Engineering" looks toward the "Stars." We are currently standing at the threshold of becoming a "Multi-Planetary Species." The ultimate engineering challenge of the coming centuries will be "Terraforming"—the process of deliberately modifying the atmosphere, temperature, and ecology of a planet to make it "Habitable" for human life. Mars is the primary candidate for this "Planetary Transformation." <u>Proposals include using "Giant Mirrors" to melt polar ice caps, releasing "Greenhouse Gases" to warm the planet, and introducing "Genetically Modified Organisms" to produce oxygen.</u> This is "Human Enterprise" on a "Galactic Scale," a project that would span generations and redefine our relationship with the cosmos.</p>
              <p>Alongside planetary engineering, we are also beginning to "Engineer ourselves." "Synthetic Biology" and "Genetic Editing" offer the possibility of adapting our own biology to the "Extreme Environments" of space. We might engineer "Higher Bone Density" to withstand low gravity or "Radiation Resistance" for long-duration spaceflight. This raises profound "Ethical and Philosophical" questions: at what point do we cease to be "Homo Sapiens" and become something "Post-Human"? As we develop the power to "Re-Design" the biological and geological foundations of our existence, the "Responsibility" for the "Consequences" falls squarely on our shoulders. We are no longer just "Inhabitants" of the universe; we are its "Architects."</p>
              <p>The energy requirements for these projects will necessitate the development of "Megastructures" like the "Dyson Sphere"—a hypothetical shell around a star that would capture its total "Energy Output." A civilization capable of such a feat would be classified as a "Type II Civilization" on the "Kardashev Scale." This represents the pinnacle of "Technological Mastery," where a species is limited only by the "Physics of the Universe" itself. However, as we reach for these heights, we must not lose the "Wisdom" of our ancestors. The "Inca Principle" of living in "Harmony with the Environment" must be translated into a "Universal Ethic." If we terraform other worlds with the same "Short-Sightedness" that has damaged our own, we will merely be "Exporting our Failures."</p>
              <p>In the final analysis, "Human Engineering" is the "Master Narrative" of our species. From the first stone tool to the first Martian colony, we are defined by our quest to "Improve our Condition." This requires a balance of "Individal Genius" and "Global Cooperation." We must ensure that our "Technical Ability" is matched by our "Moral Maturity." Every "Infrastructure Project," whether it's a bridge over a river or a bridge to another planet, is a "Moral Choice." The future is not something that "Happens"; it is something we "Build." Like the Inca before us, we must have the "Courage to Dream Large" and the "Precision to Execute." Our "Legacy" will be written in the "Stars" and in the "Earth" beneath our feet. We are the "Bridge-Builders" of infinity.</p>
            `,
            underlinedSentence: "Proposals include using 'giant mirrors' to melt polar ice caps, releasing 'greenhouse gases' to warm the planet, and introducing 'genetically modified organisms' to produce oxygen."
          },
          questions: [
            {
              id: "q_w60_p2_1",
              type: "detail",
              text: "What is 'Terraforming'?",
              options: ["A type of Martian plant.", "The process of modifying a planet to make it habitable for human life.", "Building a house on Earth.", "Studying ancient rocks."],
              correctAnswer: "The process of modifying a planet to make it habitable for human life."
            },
            {
              id: "q_w60_p2_2",
              type: "inference",
              text: "What is a major ethical concern mentioned regarding future human engineering?",
              options: ["It will be too expensive.", "It won't work.", "The risk of becoming 'post-human' and the responsibility for long-term ecological consequences.", "There is no more space left."],
              correctAnswer: "The risk of becoming 'post-human' and the responsibility for long-term ecological consequences."
            },
            {
              id: "q_w60_p2_p",
              type: "paraphrase",
              text: "Paraphrase the underlined sentence."
            }
          ]
        }
      ],
      vocabulary: [
        { word: "Inhospitable", definition: "Harsh and difficult to live in." },
        { word: "Infrastructure", definition: "The basic physical and organizational structures and facilities needed for the operation of a society or enterprise." },
        { word: "Terraforming", definition: "The process of deliberately modifying its atmosphere, temperature, surface topography or ecology to be similar to the environment of Earth to make it habitable by Earth-like life." },
        { word: "Symmetry", definition: "The quality of being made up of exactly similar parts facing each other or around an axis." },
        { word: "Enterprise", definition: "A project or undertaking, typically one that is difficult or requires effort." }
      ]
    };
  }

  throw new Error(`Week ${weekNum} definition not found`);




});

export function getModule(id: number) {
  return modules.find(m => m.id === id);
}
