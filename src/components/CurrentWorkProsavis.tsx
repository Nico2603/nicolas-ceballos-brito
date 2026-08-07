import { ArrowRight, ExternalLink } from 'lucide-react'
import {
  PROSAVIS_APP_STORE_URL,
  PROSAVIS_GROWTH_LINE,
  PROSAVIS_HIGHLIGHTS,
  PROSAVIS_IMAGES,
  PROSAVIS_LIMPIEZA_URL,
  PROSAVIS_NAME,
  PROSAVIS_PERIOD,
  PROSAVIS_PLAY_STORE_URL,
  PROSAVIS_ROLE_SUMMARY,
  PROSAVIS_ROLE_TITLE,
  PROSAVIS_SUITE,
  PROSAVIS_SUMMARY,
  PROSAVIS_TAGLINE,
  PROSAVIS_URL,
} from '../data/prosavis'
import ProsavisBrand from './ProsavisBrand'
import SectionWrapper from './SectionWrapper'
import Badge from './ui/Badge'
import Button from './ui/Button'
import OptimizedImage from './ui/OptimizedImage'

/**
 * Grilla 12:
 * 1) Cabecera
 * 2) Dos fotos 6/6 (mismo aspect 4:3, sin overlay)
 * 3) Copy + CTAs jerárquicos + suite
 */
export default function CurrentWorkProsavis() {
  return (
    <SectionWrapper
      id="ahora"
      className="scroll-mt-24 md:scroll-mt-28 py-16 sm:py-20 md:py-28 px-4 bg-[var(--color-bg-secondary)] relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{ background: 'var(--gradient-hero-scrim)' }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        <header className="mb-10 md:mb-12 max-w-3xl">
          <ProsavisBrand size="lg" className="mb-6" />
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold mb-3 text-[var(--color-accent-label)]">
            <span className="w-6 h-px bg-[var(--color-accent-primary)]" aria-hidden />
            Trabajo actual
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-4 leading-tight text-balance">
            Ahora:{' '}
            <span className="text-gradient-accent">{PROSAVIS_NAME}</span>
          </h2>
          <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            {PROSAVIS_TAGLINE}. {PROSAVIS_GROWTH_LINE}.
          </p>
        </header>

        {/* Dos imágenes iguales — sin espacio vacío ni texto encima */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-10 md:mb-14">
          <figure className="min-w-0">
            <a
              href={PROSAVIS_LIMPIEZA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl ring-1 ring-[var(--color-border-light)]"
            >
              <OptimizedImage
                src={PROSAVIS_IMAGES.limpieza.src}
                alt={PROSAVIS_IMAGES.limpieza.alt}
                width={PROSAVIS_IMAGES.limpieza.width}
                height={PROSAVIS_IMAGES.limpieza.height}
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                wrapperClassName="aspect-[4/3]"
              />
            </a>
            <figcaption className="mt-3 px-0.5">
              <p className="font-display text-base font-semibold text-[var(--color-text-primary)]">
                Prosavis Limpieza
              </p>
              <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
                Producto vivo · Pereira, Dosquebradas y Cerritos
              </p>
            </figcaption>
          </figure>

          <figure className="min-w-0">
            <a
              href={PROSAVIS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl ring-1 ring-[var(--color-border-light)]"
            >
              <OptimizedImage
                src={PROSAVIS_IMAGES.relax.src}
                alt={PROSAVIS_IMAGES.relax.alt}
                width={PROSAVIS_IMAGES.relax.width}
                height={PROSAVIS_IMAGES.relax.height}
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                wrapperClassName="aspect-[4/3]"
              />
            </a>
            <figcaption className="mt-3 px-0.5">
              <p className="font-display text-base font-semibold text-[var(--color-text-primary)]">
                Marketplace de servicios
              </p>
              <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
                Profesionales verificados en Colombia
              </p>
            </figcaption>
          </figure>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">Actual</Badge>
              <Badge variant="muted">{PROSAVIS_PERIOD}</Badge>
              <Badge>{PROSAVIS_ROLE_TITLE}</Badge>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)] max-w-2xl">
              {PROSAVIS_SUMMARY}
            </p>

            <p className="text-base md:text-lg leading-relaxed text-[var(--color-text-primary)] font-medium max-w-2xl">
              {PROSAVIS_ROLE_SUMMARY}
            </p>

            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {PROSAVIS_HIGHLIGHTS.map((item) => (
                <li
                  key={item}
                  className="text-sm text-[var(--color-text-secondary)] leading-snug pl-4 border-l-2 border-[var(--color-accent-primary)]/40"
                >
                  {item}
                </li>
              ))}
            </ul>

            {/* CTAs centrados en la columna izquierda */}
            <div className="pt-2 flex flex-col items-center gap-4 text-center">
              <a
                href={PROSAVIS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-[var(--color-accent-cta)] px-8 text-base font-semibold leading-none text-[var(--color-navy-deep)] no-underline shadow-[var(--shadow-cta)] transition-all duration-300 hover:brightness-110 hover:shadow-[var(--shadow-glow-amber)]"
              >
                <span>Ver Prosavis</span>
                <ExternalLink size={18} aria-hidden className="shrink-0" />
              </a>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={PROSAVIS_PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[3.45rem] w-[10.35rem] items-center justify-center transition-opacity hover:opacity-90"
                >
                  <img
                    src={PROSAVIS_IMAGES.badgePlay.src}
                    alt={PROSAVIS_IMAGES.badgePlay.alt}
                    width={PROSAVIS_IMAGES.badgePlay.width}
                    height={PROSAVIS_IMAGES.badgePlay.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </a>
                <a
                  href={PROSAVIS_APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-[9rem] items-center justify-center transition-opacity hover:opacity-90"
                >
                  <img
                    src={PROSAVIS_IMAGES.badgeAppStore.src}
                    alt={PROSAVIS_IMAGES.badgeAppStore.alt}
                    width={PROSAVIS_IMAGES.badgeAppStore.width}
                    height={PROSAVIS_IMAGES.badgeAppStore.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </a>
              </div>

              <div className="flex w-full max-w-md flex-col items-stretch gap-2.5 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
                <Button
                  variant="secondary"
                  href={PROSAVIS_LIMPIEZA_URL}
                  external
                  trailingIcon={<ExternalLink size={14} />}
                  className="w-full sm:w-auto !justify-center !text-sm !rounded-xl"
                >
                  Prosavis Limpieza
                </Button>
                <Button
                  variant="ghost"
                  href="#contacto"
                  trailingIcon={<ArrowRight size={14} />}
                  className="w-full sm:w-auto !justify-center !text-sm !rounded-xl"
                >
                  ¿Un producto así para tu empresa?
                </Button>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <img
                src={PROSAVIS_IMAGES.mascot.src}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
                className="h-10 w-10 rounded-full object-cover ring-1 ring-[var(--color-border-light)]"
                aria-hidden
              />
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-label)]">
                Suite de producto
              </p>
            </div>
            <ol className="border-t border-[var(--color-border-light)]">
              {PROSAVIS_SUITE.map((surface, index) => (
                <li
                  key={surface.name}
                  className="border-b border-[var(--color-border-light)] py-4 grid grid-cols-[2rem_1fr] gap-3"
                >
                  <span className="font-display text-sm font-bold text-[var(--color-accent-primary)] pt-0.5">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold text-[var(--color-text-primary)] mb-1">
                      {surface.name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {surface.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>
    </SectionWrapper>
  )
}
