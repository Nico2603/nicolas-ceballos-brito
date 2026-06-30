import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function useSmartNavigation() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavClick = useCallback(
    (href: string, external?: boolean) => {
      if (external || href.startsWith('http') || href.startsWith('mailto:')) {
        window.open(
          href,
          href.startsWith('mailto:') ? '_self' : '_blank',
          'noopener,noreferrer',
        )
        return
      }

      if (href.startsWith('#')) {
        if (location.pathname !== '/') {
          navigate(`/${href}`)
          return
        }
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
        return
      }

      navigate(href)
    },
    [location.pathname, navigate],
  )

  return { handleNavClick, location }
}
