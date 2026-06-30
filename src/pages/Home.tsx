import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import Footer from '../components/Footer'
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

const CurrentExperience = lazy(() => import('../components/CurrentExperience'))
const LinkedInFeed = lazy(() => import('../components/LinkedInFeed'))
const LaboresCarousel = lazy(() => import('../components/LaboresCarousel'))
const FaqSection = lazy(() => import('../components/FaqSection'))
const Contact = lazy(() => import('../components/Contact'))

const LCP_IMAGE_PRELOAD = {
  href: '/images/pic-288.webp',
  srcSet: '/images/pic-288.webp 288w, /images/pic-576.webp 576w',
  sizes: '(max-width: 768px) 224px, 288px',
}

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
          href={LCP_IMAGE_PRELOAD.href}
          type="image/webp"
          // @ts-expect-error — atributos HTML de preload de imagen LCP
          imagesrcset={LCP_IMAGE_PRELOAD.srcSet}
          imagesizes={LCP_IMAGE_PRELOAD.sizes}
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
