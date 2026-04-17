import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, TypeWithID } from 'payload'

import { revalidatePath } from 'next/cache'

const FAQ_PATH = '/faq'

const revalidateFaqPath = (log: (message: string) => void) => {
  log(`Revalidating FAQ page at path: ${FAQ_PATH}`)
  revalidatePath(FAQ_PATH)
}

export const revalidateFaqPageAfterChange: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    revalidateFaqPath(payload.logger.info)
  }

  return doc
}

export const revalidateFaqPageAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    revalidateFaqPath(payload.logger.info)
  }

  return doc as TypeWithID
}
