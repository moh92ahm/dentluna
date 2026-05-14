import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { localeCodes } from '@/i18n/locales'

import type { Doctor } from '../../../payload-types'

const DOCTORS_LIST_PATH = '/doctors'
const DOCTORS_LIST_TAG = 'doctors_list_all'

const getLocalizedPath = (slug?: string | null, locale?: string) => {
  if (!locale) {
    return slug ? `${DOCTORS_LIST_PATH}/${slug}` : DOCTORS_LIST_PATH
  }
  return slug ? `/${locale}${DOCTORS_LIST_PATH}/${slug}` : `/${locale}${DOCTORS_LIST_PATH}`
}

const revalidateLocalizedDoctorPaths = (slug?: string | null) => {
  revalidatePath(getLocalizedPath())

  for (const locale of localeCodes) {
    revalidatePath(getLocalizedPath(slug, locale))
    if (!slug) {
      continue
    }
  }
}

const revalidateDoctorDocument = (slug?: string | null) => {
  if (!slug) {
    return
  }

  revalidateTag(`doctors_${slug}`, 'max')
  revalidateLocalizedDoctorPaths(slug)
}

export const revalidateDoctor: CollectionAfterChangeHook<Doctor> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      revalidateTag(DOCTORS_LIST_TAG, 'max')
      revalidateLocalizedDoctorPaths()

      if (doc._status === 'published') {
        const path = getLocalizedPath(doc.slug)

        payload.logger.info(`Revalidating doctor at path: ${path}`)

        revalidateDoctorDocument(doc.slug)
      }

      // If the doctor was previously published, we need to revalidate the old path
      if (previousDoc?._status === 'published' && doc._status !== 'published') {
        const oldPath = getLocalizedPath(previousDoc.slug)

        payload.logger.info(`Revalidating old doctor at path: ${oldPath}`)

        revalidateDoctorDocument(previousDoc.slug)
      }

      if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
        revalidateDoctorDocument(previousDoc.slug)
      }
    } catch (_err) {
      // revalidatePath cannot be called during SSR (e.g. autosave on Create page)
    }
  }

  return doc
}

export const revalidateDoctorDelete: CollectionAfterDeleteHook<Doctor> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag(DOCTORS_LIST_TAG, 'max')
    revalidateLocalizedDoctorPaths()
    revalidateDoctorDocument(doc?.slug)
  }

  return doc
}
