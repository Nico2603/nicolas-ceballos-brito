interface SectionHeaderProps {
  eyebrow?: string
  title: string
  highlight?: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-3xl mb-12 ${alignClass} ${className}`}>
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-3 text-[var(--color-accent-label)]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
        {title}
        {highlight && (
          <>
            {' '}
            <span className="text-[var(--color-accent-primary)]">{highlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">{description}</p>
      )}
    </div>
  )
}
