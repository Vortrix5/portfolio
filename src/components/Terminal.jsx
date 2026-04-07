import { useState, useRef, useCallback, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import StatusBar from './StatusBar'
import CommandBar from './CommandBar'
import { useCommandHistory } from '../hooks/useCommandHistory'
import { useTypingSound } from '../hooks/useTypingSound'
import { useFuzzyMatch } from '../hooks/useFuzzyMatch'
import { useKonamiCode } from '../hooks/useKonamiCode'
import { COMMANDS, PANE_COMMANDS } from '../data/content'

const HomePane       = lazy(() => import('./panes/HomePane'))
const AboutPane      = lazy(() => import('./panes/AboutPane'))
const ExperiencePane = lazy(() => import('./panes/ExperiencePane'))
const ProjectsPane   = lazy(() => import('./panes/ProjectsPane'))
const SkillsPane     = lazy(() => import('./panes/SkillsPane'))
const AwardsPane     = lazy(() => import('./panes/AwardsPane'))
const ContactPane    = lazy(() => import('./panes/ContactPane'))

const PANE_MAP = {
  home:       HomePane,
  about:      AboutPane,
  experience: ExperiencePane,
  projects:   ProjectsPane,
  skills:     SkillsPane,
  awards:     AwardsPane,
  contact:    ContactPane,
}

const paneVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

function LoadingFallback() {
  return (
    <div className="p-8 font-mono text-xs text-muted animate-pulse">
      Loading...
    </div>
  )
}

function HistoryOutput({ history }) {
  return (
    <div className="p-6 md:p-8 font-mono text-xs max-w-lg">
      <div className="mb-3 font-mono text-xs">
        <span className="text-cyan">amine@portfolio</span>
        <span className="text-muted">:~$ </span>
        <span className="text-text">history</span>
      </div>
      {history.length === 0 ? (
        <div className="text-muted">No commands in history.</div>
      ) : (
        history.map((cmd, i) => (
          <div key={i} className="flex gap-4">
            <span className="text-muted w-6 text-right">{i + 1}</span>
            <span className="text-text">{cmd}</span>
          </div>
        ))
      )}
    </div>
  )
}

function KonamiOverlay({ visible, onDismiss }) {
  useEffect(() => {
    if (!visible) return
    const id = setTimeout(onDismiss, 3500)
    return () => clearTimeout(id)
  }, [visible, onDismiss])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center font-mono text-xs"
          style={{ background: 'rgba(8,8,16,0.97)' }}
          onClick={onDismiss}
        >
          <div className="space-y-1.5 max-w-md">
            {[
              '[SYSTEM] Overclock sequence initiated.',
              '[SYSTEM] Achievement unlocked: Competitive Programmer',
              '[SYSTEM] IEEEXtreme rank: 49th / 6500+ teams',
              '[SYSTEM] Returning to normal operation in 3s...',
            ].map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.18 }}
                className={i === 1 ? 'text-yellow' : i === 2 ? 'text-cyan' : 'text-green'}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Terminal() {
  const [currentPane, setCurrentPane] = useState('home')
  const [isHistoryView, setIsHistoryView] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [konamiActive, setKonamiActive] = useState(false)
  const commandBarRef = useRef(null)
  const { history, addToHistory, navigateHistory, resetIndex } = useCommandHistory()
  const { soundEnabled, playTick, toggleSound } = useTypingSound()
  const findClosest = useFuzzyMatch(COMMANDS)

  // Global key handler: any letter key focuses command input
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT') return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === '/') {
        e.preventDefault()
        commandBarRef.current?.focus()
        return
      }
      if (e.key.length === 1 && /[a-zA-Z0-9 ]/.test(e.key)) {
        commandBarRef.current?.appendChar(e.key)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const navigate = useCallback((pane) => {
    if (isTransitioning) return
    // Always run — gives visual feedback (scanline) even when already on target pane
    setIsTransitioning(true)
    setIsHistoryView(false)
    setTimeout(() => {
      setCurrentPane(pane)
      setIsTransitioning(false)
    }, 150)
  }, [isTransitioning])

  const handleCommand = useCallback((input) => {
    const cmd = input.trim().toLowerCase()
    if (!cmd) return null
    addToHistory(cmd)

    if (cmd === 'clear') {
      navigate('home')
      return null
    }

    if (cmd === 'history') {
      setIsTransitioning(true)
      setTimeout(() => {
        setIsHistoryView(true)
        setIsTransitioning(false)
      }, 150)
      return null
    }

    const targetPane = cmd === 'home' || cmd === 'help' ? 'home' : cmd
    if (PANE_COMMANDS.includes(targetPane)) {
      navigate(targetPane)
      return null
    }

    // Not found - try fuzzy match
    const closest = findClosest(cmd)
    return {
      error: closest
        ? `bash: ${cmd}: command not found\nDid you mean: ${closest}?`
        : `bash: ${cmd}: command not found`,
    }
  }, [addToHistory, navigate, findClosest])

  useKonamiCode(useCallback(() => {
    setKonamiActive(true)
  }, []))

  const CurrentPane = isHistoryView ? null : PANE_MAP[currentPane] || HomePane

  return (
    <div className="h-full flex flex-col bg-bg overflow-hidden relative">
      <StatusBar
        currentPane={isHistoryView ? '' : currentPane}
        onNavigate={navigate}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      {/* Pane area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
        {/* Scanline overlay during transition */}
        {isTransitioning && (
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none z-20"
            style={{ background: 'var(--cyan)' }}
            initial={{ top: 0, opacity: 0.7 }}
            animate={{ top: '100%', opacity: 0 }}
            transition={{ duration: 0.2, ease: 'linear' }}
          />
        )}

        <AnimatePresence mode="wait">
          {isHistoryView ? (
            <motion.div
              key="history"
              variants={paneVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <HistoryOutput history={history} />
            </motion.div>
          ) : (
            <motion.div
              key={currentPane}
              variants={paneVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <Suspense fallback={<LoadingFallback />}>
                {CurrentPane && <CurrentPane />}
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>

        <KonamiOverlay
          visible={konamiActive}
          onDismiss={() => setKonamiActive(false)}
        />
      </div>

      {/* Mobile nav buttons (< 768px) */}
      <div className="md:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-border bg-surface shrink-0">
        {['about','experience','projects','skills','awards','contact'].map(cmd => (
          <button
            key={cmd}
            onClick={() => navigate(cmd)}
            className={[
              'font-mono text-xs px-2 py-1 border whitespace-nowrap shrink-0 transition-colors',
              currentPane === cmd && !isHistoryView
                ? 'border-cyan text-cyan'
                : 'border-border text-muted hover:text-text hover:border-border-active',
            ].join(' ')}
          >
            [{cmd}]
          </button>
        ))}
      </div>

      <CommandBar
        ref={commandBarRef}
        onCommand={handleCommand}
        onKeyTick={playTick}
        historyData={history}
        navigateHistory={navigateHistory}
        resetIndex={resetIndex}
      />
    </div>
  )
}
