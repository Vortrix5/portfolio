import { useEffect, useRef } from 'react'

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
]

export function useKonamiCode(onActivate) {
  const seq = useRef([])

  useEffect(() => {
    const handler = (e) => {
      seq.current = [...seq.current, e.key].slice(-KONAMI.length)
      if (seq.current.join(',') === KONAMI.join(',')) {
        seq.current = []
        onActivate()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onActivate])
}
