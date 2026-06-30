import type { LinkedInPost } from '../types'
import { normalizeLinkedInUrl } from '../lib/normalize-linkedin-url'
import { linkedInActivity } from './linkedin-profile'

export const linkedInPosts: LinkedInPost[] = linkedInActivity.map((item) => ({
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
