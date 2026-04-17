import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Doctor } from '../../../payload-types'

const DOCTORS_LIST_PATH = '/doctors'

export const revalidateDoctor: CollectionAfterChangeHook<Doctor> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath(DOCTORS_LIST_PATH)

    if (doc._status === 'published') {
      const path = `/doctors/${doc.slug}`

      payload.logger.info(`Revalidating doctor at path: ${path}`)

      revalidatePath(path)
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/doctors/${previousDoc.slug}`

      payload.logger.info(`Revalidating old doctor at path: ${oldPath}`)

      revalidatePath(oldPath)
    }
  }

  return doc
}

export const revalidateDoctorDelete: CollectionAfterDeleteHook<Doctor> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/doctors/${doc?.slug}`

    revalidatePath(DOCTORS_LIST_PATH)
    revalidatePath(path)
  }

  return doc
}
