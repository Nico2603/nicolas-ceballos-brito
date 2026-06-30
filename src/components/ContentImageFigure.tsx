import type { ContentImage } from '../types/content'
import OptimizedImage from './ui/OptimizedImage'

interface ContentImageFigureProps {
  image: ContentImage
  className?: string
}

export default function ContentImageFigure({ image, className = '' }: ContentImageFigureProps) {
  const sourceLabel = image.sourceLabel ?? 'Ver fuente'

  return (
    <figure className={`my-8 overflow-hidden rounded-2xl border border-[var(--color-border-light)] ${className}`}>
      <OptimizedImage
        src={image.src}
        alt={image.alt}
        className="h-auto w-full object-cover"
        wrapperClassName="aspect-[16/10]"
      />
      <figcaption className="border-t border-[var(--color-border-light)] bg-[var(--color-bg-card)] px-4 py-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {image.caption}{' '}
        <a
          href={image.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[var(--color-accent-primary)] hover:underline"
        >
          {sourceLabel}
        </a>
      </figcaption>
    </figure>
  )
}
