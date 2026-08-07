import { PROSAVIS_IMAGES, PROSAVIS_NAME } from '../data/prosavis'

type ProsavisBrandProps = {
  /** Tamaño del ícono SVG en px */
  iconSize?: number
  /** Mostrar wordmark PROSAVIS */
  showWordmark?: boolean
  /** Chip detrás del wordmark para contraste en fondos oscuros */
  wordmarkOnDark?: boolean
  className?: string
}

export default function ProsavisBrand({
  iconSize = 56,
  showWordmark = true,
  wordmarkOnDark = false,
  className = '',
}: ProsavisBrandProps) {
  return (
    <div className={`inline-flex items-center gap-3 min-w-0 ${className}`.trim()}>
      <img
        src={PROSAVIS_IMAGES.logo.src}
        alt={PROSAVIS_IMAGES.logo.alt}
        width={iconSize}
        height={iconSize}
        loading="lazy"
        decoding="async"
        className="shrink-0 object-contain"
        style={{ width: iconSize, height: iconSize }}
      />
      {showWordmark ? (
        <span
          className={
            wordmarkOnDark
              ? 'inline-flex items-center rounded-lg bg-black/55 px-2.5 py-1.5 backdrop-blur-sm ring-1 ring-white/15'
              : 'inline-flex items-center'
          }
        >
          <img
            src={PROSAVIS_IMAGES.wordmark.src}
            alt={PROSAVIS_IMAGES.wordmark.alt || PROSAVIS_NAME}
            width={PROSAVIS_IMAGES.wordmark.width}
            height={PROSAVIS_IMAGES.wordmark.height}
            loading="lazy"
            decoding="async"
            className="h-5 md:h-6 w-auto max-w-[9.5rem] md:max-w-[11rem] object-contain object-left"
          />
        </span>
      ) : null}
    </div>
  )
}
