import { FULL_NAME } from '../../constants/social'
import { featuredProjects, laboresSlides } from '../content'
import type { ExpertiseContent } from './types'

const chatbot = featuredProjects.find((p) => p.id === 'portafolio-chatbot')!
const apoyoComunitario = laboresSlides.find((s) => s.id === 'proyecto4')!

export const inteligenciaArtificialExpertise: ExpertiseContent = {
  pageTitle: `Inteligencia Artificial — ${FULL_NAME}`,
  pageDescription:
    'Proyectos de IA y machine learning: chatbots, mantenimiento predictivo, TensorFlow y Hugging Face. Nicolás Ceballos Brito, ingeniero de sistemas.',
  slug: '/inteligencia-artificial',
  topicName: 'Inteligencia artificial',
  breadcrumbs: [
    { name: 'Inicio', path: '/' },
    { name: 'Inteligencia artificial', path: '/inteligencia-artificial' },
  ],
  eyebrow: 'Expertise · Inteligencia artificial',
  h1: 'Inteligencia artificial y machine learning aplicado',
  lead:
    'Desarrollo soluciones de IA con Python, TensorFlow, Scikit-learn y Hugging Face: desde chatbots de salud mental hasta modelos de mantenimiento predictivo para Industria 4.0. Mi perfil de LinkedIn destaca modelos no supervisados — DBSCAN, KMeans, Isolation Forest y CBLOF — aplicados a mantenimiento predictivo, complementados con formación en el AI Engineer Training Venture Studio Program de Modin.ai y Teilur.ai (marzo-agosto 2025), donde construí MVPs impulsados por IA en entornos ágiles de alto rendimiento. Participé en el XXIX Verano de la Investigación Científica y Tecnológica del Pacífico con reconocimiento por destacada participación, y mantengo proyectos activos como ChatBot-MentalHealth y PdM-Manager en GitHub.',
  sections: [
    {
      heading: 'Formación y programas de IA',
      paragraphs: [
        'En mi resumen profesional de LinkedIn detallo experiencia en IA y análisis de datos con modelos no supervisados como DBSCAN, KMeans, Isolation Forest y CBLOF orientados a mantenimiento predictivo. Esos algoritmos permiten detectar anomalías y agrupar patrones en datos industriales sin depender siempre de etiquetas supervisadas — un enfoque útil cuando los fallos son raros pero costosos.',
        `Entre marzo y agosto de 2025 participé en el AI Engineer Training Venture Studio Program, primero en Modin.ai (marzo-agosto, 5 meses) y en Teilur.ai (marzo-junio, 3 meses), ambos en Claymont, Delaware. En esos programas desarrollé MVPs impulsados por IA con herramientas de vanguardia en entornos ágiles, estratégicos y de alto rendimiento para transformar ideas en productos disruptivos y escalables.`,
        'Mi formación académica en Ingeniería de Sistemas y Telecomunicaciones (Universidad Católica de Pereira, 2021-2025) incluyó el semillero de investigación Industria 4.0 línea Testing Automatizado (2024), que conecta calidad de software con sistemas inteligentes. Las skills de LinkedIn refuerzan el perfil: Machine learning, TensorFlow, Aprendizaje no supervisado, Analítica predictiva, AI Engineer y Python.',
        'También sigo la conversación de la comunidad tech en LinkedIn — por ejemplo publicaciones sobre aprendizaje continuo de colegas como María Camila Alzate Calzada y trayectorias de programación desde la adolescencia de José Alexander Suaza Montes — como contexto de una red profesional donde la IA se discute con honestidad sobre esfuerzo y práctica, no solo talento innato.',
      ],
    },
    {
      heading: 'Proyectos aplicados',
      paragraphs: [
        'ChatBot-MentalHealth (octubre 2024 – presente) es una aplicación diseñada para brindar apoyo en salud mental mediante un chatbot interactivo. Utiliza procesamiento de lenguaje natural para responder preguntas y ofrecer orientación, con stack Python, IA y Flask según el repositorio en GitHub (Nico2603/ChatBot-MentalHealth). Es el ejemplo concreto de cómo integro NLP en un producto con propósito social.',
        'PdM-Manager es un sistema avanzado de gestión para mantenimiento predictivo que optimiza recursos industriales y previene fallos técnicos. Combina React en frontend, Node.js en backend y modelos ML — coherente con los algoritmos no supervisados que describo en mi perfil. El repositorio (Nico2603/PdM-Manager) documenta el enfoque full-stack que aplico cuando la IA debe ser consumible en dashboards y APIs, no solo en notebooks.',
        `En el ámbito académico-investigativo, obtuve certificación de estancia en el XXIX Verano de la Investigación Científica y Tecnológica del Pacífico (Universidad Autónoma de Nayarit, agosto 2024) y reconocimiento por destacada participación en el mismo evento. Esas credenciales avalan trabajo colaborativo en machine learning y mantenimiento predictivo en contexto internacional.`,
        'Más allá del código, lideré una iniciativa comunitaria documentada en LinkedIn que asistió a más de 500 familias y entregó 170 kits educativos en el barrio Futuro Bajo. Tecnología e impacto social no son opuestos: un chatbot de salud mental o un modelo predictivo industrial comparten la misma pregunta — ¿cómo usar datos e IA para mejorar vidas reales?',
      ],
      image: {
        src: chatbot.imageUrl,
        alt: 'Captura del repositorio ChatBot-MentalHealth en GitHub',
        caption: 'Proyecto open source ChatBot-MentalHealth — chatbot con NLP para apoyo en salud mental.',
        sourceUrl: chatbot.repoUrl,
        sourceLabel: 'Ver en GitHub',
      },
    },
    {
      heading: 'Integración de modelos en producto',
      paragraphs: [
        'La IA útil no termina en un notebook. En PdM-Manager el modelo alimenta visualizaciones y decisiones operativas; en ChatBot-MentalHealth el procesamiento de lenguaje se expone vía Flask para usuarios finales. Esa integración — Pandas y NumPy para pipelines, Scikit-learn o TensorFlow para entrenamiento, APIs para serving — es el patrón que repito en proyectos colaborativos y profesionales.',
        'Tengo perfil en Hugging Face (Flackoooo) y experiencia con modelos preentrenados, OpenCV para visión por computador y herramientas del ecosistema Python. Cuando un problema requiere deep learning escalo a TensorFlow o PyTorch; cuando basta con modelos clásicos o no supervisados, priorizo interpretabilidad y tiempos de inferencia razonables.',
        'Si buscas colaboración en IA aplicada — chatbots, mantenimiento predictivo, MVPs con LLMs o pipelines de datos — puedes revisar los repositorios en GitHub, las certificaciones en LinkedIn o contactarme directamente desde este sitio.',
      ],
      image: {
        src: apoyoComunitario.image,
        alt: apoyoComunitario.alt,
        caption: 'Fotografía de publicación propia en LinkedIn — iniciativa comunitaria y liderazgo estudiantil.',
        sourceUrl: apoyoComunitario.detailUrl,
        sourceLabel: 'Ver en LinkedIn',
      },
    },
  ],
  leftCardTitle: 'Modelos y frameworks',
  leftCardItems: [
    'TensorFlow, PyTorch y Scikit-learn',
    'NLP y Hugging Face',
    'DBSCAN, KMeans, Isolation Forest, CBLOF',
    'OpenCV y pipelines con Pandas/NumPy',
  ],
  rightCardTitle: 'Proyectos reales',
  rightCardItems: [
    'ChatBot-MentalHealth (Python, Flask, NLP)',
    'PdM-Manager (React, Node.js, ML)',
    'Verano del Pacífico — ML industrial',
    'MVPs en Modin.ai / Teilur.ai Venture Studio',
  ],
  faqTitle: 'Preguntas sobre IA y ML',
  faq: [
    {
      question: '¿Qué experiencia tiene Nicolás en inteligencia artificial?',
      answer:
        'Ha desarrollado ChatBot-MentalHealth con IA y NLP para salud mental (oct 2024 – presente), PdM-Manager con machine learning para mantenimiento predictivo, y participó en el AI Engineer Training Venture Studio Program en Modin.ai y Teilur.ai (2025). Su perfil de LinkedIn detalla modelos no supervisados — DBSCAN, KMeans, Isolation Forest y CBLOF — y certificaciones del XXIX Verano del Pacífico con reconocimiento por destacada participación. Trabaja con TensorFlow, PyTorch, Scikit-learn, Hugging Face y Python en pipelines de datos reales.',
    },
    {
      question: '¿Qué proyectos de ML tiene en su portafolio?',
      answer:
        'PdM-Manager aplica ML para predicción de fallos industriales con stack React, Node.js y modelos integrados en dashboard. ChatBot-MentalHealth usa procesamiento de lenguaje natural con Python y Flask. Ambos están en GitHub (@Nico2603) con README y capturas. Complementan experiencia académica en el Verano de la Investigación del Pacífico (Universidad Autónoma de Nayarit, 2024) y formación en venture studio donde construyó MVPs impulsados por IA.',
    },
    {
      question: '¿Usa Hugging Face u otras plataformas de IA?',
      answer:
        'Sí. Tiene perfil en Hugging Face (Flackoooo) y experiencia con modelos preentrenados de Hugging Face, OpenCV para visión por computador, y pipelines de datos con Pandas y NumPy. En mantenimiento predictivo combina algoritmos no supervisados clásicos con TensorFlow cuando el problema lo requiere. Los proyectos publicados en GitHub documentan integración vía APIs (Flask, Node.js) para que modelos sean consumibles fuera del entorno de entrenamiento.',
    },
  ],
}
