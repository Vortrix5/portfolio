import { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const NAV_ITEMS = [
  { cmd: 'home',       label: 'home' },
  { cmd: 'about',      label: 'about' },
  { cmd: 'experience', label: 'experience' },
  { cmd: 'projects',   label: 'projects' },
  { cmd: 'skills',     label: 'skills' },
  { cmd: 'awards',     label: 'awards' },
  { cmd: 'contact',    label: 'contact' },
]

function Clock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      // UTC+1
      const utc1 = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + 3600000)
      const h = String(utc1.getHours()).padStart(2, '0')
      const m = String(utc1.getMinutes()).padStart(2, '0')
      const s = String(utc1.getSeconds()).padStart(2, '0')
      setTime(`UTC+1 · ${h}:${m}:${s}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="font-mono text-xs text-muted tabular-nums select-none">
      {time}
    </span>
  )
}

export default function StatusBar({ currentPane, onNavigate, soundEnabled, onToggleSound }) {
  return (
    <div
      className="flex items-center justify-between px-4 h-8 shrink-0 border-b border-border font-mono text-xs select-none"
      style={{ background: 'var(--surface)' }}
    >
      {/* Left: identity */}
      <span className="text-muted hidden sm:inline">
        <span className="text-cyan">amine</span>
        <span className="text-muted">@portfolio</span>
      </span>

      {/* Center: nav items */}
      <nav className="flex items-center gap-1 md:gap-3 overflow-x-auto scrollbar-hide">
        {NAV_ITEMS.map(({ cmd, label }) => {
          const isActive = currentPane === cmd
          return (
            <button
              key={cmd}
              onClick={() => onNavigate(cmd)}
              className={[
                'px-1.5 py-0.5 text-xs font-mono transition-colors duration-150 whitespace-nowrap',
                'border-b border-transparent',
                isActive
                  ? 'text-cyan border-b-cyan'
                  : 'text-muted hover:text-text',
              ].join(' ')}
              aria-label={`Navigate to ${label}`}
            >
              {label}
            </button>
          )
        })}
      </nav>

      {/* Right: clock + sound toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSound}
          aria-label={soundEnabled ? 'Disable typing sounds' : 'Enable typing sounds'}
          className="text-muted hover:text-text transition-colors"
        >
          {soundEnabled
            ? <Volume2 size={13} aria-hidden="true" />
            : <VolumeX size={13} aria-hidden="true" />
          }
        </button>
        <Clock />
      </div>
    </div>
  )
}
