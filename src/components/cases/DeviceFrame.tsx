import type { CaseViewport } from '../../data/catalog/types'
import OptimizedImage from '../ui/OptimizedImage'

interface DeviceFrameProps {
  alt: string
  caption?: string
  finding?: string
  src?: string
  emptyLabel?: string
  emptyDetail?: string
  viewport?: CaseViewport
  priority?: boolean
}

function aspectClass(viewport: CaseViewport): string {
  switch (viewport) {
    case 'desktop':
      return 'aspect-[16/10]'
    case 'mobile':
      return 'aspect-[9/19] max-h-[36rem] w-full max-w-[17rem] mx-auto'
    default: {
      const _exhaustive: never = viewport
      return _exhaustive
    }
  }
}

export default function DeviceFrame({
  alt,
  caption,
  finding,
  src,
  emptyLabel = 'En taller',
  emptyDetail = 'El después se fotografía cuando el rediseño se note.',
  viewport = 'desktop',
  priority = false,
}: DeviceFrameProps) {
  return (
    <figure className="min-w-0">
      <div className="rounded-[1.35rem] p-1.5 bg-[var(--color-bg-secondary)] ring-1 ring-[var(--color-border-light)]">
        <div
          className={`relative overflow-hidden rounded-[1.05rem] bg-[var(--color-bg-card)] ${aspectClass(viewport)}`}
        >
          {src ? (
            <OptimizedImage
              src={src}
              alt={alt}
              width={viewport === 'mobile' ? 781 : 1280}
              height={viewport === 'mobile' ? 1688 : 800}
              priority={priority}
              className="absolute inset-0 h-full w-full object-cover object-top"
              wrapperClassName="absolute inset-0"
            />
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center"
              role="img"
              aria-label={alt}
            >
              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[var(--color-accent-label)]">
                Después
              </p>
              <p className="font-display text-2xl font-semibold text-[var(--color-text-primary)]">
                {emptyLabel}
              </p>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] max-w-xs">
                {emptyDetail}
              </p>
            </div>
          )}
        </div>
      </div>
      {(finding || caption) && (
        <figcaption className="mt-3 px-1">
          {finding && (
            <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--color-accent-label)]">
              {finding}
            </p>
          )}
          {caption && (
            <p className="mt-1 text-sm text-[var(--color-text-secondary)] leading-relaxed">{caption}</p>
          )}
        </figcaption>
      )}
    </figure>
  )
}
