import { useEffect, useState } from 'react'
import { getPageScrollY, subscribePageScroll } from '../lib/page-scroller'

export function usePageScrolled(threshold = 60): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let unsubscribe = () => {}

    const bind = () => {
      unsubscribe()
      const update = () => setScrolled(getPageScrollY() > threshold)
      update()
      unsubscribe = subscribePageScroll(update)
    }

    bind()
    const raf = requestAnimationFrame(bind)

    return () => {
      cancelAnimationFrame(raf)
      unsubscribe()
    }
  }, [threshold])

  return scrolled
}
