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

export const generatePreviewPath = ({ collection, slug, req }: Props) => {
  // Allow empty strings, e.g. for the homepage
  if (slug === undefined || slug === null) {
    return null
  }

  // Encode to support slugs with special characters
  const encodedSlug = encodeURIComponent(slug)

  // Read locale from the Payload request context (set when admin switches locale)
  const locale = typeof req.locale === 'string' ? req.locale : defaultLocale

  const encodedParams = new URLSearchParams({
    slug: encodedSlug,
    collection,
    path: `/${locale}${collectionPrefixMap[collection]}/${encodedSlug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
