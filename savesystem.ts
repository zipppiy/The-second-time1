import {
  GlobalSaveData,
  MemoryId,
  WatcherSignal,
  EndingId,
  MemoryState,
  LoopHistoryEntry,
} from '@/types'

const SAVE_KEY = 'the_second_time_save'
const SAVE_VERSION = 1

function createInitialMemoryStates(): Record<MemoryId, MemoryState> {
  const states: Partial<Record<MemoryId, MemoryState>> = {}
  for (const id of Object.values(MemoryId)) {
    states[id] = {
      id,
      available: false,
      triggered: false,
      completed: false,
      retreated: false,
      completedInLoop: null,
    }
  }
  return states as Record<MemoryId, MemoryState>
}

export function createInitialSaveData(): GlobalSaveData {
  return {
    loopCount: 1,
    totalMemoriesCompleted: [],
    watcherSignalsEncountered: [],
    endingReached: null,
    firstPlaythrough: true,
    memoryStates: createInitialMemoryStates(),
    loopHistory: [],
    sessionStartTime: Date.now(),
  }
}

export class SaveSystem {
  private static instance: SaveSystem
  private data: GlobalSaveData

  private constructor() {
    this.data = this.load()
  }

  static getInstance(): SaveSystem {
    if (!SaveSystem.instance) {
      SaveSystem.instance = new SaveSystem()
    }
    return SaveSystem.instance
  }

  private load(): GlobalSaveData {
    try {
      const raw = localStorage.getItem(SAVE_KEY)
      if (!raw) return createInitialSaveData()
      const parsed = JSON.parse(raw)
      if (parsed.version !== SAVE_VERSION) {
        console.warn('[SaveSystem] Version mismatch. Creating fresh save.')
        return createInitialSaveData()
      }
      return parsed.data as GlobalSaveData
    } catch {
      console.warn('[SaveSystem] Failed to load save. Creating fresh save.')
      return createInitialSaveData()
    }
  }

  save(): void {
    try {
      const payload = {
        version: SAVE_VERSION,
        savedAt: Date.now(),
        data: this.data,
      }
      localStorage.setItem(SAVE_KEY, JSON.stringify(payload))
    } catch {
      console.warn('[SaveSystem] Failed to save game state.')
    }
  }

  getData(): GlobalSaveData {
    return { ...this.data }
  }

  incrementLoop(): void {
    this.data.loopCount += 1
    this.save()
  }

  markMemoryCompleted(id: MemoryId, loop: number): void {
    this.data.memoryStates[id].completed = true
    this.data.memoryStates[id].completedInLoop = loop
    if (!this.data.totalMemoriesCompleted.includes(id)) {
      this.data.totalMemoriesCompleted.push(id)
    }
    this.save()
  }

  markMemoryRetreated(id: MemoryId): void {
    this.data.memoryStates[id].retreated = true
    this.save()
  }

  markMemoryTriggered(id: MemoryId): void {
    this.data.memoryStates[id].triggered = true
    this.save()
  }

  markMemoryAvailable(id: MemoryId): void {
    this.data.memoryStates[id].available = true
    this.save()
  }

  recordWatcherSignal(signal: WatcherSignal): void {
    if (!this.data.watcherSignalsEncountered.includes(signal)) {
      this.data.watcherSignalsEncountered.push(signal)
      this.save()
    }
  }

  setEndingReached(ending: EndingId): void {
    this.data.endingReached = ending
    this.data.firstPlaythrough = false
    this.save()
  }

  addLoopHistory(entry: LoopHistoryEntry): void {
    this.data.loopHistory.push(entry)
    this.save()
  }

  hasWatcherSignal(signal: WatcherSignal): boolean {
    return this.data.watcherSignalsEncountered.includes(signal)
  }

  hasAllWatcherSignals(): boolean {
    return Object.values(WatcherSignal).every(s =>
      this.data.watcherSignalsEncountered.includes(s)
    )
  }

  isMemoryCompleted(id: MemoryId): boolean {
    return this.data.memoryStates[id].completed
  }

  getCompletedCount(ids: MemoryId[]): number {
    return ids.filter(id => this.isMemoryCompleted(id)).length
  }

  reset(): void {
    this.data = createInitialSaveData()
    this.save()
  }
}