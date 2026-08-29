import type { TopicFaqItem } from '../lib/structured-data'
import { X_HANDLE } from '../constants/social'
import { linkedInAbout, linkedInExperience, linkedInHeadline } from './linkedin-profile'

const currentJobs = linkedInExperience
  .filter((r) => r.current)
  .map((r) => `${r.title} en ${r.company}`)
  .join(' y ')

export const faqItems: TopicFaqItem[] = [
  {
    question: '¿Quién es Nicolás Ceballos Brito?',
    answer: `${linkedInHeadline}. Actualmente: ${currentJobs}. ${linkedInAbout.slice(0, 280)}…`,
  },
  {
    question: '¿Qué tecnologías domina Nicolás Ceballos Brito?',
    answer:
      'Stack de producto: JavaScript, TypeScript, React, Angular, Python, C++, Java, Flutter, FastAPI, TensorFlow/Keras, SQL, Power BI, Docker, CI/CD y machine learning (DBSCAN, KMeans, Isolation Forest, CBLOF, BERT). El detalle por línea está en los hubs del portafolio —salud mental, PdM, webs— no en una sola card.',
  },
  {
    question: '¿Qué herramientas usa?',
    answer:
      'Trabaja a nivel experto en Cursor (Composer, Cloud Agents y Agent) desde el lanzamiento de la herramienta: planificación, módulos, tareas en paralelo, en singular y con cron. También usa OpenCode y orquesta modelos de varias casas —no el chat de una sola plataforma—. Recorrido desde los primeros GPT, Claude 1 y Gemini 1 hasta las familias actuales: GPT-5.6 (Sol, Terra, Luna), Claude Opus 5 / Sonnet 5 / Fable 5, Gemini 3.1 Pro y Gemini 3.7 Flash, Grok en Cursor, DeepSeek V4, Qwen 3.8-Max, Kimi K3, y NVIDIA Nemotron 3 Ultra / Nemotron 3.5 Lightning (NIM). Además entrena modelos propios (BERT de emoción, PdM no supervisado, EfficientDet): el oficio no es solo consumir un API.',
  },
  {
    question: '¿Dónde estudió y qué formación tiene?',
    answer:
      'Ingeniero en Sistemas y Telecomunicaciones de la Universidad Católica de Pereira (2021–2025). Bachiller técnico en contabilidad y costos en IE San José - La Unión Valle. Certificaciones en SQL, Power BI, UX/UI, metodologías ágiles, Python Frontend y participación en el XXIX Verano de Investigación del Pacífico (UAN).',
  },
  {
    question: '¿Cuáles son sus proyectos destacados?',
    answer:
      'Las líneas públicas son salud mental (BERT propio, MarIA, agente LiveKit), mantenimiento predictivo (PdM-Manager en FastAPI+Keras), productos clínicos (Lumen, ClinicAI, caso Rayito), webs (este sitio, FastQA, Magia Cafetera) y el trabajo actual en Prosavis. Cada hub enlaza artículos y repositorios.',
  },
  {
    question: '¿Cómo contactar a Nicolás Ceballos Brito?',
    answer:
      `Puedes contactarlo por email en nicolasceballosbrito@gmail.com, en LinkedIn (nicolas-ceballos-brito), GitHub (@Nico2603) o X (${X_HANDLE}).`,
  },
  {
    question: '¿Tiene experiencia en machine learning e Industria 4.0?',
    answer:
      'Sí. Modelos no supervisados para mantenimiento predictivo, participación en semilleros de Industria 4.0 y Testing Automatizado en la UCP, programa AI Engineer Training en Teilur.ai/Modin.ai, y proyecto PdM-Manager.',
  },
  {
    question: '¿Participa en open source?',
    answer:
      'Sí. Mantiene repositorios públicos en GitHub (@Nico2603) con proyectos en Python, JavaScript, TypeScript y más, disponibles en nicolasceballosbrito.com/repositories.',
  },
  {
    question: '¿Dónde está ubicado?',
    answer:
      'Pereira, Risaralda, Colombia. Perfil de LinkedIn con 500+ conexiones y 788 seguidores.',
  },
]
