import type { GuideSlug } from '../../constants/seo-routes'
import type { TopicFaqItem } from '../../lib/structured-data'

export interface GuiaSection {
  heading: string
  paragraphs: string[]
}

export interface GuiaContent {
  slug: GuideSlug
  path: string
  title: string
  description: string
  keywords: string
  directAnswer: string
  datePublished: string
  dateModified: string
  sections: GuiaSection[]
  faq: TopicFaqItem[]
}

export const guiasContent: GuiaContent[] = [
  {
    slug: 'como-estructurar-portafolio-desarrollador',
    path: '/guias/como-estructurar-portafolio-desarrollador',
    title: 'Cómo estructurar un portafolio de desarrollador | Nicolás Ceballos Brito',
    description:
      'Guía práctica para crear un portafolio web de desarrollador: secciones clave, proyectos destacados, SEO y buenas prácticas basadas en experiencia real.',
    keywords:
      'portafolio desarrollador, portfolio web programador, cómo hacer portafolio técnico, SEO portafolio',
    directAnswer:
      'Un portafolio de desarrollador efectivo debe incluir una presentación clara (quién eres y qué haces), 3-6 proyectos destacados con contexto y código, habilidades técnicas organizadas, formas de contacto visibles y meta tags para que buscadores e IA puedan indexarte correctamente.',
    datePublished: '2026-06-29',
    dateModified: '2026-06-29',
    sections: [
      {
        heading: 'Secciones esenciales de un portafolio técnico',
        paragraphs: [
          'La página de inicio debe responder en segundos: quién eres, qué tecnologías dominas y qué tipo de oportunidades buscas. Un hero con nombre, rol y breve bio es más efectivo que un diseño genérico sin contexto.',
          'Incluye una sección de proyectos con descripción del problema, tu rol, stack tecnológico y enlaces al repositorio o demo. Los reclutadores y clientes valoran el contexto, no solo capturas de pantalla.',
          'Añade habilidades agrupadas por categoría (frontend, backend, datos, DevOps) y logros relevantes: competencias, liderazgo, certificaciones o impacto social.',
        ],
      },
      {
        heading: 'Proyectos: calidad sobre cantidad',
        paragraphs: [
          'Selecciona entre 3 y 6 proyectos que demuestren variedad y profundidad. Un chatbot con IA, un sistema full-stack y una landing bien diseñada comunican más que veinte tutoriales incompletos.',
          'Cada proyecto debe tener título descriptivo, párrafo de contexto, tags de tecnología y enlace a GitHub. Si es posible, crea una página dedicada por proyecto para mejorar SEO y discoverability.',
        ],
      },
      {
        heading: 'SEO y discoverability para IA',
        paragraphs: [
          'Configura meta title y description únicos por página, datos estructurados JSON-LD (Person, WebSite, SoftwareSourceCode) y un archivo llms.txt con información citables para motores de respuesta.',
          'Un sitemap.xml, robots.txt y prerender de rutas clave ayudan a que Google, Bing y agentes de IA encuentren tu contenido sin depender solo de JavaScript.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Cuántos proyectos debo mostrar?',
        answer:
          'Entre 3 y 6 proyectos bien documentados suelen ser suficientes. Prioriza los que demuestren habilidades relevantes para el rol que buscas.',
      },
      {
        question: '¿Necesito un dominio propio?',
        answer:
          'Un dominio personal (como nicolasceballosbrito.com) transmite profesionalismo y mejora el posicionamiento frente a subdominios gratuitos.',
      },
    ],
  },
  {
    slug: 'machine-learning-proyectos-estudiantes',
    path: '/guias/machine-learning-proyectos-estudiantes',
    title: 'Machine learning en proyectos de estudiantes | Nicolás Ceballos Brito',
    description:
      'Cómo aplicar machine learning en proyectos universitarios: mantenimiento predictivo, datasets, modelos y lecciones de PdM-Manager y proyectos académicos.',
    keywords:
      'machine learning estudiantes, proyectos ML universidad, mantenimiento predictivo, TensorFlow proyectos',
    directAnswer:
      'Los estudiantes pueden aplicar machine learning eligiendo un problema real con datos disponibles, definiendo una métrica clara y construyendo un MVP con Python, Scikit-learn o TensorFlow antes de escalar. Proyectos como mantenimiento predictivo (PdM-Manager) demuestran impacto industrial concreto.',
    datePublished: '2026-06-29',
    dateModified: '2026-06-29',
    sections: [
      {
        heading: 'Elegir un problema con datos reales',
        paragraphs: [
          'El error más común es elegir un dataset de Kaggle sin contexto de negocio. Busca problemas de tu entorno: sensores industriales, registros académicos, encuestas o logs de aplicaciones que ya manejas.',
          'Define qué quieres predecir o clasificar y qué decisión mejorará tu modelo. En mantenimiento predictivo, la pregunta es: ¿cuándo fallará este equipo para intervenir antes?',
        ],
      },
      {
        heading: 'Stack recomendado para empezar',
        paragraphs: [
          'Python con Pandas para limpieza, Scikit-learn para modelos clásicos y TensorFlow o PyTorch si necesitas redes neuronales. Jupyter notebooks para experimentación y una API Flask o FastAPI para integrar el modelo en una app.',
          'PdM-Manager combina React en frontend, Node.js en backend y modelos ML para visualizar predicciones industriales — un enfoque full-stack que impresiona en portafolios.',
        ],
      },
      {
        heading: 'Documentar y publicar tu trabajo',
        paragraphs: [
          'Sube código a GitHub con README claro: problema, datos, métricas, resultados y limitaciones. Un buen README vale más que un modelo con 99% de accuracy sin explicación.',
          'Incluye el proyecto en tu portafolio web con página dedicada y schema SoftwareSourceCode para que sea encontrable por buscadores e IA.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Necesito una GPU para proyectos de ML?',
        answer:
          'No para empezar. Scikit-learn y datasets medianos corren bien en CPU. Usa Google Colab o Kaggle si necesitas entrenar redes grandes.',
      },
      {
        question: '¿Qué métricas usar en clasificación?',
        answer:
          'Precision, recall y F1-score suelen ser más informativos que accuracy sola, especialmente con clases desbalanceadas como fallos industriales raros.',
      },
    ],
  },
  {
    slug: 'react-typescript-proyectos-reales',
    path: '/guias/react-typescript-proyectos-reales',
    title: 'React y TypeScript en proyectos reales | Nicolás Ceballos Brito',
    description:
      'Buenas prácticas para construir aplicaciones con React 19, TypeScript y Vite: estructura, tipado, SEO y despliegue basadas en portafolios y proyectos productivos.',
    keywords:
      'React TypeScript, Vite React, proyectos React reales, portafolio React, TypeScript strict',
    directAnswer:
      'React con TypeScript en proyectos reales requiere tipado estricto, componentes pequeños y reutilizables, rutas con react-router-dom, meta tags con react-helmet-async y build optimizado con Vite. Este portafolio usa React 19, Tailwind CSS 4 y despliegue en Vercel como referencia práctica.',
    datePublished: '2026-06-29',
    dateModified: '2026-06-29',
    sections: [
      {
        heading: 'Estructura de proyecto recomendada',
        paragraphs: [
          'Organiza por responsabilidad: pages para rutas, components para UI reutilizable, hooks para lógica, constants y data para contenido estático, lib para utilidades como structured-data y SEO.',
          'Mantén los tipos en types/ o co-localizados con componentes. Evita any; usa discriminated unions y exhaustive switch para estados de UI.',
        ],
      },
      {
        heading: 'TypeScript estricto en componentes',
        paragraphs: [
          'Define interfaces de props explícitas. Usa const para arrays de configuración y satisfies cuando necesites inferencia estrecha. Los datos de contenido (proyectos, FAQ, guías) funcionan bien como módulos TypeScript exportados.',
          'Para rutas dinámicas (/proyectos/:slug, /guias/:slug), valida el slug contra una lista const y redirige con Navigate si no existe.',
        ],
      },
      {
        heading: 'SEO en SPAs React',
        paragraphs: [
          'react-helmet-async inyecta meta tags en runtime, pero crawlers necesitan HTML estático: prerender con Puppeteer en build, JSON-LD en cada página y llms.txt para agentes de IA.',
          'Centraliza SITE_URL, títulos y descriptions en constants/seo-pages.ts para mantener consistencia entre componentes, sitemap y llms.txt.',
        ],
      },
    ],
    faq: [
      {
        question: '¿React 19 o Next.js para un portafolio?',
        answer:
          'Vite + React es suficiente para portafolios con prerender en build. Next.js aporta SSR nativo si el proyecto crece hacia contenido dinámico frecuente.',
      },
      {
        question: '¿Cómo tipar react-router params?',
        answer:
          'Usa useParams con validación manual contra GUIDE_SLUGS o PROJECT_SLUGS. Un guard temprano con Navigate evita rutas inválidas.',
      },
    ],
  },
]

export function getAllGuias(): GuiaContent[] {
  return guiasContent
}

export function getGuiaBySlug(slug: string): GuiaContent | undefined {
  return guiasContent.find((g) => g.slug === slug)
}
