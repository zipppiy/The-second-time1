import { MemoryId } from '@/types'
import { MEMORIES } from '@/data/memories'

export interface ResistanceEvent {
  text: string
  index: number
  memoryId: MemoryId
  isLast: boolean
}

export class ResistanceSystem {
  private resistanceIndex: Map<MemoryId, number>
  private callbacks: ((event: ResistanceEvent) => void)[]

  constructor() {
    this.resistanceIndex = new Map()
    this.callbacks = []
  }

  onResistance(callback: (event: ResistanceEvent) => void): void {
    this.callbacks.push(callback)
  }

  private emit(event: ResistanceEvent): void {
    for (const cb of this.callbacks) {
      cb(event)
    }
  }

  // Called when player attempts an action in a memory
  // Returns the resistance text and whether the action was blocked
  applyResistance(memoryId: MemoryId): {
    blocked: boolean
    resistanceText: string | null
    actionPrevented: string
  } {
    const memory = MEMORIES[memoryId]
    if (!memory || memory.resistanceTexts.length === 0) {
      return { blocked: false, resistanceText: null, actionPrevented: '' }
    }

    const currentIndex = this.resistanceIndex.get(memoryId) ?? 0
    const texts = memory.resistanceTexts

    if (currentIndex >= texts.length) {
      // All resistance exhausted — memory concludes
      return { blocked: false, resistanceText: null, actionPrevented: '' }
    }

    const text = texts[currentIndex]
    const nextIndex = currentIndex + 1
    this.resistanceIndex.set(memoryId, nextIndex)

    const event: ResistanceEvent = {
      text,
      index: currentIndex,
      memoryId,
      isLast: nextIndex >= texts.length,
    }
    this.emit(event)

    return {
      blocked: true,
      resistanceText: text,
      actionPrevented: `attempt_${currentIndex}`,
    }
  }

  resetForMemory(memoryId: MemoryId): void {
    this.resistanceIndex.delete(memoryId)
  }

  resetAll(): void {
    this.resistanceIndex.clear()
  }

  getResistanceCount(memoryId: MemoryId): number {
    return this.resistanceIndex.get(memoryId) ?? 0
  }

  hasExhaustedResistance(memoryId: MemoryId): boolean {
    const memory = MEMORIES[memoryId]
    if (!memory) return true
    const count = this.resistanceIndex.get(memoryId) ?? 0
    return count >= memory.resistanceTexts.length
  }
}