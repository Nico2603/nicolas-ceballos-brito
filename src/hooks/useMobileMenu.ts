import { useCallback, useState } from 'react'

export function useMobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      const next = !prev
      document.body.classList.toggle('menu-open', next)
      return next
    })
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    document.body.classList.remove('menu-open')
  }, [])

  return { menuOpen, toggleMenu, closeMenu }
}
