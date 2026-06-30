import { lazy, Suspense } from 'react'
import Footer from '../components/Footer'
import CurrentExperience from '../components/CurrentExperience'
import Hero from '../components/Hero'
import Portfolio from '../components/Portfolio'
import RecursosSection from '../components/RecursosSection'
import SeoHelmet from '../components/SeoHelmet'
import {
  SEO_HOME_DESCRIPTION,
  SEO_HOME_KEYWORDS,
  SEO_HOME_TITLE,
} from '../constants/seo-pages'
import { FALLBACK_GITHUB_STATS } from '../data/github-repos-fallback'

const LinkedInFeed = lazy(() => import('../components/LinkedInFeed'))
const LaboresCarousel = lazy(() => import('../components/LaboresCarousel'))
const FaqSection = lazy(() => import('../components/FaqSection'))
const Contact = lazy(() => import('../components/Contact'))

export default function Home() {
  return (
    <>
      <SeoHelmet
        title={SEO_HOME_TITLE}
        description={SEO_HOME_DESCRIPTION}
        canonicalPath="/"
        keywords={SEO_HOME_KEYWORDS}
      />
      <Hero />
      <CurrentExperience />
      <Suspense fallback={null}>
        <LinkedInFeed />
      </Suspense>
      <Portfolio staticStats={FALLBACK_GITHUB_STATS} />
      <Suspense fallback={null}>
        <LaboresCarousel />
      </Suspense>
      <RecursosSection />
      <Suspense fallback={null}>
        <FaqSection />
        <Contact />
      </Suspense>
      <Footer />
    </>
  )
}
