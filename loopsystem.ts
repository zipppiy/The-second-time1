import {
  LoopPhase,
  MemoryId,
  CrashVariant,
  LoopState,
  EndingId,
} from '@/types'
import { SaveSystem } from './SaveSystem'
import { MemorySystem } from './MemorySystem'

export class LoopSystem {
  private save: SaveSystem
  private memorySystem: MemorySystem
  private state: LoopState

  constructor() {
    this.save = SaveSystem.getInstance()
    this.memorySystem = new MemorySystem()
    this.state = this.buildInitialState()
  }

  private buildInitialState(): LoopState {
    const data = this.save.getData()
    return {
      count: data.loopCount,
      phase: LoopPhase.CRASH,
      activeMemoryId: null,
      memoriesCompletedThisLoop: [],
      retreatsThisLoop: 0,
      crashVariant: this.determineCrashVariant(data.loopCount),
    }
  }

  private determineCrashVariant(loopCount: number): CrashVariant {
    if (loopCount >= 5) return 'WATCHER_VISIBLE'
    if (loopCount >= 3) return 'WRONG_ANGLE'
    return 'SOUND_ONLY'
  }

  getState(): LoopState {
    return { ...this.state }
  }

  getLoopCount(): number {
    return this.state.count
  }

  getPhase(): LoopPhase {
    return this.state.phase
  }

  setPhase(phase: LoopPhase): void {
    this.state.phase = phase
  }

  enterMemory(id: MemoryId): void {
    if (!this.memorySystem.canAccessMemory(id, this.state.count)) {
      console.warn(`[LoopSystem] Memory ${id} not available in loop ${this.state.count}`)
      return
    }
    this.state.activeMemoryId = id
    this.state.phase = LoopPhase.MEMORY
    this.memorySystem.triggerMemory(id)
  }

  completeMemory(id: MemoryId): void {
    this.state.activeMemoryId = null
    this.state.memoriesCompletedThisLoop.push(id)
    this.memorySystem.completeMemory(id, this.state.count)

    // Determine next phase
    const memory = id
    if (memory === MemoryId.DEADLINE || memory === MemoryId.EXAM) {
      this.state.phase = LoopPhase.HOSPITAL
    } else if (memory === MemoryId.GRAVE) {
      // Automatically triggers Watcher's Memory
      this.state.phase = LoopPhase.CEMETERY
    } else {
      this.state.phase = LoopPhase.BEDROOM
    }
  }

  retreatFromMemory(id: MemoryId): void {
    this.state.activeMemoryId = null
    this.state.retreatsThisLoop += 1
    this.memorySystem.retreatFromMemory(id)

    // Retreating from Tier 3 triggers loop reset
    const memory = require('@/data/memories').MEMORIES[id]
    if (memory && memory.tier === 3) {
      this.resetLoop()
    } else {
      this.state.phase = LoopPhase.BEDROOM
    }
  }

  resetLoop(): void {
    const data = this.save.getData()
    this.save.addLoopHistory({
      loopNumber: this.state.count,
      memoriesCompleted: this.state.memoriesCompletedThisLoop,
      retreats: this.state.retreatsThisLoop,
      endedBy: 'RETREAT',
    })
    this.save.incrementLoop()
    this.state.count += 1
    this.state.phase = LoopPhase.CRASH
    this.state.activeMemoryId = null
    this.state.memoriesCompletedThisLoop = []
    this.state.retreatsThisLoop = 0
    this.state.crashVariant = this.determineCrashVariant(this.state.count)
  }

  openDoor(): EndingId {
    this.save.addLoopHistory({
      loopNumber: this.state.count,
      memoriesCompleted: this.state.memoriesCompletedThisLoop,
      retreats: this.state.retreatsThisLoop,
      endedBy: 'DOOR',
    })

    const data = this.save.getData()
    let ending: EndingId

    if (
      this.memorySystem.isGraveUnlocked() &&
      data.memoryStates[MemoryId.WATCHER].completed
    ) {
      ending = EndingId.RELEASE
    } else if (data.loopCount >= 5) {
      ending = EndingId.WATCHER
    } else {
      ending = EndingId.DENIAL
    }

    this.save.setEndingReached(ending)
    this.state.phase = LoopPhase.ENDING
    return ending
  }

  isDenialLocked(): boolean {
    return this.memorySystem.shouldDenialEndingLock(this.state.count)
  }

  isWatcherEndingApproaching(): boolean {
    return this.state.count >= 4 && !this.save.isMemoryCompleted(MemoryId.WATCHER)
  }
}