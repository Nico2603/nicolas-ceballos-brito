import { m } from 'framer-motion'

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
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const eyebrowColor =
    tone === 'hero' ? 'text-[var(--hero-eyebrow)]' : 'text-[var(--color-accent-label)]'
  const titleColor =
    tone === 'hero' ? 'text-[var(--hero-text)]' : 'text-[var(--color-text-primary)]'
  const descriptionColor =
    tone === 'hero' ? 'text-[var(--hero-text-muted)]' : 'text-[var(--color-text-secondary)]'

  return (
    <m.div
      className={`max-w-3xl mb-12 ${alignClass} ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && (
        <p className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold mb-3 ${eyebrowColor}`}>
          <span className="w-6 h-px bg-[var(--color-accent-primary)]" aria-hidden />
          {eyebrow}
          <span className="w-6 h-px bg-[var(--color-accent-primary)]" aria-hidden />
        </p>
      )}
      <HeadingTag className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${titleColor} mb-4 leading-tight`}>
        {title}
        {highlight && (
          <>
            {' '}
            <span className="text-gradient-accent">{highlight}</span>
          </>
        )}
      </HeadingTag>
      {description && (
        <p
          className={`text-lg ${descriptionColor} leading-relaxed max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </m.div>
  )
}
