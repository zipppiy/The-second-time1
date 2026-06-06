import { Howl, Howler } from 'howler'
import { AudioTrack } from '@/types'

interface AudioConfig {
  src: string[]
  loop: boolean
  volume: number
  html5?: boolean
}

// Audio track definitions
// In production these point to real audio files
// For development, synthetic audio is generated where needed
const AUDIO_CONFIG: Record<AudioTrack, AudioConfig> = {
  [AudioTrack.PIANO_SINGLE]: {
    src: ['/audio/piano_single.mp3'],
    loop: false,
    volume: 0.6,
  },
  [AudioTrack.PIANO_FULLER]: {
    src: ['/audio/piano_fuller.mp3'],
    loop: false,
    volume: 0.7,
  },
  [AudioTrack.PIANO_COMPLETE]: {
    src: ['/audio/piano_complete.mp3'],
    loop: false,
    volume: 0.8,
  },
  [AudioTrack.FAN_LOOP_1]: {
    src: ['/audio/fan_loop_1.mp3'],
    loop: true,
    volume: 0.3,
    html5: true,
  },
  [AudioTrack.FAN_LOOP_2]: {
    src: ['/audio/fan_loop_2.mp3'],
    loop: true,
    volume: 0.32,
    html5: true,
  },
  [AudioTrack.FAN_LOOP_3]: {
    src: ['/audio/fan_loop_3.mp3'],
    loop: true,
    volume: 0.35,
    html5: true,
  },
  [AudioTrack.FAN_LOOP_4]: {
    src: ['/audio/fan_loop_4.mp3'],
    loop: true,
    volume: 0.38,
    html5: true,
  },
  [AudioTrack.FAN_LOOP_5]: {
    src: ['/audio/fan_loop_5.mp3'],
    loop: true,
    volume: 0.4,
    html5: true,
  },
  [AudioTrack.CRASH]: {
    src: ['/audio/crash.mp3'],
    loop: false,
    volume: 0.9,
  },
  [AudioTrack.RAIN]: {
    src: ['/audio/rain.mp3'],
    loop: true,
    volume: 0.4,
    html5: true,
  },
  [AudioTrack.HOSPITAL_AMBIENT]: {
    src: ['/audio/hospital_ambient.mp3'],
    loop: true,
    volume: 0.25,
    html5: true,
  },
}

export class AudioSystem {
  private static instance: AudioSystem
  private sounds: Map<AudioTrack, Howl>
  private activeTracks: Set<AudioTrack>
  private masterVolume: number
  private muted: boolean

  private constructor() {
    this.sounds = new Map()
    this.activeTracks = new Set()
    this.masterVolume = 1.0
    this.muted = false
    this.preloadEssential()
  }

  static getInstance(): AudioSystem {
    if (!AudioSystem.instance) {
      AudioSystem.instance = new AudioSystem()
    }
    return AudioSystem.instance
  }

  private preloadEssential(): void {
    // Preload only what is needed immediately
    // Fan tracks and crash are essential
    const essential: AudioTrack[] = [
      AudioTrack.FAN_LOOP_1,
      AudioTrack.CRASH,
    ]
    for (const track of essential) {
      this.load(track)
    }
  }

  private load(track: AudioTrack): Howl {
    if (this.sounds.has(track)) {
      return this.sounds.get(track)!
    }
    const config = AUDIO_CONFIG[track]
    const howl = new Howl({
      src: config.src,
      loop: config.loop,
      volume: config.volume * this.masterVolume,
      html5: config.html5 ?? false,
      onloaderror: (_id, err) => {
        // In development without audio files, this is expected
        console.debug(`[AudioSystem] Could not load ${track}: ${err}`)
      },
    })
    this.sounds.set(track, howl)
    return howl
  }

  play(track: AudioTrack, fadeIn: number = 0): void {
    if (this.muted) return
    const howl = this.load(track)
    if (fadeIn > 0) {
      howl.volume(0)
      howl.play()
      howl.fade(0, AUDIO_CONFIG[track].volume * this.masterVolume, fadeIn)
    } else {
      howl.play()
    }
    this.activeTracks.add(track)
  }

  stop(track: AudioTrack, fadeOut: number = 0): void {
    const howl = this.sounds.get(track)
    if (!howl) return
    if (fadeOut > 0) {
      howl.fade(howl.volume(), 0, fadeOut)
      setTimeout(() => {
        howl.stop()
        this.activeTracks.delete(track)
      }, fadeOut)
    } else {
      howl.stop()
      this.activeTracks.delete(track)
    }
  }

  stopAll(fadeOut: number = 0): void {
    for (const track of this.activeTracks) {
      this.stop(track, fadeOut)
    }
  }

  // Switch fan track based on loop
  switchFanTrack(loopCount: number): void {
    const fanTracks: AudioTrack[] = [
      AudioTrack.FAN_LOOP_1,
      AudioTrack.FAN_LOOP_2,
      AudioTrack.FAN_LOOP_3,
      AudioTrack.FAN_LOOP_4,
      AudioTrack.FAN_LOOP_5,
    ]

    // Stop current fan
    for (const t of fanTracks) {
      if (this.activeTracks.has(t)) {
        this.stop(t, 1500)
      }
    }

    // Start new fan
    const idx = Math.min(loopCount - 1, fanTracks.length - 1)
    const next = fanTracks[idx]

    // Preload before playing
    this.load(next)
    setTimeout(() => this.play(next, 1500), 500)
  }

  playFanStop(): void {
    // Silence — the fan stopping at crash is defined by absence
    this.stopAll(200)
  }

  setMasterVolume(vol: number): void {
    this.masterVolume = Math.max(0, Math.min(1, vol))
    Howler.volume(this.masterVolume)
  }

  setMuted(muted: boolean): void {
    this.muted = muted
    if (muted) {
      Howler.volume(0)
    } else {
      Howler.volume(this.masterVolume)
    }
  }
}