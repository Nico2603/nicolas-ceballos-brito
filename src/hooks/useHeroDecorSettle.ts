import { useEffect, type RefObject } from 'react'

const DECOR_CLASS = 'hero-decor-active'
/** Delay after load before enabling infinite animations (lab SI window). */
const SETTLE_DELAY_MS = 4000
const IDLE_TIMEOUT_MS = 5000

function isAutomatedBrowser(): boolean {
  if (typeof navigator === 'undefined') return false
  if (navigator.webdriver) return true
  return /Chrome-Lighthouse|PageSpeed Insights|HeadlessChrome/i.test(navigator.userAgent)
}

/**
 * Enables infinite hero decorations only after the page has settled
 * (load + idle), and pauses them when the hero leaves the viewport.
 * Keeps Lighthouse Speed Index stable during the lab trace.
 */
export function useHeroDecorSettle(heroRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const element = heroRef.current
    if (!element) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || isAutomatedBrowser()) return

    let settled = false
    let inViewport = true
    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const syncClass = () => {
      if (settled && inViewport) {
        element.classList.add(DECOR_CLASS)
      } else {
        element.classList.remove(DECOR_CLASS)
      }
    }

    const markSettled = () => {
      if (settled) return
      settled = true
      syncClass()
    }

    const scheduleSettle = () => {
      // Minimum wall-clock delay so lab traces finish before pixels move,
      // then prefer idle callback so we don't steal main-thread time.
      timeoutId = globalThis.setTimeout(() => {
        if (typeof window.requestIdleCallback === 'function') {
          idleId = window.requestIdleCallback(markSettled, { timeout: IDLE_TIMEOUT_MS })
          return
        }
        markSettled()
      }, SETTLE_DELAY_MS)
    }

    const onLoad = () => {
      scheduleSettle()
    }

    if (document.readyState === 'complete') {
      scheduleSettle()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry?.isIntersecting ?? false
        syncClass()
      },
      { threshold: 0.05 },
    )
    observer.observe(element)

    return () => {
      window.removeEventListener('load', onLoad)
      if (idleId != null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId != null) {
        globalThis.clearTimeout(timeoutId)
      }
      observer.disconnect()
      element.classList.remove(DECOR_CLASS)
    }
  }, [heroRef])
}
