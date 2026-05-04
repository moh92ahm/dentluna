import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { localeCodes } from '@/i18n/locales'

import type { Treatment } from '../../../payload-types'

const TREATMENTS_LIST_PATH = '/treatments'
const TREATMENTS_LIST_TAG = 'treatments_list'
const TREATMENTS_SITEMAP_TAG = 'treatments-sitemap'

const getLocalizedPath = (slug?: string | null, locale?: string) => {
  if (!locale) {
    return slug ? `${TREATMENTS_LIST_PATH}/${slug}` : TREATMENTS_LIST_PATH
  }

  return slug ? `/${locale}${TREATMENTS_LIST_PATH}/${slug}` : `/${locale}${TREATMENTS_LIST_PATH}`
}

const revalidateLocalizedTreatmentPaths = (slug?: string | null) => {
  revalidatePath(getLocalizedPath())

  for (const locale of localeCodes) {
    revalidatePath(getLocalizedPath(slug, locale))
    if (!slug) {
      continue
    }
  }
}

const revalidateTreatmentDocument = (slug?: string | null) => {
  if (!slug) {
    return
  }

  revalidateTag(`treatments_${slug}`, 'max')
  revalidateLocalizedTreatmentPaths(slug)
}

export const revalidatePost: CollectionAfterChangeHook<Treatment> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      revalidateTag(TREATMENTS_LIST_TAG, 'max')
      revalidateLocalizedTreatmentPaths()

      if (doc._status === 'published') {
        const path = getLocalizedPath(doc.slug)

        payload.logger.info(`Revalidating treatment at path: ${path}`)

        revalidateTreatmentDocument(doc.slug)
        revalidateTag(TREATMENTS_SITEMAP_TAG, 'max')
      }

      // If the treatment was previously published, we need to revalidate the old path
      if (previousDoc._status === 'published' && doc._status !== 'published') {
        const oldPath = getLocalizedPath(previousDoc.slug)

        payload.logger.info(`Revalidating old treatment at path: ${oldPath}`)

        revalidateTreatmentDocument(previousDoc.slug)
        revalidateTag(TREATMENTS_SITEMAP_TAG, 'max')
      }

      if (previousDoc.slug && previousDoc.slug !== doc.slug) {
        revalidateTreatmentDocument(previousDoc.slug)
      }
    } catch (_err) {
      // revalidatePath cannot be called during SSR (e.g. autosave on Create page)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Treatment> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag(TREATMENTS_LIST_TAG, 'max')
    revalidateLocalizedTreatmentPaths()
    revalidateTreatmentDocument(doc?.slug)
    revalidateTag(TREATMENTS_SITEMAP_TAG, 'max')
  }

  return doc
}
