import { cn } from '@/lib/utils'
import { getCachedDocumentsPaginated } from '@/utilities/getDocument'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Link } from '@/i18n/navigation'
import type { Post } from '@/payload-types'
import Image from 'next/image'
import { defaultLocale } from '@/i18n/locales'
import { getTranslations } from 'next-intl/server'

interface ArchiveBlogProps {
  className?: string
  locale?: string
  page?: number
}

type RichTextNode = {
  type?: string
  text?: string
  children?: RichTextNode[]
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const getAuthorNames = (populatedAuthors: unknown) => {
  if (!Array.isArray(populatedAuthors) || populatedAuthors.length === 0) {
    return 'Author'
  }

  const names = populatedAuthors
    .map((author) => {
      if (!author || typeof author !== 'object' || !('name' in author)) {
        return null
      }

      const { name } = author as { name?: unknown }
      return typeof name === 'string' ? name : null
    })
    .filter((name): name is string => Boolean(name))

  return names.length > 0 ? names.join(', ') : 'Author'
}

const getNodeText = (node: RichTextNode): string => {
  if (node.type === 'text') {
    return node.text ?? ''
  }

  if (!node.children || node.children.length === 0) {
    return ''
  }

  return node.children.map(getNodeText).join('')
}

const getFirstParagraphExcerpt = (content: Post['content'], maxLength = 100): string => {
  const children = content?.root?.children
  if (!Array.isArray(children)) {
    return ''
  }

  const firstParagraph = children.find(
    (node) =>
      Boolean(node) && typeof node === 'object' && (node as { type?: string }).type === 'paragraph',
  ) as RichTextNode | undefined

  if (!firstParagraph) {
    return ''
  }

  const plainText = getNodeText(firstParagraph).replace(/\s+/g, ' ').trim()
  if (!plainText) {
    return ''
  }

  if (plainText.length <= maxLength) {
    return plainText
  }

  return `${plainText.slice(0, maxLength).trimEnd()}...`
}

const ArchiveBlog = async ({ className, locale = defaultLocale, page = 1 }: ArchiveBlogProps) => {
  const t = await getTranslations({ locale, namespace: 'common' })
  const cachedGetPosts = getCachedDocumentsPaginated('posts', 10, page, 1, locale)
  const postsResult = await cachedGetPosts()
  const posts = postsResult.docs as Post[]

  if (!posts || posts.length === 0) {
    return <p className="text-center text-muted-foreground">No posts available yet.</p>
  }

  const firstPost = posts[0]
  const restPosts = posts.slice(1)
  const firstPostExcerpt = getFirstParagraphExcerpt(firstPost.content)

  const getImage = (post: Post) => {
    if (post.heroImage && typeof post.heroImage === 'object' && 'url' in post.heroImage) {
      return getMediaUrl((post.heroImage as { url?: string }).url || '')
    }
    return 'https://placehold.net/default.png'
  }

  return (
    <div className={cn('space-y-8', className)}>
      <div className="xs:grid-cols-1 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative md:row-span-2 lg:col-span-2">
          <Link href={`/blog/${firstPost.slug}`} className="block h-fit rounded-lg p-3 md:top-0">
            <div className="relative h-48 w-full overflow-hidden rounded-lg md:h-80 lg:h-96">
              <Image
                src={getImage(firstPost)}
                alt={firstPost.title}
                fill
                className="object-cover hover:opacity-80"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="mt-5">
              <div className="mb-2.5 flex items-center gap-1 text-sm text-muted-foreground">
                <time>{formatDate(firstPost.publishedAt as string)}</time>·
                <span>{getAuthorNames(firstPost.populatedAuthors)}</span>
              </div>
              <h3 className="text-lg md:text-3xl lg:text-4xl">{firstPost.title}</h3>
              <p className="mt-4 text-muted-foreground">{firstPostExcerpt || 'Read more...'}</p>
            </div>
          </Link>
        </div>
        {restPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="rounded-lg p-3">
            <div className="relative h-48 w-full overflow-hidden rounded-lg">
              <Image
                src={getImage(post)}
                alt={post.title}
                fill
                className="object-cover hover:opacity-80"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="mt-5">
              <div className="mb-2.5 flex items-center gap-1 text-sm text-muted-foreground">
                <time>{formatDate(post.publishedAt as string)}</time>·
                <span>{getAuthorNames(post.populatedAuthors)}</span>
              </div>
              <h3 className="text-lg">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      {postsResult.totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2" aria-label="Blog pagination">
          <Link
            href={`/blog?page=${Math.max(page - 1, 1)}`}
            aria-disabled={!postsResult.hasPrevPage}
            className={cn(
              'rounded-md border px-3 py-2 text-sm transition-colors',
              postsResult.hasPrevPage
                ? 'hover:bg-muted text-foreground'
                : 'pointer-events-none text-muted-foreground opacity-50',
            )}
          >
            {t('paginationPrevious')}
          </Link>

          {Array.from({ length: postsResult.totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <Link
                key={pageNumber}
                href={`/blog?page=${pageNumber}`}
                aria-current={pageNumber === page ? 'page' : undefined}
                className={cn(
                  'rounded-md border px-3 py-2 text-sm transition-colors',
                  pageNumber === page
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'hover:bg-muted text-foreground',
                )}
              >
                {pageNumber}
              </Link>
            ),
          )}

          <Link
            href={`/blog?page=${Math.min(page + 1, postsResult.totalPages)}`}
            aria-disabled={!postsResult.hasNextPage}
            className={cn(
              'rounded-md border px-3 py-2 text-sm transition-colors',
              postsResult.hasNextPage
                ? 'hover:bg-muted text-foreground'
                : 'pointer-events-none text-muted-foreground opacity-50',
            )}
          >
            {t('paginationNext')}
          </Link>
        </nav>
      )}
    </div>
  )
}

export { ArchiveBlog }
