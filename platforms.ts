// Device detection for platform-specific behavior

export const Platform = {
  isMobile: (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  },

  isIOS: (): boolean => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent)
  },

  isAndroid: (): boolean => {
    return /Android/i.test(navigator.userAgent)
  },

  isTouch: (): boolean => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  },

  isLowEnd: (): boolean => {
    // Heuristic for low-end device detection
    const memory = (navigator as any).deviceMemory
    if (memory && memory <= 2) return true
    const cores = navigator.hardwareConcurrency
    if (cores && cores <= 2) return true
    return false
  },

  prefersReducedMotion: (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },

  getPixelRatio: (): number => {
    // Cap at 2 for performance on mobile
    return Math.min(window.devicePixelRatio || 1, 2)
  },

  getViewport: (): { width: number; height: number } => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  },
}