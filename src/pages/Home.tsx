import Footer from '../components/Footer'
import Contact from '../components/Contact'
import CurrentExperience from '../components/CurrentExperience'
import FaqSection from '../components/FaqSection'
import Hero from '../components/Hero'
import LaboresCarousel from '../components/LaboresCarousel'
import LinkedInFeed from '../components/LinkedInFeed'
import Portfolio from '../components/Portfolio'
import RecursosSection from '../components/RecursosSection'
import SeoHelmet from '../components/SeoHelmet'
import {
  SEO_HOME_DESCRIPTION,
  SEO_HOME_KEYWORDS,
  SEO_HOME_TITLE,
} from '../constants/seo-pages'
import { buildHomeStructuredData } from '../lib/structured-data'

export default function Home() {
  return (
    <>
      <SeoHelmet
        title={SEO_HOME_TITLE}
        description={SEO_HOME_DESCRIPTION}
        canonicalPath="/"
        keywords={SEO_HOME_KEYWORDS}
        structuredData={buildHomeStructuredData()}
      />
      <Hero />
      <CurrentExperience />
      <LinkedInFeed />
      <Portfolio />
      <LaboresCarousel />
      <RecursosSection />
      <FaqSection />
      <Contact />
      <Footer />
    </>
  )
}
