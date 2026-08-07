import { ArrowRight, ExternalLink } from 'lucide-react'
import {
  PROSAVIS_GROWTH_LINE,
  PROSAVIS_HIGHLIGHTS,
  PROSAVIS_IMAGES,
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
 * Grilla 12 columnas:
 * 1) Cabecera de marca
 * 2) Media 7 + panel 5 (sin banner OG recortado)
 * 3) Copy/CTAs 7 + suite 5
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
        {/* ── 1. Cabecera ── */}
        <header className="mb-10 md:mb-14 max-w-3xl">
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

        {/* ── 2. Media grid (12) ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 mb-12 md:mb-16">
          <a
            href={PROSAVIS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-span-7 group relative block overflow-hidden rounded-2xl ring-1 ring-[var(--color-border-light)]"
          >
            <OptimizedImage
              src={PROSAVIS_IMAGES.limpieza.src}
              alt={PROSAVIS_IMAGES.limpieza.alt}
              width={PROSAVIS_IMAGES.limpieza.width}
              height={PROSAVIS_IMAGES.limpieza.height}
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
              wrapperClassName="aspect-[16/10] md:aspect-[16/11] md:min-h-[22rem]"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-black/75 via-black/35 to-transparent">
              <p className="text-white font-display text-lg md:text-2xl font-semibold">
                Prosavis Limpieza
              </p>
              <p className="text-white/85 text-sm mt-1">Producto vivo · Eje Cafetero</p>
            </div>
          </a>

          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 md:gap-5 min-w-0">
            {/* Tarjeta de mensaje completa — reemplaza el OG recortado */}
            <a
              href={PROSAVIS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[11rem] md:min-h-0 md:flex-1 flex-col justify-between rounded-2xl p-5 md:p-6 text-left transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: '#1A6FD4' }}
            >
              <div>
                <p className="font-display text-xl md:text-2xl font-semibold text-white text-balance leading-snug">
                  Servicios verificados en Colombia
                </p>
                <p className="mt-2 text-sm text-white/90 leading-relaxed">
                  Plomería · Limpieza · Electricidad y más
                </p>
              </div>
              <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0B1220]">
                prosavis.com
                <ExternalLink size={14} aria-hidden />
              </span>
            </a>

            <a
              href={PROSAVIS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl ring-1 ring-[var(--color-border-light)] md:flex-1"
            >
              <OptimizedImage
                src={PROSAVIS_IMAGES.relax.src}
                alt={PROSAVIS_IMAGES.relax.alt}
                width={PROSAVIS_IMAGES.relax.width}
                height={PROSAVIS_IMAGES.relax.height}
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                wrapperClassName="aspect-[16/10] sm:aspect-[4/3] md:aspect-auto md:h-full md:min-h-[10.5rem]"
              />
            </a>
          </div>
        </div>

        {/* ── 3. Copy + suite (12) ── */}
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

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
              <Button
                variant="primary"
                href={PROSAVIS_URL}
                external
                animated
                trailingIcon={<ExternalLink size={14} />}
                className="w-full sm:w-auto justify-center"
              >
                Ver Prosavis
              </Button>
              <Button
                variant="secondary"
                href={PROSAVIS_PLAY_STORE_URL}
                external
                trailingIcon={<ExternalLink size={14} />}
                className="w-full sm:w-auto justify-center"
              >
                Google Play
              </Button>
              <Button
                variant="ghost"
                href="#contacto"
                trailingIcon={<ArrowRight size={14} />}
                className="w-full sm:w-auto justify-center"
              >
                ¿Un producto así para tu empresa?
              </Button>
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
