import { useEffect, useRef, useSyncExternalStore, type ReactNode } from 'react'
import { Bend, supportsHtmlInCanvas } from '@/components/canvasui/Bend'
import CssPageBend from './CssPageBend'
import { PAGE_SCROLLER_ATTR } from '../lib/page-scroller'

const DEMO_BEND = {
  zone: 240,
  angle: 80,
  rounding: 150,
  perspective: 700,
  ease: 240,
  smoothing: 0.1,
  tumble: 0.5,
  tilt: 0.5,
  direction: 'in' as const,
  top: true,
  bottom: true,
}

function findOverflowScroller(root: HTMLElement): HTMLElement | null {
  for (const div of root.querySelectorAll('div')) {
    const overflowY = div.style.overflowY || div.style.overflow
    if (overflowY === 'auto' || overflowY === 'scroll') return div
  }
  return null
}

const emptySubscribe = () => () => {}

function NativePageBend({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    document.documentElement.classList.add('page-bend-active')

    const mark = () => {
      const scroller =
        root.querySelector<HTMLElement>('[data-canvasui-content]') ??
        findOverflowScroller(root)
      if (!scroller) return
      scroller.setAttribute(PAGE_SCROLLER_ATTR, '')
    }

    mark()
    const raf = requestAnimationFrame(mark)
    const observer = new MutationObserver(mark)
    observer.observe(root, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      document.documentElement.classList.remove('page-bend-active')
    }
  }, [])

  return (
    <div ref={rootRef} className="h-dvh w-full">
      <Bend className="h-full w-full" {...DEMO_BEND}>
        {children}
      </Bend>
    </div>
  )
}

export default function PageBend({ children }: { children: ReactNode }) {
  const native = useSyncExternalStore(
    emptySubscribe,
    supportsHtmlInCanvas,
    () => false,
  )

  if (native) return <NativePageBend>{children}</NativePageBend>
  return <CssPageBend>{children}</CssPageBend>
}
