import { onCLS, onINP, onLCP, type Metric } from 'web-vitals'
import { trackEvent } from './analytics'

function reportMetric(metric: Metric): void {
  if (import.meta.env.DEV) {
    console.info(`[web-vitals] ${metric.name}`, {
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
    })
  }

  trackEvent('web_vitals', {
    metric_name: metric.name,
    metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    metric_rating: metric.rating,
    metric_id: metric.id,
    metric_navigation_type: metric.navigationType ?? 'unknown',
  })
}

export function initWebVitals(): void {
  onLCP(reportMetric)
  onINP(reportMetric)
  onCLS(reportMetric)
}
