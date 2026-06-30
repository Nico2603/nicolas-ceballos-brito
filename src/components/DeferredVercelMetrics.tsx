import { useEffect, useState, type ComponentType } from 'react'

export default function DeferredVercelMetrics() {
  const [Analytics, setAnalytics] = useState<ComponentType | null>(null)
  const [SpeedInsights, setSpeedInsights] = useState<ComponentType | null>(null)

  useEffect(() => {
    const load = () => {
      void Promise.all([
        import('@vercel/analytics/react'),
        import('@vercel/speed-insights/react'),
      ]).then(([analyticsMod, speedMod]) => {
        setAnalytics(() => analyticsMod.Analytics)
        setSpeedInsights(() => speedMod.SpeedInsights)
      })
    }

    if (document.readyState === 'complete') {
      load()
      return
    }

    window.addEventListener('load', load, { once: true })
    return () => window.removeEventListener('load', load)
  }, [])

  return (
    <>
      {Analytics ? <Analytics /> : null}
      {SpeedInsights ? <SpeedInsights /> : null}
    </>
  )
}
