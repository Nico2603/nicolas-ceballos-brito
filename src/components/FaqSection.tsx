import { homeFaqItems } from '../data/faq'
import FaqAccordion from './FaqAccordion'
import SectionHeader from './ui/SectionHeader'
import SectionWrapper from './SectionWrapper'

export default function FaqSection() {
  return (
    <SectionWrapper id="faq" className="py-20 px-4 bg-[var(--color-bg-secondary)]">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          plain
          eyebrow="FAQ"
          title="Preguntas"
          highlight="frecuentes"
          description="Respuestas directas para visitantes, reclutadores y motores de búsqueda."
        />
        <FaqAccordion items={homeFaqItems} className="mt-8" />
      </div>
    </SectionWrapper>
  )
}
