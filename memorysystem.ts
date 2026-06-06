import {
  MemoryId,
  MemoryLayer,
  MemoryState,
} from '@/types'
import {
  MEMORIES,
  MEMORIES_BY_LAYER,
} from '@/data/memories'
import { SaveSystem } from './SaveSystem'

export class MemorySystem {
  private save: SaveSystem

  constructor() {
    this.save = SaveSystem.getInstance()
  }

  computeAvailableMemories(currentLoop: number): MemoryId[] {
    const data = this.save.getData()
    const available: MemoryId[] = []

    // Layer A — always available from loop 1
    for (const id of MEMORIES_BY_LAYER.A) {
      available.push(id)
    }

    // Layer B — requires 2 Layer A memories completed
    const layerACompleted = this.save.getCompletedCount(MEMORIES_BY_LAYER.A)
    if (layerACompleted >= 2) {
      for (const id of MEMORIES_BY_LAYER.B) {
        available.push(id)
      }
    }

    // Layer C — requires all Layer B completed
    const layerBCompleted = this.save.getCompletedCount(MEMORIES_BY_LAYER.B)
    if (layerBCompleted >= MEMORIES_BY_LAYER.B.length) {
      for (const id of MEMORIES_BY_LAYER.C) {
        available.push(id)
      }
    }

    // Layer D — requires 5 total memories completed across loops
    const totalCompleted = data.totalMemoriesCompleted.length
    if (totalCompleted >= 5) {
      for (const id of MEMORIES_BY_LAYER.D) {
        available.push(id)
      }
    }

    return available
  }

  getMemoryState(id: MemoryId): MemoryState {
    return this.save.getData().memoryStates[id]
  }

  canAccessMemory(id: MemoryId, currentLoop: number): boolean {
    const available = this.computeAvailableMemories(currentLoop)
    return available.includes(id)
  }

  completeMemory(id: MemoryId, currentLoop: number): void {
    this.save.markMemoryCompleted(id, currentLoop)
  }

  retreatFromMemory(id: MemoryId): void {
    this.save.markMemoryRetreated(id)
  }

  triggerMemory(id: MemoryId): void {
    this.save.markMemoryTriggered(id)
  }

  getLayer(id: MemoryId): MemoryLayer {
    return MEMORIES[id].layer
  }

  shouldDenialEndingLock(currentLoop: number): boolean {
    // Denial locks after Loop 5 begins without Grave Memory completed
    return currentLoop >= 5 && !this.save.isMemoryCompleted(MemoryId.GRAVE)
  }

  countCompletedTier3(): number {
    const tier3 = [MemoryId.SKETCHBOOK, MemoryId.EXAM]
    return this.save.getCompletedCount(tier3)
  }

  allTier3Completed(): boolean {
    return this.countCompletedTier3() >= 2
  }

  isGraveUnlocked(): boolean {
    return this.save.getData().totalMemoriesCompleted.length >= 5 &&
      this.allTier3Completed()
  }
}
