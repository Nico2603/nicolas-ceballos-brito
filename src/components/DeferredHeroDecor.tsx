import { lazy, Suspense, useEffect, useState } from 'react'

const HeroAurora = lazy(() => import('./HeroAurora'))
const HeroGrid = lazy(() => import('./HeroGrid'))

export default function DeferredHeroDecor() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const run = () => setShow(true)

    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(run, { timeout: 2000 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timeoutId = globalThis.setTimeout(run, 1500)
    return () => globalThis.clearTimeout(timeoutId)
  }, [])

  if (!show) return null

  return (
    <Suspense fallback={null}>
      <div className="hero-decor-layer" aria-hidden>
        <HeroAurora />
        <HeroGrid />
      </div>
    </Suspense>
  )
}
