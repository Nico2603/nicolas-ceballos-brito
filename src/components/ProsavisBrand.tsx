import { PROSAVIS_IMAGES, PROSAVIS_NAME } from '../data/prosavis'

type ProsavisBrandProps = {
  /** Tamaño del ícono: sm (hero móvil), md (default), lg (sección) */
  size?: 'sm' | 'md' | 'lg'
  /** Mostrar wordmark PROSAVIS */
  showWordmark?: boolean
  /**
   * Forzar chip oscuro detrás del wordmark (p. ej. sobre foto).
   * En tema dark el wordmark siempre va sobre chip claro (PRO navy ilegible en negro).
   */
  wordmarkOnDark?: boolean
  className?: string
}

const sizeMap = {
  sm: {
    icon: 'h-8 w-8 sm:h-9 sm:w-9',
    wordmark: 'h-4 sm:h-5 max-w-[7.5rem] sm:max-w-[9rem]',
    gap: 'gap-2',
    chip: 'px-2 py-1',
  },
  md: {
    icon: 'h-10 w-10 sm:h-12 sm:w-12',
    wordmark: 'h-5 sm:h-6 max-w-[9rem] sm:max-w-[11rem]',
    gap: 'gap-2.5 sm:gap-3',
    chip: 'px-2 py-1 sm:px-2.5 sm:py-1.5',
  },
  lg: {
    icon: 'h-12 w-12 sm:h-14 sm:w-14',
    wordmark: 'h-6 sm:h-7 w-auto max-w-[11rem] sm:max-w-[14rem]',
    gap: 'gap-3',
    chip: 'px-2.5 py-1.5',
  },
} as const

export default function ProsavisBrand({
  size = 'md',
  showWordmark = true,
  wordmarkOnDark = false,
  className = '',
}: ProsavisBrandProps) {
  const s = sizeMap[size]

  // Chip vía CSS (.dark) — no depende del state React del theme.
  const chipClass = wordmarkOnDark
    ? `prosavis-wordmark-chip prosavis-wordmark-chip--on-media ${s.chip}`
    : `prosavis-wordmark-chip ${s.chip}`

  return (
    <div className={`inline-flex items-center ${s.gap} min-w-0 max-w-full ${className}`.trim()}>
      <img
        src={PROSAVIS_IMAGES.logo.src}
        alt={PROSAVIS_IMAGES.logo.alt}
        width={56}
        height={56}
        loading="lazy"
        decoding="async"
        className={`${s.icon} shrink-0 object-contain`}
      />
      {showWordmark ? (
        <span className={`inline-flex shrink-0 items-center rounded-lg ${chipClass}`.trim()}>
          <img
            src={PROSAVIS_IMAGES.wordmark.src}
            alt={PROSAVIS_IMAGES.wordmark.alt || PROSAVIS_NAME}
            width={PROSAVIS_IMAGES.wordmark.width}
            height={PROSAVIS_IMAGES.wordmark.height}
            loading="lazy"
            decoding="async"
            className={`${s.wordmark} object-contain object-left`}
          />
        </span>
      ) : null}
    </div>
  )
}
