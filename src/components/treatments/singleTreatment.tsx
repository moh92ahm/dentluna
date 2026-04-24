'use client'

import type { Media, Treatment } from '@/payload-types'
import { Home, MessageCircle, Send, Share2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

import RichText from '@/components/RichText'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { formatDateTime } from '@/utilities/formatDateTime'
import { getMediaUrl } from '@/utilities/getMediaUrl'

interface SingleTreatmentProps {
  className?: string
  treatment: Treatment
}

type TocSection = {
  id: string
  label: string
}

const getExcerpt = (content: Treatment['content']) => {
  const children = content?.root?.children ?? []

  for (const child of children) {
    if (
      child &&
      typeof child === 'object' &&
      'children' in child &&
      Array.isArray(child.children)
    ) {
      const text = child.children
        .map((node) => {
          if (node && typeof node === 'object' && 'text' in node && typeof node.text === 'string') {
            return node.text
          }
          return ''
        })
        .join('')
        .trim()

      if (text) return text
    }
  }

  return ''
}

const getHeroImageUrl = (heroImage: Treatment['heroImage']) => {
  if (heroImage && typeof heroImage === 'object' && 'url' in heroImage) {
    return getMediaUrl(heroImage.url)
  }

  return null
}

const SingleTreatment = ({ className, treatment }: SingleTreatmentProps) => {
  const t = useTranslations('treatments')
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const heroImageUrl = getHeroImageUrl(treatment.heroImage)
  const excerpt = useMemo(() => getExcerpt(treatment.content), [treatment.content])
  const authors = treatment.populatedAuthors?.filter((author) => author?.name) ?? []
  const authorNames = authors
    .map((author) => author.name)
    .filter(Boolean)
    .join(', ')
  const pageUrl = `/treatments/${treatment.slug}`

  const sections = useMemo<TocSection[]>(() => {
    const nextSections: TocSection[] = []

    if (heroImageUrl || excerpt) {
      nextSections.push({ id: 'overview', label: 'Overview' })
    }

    if (treatment.content) {
      nextSections.push({ id: 'details', label: 'Treatment Details' })
    }

    if (treatment.relatedTreatments && treatment.relatedTreatments.length > 0) {
      nextSections.push({ id: 'related', label: 'Related Treatments' })
    }

    return nextSections
  }, [excerpt, heroImageUrl, treatment.content, treatment.relatedTreatments])

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    let observer: IntersectionObserver | null = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    })

    sections.forEach(({ id: sectionId }) => {
      const element = sectionRefs.current[sectionId]
      if (element) {
        observer?.observe(element)
      }
    })

    return () => {
      observer?.disconnect()
      observer = null
    }
  }, [sections])

  const addSectionRef = (id: string, ref: HTMLElement | null) => {
    sectionRefs.current[id] = ref
  }

  return (
    <section className={cn('py-32', className)}>
      <div className="container">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/treatments">Treatments</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{treatment.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mt-9 mb-7 max-w-3xl text-4xl font-bold md:mb-10 md:text-7xl">
          {treatment.title}
        </h1>
        <div className="flex items-center gap-3 text-sm md:text-base">
          <Avatar className="h-8 w-8 border">
            <AvatarFallback>{authorNames ? authorNames.charAt(0) : 'T'}</AvatarFallback>
          </Avatar>
          <span>
            {authorNames ? <span className="font-medium">{authorNames}</span> : null}
            {treatment.publishedAt ? (
              <span className="ml-1 text-muted-foreground">
                on {formatDateTime(treatment.publishedAt)}
              </span>
            ) : null}
          </span>
        </div>
        <div className="relative mt-12 grid max-w-7xl gap-14 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-6">
          <div className="order-2 lg:order-none lg:col-span-8">
            {(heroImageUrl || excerpt) && (
              <section
                id="overview"
                ref={(ref) => addSectionRef('overview', ref)}
                className="mb-8 scroll-mt-24"
              >
                {heroImageUrl ? (
                  <div className="relative mt-0 mb-8 aspect-video w-full overflow-hidden rounded-lg border">
                    <Image
                      src={heroImageUrl}
                      alt={treatment.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 896px"
                    />
                  </div>
                ) : null}
                {excerpt ? <p className="text-sm text-muted-foreground">{excerpt}</p> : null}
              </section>
            )}
            <section
              id="details"
              ref={(ref) => addSectionRef('details', ref)}
              className="my-8 scroll-mt-24"
            >
              <RichText data={treatment.content} />
            </section>
            {treatment.relatedTreatments && treatment.relatedTreatments.length > 0 && (
              <section
                id="related"
                ref={(ref) => addSectionRef('related', ref)}
                className="scroll-mt-24 border-t pt-10"
              >
                <h2 className="mb-6 text-2xl font-semibold">Related Treatments</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {treatment.relatedTreatments.map((relatedTreatment) => {
                    if (!relatedTreatment || typeof relatedTreatment !== 'object') {
                      return null
                    }

                    return (
                      <Link
                        key={relatedTreatment.id}
                        href={`/treatments/${relatedTreatment.slug}`}
                        className="rounded-lg border bg-card p-4 transition-colors hover:border-primary/50"
                      >
                        <h3 className="font-medium">{relatedTreatment.title}</h3>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}
          </div>
          <div className="order-1 flex h-fit flex-col text-sm lg:sticky lg:top-8 lg:order-none lg:col-span-3 lg:col-start-10 lg:text-xs">
            <div className="order-3 lg:order-none">
              <span className="text-xs font-medium">{t('onThisPage')}</span>
              <nav className="mt-2 lg:mt-4">
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className={cn(
                          'block py-1 transition-colors duration-200',
                          activeSection === section.id
                            ? 'text-muted-foreground lg:text-primary'
                            : 'text-muted-foreground hover:text-primary',
                        )}
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <Separator className="order-2 mt-8 mb-11 lg:hidden" />
            <div className="order-1 flex flex-col gap-2 lg:order-none lg:mt-9">
              <p className="font-medium text-foreground">{t('shareArticle')}</p>
              <ul className="flex gap-2">
                <li>
                  <Button asChild variant="secondary" size="icon" className="group rounded-full">
                    <a href={pageUrl}>
                      <Share2 className="h-4 w-4 text-foreground transition-colors group-hover:text-primary" />
                    </a>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="secondary" size="icon" className="group rounded-full">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(pageUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle className="h-4 w-4 text-foreground transition-colors group-hover:text-primary" />
                    </a>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="secondary" size="icon" className="group rounded-full">
                    <a
                      href={`mailto:?subject=${encodeURIComponent(treatment.title)}&body=${encodeURIComponent(pageUrl)}`}
                    >
                      <Send className="h-4 w-4 text-foreground transition-colors group-hover:text-primary" />
                    </a>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { SingleTreatment }
