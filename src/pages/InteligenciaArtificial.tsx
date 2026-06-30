import ExpertiseLandingLayout from '../components/ExpertiseLandingLayout'
import { FULL_NAME } from '../constants/social'
import { topicFaqIa } from '../data/topic-faq-ia'

export default function InteligenciaArtificial() {
  return (
    <ExpertiseLandingLayout
      pageTitle={`Inteligencia Artificial — ${FULL_NAME}`}
      pageDescription="Proyectos de IA y machine learning: chatbots, mantenimiento predictivo, TensorFlow y Hugging Face. Nicolás Ceballos Brito, ingeniero de sistemas."
      slug="/inteligencia-artificial"
      topicName="Inteligencia artificial"
      breadcrumbs={[
        { name: 'Inicio', path: '/' },
        { name: 'Inteligencia artificial', path: '/inteligencia-artificial' },
      ]}
      eyebrow="Expertise · Inteligencia artificial"
      h1="Inteligencia artificial y machine learning aplicado"
      lead="Desarrollo soluciones de IA con Python, TensorFlow, Scikit-learn y Hugging Face: desde chatbots de salud mental hasta modelos de mantenimiento predictivo para Industria 4.0."
      leftCardTitle="Modelos y frameworks"
      leftCardItems={[
        'TensorFlow, PyTorch y Scikit-learn',
        'Procesamiento de lenguaje natural (NLP)',
        'OpenCV para visión por computador',
        'Hugging Face para modelos preentrenados',
      ]}
      rightCardTitle="Proyectos reales"
      rightCardItems={[
        'ChatBot-MentalHealth: chatbot con IA y Flask',
        'PdM-Manager: ML para mantenimiento predictivo',
        'Pipelines de datos con Pandas y NumPy',
        'Integración de modelos en APIs y dashboards',
      ]}
      faqTitle="Preguntas sobre IA y ML"
      faq={topicFaqIa}
    />
  )
}
