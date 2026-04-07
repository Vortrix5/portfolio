import { useState, useCallback } from 'react'
import BootSequence from './components/BootSequence'
import Terminal from './components/Terminal'
import CustomCursor from './components/CustomCursor'

const BOOT_KEY = 'az-os-booted'

export default function App() {
  // Skip boot if already shown this session
  const [bootDone, setBootDone] = useState(
    () => sessionStorage.getItem(BOOT_KEY) === '1'
  )

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem(BOOT_KEY, '1')
    setBootDone(true)
  }, [])

  return (
    <>
      <CustomCursor />
      {!bootDone && (
        <BootSequence onComplete={handleBootComplete} />
      )}
      <div
        className="h-full"
        style={{ visibility: bootDone ? 'visible' : 'hidden' }}
        aria-hidden={!bootDone}
      >
        <Terminal />
      </div>
    </>
  )
}
