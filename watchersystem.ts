import {
  WatcherSignal,
  LoopPhase,
  MemoryId,
} from '@/types'
import { SaveSystem } from './SaveSystem'
import {
  WATCHER_DIALOGUE_BY_LOOP,
  WATCHER_MEMORY_DIALOGUE,
  WATCHER_RECOGNITION_DIALOGUE,
} from '@/data/dialogue'

export class WatcherSystem {
  private save: SaveSystem

  constructor() {
    this.save = SaveSystem.getInstance()
  }

  recordSignal(signal: WatcherSignal): void {
    this.save.recordWatcherSignal(signal)
  }

  hasSignal(signal: WatcherSignal): boolean {
    return this.save.hasWatcherSignal(signal)
  }

  hasAllSignals(): boolean {
    return this.save.hasAllWatcherSignals()
  }

  getDialogue(
    loopCount: number,
    trigger: string
  ): { speaker: string; text: string; pause?: number }[] {
    const loopKey = Math.min(loopCount, 5)
    const loopDialogue = WATCHER_DIALOGUE_BY_LOOP[loopKey]
    if (!loopDialogue) return []
    const dialogue = loopDialogue[trigger]
    if (!dialogue) return []
    return dialogue
  }

  getWatcherMemoryDialogue(): { speaker: string; text: string; pause?: number }[] {
    const base = [...WATCHER_MEMORY_DIALOGUE]
    if (this.hasAllSignals()) {
      base.push(...WATCHER_RECOGNITION_DIALOGUE)
    }
    return base
  }

  // Determines Watcher's visibility level for current loop
  getVisibilityLevel(loopCount: number): 'peripheral' | 'background' | 'present' | 'engaged' {
    if (loopCount <= 1) return 'peripheral'
    if (loopCount === 2) return 'background'
    if (loopCount === 3) return 'present'
    return 'engaged'
  }

  // Checks if Watcher should display after sketchbook memory
  shouldShowFlinchAfterSketchbook(loopCount: number): boolean {
    return loopCount >= 3
  }

  // Returns door dialogue based on loop and unlock state
  getDoorDialogue(loopCount: number, doorUnlocked: boolean): string | null {
    if (doorUnlocked) return 'It opens now.'
    if (loopCount >= 5) return 'After the cemetery.'
    if (loopCount === 4) return "It'll be there when you're ready. It's been there the whole time."
    if (loopCount === 3) return 'You know what you still have to see.'
    if (loopCount === 2) return 'Not yet.'
    return null // Loop 1 — protagonist internal voice
  }
}