import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

interface ThemeToggleProps {
  scrolled?: boolean
  onHero?: boolean
  className?: string
}

export default function ThemeToggle({
  scrolled = false,
  onHero = false,
  className = '',
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const onHeroSurface = onHero && !scrolled
  const isLightHero = onHeroSurface && !isDark

  const iconColor = onHeroSurface
    ? isLightHero
      ? 'var(--color-accent-primary)'
      : 'var(--color-accent-cta)'
    : 'var(--color-accent-primary)'

  const surfaceStyle = onHeroSurface
    ? isLightHero
      ? {
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          borderColor: 'var(--color-accent-primary)',
          boxShadow: 'var(--shadow-card)',
        }
      : {
          backgroundColor: 'rgba(11, 18, 32, 0.6)',
          borderColor: 'var(--color-accent-cta)',
          boxShadow: '0 0 0 1px rgb(245 158 11 / 0.25), var(--shadow-card)',
        }
    : {
        backgroundColor: 'var(--color-bg-card)',
        borderColor: 'var(--color-accent-primary)',
        boxShadow: 'var(--shadow-card)',
      }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 hover:scale-110 shrink-0 ${className}`}
      style={surfaceStyle}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      {isDark ? (
        <Sun size={18} color={iconColor} strokeWidth={2.25} aria-hidden />
      ) : (
        <Moon size={18} color={iconColor} strokeWidth={2.25} aria-hidden />
      )}
    </button>
  )
}
