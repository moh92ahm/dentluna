import type { Metadata } from 'next'
import type { Post } from '@/payload-types'
import { getTranslations } from 'next-intl/server'
import { SingleBlog } from '@/components/blog/singleBlog'
import { getCachedDocument } from '@/utilities/getDocument'
import { generateMeta } from '@/utilities/generateMeta'

type Props = {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const cachedGetPost = getCachedDocument('posts', slug, 0, locale)
  const post = (await cachedGetPost()) as Post
  return generateMeta({ doc: post })
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug, locale } = await params
  const t = await getTranslations({ locale, namespace: 'notFound' })

  const cachedGetPost = getCachedDocument('posts', slug, 2, locale)
  const post = (await cachedGetPost()) as Post

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
      <SingleBlog post={post} />
    </main>
  )
}
