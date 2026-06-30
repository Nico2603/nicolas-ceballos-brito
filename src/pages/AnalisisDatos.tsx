import ExpertiseLandingLayout from '../components/ExpertiseLandingLayout'
import { analisisDatosExpertise } from '../data/expertise/datos'

export default function AnalisisDatos() {
  return <ExpertiseLandingLayout {...analisisDatosExpertise} />
}
