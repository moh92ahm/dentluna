import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Treatment } from '../../../payload-types'

const TREATMENTS_LIST_PATH = '/treatments'

export const revalidatePost: CollectionAfterChangeHook<Treatment> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath(TREATMENTS_LIST_PATH)

    if (doc._status === 'published') {
      const path = `/treatments/${doc.slug}`

      payload.logger.info(`Revalidating treatment at path: ${path}`)

      revalidatePath(path)
      revalidateTag('treatments-sitemap', 'max')
    }

    // If the treatment was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/treatments/${previousDoc.slug}`

      payload.logger.info(`Revalidating old treatment at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('treatments-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Treatment> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/treatments/${doc?.slug}`

    revalidatePath(TREATMENTS_LIST_PATH)
    revalidatePath(path)
    revalidateTag('treatments-sitemap', 'max')
  }

  return doc
}
