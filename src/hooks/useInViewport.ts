import { useEffect, useRef, useState } from 'react'

interface UseInViewportOptions {
  rootMargin?: string
  threshold?: number
  once?: boolean
}

export function useInViewport({
  rootMargin = '200px 0px',
  threshold = 0,
  once = true,
}: UseInViewportOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || (once && isVisible)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [isVisible, once, rootMargin, threshold])

  return { ref, isVisible }
}
