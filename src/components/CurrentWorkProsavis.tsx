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
import SectionHeader from './ui/SectionHeader'

export default function CurrentWorkProsavis() {
  return (
    <SectionWrapper
      id="ahora"
      className="py-24 md:py-28 px-4 bg-[var(--color-bg-secondary)] relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: 'var(--gradient-hero-scrim)' }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-10 space-y-5">
          <ProsavisBrand iconSize={56} />
          <SectionHeader
            align="left"
            className="!mb-0"
            eyebrow="Trabajo actual"
            title="Ahora:"
            highlight={PROSAVIS_NAME}
            description={`${PROSAVIS_TAGLINE}. ${PROSAVIS_GROWTH_LINE}.`}
          />
        </div>

        <div className="mb-12 grid md:grid-cols-12 gap-4 md:gap-5">
          <a
            href={PROSAVIS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-span-7 group relative block overflow-hidden rounded-[1.25rem] ring-1 ring-[var(--color-border-light)]"
          >
            <OptimizedImage
              src={PROSAVIS_IMAGES.limpieza.src}
              alt={PROSAVIS_IMAGES.limpieza.alt}
              width={PROSAVIS_IMAGES.limpieza.width}
              height={PROSAVIS_IMAGES.limpieza.height}
              className="h-56 md:h-72 w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              wrapperClassName="h-56 md:h-72"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-black/70 via-black/35 to-transparent">
              <p className="text-white font-display text-lg md:text-xl font-semibold">
                Prosavis Limpieza
              </p>
              <p className="text-white/85 text-sm mt-1">
                Producto vivo · Pereira, Dosquebradas y Cerritos
              </p>
            </div>
          </a>

          <div className="md:col-span-5 grid grid-rows-2 gap-4 md:gap-5">
            <a
              href={PROSAVIS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-[1.25rem] ring-1 ring-[var(--color-border-light)]"
            >
              <OptimizedImage
                src={PROSAVIS_IMAGES.og.src}
                alt={PROSAVIS_IMAGES.og.alt}
                width={PROSAVIS_IMAGES.og.width}
                height={PROSAVIS_IMAGES.og.height}
                className="h-full min-h-[8.5rem] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                wrapperClassName="h-full min-h-[8.5rem]"
              />
            </a>
            <a
              href={PROSAVIS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-[1.25rem] ring-1 ring-[var(--color-border-light)]"
            >
              <OptimizedImage
                src={PROSAVIS_IMAGES.relax.src}
                alt={PROSAVIS_IMAGES.relax.alt}
                width={PROSAVIS_IMAGES.relax.width}
                height={PROSAVIS_IMAGES.relax.height}
                className="h-full min-h-[8.5rem] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                wrapperClassName="h-full min-h-[8.5rem]"
              />
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">Actual</Badge>
              <Badge variant="muted">{PROSAVIS_PERIOD}</Badge>
              <Badge>{PROSAVIS_ROLE_TITLE}</Badge>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {PROSAVIS_SUMMARY}
            </p>

            <p className="text-base md:text-lg leading-relaxed text-[var(--color-text-primary)] font-medium">
              {PROSAVIS_ROLE_SUMMARY}
            </p>

            <ul className="grid sm:grid-cols-2 gap-3">
              {PROSAVIS_HIGHLIGHTS.map((item) => (
                <li
                  key={item}
                  className="text-sm text-[var(--color-text-secondary)] leading-snug pl-4 border-l-2 border-[var(--color-accent-primary)]/40"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                variant="primary"
                href={PROSAVIS_URL}
                external
                animated
                trailingIcon={<ExternalLink size={14} />}
              >
                Ver Prosavis
              </Button>
              <Button
                variant="secondary"
                href={PROSAVIS_PLAY_STORE_URL}
                external
                trailingIcon={<ExternalLink size={14} />}
              >
                Google Play
              </Button>
              <Button
                variant="ghost"
                href="#contacto"
                trailingIcon={<ArrowRight size={14} />}
              >
                ¿Un producto así para tu empresa?
              </Button>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <img
                src={PROSAVIS_IMAGES.mascot.src}
                alt={PROSAVIS_IMAGES.mascot.alt}
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="h-12 w-12 rounded-full object-cover ring-1 ring-[var(--color-border-light)]"
              />
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-label)]">
                Suite de producto
              </p>
            </div>
            <ol className="space-y-0 border-t border-[var(--color-border-light)]">
              {PROSAVIS_SUITE.map((surface, index) => (
                <li
                  key={surface.name}
                  className="group border-b border-[var(--color-border-light)] py-4 flex gap-4 transition-colors duration-300 hover:bg-[var(--color-bg-card)]/60"
                >
                  <span className="font-display text-sm font-bold text-[var(--color-accent-primary)] w-8 shrink-0 pt-0.5">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)] mb-1">
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
