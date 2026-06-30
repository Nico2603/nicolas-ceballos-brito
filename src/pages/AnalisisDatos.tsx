import ExpertiseLandingLayout from '../components/ExpertiseLandingLayout'
import { FULL_NAME } from '../constants/social'
import { topicFaqDatos } from '../data/topic-faq-datos'

export default function AnalisisDatos() {
  return (
    <ExpertiseLandingLayout
      pageTitle={`Análisis de Datos — ${FULL_NAME}`}
      pageDescription="Análisis de datos con Python, Power BI, SQL y visualización. Dashboards, BI y proyectos de datos de Nicolás Ceballos Brito."
      slug="/analisis-datos"
      topicName="Análisis de datos"
      breadcrumbs={[
        { name: 'Inicio', path: '/' },
        { name: 'Análisis de datos', path: '/analisis-datos' },
      ]}
      eyebrow="Expertise · Análisis de datos"
      h1="Análisis de datos y business intelligence"
      lead="Transformo datos en decisiones con Python, Power BI, SQL y herramientas de visualización. Experiencia en dashboards interactivos, análisis exploratorio y modelos predictivos para contextos industriales y académicos."
      leftCardTitle="Herramientas"
      leftCardItems={[
        'Power BI (certificado) y Tableau',
        'Python: Pandas, NumPy, Matplotlib, Seaborn',
        'SQL: MySQL, PostgreSQL, SQLite',
        'MongoDB, Firebase y Redis',
      ]}
      rightCardTitle="Aplicaciones"
      rightCardItems={[
        'Dashboards para mantenimiento predictivo',
        'Análisis exploratorio en proyectos universitarios',
        'Reportes automatizados y KPIs',
        'Integración de datos en aplicaciones web',
      ]}
      faqTitle="Preguntas sobre análisis de datos"
      faq={topicFaqDatos}
    />
  )
}
