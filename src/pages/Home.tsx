import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import SeoHelmet from '../components/SeoHelmet'
import {
  SEO_HOME_DESCRIPTION,
  SEO_HOME_KEYWORDS,
  SEO_HOME_TITLE,
} from '../constants/seo-pages'
import { FALLBACK_GITHUB_STATS } from '../data/github-repos-fallback'

const CurrentExperience = lazy(() => import('../components/CurrentExperience'))
const LinkedInFeed = lazy(() => import('../components/LinkedInFeed'))
const LaboresCarousel = lazy(() => import('../components/LaboresCarousel'))
const FaqSection = lazy(() => import('../components/FaqSection'))
const Contact = lazy(() => import('../components/Contact'))
const Portfolio = lazy(() => import('../components/Portfolio'))
const RecursosSection = lazy(() => import('../components/RecursosSection'))
const Footer = lazy(() => import('../components/Footer'))

import { PROFILE_IMAGE_PRELOAD } from '../constants/lcp-image'

export default function Home() {
  return (
    <>
      <SeoHelmet
        title={SEO_HOME_TITLE}
        description={SEO_HOME_DESCRIPTION}
        canonicalPath="/"
        keywords={SEO_HOME_KEYWORDS}
      />
      <Helmet>
        <link
          rel="preload"
          as="image"
          href={PROFILE_IMAGE_PRELOAD.href}
          type="image/webp"
          // @ts-expect-error — atributos HTML de preload de imagen LCP
          imagesrcset={PROFILE_IMAGE_PRELOAD.srcSet}
          imagesizes={PROFILE_IMAGE_PRELOAD.sizes}
          fetchpriority="high"
        />
      </Helmet>
      <Hero />
      <Suspense fallback={null}>
        <CurrentExperience />
      </Suspense>
      <Suspense fallback={null}>
        <LinkedInFeed />
      </Suspense>
      <Suspense fallback={null}>
        <Portfolio staticStats={FALLBACK_GITHUB_STATS} />
      </Suspense>
      <Suspense fallback={null}>
        <LaboresCarousel />
      </Suspense>
      <Suspense fallback={null}>
        <RecursosSection />
      </Suspense>
      <Suspense fallback={null}>
        <FaqSection />
        <Contact />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}
