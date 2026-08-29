import { FULL_NAME } from '../../constants/social'
import type { CatalogProject } from './types'

export const catalogProjects: CatalogProject[] = [
  {
    slug: 'chatbot-mental-health-bert',
    familyId: 'salud-mental',
    path: '/salud-mental/chatbot-mental-health-bert',
    title: 'ChatBot-MentalHealth-BERT',
    pageTitle: `ChatBot-MentalHealth-BERT — ${FULL_NAME}`,
    pageDescription:
      'v1 de la línea de salud mental: BERT afinado que clasifica 11 emociones y responde con plantillas. Modelo propio de Nicolás Ceballos Brito. No es un terapeuta.',
    eyebrow: 'Modelo propio',
    lead:
      'Un chat web de apoyo emocional cuyo modelo no genera la frase: predice una emoción y elige texto. Antes del ML, un override de crisis. Esa es la v1, y es mía de punta a punta.',
    period: '2024 – presente',
    role: 'Autor del modelo, el entrenamiento y la app Flask',
    purpose:
      'Demostrar que se puede hacer acompañamiento con un clasificador entrenado, no solo con un LLM de terceros. Quien contrata ve pesos, trainer y límites.',
    stack: ['Python', 'Flask', 'PyTorch', 'Hugging Face Transformers', 'scikit-learn', 'HTML/CSS/JS'],
    highlights: [
      'BERT de 11 clases con score de confianza',
      'CustomTrainer y pesos de clase',
      'Override por palabras de crisis antes del modelo',
      'STT en el navegador (webkitSpeechRecognition)',
    ],
    body: [
      {
        heading: 'La historia',
        paragraphs: [
          'Empecé esta línea porque un “chatbot de salud mental” típico es un wrapper de API. Yo quería un modelo que pudiera señalar en un README: aquí está el BERT, aquí el JSON de respuestas, aquí el historial. El repositorio público es ChatBot-MentalHealth-BERT. La UI es Flask + HTML. Los pesos viven bajo models/bert_emotion_model/.',
          'El bot no finge ser clínico. Si el usuario escribe señales de crisis, el override actúa antes de la inferencia. El resto del tiempo el modelo elige una de once emociones y una plantilla empática. Eso es vendible porque es explicable: un auditor puede seguir el flujo.',
        ],
      },
      {
        heading: 'Qué hice y con qué',
        paragraphs: [
          'Entrenamiento con Transformers y PyTorch, métricas con scikit-learn, app en Flask. Inferencia con umbral de confianza. Conversaciones en JSON. La v2 —MarIA— usa APIs externas y voz; esta v1 es la prueba de que también construyo el modelo, no solo consumo uno.',
          'No publico una URL de Space en Hugging Face hasta confirmarla. El perfil Flackoooo existe; el enlace del Space se añadirá cuando esté verificado.',
        ],
      },
    ],
    repoUrl: 'https://github.com/Nico2603/ChatBot-MentalHealth-BERT',
    faq: [
      {
        question: '¿El BERT genera texto libre?',
        answer:
          'No. Clasifica emoción y selecciona una plantilla en responses.json. La generación libre llega en MarIA, con otro stack y otros límites.',
      },
    ],
  },
  {
    slug: 'maria',
    familyId: 'salud-mental',
    path: '/salud-mental/maria',
    title: 'MarIA',
    pageTitle: `MarIA — ${FULL_NAME}`,
    pageDescription:
      'Compañero de acompañamiento emocional con voz, texto e historial. Next.js, LiveKit, OpenAI y Deepgram. Demo en Render. Nicolás Ceballos Brito.',
    eyebrow: 'Producto v2',
    lead:
      'MarIA sostiene conversaciones de apoyo —ansiedad, estrés, mindfulness— con autenticación, cuotas e historial. No sustituye atención clínica. La demo está en Render.',
    period: '2025 – presente',
    role: 'Producto web, API y orquestación con el agente de voz',
    purpose:
      'Pasar de un clasificador a un producto que una persona puede usar: login, sesión, recursos y voz.',
    stack: [
      'Next.js 14',
      'TypeScript',
      'Tailwind',
      'Prisma',
      'PostgreSQL',
      'NextAuth',
      'LiveKit',
      'OpenAI',
      'Deepgram',
    ],
    highlights: [
      'Chat empático + TTS/STT',
      'Voz en tiempo real vía LiveKit',
      'Auth Google y sesiones persistidas',
      'Páginas de recursos y crisis',
    ],
    body: [
      {
        heading: 'De la v1 a un sitio que se puede abrir',
        paragraphs: [
          'Si BERT es el laboratorio, MarIA es el mostrador. Next.js App Router, TypeScript, una API de salud para el host y un agente hermano que habla. El usuario no ve el pipeline: ve un compañero con historial. Yo sí veo el pipeline, y por eso puedo vender operación, no solo un mock.',
          'La demo pública está en Render: ai-mental-health-zyb6.onrender.com. El código del frontend y la API está en Nico2603/MarIA. El proceso de voz es LiveKit_Agent_MarIA. Tres piezas, un relato.',
        ],
      },
      {
        heading: 'Límites que dejo por escrito',
        paragraphs: [
          'No es un consultorio. Hay recursos de ansiedad y una ruta de crisis. Hay rate limit. Hay timeout de sesión en el agente. Un cliente clínico que lea esto entiende que el prestador ya pensó en abuso, cuota y cierre — no solo en el wow de la voz.',
        ],
      },
    ],
    repoUrl: 'https://github.com/Nico2603/MarIA',
    liveUrl: 'https://ai-mental-health-zyb6.onrender.com',
    liveUrlLabel: 'Abrir demo en Render',
    faq: [
      {
        question: '¿MarIA usa el BERT de la v1?',
        answer:
          'MarIA es la v2 con modelos de lenguaje y voz. El BERT sigue siendo la v1, pública y entrenada por Nicolás. Son etapas de la misma línea, no el mismo binario.',
      },
    ],
  },
  {
    slug: 'livekit-agent-maria',
    familyId: 'salud-mental',
    path: '/salud-mental/livekit-agent-maria',
    title: 'LiveKit_Agent_MarIA',
    pageTitle: `Agente de voz MarIA — ${FULL_NAME}`,
    pageDescription:
      'Proceso Python que escucha, piensa y habla en la sala LiveKit de MarIA. STT Deepgram, LLM OpenAI, TTS adaptativo. Nicolás Ceballos Brito.',
    eyebrow: 'Agente de voz',
    lead:
      'Este repo no es el sitio. Es MariaVoiceAgent: STT → LLM → TTS dentro de una sala LiveKit, con prompt de acompañamiento y sin diagnóstico.',
    period: '2025 – presente',
    role: 'Agente de voz y sincronización con la API de MarIA',
    purpose:
      'Separar el proceso de voz del frontend para poder operar, reiniciar y medir el agente como un servicio.',
    stack: ['Python', 'LiveKit Agents', 'Deepgram', 'OpenAI', 'Cartesia / Silero'],
    highlights: [
      'Pipeline STT → LLM → TTS en sala',
      'Prompt centrado en ansiedad, no en diagnóstico',
      'Timeout ~30 min y cuotas',
      'Respuestas enriquecidas (enlaces, QR de cierre)',
    ],
    body: [
      {
        heading: 'Por qué el agente es un repo aparte',
        paragraphs: [
          'Un cliente que pide “voz en el producto” a veces imagina un botón en el front. El trabajo real es un proceso que se une a una sala, transcribe, llama al modelo, sintetiza y escribe de vuelta a la UI. Ese proceso lo documenté en LiveKit_Agent_MarIA para que se pueda clonar, revisar y operar.',
          'Sincroniza con la API de MarIA. Reintenta HTTP. Enriquece la interfaz con tarjetas y un cierre. Si contratas orquestación de agentes, esto es evidencia de que ya lo hice en un dominio sensible, no solo en un toy.',
        ],
      },
    ],
    repoUrl: 'https://github.com/Nico2603/LiveKit_Agent_MarIA',
    faq: [
      {
        question: '¿Puedo usar el agente sin MarIA?',
        answer:
          'Está diseñado como complemento del producto MarIA. El valor para un cliente es el patrón: sala LiveKit + pipeline + API hermana. Se puede adaptar; no se vende como SaaS suelto.',
      },
    ],
  },
  {
    slug: 'pdm-manager',
    familyId: 'mantenimiento-predictivo',
    path: '/mantenimiento-predictivo/pdm-manager',
    title: 'PdM-Manager',
    pageTitle: `PdM-Manager — ${FULL_NAME}`,
    pageDescription:
      'Núcleo de mantenimiento predictivo: FastAPI, PostgreSQL, RNN Keras y Chart.js. Vibración, severidad y alertas. Nicolás Ceballos Brito.',
    eyebrow: 'Núcleo PdM',
    lead:
      'Lee vibración, clasifica con un RNN Keras y avisa en el tablero. Severidad 0, 1 o 2. Nació en el semillero Industria 4.0. Se corre en lab o LAN.',
    period: 'Semillero Industria 4.0 · UCP',
    role: 'Backend, modelo y tablero',
    purpose:
      'Cerrar el ciclo sensor → dato → inferencia → alerta sin vender un SaaS que no existe.',
    stack: ['FastAPI', 'SQLAlchemy', 'PostgreSQL', 'TensorFlow/Keras', 'scikit-learn', 'Chart.js', 'JWT'],
    highlights: [
      'Procesador en background ~30 s',
      'CRUD de máquinas, sensores y modelos .h5/.pkl',
      'Alertas automáticas en severidad 2',
      'OpenAPI en /docs',
    ],
    body: [
      {
        heading: 'Qué es (y qué no es)',
        paragraphs: [
          'Fichas antiguas de este portafolio decían React y Node. El código dice FastAPI, un ingestor MQTT hacia vibration_data, un escalador + RNN y classified_data. La UI es Chart.js. JWT en cookie httponly. Eso es lo que un ingeniero de planta debe leer.',
          'No es un producto público en la nube. Es el núcleo de un cuarteto: landing, Arduino, algoritmos y este manager. Si buscas un prestador para un piloto de PdM, este repo es la prueba de integración.',
        ],
      },
    ],
    repoUrl: 'https://github.com/Nico2603/PdM-Manager',
    faq: [
      {
        question: '¿Dónde está el frontend React?',
        answer:
          'No hay un frontend React en PdM-Manager. El tablero es Chart.js servido con el backend FastAPI.',
      },
    ],
  },
  {
    slug: 'pdm-landing',
    familyId: 'mantenimiento-predictivo',
    path: '/mantenimiento-predictivo/pdm-landing',
    title: 'PdM_Landing-Page',
    pageTitle: `PdM Landing — ${FULL_NAME}`,
    pageDescription:
      'Landing del sistema de mantenimiento predictivo. Explica el cuarteto PdM de Nicolás Ceballos Brito.',
    eyebrow: 'Vitrina',
    lead:
      'La cara pública del sistema: para qué sirve el PdM, cómo se conectan sensor, modelo y tablero, y a quién le importa.',
    purpose: 'Traducir el laboratorio a un relato que un no-desarrollador pueda compartir.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    highlights: ['Narrativa del producto PdM', 'Puente entre el semillero y el núcleo'],
    body: [
      {
        heading: 'Para qué una landing',
        paragraphs: [
          'Un sistema de vibración no se vende solo con /docs de FastAPI. La landing cuenta el problema industrial y apunta al resto de repos. Es la pieza de comunicación del cuarteto.',
        ],
      },
    ],
    repoUrl: 'https://github.com/Nico2603/PdM_Landing-Page',
    faq: [
      {
        question: '¿La landing reemplaza a PdM-Manager?',
        answer: 'No. Explica el sistema. El núcleo operativo es PdM-Manager.',
      },
    ],
  },
  {
    slug: 'arduino-pdm',
    familyId: 'mantenimiento-predictivo',
    path: '/mantenimiento-predictivo/arduino-pdm',
    title: 'Arduino-PdM',
    pageTitle: `Arduino-PdM — ${FULL_NAME}`,
    pageDescription:
      'Captura de vibración para el sistema PdM: hardware y firmware que alimentan el núcleo. Nicolás Ceballos Brito.',
    eyebrow: 'Hardware',
    lead:
      'Sin sensor no hay modelo. Este repo es la captura —típicamente ESP32 y MPU6050— que viaja por MQTT hacia el manager.',
    purpose: 'Cerrar el eslabón físico del piloto de mantenimiento predictivo.',
    stack: ['Arduino', 'ESP32', 'MPU6050', 'MQTT'],
    highlights: ['Ingesta real, no CSV sintético de demo'],
    body: [
      {
        heading: 'El dato tiene que nacer en algún lado',
        paragraphs: [
          'Un cliente industrial pregunta si el ML vio una máquina o un dataset de Kaggle. Arduino-PdM es la respuesta: el dato nace en el acelerómetro y entra al flujo HiveMQ → ingestor → PostgreSQL. Por eso el cuarteto no es “cuatro landings”.',
        ],
      },
    ],
    repoUrl: 'https://github.com/Nico2603/Arduino-PdM',
    faq: [
      {
        question: '¿Incluye el entrenamiento del RNN?',
        answer: 'El entrenamiento y el serving están en PdM-Manager y en el repo de algoritmos. Aquí está la captura.',
      },
    ],
  },
  {
    slug: 'algoritmos-ml-pdm',
    familyId: 'mantenimiento-predictivo',
    path: '/mantenimiento-predictivo/algoritmos-ml-pdm',
    title: 'Algoritmos de ML no supervisados para PdM',
    pageTitle: `ML no supervisado para PdM — ${FULL_NAME}`,
    pageDescription:
      'KMeans, Isolation Forest, CBLOF y DBSCAN aplicados a mantenimiento predictivo. Repositorio de método de Nicolás Ceballos Brito.',
    eyebrow: 'Método',
    lead:
      'Antes de clavar un RNN en producción, el semillero discutió anomalía sin etiquetas. Este repo es esa conversación, en código.',
    purpose: 'Mostrar el criterio de modelos no supervisados que también aparece en mi perfil de LinkedIn.',
    stack: ['Python', 'scikit-learn', 'KMeans', 'Isolation Forest', 'CBLOF', 'DBSCAN'],
    highlights: ['Anomalía cuando el fallo es raro', 'Complemento del RNN Keras del manager'],
    body: [
      {
        heading: 'Por qué no supervisado',
        paragraphs: [
          'En planta el fallo grave es escaso. Etiquetar todo es caro. Isolation Forest, CBLOF, DBSCAN y KMeans son el lenguaje que uso cuando el cliente no tiene un histórico limpio de “roto / no roto”. El manager luego puede servir un RNN; este repo explica el método.',
        ],
      },
    ],
    repoUrl: 'https://github.com/Nico2603/Algoritmos-de-ML-no-supervisados-para-PdM',
    faq: [
      {
        question: '¿Estos algoritmos corren dentro de PdM-Manager?',
        answer:
          'El manager sirve un RNN Keras. Este repositorio documenta el trabajo de anomalía no supervisada del mismo dominio. Son hermanos, no el mismo binario.',
      },
    ],
  },
  {
    slug: 'lumen-care',
    familyId: 'productos-clinicos',
    path: '/productos-clinicos/lumen-care',
    title: 'Lumen Care',
    pageTitle: `Lumen Care — ${FULL_NAME}`,
    pageDescription:
      'Plataforma de gestión de consulta clínica. Producto en el que participa Nicolás Ceballos Brito. Descripción superficial, sin infra privada.',
    eyebrow: 'Gestión de consulta',
    lead:
      'Lumen Care es software para operar una consulta: pacientes, agenda y el día a día clínico. Aquí no hay diagramas de red ni claves. Hay el problema que resuelve y el tipo de ingeniería que implica.',
    purpose: 'Dar a una consulta una operación digital seria, con respeto por el dato del paciente.',
    stack: ['TypeScript', 'React', 'Vite', 'Tailwind'],
    highlights: [
      'Producto de gestión, no un chatbot',
      'Enfoque en consulta real',
      'Sin detalle de infraestructura en este sitio',
    ],
    body: [
      {
        heading: 'Qué puede saber un visitante',
        paragraphs: [
          'Que construyo y mantengo una plataforma de gestión clínica. Que el estándar de ingeniería es el de un producto con usuarios reales, no el de un taller. Que si un consultorio pregunta “¿has hecho esto?”, la respuesta es sí — y la conversación de acceso se da en privado.',
          'ClinicAI y Rayito son vecinos de esta familia: experimentación pública y una landing de marca psicológica. Lumen es el núcleo de operación.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Hay un repo público de Lumen Care?',
        answer:
          'Este sitio no enlaza el repositorio ni documenta el hosting. La página describe el producto a nivel de servicio.',
      },
    ],
  },
  {
    slug: 'clinicai',
    familyId: 'productos-clinicos',
    path: '/productos-clinicos/clinicai',
    title: 'ClinicAI',
    pageTitle: `ClinicAI — ${FULL_NAME}`,
    pageDescription:
      'Repositorio público ClinicAI de Nicolás Ceballos Brito: experimentación en la intersección clínica e IA, con identidad Ink & Steel.',
    eyebrow: 'Público',
    lead:
      'ClinicAI es la vitrina pública del cruce clínica–IA. No es Lumen. Es el repo que se puede clonar y leer.',
    purpose: 'Separar la experimentación pública de la operación privada de consulta.',
    stack: ['TypeScript', 'React'],
    highlights: ['Repo público', 'Identidad de Nicolás en el README'],
    body: [
      {
        heading: 'Por qué existe al lado de Lumen',
        paragraphs: [
          'Un prestador serio no mezcla el laboratorio con la ficha de un paciente. ClinicAI es el laboratorio que sí se puede mostrar. Lumen es el producto que no se disecciona en un portafolio.',
        ],
      },
    ],
    repoUrl: 'https://github.com/Nico2603/ClinicAI',
    faq: [
      {
        question: '¿ClinicAI es la app que usa el consultorio?',
        answer: 'No. Es el repositorio público de la línea. La operación de consulta no se documenta aquí.',
      },
    ],
  },
  {
    slug: 'rayito-de-sol',
    familyId: 'productos-clinicos',
    path: '/productos-clinicos/rayito-de-sol',
    title: 'Rayito de Sol',
    pageTitle: `Caso Rayito de Sol — ${FULL_NAME}`,
    pageDescription:
      'Landing psicológica rayitodesolpsico.com. Marca de María Camila; ingeniería y web de Nicolás Ceballos Brito.',
    eyebrow: 'Caso de marca',
    lead:
      'Rayito de Sol es el consultorio y la marca de María Camila. Yo construyo y opero la web. El caso muestra cómo un ingeniero presta servicio a una profesional de la salud mental sin apropiarse de su voz.',
    purpose: 'Una presencia web rápida, clara y desplegada, al servicio de quien atiende.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion', 'Vercel'],
    highlights: [
      'Dominio en producción',
      'Marca de Camila, ingeniería de Nicolás',
      'SEO y diseño de landing clínica',
    ],
    body: [
      {
        heading: 'El prestador detrás de la marca',
        paragraphs: [
          'Quien llega a rayitodesolpsico.com debe sentir el consultorio, no mi portafolio. Ese es el trabajo: sistema de diseño de ella, deploy, rendimiento, formularios. Yo me vendo aquí como el ingeniero que ya entregó esa pieza y la mantiene.',
          'Si eres psicóloga o clínica y quieres lo mismo —una web que no grite “desarrollador”— este caso es la referencia. El repo de Rayito no se trata como producto mío.',
        ],
      },
    ],
    liveUrl: 'https://rayitodesolpsico.com',
    liveUrlLabel: 'Abrir rayitodesolpsico.com',
    faq: [
      {
        question: '¿Nicolás ofrece terapia en Rayito?',
        answer:
          'No. La atención psicológica es de María Camila. Nicolás desarrolla y mantiene el sitio.',
      },
    ],
  },
  {
    slug: 'nicolas-ceballos-brito',
    familyId: 'webs',
    path: '/webs/nicolas-ceballos-brito',
    title: 'nicolasceballosbrito.com',
    pageTitle: `Este portafolio — ${FULL_NAME}`,
    pageDescription:
      'El sitio que estás leyendo: React 19, Vite, Tailwind 4, prerender, tema Ink & Steel. Producto y carta de presentación de Nicolás Ceballos Brito.',
    eyebrow: 'Este sitio',
    lead:
      'El portafolio es un producto. Tiene tema dual, prerender, FAQ, hubs y deploy en Vercel. Si quieres ver cómo trabajo un sitio mío, ya estás dentro.',
    purpose: 'Vender con evidencia: el propio dominio como caso.',
    stack: ['React 19', 'TypeScript', 'Vite 8', 'Tailwind 4', 'Framer Motion', 'Lenis', 'Vercel'],
    highlights: ['Ink & Steel', 'Prerender y llms.txt', 'Hubs por familia de trabajo'],
    body: [
      {
        heading: 'Por qué el sitio es parte del portafolio',
        paragraphs: [
          'Un prestador que no puede mantener su propia web no convence. Este repo es público (Nico2603/nicolas-ceballos-brito). El copy de estas páginas es el mismo criterio que aplico a un cliente: tesis, no relleno; stack real; redirects cuando el relato cambia.',
        ],
      },
    ],
    repoUrl: 'https://github.com/Nico2603/nicolas-ceballos-brito',
    liveUrl: 'https://nicolasceballosbrito.com',
    liveUrlLabel: 'Inicio',
    faq: [
      {
        question: '¿Puedo contratar el mismo stack para mi marca?',
        answer:
          'Sí. React, TypeScript, Tailwind y Vercel son el oficio diario. El sistema visual se adapta a la marca del cliente, no se copia Ink & Steel a ciegas.',
      },
    ],
  },
  {
    slug: 'fastqa-homepage',
    familyId: 'webs',
    path: '/webs/fastqa-homepage',
    title: 'FastQA-HomePage',
    pageTitle: `FastQA-HomePage — ${FULL_NAME}`,
    pageDescription:
      'Landing de plataforma de preguntas y respuestas rápidas. HTML, CSS y JavaScript. Nicolás Ceballos Brito.',
    eyebrow: 'Landing',
    lead:
      'Una homepage de producto Q&A: semántica, responsive y centrada en que el visitante entienda la oferta sin un framework.',
    purpose: 'Demostrar frontend de conversión sin esconderse detrás de React.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    highlights: ['Estructura semántica', 'Microinteracciones en vanilla JS'],
    body: [
      {
        heading: 'Por qué sigue en el mapa',
        paragraphs: [
          'Porque no todo cliente necesita un SPA. FastQA es la prueba de que entrego HTML limpio cuando el producto lo pide. El repo es Nico2603/FastQA-HomePage.',
        ],
      },
    ],
    repoUrl: 'https://github.com/Nico2603/FastQA-HomePage',
    faq: [
      {
        question: '¿FastQA es un backend de preguntas?',
        answer: 'Esta pieza es la homepage. No se vende como la plataforma completa de Q&A.',
      },
    ],
  },
  {
    slug: 'magiacafetera-ui',
    familyId: 'webs',
    path: '/webs/magiacafetera-ui',
    title: 'magiacafetera-ui',
    pageTitle: `Magia Cafetera UI — ${FULL_NAME}`,
    pageDescription:
      'UI Angular para viajes personalizados en el Eje Cafetero. Fork de Uruena2603. No es una marca de café premium.',
    eyebrow: 'Viajes · Eje Cafetero',
    lead:
      'Interfaz para una experiencia de viaje en el Eje, no una tienda de café. Angular, TypeScript y SASS. El origen es un fork de Uruena2603/magiacafetera-ui.',
    purpose: 'Mostrar UI de marca territorial con atribución honesta.',
    stack: ['Angular', 'TypeScript', 'SASS'],
    highlights: ['Componentes Angular', 'Relato de viaje, no de tostión'],
    body: [
      {
        heading: 'Corregir el relato',
        paragraphs: [
          'Durante un tiempo el portafolio dijo “café colombiano premium”. El producto que el repo describe es viaje en el Eje Cafetero. El crédito del fork se queda en esta página. Un prestador que se vende no reescribe el origen de un UI ajeno.',
        ],
      },
    ],
    repoUrl: 'https://github.com/Nico2603/magiacafetera-ui',
    forkCredit: 'Fork de Uruena2603/magiacafetera-ui',
    faq: [
      {
        question: '¿Es un e-commerce de café?',
        answer: 'No. Es UI de viajes en el Eje Cafetero, con crédito al repositorio original.',
      },
    ],
  },
  {
    slug: 'cursos-online',
    familyId: 'aula',
    path: '/aula/cursos-online',
    title: 'Cursos-Online-Landing-Page',
    pageTitle: `Cursos Online — ${FULL_NAME}`,
    pageDescription:
      'Landing de oferta educativa. Fork de camCy/cursosOnline, publicado por Nicolás Ceballos Brito.',
    eyebrow: 'Fork documentado',
    lead:
      'Una landing de cursos: módulos, promesa, CTA. El concepto original es de camCy/cursosOnline. Yo lo adapto y lo publico con el crédito a la vista.',
    purpose: 'Oferta educativa en una página que se entiende.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    highlights: ['Atribución del fork', 'Estructura de landing de programa'],
    body: [
      {
        heading: 'Profesionalismo es citar',
        paragraphs: [
          'En aula se copia, se adapta y se entrega. Lo que no se hace es borrar al autor. Esta página existe para que un cliente educativo vea ese criterio.',
        ],
      },
    ],
    repoUrl: 'https://github.com/Nico2603/Cursos-Online-Landing-Page',
    forkCredit: 'Fork de camCy/cursosOnline',
    faq: [
      {
        question: '¿Nicolás dicta esos cursos?',
        answer: 'La página es una landing de oferta educativa forkeada. No es el catálogo de un bootcamp propio.',
      },
    ],
  },
  {
    slug: 'colectivo',
    familyId: 'academicos',
    path: '/academicos/colectivo',
    title: 'Colectivo',
    pageTitle: `Colectivo — ${FULL_NAME}`,
    pageDescription:
      'Proyecto de asignatura de programación. Sin año inventado. Nicolás Ceballos Brito.',
    eyebrow: 'Asignatura',
    lead:
      'Colectivo es un trabajo de programación de la formación. No le pongo año ni lo vendo como producto de mercado.',
    purpose: 'Dejar constancia de la base de programación sin inflar el relato.',
    stack: ['Programación'],
    highlights: ['Alcance de asignatura', 'Sin ficha de curso inventada'],
    body: [
      {
        heading: 'Honestidad de catálogo',
        paragraphs: [
          'Un portafolio que inventa fechas de clase pierde al lector técnico. Colectivo está aquí como evidencia de oficio académico, enlazado al repo, sin marketing de “startup”.',
        ],
      },
    ],
    repoUrl: 'https://github.com/Nico2603/Colectivo',
    faq: [
      {
        question: '¿En qué año se hizo Colectivo?',
        answer: 'No se publica un año en este sitio. Es un proyecto de programación de la formación.',
      },
    ],
  },
  {
    slug: 'atm-bancolombia',
    familyId: 'academicos',
    path: '/academicos/atm-bancolombia',
    title: 'ATM-Bancolombia',
    pageTitle: `ATM Bancolombia — ${FULL_NAME}`,
    pageDescription:
      'Simulación de cajero automático. Demo académica de Nicolás Ceballos Brito. No es un sistema bancario real.',
    eyebrow: 'Demo',
    lead:
      'Una simulación de ATM para practicar flujos, estados e interfaz. No opera dinero ni se conecta a un banco.',
    purpose: 'Mostrar un sistema con estados y pantallas, con el límite bien puesto.',
    stack: ['C++', 'Interfaz de simulación'],
    highlights: ['Flujos de cajero', 'Alcance académico declarado'],
    body: [
      {
        heading: 'Qué no es',
        paragraphs: [
          'No es software de Bancolombia ni un integrador de datáfono. Es una demo de formación. El nombre del repo describe el referente visual/funcional, no una alianza.',
        ],
      },
    ],
    repoUrl: 'https://github.com/Nico2603/ATM-Bancolombia',
    faq: [
      {
        question: '¿Está certificado por el banco?',
        answer: 'No. Es una simulación académica.',
      },
    ],
  },
  {
    slug: 'efficientdet',
    familyId: 'academicos',
    path: '/academicos/efficientdet',
    title: 'EfficientDet',
    pageTitle: `EfficientDet — ${FULL_NAME}`,
    pageDescription:
      'Visión por computador con EfficientDet. Proyecto de formación de Nicolás Ceballos Brito. Modelo propio en el sentido de entrenamiento/aplicación, no un LLM frontier.',
    eyebrow: 'Visión',
    lead:
      'Detección de objetos con EfficientDet. Aquí “modelo propio” significa entrenar y aplicar un detector, no publicar un GPT.',
    purpose: 'Evidencia de computer vision en el recorrido de formación.',
    stack: ['Python', 'EfficientDet', 'Visión por computador'],
    highlights: ['Detector entrenado/aplicado', 'Complementa BERT y PdM en la tesis de modelos propios'],
    body: [
      {
        heading: 'Modelos que sí son míos',
        paragraphs: [
          'En FAQ y perfil digo que he hecho modelos propios. BERT de emoción, no supervisados de PdM y este detector son esa frase en repos. No son Claude ni GPT. Son ingeniería clásica de ML, y se venden como tal.',
        ],
      },
    ],
    repoUrl: 'https://github.com/Nico2603/EfficientDet',
    faq: [
      {
        question: '¿Es un modelo generativo?',
        answer: 'No. Es detección de objetos con EfficientDet.',
      },
    ],
  },
  {
    slug: 'ai-lawyer',
    familyId: 'academicos',
    path: '/academicos/ai-lawyer',
    title: 'AI-Lawyer',
    pageTitle: `AI-Lawyer — ${FULL_NAME}`,
    pageDescription:
      'Prototipo de asistencia legal con IA. Alcance de demo. Nicolás Ceballos Brito.',
    eyebrow: 'Prototipo',
    lead:
      'Un experimento de interfaz y lenguaje para consultas legales de juguete. No es un abogado ni un producto certificado.',
    purpose: 'Explorar NLP aplicado a un dominio formal, con el disclaimer a la vista.',
    stack: ['JavaScript', 'IA aplicada (prototipo)'],
    highlights: ['Alcance de prototipo', 'No sustituye asesoría jurídica'],
    body: [
      {
        heading: 'Límite profesional',
        paragraphs: [
          'Lo mismo que en salud mental: no vendo magia. AI-Lawyer es un repo de exploración. Un cliente jurídico serio partiría de cero con requisitos reales.',
        ],
      },
    ],
    repoUrl: 'https://github.com/Nico2603/AI-Lawyer',
    faq: [
      {
        question: '¿Puedo usarlo para un caso real?',
        answer: 'No. Es un prototipo académico. No reemplaza un abogado.',
      },
    ],
  },
  {
    slug: 'pharmacy-control-system',
    familyId: 'academicos',
    path: '/academicos/pharmacy-control-system',
    title: 'PharmacyControlSystem',
    pageTitle: `PharmacyControlSystem — ${FULL_NAME}`,
    pageDescription:
      'Sistema de control de farmacia. Fork de Uruena2603. Nicolás Ceballos Brito.',
    eyebrow: 'Fork',
    lead:
      'Un sistema de inventario/control de farmacia. El origen es Uruena2603/PharmacyControlSystem. Aquí está el crédito.',
    purpose: 'Mostrar un dominio de inventario con atribución.',
    stack: ['Sistema de inventario'],
    highlights: ['Crédito al fork', 'Dominio de farmacia'],
    body: [
      {
        heading: 'Otra vez, citar',
        paragraphs: [
          'Los forks de clase no se reescriben como producto propio. Se listan, se enlazan y se atribuyen. Ese es el criterio del catálogo.',
        ],
      },
    ],
    repoUrl: 'https://github.com/Nico2603/PharmacyControlSystem',
    forkCredit: 'Fork de Uruena2603/PharmacyControlSystem',
    faq: [
      {
        question: '¿Es el inventario de una farmacia real?',
        answer: 'Es un fork académico. No se presenta como software certificado de droguería.',
      },
    ],
  },
]
