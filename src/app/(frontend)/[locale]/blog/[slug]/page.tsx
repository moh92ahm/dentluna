import type { Metadata } from 'next'
import type { Post } from '@/payload-types'
import { getTranslations } from 'next-intl/server'
import { SingleBlog } from '@/components/blog/singleBlog'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getCachedDocument, getDraftDocument } from '@/utilities/getDocument'
import { generateMeta } from '@/utilities/generateMeta'

type Props = {
  params: Promise<{ slug: string; locale: string }>
  searchParams: Promise<{ preview?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const cachedGetPost = getCachedDocument('posts', slug, 0, locale)
  const post = (await cachedGetPost()) as Post
  return generateMeta({ doc: post })
}

export default async function BlogDetailPage({ params, searchParams }: Props) {
  const { slug, locale } = await params
  const { preview } = await searchParams
  const isPreview = preview === '1'
  const t = await getTranslations({ locale, namespace: 'notFound' })

  const post = isPreview
    ? ((await getDraftDocument('posts', slug, 2, locale)) as Post)
    : ((await getCachedDocument('posts', slug, 2, locale)()) as Post)

  if (!post) {
    return (
      <main>
        <section className="py-32">
          <div className="container">
            <h1 className="text-4xl font-medium">{t('post')}</h1>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      {isPreview && <LivePreviewListener />}
      <SingleBlog post={post} />
    </main>
  )
}
