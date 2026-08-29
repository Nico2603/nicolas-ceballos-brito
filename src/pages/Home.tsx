import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import SeoHelmet from '../components/SeoHelmet'
import ViewportLazy from '../components/ViewportLazy'
import {
  SEO_HOME_DESCRIPTION,
  SEO_HOME_KEYWORDS,
  SEO_HOME_TITLE,
} from '../constants/seo-pages'

const CurrentWorkProsavis = lazy(() => import('../components/CurrentWorkProsavis'))
const CurrentExperience = lazy(() => import('../components/CurrentExperience'))
const LinkedInFeed = lazy(() => import('../components/LinkedInFeed'))
const LaboresCarousel = lazy(() => import('../components/LaboresCarousel'))
const FaqSection = lazy(() => import('../components/FaqSection'))
const Contact = lazy(() => import('../components/Contact'))
const PortfolioHubs = lazy(() => import('../components/PortfolioHubs'))
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
      <ViewportLazy minHeight="28rem">
        <Suspense fallback={null}>
          <CurrentWorkProsavis />
        </Suspense>
      </ViewportLazy>
      <ViewportLazy minHeight="28rem">
        <Suspense fallback={null}>
          <PortfolioHubs />
        </Suspense>
      </ViewportLazy>
      <ViewportLazy minHeight="24rem">
        <Suspense fallback={null}>
          <CurrentExperience />
        </Suspense>
      </ViewportLazy>
      <ViewportLazy minHeight="24rem">
        <Suspense fallback={null}>
          <LaboresCarousel />
        </Suspense>
      </ViewportLazy>
      <ViewportLazy minHeight="20rem">
        <Suspense fallback={null}>
          <LinkedInFeed />
        </Suspense>
      </ViewportLazy>
      <ViewportLazy minHeight="16rem">
        <Suspense fallback={null}>
          <RecursosSection />
        </Suspense>
      </ViewportLazy>
      <ViewportLazy minHeight="20rem">
        <Suspense fallback={null}>
          <FaqSection />
          <Contact />
        </Suspense>
      </ViewportLazy>
      <ViewportLazy minHeight="8rem">
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </ViewportLazy>
    </>
  )
}
