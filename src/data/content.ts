import type { Project, LaboresSlide, PortfolioStat, SkillCategory } from '../types'

export const heroBio =
  'Estudiante de décimo semestre de Ingeniería de Sistemas y Telecomunicaciones con experiencia en desarrollo web, software, análisis de datos e inteligencia artificial. Mi enfoque combina innovación, tecnología y soluciones de alto impacto para problemas reales, respaldado por un amplio conocimiento en diferentes tecnologías modernas y actuales.'

export const aboutIntro =
  'Soy estudiante de décimo semestre de Ingeniería de Sistemas y Telecomunicaciones en la Universidad Católica de Pereira. Con amplia experiencia en desarrollo de software, análisis de datos e inteligencia artificial, he participado en diversos proyectos que abarcan desde machine learning para mantenimiento predictivo hasta el desarrollo de aplicaciones web interactivas. Mi participación como representante estudiantil y en semilleros de investigación me ha permitido obtener certificaciones en SQL, Power BI, UX/UI y metodologías ágiles, fortaleciendo mi perfil técnico y de liderazgo.'

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
  {
    id: 'futuro-1',
    title: 'Proyecto Futuro #1',
    description:
      'Estoy trabajando en nuevos proyectos innovadores que pronto estarán disponibles. ¡Mantente atento a las actualizaciones!',
    stars: 0,
    language: '',
    techTags: ['Próximamente'],
    imageUrl: '',
    repoUrl: '',
    status: 'coming-soon',
  },
  {
    id: 'futuro-2',
    title: 'Proyecto Futuro #2',
    description:
      'Como estudiante de décimo semestre, tengo grandes ideas en mente para mi proyecto de grado y futuros desarrollos.',
    stars: 0,
    language: '',
    techTags: ['En ideación'],
    imageUrl: '',
    repoUrl: '',
    status: 'ideation',
  },
]

export const laboresSlides: LaboresSlide[] = [
  {
    id: 'proyecto1',
    title: 'Maratón Nacional de Programación ACIS/REDIS',
    description:
      'Representé a mi universidad en la prestigiosa Maratón Nacional de Programación ACIS/REDIS, fase clasificatoria para la Maratón Regional Latinoamericana ICPC 2022. Esta competencia de élite desafía las habilidades de resolución algorítmica y programación competitiva, desarrollando capacidades técnicas avanzadas bajo presión temporal.',
    image: '/images/p1.jpg',
    detailUrl:
      'https://www.linkedin.com/in/nicolas-ceballos-brito/overlay/1710808532744/single-media-viewer/?profileId=ACoAADm8YQABLNW25Vw1bl3FRj4BVItbsOYwHg4',
    alt: 'Maratón Nacional de Programación UAM',
  },
  {
    id: 'proyecto2',
    title: 'Liderazgo Estudiantil Universitario',
    description:
      'Elegido como representante oficial ante el Consejo Estudiantil de la Universidad Católica de Pereira, ejerciendo un rol de liderazgo estratégico en la toma de decisiones académicas e institucionales. Mi participación activa en procesos deliberativos fortalece la voz estudiantil y promueve una cultura de participación ciudadana responsable.',
    image: '/images/p2.jpg',
    detailUrl:
      'https://www.linkedin.com/in/nicolas-ceballos-brito/overlay/1635553816822/single-media-viewer/?profileId=ACoAADm8YQABLNW25Vw1bl3FRj4BVItbsOYwHg4',
    alt: 'Representante Estudiantil UCP',
  },
  {
    id: 'proyecto3',
    title: 'XXXVII Maratón Nacional ACIS/REDIS 2023',
    description:
      'Seleccionado para representar a la Universidad Católica de Pereira en la XXXVII Maratón Nacional de Programación ACIS/REDIS 2023, celebrada en Manizales. Compitiendo junto a 108 equipos de las universidades más prestigiosas de Colombia, esta experiencia consolidó mis competencias en algoritmos avanzados y trabajo colaborativo de alto rendimiento.',
    image: '/images/p3.jpg',
    detailUrl:
      'https://www.linkedin.com/in/nicolas-ceballos-brito/overlay/1635553820719/single-media-viewer/?type=LINK&profileId=ACoAADm8YQABLNW25Vw1bl3FRj4BVItbsOYwHg4',
    alt: 'Maratón ACIS/REDIS 2023',
  },
  {
    id: 'proyecto4',
    title: 'Proyecto de Responsabilidad Social Universitaria',
    description:
      'Lideré una iniciativa de impacto social para asistir a más de 500 familias afectadas por una emergencia en el barrio Futuro Bajo. A través de gestión estratégica y coordinación interinstitucional, logramos movilizar recursos para entregar 170 kits educativos, demostrando el compromiso universitario con el desarrollo comunitario sostenible.',
    image: '/images/p4.jpg',
    detailUrl:
      'https://www.linkedin.com/posts/nicolas-ceballos-brito_compromisocomunitario-solidaridad-liderazgoestudiantil-activity-7193365777515773953-7wOj',
    alt: 'Iniciativa de Apoyo Comunitario',
  },
  {
    id: 'proyecto5',
    title: 'Encuentro Institucional de Alto Nivel',
    description:
      'Participé en la visita protocolar de Monseñor Nelson Jair Cardona Ramírez al campus universitario, representando la voz estudiantil en este encuentro de liderazgo institucional. Este evento fortaleció los vínculos estratégicos entre la academia, la comunidad religiosa y el estudiantado, consolidando nuestra identidad universitaria católica.',
    image: '/images/p5.jpg',
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
        title: 'Frontend',
        tags: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular', 'React', 'jQuery', 'Bootstrap', 'Tailwind', 'htmx', 'SVG'],
        iconsUrl: 'https://skillicons.dev/icons?i=html,css,js,ts,angular,react,jquery,bootstrap,tailwind,htmx,svg',
      },
      {
        title: 'Backend',
        tags: ['Node.js', 'FastAPI', 'Django', 'Flask', 'PHP', 'Ruby'],
        iconsUrl: 'https://skillicons.dev/icons?i=nodejs,fastapi,django,flask,php,ruby',
      },
      {
        title: 'CMS & Hosting',
        tags: ['WordPress', 'Netlify', 'Heroku', 'Azure'],
        iconsUrl: 'https://skillicons.dev/icons?i=wordpress,netlify,heroku,azure',
      },
      {
        title: 'Diseño & Testing',
        tags: ['Figma', 'Cypress', 'Selenium', 'Flutter'],
        iconsUrl: 'https://skillicons.dev/icons?i=figma,cypress,selenium,flutter',
      },
    ],
  },
  {
    title: 'Desarrollo de Software & Lenguajes',
    icon: 'laptop',
    subcategories: [
      {
        title: 'Lenguajes de Programación',
        tags: ['C', 'C#', 'C++', 'Java', 'Python', 'JavaScript', 'Kotlin', 'Ruby', 'PHP'],
        iconsUrl: 'https://skillicons.dev/icons?i=c,cs,cpp,java,py,js,kotlin,ruby,php',
      },
      {
        title: 'IDEs & Herramientas',
        tags: ['Eclipse', 'IntelliJ IDEA', 'PyCharm', 'Visual Studio', 'VS Code', 'Android Studio'],
        iconsUrl: 'https://skillicons.dev/icons?i=eclipse,idea,pycharm,visualstudio,vscode,androidstudio',
      },
    ],
  },
  {
    title: 'IA & Análisis de Datos',
    icon: 'brain',
    subcategories: [
      {
        title: 'Machine Learning & IA',
        tags: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'Hugging Face'],
        iconsUrl: 'https://skillicons.dev/icons?i=tensorflow,pytorch,sklearn,pandas,numpy,opencv,huggingface',
      },
      {
        title: 'Visualización & BI',
        tags: ['Power BI', 'Matplotlib', 'Seaborn', 'Tableau'],
        iconsUrl: 'https://skillicons.dev/icons?i=powerbi,matplotlib,seaborn,tableau',
      },
    ],
  },
  {
    title: 'Bases de Datos',
    icon: 'database',
    subcategories: [
      {
        title: 'SQL & NoSQL',
        tags: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Firebase', 'Redis'],
        iconsUrl: 'https://skillicons.dev/icons?i=mysql,postgresql,mongodb,sqlite,firebase,redis',
      },
    ],
  },
  {
    title: 'DevOps & Control de Versiones',
    icon: 'git-branch',
    subcategories: [
      {
        title: 'Herramientas DevOps',
        tags: ['Git', 'GitHub', 'GitLab', 'Docker', 'Jenkins', 'CI/CD'],
        iconsUrl: 'https://skillicons.dev/icons?i=git,github,gitlab,docker,jenkins',
      },
    ],
  },
  {
    title: 'Sistemas Operativos & Cloud',
    icon: 'cloud',
    subcategories: [
      {
        title: 'Plataformas',
        tags: ['Linux', 'Windows', 'macOS', 'AWS', 'Google Cloud', 'Azure'],
        iconsUrl: 'https://skillicons.dev/icons?i=linux,windows,apple,aws,gcp,azure',
      },
    ],
  },
  {
    title: 'Otras Herramientas',
    icon: 'wrench',
    subcategories: [
      {
        title: 'Productividad & Colaboración',
        tags: ['Jira', 'Trello', 'Notion', 'Slack', 'Postman', 'Swagger'],
        iconsUrl: 'https://skillicons.dev/icons?i=jira,trello,notion,slack,postman,swagger',
      },
    ],
  },
]
