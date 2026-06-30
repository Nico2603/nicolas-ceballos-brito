export const PROFILE_IMAGE = {
  src: '/images/pic-288.webp',
  srcSet: '/images/pic-224.webp 224w, /images/pic-288.webp 288w, /images/pic-576.webp 576w',
  sizes: '(max-width: 768px) 14rem, 18rem',
  width: 288,
  height: 288,
} as const

export const PROFILE_IMAGE_PRELOAD = {
  href: PROFILE_IMAGE.src,
  srcSet: PROFILE_IMAGE.srcSet,
  sizes: PROFILE_IMAGE.sizes,
} as const

export function carouselImageSources(basePath: string) {
  const fileName = basePath.replace(/^\/images\//, '').replace(/\.webp$/, '')
  return {
    src: `/images/${fileName}-640.webp`,
    srcSet: `/images/${fileName}-640.webp 640w, ${basePath} 960w`,
    sizes: '(max-width: 768px) 100vw, 640px',
  }
}
