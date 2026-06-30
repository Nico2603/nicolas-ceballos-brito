import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import { laboresSlides } from '../data/content'
import SectionWrapper from './SectionWrapper'

export default function LaboresCarousel() {
  const [current, setCurrent] = useState(0)

  const goTo = (index: number) => {
    setCurrent((index + laboresSlides.length) % laboresSlides.length)
  }

  useEffect(() => {
    const interval = setInterval(() => goTo(current + 1), 8000)
    return () => clearInterval(interval)
  }, [current])

  const slide = laboresSlides[current]

  return (
    <SectionWrapper id="labores" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: 'var(--color-primary)' }}>
          Labores Destacadas
        </h2>

        <div className="relative glass-card rounded-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.article
              key={slide.id}
              id={slide.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-2 gap-0"
            >
              <div className="h-64 md:h-auto md:min-h-[320px] overflow-hidden">
                <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h3 className="font-display text-xl md:text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>
                  {slide.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                  {slide.description}
                </p>
                <a
                  href={slide.detailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-start px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: 'var(--color-primary)' }}
                >
                  Ver Detalles
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.article>
          </AnimatePresence>

          <button
            onClick={() => goTo(current - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-card flex items-center justify-center transition-all hover:scale-110"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} style={{ color: 'var(--color-primary)' }} />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-card flex items-center justify-center transition-all hover:scale-110"
            aria-label="Siguiente"
          >
            <ChevronRight size={20} style={{ color: 'var(--color-primary)' }} />
          </button>

          <div className="flex justify-center gap-2 py-4">
            {laboresSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${index === current ? 'w-8' : 'opacity-50'}`}
                style={{ background: 'var(--color-secondary)' }}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
