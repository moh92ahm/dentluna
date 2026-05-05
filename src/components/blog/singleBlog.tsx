import type { Post } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

import RichText from '@/components/RichText'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { formatDateTime } from '@/utilities/formatDateTime'
import { getMediaUrl } from '@/utilities/getMediaUrl'

interface SingleBlogProps {
  className?: string
  post: Post
}

const getHeroImageUrl = (heroImage: Post['heroImage']) => {
  if (heroImage && typeof heroImage === 'object' && 'url' in heroImage) {
    return getMediaUrl(heroImage.url)
  }

  return null
}

const getRelatedPostImageUrl = (relatedPost: Post) => getHeroImageUrl(relatedPost.heroImage)

const SingleBlog = ({ className, post }: SingleBlogProps) => {
  const heroImageUrl = getHeroImageUrl(post.heroImage)
  const authorNames =
    post.populatedAuthors
      ?.map((author) => author.name)
      .filter(Boolean)
      .join(', ') || 'Dent Luna'

  return (
    <section className={cn('py-32', className)}>
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          <h1 className="max-w-3xl text-5xl font-semibold text-pretty md:text-6xl">{post.title}</h1>
          <div className="flex flex-col items-center gap-1 text-sm md:flex-row md:gap-2 md:text-base">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border">
                <AvatarFallback>{authorNames.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-semibold">{authorNames}</span>
            </div>
            {post.publishedAt ? (
              <span className="text-muted-foreground">
                Published on {formatDateTime(post.publishedAt)}
              </span>
            ) : null}
          </div>
          {heroImageUrl ? (
            <div className="relative mt-4 mb-8 aspect-video w-full overflow-hidden rounded-lg border">
              <Image
                src={heroImageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <RichText data={post.content} />

          {post.relatedPosts && post.relatedPosts.length > 0 ? (
            <section className="mt-16 border-t pt-16">
              <h2 className="mb-8 text-3xl font-medium">Related Posts</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {post.relatedPosts.slice(0, 2).map((relatedPost) => {
                  if (!relatedPost || typeof relatedPost !== 'object' || !relatedPost.slug) {
                    return null
                  }

                  const relatedImageUrl = getRelatedPostImageUrl(relatedPost)

                  return (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="overflow-hidden rounded-lg border bg-muted/40 transition-colors hover:shadow-lg"
                    >
                      <div className="relative aspect-video w-full bg-muted">
                        {relatedImageUrl ? (
                          <Image
                            src={relatedImageUrl}
                            alt={relatedPost.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        ) : null}
                      </div>
                      <h3 className="p-4 text-lg font-medium">{relatedPost.title}</h3>
                    </Link>
                  )
                })}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export { SingleBlog }
