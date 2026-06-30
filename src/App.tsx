import { Route, Routes, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Lenis from 'lenis'
import { useEffect } from 'react'
import BottomNav from './components/BottomNav'
import FloatingContactButton from './components/FloatingContactButton'
import Navbar from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'
import About from './pages/About'
import AnalisisDatos from './pages/AnalisisDatos'
import DesarrolloWeb from './pages/DesarrolloWeb'
import GuiaPage from './pages/GuiaPage'
import Home from './pages/Home'
import InteligenciaArtificial from './pages/InteligenciaArtificial'
import ProjectPage from './pages/ProjectPage'
import Repositories from './pages/Repositories'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
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
    <ThemeProvider>
      <Navbar />
      <main className="pb-24 md:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/repositories" element={<Repositories />} />
          <Route path="/proyectos/:slug" element={<ProjectPage />} />
          <Route path="/desarrollo-web" element={<DesarrolloWeb />} />
          <Route path="/inteligencia-artificial" element={<InteligenciaArtificial />} />
          <Route path="/analisis-datos" element={<AnalisisDatos />} />
          <Route path="/guias/:slug" element={<GuiaPage />} />
        </Routes>
      </main>
      <BottomNav />
      <FloatingContactButton />
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  )
}
