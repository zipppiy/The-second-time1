9import { EndingId, WatcherSignal } from '@/types'
import { SaveSystem } from './SaveSystem'

export interface EndingCondition {
  endingId: EndingId
  met: boolean
  reason: string
}

export class EndingSystem {
  private save: SaveSystem

  constructor() {
    this.save = SaveSystem.getInstance()
  }

  evaluateAll(): EndingCondition[] {
    const data = this.save.getData()

    return [
      {
        endingId: EndingId.RELEASE,
        met:
          data.memoryStates['GRAVE' as any]?.completed === true &&
          data.memoryStates['WATCHER' as any]?.completed === true,
        reason:
          'Grave Memory and Watcher Memory completed without retreat, door opened deliberately.',
      },
      {
        endingId: EndingId.WATCHER,
        met: data.loopCount >= 5 && data.endingReached === null,
        reason:
          'All memories witnessed across multiple loops. Door perpetually deferred. Loop count reached 5+.',
      },
      {
        endingId: EndingId.DENIAL,
        met:
          data.loopCount >= 5 &&
          !data.memoryStates['GRAVE' as any]?.completed,
        reason:
          'Repeated retreats from Tier 3 memories. Grave Memory never completed. Loop 5+ reached.',
      },
    ]
  }

  determineFinalEnding(): EndingId {
    const data = this.save.getData()

    // Primary check: Release
    if (
      data.memoryStates['GRAVE' as any]?.completed &&
      data.memoryStates['WATCHER' as any]?.completed
    ) {
      return EndingId.RELEASE
    }

    // Secondary check: Denial (locked in)
    if (data.loopCount >= 5 && !data.memoryStates['GRAVE' as any]?.completed) {
      return EndingId.DENIAL
    }

    // Default: Watcher
    return EndingId.WATCHER
  }

  isDenialFlickerActive(loopCount: number): boolean {
    // Flicker begins from Loop 3 for players who retreated from Tier 3
    const data = this.save.getData()
    const hasRetreated = Object.values(data.memoryStates).some(
      s => s.retreated
    )
    return loopCount >= 3 && hasRetreated
  }

  getPianoState(endingId: EndingId): 'SINGLE' | 'FULLER' | 'COMPLETE' {
    if (endingId === EndingId.RELEASE) return 'COMPLETE'
    if (endingId === EndingId.WATCHER) return 'SINGLE'
    return 'SINGLE'
  }
}