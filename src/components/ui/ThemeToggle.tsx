import { useTheme } from '../../context/ThemeContext'

interface ThemeToggleProps {
  scrolled?: boolean
  onHero?: boolean
}

export default function ThemeToggle({ scrolled = false, onHero = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const strokeColor = isDark
    ? 'var(--color-accent-cta)'
    : onHero && !scrolled
      ? 'white'
      : 'var(--color-text-primary)'

  const bgColor =
    scrolled || !onHero
      ? 'var(--color-bg-secondary)'
      : 'rgba(255, 255, 255, 0.12)'

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shrink-0"
      style={{ backgroundColor: bgColor }}
      aria-label={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      {isDark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
