// Unified interaction system for mouse and touch
// All game interactions route through this system
// Prevents fragmentation of input handling across components

export type InteractionHandler = (target: string, type: 'click' | 'hover' | 'long_press') => void

export class InteractionSystem {
  private handlers: Map<string, InteractionHandler>
  private longPressTimer: ReturnType<typeof setTimeout> | null
  private longPressDuration: number
  private enabled: boolean

  constructor() {
    this.handlers = new Map()
    this.longPressTimer = null
    this.longPressDuration = 600 // ms
    this.enabled = true
  }

  registerHandler(targetId: string, handler: InteractionHandler): void {
    this.handlers.set(targetId, handler)
  }

  unregisterHandler(targetId: string): void {
    this.handlers.delete(targetId)
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }

  // Call from React onClick
  handleClick(targetId: string): void {
    if (!this.enabled) return
    const handler = this.handlers.get(targetId)
    if (handler) handler(targetId, 'click')
  }

  // Call from React onMouseEnter
  handleHover(targetId: string): void {
    if (!this.enabled) return
    const handler = this.handlers.get(targetId)
    if (handler) handler(targetId, 'hover')
  }

  // Call from React onTouchStart
  handleTouchStart(targetId: string): void {
    if (!this.enabled) return
    this.longPressTimer = setTimeout(() => {
      const handler = this.handlers.get(targetId)
      if (handler) handler(targetId, 'long_press')
      this.longPressTimer = null
    }, this.longPressDuration)
  }

  // Call from React onTouchEnd
  handleTouchEnd(targetId: string): void {
    if (this.longPressTimer !== null) {
      clearTimeout(this.longPressTimer)
      this.longPressTimer = null
      // Short tap = click
      this.handleClick(targetId)
    }
  }

  // Call from React onTouchMove (cancel long press if moved)
  handleTouchMove(): void {
    if (this.longPressTimer !== null) {
      clearTimeout(this.longPressTimer)
      this.longPressTimer = null
    }
  }

  clearAll(): void {
    if (this.longPressTimer !== null) {
      clearTimeout(this.longPressTimer)
      this.longPressTimer = null
    }
    this.handlers.clear()
  }
}