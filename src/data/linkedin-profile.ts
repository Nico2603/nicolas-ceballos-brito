/**
 * Datos extraídos de https://www.linkedin.com/in/nicolas-ceballos-brito/
 * Generado/actualizado por scripts/sync-linkedin.ts
 */
import { SOCIAL_LINKS } from '../constants/social'

export const LINKEDIN_PROFILE_URL = SOCIAL_LINKS.linkedin
export const LINKEDIN_SCRAPED_AT = '2026-06-29T00:00:00.000Z'

export const linkedInHeadline =
  'Ingeniero en Sistemas y Telecomunicaciones | Desarrollador de Software y Web | Analista de Datos e IA | AI Engineer Trainee & Venture Studio Program'

export const linkedInLocation = 'Pereira, Risaralda, Colombia'
export const linkedInConnections = 500
export const linkedInFollowers = 788
export const linkedInTotalExperience = '11 meses'

export const linkedInAbout =
  'Ingeniero en Sistemas y Telecomunicaciones de la Universidad Católica de Pereira, con experiencia en desarrollo de software, análisis de datos e inteligencia artificial. Mi enfoque es aplicar tecnologías innovadoras para resolver problemas reales, combinando aprendizaje teórico con práctica. Desarrollo web con JavaScript, React y Angular. Desarrollo de software con C++, Java y Python. IA y análisis de datos: modelos no supervisados como DBSCAN, KMeans, Isolation Forest y CBLOF para mantenimiento predictivo. Testing automatizado e integración QA en el ciclo de vida del software. Liderazgo e investigación: representante estudiantil en el Consejo Académico (2023-2025) y participante en semilleros de investigación en Industria 4.0 y programación competitiva. Participé en el XXIX Verano de la Investigación Científica y Tecnológica del Pacífico, colaborando en proyectos de machine learning y mantenimiento predictivo. Certificaciones en SQL, Power BI, UX/UI y metodologías ágiles. Apasionado por la innovación, la transformación digital y soluciones tecnológicas de alto impacto.'

export interface LinkedInExperienceEntry {
  id: string
  title: string
  company: string
  companyUrl?: string
  period: string
  location: string
  description: string
  department?: string
  level?: string
  current: boolean
  featured?: boolean
  initials: string
}

export const linkedInExperience: LinkedInExperienceEntry[] = [
  {
    id: 'prosavis',
    title: 'App Lead Developer',
    company: 'Prosavis',
    period: 'Jul 2025 – Presente (8 meses)',
    location: 'Pereira, Risaralda, Colombia',
    description:
      'Dirijo el desarrollo, estrategia y lanzamiento de Prosavis, una plataforma móvil para servicios en Colombia. Gestiono equipo de producto, roadmap, marketing digital y partnerships.',
    department: 'Engineering and Technical',
    level: 'Manager',
    current: true,
    featured: true,
    initials: 'P',
  },
  {
    id: 'neacsu',
    title: 'Cross-Platform Mobile Application Developer',
    company: 'Neacsu Horizont Ventures',
    companyUrl: 'https://www.linkedin.com/company/neacsu-horizont-ventures',
    period: 'Jul 2025 – Presente (7 meses)',
    location: 'Pereira, Risaralda, Colombia',
    description:
      'Responsable del ciclo de vida completo del producto: levantamiento de requisitos, diseño de arquitectura, implementación, despliegue y mantenimiento de soluciones móviles y cross-platform. Construyo landing pages, diseño y optimizo bases de datos, desarrollo APIs backend robustas e interfaces frontend responsivas. Uso Flutter, React Native, Kotlin y Swift. Aplico metodologías ágiles, pipelines CI/CD y testing automatizado para entregas de alta calidad.',
    department: 'Engineering and Technical',
    level: 'Specialist',
    current: true,
    initials: 'NH',
  },
  {
    id: 'modin',
    title: 'AI Engineer Training Venture Studio Program',
    company: 'Modin.ai',
    companyUrl: 'https://www.linkedin.com/company/modin-ai',
    period: 'Mar 2025 – Ago 2025 (5 meses)',
    location: 'Claymont, Delaware, Estados Unidos',
    description:
      'AI Engineer en el programa AI Engineer Training & Venture Studio de Teilur AI. Desarrollo de MVPs impulsados por IA con herramientas de vanguardia en un entorno ágil, estratégico y de alto rendimiento para transformar ideas en productos disruptivos.',
    current: false,
    initials: 'M',
  },
  {
    id: 'teilur',
    title: 'AI Engineer Training Venture Studio Program',
    company: 'Teilur.ai',
    companyUrl: 'https://www.linkedin.com/company/teilur-labs',
    period: 'Mar 2025 – Jun 2025 (3 meses)',
    location: 'Claymont, Delaware, Estados Unidos',
    description:
      'AI Engineer en el programa AI Engineer Training & Venture Studio de Teilur AI. Desarrollo de MVPs impulsados por IA con herramientas de vanguardia en un entorno ágil, estratégico y de alto rendimiento para transformar ideas en productos disruptivos y escalables.',
    current: false,
    initials: 'T',
  },
]

export interface LinkedInEducationEntry {
  id: string
  degree: string
  school: string
  schoolUrl?: string
  period: string
  location?: string
  description: string
  activities?: string
}

export const linkedInEducation: LinkedInEducationEntry[] = [
  {
    id: 'ucp',
    degree: 'Ingeniería de Sistemas y Telecomunicaciones',
    school: 'Universidad Católica de Pereira',
    schoolUrl: 'https://www.linkedin.com/school/ucatolicadepereira',
    period: '2021 – 2025 (4 años)',
    location: 'Colombia',
    description:
      'Ingeniero en Sistemas y Telecomunicaciones apasionado por las últimas tendencias tecnológicas. Participante del Semillero Coders (2022-2023) en programación competitiva. Representante estudiantil en el Consejo Académico (2023-2025). Semillero de investigación 4.0 línea Testing Automatizado (2024).',
    activities:
      'Semillero Coders 2022-2023 · Representante en Consejo Académico 2023-2025 · Semillero Investigación 4.0 Testing Automatizado 2024',
  },
  {
    id: 'san-jose',
    degree: 'Bachiller técnico — Contabilidad y costos',
    school: 'Institución Educativa San José - La Unión Valle',
    period: '2011 – 2020 (9 años)',
    description: 'Accounting Technology/Technician and Bookkeeping',
  },
]

export interface LinkedInCertificationEntry {
  id: string
  name: string
  issuer: string
  issuerUrl?: string
  issuedDate: string
  credentialUrl?: string
}

export const linkedInCertifications: LinkedInCertificationEntry[] = [
  {
    id: 'power-bi',
    name: 'Acelerador de Carrera con Power BI',
    issuer: 'ZAKIDATA',
    issuerUrl: 'https://linkedin.com/company/zakidatasas',
    issuedDate: '2024-11',
    credentialUrl:
      'https://drive.google.com/file/d/11Qu74nwOTHp_bpPiHW_KsCYijFfOwpHm/view?usp=sharing',
  },
  {
    id: 'verano-pacifico',
    name: 'Estancia en el XXIX Verano de la Investigación Científica y Tecnológica del Pacífico',
    issuer: 'Universidad Autónoma de Nayarit',
    issuerUrl: 'https://linkedin.com/company/universidad-autonoma-de-nayarit',
    issuedDate: '2024-08',
    credentialUrl:
      'https://drive.google.com/file/d/10bgKJrBtlLrOgW0c8Mysj4XHmbQfU67Q/view?usp=sharing',
  },
  {
    id: 'reconocimiento-pacifico',
    name: 'Reconocimiento por Destacada Participación en el XXIX Verano de la Investigación Científica y Tecnológica del Pacífico',
    issuer: 'Universidad Autónoma de Nayarit',
    issuerUrl: 'https://linkedin.com/company/universidad-autonoma-de-nayarit',
    issuedDate: '2024-08',
    credentialUrl:
      'https://drive.google.com/file/d/1E5tnxN4UjdnhNY4AX96YEmQinLIkezVz/view?usp=sharing',
  },
  {
    id: 'comunicacion-colaboracion',
    name: 'Comunicación y Colaboración en la Cultura Organizacional del Siglo XXI',
    issuer: 'Universidad Tecnológica de Pereira',
    issuerUrl: 'https://linkedin.com/school/universidad-tecnol-gica-de-pereira',
    issuedDate: '2024-05',
    credentialUrl:
      'https://drive.google.com/file/d/1aP-k5uyOjKCl1C8luaCg_v9p4CJiwBbc/view?usp=sharing',
  },
  {
    id: 'python-frontend',
    name: 'Programación Python Frontend',
    issuer: 'Universidad Tecnológica de Pereira',
    issuerUrl: 'https://linkedin.com/school/universidad-tecnol-gica-de-pereira',
    issuedDate: '2024-05',
    credentialUrl:
      'https://drive.google.com/file/d/1Zr4zkiTU9PU0soZ5rtJJxGXzfPiTL3IP/view?usp=sharing',
  },
  {
    id: 'trabajo-colaborativo',
    name: 'Desarrollo de Habilidades para el Trabajo Colaborativo',
    issuer: 'Universidad Católica de Pereira',
    issuerUrl: 'https://linkedin.com/school/ucatolicadepereira',
    issuedDate: '2024-04',
    credentialUrl:
      'https://drive.google.com/file/d/1iodUSHRdZ_w7bvYKajTRFRRklt3BUZP1/view?usp=sharing',
  },
  {
    id: 'ux-ui',
    name: 'Fundamentos UX/UI',
    issuer: 'Universidad Católica de Pereira',
    issuerUrl: 'https://linkedin.com/school/ucatolicadepereira',
    issuedDate: '2024-04',
    credentialUrl:
      'https://drive.google.com/file/d/19d6GfZJiK6upz_F6csOw1d1behYmyt_D/view?usp=sharing',
  },
  {
    id: 'metodologias-agiles',
    name: 'Introducción a las Metodologías Ágiles',
    issuer: 'Universidad Católica de Pereira',
    issuerUrl: 'https://linkedin.com/school/ucatolicadepereira',
    issuedDate: '2024-03',
    credentialUrl:
      'https://drive.google.com/file/d/1XkZiCJs_5w8Y-MZRB_fZgENzutip9kgy/view?usp=sharing',
  },
  {
    id: 'autogestion',
    name: 'Desarrollo de habilidades de autogestión para el siglo XXI',
    issuer: 'Universidad Católica de Pereira',
    issuerUrl: 'https://linkedin.com/school/ucatolicadepereira',
    issuedDate: '2024-02',
    credentialUrl:
      'https://drive.google.com/file/d/1FpInNNe3TbXMtsUuJU2mW1uXYkaOC__5/view?usp=sharing',
  },
  {
    id: 'sql',
    name: 'SQL',
    issuer: 'TestDome',
    issuerUrl: 'https://linkedin.com/company/testdome',
    issuedDate: '2023-05',
    credentialUrl: 'https://testdome.com/certificates/23049606fccc4eabb8c208aa80b94c94',
  },
]

export const linkedInSkills = [
  'Ingeniería de sistemas',
  'MVPs',
  'Bases de datos',
  'C++',
  'Testing automatizado',
  'Desarrollo web',
  'Programación',
  'Investigación',
  'Landing pages',
  'Venture capital',
  'React',
  'Diseño de arquitectura',
  'Python',
  'Análisis de datos',
  'JavaScript',
  'Estrategia',
  'Liderazgo',
  'Industria 4.0',
  'AI Engineer',
  'Machine learning',
  'Metodologías ágiles',
  'Java',
  'Lead developer',
  'Desarrollo móvil',
  'UX',
  'Representación estudiantil',
  'Diseño responsive',
  'Frontend',
  'IA',
  'SQL',
  'Arquitectura',
  'Aprendizaje no supervisado',
  'Gestión de programas',
  'Desarrollo de software',
  'CI/CD',
  'Desarrollo de apps',
  'LESS',
  'Analítica predictiva',
  'QA',
  'Power BI',
  'Telecomunicaciones',
  'Mantenimiento predictivo',
  'Marketing digital',
  'Cross-platform',
  'Flutter',
  'TensorFlow',
  'Docker',
  'Inglés',
] as const

export const linkedInLanguages = [
  { name: 'Español', proficiency: 'Nativo o bilingüe' },
  { name: 'Inglés', proficiency: 'Competencia profesional' },
] as const

export interface LinkedInProjectEntry {
  id: string
  name: string
  period: string
  description: string
}

export const linkedInProjects: LinkedInProjectEntry[] = [
  {
    id: 'magia-cafetera',
    name: 'Magia Cafetera',
    period: 'Mar 2025 – Presente',
    description: 'Interfaz de usuario para la web de viajes personalizados en el Eje Cafetero.',
  },
  {
    id: 'chatbot-mental-health',
    name: 'ChatBot Mental-Health',
    period: 'Oct 2024 – Presente',
    description:
      'ChatBot-MentalHealth es una aplicación diseñada para brindar apoyo en salud mental mediante un chatbot interactivo, utilizando procesamiento de lenguaje natural para responder preguntas y ofrecer orientación.',
  },
]

export interface LinkedInActivityEntry {
  id: string
  type: 'post' | 'like'
  author?: string
  title: string
  excerpt: string
  url: string
  publishedAt: string
  featured?: boolean
  imageUrl?: string
  tags?: string[]
}

export const linkedInActivity: LinkedInActivityEntry[] = [
  {
    id: 'compromiso-comunitario',
    type: 'post',
    title: 'Compromiso comunitario y liderazgo estudiantil',
    excerpt:
      'Lideré una iniciativa de impacto social para asistir a más de 500 familias afectadas por una emergencia en el barrio Futuro Bajo. A través de gestión estratégica y coordinación interinstitucional, logramos movilizar recursos para entregar 170 kits educativos.',
    url: 'https://www.linkedin.com/posts/nicolas-ceballos-brito_compromisocomunitario-solidaridad-liderazgoestudiantil-activity-7193365777515773953-7wOj',
    publishedAt: '2024-05-10',
    featured: true,
    imageUrl: '/images/p4.webp',
    tags: ['Liderazgo', 'Comunidad', 'UCP'],
  },
  {
    id: 'like-maria-camila',
    type: 'like',
    author: 'María Camila Alzate Calzada',
    title: 'El aprendizaje (brevemente)',
    excerpt:
      'Gran parte de lo que somos mes a mes se genera: observando a otros, reaccionando a lo que el ambiente nos ofrece y entendiendo…',
    url: 'https://es.www.linkedin.com/posts/maria-camila-alzate-calzada_el-aprendizaje-brevemente-gran-parte-activity-7429994399243120640-Uwoz',
    publishedAt: '2026-02-01',
    tags: ['Aprendizaje'],
  },
  {
    id: 'like-jose-alexander',
    type: 'like',
    author: 'José Alexander Suaza Montes',
    title: 'La verdadera diferencia no la hace el talento',
    excerpt:
      'Empecé a programar a los 13 años: algoritmos en papel, PHP, HTML y CSS. Mi primera…',
    url: 'https://es.www.linkedin.com/posts/josé-alexander-suaza-montes_la-verdadera-diferencia-no-la-hace-el-talento-activity-7410507806656811008-uF4e',
    publishedAt: '2025-12-15',
    tags: ['Programación', 'Carrera'],
  },
]

export const linkedInTypingLines = [
  'Ingeniero en Sistemas y Telecomunicaciones',
  'App Lead Developer en Prosavis',
  'Desarrollador de Software y Web',
  'Analista de Datos e IA',
  'AI Engineer Trainee & Venture Studio',
  'Cross-Platform Mobile Developer',
] as const
