export interface ContentImage {
  src: string
  alt: string
  caption: string
  sourceUrl: string
  sourceLabel?: string
}

export interface NarrativeSection {
  heading: string
  paragraphs: string[]
  image?: ContentImage
}
