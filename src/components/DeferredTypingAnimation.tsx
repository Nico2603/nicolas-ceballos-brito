import { lazy, Suspense, useEffect, useState } from 'react'
import { typingLines } from '../data/content'

const TypingAnimation = lazy(() => import('./TypingAnimation'))

interface DeferredTypingAnimationProps {
  className?: string
}

export default function DeferredTypingAnimation({ className = '' }: DeferredTypingAnimationProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 2000 })
      return () => window.cancelIdleCallback(id)
    }

    const timeout = window.setTimeout(() => setReady(true), 300)
    return () => window.clearTimeout(timeout)
  }, [])

  if (!ready) {
    return (
      <p className={`text-lg md:text-xl font-medium h-8 ${className}`} aria-hidden="true">
        {typingLines[0]}
      </p>
    )
  }

  return (
    <Suspense
      fallback={
        <p className={`text-lg md:text-xl font-medium h-8 ${className}`} aria-hidden="true">
          {typingLines[0]}
        </p>
      }
    >
      <TypingAnimation className={className} />
    </Suspense>
  )
}
