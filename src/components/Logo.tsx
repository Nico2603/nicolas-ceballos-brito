interface LogoProps {
  className?: string
  variant?: 'default' | 'onDark'
}

export default function Logo({ className = '', variant = 'default' }: LogoProps) {
  const textColor = variant === 'onDark' ? 'text-white' : 'text-[var(--color-text-primary)]'
  const accentColor = variant === 'onDark' ? 'text-[var(--color-accent-cta)]' : 'text-[var(--color-accent-primary)]'

  return (
    <span
      className={`font-display font-bold text-lg tracking-tight inline-flex items-center gap-0.5 ${textColor} ${className}`}
      aria-hidden
    >
      <span className={accentColor}>N</span>
      <span>C</span>
    </span>
  )
}
