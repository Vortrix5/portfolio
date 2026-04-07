import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useMemo } from 'react'
import { COMMANDS } from '../data/content'

const CommandBar = forwardRef(function CommandBar(
  { onCommand, onKeyTick, historyData, navigateHistory, resetIndex },
  ref
) {
  const [value, setValue] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  // Ghost autocomplete: first command that starts with current value
  const suggestion = useMemo(() => {
    if (!value.trim()) return ''
    const lower = value.toLowerCase()
    const match = COMMANDS.find(
      cmd => cmd.startsWith(lower) && cmd !== lower
    )
    return match ? match.slice(lower.length) : ''
  }, [value])

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    appendChar: (char) => {
      setValue(v => v + char)
      inputRef.current?.focus()
    },
    clear: () => setValue(''),
  }))

  // Click anywhere to focus
  useEffect(() => {
    const handler = (e) => {
      if (
        e.target.tagName !== 'INPUT' &&
        e.target.tagName !== 'TEXTAREA' &&
        e.target.tagName !== 'A' &&
        e.target.tagName !== 'BUTTON'
      ) {
        inputRef.current?.focus()
      }
    }
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [])

  // Auto-focus on mount
  useEffect(() => {
    const id = setTimeout(() => inputRef.current?.focus(), 120)
    return () => clearTimeout(id)
  }, [])

  const acceptSuggestion = () => {
    if (suggestion) setValue(v => v + suggestion)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      acceptSuggestion()
      return
    }

    // Right arrow at end of input accepts suggestion
    if (e.key === 'ArrowRight' && suggestion) {
      const input = inputRef.current
      if (input && input.selectionStart === value.length) {
        e.preventDefault()
        acceptSuggestion()
        return
      }
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      const cmd = value.trim()
      if (cmd) {
        setErrorMsg(null)
        const result = onCommand(cmd)
        if (result?.error) {
          setErrorMsg(result.error)
        } else {
          setErrorMsg(null)
        }
        setValue('')
        resetIndex()
      }
      return
    }

    if (e.key === 'Escape') {
      setValue('')
      setErrorMsg(null)
      resetIndex()
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = navigateHistory('up', historyData)
      if (prev !== null) setValue(prev)
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = navigateHistory('down', historyData)
      if (next !== null) setValue(next)
      return
    }

    if (e.key.length === 1) {
      onKeyTick()
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value)
    if (errorMsg) setErrorMsg(null)
  }

  return (
    <div className="shrink-0 border-t border-border bg-surface">
      {/* Error output */}
      {errorMsg && (
        <div className="px-4 pt-2 pb-0 font-mono text-xs whitespace-pre-wrap">
          {errorMsg.split('\n').map((ln, i) => (
            <div
              key={i}
              className={ln.includes('Did you mean') ? 'text-muted' : 'text-red'}
            >
              {ln}
            </div>
          ))}
        </div>
      )}

      {/* Prompt row */}
      <div
        className="flex items-center px-4 h-9"
        onClick={() => inputRef.current?.focus()}
      >
        <span className="font-mono text-xs text-cyan shrink-0 select-none">amine@portfolio</span>
        <span className="font-mono text-xs text-muted shrink-0 select-none">:~$</span>
        {/* Explicit gap between $ and typed text */}
        <span className="font-mono text-xs select-none shrink-0">&nbsp;</span>

        <div className="relative flex-1 flex items-center min-w-0">
          {/* Typed text */}
          <span
            className="font-mono text-xs text-text select-none pointer-events-none whitespace-pre"
            aria-hidden="true"
          >
            {value}
          </span>
          {/* Ghost autocomplete suggestion — shown in muted right after typed text */}
          {suggestion && (
            <span
              className="font-mono text-xs text-muted select-none pointer-events-none whitespace-pre opacity-50"
              aria-hidden="true"
            >
              {suggestion}
            </span>
          )}
          {/* Blinking cursor — only animates when focused */}
          <span
            className={[
              'font-mono text-xs text-text select-none pointer-events-none',
              isFocused ? 'animate-blink' : 'opacity-25',
            ].join(' ')}
            aria-hidden="true"
          >
            _
          </span>

          {/* Invisible real input — captures all keystrokes */}
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            aria-label="Terminal command input"
            className="absolute inset-0 w-full opacity-0 font-mono text-xs bg-transparent outline-none border-none"
          />
        </div>

        <span className="font-mono text-xs text-muted pl-6 hidden md:block shrink-0 select-none opacity-30">
          Tab to autocomplete
        </span>
      </div>
    </div>
  )
})

export default CommandBar
