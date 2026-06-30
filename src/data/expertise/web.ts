import { FULL_NAME } from '../../constants/social'
import { featuredProjects, laboresSlides } from '../content'
import {
  linkedInAbout,
  linkedInCertifications,
  linkedInEducation,
  linkedInExperience,
} from '../linkedin-profile'
import type { ExpertiseContent } from './types'

const magiaCafetera = featuredProjects.find((p) => p.id === 'portafolio-magia')!
const consejoAcademico = laboresSlides.find((s) => s.id === 'proyecto2')!

export const desarrolloWebExpertise: ExpertiseContent = {
  pageTitle: `Desarrollo Web — ${FULL_NAME}`,
  pageDescription:
    'Desarrollo web full-stack con React, TypeScript, Node.js y Vite. Portafolio y proyectos de Nicolás Ceballos Brito en Pereira, Colombia.',
  slug: '/desarrollo-web',
  topicName: 'Desarrollo web',
  breadcrumbs: [
    { name: 'Inicio', path: '/' },
    { name: 'Desarrollo web', path: '/desarrollo-web' },
  ],
  eyebrow: 'Expertise · Desarrollo web',
  h1: 'Desarrollo web con React y TypeScript',
  lead:
    'Construyo aplicaciones web modernas con React 19, TypeScript, Tailwind CSS y Node.js, desde landing pages hasta sistemas full-stack desplegados en Vercel. Mi formación como Ingeniero en Sistemas y Telecomunicaciones en la Universidad Católica de Pereira se combina con roles actuales en Prosavis —donde dirijo el desarrollo de una plataforma móvil para servicios en Colombia— y en Neacsu Horizont Ventures, donde cubro el ciclo completo del producto: requisitos, arquitectura, APIs backend, interfaces responsivas y despliegue con CI/CD. En paralelo desarrollo proyectos como magiacafetera-ui, interfaz Angular para viajes personalizados en el Eje Cafetero, y este mismo portafolio en nicolasceballosbrito.com como referencia de SEO, accesibilidad y rendimiento.',
  sections: [
    {
      heading: 'Trayectoria full-stack y producto digital',
      paragraphs: [
        'Mi enfoque en desarrollo web parte de una convicción clara: el código debe resolver problemas reales y llegar a producción. En LinkedIn describo mi perfil como desarrollador de software y web con experiencia en JavaScript, React y Angular, complementada con C++, Java y Python en otros contextos. Esa base me permite moverme entre frontend y backend sin perder de vista la experiencia del usuario final.',
        'Desde julio de 2025 lidero como App Lead Developer en Prosavis, donde gestiono el desarrollo, la estrategia y el lanzamiento de una plataforma móvil para servicios en Colombia. Aunque el producto principal es móvil, el trabajo incluye roadmap de producto, marketing digital y partnerships — habilidades que influyen directamente en cómo diseño sitios web orientados a conversión y descubrimiento.',
        'En Neacsu Horizont Ventures, también desde julio de 2025, soy responsable del ciclo de vida completo del producto cross-platform: levantamiento de requisitos, diseño de arquitectura, implementación, despliegue y mantenimiento. Construyo landing pages, optimizo bases de datos, desarrollo APIs backend robustas e interfaces frontend responsivas con Flutter, React Native, Kotlin y Swift, aplicando metodologías ágiles, pipelines CI/CD y testing automatizado.',
        'Entre mis proyectos web destacados está magiacafetera-ui, repositorio open source en GitHub (Nico2603/magiacafetera-ui) con interfaz TypeScript y Angular para la web de viajes personalizados en el Eje Cafetero. También FastQA-HomePage demuestra diseño centrado en el usuario con HTML, CSS y JavaScript. Este portafolio —React 19, Vite 8, Tailwind CSS 4, Framer Motion y prerender estático— es el caso de uso que aplico cuando hablo de buenas prácticas reales.',
      ],
      image: {
        src: magiaCafetera.imageUrl,
        alt: 'Captura del repositorio magiacafetera-ui en GitHub',
        caption: 'Proyecto open source magiacafetera-ui — interfaz web para viajes en el Eje Cafetero.',
        sourceUrl: magiaCafetera.repoUrl,
        sourceLabel: 'Ver en GitHub',
      },
    },
    {
      heading: 'Del código académico a productos en producción',
      paragraphs: [
        'Antes de los roles profesionales actuales, consolidé competencias técnicas en la universidad. Participé en el Semillero Coders (2022-2023) en programación competitiva y representé a la Universidad Católica de Pereira en la Maratón Nacional de Programación ACIS/REDIS — clasificatoria para la Maratón Regional Latinoamericana ICPC 2022 — y en la XXXVII edición de 2023 en Manizales, compitiendo junto a 108 equipos de las universidades más prestigiosas de Colombia.',
        'Esas maratones no son solo trofeos: entrenan resolución algorítmica bajo presión, trabajo colaborativo y disciplina de código que trasladé a proyectos de software más grandes. En paralelo fui representante estudiantil en el Consejo Académico (2023-2025), rol que fortaleció mi capacidad de comunicar decisiones técnicas a audiencias no técnicas — una habilidad clave cuando diseño interfaces y documentación de producto.',
        'Complementé la práctica con certificaciones formales: Fundamentos UX/UI (Universidad Católica de Pereira, abril 2024), Introducción a las Metodologías Ágiles (marzo 2024) y Programación Python Frontend (Universidad Tecnológica de Pereira, mayo 2024). Esas formaciones influyen en cómo estructuro componentes React, priorizo accesibilidad y organizo sprints de entrega.',
        'El testing automatizado también forma parte de mi perfil: participé en el semillero de investigación Industria 4.0 línea Testing Automatizado (2024), alineado con mi interés en integrar QA en el ciclo de vida del software. En proyectos web actuales eso se traduce en pipelines CI/CD, validación de rutas, lint estricto y builds reproducibles antes de cada despliegue en Vercel o Netlify.',
      ],
      image: {
        src: consejoAcademico.image,
        alt: consejoAcademico.alt,
        caption: 'Fotografía publicada en LinkedIn — representante estudiantil, Universidad Católica de Pereira.',
        sourceUrl: consejoAcademico.detailUrl,
        sourceLabel: 'Ver en LinkedIn',
      },
    },
    {
      heading: 'Stack, despliegue y descubrimiento',
      paragraphs: [
        'En el día a día trabajo con React 19, TypeScript, Vite, Tailwind CSS 4 y Node.js para aplicaciones web. También tengo experiencia con Angular, Bootstrap, Flask, FastAPI, WordPress y CMS cuando el proyecto lo requiere. Las bases de datos que integro incluyen PostgreSQL, MySQL, MongoDB, Firebase y Redis, según las necesidades de persistencia y tiempo real.',
        'El despliegue no es un paso final opcional: uso Docker, CI/CD y plataformas como Vercel y Netlify para que cada cambio llegue de forma predecible. En Prosavis y Neacsu aplico metodologías ágiles con entregas iterativas; en proyectos personales como este portafolio centralizo SEO en constants/seo-pages.ts, JSON-LD por página, sitemap, robots.txt y prerender para que crawlers e IA encuentren el contenido sin depender solo de JavaScript.',
        'Mi perfil de LinkedIn resume el enfoque: combinar aprendizaje teórico con práctica para aplicar tecnologías innovadoras a problemas reales. En desarrollo web eso significa interfaces rápidas, tipado estricto, componentes reutilizables y documentación que permita a reclutadores, clientes y motores de respuesta entender qué construyo y con qué stack.',
      ],
    },
  ],
  leftCardTitle: 'Frontend',
  leftCardItems: [
    'React 19, TypeScript y Vite',
    'Tailwind CSS 4 y Framer Motion',
    'Angular, Bootstrap y diseño responsive',
    'SEO, JSON-LD y prerender estático',
  ],
  rightCardTitle: 'Backend & despliegue',
  rightCardItems: [
    'Node.js, Flask y FastAPI',
    'APIs REST e integración con bases de datos',
    'Docker, CI/CD y Vercel/Netlify',
    'Metodologías ágiles y testing automatizado',
  ],
  faqTitle: 'Preguntas sobre desarrollo web',
  faq: [
    {
      question: '¿Qué stack usa Nicolás Ceballos Brito para desarrollo web?',
      answer:
        'Trabaja principalmente con React 19, TypeScript, JavaScript, Tailwind CSS, Node.js y Vite — stack de este portafolio y de proyectos recientes. También tiene experiencia con Angular (magiacafetera-ui), Flask, FastAPI, Bootstrap y despliegue en Vercel y Netlify. En roles actuales en Prosavis y Neacsu Horizont Ventures combina desarrollo web con APIs backend, bases de datos SQL/NoSQL y pipelines CI/CD. Certificaciones en UX/UI (UCP, 2024) y metodologías ágiles complementan la parte de producto y entrega iterativa.',
    },
    {
      question: '¿Tiene experiencia con frontend y backend?',
      answer:
        'Sí. Desarrolla aplicaciones full-stack: interfaces con React y Angular en el frontend, y APIs con Node.js, Flask o FastAPI en el backend. En Neacsu Horizont Ventures cubre el ciclo completo — requisitos, arquitectura, implementación y mantenimiento — incluyendo landing pages, optimización de bases de datos e interfaces responsivas. Integra PostgreSQL, MySQL, MongoDB, Firebase y Redis según el proyecto. Su formación en Ingeniería de Sistemas y Telecomunicaciones (UCP, 2021-2025) y participación en maratones ACIS/REDIS refuerzan la base algorítmica detrás del código de producción.',
    },
    {
      question: '¿Cómo puedo ver sus proyectos web?',
      answer:
        'Puedes explorar proyectos en nicolasceballosbrito.com — sección de portafolio y páginas dedicadas por proyecto — y en GitHub (@Nico2603). Destacan FastQA-HomePage (HTML/CSS/JS), magiacafetera-ui (Angular/TypeScript para viajes en el Eje Cafetero) y este sitio como referencia de React 19, TypeScript strict, SEO y structured data. El perfil de LinkedIn documenta roles en Prosavis (App Lead Developer) y Neacsu (Cross-Platform Developer) con descripción detallada de entregables web y móviles.',
    },
  ],
}
