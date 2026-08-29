import { FULL_NAME } from '../../constants/social'
import type { CatalogFamily } from './types'

export const catalogFamilies: CatalogFamily[] = [
  {
    id: 'salud-mental',
    path: '/salud-mental',
    navLabel: 'Salud mental',
    eyebrow: 'Línea de producto',
    title: `${FULL_NAME} en`,
    highlight: 'salud mental',
    pageTitle: `Salud mental e IA — ${FULL_NAME}`,
    pageDescription:
      'Línea de acompañamiento emocional de Nicolás Ceballos Brito: BERT propio, MarIA en producción y agente de voz LiveKit. Ingeniería, no terapia.',
    thesis:
      'Diseño software de acompañamiento emocional que se puede auditar: un modelo propio que clasifica emoción, un producto web con voz e historial, y un agente que habla en tiempo real. El propósito no es sustituir a un clínico. Es construir herramientas serias para quien necesita un primer contacto empático, con límites claros y código público.',
    story: [
      {
        heading: 'Por qué esta línea existe',
        paragraphs: [
          'Llegué a salud mental como ingeniero, no como terapeuta. En Pereira y en la universidad vi el mismo hueco: hay conversación sobre ansiedad y estrés, y muy poco software que se tome en serio la privacidad, el tono y el “esto no es un diagnóstico”. Quise un producto que yo mismo pudiera explicar en una reunión: qué predice el modelo, qué texto responde, qué pasa si alguien escribe una crisis.',
          'La tesis de venta es simple. Si contratas a un ingeniero de sistemas para un producto sensible, no quieres un chatbot genérico con un prompt. Quieres a alguien que ya entrenó un clasificador, que ya operó un sitio con autenticación y cuotas, y que ya conectó voz en una sala en vivo. Esa secuencia —v1, v2, agente— es el arco que ofrezco.',
        ],
      },
      {
        heading: 'El arco: de un BERT propio a un producto con voz',
        paragraphs: [
          'La primera pieza es ChatBot-MentalHealth-BERT. Ahí el modelo no “habla”: predice una de once emociones y elige una plantilla. Antes del machine learning hay un override por palabras de crisis. Eso es honestidad de producto. Quien contrata ve que sé cuándo no delegar en el modelo.',
          'MarIA es la v2: Next.js, conversación con modelos de lenguaje, historial, recursos de ansiedad y una demo viva en Render. El agente LiveKit es el proceso Python que escucha, piensa y habla. Tres repositorios, un mismo cliente imaginario: una persona que necesita acompañamiento, no un show de IA.',
          'Si buscas un prestador para un piloto de salud digital, esta línea es la prueba de que puedo ir del notebook al proceso en producción sin inventar un backend que no existe y sin vender magia.',
        ],
      },
    ],
    audience: [
      'Clínicas, consultorios y equipos de producto que necesitan un piloto de acompañamiento —no un terapeuta automático',
      'Fundadores que quieren un ingeniero que ya entrenó un modelo y ya operó voz en vivo',
      'Equipos de investigación o semillero que necesitan alguien que documente límites y no solo demos',
    ],
    offer: [
      'Diseño de flujos empáticos con guardrails de crisis',
      'Entrenamiento e inferencia de clasificadores (BERT / Transformers)',
      'Producto web con auth, historial y deploy',
      'Agentes de voz (STT → LLM → TTS) sobre LiveKit',
    ],
    faq: [
      {
        question: '¿Nicolás ofrece terapia o un producto clínico certificado?',
        answer:
          'No. La línea de salud mental es software de acompañamiento y clasificación de emoción. Los repositorios y las páginas lo dicen: no sustituye atención clínica ni líneas de emergencia. El valor es ingeniería aplicada a un dominio sensible.',
      },
      {
        question: '¿Qué proyectos integran esta línea?',
        answer:
          'Tres repositorios públicos: ChatBot-MentalHealth-BERT (clasificador BERT + plantillas), MarIA (producto web con voz e historial) y LiveKit_Agent_MarIA (pipeline de voz). Están enlazados entre sí y con esta página.',
      },
    ],
    projectSlugs: ['chatbot-mental-health-bert', 'maria', 'livekit-agent-maria'],
  },
  {
    id: 'mantenimiento-predictivo',
    path: '/mantenimiento-predictivo',
    navLabel: 'Mantenimiento predictivo',
    eyebrow: 'Industria 4.0',
    title: 'Vibración,',
    highlight: 'modelos y tablero',
    pageTitle: `Mantenimiento predictivo — ${FULL_NAME}`,
    pageDescription:
      'Cuarteto PdM de Nicolás Ceballos Brito: sensor Arduino, algoritmos no supervisados, núcleo FastAPI+Keras y landing. Semillero Industria 4.0, UCP.',
    thesis:
      'El mantenimiento predictivo que construyo no es un dashboard de moda. Es un sensor que vibra, un modelo que clasifica severidad y un tablero que avisa. Nació en el semillero Industria 4.0 de la Universidad Católica de Pereira. Lo vendo como lo que es: un sistema de laboratorio/LAN que un equipo industrial puede entender y extender.',
    story: [
      {
        heading: 'Del semillero al cuarteto',
        paragraphs: [
          'En Industria 4.0 el problema no era “hacer ML”. Era leer un MPU6050, mandar la señal por MQTT, no perder el dato y decidir si la máquina está normal, leve o grave. PdM-Manager es el núcleo: FastAPI, PostgreSQL, un RNN Keras y Chart.js. No es React ni Node, por más que fichas viejas del portafolio lo hayan dicho.',
          'Alrededor del núcleo hay tres piezas que un comprador técnico quiere ver: la landing que explica el producto, el firmware Arduino que captura, y el repo de algoritmos no supervisados (KMeans, Isolation Forest, CBLOF, DBSCAN) donde se discute el método antes de meterlo en producción.',
        ],
      },
      {
        heading: 'Qué ofrezco a un cliente industrial',
        paragraphs: [
          'Un ingeniero que ya unió hardware, ingesta, modelo y UI. Puedo entrar a un piloto de PdM sin empezar de cero: conozco el ciclo de 30 segundos del procesador, las alertas de severidad 2 y el hecho de que esto se corre en lab, no como SaaS público. Esa honestidad ahorra semanas de discovery falso.',
        ],
      },
    ],
    audience: [
      'Plantas y laboratorios que quieren un piloto de vibración con modelo, no solo un Excel',
      'Equipos de datos que necesitan a alguien que ya entrenó Keras y ya sirvió inferencia en FastAPI',
      'Semilleros o facultades que buscan un referente de PdM documentado en público',
    ],
    offer: [
      'Ingesta MQTT + persistencia PostgreSQL',
      'Modelos Keras / no supervisados para anomalía',
      'API FastAPI con JWT y OpenAPI',
      'Tablero Chart.js y alertas por severidad',
    ],
    faq: [
      {
        question: '¿PdM-Manager es un SaaS en la nube?',
        answer:
          'No. Se corre en laboratorio o LAN. El valor es el sistema completo (sensor → modelo → tablero), no una suscripción pública.',
      },
      {
        question: '¿Qué stack usa realmente el núcleo?',
        answer:
          'FastAPI, SQLAlchemy, PostgreSQL, TensorFlow/Keras, scikit-learn, Chart.js y JWT. No es una app React/Node.',
      },
    ],
    projectSlugs: ['pdm-manager', 'pdm-landing', 'arduino-pdm', 'algoritmos-ml-pdm'],
  },
  {
    id: 'productos-clinicos',
    path: '/productos-clinicos',
    navLabel: 'Productos clínicos',
    eyebrow: 'Producto en producción',
    title: 'Software para',
    highlight: 'consulta y marca',
    pageTitle: `Productos clínicos — ${FULL_NAME}`,
    pageDescription:
      'Lumen Care, ClinicAI y el caso Rayito de Sol: cómo Nicolás Ceballos Brito construye producto web para consulta psicológica y gestión clínica, sin exponer infra privada.',
    thesis:
      'Un consultorio no necesita un laboratorio de IA. Necesita una agenda que no se caiga, una marca que se sienta humana y un ingeniero que sepa qué no publicar. En esta línea hablo de Lumen Care y ClinicAI como productos de gestión, y de Rayito de Sol como caso de landing psicológica que ya está en el aire.',
    story: [
      {
        heading: 'Prestar servicio a quien atiende personas',
        paragraphs: [
          'Dirijo técnica en Prosavis y, en paralelo, construyo y mantengo producto para el mundo clínico-psicológico. Lumen Care es una plataforma de gestión de consulta. ClinicAI es el repositorio público de experimentación clínica. Rayito de Sol es la marca de María Camila: yo construyo y opero la web; la voz de la marca es la de ella.',
          'No detallo bases, tokens ni redes internas. Lo que un cliente debe ver es el resultado: sitios rápidos, copy cuidadoso, deploy continuo y respeto por datos de pacientes. Si buscas un prestador para una consulta o una clínica pequeña, esta es la conversación correcta.',
        ],
      },
    ],
    audience: [
      'Psicólogas y clínicas que necesitan presencia web y operación digital seria',
      'Equipos que quieren un CTO/freelance que ya entregó landings y plataformas clínicas',
    ],
    offer: [
      'Landings clínicas con SEO y accesibilidad',
      'Plataformas de gestión de consulta (agenda, notas, recaudo — a nivel de producto)',
      'Diseño Ink & Steel / sistemas de marca ajenos tratados con respeto',
    ],
    faq: [
      {
        question: '¿Rayito de Sol es un producto de Nicolás?',
        answer:
          'La marca y el servicio psicológico son de María Camila. Nicolás construye y mantiene la web (rayitodesolpsico.com) como caso de desarrollo. No se presenta como su consultorio.',
      },
      {
        question: '¿Lumen Care es open source?',
        answer:
          'Lumen Care es un producto de gestión clínica. En este sitio se describe de forma superficial: qué problema resuelve, no el detalle de infraestructura ni repositorios privados.',
      },
    ],
    projectSlugs: ['lumen-care', 'clinicai', 'rayito-de-sol'],
  },
  {
    id: 'webs',
    path: '/webs',
    navLabel: 'Webs',
    eyebrow: 'Ingeniería web',
    title: 'Sitios que',
    highlight: 'se pueden vender',
    pageTitle: `Desarrollo web — ${FULL_NAME}`,
    pageDescription:
      'Sitios y UIs de Nicolás Ceballos Brito: este portafolio, FastQA, Magia Cafetera (viajes del Eje) y el caso Rayito. React, Angular, Vite, SEO.',
    thesis:
      'Una web que vendo es una web que carga, se indexa y se entiende. Este portafolio es la prueba en producción. FastQA es una landing de producto. Magia Cafetera es UI de viajes en el Eje Cafetero —no una marca de café premium— y nació como fork que documenté. Rayito vive en productos clínicos; aquí lo cito como hermano de oficio.',
    story: [
      {
        heading: 'Del portafolio al caso de cliente',
        paragraphs: [
          'nicolasceballosbrito.com corre React 19, Vite, Tailwind 4 y prerender. No es una plantilla: es el sistema Ink & Steel, el dual theme y las páginas que estás leyendo. FastQA-HomePage muestra HTML/CSS/JS centrado en conversión. magiacafetera-ui es Angular + TypeScript para una experiencia de viaje en el Eje; el crédito del fork es de Uruena2603.',
          'Si contratas desarrollo web, contratas a alguien que ya opera su propio dominio, que ya corrigió contraste y SEO, y que no inventa el stack del cliente.',
        ],
      },
    ],
    audience: [
      'Marcas y profesionales que necesitan un sitio con tesis, no un carrusel',
      'Equipos que quieren React/TypeScript o Angular con deploy en Vercel',
    ],
    offer: [
      'Landings y sitios de marca con SEO',
      'Sistemas de diseño (tokens, tema claro/oscuro)',
      'Prerender, sitemap y llms.txt para descubrimiento',
    ],
    faq: [
      {
        question: '¿Qué es realmente Magia Cafetera?',
        answer:
          'Una interfaz para una experiencia de viajes personalizados en el Eje Cafetero, en Angular y TypeScript. Es un fork de Uruena2603/magiacafetera-ui. No es una tienda de café premium.',
      },
    ],
    projectSlugs: ['nicolas-ceballos-brito', 'fastqa-homepage', 'magiacafetera-ui'],
  },
  {
    id: 'aula',
    path: '/aula',
    navLabel: 'Aula',
    eyebrow: 'Educación',
    title: 'Interfaces para',
    highlight: 'aprender',
    pageTitle: `Aula y landings educativas — ${FULL_NAME}`,
    pageDescription:
      'Cursos-Online y piezas de aula: landings educativas en las que Nicolás Ceballos Brito participa, con crédito honesto a forks.',
    thesis:
      'El aula me enseñó a entregar una landing clara: oferta, módulos, llamada a la acción. Cursos-Online-Landing-Page es un fork de camCy/cursosOnline. Lo muestro porque el trabajo de adaptar, publicar y no esconder el origen también es profesionalismo.',
    story: [
      {
        heading: 'Enseñar con una página que se entiende',
        paragraphs: [
          'Una landing de cursos no es un portafolio de ego. Es una promesa de aprendizaje. En esta familia dejo constancia de ese oficio y del crédito al repositorio original. Si un cliente educativo me pide una web de programa, parto de esa honestidad.',
        ],
      },
    ],
    audience: ['Escuelas, bootcamps y profesores que necesitan una vitrina de programa'],
    offer: ['Landings de oferta educativa', 'Adaptación de forks con atribución'],
    faq: [
      {
        question: '¿Cursos-Online es un producto propio?',
        answer:
          'Es un fork de camCy/cursosOnline. El valor que muestro es la adaptación y la publicación, no la autoría original del concepto.',
      },
    ],
    projectSlugs: ['cursos-online'],
  },
  {
    id: 'academicos',
    path: '/academicos',
    navLabel: 'Académicos',
    eyebrow: 'Formación UCP',
    title: 'Proyectos de',
    highlight: 'formación',
    pageTitle: `Proyectos académicos — ${FULL_NAME}`,
    pageDescription:
      'Colectivo, ATM Bancolombia, EfficientDet, AI-Lawyer y Pharmacy: demos y asignaturas de Nicolás Ceballos Brito. Honestidad de alcance, crédito a forks.',
    thesis:
      'Un profesional que se vende no esconde la universidad. Muestra qué hizo en clase y qué no promete. Colectivo es programación, sin año inventado. ATM es una simulación. EfficientDet es visión. AI-Lawyer es un prototipo. Pharmacy es fork. Aquí el prestador dice: sé construir, sé atribuir, sé acotar.',
    story: [
      {
        heading: 'Por qué estos repos siguen en el sitio',
        paragraphs: [
          'Porque un reclutador o un cliente corporativo pregunta “¿solo landings?”. No. Hay C++, visión por computador, una UI de cajero, un experimento legal y un sistema de farmacia forkeado. Ninguno es un producto SaaS. Todos son evidencia de recorrido.',
        ],
      },
    ],
    audience: [
      'Reclutadores que quieren ver más que el trabajo actual',
      'Clientes que valoran un ingeniero con base en algoritmos y sistemas',
    ],
    offer: ['Prototipos con alcance declarado', 'Visión por computador y demos de escritorio'],
    faq: [
      {
        question: '¿Estos proyectos están en producción comercial?',
        answer:
          'No. Son formación, demos y forks documentados. El trabajo comercial actual está en Prosavis, las landings y la línea de salud mental / PdM.',
      },
    ],
    projectSlugs: [
      'colectivo',
      'atm-bancolombia',
      'efficientdet',
      'ai-lawyer',
      'pharmacy-control-system',
    ],
  },
  {
    id: 'prosavis',
    path: '/trabajo/prosavis',
    navLabel: 'Prosavis',
    eyebrow: 'Trabajo actual',
    title: 'Director técnico en',
    highlight: 'Prosavis',
    pageTitle: `Prosavis — ${FULL_NAME}`,
    pageDescription:
      'Nicolás Ceballos Brito es director técnico de Prosavis: app de servicios verificados en Colombia, línea de limpieza y operación en el Eje Cafetero.',
    thesis:
      'Prosavis es una plataforma de servicios verificados en Colombia. Yo dirijo la técnica: app, paneles y la operación digital que sostiene a profesionales y a clientes. También hay una línea propia de limpieza. El Eje —Pereira, Dosquebradas, Santa Rosa de Cabal, Cerritos— es el territorio. No publico infraestructura interna, tokens ni repos de la organización.',
    story: [
      {
        heading: 'Qué es Prosavis, en voz de producto',
        paragraphs: [
          'La app conecta a quien necesita un servicio con profesionales verificados. Hay dos paneles de administración y una base de clientes que se opera todos los días. Antes fui App Lead (julio–septiembre 2025); hoy soy director técnico. El trabajo es arquitectura, ciberseguridad, liderazgo de producto y el detalle que no se ve: que el flujo de agendar no se rompa un sábado en Pereira.',
          'La línea de limpieza es servicio propio, no solo marketplace. Quien contrata a Nicolás como freelance o colaborador selecto está contratando a alguien que ya carga P&L técnico de un negocio real, no solo de un repo de fin de semana.',
        ],
      },
      {
        heading: 'Ciudades y alcance',
        paragraphs: [
          'Operamos con foco en Pereira, Dosquebradas, Santa Rosa de Cabal y Cerritos. El relato público se queda ahí: geografía, tipo de servicio, rol. Si necesitas un CTO que ya hizo app + paneles + operación, este es el caso. Si necesitas el diagrama interno, no está en este sitio.',
        ],
      },
    ],
    audience: [
      'Empresas que buscan un director técnico con producto en el mercado colombiano',
      'Fundadores que quieren un colaborador que ya operó app y backoffice',
    ],
    offer: [
      'Liderazgo técnico de app y paneles',
      'Producto para marketplace de servicios',
      'Freelance y colaboraciones selectas en paralelo',
    ],
    faq: [
      {
        question: '¿Se puede ver el código de Prosavis en GitHub personal?',
        answer:
          'Los repositorios de producto de Prosavis no se listan aquí. Este sitio describe el negocio y el rol, no la infraestructura ni la organización GitHub de la empresa.',
      },
    ],
    projectSlugs: [],
  },
]
