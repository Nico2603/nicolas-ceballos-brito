import { Route, Routes, useLocation } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import BottomNav from './components/BottomNav'
import DeferredFonts from './components/DeferredFonts'
import DeferredVercelMetrics from './components/DeferredVercelMetrics'
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton'
import GoogleAnalytics from './components/GoogleAnalytics'
import Navbar from './components/Navbar'
import PageBend from './components/PageBend'
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

function useDesktopPageBend(): boolean {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setEnabled(desktop.matches && !reduceMotion.matches)
    sync()
    desktop.addEventListener('change', sync)
    reduceMotion.addEventListener('change', sync)
    return () => {
      desktop.removeEventListener('change', sync)
      reduceMotion.removeEventListener('change', sync)
    }
  }, [])

  return enabled
}

function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default function App() {
  const location = useLocation()
  const pageBend = useDesktopPageBend()

  useEffect(() => {
    if (pageBend) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (prefersReduced || isMobile) return

    let lenis: { destroy: () => void; raf: (time: number) => void } | null = null
    let rafId = 0
    let started = false
    let scrollCount = 0

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

    const onWheel = () => {
      scrollCount += 1
      if (scrollCount >= 2 || window.scrollY > 300) {
        void startLenis()
        window.removeEventListener('wheel', onWheel)
        window.removeEventListener('scroll', onScroll, { capture: true })
      }
    }

    const onScroll = () => {
      if (window.scrollY > 300) {
        void startLenis()
        window.removeEventListener('wheel', onWheel)
        window.removeEventListener('scroll', onScroll, { capture: true })
      }
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true, capture: true })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll, { capture: true })
      cancelAnimationFrame(rafId)
      lenis?.destroy()
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [pageBend])

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

  const routes = (
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
  )

  return (
    <LazyMotion features={domAnimation} strict>
      <ThemeProvider>
        <DeferredFonts />
        {pageBend ? (
          <PageBend>
            <AppShell>{routes}</AppShell>
          </PageBend>
        ) : (
          <AppShell>{routes}</AppShell>
        )}
        <BottomNav />
        <FloatingWhatsAppButton />
        <GoogleAnalytics />
        <DeferredVercelMetrics />
      </ThemeProvider>
    </LazyMotion>
  )
}
