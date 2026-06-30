interface BadgeProps {
  children: string
  variant?: 'default' | 'accent' | 'muted'
  className?: string
}

const variants = {
  default: 'bg-[var(--color-accent-badge-bg)] text-[var(--color-accent-badge-text)]',
  accent: 'bg-[var(--color-accent-cta)] text-[var(--color-navy-deep)]',
  muted: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]',
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
