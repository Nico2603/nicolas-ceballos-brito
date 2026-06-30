import type { GuideSlug } from '../../constants/seo-routes'
import type { TopicFaqItem } from '../../lib/structured-data'
import type { ContentImage } from '../../types/content'
import { featuredProjects, laboresSlides } from '../content'
import { linkedInActivity } from '../linkedin-profile'

export interface GuiaSection {
  heading: string
  paragraphs: string[]
  image?: ContentImage
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

const pdm = featuredProjects.find((p) => p.id === 'portafolio-pdm')!
const fastqa = featuredProjects.find((p) => p.id === 'portafolio-fastqa')!
const apoyoComunitario = laboresSlides.find((s) => s.id === 'proyecto4')!
const compromisoPost = linkedInActivity.find((a) => a.id === 'compromiso-comunitario')!

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
      'Un portafolio de desarrollador efectivo debe incluir una presentación clara (quién eres y qué haces), 3-6 proyectos destacados con contexto y código, habilidades técnicas organizadas, formas de contacto visibles y meta tags para que buscadores e IA puedan indexarte correctamente. Este sitio — nicolasceballosbrito.com — es el caso real: React 19, TypeScript, Vite, JSON-LD por página, rutas de expertise (/desarrollo-web, /inteligencia-artificial, /analisis-datos), guías técnicas y datos sincronizados desde LinkedIn y GitHub. La clave no es la cantidad de proyectos sino demostrar profundidad, impacto y coherencia entre lo que dices y lo que el código prueba.',
    datePublished: '2026-06-29',
    dateModified: '2026-06-29',
    sections: [
      {
        heading: 'Secciones esenciales de un portafolio técnico',
        paragraphs: [
          'La página de inicio debe responder en segundos: quién eres, qué tecnologías dominas y qué tipo de oportunidades buscas. Un hero con nombre, rol y breve bio es más efectivo que un diseño genérico sin contexto. En mi perfil de LinkedIn ese mensaje se condensa en: Ingeniero en Sistemas y Telecomunicaciones, desarrollador de software y web, analista de datos e IA — y el portafolio refleja cada una de esas líneas con rutas dedicadas.',
          'Incluye una sección de proyectos con descripción del problema, tu rol, stack tecnológico y enlaces al repositorio o demo. Los reclutadores y clientes valoran el contexto, no solo capturas de pantalla. Mis proyectos destacados — ChatBot-MentalHealth, PdM-Manager, FastQA-HomePage y magiacafetera-ui — tienen página propia con schema SoftwareSourceCode para que buscadores entiendan el código fuente.',
          'Añade habilidades agrupadas por categoría (frontend, backend, datos, DevOps) y logros relevantes: competencias, liderazgo, certificaciones o impacto social. Mi sección de labores incluye maratones ACIS/REDIS, representación en el Consejo Académico de la UCP y una iniciativa comunitaria que asistió a más de 500 familias — porque un portafolio técnico también puede mostrar liderazgo y valores.',
          'Las formas de contacto deben ser visibles sin scroll infinito: email, LinkedIn y GitHub en el hero o footer. Centralizar datos en módulos TypeScript (profile.ts, linkedin-profile.ts, content.ts) evita inconsistencias cuando actualizas texto en una página y olvidas otra.',
          'Finalmente, una página About con trayectoria narrativa — no solo un CV en PDF — conecta proyectos dispersos en una historia coherente. Certificaciones como Fundamentos UX/UI (UCP, 2024) o metodologías ágiles refuerzan que el portafolio no es solo código: es producto pensado para humanos.',
        ],
        image: {
          src: apoyoComunitario.image,
          alt: apoyoComunitario.alt,
          caption: 'Fotografía de publicación propia en LinkedIn — impacto comunitario documentado en el portafolio.',
          sourceUrl: compromisoPost.url,
          sourceLabel: 'Ver en LinkedIn',
        },
      },
      {
        heading: 'Proyectos: calidad sobre cantidad',
        paragraphs: [
          'Selecciona entre 3 y 6 proyectos que demuestren variedad y profundidad. Un chatbot con IA, un sistema full-stack y una landing bien diseñada comunican más que veinte tutoriales incompletos. En mi GitHub (@Nico2603) priorizo repositorios con README claro, issues cerrados y commits recientes — señales de mantenimiento real.',
          'Cada proyecto debe tener título descriptivo, párrafo de contexto, tags de tecnología y enlace a GitHub. Si es posible, crea una página dedicada por proyecto para mejorar SEO y discoverability. Por ejemplo, /proyectos/chatbot-mental-health explica el stack Python/Flask/NLP con datos estructurados que Google puede citar.',
          'Documenta limitaciones con honestidad: qué no hace el proyecto, qué harías con más tiempo, qué aprendiste. Eso diferencia un portafolio maduro de una galería de clones de tutoriales. Cuando lideré Prosavis como App Lead Developer, aprendí que el contexto de producto — roadmap, usuarios, métricas — vale tanto como el snippet de código.',
          'Incluye al menos un proyecto donde seas dueño de punta a punta: diseño, implementación, despliegue. Este portafolio en Vercel cumple ese rol: React 19, Tailwind CSS 4, Framer Motion, prerender en build y llms.txt para agentes de IA.',
          'Si tienes impacto social o liderazgo — como la entrega de 170 kits educativos en una emergencia comunitaria — menciónalo junto al proyecto técnico más cercano. No es relleno: demuestra que puedes ejecutar bajo presión y comunicar resultados.',
        ],
      },
      {
        heading: 'SEO y discoverability para IA',
        paragraphs: [
          'Configura meta title y description únicos por página, datos estructurados JSON-LD (Person, WebSite, SoftwareSourceCode, FAQPage) y un archivo llms.txt con información citables para motores de respuesta. En este proyecto centralizo SITE_URL y metadatos en constants/seo-pages.ts para que sitemap, Helmet y llms.txt no diverjan.',
          'Un sitemap.xml, robots.txt y prerender de rutas clave ayudan a que Google, Bing y agentes de IA encuentren tu contenido sin depender solo de JavaScript. Vite genera bundles eficientes, pero los crawlers siguen valorando HTML estático en rutas importantes: home, about, expertise, guías y proyectos.',
          'Las páginas de expertise (/desarrollo-web, /inteligencia-artificial, /analisis-datos) y guías técnicas amplían el long-tail SEO: responden preguntas concretas con FAQ schema y texto narrativo basado en experiencia verificable de LinkedIn, no contenido genérico.',
          'Usa clases semánticas como direct-answer y faq-answer en párrafos clave — patrones que facilitan extracción por IA. Evita walls of keywords; escribe prosa que un reclutador humano también quiera leer.',
          'Sincroniza datos periódicamente: un script sync-linkedin.ts mantiene linkedin-profile.ts actualizado; GitHub API alimenta repositorios. Un portafolio vivo transmite más confianza que uno con fecha de copyright de 2022.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Cuántos proyectos debo mostrar?',
        answer:
          'Entre 3 y 6 proyectos bien documentados suelen ser suficientes. Prioriza los que demuestren habilidades relevantes para el rol que buscas: full-stack, IA, datos o móvil. En mi caso, ChatBot-MentalHealth, PdM-Manager, magiacafetera-ui y este portafolio cubren NLP, ML industrial, Angular y React/SEO respectivamente. Cada uno tiene README, repo público y contexto en el sitio — mejor que listar quince forks sin explicación.',
      },
      {
        question: '¿Necesito un dominio propio?',
        answer:
          'Un dominio personal (como nicolasceballosbrito.com) transmite profesionalismo y mejora el posicionamiento frente a subdominios gratuitos. También simplifica email profesional, certificados SSL y consistencia de marca entre LinkedIn, CV y GitHub. Vercel o Netlify hacen el despliegue accesible; el costo del dominio es una de las inversiones con mejor retorno en búsqueda de empleo freelance o full-time.',
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
      'Los estudiantes pueden aplicar machine learning eligiendo un problema real con datos disponibles, definiendo una métrica clara y construyendo un MVP con Python, Scikit-learn o TensorFlow antes de escalar. Proyectos como PdM-Manager demuestran impacto industrial concreto; el XXIX Verano de la Investigación Científica y Tecnológica del Pacífico (Universidad Autónoma de Nayarit, 2024) avala trabajo colaborativo con reconocimiento por destacada participación. En mi perfil de LinkedIn detallo modelos no supervisados — DBSCAN, KMeans, Isolation Forest y CBLOF — para mantenimiento predictivo, complementados con ChatBot-MentalHealth (NLP) y formación en el semillero Industria 4.0 Testing Automatizado (UCP, 2024).',
    datePublished: '2026-06-29',
    dateModified: '2026-06-29',
    sections: [
      {
        heading: 'Elegir un problema con datos reales',
        paragraphs: [
          'El error más común es elegir un dataset de Kaggle sin contexto de negocio. Busca problemas de tu entorno: sensores industriales, registros académicos, encuestas o logs de aplicaciones que ya manejas. En mantenimiento predictivo la pregunta operativa es: ¿cuándo fallará este equipo para intervenir antes y evitar paradas costosas?',
          'Define qué quieres predecir o clasificar y qué decisión mejorará tu modelo. Si no puedes explicar quién usará el resultado, el proyecto se queda en un notebook olvidado. PdM-Manager nació de esa necesidad: conectar predicciones con dashboards que operadores lean en planta.',
          'Valida disponibilidad y calidad de datos antes de elegir algoritmos. Datos faltantes, sensores mal calibrados o muestras desbalanceadas — fallos raros en industria — condicionan si conviene un modelo supervisado o no supervisado. Mi experiencia con Isolation Forest y CBLOF partió de escenarios donde las etiquetas de fallo eran escasas.',
          'Participar en programas de investigación acelera el acceso a problemas reales. El XXIX Verano del Pacífico me expuso a proyectos de machine learning en contexto internacional con entregables evaluados por pares académicos — una presión formativa que simula producción.',
          'Documenta supuestos desde el día uno: frecuencia de muestreo, ventana temporal, variables exógenas. Eso facilita reproducibilidad cuando retomas el proyecto meses después o lo presentas en un portafolio.',
        ],
      },
      {
        heading: 'Stack recomendado para empezar',
        paragraphs: [
          'Python con Pandas para limpieza, Scikit-learn para modelos clásicos y TensorFlow o PyTorch si necesitas redes neuronales. Jupyter notebooks para experimentación y una API Flask o FastAPI para integrar el modelo en una app — patrón que uso en ChatBot-MentalHealth con Flask y NLP.',
          'PdM-Manager combina React en frontend, Node.js en backend y modelos ML para visualizar predicciones industriales — un enfoque full-stack que impresiona en portafolios porque muestra que entiendes el ciclo completo: entrenar, servir, consumir.',
          'El semillero de investigación Industria 4.0 línea Testing Automatizado (Universidad Católica de Pereira, 2024) conecta ML con calidad de software: pipelines de datos confiables, pruebas automatizadas y despliegue repetible. Sin eso, modelos en producción degradan silenciosamente.',
          'Herramientas de visualización — Matplotlib, Seaborn, Power BI — ayudan a comunicar hallazgos a profesores o supervisores no técnicos. Certifiqué Power BI con ZAKIDATA (2024) precisamente para cerrar esa brecha entre notebook y decisión de negocio.',
          'Versiona datasets y modelos con Git LFS o DVC si crecen; al menos guarda seeds y parámetros en el README para que otro pueda reproducir tus métricas.',
        ],
        image: {
          src: pdm.imageUrl,
          alt: 'Captura del repositorio PdM-Manager en GitHub',
          caption: 'Proyecto open source PdM-Manager — ML y visualización para mantenimiento predictivo.',
          sourceUrl: pdm.repoUrl,
          sourceLabel: 'Ver en GitHub',
        },
      },
      {
        heading: 'Documentar y publicar tu trabajo',
        paragraphs: [
          'Sube código a GitHub con README claro: problema, datos, métricas, resultados y limitaciones. Un buen README vale más que un modelo con 99% de accuracy sin explicación. Incluye capturas, diagramas de arquitectura y pasos para ejecutar localmente.',
          'Incluye el proyecto en tu portafolio web con página dedicada y schema SoftwareSourceCode para que sea encontrable por buscadores e IA. Enlaza certificaciones relevantes — Verano del Pacífico, SQL TestDome, Power BI — que respalden rigor analítico.',
          'Prepara una narrativa de 2 minutos para defensa de tesis o entrevistas: problema, enfoque, resultado cuantificado, aprendizaje. Menciona colaboradores y fuentes de datos con ética académica.',
          'Si el proyecto tiene impacto social — como iniciativas comunitarias documentadas en LinkedIn — explícalo como motivación, no como relleno. La IA aplicada a salud mental (ChatBot-MentalHealth) comparte esa lógica de propósito.',
          'Actualiza el repositorio cuando mejoras el modelo; commits recientes demuestran mantenimiento. Un proyecto universitativo con un commit de hace dos años transmite abandono.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Necesito una GPU para proyectos de ML?',
        answer:
          'No para empezar. Scikit-learn y datasets medianos corren bien en CPU. Usa Google Colab o Kaggle si necesitas entrenar redes grandes con GPU gratuita. En PdM-Manager y proyectos del Verano del Pacífico muchas experimentaciones fueron viables en hardware estándar priorizando feature engineering y modelos no supervisados eficientes antes de escalar a deep learning.',
      },
      {
        question: '¿Qué métricas usar en clasificación?',
        answer:
          'Precision, recall y F1-score suelen ser más informativos que accuracy sola, especialmente con clases desbalanceadas como fallos industriales raros. En mantenimiento predictivo un falso negativo puede costar más que un falso positivo — define costos con tu supervisor y elige métricas alineadas. Documenta matriz de confusión y curvas ROC/PR en el README.',
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
      'React con TypeScript en proyectos reales requiere tipado estricto, componentes pequeños y reutilizables, rutas con react-router-dom, meta tags con react-helmet-async y build optimizado con Vite. Este portafolio — nicolasceballosbrito.com — usa React 19, Tailwind CSS 4, Framer Motion, Lenis y despliegue en Vercel como referencia práctica. En roles profesionales en Prosavis (App Lead Developer) y Neacsu Horizont Ventures (Cross-Platform Developer) aplico el mismo rigor: arquitectura clara, CI/CD, testing automatizado y landing pages responsivas con APIs backend en Node.js, complementado por certificación Programación Python Frontend (UTP, 2024).',
    datePublished: '2026-06-29',
    dateModified: '2026-06-29',
    sections: [
      {
        heading: 'Estructura de proyecto recomendada',
        paragraphs: [
          'Organiza por responsabilidad: pages para rutas, components para UI reutilizable, hooks para lógica, constants y data para contenido estático, lib para utilidades como structured-data y SEO. Este repositorio sigue ese patrón: data/expertise/, data/guias/, components/ExpertiseLandingLayout.tsx y types/content.ts para imágenes con atribución.',
          'Mantén los tipos en types/ o co-localizados con componentes. Evita any; usa discriminated unions y exhaustive switch para estados de UI. Los datos de contenido (proyectos, FAQ, guías) funcionan bien como módulos TypeScript exportados — facilitan lint, autocompletado y refactors seguros.',
          'Separa layout de página y presentación: ExpertiseLandingLayout consume datos de data/expertise/*.ts; las páginas DesarrolloWeb.tsx son wrappers de una línea. Eso escala cuando añades secciones narrativas sin inflar componentes de ruta.',
          'Centraliza tokens de diseño y variables CSS — este proyecto usa Tailwind CSS 4 con design system documentado. Consistencia visual entre home, expertise y guías refuerza marca personal.',
          'En Neacsu Horizont Ventures el ciclo completo incluye levantamiento de requisitos y arquitectura antes del primer componente React. Esa disciplina evita deuda en rutas, estado global innecesario y props drilling evitable.',
        ],
      },
      {
        heading: 'TypeScript estricto en componentes',
        paragraphs: [
          'Define interfaces de props explícitas. Usa const para arrays de configuración y satisfies cuando necesites inferencia estrecha. Los datos de contenido (proyectos, FAQ, guías) funcionan bien como módulos TypeScript exportados con interfaces NarrativeSection y ContentImage.',
          'Para rutas dinámicas (/proyectos/:slug, /guias/:slug), valida el slug contra una lista const (GUIDE_SLUGS, PROJECT_SLUGS) y redirige con Navigate si no existe. Eso previene URLs basura y simplifica SEO.',
          'Tipa respuestas de APIs externas — GitHub repos, LinkedIn sync — con interfaces dedicadas en types/. Valida en runtime solo cuando la fuente es inestable; confía en tipos cuando generas datos con scripts propios.',
          'Certificación Fundamentos UX/UI (UCP, 2024) influye en props de accesibilidad: aria-labels, contraste, focus visible. TypeScript no reemplaza pruebas de accesibilidad pero sí evita props olvidadas en componentes Button reutilizables.',
          'Usa never en default de switch sobre uniones discriminadas — regla del proyecto — para que nuevos variants fallen en compile-time hasta que los manejes.',
        ],
        image: {
          src: fastqa.imageUrl,
          alt: 'Captura del repositorio FastQA-HomePage en GitHub',
          caption: 'Proyecto open source FastQA-HomePage — landing con HTML, CSS y JavaScript.',
          sourceUrl: fastqa.repoUrl,
          sourceLabel: 'Ver en GitHub',
        },
      },
      {
        heading: 'SEO en SPAs React',
        paragraphs: [
          'react-helmet-async inyecta meta tags en runtime, pero crawlers necesitan HTML estático: prerender con Puppeteer en build, JSON-LD en cada página y llms.txt para agentes de IA. SeoHelmet centraliza title, description, canonical, Open Graph y structured data.',
          'Centraliza SITE_URL, títulos y descriptions en constants/seo-pages.ts para mantener consistencia entre componentes, sitemap y llms.txt. Las páginas de expertise usan buildExpertiseStructuredData; las guías, buildArticleStructuredData con datePublished y dateModified.',
          'Clases semánticas direct-answer y faq-answer marcan párrafos que motores de respuesta pueden citar. Combínalas con contenido narrativo largo basado en experiencia real — LinkedIn, GitHub, certificaciones — no texto placeholder.',
          'Optimiza imágenes con componentes lazy-loaded (OptimizedImage) y figuras con atribución (ContentImageFigure) cuando uses fotos de LinkedIn o capturas de repos. Crédito visible evita problemas de derechos y aumenta confianza.',
          'Despliega en Vercel con preview por PR; pipelines CI/CD en proyectos profesionales (Prosavis, Neacsu) extienden la misma mentalidad: lint, build y verificación antes de merge.',
        ],
      },
    ],
    faq: [
      {
        question: '¿React 19 o Next.js para un portafolio?',
        answer:
          'Vite + React es suficiente para portafolios con prerender en build. Next.js aporta SSR nativo si el proyecto crece hacia contenido dinámico frecuente o rutas server-side complejas. Este sitio elige Vite 8 por simplicidad, bundle rápido y control explícito del pipeline de prerender — decisión coherente con un portafolio estático enriquecido con datos TypeScript.',
      },
      {
        question: '¿Cómo tipar react-router params?',
        answer:
          'Usa useParams con validación manual contra GUIDE_SLUGS o PROJECT_SLUGS. Un guard temprano con Navigate evita rutas inválidas y estados undefined en getGuiaBySlug o getProjectBySlug. Prefiere listas const satisfies readonly string[] sincronizadas con seo-routes.ts para una sola fuente de verdad entre router, sitemap y datos.',
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
