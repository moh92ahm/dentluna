import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { defaultLocale } from '@/i18n/locales'

type Collection = keyof Config['collections']
type LocaleCode = Config['locale'] | 'all'

async function getDocument(
  collection: Collection,
  slug: string,
  depth = 0,
  locale = defaultLocale,
) {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection,
    depth,
    locale: locale as LocaleCode,
    overrideAccess: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return page.docs[0]
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug.
 * Cache is disabled in development so changes are reflected immediately.
 */
export const getCachedDocument = (
  collection: Collection,
  slug: string,
  depth = 0,
  locale = defaultLocale,
) => {
  if (process.env.NODE_ENV === 'development') {
    return () => getDocument(collection, slug, depth, locale)
  }
  return unstable_cache(
    async () => getDocument(collection, slug, depth, locale),
    [collection, slug, String(depth), locale],
    {
      tags: [`${collection}_${slug}`],
    },
  )
}

/**
 * Fetch multiple documents from a collection.
 * Access control is enforced via overrideAccess: false — the collection's
 * own access function handles published-only filtering for unauthenticated requests.
 */
async function getDocuments(collection: Collection, limit = 10, depth = 0, locale = defaultLocale) {
  const payload = await getPayload({ config: configPromise })

  const docs = await payload.find({
    collection,
    depth,
    limit,
    locale: locale as LocaleCode,
    sort: '-createdAt',
    overrideAccess: false,
  })

  return docs.docs
}

async function getDocumentsPaginated(
  collection: Collection,
  limit = 10,
  page = 1,
  depth = 0,
  locale = defaultLocale,
) {
  const payload = await getPayload({ config: configPromise })

  return payload.find({
    collection,
    depth,
    limit,
    page,
    locale: locale as LocaleCode,
    sort: '-createdAt',
    overrideAccess: false,
  })
}

async function getAllDocuments(collection: Collection, depth = 0, locale = defaultLocale) {
  const pageSize = 100
  const firstPage = await getDocumentsPaginated(collection, pageSize, 1, depth, locale)

  if (firstPage.totalPages <= 1) {
    return firstPage.docs
  }

  const remainingPages = await Promise.all(
    Array.from({ length: firstPage.totalPages - 1 }, (_, index) =>
      getDocumentsPaginated(collection, pageSize, index + 2, depth, locale),
    ),
  )

  return [firstPage.docs, ...remainingPages.map((page) => page.docs)].flat()
}

/**
 * Returns a cached function for fetching multiple documents.
 * Cache is disabled in development so changes are reflected immediately.
 */
export const getCachedDocuments = (
  collection: Collection,
  limit = 10,
  depth = 0,
  locale = defaultLocale,
) => {
  if (process.env.NODE_ENV === 'development') {
    return () => getDocuments(collection, limit, depth, locale)
  }
  return unstable_cache(
    async () => getDocuments(collection, limit, depth, locale),
    [collection, String(limit), String(depth), locale],
    {
      tags: [`${collection}_list`],
    },
  )
}

/**
 * Returns a cached function for fetching paginated documents.
 * Cache is disabled in development so changes are reflected immediately.
 */
export const getCachedDocumentsPaginated = (
  collection: Collection,
  limit = 10,
  page = 1,
  depth = 0,
  locale = defaultLocale,
) => {
  if (process.env.NODE_ENV === 'development') {
    return () => getDocumentsPaginated(collection, limit, page, depth, locale)
  }

  return unstable_cache(
    async () => getDocumentsPaginated(collection, limit, page, depth, locale),
    [collection, String(limit), String(page), String(depth), locale],
    {
      tags: [`${collection}_list`, `${collection}_list_page_${page}`],
    },
  )
}

/**
 * Returns a cached function for fetching all documents from a collection.
 * Cache is disabled in development so changes are reflected immediately.
 */
export const getCachedAllDocuments = (
  collection: Collection,
  depth = 0,
  locale = defaultLocale,
) => {
  if (process.env.NODE_ENV === 'development') {
    return () => getAllDocuments(collection, depth, locale)
  }

  return unstable_cache(
    async () => getAllDocuments(collection, depth, locale),
    [collection, 'all', String(depth), locale],
    {
      tags: [`${collection}_list_all`],
    },
  )
}
