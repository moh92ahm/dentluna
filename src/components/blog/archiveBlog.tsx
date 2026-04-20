import { cn } from '@/lib/utils'
import { getCachedDocuments } from '@/utilities/getDocument'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Link } from '@/i18n/navigation'
import type { Post } from '@/payload-types'
import { defaultLocale } from '@/i18n/locales'

interface ArchiveBlogProps {
  className?: string
  locale?: string
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const getAuthorNames = (populatedAuthors: any[] | undefined) => {
  if (!populatedAuthors || populatedAuthors.length === 0) return 'Author'
  return populatedAuthors.map((a) => a.name).join(', ')
}

const ArchiveBlog = async ({ className, locale = defaultLocale }: ArchiveBlogProps) => {
  const cachedGetPosts = getCachedDocuments('posts', 10, 1, locale)
  const posts = (await cachedGetPosts()) as Post[]

  if (!posts || posts.length === 0) {
    return <p className="text-center text-muted-foreground">No posts available yet.</p>
  }

  const firstPost = posts[0]
  const restPosts = posts.slice(1)

  const getImage = (post: Post) => {
    if (post.heroImage && typeof post.heroImage === 'object' && 'url' in post.heroImage) {
      return getMediaUrl((post.heroImage as any).url)
    }
    return '/website-template-OG.webp'
  }

  return (
    <div className={cn('xs:grid-cols-1 grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      <div className="relative md:row-span-2 lg:col-span-2">
        <Link
          href={`/blog/${firstPost.slug}` as any}
          className="block h-fit rounded-lg p-3 md:top-0"
        >
          <img
            src={getImage(firstPost)}
            alt={firstPost.title}
            className="h-48 w-full rounded-lg object-cover hover:opacity-80 md:h-80 lg:h-96"
          />
          <div className="mt-5">
            <div className="mb-2.5 flex items-center gap-1 text-sm text-muted-foreground">
              <time>{formatDate(firstPost.publishedAt as string)}</time>·
              <span>{getAuthorNames(firstPost.populatedAuthors as any[])}</span>
            </div>
            <h3 className="text-lg md:text-3xl lg:text-4xl">{firstPost.title}</h3>
            <p className="mt-4 text-muted-foreground">
              {firstPost.meta?.description || 'Read more...'}
            </p>
          </div>
        </Link>
      </div>
      {restPosts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}` as any} className="rounded-lg p-3">
          <img
            src={getImage(post)}
            alt={post.title}
            className="h-48 w-full rounded-lg object-cover hover:opacity-80"
          />
          <div className="mt-5">
            <div className="mb-2.5 flex items-center gap-1 text-sm text-muted-foreground">
              <time>{formatDate(post.publishedAt as string)}</time>·
              <span>{getAuthorNames(post.populatedAuthors as any[])}</span>
            </div>
            <h3 className="text-lg">{post.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}

export { ArchiveBlog }
