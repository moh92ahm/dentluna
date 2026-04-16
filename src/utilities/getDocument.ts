import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Collection = keyof Config['collections']

async function getDocument(collection: Collection, slug: string, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection,
    depth,
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
export const getCachedDocument = (collection: Collection, slug: string, depth = 0) => {
  if (process.env.NODE_ENV === 'development') {
    return () => getDocument(collection, slug, depth)
  }
  return unstable_cache(
    async () => getDocument(collection, slug, depth),
    [collection, slug, String(depth)],
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
async function getDocuments(collection: Collection, limit = 10, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const docs = await payload.find({
    collection,
    depth,
    limit,
    sort: '-createdAt',
    overrideAccess: false,
  })

  return docs.docs
}

/**
 * Returns a cached function for fetching multiple documents.
 * Cache is disabled in development so changes are reflected immediately.
 */
export const getCachedDocuments = (collection: Collection, limit = 10, depth = 0) => {
  if (process.env.NODE_ENV === 'development') {
    return () => getDocuments(collection, limit, depth)
  }
  return unstable_cache(
    async () => getDocuments(collection, limit, depth),
    [collection, String(limit), String(depth)],
    {
      tags: [`${collection}_list`],
    },
  )
}
