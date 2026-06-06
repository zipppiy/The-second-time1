import { DialogueLine, MemoryId } from '@/types'

export const WATCHER_DIALOGUE_BY_LOOP: Record<number, Record<string, DialogueLine[]>> = {
  1: {
    first_appearance: [
      {
        speaker: 'WATCHER',
        text: "You've been here before. You just don't know it yet.",
        pause: 2000,
      },
    ],
    door_approach: [
      { speaker: 'PROTAGONIST', text: 'Not yet.', emphasis: false },
    ],
  },
  2: {
    ambient: [
      { speaker: 'WATCHER', text: 'Maybe later.', pause: 3000 },
    ],
    door_approach: [
      { speaker: 'WATCHER', text: 'Not yet.', pause: 1000 },
    ],
  },
  3: {
    after_sketchbook: [
      { speaker: 'WATCHER', text: 'That one was hard to watch.', pause: 2000 },
    ],
    approached: [
      { speaker: 'WATCHER', text: 'That one was hard to watch.', pause: 1500 },
      { speaker: 'WATCHER', text: 'It always is.', pause: 1500 },
    ],
    who_are_you: [
      {
        speaker: 'WATCHER',
        text: 'Someone who has been here a long time.',
        pause: 2000,
      },
    ],
    how_long: [
      {
        speaker: 'WATCHER',
        text: 'Long enough to know how this part goes.',
        pause: 2000,
      },
    ],
    door_approach: [
      {
        speaker: 'WATCHER',
        text: 'You know what you still have to see.',
        pause: 1500,
      },
    ],
  },
  4: {
    name_question: [
      {
        speaker: 'WATCHER',
        text: "Does it matter what I'm called.",
        pause: 3000,
      },
    ],
    identity_question: [
      {
        speaker: 'WATCHER',
        text: 'You already know who I am.',
        pause: 2000,
      },
    ],
    what_do_you_want: [
      {
        speaker: 'WATCHER',
        text: 'The same thing you want. For this to be the last time.',
        pause: 3000,
      },
    ],
    about_loops: [
      {
        speaker: 'WATCHER',
        text: "They end when you stop needing them.",
        pause: 2000,
      },
    ],
    can_you_help: [
      {
        speaker: 'WATCHER',
        text: "I've been trying to help for a very long time.",
        pause: 3000,
      },
    ],
    why_stay: [
      {
        speaker: 'WATCHER',
        text: 'Because one of these times, you open the door.',
        pause: 2500,
      },
    ],
    has_it_happened: [
      { speaker: 'WATCHER', text: 'Not yet.', pause: 4000 },
    ],
    door_approach: [
      {
        speaker: 'WATCHER',
        text: "It'll be there when you're ready. It's been there the whole time.",
        pause: 2000,
      },
    ],
  },
  5: {
    general: [
      {
        speaker: 'WATCHER',
        text: "You're closer this time.",
        pause: 2000,
      },
    ],
    closer_to_what: [
      {
        speaker: 'WATCHER',
        text: 'To the end of it.',
        pause: 2000,
      },
    ],
    how_long_here: [
      {
        speaker: 'WATCHER',
        text: "Longer than you have. Not as long as I will be.",
        pause: 3000,
      },
    ],
    outside_door: [
      {
        speaker: 'WATCHER',
        text: "The same world. It just looks different when you're actually in it.",
        pause: 3000,
      },
    ],
    are_you_afraid: [
      {
        speaker: 'WATCHER',
        text: "I stopped being afraid a long time ago.",
        pause: 2000,
      },
      {
        speaker: 'WATCHER',
        text: "I'm not sure that was a good thing.",
        pause: 3000,
      },
    ],
    about_memories: [
      {
        speaker: 'WATCHER',
        text: "They're not there to hurt you. They're there because you needed to see them clearly. And you kept looking away.",
        pause: 4000,
      },
    ],
    can_they_change: [
      {
        speaker: 'WATCHER',
        text: "The memories? No.",
        pause: 2000,
      },
      {
        speaker: 'WATCHER',
        text: "You can.",
        pause: 3000,
      },
    ],
    door_approach: [
      {
        speaker: 'WATCHER',
        text: 'After the cemetery.',
        pause: 2000,
      },
    ],
  },
}

export const WATCHER_MEMORY_DIALOGUE: DialogueLine[] = [
  { speaker: 'PROTAGONIST', text: 'What was your biggest regret?', pause: 2000 },
  { speaker: 'WATCHER', text: "I thought I needed more time.", pause: 3000 },
  { speaker: 'WATCHER', text: "I had thousands of years.", pause: 3000 },
  {
    speaker: 'WATCHER',
    text: 'And somehow I still found ways to waste them.',
    pause: 5000,
  },
]

export const WATCHER_RECOGNITION_DIALOGUE: DialogueLine[] = [
  { speaker: 'PROTAGONIST', text: 'Oh.', pause: 4000, emphasis: true },
  { speaker: 'WATCHER', text: 'Yeah.', pause: 5000, emphasis: true },
]

export const BEDROOM_OBSERVATIONS: Record<
  string,
  Record<number, string>
> = {
  window: {
    1: 'The town looks the same from up here.',
    3: 'I keep meaning to open this more.',
    4: "It's stuck.",
  },
  bookshelf: {
    1: "I'll get to those.",
    3: "The bookmarks haven't moved.",
    5: "I bought these for a version of myself that never arrived.",
  },
  plant: {
    1: 'Still alive. Barely.',
    2: 'It needs water.',
    3: 'I keep forgetting.',
    5: "I threw it out somewhere. I don't remember when.",
  },
  clock: {
    3: "It's showing the wrong time. I should fix that.",
    4: 'I never fixed it.',
    5: "It stopped. I didn't notice when.",
  },
  photo_frame: {
    1: "That was a good day. I can't remember what we were laughing at.",
    3: "I haven't spoken to half the people in this photo in months.",
    4: 'It keeps doing that.',
  },
}

export const DOOR_DIALOGUE: Record<
  number,
  { speaker: 'PROTAGONIST' | 'WATCHER'; text: string }
> = {
  1: { speaker: 'PROTAGONIST', text: 'Not yet.' },
  2: { speaker: 'WATCHER', text: 'Not yet.' },
  3: { speaker: 'WATCHER', text: 'You know what you still have to see.' },
  4: {
    speaker: 'WATCHER',
    text: "It'll be there when you're ready. It's been there the whole time.",
  },
  5: { speaker: 'WATCHER', text: 'After the cemetery.' },
}

export const DANIEL_MESSAGES = [
  {
    timestamp: '11:47 PM Tuesday November',
    text: 'Can we talk?',
  },
  {
    timestamp: '2:34 PM Thursday',
    text: "Never mind. Hope you're okay.",
    delay: '3 weeks later',
  },
]

export const PARENTS_DIALOGUE = [
  { speaker: 'MOTHER' as const, scene: 'Kitchen morning', text: 'Want to eat together tonight?' },
  { speaker: 'FATHER' as const, scene: 'Living room Sunday', text: 'Come for a walk?' },
  { speaker: 'MOTHER' as const, scene: 'Hallway evening', text: "We're going to your aunt's on Saturday. Do you want—" },
  { speaker: 'MOTHER' as const, scene: 'Kitchen different morning', text: 'I made extra if you want some.' },
  { speaker: 'FATHER' as const, scene: 'Text message', text: "Haven't seen you much. Everything okay?" },
  {
    speaker: 'FATHER' as const,
    scene: 'Different Sunday',
    text: "I'm going for a walk. Last chance.",
  },
  {
    speaker: 'MOTHER' as const,
    scene: 'Quiet to no one',
    text: 'I just miss you. That\'s all.',
    emphasis: true,
  },
]

export const ENDING_TEXT: Record<string, string[]> = {
  WATCHER_CREDIT: [
    'He understood everything. He felt everything. He stayed anyway.',
  ],
  DENIAL_FLICKER: ['Again.'],
  DENIAL_FINAL: ['He will loop forever, and never fully remember why.'],
}

export const CRASH_VOICES: Record<string, string[]> = {
  LOOP_1: [],
  LOOP_3_PLUS: [],
  LOOP_5_PLUS: [],
}