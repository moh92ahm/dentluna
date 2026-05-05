import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { localeCodes } from '@/i18n/locales'

import type { Post } from '../../../payload-types'

const BLOG_LIST_PATH = '/blog'
const POSTS_LIST_TAG = 'posts_list'
const POSTS_SITEMAP_TAG = 'posts-sitemap'

const getLocalizedPath = (slug?: string | null, locale?: string) => {
  if (!locale) {
    return slug ? `${BLOG_LIST_PATH}/${slug}` : BLOG_LIST_PATH
  }

  return slug ? `/${locale}${BLOG_LIST_PATH}/${slug}` : `/${locale}${BLOG_LIST_PATH}`
}

const revalidateLocalizedBlogPaths = (slug?: string | null) => {
  revalidatePath(getLocalizedPath())

  for (const locale of localeCodes) {
    revalidatePath(getLocalizedPath(slug, locale))
    if (!slug) {
      continue
    }
  }
}

const revalidatePostDocument = (slug?: string | null) => {
  if (!slug) {
    return
  }

  revalidateTag(`posts_${slug}`, 'max')
  revalidateLocalizedBlogPaths(slug)
}

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      revalidateTag(POSTS_LIST_TAG, 'max')
      revalidateLocalizedBlogPaths()

      if (doc._status === 'published') {
        const path = getLocalizedPath(doc.slug)

        payload.logger.info(`Revalidating post at path: ${path}`)

        revalidatePostDocument(doc.slug)
        revalidateTag(POSTS_SITEMAP_TAG, 'max')
      }

      // If the post was previously published, we need to revalidate the old path
      if (previousDoc._status === 'published' && doc._status !== 'published') {
        const oldPath = getLocalizedPath(previousDoc.slug)

        payload.logger.info(`Revalidating old post at path: ${oldPath}`)

        revalidatePostDocument(previousDoc.slug)
        revalidateTag(POSTS_SITEMAP_TAG, 'max')
      }

      if (previousDoc.slug && previousDoc.slug !== doc.slug) {
        revalidatePostDocument(previousDoc.slug)
      }
    } catch (_err) {
      // revalidatePath cannot be called during SSR (e.g. autosave on Create page)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag(POSTS_LIST_TAG, 'max')
    revalidateLocalizedBlogPaths()
    revalidatePostDocument(doc?.slug)
    revalidateTag(POSTS_SITEMAP_TAG, 'max')
  }

  return doc
}
