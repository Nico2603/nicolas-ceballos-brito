import { FULL_NAME } from '../../constants/social'
import { featuredProjects } from '../content'
import type { ExpertiseContent } from './types'

const pdm = featuredProjects.find((p) => p.id === 'portafolio-pdm')!

export const analisisDatosExpertise: ExpertiseContent = {
  pageTitle: `Análisis de Datos — ${FULL_NAME}`,
  pageDescription:
    'Análisis de datos con Python, Power BI, SQL y visualización. Dashboards, BI y proyectos de datos de Nicolás Ceballos Brito.',
  slug: '/analisis-datos',
  topicName: 'Análisis de datos',
  breadcrumbs: [
    { name: 'Inicio', path: '/' },
    { name: 'Análisis de datos', path: '/analisis-datos' },
  ],
  eyebrow: 'Expertise · Análisis de datos',
  h1: 'Análisis de datos y business intelligence',
  lead:
    'Transformo datos en decisiones con Python, Power BI, SQL y herramientas de visualización. Mi perfil de LinkedIn agrupa Análisis de datos, SQL, Power BI, Analítica predictiva y Mantenimiento predictivo entre las skills principales, respaldadas por certificación SQL en TestDome (mayo 2023) y Acelerador de Carrera con Power BI en ZAKIDATA (noviembre 2024). En proyectos como PdM-Manager analizo datos industriales para anticipar fallos; en contextos académicos participé en el XXIX Verano de la Investigación Científica y Tecnológica del Pacífico (Universidad Autónoma de Nayarit, agosto 2024) con reconocimiento por destacada participación. Combino modelos no supervisados — DBSCAN, KMeans, Isolation Forest y CBLOF — con dashboards que comunican hallazgos a equipos no técnicos.',
  sections: [
    {
      heading: 'De SQL y Power BI a decisiones industriales',
      paragraphs: [
        'El análisis de datos empieza por preguntas de negocio, no por herramientas. En mi trayectoria esa pregunta suele ser: ¿qué patrones en sensores, logs o registros operativos permiten actuar antes de que un equipo falle? Mi certificación SQL en TestDome (mayo 2023) formaliza años de consultas sobre MySQL, PostgreSQL y SQLite en proyectos web y académicos.',
        'En noviembre de 2024 completé el Acelerador de Carrera con Power BI de ZAKIDATA, certificación publicada en LinkedIn con credencial verificable. Power BI me permite construir dashboards interactivos donde KPIs, filtros y relaciones entre tablas traducen datasets complejos en narrativas visuales para gerentes y operadores.',
        'Python complementa el stack de BI: Pandas y NumPy para limpieza y transformación, Matplotlib y Seaborn para exploración, y Scikit-learn cuando el análisis evoluciona hacia modelos predictivos. Tableau y herramientas cloud (AWS, Google Cloud, Azure) aparecen en mi perfil como extensiones naturales cuando el volumen o la audiencia lo requieren.',
        'Las bases de datos que manejo incluyen PostgreSQL, MySQL, MongoDB, Firebase y Redis — cada una con casos donde SQL relacional, documentos o caché en tiempo real aportan la pieza correcta del puzzle analítico.',
      ],
      image: {
        src: pdm.imageUrl,
        alt: 'Captura del repositorio PdM-Manager en GitHub',
        caption: 'Proyecto open source PdM-Manager — gestión y visualización para mantenimiento predictivo.',
        sourceUrl: pdm.repoUrl,
        sourceLabel: 'Ver en GitHub',
      },
    },
    {
      heading: 'Mantenimiento predictivo y visualización',
      paragraphs: [
        'PdM-Manager es el proyecto bandera donde convergen análisis de datos e Industria 4.0: sistema de gestión para mantenimiento predictivo con React en frontend, Node.js en backend y modelos ML que alimentan visualizaciones industriales. El repositorio en GitHub (Nico2603/PdM-Manager) documenta cómo pasar de datos crudos a alertas accionables.',
        'En mi resumen de LinkedIn detallo modelos no supervisados — DBSCAN, KMeans, Isolation Forest y CBLOF — aplicados específicamente a mantenimiento predictivo. Esos algoritmos detectan anomalías y clusters en series temporales o multivariadas cuando no hay suficientes etiquetas de fallo, escenario común en plantas industriales.',
        'La participación en el XXIX Verano de la Investigación Científica y Tecnológica del Pacífico (certificación UAN, agosto 2024, más reconocimiento por destacada participación) consolidó trabajo colaborativo en machine learning aplicado a contextos reales de investigación, con rigor académico y entregables medibles.',
        'El testing automatizado del semillero Industria 4.0 (UCP, 2024) refuerza la idea de que datos confiables exigen pipelines validados: sin calidad en la captura y en el ETL, ningún dashboard ni modelo predictivo sostiene decisiones críticas.',
      ],
    },
    {
      heading: 'Comunicar datos con impacto',
      paragraphs: [
        'Un dashboard excelente que nadie entiende no sirve. Por eso combino certificaciones en Power BI con Fundamentos UX/UI (UCP, abril 2024) y experiencia como representante estudiantil en el Consejo Académico (2023-2025): aprender a traducir números a decisiones para audiencias diversas.',
        'En proyectos académicos y comunitarios — incluyendo la iniciativa documentada en LinkedIn que movilizó recursos para más de 500 familias y 170 kits educativos en el barrio Futuro Bajo — los datos también miden impacto social: familias atendidas, recursos movilizados, coordinación interinstitucional. No todo análisis ocurre en un data warehouse industrial.',
        'Si necesitas dashboards Power BI, análisis exploratorio en Python, diseño de esquemas SQL o integración de métricas en aplicaciones web, puedes revisar certificaciones en LinkedIn, el código en GitHub o contactarme desde este sitio.',
      ],
      image: {
        src: '/images/p2.webp',
        alt: 'Representante estudiantil en Consejo Académico, Universidad Católica de Pereira',
        caption: 'Fotografía publicada en LinkedIn — liderazgo académico, Universidad Católica de Pereira.',
        sourceUrl:
          'https://www.linkedin.com/in/nicolas-ceballos-brito/overlay/1635553816822/single-media-viewer/?profileId=ACoAADm8YQABLNW25Vw1bl3FRj4BVItbsOYwHg4',
        sourceLabel: 'Ver en LinkedIn',
      },
    },
  ],
  leftCardTitle: 'Herramientas',
  leftCardItems: [
    'Power BI certificado (ZAKIDATA, 2024)',
    'SQL certificado (TestDome, 2023)',
    'Python: Pandas, NumPy, Matplotlib, Seaborn',
    'PostgreSQL, MySQL, MongoDB, Firebase',
  ],
  rightCardTitle: 'Aplicaciones',
  rightCardItems: [
    'PdM-Manager — dashboards predictivos',
    'Verano del Pacífico — ML e investigación',
    'Reportes KPI y análisis exploratorio',
    'Integración de datos en apps web',
  ],
  faqTitle: 'Preguntas sobre análisis de datos',
  faq: [
    {
      question: '¿Qué herramientas de análisis de datos domina Nicolás?',
      answer:
        'Trabaja con Python (Pandas, NumPy, Matplotlib, Seaborn), Power BI, Tableau y SQL. Tiene certificación Acelerador de Carrera con Power BI (ZAKIDATA, noviembre 2024) y certificación SQL en TestDome (mayo 2023), ambas verificables en LinkedIn. Maneja PostgreSQL, MySQL, MongoDB, Firebase y Redis. Su perfil incluye skills de Análisis de datos, Analítica predictiva, Mantenimiento predictivo y modelos no supervisados (DBSCAN, KMeans, Isolation Forest, CBLOF) para contextos industriales.',
    },
    {
      question: '¿Ha aplicado análisis de datos en proyectos reales?',
      answer:
        'Sí. En PdM-Manager analiza datos industriales para mantenimiento predictivo con visualización en React y backend Node.js. Participó en el XXIX Verano de la Investigación Científica y Tecnológica del Pacífico (UAN, agosto 2024) con reconocimiento por destacada participación, trabajando en machine learning aplicado. En proyectos académicos y comunitarios aplica visualización y modelos estadísticos con Python y Power BI, incluyendo iniciativas de impacto social documentadas en LinkedIn.',
    },
    {
      question: '¿Ofrece dashboards o reportes con Power BI?',
      answer:
        'Tiene certificación formal en Power BI (ZAKIDATA, 2024) con credencial en Drive enlazada desde LinkedIn, y experiencia creando dashboards interactivos para KPIs y toma de decisiones. Combina BI con Fundamentos UX/UI (UCP, 2024) para que reportes sean legibles por equipos no técnicos. Puedes contactarlo por email desde nicolasceballosbrito.com o vía LinkedIn para colaboraciones en análisis de datos, esquemas SQL o integración de métricas en productos digitales.',
    },
  ],
}
