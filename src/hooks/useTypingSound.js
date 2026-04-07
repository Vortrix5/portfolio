import { useState, useRef, useCallback } from 'react'

export function useTypingSound() {
  const [soundEnabled, setSoundEnabled] = useState(false)
  const ctxRef = useRef(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    return ctxRef.current
  }, [])

  const playTick = useCallback(() => {
    if (!soundEnabled) return
    try {
      const ctx = getCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'square'
      osc.frequency.value = 440 + Math.random() * 120
      gain.gain.setValueAtTime(0.015, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.012)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.015)
    } catch (_) {
      // audio not available
    }
  }, [soundEnabled, getCtx])

  const toggleSound = useCallback(() => {
    setSoundEnabled(v => !v)
  }, [])

  return { soundEnabled, playTick, toggleSound }
}
