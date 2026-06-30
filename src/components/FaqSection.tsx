import { faqItems } from '../data/faq'
import SectionHeader from './ui/SectionHeader'
import SectionWrapper from './SectionWrapper'
import Card from './ui/Card'

export default function FaqSection() {
  return (
    <SectionWrapper id="faq" className="py-20 px-4 bg-[var(--color-bg-secondary)]">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          eyebrow="FAQ"
          title="Preguntas"
          highlight="frecuentes"
          description="Respuestas directas para visitantes, reclutadores y motores de búsqueda."
        />
        <div className="space-y-4 mt-8">
          {faqItems.map((item) => (
            <Card key={item.question} hover={false}>
              <div className="p-6">
                <h3 className="font-display font-semibold text-[var(--color-text-primary)]">
                  {item.question}
                </h3>
                <p className="faq-answer mt-2 leading-relaxed text-[var(--color-text-secondary)]">
                  {item.answer}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
