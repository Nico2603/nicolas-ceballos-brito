import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { initGoogleAnalytics, trackPageView } from '../lib/analytics'

export default function GoogleAnalytics() {
  const location = useLocation()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    void initGoogleAnalytics()
      .catch(() => undefined)
      .finally(() => setReady(true))
  }, [])

  useEffect(() => {
    if (!ready) return
    const path = `${location.pathname}${location.search}${location.hash}`
    trackPageView(path)
  }, [ready, location.pathname, location.search, location.hash])

  return null
}
