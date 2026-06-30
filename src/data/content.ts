import type { Project, LaboresSlide, PortfolioStat, SkillCategory } from '../types'
import { aboutIntro, heroBio } from './profile'

export { heroBio, aboutIntro }

export const typingLines = [
  'Ingeniero de Sistemas y Telecomunicaciones',
  'Investigador en Industria 4.0',
  'Desarrollador de Software',
  'Analista de Datos & Machine Learning',
  'Colaborador en Startups',
  'Apasionado por la Tecnología y la Innovación',
]

export const portfolioStats: PortfolioStat[] = [
  { icon: 'code', value: '15+', label: 'Repositorios' },
  { icon: 'star', value: '25+', label: 'Estrellas' },
  { icon: 'git-branch', value: '8+', label: 'Colaboraciones' },
]

export const featuredProjects: Project[] = [
  {
    id: 'portafolio-chatbot',
    title: 'ChatBot-MentalHealth',
    description:
      'Chatbot especializado en apoyo de salud mental utilizando IA para proporcionar recursos y soporte emocional a usuarios que lo necesiten.',
    stars: 5,
    language: 'Python',
    techTags: ['Python', 'IA', 'Flask'],
    imageUrl:
      'https://repository-images.githubusercontent.com/938412804/7f2b92ec-e56c-4931-b4d4-2abb01349316',
    repoUrl: 'https://github.com/Nico2603/ChatBot-MentalHealth',
    status: 'active',
  },
  {
    id: 'portafolio-pdm',
    title: 'PdM-Manager',
    description:
      'Sistema avanzado de gestión para mantenimiento predictivo, optimizando recursos industriales y previniendo fallos técnicos.',
    stars: 8,
    language: 'JavaScript',
    techTags: ['React', 'Node.js', 'ML'],
    imageUrl:
      'https://repository-images.githubusercontent.com/941674189/849d685d-01e7-4cdb-b160-e51e5e6b5f0d',
    repoUrl: 'https://github.com/Nico2603/PdM-Manager',
    status: 'active',
  },
  {
    id: 'portafolio-fastqa',
    title: 'FastQA-HomePage',
    description:
      'Página de inicio moderna para plataforma de preguntas y respuestas rápidas con diseño centrado en la experiencia del usuario.',
    stars: 3,
    language: 'HTML',
    techTags: ['HTML', 'CSS', 'JavaScript'],
    imageUrl:
      'https://repository-images.githubusercontent.com/937310491/90197292-8ac1-4d7e-a738-eff51f1e6f65',
    repoUrl: 'https://github.com/Nico2603/FastQA-HomePage',
    status: 'active',
  },
  {
    id: 'portafolio-magia',
    title: 'magiacafetera-ui',
    description:
      'Interfaz de usuario elegante para aplicación relacionada con la producción y distribución de café colombiano premium.',
    stars: 4,
    language: 'TypeScript',
    techTags: ['Angular', 'TypeScript', 'SASS'],
    imageUrl:
      'https://repository-images.githubusercontent.com/943666070/5a151c83-1485-49b9-875f-14e528fd4ed1',
    repoUrl: 'https://github.com/Nico2603/magiacafetera-ui',
    status: 'active',
  },
]

export const laboresSlides: LaboresSlide[] = [
  {
    id: 'proyecto1',
    title: 'Maratón Nacional de Programación ACIS/REDIS',
    description:
      'Representé a mi universidad en la prestigiosa Maratón Nacional de Programación ACIS/REDIS, fase clasificatoria para la Maratón Regional Latinoamericana ICPC 2022. Esta competencia de élite desafía las habilidades de resolución algorítmica y programación competitiva, desarrollando capacidades técnicas avanzadas bajo presión temporal.',
    image: '/images/p1.webp',
    detailUrl:
      'https://www.linkedin.com/in/nicolas-ceballos-brito/overlay/1710808532744/single-media-viewer/?profileId=ACoAADm8YQABLNW25Vw1bl3FRj4BVItbsOYwHg4',
    alt: 'Maratón Nacional de Programación UAM',
  },
  {
    id: 'proyecto2',
    title: 'Liderazgo Estudiantil Universitario',
    description:
      'Elegido como representante oficial ante el Consejo Estudiantil de la Universidad Católica de Pereira, ejerciendo un rol de liderazgo estratégico en la toma de decisiones académicas e institucionales. Mi participación activa en procesos deliberativos fortalece la voz estudiantil y promueve una cultura de participación ciudadana responsable.',
    image: '/images/p2.webp',
    detailUrl:
      'https://www.linkedin.com/in/nicolas-ceballos-brito/overlay/1635553816822/single-media-viewer/?profileId=ACoAADm8YQABLNW25Vw1bl3FRj4BVItbsOYwHg4',
    alt: 'Representante Estudiantil UCP',
  },
  {
    id: 'proyecto3',
    title: 'XXXVII Maratón Nacional ACIS/REDIS 2023',
    description:
      'Seleccionado para representar a la Universidad Católica de Pereira en la XXXVII Maratón Nacional de Programación ACIS/REDIS 2023, celebrada en Manizales. Compitiendo junto a 108 equipos de las universidades más prestigiosas de Colombia, esta experiencia consolidó mis competencias en algoritmos avanzados y trabajo colaborativo de alto rendimiento.',
    image: '/images/p3.webp',
    detailUrl:
      'https://www.linkedin.com/in/nicolas-ceballos-brito/overlay/1635553820719/single-media-viewer/?type=LINK&profileId=ACoAADm8YQABLNW25Vw1bl3FRj4BVItbsOYwHg4',
    alt: 'Maratón ACIS/REDIS 2023',
  },
  {
    id: 'proyecto4',
    title: 'Proyecto de Responsabilidad Social Universitaria',
    description:
      'Lideré una iniciativa de impacto social para asistir a más de 500 familias afectadas por una emergencia en el barrio Futuro Bajo. A través de gestión estratégica y coordinación interinstitucional, logramos movilizar recursos para entregar 170 kits educativos, demostrando el compromiso universitario con el desarrollo comunitario sostenible.',
    image: '/images/p4.webp',
    detailUrl:
      'https://www.linkedin.com/posts/nicolas-ceballos-brito_compromisocomunitario-solidaridad-liderazgoestudiantil-activity-7193365777515773953-7wOj',
    alt: 'Iniciativa de Apoyo Comunitario',
  },
  {
    id: 'proyecto5',
    title: 'Encuentro Institucional de Alto Nivel',
    description:
      'Participé en la visita protocolar de Monseñor Nelson Jair Cardona Ramírez al campus universitario, representando la voz estudiantil en este encuentro de liderazgo institucional. Este evento fortaleció los vínculos estratégicos entre la academia, la comunidad religiosa y el estudiantado, consolidando nuestra identidad universitaria católica.',
    image: '/images/p5.webp',
    detailUrl:
      'https://www.linkedin.com/in/nicolas-ceballos-brito/overlay/1738888949947/single-media-viewer/?profileId=ACoAADm8YQABLNW25Vw1bl3FRj4BVItbsOYwHg4',
    alt: 'Visita del Obispo a la UCP',
  },
]

export const skillCategories: SkillCategory[] = [
  {
    title: 'Desarrollo Web',
    icon: 'code',
    subcategories: [
      {
        title: 'Frontend & Backend',
        tags: ['React', 'TypeScript', 'Angular', 'Node.js', 'FastAPI', 'Django', 'Flask', 'Tailwind'],
      },
      {
        title: 'Herramientas',
        tags: ['Vite', 'Figma', 'Cypress', 'Flutter', 'WordPress'],
      },
    ],
  },
  {
    title: 'IA & Análisis de Datos',
    icon: 'brain',
    subcategories: [
      {
        title: 'Machine Learning',
        tags: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'OpenCV', 'Hugging Face'],
      },
      {
        title: 'Visualización & BI',
        tags: ['Power BI', 'Matplotlib', 'Seaborn', 'SQL'],
      },
    ],
  },
  {
    title: 'Bases de Datos & Cloud',
    icon: 'database',
    subcategories: [
      {
        title: 'Almacenamiento',
        tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Redis'],
      },
      {
        title: 'Plataformas',
        tags: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Linux'],
      },
    ],
  },
  {
    title: 'DevOps & Control de Versiones',
    icon: 'git-branch',
    subcategories: [
      {
        title: 'Flujo de trabajo',
        tags: ['Git', 'GitHub', 'GitLab', 'CI/CD', 'Jenkins', 'Jira', 'Postman'],
      },
    ],
  },
]
