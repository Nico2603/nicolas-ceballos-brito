import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import { laboresSlides } from '../data/content'
import SectionWrapper from './SectionWrapper'
import Button from './ui/Button'
import Card from './ui/Card'
import OptimizedImage from './ui/OptimizedImage'
import SectionHeader from './ui/SectionHeader'

const SLIDE_DURATION = 8000

export default function LaboresCarousel() {
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)

  const goTo = (index: number) => {
    setCurrent((index + laboresSlides.length) % laboresSlides.length)
    setProgress(0)
  }

  useEffect(() => {
    const preloadIndices = [
      current,
      (current + 1) % laboresSlides.length,
      (current - 1 + laboresSlides.length) % laboresSlides.length,
    ]

    preloadIndices.forEach((index) => {
      const img = new Image()
      img.src = laboresSlides[index].image
    })
  }, [current])

  useEffect(() => {
    const start = Date.now()

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - start
      setProgress(Math.min(elapsed / SLIDE_DURATION, 1))
    }, 50)

    const slideInterval = setTimeout(() => {
      setProgress(0)
      setCurrent((prev) => (prev + 1) % laboresSlides.length)
    }, SLIDE_DURATION)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(slideInterval)
    }
  }, [current])

  const slide = laboresSlides[current]

  return (
    <SectionWrapper id="labores" className="py-20 px-4 bg-[var(--color-bg-primary)] section-mesh-bg relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Experiencia"
          title="Labores"
          highlight="destacadas"
          description="Liderazgo, competencias y compromiso social fuera del código."
        />

        <Card hover={false} className="relative overflow-visible">
          <AnimatePresence mode="wait">
            <motion.article
              key={slide.id}
              id={slide.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="grid md:grid-cols-2 gap-0"
            >
              <div className="h-64 md:h-auto md:min-h-[320px] overflow-hidden rounded-t-[15px] md:rounded-tr-none md:rounded-l-[15px]">
                <OptimizedImage
                  src={slide.image}
                  alt={slide.alt}
                  width={640}
                  height={400}
                  priority
                  wrapperClassName="w-full h-full min-h-[256px] md:min-h-[320px]"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h3 className="font-display text-xl md:text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
                  {slide.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6 text-[var(--color-text-secondary)]">
                  {slide.description}
                </p>
                <Button
                  variant="primary"
                  href={slide.detailUrl}
                  external
                  className="self-start !text-sm"
                  trailingIcon={<ExternalLink size={14} />}
                >
                  Ver detalles
                </Button>
              </div>
            </motion.article>
          </AnimatePresence>

          <button
            onClick={() => goTo(current - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border-light)] shadow-[var(--shadow-card)] flex items-center justify-center transition-all hover:scale-110"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} className="text-[var(--color-accent-primary)]" />
          </button>
          <button
            onClick={() => goTo(current + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border-light)] shadow-[var(--shadow-card)] flex items-center justify-center transition-all hover:scale-110"
            aria-label="Siguiente"
          >
            <ChevronRight size={20} className="text-[var(--color-accent-primary)]" />
          </button>

          <div className="px-6 pb-4 pt-2">
            <div className="h-1 rounded-full bg-[var(--color-bg-secondary)] overflow-hidden">
              <motion.div
                className="h-full bg-[var(--color-accent-primary)] rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="flex justify-center gap-2 mt-3">
              {laboresSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === current ? 'w-6 bg-[var(--color-accent-primary)]' : 'w-1.5 bg-[var(--color-border-light)]'
                  }`}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </SectionWrapper>
  )
}
