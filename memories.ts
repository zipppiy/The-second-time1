import { Memory, MemoryId, MemoryTier, MemoryType } from '@/types'

export const MEMORIES: Record<MemoryId, Memory> = {
  [MemoryId.GUITAR]: {
    id: MemoryId.GUITAR,
    tier: MemoryTier.TIER_1,
    type: MemoryType.REALISATION,
    title: 'The Guitar',
    ageRange: '14–15',
    bedroomTrigger: 'Guitar string vibrates without being touched',
    layer: 'A',
    resistanceTexts: [
      "They've been playing for years. I've been playing for weeks. It's not the same.",
      "I'll start again when I have more time to practice properly.",
      'I just need to watch how they do the transition.',
    ],
    realisationText: "I didn't want to get better. I wanted to already be good.",
    conclusionText: null,
  },

  [MemoryId.SHOES]: {
    id: MemoryId.SHOES,
    tier: MemoryTier.TIER_1,
    type: MemoryType.REALISATION,
    title: 'The Shoes',
    ageRange: '15–16',
    bedroomTrigger: 'Shoebox under bed slightly open when it was closed',
    layer: 'A',
    resistanceTexts: [
      "I just need to get this one thing right first.",
      "I don't want them to get scuffed.",
      'I spent four months saving for these.',
    ],
    realisationText: "It was never about the shoes.",
    conclusionText: null,
  },

  [MemoryId.PHONE]: {
    id: MemoryId.PHONE,
    tier: MemoryTier.TIER_1,
    type: MemoryType.REALISATION,
    title: 'The Phone',
    ageRange: '15–16',
    bedroomTrigger: 'Phone screen lights up without being touched',
    layer: 'A',
    resistanceTexts: [
      "He'll still be there tomorrow. People don't just disappear.",
      "I'll reply properly. After this.",
      "Too much time has passed. It'll just be weird now.",
      "It's almost midnight.",
      'What would I even say.',
    ],
    realisationText: 'They do.',
    conclusionText: null,
  },

  [MemoryId.APPLICATION]: {
    id: MemoryId.APPLICATION,
    tier: MemoryTier.TIER_2,
    type: MemoryType.REALISATION,
    title: 'The Application',
    ageRange: '16',
    bedroomTrigger: 'Laptop screen glows',
    layer: 'B',
    resistanceTexts: [
      "What if this is actually as good as I get.",
      "If I lose, I'll know for sure. Better not to know.",
      "I should know what I'm up against.",
      "It's not ready yet. One more pass.",
    ],
    realisationText:
      "I didn't lose. I didn't enter. I kept telling myself those were the same thing.",
    conclusionText: null,
  },

  [MemoryId.WINDOW]: {
    id: MemoryId.WINDOW,
    tier: MemoryTier.TIER_2,
    type: MemoryType.REALISATION,
    title: 'The Window',
    ageRange: '16–17',
    bedroomTrigger: 'Framed photo on wall tilted slightly',
    layer: 'B',
    resistanceTexts: [
      "She'll think I'm— I'll say something wrong.",
      "It's probably not— I'm reading it wrong.",
      "This isn't the right moment. I'll find a better one.",
      'What would I even say now.',
    ],
    realisationText: "She wasn't waiting. Only I was.",
    conclusionText: null,
  },

  [MemoryId.DEADLINE]: {
    id: MemoryId.DEADLINE,
    tier: MemoryTier.TIER_2,
    type: MemoryType.HOSPITAL,
    title: 'The Deadline',
    ageRange: '16–17',
    bedroomTrigger: 'Calendar page turned on its own',
    layer: 'B',
    resistanceTexts: [
      'I just need to figure out a few more things before I begin.',
      "What if I start and it becomes clear it was never going to work.",
      "I'll start tomorrow. Tomorrow I'll be ready.",
      "The planning is part of the process. I can't start without a solid foundation.",
      "One line isn't starting. That's just avoiding starting properly.",
    ],
    realisationText: null,
    conclusionText: null,
  },

  [MemoryId.PARENTS]: {
    id: MemoryId.PARENTS,
    tier: MemoryTier.TIER_2,
    type: MemoryType.DEAD,
    title: 'The Parents',
    ageRange: '17 through young adulthood',
    bedroomTrigger: 'Jacket on hook disappears',
    layer: 'C',
    resistanceTexts: [
      "They'll understand. They always do.",
      "Later. I'll do it later.",
      "They know I love them. I don't need to say it every time.",
      "What would I even say. I'll call tomorrow.",
    ],
    realisationText: null,
    conclusionText: 'He had been meaning to call.',
  },

  [MemoryId.SKETCHBOOK]: {
    id: MemoryId.SKETCHBOOK,
    tier: MemoryTier.TIER_3,
    type: MemoryType.REALISATION,
    title: 'The Sketchbook',
    ageRange: '14 — The Origin',
    bedroomTrigger: 'Sketchbook cover open when it was closed',
    layer: 'C',
    resistanceTexts: [
      "If I can't do it right, what's the point.",
      "It wasn't good enough.",
      'Anyone who saw it would know.',
    ],
    realisationText:
      "I wasn't protecting the work. I was protecting myself from finding out what it was worth.",
    conclusionText: null,
  },

  [MemoryId.EXAM]: {
    id: MemoryId.EXAM,
    tier: MemoryTier.TIER_3,
    type: MemoryType.HOSPITAL,
    title: 'The Exam',
    ageRange: '16 through adulthood',
    bedroomTrigger: 'Discovered through progression',
    layer: 'C',
    resistanceTexts: [
      "Once I get through this one. Then I can finally start.",
    ],
    realisationText: null,
    conclusionText: null,
  },

  [MemoryId.GRAVE]: {
    id: MemoryId.GRAVE,
    tier: MemoryTier.TIER_3,
    type: MemoryType.DEAD,
    title: 'The Grave',
    ageRange: 'Multiple ages',
    bedroomTrigger: 'Gated behind five completed memories in current loop',
    layer: 'D',
    resistanceTexts: [],
    realisationText: null,
    conclusionText: null,
  },

  [MemoryId.WATCHER]: {
    id: MemoryId.WATCHER,
    tier: MemoryTier.TIER_4,
    type: MemoryType.REALISATION,
    title: "The Watcher's Memory",
    ageRange: 'Always follows Grave Memory',
    bedroomTrigger: 'Always follows Grave Memory',
    layer: 'D',
    resistanceTexts: [],
    realisationText: 'Oh.',
    conclusionText: null,
  },
}

export const GRAVE_EPITAPHS = [
  'If I pass these classes, life will finally begin.',
  'If I get into college, life will finally begin.',
  'If I get a good job, life will finally begin.',
  'If I earn enough money, life will finally begin.',
  'If I become successful, life will finally begin.',
  'If I solve all my problems, life will finally begin.',
  '', // Blank — seventh marker
]

export const MEMORY_LAYER_REQUIREMENTS: Record<string, number> = {
  A: 0,  // Available from Loop 1
  B: 2,  // Requires 2 Layer A memories completed
  C: 3,  // Requires all Layer B memories completed
  D: 5,  // Requires all Tier 3 memories completed across any loops
}

export const MEMORIES_BY_LAYER = {
  A: [MemoryId.GUITAR, MemoryId.SHOES, MemoryId.PHONE],
  B: [MemoryId.APPLICATION, MemoryId.WINDOW, MemoryId.DEADLINE],
  C: [MemoryId.PARENTS, MemoryId.SKETCHBOOK, MemoryId.EXAM],
  D: [MemoryId.GRAVE, MemoryId.WATCHER],
}
