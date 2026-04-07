import { useState, useEffect } from 'react'
import { BOOT_LINES } from '../data/content'

export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [showCursor, setShowCursor] = useState(false)

  useEffect(() => {
    let totalDelay = 0

    BOOT_LINES.forEach((line, i) => {
      totalDelay += (i === 0 ? 200 : line.delay)
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line.text])
      }, totalDelay)
    })

    // Show cursor after last line
    setTimeout(() => {
      setShowCursor(true)
    }, totalDelay + 80)

    // Complete after cursor appears and a short pause
    setTimeout(() => {
      onComplete()
    }, totalDelay + 700)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 bg-bg flex items-start justify-start p-8 md:p-16">
      <div className="font-mono text-xs md:text-sm leading-relaxed">
        {visibleLines.map((line, i) => {
          const isOk = line.includes('[ OK ]')
          const isWelcome = line.startsWith('Welcome')
          return (
            <div key={i} className="whitespace-pre">
              {isOk ? (
                <>
                  <span className="text-muted">{line.replace('[ OK ]', '')}</span>
                  <span className="text-green">{'[ OK ]'}</span>
                </>
              ) : isWelcome ? (
                <span className="text-cyan font-medium">{line}</span>
              ) : line === '' ? (
                <span>&nbsp;</span>
              ) : (
                <span className="text-text">{line}</span>
              )}
            </div>
          )
        })}
        {showCursor && (
          <div className="flex items-center gap-0">
            <span className="text-cyan">amine@portfolio</span>
            <span className="text-muted">:~$ </span>
            <span className="text-text animate-blink">_</span>
          </div>
        )}
      </div>
    </div>
  )
}
