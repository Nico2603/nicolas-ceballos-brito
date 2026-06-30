import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import Logo from './Logo'
import Button from './ui/Button'
import ThemeToggle from './ui/ThemeToggle'
import { navLinks } from '../data/navigation'
import { useMobileMenu } from '../hooks/useMobileMenu'
import { useSmartNavigation } from '../hooks/useSmartNavigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { theme } = useTheme()
  const { menuOpen, toggleMenu, closeMenu } = useMobileMenu()
  const { handleNavClick, location } = useSmartNavigation()
  const isHome = location.pathname === '/'
  const onHero = isHome && !scrolled
  const isDarkHero = theme === 'dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onNavClick = (href: string, external?: boolean) => {
    closeMenu()
    handleNavClick(href, external)
  }

  const textCol = onHero ? 'var(--hero-text)' : 'var(--color-text-primary)'
  const logoVariant = onHero && isDarkHero ? 'onDark' : 'default'
  const heroCtaClasses =
    '!px-4 !py-1.5 !text-xs !font-bold !bg-[var(--color-amber-bright)] !text-[#0A0F1A] !shadow-[var(--shadow-cta)] hover:!brightness-110'

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none pt-4 md:pt-6 px-4">
        <div
          className={`pointer-events-auto mx-auto max-w-fit flex items-center gap-2 md:gap-4 rounded-full border backdrop-blur-xl px-3 md:px-5 py-2.5 transition-all duration-500 ${
            scrolled || !isHome
              ? 'bg-[var(--color-nav-bg)] border-[var(--color-border-light)] shadow-[var(--shadow-nav)]'
              : 'bg-[var(--hero-nav-surface)] border-[var(--hero-nav-border)] shadow-[var(--shadow-nav)]'
          }`}
        >
          <button
            onClick={() => onNavClick('#inicio')}
            className="flex items-center shrink-0"
            aria-label="Nicolás Ceballos — inicio"
          >
            <Logo variant={logoVariant} />
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                <button
                  onClick={() => onNavClick(link.href)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors hover:text-[var(--color-cyan-bright)]"
                  style={{ color: textCol }}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} />}
                </button>
                {link.dropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="rounded-xl border border-[var(--color-border-light)] bg-[var(--color-bg-card)] shadow-[var(--shadow-card)] py-2 min-w-[200px]">
                      {link.dropdown.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => onNavClick(item.href, item.external)}
                          className="block w-full text-left px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
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

          <div className="flex items-center gap-2 ml-auto md:ml-0">
            <div className="hidden md:block">
              <Button
                variant="primary"
                className={onHero ? heroCtaClasses : '!px-4 !py-1.5 !text-xs'}
                onClick={() => onNavClick('#contacto')}
              >
                Contacto
              </Button>
            </div>
            <ThemeToggle scrolled={scrolled || !isHome} onHero={onHero} />

            <button
              className="md:hidden w-9 h-9 flex items-center justify-center"
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <div className={`hamburger ${menuOpen ? 'hamburger-open' : ''}`}>
                <span className="hamburger-line" style={{ backgroundColor: textCol }} />
                <span className="hamburger-line" style={{ backgroundColor: textCol }} />
                <span className="hamburger-line" style={{ backgroundColor: textCol }} />
              </div>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu-overlay fixed inset-0 z-40 md:hidden backdrop-blur-3xl bg-[var(--color-bg-primary)]/95 ${menuOpen ? 'mobile-menu-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col items-center justify-center min-h-screen gap-2 px-6">
          <div className="absolute top-8 right-6">
            <ThemeToggle scrolled={scrolled || !isHome} onHero={onHero} />
          </div>
          {navLinks.map((link, index) => (
            <button
              key={link.label}
              onClick={() => onNavClick(link.href)}
              className="mobile-nav-item font-display text-2xl font-semibold text-[var(--color-text-primary)] py-3"
              style={{ transitionDelay: menuOpen ? `${index * 60}ms` : '0ms' }}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}
