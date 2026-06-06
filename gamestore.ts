import { create } from 'zustand'
import {
  LoopPhase,
  MemoryId,
  EndingId,
  WatcherSignal,
  DegradationLevel,
} from '@/types'

interface GameState {
  // Core state
  phase: LoopPhase
  loopCount: number
  activeMemoryId: MemoryId | null
  endingId: EndingId | null
  doorUnlocked: boolean

  // Memory state
  completedMemories: MemoryId[]
  availableMemories: MemoryId[]

  // Watcher state
  watcherSignals: WatcherSignal[]
  watcherVisibility: 'peripheral' | 'background' | 'present' | 'engaged'

  // Degradation
  degradationLevel: DegradationLevel

  // UI state
  isTransitioning: boolean
  transitionColor: 'black' | 'white'
  showResistanceText: boolean
  currentResistanceText: string
  showRealisationText: boolean
  currentRealisationText: string
  showDialogue: boolean

  // Audio state
  isMuted: boolean
  masterVolume: number

  // Actions
  setPhase: (phase: LoopPhase) => void
  setLoopCount: (count: number) => void
  setActiveMemory: (id: MemoryId | null) => void
  setEndingId: (id: EndingId) => void
  setDoorUnlocked: (unlocked: boolean) => void
  addCompletedMemory: (id: MemoryId) => void
  setAvailableMemories: (ids: MemoryId[]) => void
  addWatcherSignal: (signal: WatcherSignal) => void
  setWatcherVisibility: (v: 'peripheral' | 'background' | 'present' | 'engaged') => void
  setDegradationLevel: (level: DegradationLevel) => void
  setTransitioning: (active: boolean, color?: 'black' | 'white') => void
  showResistance: (text: string) => void
  hideResistance: () => void
  showRealisation: (text: string) => void
  hideRealisation: () => void
  setMuted: (muted: boolean) => void
  setMasterVolume: (vol: number) => void
  incrementLoop: () => void
  reset: () => void
}

const initialState = {
  phase: LoopPhase.CRASH,
  loopCount: 1,
  activeMemoryId: null,
  endingId: null,
  doorUnlocked: false,
  completedMemories: [],
  availableMemories: [],
  watcherSignals: [],
  watcherVisibility: 'peripheral' as const,
  degradationLevel: DegradationLevel.LOOP_1,
  isTransitioning: false,
  transitionColor: 'black' as const,
  showResistanceText: false,
  currentResistanceText: '',
  showRealisationText: false,
  currentRealisationText: '',
  showDialogue: false,
  isMuted: false,
  masterVolume: 1.0,
}

export const useGameStore = create<GameState>((set, get) => ({
  ...initialState,

  setPhase: (phase) => set({ phase }),

  setLoopCount: (count) => set({
    loopCount: count,
    degradationLevel: Math.min(count, 5) as DegradationLevel,
  }),

  setActiveMemory: (id) => set({ activeMemoryId: id }),

  setEndingId: (id) => set({ endingId: id }),

  setDoorUnlocked: (unlocked) => set({ doorUnlocked: unlocked }),

  addCompletedMemory: (id) => set((state) => ({
    completedMemories: state.completedMemories.includes(id)
      ? state.completedMemories
      : [...state.completedMemories, id],
  })),

  setAvailableMemories: (ids) => set({ availableMemories: ids }),

  addWatcherSignal: (signal) => set((state) => ({
    watcherSignals: state.watcherSignals.includes(signal)
      ? state.watcherSignals
      : [...state.watcherSignals, signal],
  })),

  setWatcherVisibility: (v) => set({ watcherVisibility: v }),

  setDegradationLevel: (level) => set({ degradationLevel: level }),

  setTransitioning: (active, color = 'black') =>
    set({ isTransitioning: active, transitionColor: color }),

  showResistance: (text) =>
    set({ showResistanceText: true, currentResistanceText: text }),

  hideResistance: () =>
    set({ showResistanceText: false, currentResistanceText: '' }),

  showRealisation: (text) =>
    set({ showRealisationText: true, currentRealisationText: text }),

  hideRealisation: () =>
    set({ showRealisationText: false, currentRealisationText: '' }),

  setMuted: (muted) => set({ isMuted: muted }),

  setMasterVolume: (vol) => set({ masterVolume: vol }),

  incrementLoop: () =>
    set((state) => ({
      loopCount: state.loopCount + 1,
      degradationLevel: Math.min(state.loopCount + 1, 5) as DegradationLevel,
    })),

  reset: () => set(initialState),
}))