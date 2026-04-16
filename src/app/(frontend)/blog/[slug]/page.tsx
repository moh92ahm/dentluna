import type { Metadata } from 'next'
import type { Post } from '@/payload-types'
import { SingleBlog } from '@/components/blog/singleBlog'
import { getCachedDocument } from '@/utilities/getDocument'
import { generateMeta } from '@/utilities/generateMeta'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cachedGetPost = getCachedDocument('posts', slug, 0)
  const post = (await cachedGetPost()) as Post
  return generateMeta({ doc: post })
}

export default async function BlogDetailPage(props: Props) {
  const { slug } = await props.params

  const cachedGetPost = getCachedDocument('posts', slug, 2)
  const post = (await cachedGetPost()) as Post

  if (!post) {
    return (
      <main>
        <section className="py-32">
          <div className="container">
            <h1 className="text-4xl font-medium">Post not found</h1>
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
