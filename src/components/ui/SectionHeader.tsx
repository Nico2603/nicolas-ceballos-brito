interface SectionHeaderProps {
  eyebrow?: string
  title: string
  highlight?: string
  description?: string
  align?: 'left' | 'center'
  /** Hero bands use theme-aware ink/paper tokens — never hardcoded white. */
  tone?: 'default' | 'hero'
  /** Hub pages need a single page-level heading for SEO and prerender. */
  as?: 'h1' | 'h2'
  /** Home rhythm: left aligned, short label, no accent word. */
  plain?: boolean
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  tone = 'default',
  as: HeadingTag = 'h2',
  plain = false,
  className = '',
}: SectionHeaderProps) {
  const centered = !plain && align === 'center'
  const alignClass = centered ? 'text-center mx-auto' : 'text-left'
  const titleColor =
    tone === 'hero' ? 'text-[var(--hero-text)]' : 'text-[var(--color-text-primary)]'
  const descriptionColor =
    tone === 'hero' ? 'text-[var(--hero-text-muted)]' : 'text-[var(--color-text-secondary)]'
  const fileteClass = centered ? 'mx-auto' : ''

  return (
    <div className={`max-w-3xl mb-12 ${alignClass} ${className}`}>
      <span className={`filete ${fileteClass}`} aria-hidden />
      {eyebrow && (
        <p className={`font-mono text-sm mb-3 ${descriptionColor}`}>{eyebrow}</p>
      )}
      <HeadingTag className={`font-sans text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.03em] ${titleColor} mb-4 leading-tight`}>
        {title}
        {highlight && !plain && (
          <>
            {' '}
            <span className="text-[var(--color-accent-cta)]">{highlight}</span>
          </>
        )}
        {highlight && plain && <> {highlight}</>}
      </HeadingTag>
      {description && (
        <p
          className={`text-lg ${descriptionColor} leading-relaxed max-w-2xl ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
