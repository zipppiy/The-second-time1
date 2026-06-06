// Timing utilities for controlled delays and sequences

export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function sequence(
  steps: Array<{ action: () => void | Promise<void>; delay: number }>
): Promise<void> {
  for (const step of steps) {
    await wait(step.delay)
    await step.action()
  }
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

// Throttle function calls — useful for resize handlers
export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  ms: number
): T {
  let lastCall = 0
  return ((...args: any[]) => {
    const now = Date.now()
    if (now - lastCall >= ms) {
      lastCall = now
      fn(...args)
    }
  }) as T
}