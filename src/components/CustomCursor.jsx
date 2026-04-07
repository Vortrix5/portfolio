import { useState, useEffect } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isPointer, setIsPointer] = useState(false)
  const [isText, setIsText] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      const el = e.target
      const tag = el.tagName?.toLowerCase()
      const isClickable =
        tag === 'a' || tag === 'button' ||
        el.getAttribute('role') === 'button' ||
        el.getAttribute('tabindex') === '0' ||
        window.getComputedStyle(el).cursor === 'pointer'
      const isInputText = tag === 'input' || tag === 'textarea'
      setIsPointer(isClickable && !isInputText)
      setIsText(isInputText)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const char = isText ? '|' : isPointer ? '>' : '_'

  return (
    <div
      aria-hidden="true"
      className="fixed z-[99999] pointer-events-none select-none font-mono text-sm font-medium leading-none animate-blink"
      style={{
        left: pos.x + 4,
        top: pos.y - 8,
        color: isPointer ? 'var(--cyan)' : 'var(--text)',
        transform: 'translateZ(0)',
      }}
    >
      {char}
    </div>
  )
}
