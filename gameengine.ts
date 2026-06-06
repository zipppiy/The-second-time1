import { LoopSystem } from './LoopSystem'
import { MemorySystem } from './MemorySystem'
import { WatcherSystem } from './WatcherSystem'
import { EndingSystem } from './EndingSystem'
import { SaveSystem } from './SaveSystem'
import { MemoryId, EndingId, WatcherSignal, LoopPhase } from '@/types'

// Central coordinator — orchestrates all systems
// Does not contain game logic itself
// Systems contain their own logic
// Engine wires systems together

export class GameEngine {
  private static instance: GameEngine

  readonly loop: LoopSystem
  readonly memory: MemorySystem
  readonly watcher: WatcherSystem
  readonly ending: EndingSystem
  readonly save: SaveSystem

  private constructor() {
    this.save = SaveSystem.getInstance()
    this.loop = new LoopSystem()
    this.memory = new MemorySystem()
    this.watcher = new WatcherSystem()
    this.ending = new EndingSystem()
  }

  static getInstance(): GameEngine {
    if (!GameEngine.instance) {
      GameEngine.instance = new GameEngine()
    }
    return GameEngine.instance
  }

  // ── LOOP ACTIONS ──────────────────────────────────────────────

  startCrashSequence(): { variant: string; loopCount: number } {
    const state = this.loop.getState()
    return {
      variant: state.crashVariant,
      loopCount: state.count,
    }
  }

  enterBedroom(): {
    loopCount: number
    degradationLevel: number
    availableMemories: MemoryId[]
    watcherVisibility: string
  } {
    this.loop.setPhase(LoopPhase.BEDROOM)
    const loopCount = this.loop.getLoopCount()
    return {
      loopCount,
      degradationLevel: Math.min(loopCount, 5),
      availableMemories: this.memory.computeAvailableMemories(loopCount),
      watcherVisibility: this.watcher.getVisibilityLevel(loopCount),
    }
  }

  triggerMemory(id: MemoryId): boolean {
    const canAccess = this.memory.canAccessMemory(id, this.loop.getLoopCount())
    if (!canAccess) return false
    this.loop.enterMemory(id)
    return true
  }

  completeMemory(id: MemoryId): void {
    this.loop.completeMemory(id)

    // Signal: Sketchbook flinch
    if (id === MemoryId.SKETCHBOOK) {
      this.watcher.recordSignal(WatcherSignal.SKETCHBOOK_FLINCH)
    }
  }

  retreatFromMemory(id: MemoryId): void {
    this.loop.retreatFromMemory(id)
  }

  approachDoor(): {
    unlocked: boolean
    dialogue: string | null
    watcherSpeaks: boolean
  } {
    const loopCount = this.loop.getLoopCount()
    const graveCompleted = this.save.isMemoryCompleted(MemoryId.GRAVE)
    const watcherCompleted = this.save.isMemoryCompleted(MemoryId.WATCHER)
    const unlocked = graveCompleted && watcherCompleted

    const dialogue = this.watcher.getDoorDialogue(loopCount, unlocked)
    const watcherSpeaks = loopCount >= 2

    return { unlocked, dialogue, watcherSpeaks }
  }

  openDoor(): EndingId {
    return this.loop.openDoor()
  }

  // ── WATCHER ACTIONS ───────────────────────────────────────────

  recordWatcherSignal(signal: WatcherSignal): void {
    this.watcher.recordSignal(signal)
  }

  getWatcherDialogue(trigger: string): { speaker: string; text: string; pause?: number }[] {
    return this.watcher.getDialogue(this.loop.getLoopCount(), trigger)
  }

  getWatcherMemoryScene(): {
    dialogue: { speaker: string; text: string; pause?: number }[]
    hasFullRecognition: boolean
  } {
    return {
      dialogue: this.watcher.getWatcherMemoryDialogue(),
      hasFullRecognition: this.watcher.hasAllSignals(),
    }
  }

  // ── ENDING ────────────────────────────────────────────────────

  getDenialFlicker(): boolean {
    return this.ending.isDenialFlickerActive(this.loop.getLoopCount())
  }

  // ── STATE QUERIES ─────────────────────────────────────────────

  getFullState() {
    return {
      loop: this.loop.getState(),
      save: this.save.getData(),
      watcherSignals: Object.values(WatcherSignal).reduce(
        (acc, s) => ({ ...acc, [s]: this.watcher.hasSignal(s) }),
        {} as Record<WatcherSignal, boolean>
      ),
    }
  }
}