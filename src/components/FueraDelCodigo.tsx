import LaboresCarousel from './LaboresCarousel'
import LinkedInFeed from './LinkedInFeed'
import SectionWrapper from './SectionWrapper'
import SectionHeader from './ui/SectionHeader'

export default function FueraDelCodigo() {
  return (
    <SectionWrapper id="fuera" className="py-20 px-4 bg-[var(--color-bg-primary)]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          plain
          eyebrow="Fuera del código"
          title="Labores y lo que publico"
          description="La universidad, el trabajo con la gente, y las notas de LinkedIn. Prosavis no se repite aquí."
        />
        <LaboresCarousel embedded />
        <LinkedInFeed embedded />
      </div>
    </SectionWrapper>
  )
}
