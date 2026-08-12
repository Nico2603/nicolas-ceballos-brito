import { useEffect, useRef, type ReactNode } from 'react'
import { PAGE_SCROLLER_ATTR } from '../lib/page-scroller'

const DEMO_BEND = {
  zone: 240,
  angle: 80,
  perspective: 700,
  ease: 240,
  smoothing: 0.1,
  tumble: 0.5,
  tilt: 0.5,
  top: true,
  bottom: true,
}

/**
 * Live CSS 3D stand-in used when Chrome html-in-canvas is off.
 * The WebGL cube (Bend) needs drawElementImage; without it Canvas UI
 * renders children as plain HTML and the fold is invisible.
 */
export default function CssPageBend({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const faceRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const face = faceRef.current
    const scroller = scrollerRef.current
    if (!root || !face || !scroller) return

    document.documentElement.classList.add('page-bend-active')
    scroller.setAttribute(PAGE_SCROLLER_ATTR, '')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = reduced.matches

    let topTarget = 0
    let bottomTarget = 0
    let topCurrent = 0
    let bottomCurrent = 0
    let over = 0
    let phiCurrent = 0
    let tiltXTarget = 0
    let tiltYTarget = 0
    let tiltXCurrent = 0
    let tiltYCurrent = 0
    let raf = 0
    let running = false
    let lastTime = performance.now()

    const ramp = (v: number) => {
      const x = Math.min(Math.max(v / Math.max(DEMO_BEND.ease, 1), 0), 1)
      return x * x * (3 - 2 * x)
    }

    const syncScroll = () => {
      const max = scroller.scrollHeight - scroller.clientHeight
      const t = scroller.scrollTop
      topTarget = max > 1 && DEMO_BEND.top ? ramp(t) : 0
      bottomTarget = max > 1 && DEMO_BEND.bottom ? ramp(max - t) : 0
    }

    const apply = () => {
      const fold = Math.max(topCurrent, bottomCurrent)
      const rx =
        phiCurrent * (180 / Math.PI) + (bottomCurrent - topCurrent) * 10
      const ry = tiltXCurrent * 55
      const rz = tiltYCurrent * 18
      const pinch = 1 - fold * 0.045
      face.style.transform = `rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg) rotateZ(${rz.toFixed(3)}deg) scale(${pinch.toFixed(4)})`
      root.style.setProperty('--bend-top', topCurrent.toFixed(4))
      root.style.setProperty('--bend-bot', bottomCurrent.toFixed(4))
      root.style.setProperty('--bend-zone', `${DEMO_BEND.zone}px`)
    }

    const frame = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 1 / 30)
      lastTime = now
      const tau = DEMO_BEND.smoothing
      const k =
        reducedMotion || tau <= 0
          ? 1
          : 1 - Math.exp(-delta / Math.max(tau, 1e-4))
      topCurrent += (topTarget - topCurrent) * k
      bottomCurrent += (bottomTarget - bottomCurrent) * k
      if (Math.abs(topTarget - topCurrent) < 0.001) topCurrent = topTarget
      if (Math.abs(bottomTarget - bottomCurrent) < 0.001) {
        bottomCurrent = bottomTarget
      }

      over *= Math.exp(-delta / 0.22)
      if (Math.abs(over) < 0.5) over = 0
      const phiTarget =
        reducedMotion || DEMO_BEND.tumble <= 0
          ? 0
          : Math.tanh(over / 500) * 0.4 * Math.min(DEMO_BEND.tumble, 1)
      phiCurrent += (phiTarget - phiCurrent) * Math.min(delta / 0.09, 1)
      if (phiTarget === 0 && Math.abs(phiCurrent) < 1e-4) phiCurrent = 0

      if (reducedMotion || DEMO_BEND.tilt <= 0) {
        tiltXTarget = 0
        tiltYTarget = 0
      }
      const kT = Math.min(delta / 0.15, 1)
      tiltXCurrent += (tiltXTarget - tiltXCurrent) * kT
      tiltYCurrent += (tiltYTarget - tiltYCurrent) * kT
      if (Math.abs(tiltXTarget - tiltXCurrent) < 1e-4) tiltXCurrent = tiltXTarget
      if (Math.abs(tiltYTarget - tiltYCurrent) < 1e-4) tiltYCurrent = tiltYTarget

      apply()

      if (
        topCurrent === topTarget &&
        bottomCurrent === bottomTarget &&
        over === 0 &&
        phiCurrent === 0 &&
        tiltXCurrent === tiltXTarget &&
        tiltYCurrent === tiltYTarget
      ) {
        running = false
        return
      }
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running) return
      running = true
      lastTime = performance.now()
      raf = requestAnimationFrame(frame)
    }

    const onScroll = () => {
      syncScroll()
      start()
    }

    const onWheel = (event: WheelEvent) => {
      if (DEMO_BEND.tumble <= 0 || reducedMotion) return
      const max = scroller.scrollHeight - scroller.clientHeight
      if (max <= 1) return
      const st = scroller.scrollTop
      if (event.deltaY > 0 && st >= max - 1) {
        over = Math.min(over + event.deltaY, 900)
      } else if (event.deltaY < 0 && st <= 1) {
        over = Math.max(over + event.deltaY, -900)
      } else {
        return
      }
      start()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!event.isPrimary || DEMO_BEND.tilt <= 0 || reducedMotion) return
      const rect = root.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const nx = (event.clientX - rect.left) / rect.width - 0.5
      const ny = 0.5 - (event.clientY - rect.top) / rect.height
      const amp = Math.min(DEMO_BEND.tilt, 1) * 0.14
      tiltXTarget = -nx * amp
      tiltYTarget = -ny * amp
      start()
    }

    const onPointerLeave = () => {
      tiltXTarget = 0
      tiltYTarget = 0
      start()
    }

    const onMotion = () => {
      reducedMotion = reduced.matches
      start()
    }

    syncScroll()
    apply()
    start()

    scroller.addEventListener('scroll', onScroll, { passive: true })
    scroller.addEventListener('wheel', onWheel, { passive: true })
    root.addEventListener('pointermove', onPointerMove, { passive: true })
    root.addEventListener('pointerleave', onPointerLeave)
    reduced.addEventListener('change', onMotion)

    return () => {
      cancelAnimationFrame(raf)
      scroller.removeEventListener('scroll', onScroll)
      scroller.removeEventListener('wheel', onWheel)
      root.removeEventListener('pointermove', onPointerMove)
      root.removeEventListener('pointerleave', onPointerLeave)
      reduced.removeEventListener('change', onMotion)
      document.documentElement.classList.remove('page-bend-active')
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="css-page-bend h-dvh w-full"
      style={{ perspective: DEMO_BEND.perspective }}
    >
      <div ref={faceRef} className="css-page-bend-face h-full w-full">
        <div
          ref={scrollerRef}
          className="relative h-full w-full overflow-auto"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
