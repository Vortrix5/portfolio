import { useState, useCallback, useRef } from 'react'

export function useCommandHistory() {
  const [history, setHistory] = useState([])
  const indexRef = useRef(-1)

  const addToHistory = useCallback((cmd) => {
    if (!cmd.trim()) return
    setHistory(prev => {
      // Avoid consecutive duplicates
      if (prev[prev.length - 1] === cmd) return prev
      return [...prev, cmd]
    })
    indexRef.current = -1
  }, [])

  const navigateHistory = useCallback((direction, history) => {
    if (history.length === 0) return null
    if (direction === 'up') {
      const newIndex = indexRef.current < history.length - 1
        ? indexRef.current + 1
        : indexRef.current
      indexRef.current = newIndex
      return history[history.length - 1 - newIndex]
    } else {
      const newIndex = indexRef.current > 0 ? indexRef.current - 1 : -1
      indexRef.current = newIndex
      return newIndex === -1 ? '' : history[history.length - 1 - newIndex]
    }
  }, [])

  const resetIndex = useCallback(() => {
    indexRef.current = -1
  }, [])

  return { history, addToHistory, navigateHistory, resetIndex }
}
