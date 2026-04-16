import type { Metadata } from 'next'

import type { Media, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

type DocLike = {
  meta?: {
    title?: string | null
    description?: string | null
    image?: Media | Config['db']['defaultIDType'] | null
  } | null
  profileImage?: Media | Config['db']['defaultIDType'] | null
  name?: string | null
  title?: string | null
  slug?: string | null
}

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: DocLike | null | undefined
}): Promise<Metadata> => {
  const safeDoc = (args.doc ?? {}) as DocLike

  const ogImage = getImageURL(safeDoc.meta?.image ?? safeDoc.profileImage)

  const title =
    (safeDoc.meta?.title ?? safeDoc.name ?? safeDoc.title)
      ? `${safeDoc.meta?.title ?? safeDoc.name ?? safeDoc.title} | Payload Website Template`
      : 'Payload Website Template'

  const description = safeDoc.meta?.description ?? ''

  return {
    description,
    openGraph: mergeOpenGraph({
      description: description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: typeof safeDoc.slug === 'string' ? `/${safeDoc.slug}` : '/',
    }),
    title,
  }
}
