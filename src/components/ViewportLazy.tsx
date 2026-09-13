import type { ReactNode } from 'react'
import { useInViewport } from '../hooks/useInViewport'

interface ViewportLazyProps {
  children: ReactNode
  className?: string
  rootMargin?: string
  minHeight?: string
  id?: string
}

export default function ViewportLazy({
  children,
  className = '',
  rootMargin = '200px 0px',
  minHeight = '1px',
  id,
}: ViewportLazyProps) {
  const { ref, isVisible } = useInViewport({ rootMargin, once: true })

  return (
    <div id={id} ref={ref} className={className} style={{ minHeight }}>
      {isVisible ? children : null}
    </div>
  )
}
