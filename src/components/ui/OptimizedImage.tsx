import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
  width?: number
  height?: number
  priority?: boolean
  srcSet?: string
  sizes?: string
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  width,
  height,
  priority = false,
  srcSet,
  sizes,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-[var(--color-bg-secondary)] ${wrapperClassName}`}>
      {!loaded && !failed && (
        <div
          className="absolute inset-0 animate-pulse bg-[var(--color-bg-secondary)]"
          aria-hidden
        />
      )}
      {failed ? (
        <div
          className="absolute inset-0 flex items-center justify-center text-xs text-[var(--color-text-secondary)] px-4 text-center"
          role="img"
          aria-label={alt}
        >
          Imagen no disponible
        </div>
      ) : (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        />
      )}
    </div>
  )
}
