import { DegradationLevel } from '@/types'

export interface BedroomDegradationState {
  level: DegradationLevel
  plant: 'alive' | 'wilted' | 'struggling' | 'dead' | 'gone'
  clock: 'correct' | 'wrong' | 'stopped'
  fan: 'normal' | 'imperceptible' | 'stutter_once' | 'stutter_twice' | 'slow'
  window: 'opens' | 'stuck'
  photoFrame: 'straight' | 'tilted'
  dust: 'none' | 'faint' | 'visible' | 'thick' | 'significant'
  drawer: 'opens' | 'stiff' | 'catches'
  jacket: 'two' | 'one' | 'none'
  doorKnob: 'normal' | 'slightly_wrong'
}

const DEGRADATION_STATES: Record<DegradationLevel, BedroomDegradationState> = {
  [DegradationLevel.LOOP_1]: {
    level: DegradationLevel.LOOP_1,
    plant: 'alive',
    clock: 'correct',
    fan: 'normal',
    window: 'opens',
    photoFrame: 'straight',
    dust: 'none',
    drawer: 'opens',
    jacket: 'two',
    doorKnob: 'normal',
  },
  [DegradationLevel.LOOP_2]: {
    level: DegradationLevel.LOOP_2,
    plant: 'wilted',
    clock: 'correct',
    fan: 'imperceptible',
    window: 'opens',
    photoFrame: 'tilted',
    dust: 'faint',
    drawer: 'opens',
    jacket: 'two',
    doorKnob: 'normal',
  },
  [DegradationLevel.LOOP_3]: {
    level: DegradationLevel.LOOP_3,
    plant: 'struggling',
    clock: 'wrong',
    fan: 'stutter_once',
    window: 'opens',
    photoFrame: 'tilted',
    dust: 'visible',
    drawer: 'catches',
    jacket: 'two',
    doorKnob: 'normal',
  },
  [DegradationLevel.LOOP_4]: {
    level: DegradationLevel.LOOP_4,
    plant: 'dead',
    clock: 'wrong',
    fan: 'stutter_twice',
    window: 'stuck',
    photoFrame: 'tilted',
    dust: 'thick',
    drawer: 'catches',
    jacket: 'one',
    doorKnob: 'normal',
  },
  [DegradationLevel.LOOP_5_PLUS]: {
    level: DegradationLevel.LOOP_5_PLUS,
    plant: 'gone',
    clock: 'stopped',
    fan: 'slow',
    window: 'stuck',
    photoFrame: 'tilted',
    dust: 'significant',
    drawer: 'catches',
    jacket: 'none',
    doorKnob: 'slightly_wrong',
  },
}

export class DegradationSystem {
  getState(loopCount: number): BedroomDegradationState {
    const level = Math.min(loopCount, 5) as DegradationLevel
    return DEGRADATION_STATES[level]
  }

  getPlantDescription(state: BedroomDegradationState): string {
    switch (state.plant) {
      case 'alive': return 'A small succulent. Not thriving. Surviving.'
      case 'wilted': return 'The plant has wilted slightly.'
      case 'struggling': return 'The plant is clearly struggling.'
      case 'dead': return 'The plant is dead.'
      case 'gone': return 'Just the empty pot. Soil dry and cracked.'
      default: return ''
    }
  }

  getFanDescription(state: BedroomDegradationState): string {
    switch (state.fan) {
      case 'normal': return 'The ceiling fan turns at its usual rhythm.'
      case 'imperceptible': return 'Something about the fan sounds slightly different.'
      case 'stutter_once': return 'The fan stutters once per cycle — brief, unsettling.'
      case 'stutter_twice': return 'The fan stutters twice per cycle. Irregular intervals.'
      case 'slow': return 'The fan turns slowly. Each rotation feels like effort.'
      default: return ''
    }
  }

  // Returns CSS class modifier for visual rendering
  getDustClass(state: BedroomDegradationState): string {
    return `dust-${state.dust}`
  }

  getDoorClass(state: BedroomDegradationState, unlocked: boolean): string {
    if (unlocked) return 'door-unlocked'
    if (state.doorKnob === 'slightly_wrong') return 'door-wrong'
    return 'door-normal'
  }
}