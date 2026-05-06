import { PayloadRequest, CollectionSlug } from 'payload'
import { defaultLocale } from '@/i18n/locales'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/blog',
  treatments: '/treatments',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

/**
 * Generates a direct page URL with ?preview=1 for both:
 * - the admin "Preview" button (opens a new tab)
 * - the live preview iframe
 *
 * Using ?preview=1 tells the page to fetch draft content and render LivePreviewListener.
 */
export const generatePreviewPath = ({ collection, slug, req }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  const encodedSlug = encodeURIComponent(slug)
  const locale = typeof req.locale === 'string' ? req.locale : defaultLocale
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const path = `/${locale}${collectionPrefixMap[collection]}/${encodedSlug}`

  return `${serverURL}${path}?preview=1`
}

// Alias — livePreview.url and admin.preview both use the same direct URL
export const generateLivePreviewURL = generatePreviewPath
