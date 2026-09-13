import { m, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LANDING_THUMBS, MARCELA_HOME_PREVIEWS } from '../data/cases/marcela'
import DeviceFrame from './cases/DeviceFrame'
import SectionWrapper from './SectionWrapper'
import Button from './ui/Button'
import OptimizedImage from './ui/OptimizedImage'
import SectionHeader from './ui/SectionHeader'

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' as const },
}

const featuredBefore = MARCELA_HOME_PREVIEWS[0]
const secondaryBefore = MARCELA_HOME_PREVIEWS.slice(1)

export default function LandingsCraft() {
  const reduceMotion = useReducedMotion()
  const motion = reduceMotion
    ? { initial: false, whileInView: undefined, transition: { duration: 0 } }
    : { ...reveal, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } }

  return (
    <SectionWrapper className="py-20 px-4 bg-[var(--color-bg-secondary)] relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          align="left"
          eyebrow="Oficio visible"
          title="Landings"
          highlight="desde cero"
          description="Sitios que nacen en código, no en un constructor. Este portafolio, FastQA y Rayito ya están en el aire. Marcela Brito Avellaneda es el caso en taller: el antes es el sitio vivo; el después se llena cuando el cambio se vea."
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <m.div className="lg:col-span-5" {...motion}>
            <p className="text-sm uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-label)] mb-3">
              Caso en curso
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-semibold text-[var(--color-text-primary)] text-balance mb-4">
              Marcela Brito Avellaneda
            </h3>
            <p className="leading-relaxed text-[var(--color-text-secondary)] mb-6">
              La marca es de ella. Yo reconstruyo la web. El sitio actual mezcla clínica y
              espiritualidad, publica un Inicio Copy y deja el recurso gratuito sin enlaces.
              Aquí está fotografiado hoy — no un mock del rediseño.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { to: '/webs/nicolas-ceballos-brito', label: 'Este sitio' },
                { to: '/webs/fastqa-homepage', label: 'FastQA' },
                { to: '/productos-clinicos/rayito-de-sol', label: 'Rayito' },
              ].map((chip) => (
                <Link
                  key={chip.to}
                  to={chip.to}
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] ring-1 ring-[var(--color-border-light)] hover:text-[var(--color-accent-primary)] hover:ring-[var(--color-accent-primary)]/40 transition-colors"
                >
                  {chip.label}
                </Link>
              ))}
            </div>
            <Button to="/webs/marcela-brito-avellaneda" trailingIcon={<ArrowRight size={16} />}>
              Ver el caso
            </Button>
          </m.div>

          <m.div className="lg:col-span-7" {...motion} transition={{ ...motion.transition, delay: reduceMotion ? 0 : 0.08 }}>
            {featuredBefore && (
              <DeviceFrame
                src={featuredBefore.src}
                alt={featuredBefore.alt}
                caption={featuredBefore.caption}
                finding={`Antes · ${featuredBefore.finding}`}
                viewport="desktop"
                priority
              />
            )}
          </m.div>
        </div>

        <div className="mt-12 grid md:grid-cols-12 gap-4 md:gap-5">
          <a
            href={LANDING_THUMBS.nicolas.href}
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-span-5 group block rounded-[1.35rem] p-1.5 bg-[var(--color-bg-card)] ring-1 ring-[var(--color-border-light)]"
          >
            <OptimizedImage
              src={LANDING_THUMBS.nicolas.src}
              alt={LANDING_THUMBS.nicolas.alt}
              width={1280}
              height={800}
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
              wrapperClassName="aspect-[16/10] rounded-[1.05rem]"
            />
            <p className="px-3 py-3 text-sm font-medium text-[var(--color-text-primary)]">
              {LANDING_THUMBS.nicolas.label}
              <span className="block text-xs font-normal text-[var(--color-text-secondary)] mt-0.5">
                {LANDING_THUMBS.nicolas.stack}
              </span>
            </p>
          </a>

          <a
            href={LANDING_THUMBS.rayito.href}
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-span-4 group block rounded-[1.35rem] p-1.5 bg-[var(--color-bg-card)] ring-1 ring-[var(--color-border-light)]"
          >
            <OptimizedImage
              src={LANDING_THUMBS.rayito.src}
              alt={LANDING_THUMBS.rayito.alt}
              width={1280}
              height={800}
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
              wrapperClassName="aspect-[16/10] rounded-[1.05rem]"
            />
            <p className="px-3 py-3 text-sm font-medium text-[var(--color-text-primary)]">
              {LANDING_THUMBS.rayito.label}
              <span className="block text-xs font-normal text-[var(--color-text-secondary)] mt-0.5">
                {LANDING_THUMBS.rayito.stack}
              </span>
            </p>
          </a>

          <Link
            to="/webs/fastqa-homepage"
            className="md:col-span-3 flex flex-col justify-end rounded-[1.35rem] p-6 min-h-[14rem] bg-[var(--color-bg-card)] ring-1 ring-[var(--color-border-light)]"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[var(--color-accent-label)] mb-3">
              Sin mock
            </p>
            <p className="font-display text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
              FastQA
            </p>
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              HTML, CSS y JS. La homepage vive en GitHub; no invento una captura de producción.
            </p>
          </Link>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-label)] mb-4">
              Antes · sitio vivo
            </p>
            <div className="grid gap-5">
              {secondaryBefore.map((shot) => (
                <DeviceFrame
                  key={shot.id}
                  src={shot.src}
                  alt={shot.alt}
                  caption={shot.caption}
                  finding={shot.finding}
                  viewport="desktop"
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-label)] mb-4">
              Después · todavía no
            </p>
            <DeviceFrame
              alt="Espacio reservado para el rediseño de Marcela Brito Avellaneda"
              emptyLabel="En taller"
              emptyDetail="Cuando el rediseño se note, aquí va la captura. No hay un después inventado."
              viewport="desktop"
            />
            <p className="mt-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
              El hueco es deliberado. La diferencia tiene que ser fotográfica, no un recorte
              retocado del constructor.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
