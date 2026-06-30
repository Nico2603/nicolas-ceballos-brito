import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FULL_NAME } from '../constants/social'
import { navLinks } from '../data/navigation'
import { useMobileMenu } from '../hooks/useMobileMenu'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { menuOpen, toggleMenu, closeMenu } = useMobileMenu()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string, external?: boolean) => {
    closeMenu()
    setOpenDropdown(null)

    if (external || href.startsWith('http') || href.startsWith('mailto:')) {
      window.open(href, href.startsWith('mailto:') ? '_self' : '_blank', 'noopener,noreferrer')
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
  }

  const navBg = scrolled ? 'var(--color-nav-bg)' : 'transparent'
  const textCol = scrolled ? 'var(--color-text-primary)' : 'var(--color-text-on-hero)'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500${scrolled ? ' backdrop-blur-md shadow-sm' : ''}`}
      style={{ backgroundColor: navBg }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => handleNavClick('#inicio')}
            className="font-display font-bold text-lg tracking-tight"
            style={{ color: textCol }}
            aria-label={`${FULL_NAME} — inicio`}
          >
            {FULL_NAME.split(' ')[0]}
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: textCol }}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} />}
                </button>
                {link.dropdown && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="glass-card rounded-xl py-2 min-w-[200px]">
                      {link.dropdown.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => handleNavClick(item.href, item.external)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-white/20 transition-colors"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <button
            className="lg:hidden p-2"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            style={{ color: textCol }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-card border-t overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => {
                      if (link.dropdown) {
                        setOpenDropdown(openDropdown === link.label ? null : link.label)
                      } else {
                        handleNavClick(link.href)
                      }
                    }}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-left font-medium"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>
                  {link.dropdown && openDropdown === link.label && (
                    <div className="pl-4 space-y-1">
                      {link.dropdown.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => handleNavClick(item.href, item.external)}
                          className="block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-white/20"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export function SimpleNavbar() {
  const { menuOpen, toggleMenu, closeMenu } = useMobileMenu()

  const links = [
    { label: 'Inicio', href: '/' },
    { label: 'Portafolio', href: '/#portafolio' },
    { label: 'Labores', href: '/#labores' },
    { label: 'Contacto', href: '/#contacto' },
    { label: 'Sobre mí', href: '/about' },
    { label: 'Repositorios', href: '/repositories' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-sm" style={{ backgroundColor: 'var(--color-nav-bg)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-display font-bold text-lg" style={{ color: 'var(--color-primary)' }}>
            {FULL_NAME.split(' ')[0]}
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium hover:opacity-80 transition-opacity"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button className="md:hidden p-2" onClick={toggleMenu} aria-label="Menú">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-4 py-4 space-y-2 glass-card border-t"
          >
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={closeMenu}
                className="block px-4 py-3 rounded-lg font-medium"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
