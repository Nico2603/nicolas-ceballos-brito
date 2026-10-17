import type { LinkedInPost } from '../types'
import { normalizeLinkedInUrl } from '../lib/normalize-linkedin-url'
import { linkedInActivity, type LinkedInActivityEntry } from './linkedin-profile'

function mentionsNicolas(item: LinkedInActivityEntry): boolean {
  const blob = `${item.title} ${item.excerpt} ${item.author ?? ''}`.toLowerCase()
  return /nicol[aá]s|ceballos|nico_ceballos|nicolas-ceballos/.test(blob)
}

function isOwnPostOrMention(item: LinkedInActivityEntry): boolean {
  switch (item.type) {
    case 'post':
      return true
    case 'like':
      return mentionsNicolas(item)
    default: {
      const _exhaustive: never = item.type
      return _exhaustive
    }
  }
}

export const linkedInPosts: LinkedInPost[] = linkedInActivity.filter(isOwnPostOrMention).map((item) => ({
  id: item.id,
  title: item.type === 'like' && item.author ? `${item.title} — ${item.author}` : item.title,
  excerpt: item.excerpt,
  publishedAt: item.publishedAt,
  imageUrl: item.imageUrl,
  postUrl: normalizeLinkedInUrl(item.url),
  featured: item.featured,
  tags: item.tags,
}))

export function getFeaturedLinkedInPost(): LinkedInPost | undefined {
  return linkedInPosts.find((post) => post.featured)
}

export function getSecondaryLinkedInPosts(): LinkedInPost[] {
  return linkedInPosts.filter((post) => !post.featured)
}
