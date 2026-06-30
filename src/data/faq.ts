import type { TopicFaqItem } from '../lib/structured-data'
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
      'Según su perfil de LinkedIn: JavaScript, React, Angular, Python, C++, Java, Flutter, React Native, TensorFlow, SQL, Power BI, Docker, CI/CD, metodologías ágiles, machine learning (DBSCAN, KMeans, Isolation Forest, CBLOF) y testing automatizado.',
  },
  {
    question: '¿Dónde estudió y qué formación tiene?',
    answer:
      'Ingeniero en Sistemas y Telecomunicaciones de la Universidad Católica de Pereira (2021–2025). Bachiller técnico en contabilidad y costos en IE San José - La Unión Valle. Certificaciones en SQL, Power BI, UX/UI, metodologías ágiles, Python Frontend y participación en el XXIX Verano de Investigación del Pacífico (UAN).',
  },
  {
    question: '¿Cuáles son sus proyectos destacados?',
    answer:
      'En LinkedIn destaca Magia Cafetera (UI para viajes en el Eje Cafetero) y ChatBot Mental-Health (NLP para apoyo en salud mental). En GitHub: ChatBot-MentalHealth, PdM-Manager, FastQA-HomePage y magiacafetera-ui.',
  },
  {
    question: '¿Cómo contactar a Nicolás Ceballos Brito?',
    answer:
      'Puedes contactarlo por email en nicolasceballosbrito@gmail.com, en LinkedIn (nicolas-ceballos-brito), GitHub (@Nico2603) o Twitter (@NicolasCBrito).',
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
