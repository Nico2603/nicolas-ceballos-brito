export const PAGE_SCROLLER_ATTR = 'data-page-scroller'

export function getPageScroller(): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[${PAGE_SCROLLER_ATTR}]`)
}

export function getPageScrollY(): number {
  const scroller = getPageScroller()
  return scroller ? scroller.scrollTop : window.scrollY
}

export function subscribePageScroll(onScroll: () => void): () => void {
  const scroller = getPageScroller()
  const target: EventTarget = scroller ?? window
  target.addEventListener('scroll', onScroll, { passive: true })
  return () => target.removeEventListener('scroll', onScroll)
}
