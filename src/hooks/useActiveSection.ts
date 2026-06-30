import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const HOME_SECTIONS = ['inicio', 'portafolio', 'labores', 'contacto'] as const

export type ActiveSection = (typeof HOME_SECTIONS)[number] | 'about' | 'repositories'

function getRouteSection(pathname: string): ActiveSection | null {
  if (pathname === '/about') return 'about'
  if (pathname === '/repositories') return 'repositories'
  return null
}

export function useActiveSection() {
  const location = useLocation()
  const routeSection = getRouteSection(location.pathname)
  const [homeSection, setHomeSection] = useState<ActiveSection>('inicio')

  useEffect(() => {
    if (location.pathname !== '/') return

    const observers: IntersectionObserver[] = []

    HOME_SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHomeSection(id)
          }
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [location.pathname])

  return routeSection ?? homeSection
}
