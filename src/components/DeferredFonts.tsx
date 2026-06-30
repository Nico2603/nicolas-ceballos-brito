import { useEffect } from 'react'

function scheduleDeferredFonts(): void {
  const load = () => {
    void import('../styles/fonts-deferred.css')
  }

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(load, { timeout: 3000 })
    return
  }

  globalThis.setTimeout(load, 1500)
}

export default function DeferredFonts() {
  useEffect(() => {
    scheduleDeferredFonts()
  }, [])

  return null
}
