// ============================================================
// CORE ENUMERATIONS
// ============================================================

export enum LoopPhase {
  CRASH = 'CRASH',
  BEDROOM = 'BEDROOM',
  MEMORY = 'MEMORY',
  HOSPITAL = 'HOSPITAL',
  CEMETERY = 'CEMETERY',
  ENDING = 'ENDING',
}

export enum MemoryId {
  GUITAR = 'GUITAR',
  SHOES = 'SHOES',
  PHONE = 'PHONE',
  APPLICATION = 'APPLICATION',
  WINDOW = 'WINDOW',
  DEADLINE = 'DEADLINE',
  PARENTS = 'PARENTS',
  SKETCHBOOK = 'SKETCHBOOK',
  EXAM = 'EXAM',
  GRAVE = 'GRAVE',
  WATCHER = 'WATCHER',
}

export enum MemoryTier {
  TIER_1 = 1,
  TIER_2 = 2,
  TIER_3 = 3,
  TIER_4 = 4,
}

export enum MemoryType {
  REALISATION = 'REALISATION',
  HOSPITAL = 'HOSPITAL',
  DEAD = 'DEAD',
}

export enum EndingId {
  RELEASE = 'RELEASE',
  WATCHER = 'WATCHER',
  DENIAL = 'DENIAL',
}

export enum WatcherSignal {
  HEAD_TILT = 'HEAD_TILT',
  MAYBE_LATER = 'MAYBE_LATER',
  SKETCHBOOK_FLINCH = 'SKETCHBOOK_FLINCH',
  NAME_DEFLECTION = 'NAME_DEFLECTION',
}

export enum DegradationLevel {
  LOOP_1 = 1,
  LOOP_2 = 2,
  LOOP_3 = 3,
  LOOP_4 = 4,
  LOOP_5_PLUS = 5,
}

export enum AudioTrack {
  PIANO_SINGLE = 'PIANO_SINGLE',
  PIANO_FULLER = 'PIANO_FULLER',
  PIANO_COMPLETE = 'PIANO_COMPLETE',
  FAN_LOOP_1 = 'FAN_LOOP_1',
  FAN_LOOP_2 = 'FAN_LOOP_2',
  FAN_LOOP_3 = 'FAN_LOOP_3',
  FAN_LOOP_4 = 'FAN_LOOP_4',
  FAN_LOOP_5 = 'FAN_LOOP_5',
  CRASH = 'CRASH',
  RAIN = 'RAIN',
  HOSPITAL_AMBIENT = 'HOSPITAL_AMBIENT',
}

export enum InteractionType {
  HOVER = 'HOVER',
  CLICK = 'CLICK',
  LONG_PRESS = 'LONG_PRESS',
}

// ============================================================
// DATA STRUCTURES
// ============================================================

export interface Memory {
  id: MemoryId
  tier: MemoryTier
  type: MemoryType
  title: string
  ageRange: string
  bedroomTrigger: string
  resistanceTexts: string[]
  realisationText: string | null
  conclusionText: string | null
  layer: MemoryLayer
}

export type MemoryLayer = 'A' | 'B' | 'C' | 'D'

export interface MemoryState {
  id: MemoryId
  available: boolean
  triggered: boolean
  completed: boolean
  retreated: boolean
  completedInLoop: number | null
}

export interface WatcherDialogue {
  loop: number
  trigger: string
  lines: string[]
}

export interface ResistanceEvent {
  memoryId: MemoryId
  text: string
  timestamp: number
}

export interface LoopState {
  count: number
  phase: LoopPhase
  activeMemoryId: MemoryId | null
  memoriesCompletedThisLoop: MemoryId[]
  retreatsThisLoop: number
  crashVariant: CrashVariant
}

export type CrashVariant = 'SOUND_ONLY' | 'WRONG_ANGLE' | 'WATCHER_VISIBLE'

export interface GlobalSaveData {
  loopCount: number
  totalMemoriesCompleted: MemoryId[]
  watcherSignalsEncountered: WatcherSignal[]
  endingReached: EndingId | null
  firstPlaythrough: boolean
  memoryStates: Record<MemoryId, MemoryState>
  loopHistory: LoopHistoryEntry[]
  sessionStartTime: number
}

export interface LoopHistoryEntry {
  loopNumber: number
  memoriesCompleted: MemoryId[]
  retreats: number
  endedBy: 'RETREAT' | 'DOOR' | 'DENIAL_LOCK'
}

export interface InteractableObject {
  id: string
  position: [number, number, number]
  observationText: string
  memoryTrigger: MemoryId | null
  requiresLoop: number
  active: boolean
}

export interface DialogueLine {
  speaker: 'PROTAGONIST' | 'WATCHER' | 'DANIEL' | 'SARA' | 'MOTHER' | 'FATHER'
  text: string
  pause?: number
  emphasis?: boolean
}

export interface SceneTransition {
  from: LoopPhase
  to: LoopPhase
  duration: number
  type: 'FADE_BLACK' | 'FADE_WHITE' | 'CUT' | 'DISSOLVE'
}

export interface BedroomObject {
  id: string
  name: string
  loopObservations: Record<number, string>
  triggersMemory: MemoryId | null
  degradesAfterLoop: number | null
}

export interface AudioLayer {
  track: AudioTrack
  volume: number
  loop: boolean
  fadeIn: number
  fadeOut: number
}

// ============================================================
// COMPONENT PROPS
// ============================================================

export interface ResistanceTextProps {
  text: string
  onComplete: () => void
  duration?: number
}

export interface RealisationTextProps {
  text: string
  onComplete: () => void
}

export interface DialogueDisplayProps {
  lines: DialogueLine[]
  onComplete: () => void
  autoAdvance?: boolean
  advanceDelay?: number
}

export interface FadeTransitionProps {
  active: boolean
  color?: 'black' | 'white'
  duration?: number
  onComplete?: () => void
}

export interface SceneProps {
  onComplete: (outcome: SceneOutcome) => void
}

export type SceneOutcome =
  | { type: 'MEMORY_COMPLETED'; memoryId: MemoryId }
  | { type: 'MEMORY_RETREATED'; memoryId: MemoryId }
  | { type: 'DOOR_OPENED' }
  | { type: 'LOOP_RESET' }
  | { type: 'ENDING_REACHED'; endingId: EndingId }
