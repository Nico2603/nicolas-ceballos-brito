import type { ReactNode } from 'react'
import { useInViewport } from '../hooks/useInViewport'

interface ViewportLazyProps {
  children: ReactNode
  className?: string
  rootMargin?: string
  minHeight?: string
}

export default function ViewportLazy({
  children,
  className = '',
  rootMargin = '200px 0px',
  minHeight = '1px',
}: ViewportLazyProps) {
  const { ref, isVisible } = useInViewport({ rootMargin, once: true })

  return (
    <div ref={ref} className={className} style={{ minHeight }}>
      {isVisible ? children : null}
    </div>
  )
}
