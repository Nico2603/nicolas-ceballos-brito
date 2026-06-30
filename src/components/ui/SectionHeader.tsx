import { m } from 'framer-motion'

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
    <m.div
      className={`max-w-3xl mb-12 ${alignClass} ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && (
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold mb-3 text-[var(--color-accent-label)]">
          <span className="w-6 h-px bg-[var(--color-accent-primary)]" aria-hidden />
          {eyebrow}
          <span className="w-6 h-px bg-[var(--color-accent-primary)]" aria-hidden />
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-4 leading-tight">
        {title}
        {highlight && (
          <>
            {' '}
            <span className="text-gradient-accent">{highlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p
          className={`text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </m.div>
  )
}
