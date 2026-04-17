import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, TypeWithID } from 'payload'

import { revalidatePath } from 'next/cache'

const GALLERY_PATH = '/gallery'

const revalidateGalleryPath = (log: (message: string) => void) => {
  try {
    log(`Revalidating gallery page at path: ${GALLERY_PATH}`)
    revalidatePath(GALLERY_PATH)
  } catch (_err) {
    // revalidatePath cannot be called during SSR
  }
}

export const revalidateGalleryPageAfterChange: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    revalidateGalleryPath(payload.logger.info)
  }

  return doc
}

export const revalidateGalleryPageAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    revalidateGalleryPath(payload.logger.info)
  }

  return doc as TypeWithID
}
