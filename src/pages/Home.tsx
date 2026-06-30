import Footer from '../components/Footer'
import Contact from '../components/Contact'
import Hero from '../components/Hero'
import LaboresCarousel from '../components/LaboresCarousel'
import Portfolio from '../components/Portfolio'
import SeoHelmet from '../components/SeoHelmet'
import { SEO_DEFAULT_DESCRIPTION } from '../constants/seo'
import { FULL_NAME } from '../constants/social'

export default function Home() {
  return (
    <>
      <SeoHelmet
        title={`${FULL_NAME} — Portafolio Profesional`}
        description={SEO_DEFAULT_DESCRIPTION}
        canonicalPath="/"
      />
      <Hero />
      <Portfolio />
      <LaboresCarousel />
      <Contact />
      <Footer />
    </>
  )
}
