import { Route, Routes, useLocation } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import { lazy, Suspense, useEffect } from 'react'
import BottomNav from './components/BottomNav'
import DeferredFonts from './components/DeferredFonts'
import DeferredVercelMetrics from './components/DeferredVercelMetrics'
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton'
import GoogleAnalytics from './components/GoogleAnalytics'
import Navbar from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const AnalisisDatos = lazy(() => import('./pages/AnalisisDatos'))
const DesarrolloWeb = lazy(() => import('./pages/DesarrolloWeb'))
const GuiaPage = lazy(() => import('./pages/GuiaPage'))
const GuiasIndex = lazy(() => import('./pages/GuiasIndex'))
const InteligenciaArtificial = lazy(() => import('./pages/InteligenciaArtificial'))
const PoliticaPrivacidad = lazy(() => import('./pages/PoliticaPrivacidad'))
const ProjectPage = lazy(() => import('./pages/ProjectPage'))
const Repositories = lazy(() => import('./pages/Repositories'))

function scheduleIdle(callback: () => void, timeout = 3000): () => void {
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(callback, { timeout })
    return () => window.cancelIdleCallback(id)
  }

  const id = globalThis.setTimeout(callback, Math.min(timeout, 2000))
  return () => globalThis.clearTimeout(id)
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (prefersReduced || isMobile) return

    let lenis: { destroy: () => void; raf: (time: number) => void } | null = null
    let rafId = 0
    let started = false

    const startLenis = async () => {
      if (started) return
      started = true

      const { default: Lenis } = await import('lenis')
      document.documentElement.classList.add('lenis', 'lenis-smooth')

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
      })

      const raf = (time: number) => {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
    }

    const onInteraction = () => {
      void startLenis()
      window.removeEventListener('wheel', onInteraction)
      window.removeEventListener('touchstart', onInteraction)
    }

    const cancelIdle = scheduleIdle(() => {
      void startLenis()
    })

    window.addEventListener('wheel', onInteraction, { passive: true })
    window.addEventListener('touchstart', onInteraction, { passive: true })

    return () => {
      cancelIdle()
      window.removeEventListener('wheel', onInteraction)
      window.removeEventListener('touchstart', onInteraction)
      cancelAnimationFrame(rafId)
      lenis?.destroy()
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [])

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return

    const target = location.hash
    const scrollToSection = () => {
      const element = document.querySelector(target)
      if (!element) return false
      element.scrollIntoView({ behavior: 'smooth' })
      return true
    }

    if (scrollToSection()) return

    const timeout = window.setTimeout(() => {
      scrollToSection()
    }, 160)

    return () => window.clearTimeout(timeout)
  }, [location.hash, location.pathname])

  return (
    <LazyMotion features={domAnimation} strict>
      <ThemeProvider>
        <DeferredFonts />
        <Navbar />
        <main className="pb-24 md:pb-0">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/repositories" element={<Repositories />} />
              <Route path="/proyectos/:slug" element={<ProjectPage />} />
              <Route path="/desarrollo-web" element={<DesarrolloWeb />} />
              <Route path="/inteligencia-artificial" element={<InteligenciaArtificial />} />
              <Route path="/analisis-datos" element={<AnalisisDatos />} />
              <Route path="/guias" element={<GuiasIndex />} />
              <Route path="/guias/:slug" element={<GuiaPage />} />
              <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
            </Routes>
          </Suspense>
        </main>
        <BottomNav />
        <FloatingWhatsAppButton />
        <GoogleAnalytics />
        <DeferredVercelMetrics />
      </ThemeProvider>
    </LazyMotion>
  )
}
