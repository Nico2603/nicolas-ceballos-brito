import ExpertiseLandingLayout from '../components/ExpertiseLandingLayout'
import { FULL_NAME } from '../constants/social'
import { topicFaqWeb } from '../data/topic-faq-web'

export default function DesarrolloWeb() {
  return (
    <ExpertiseLandingLayout
      pageTitle={`Desarrollo Web — ${FULL_NAME}`}
      pageDescription="Desarrollo web full-stack con React, TypeScript, Node.js y Vite. Portafolio y proyectos de Nicolás Ceballos Brito en Pereira, Colombia."
      slug="/desarrollo-web"
      topicName="Desarrollo web"
      breadcrumbs={[
        { name: 'Inicio', path: '/' },
        { name: 'Desarrollo web', path: '/desarrollo-web' },
      ]}
      eyebrow="Expertise · Desarrollo web"
      h1="Desarrollo web con React y TypeScript"
      lead="Construyo aplicaciones web modernas con React 19, TypeScript, Tailwind CSS y Node.js. Desde landing pages hasta sistemas full-stack desplegados en Vercel, con foco en rendimiento, accesibilidad y SEO."
      leftCardTitle="Frontend"
      leftCardItems={[
        'React 19, TypeScript y Vite',
        'Tailwind CSS 4 y Framer Motion',
        'Angular, Bootstrap y diseño responsive',
        'Optimización SEO y prerender estático',
      ]}
      rightCardTitle="Backend & despliegue"
      rightCardItems={[
        'Node.js, Flask y FastAPI',
        'APIs REST y integración con bases de datos',
        'Docker, CI/CD y despliegue en Vercel/Netlify',
        'WordPress y CMS cuando el proyecto lo requiere',
      ]}
      faqTitle="Preguntas sobre desarrollo web"
      faq={topicFaqWeb}
    />
  )
}
