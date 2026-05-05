import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

import { Link } from '@/i18n/navigation'
import type { Treatment } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

import { cn } from '@/lib/utils'

interface TreatmentCardProps {
  treatment: Pick<Treatment, 'id' | 'title' | 'slug' | 'excerpt' | 'heroImage' | 'meta'>
  className?: string
  fallbackDescription?: string
  titleTag?: 'h2' | 'h3'
  showReadMore?: boolean
  readMoreLabel?: string
}

const getImageUrl = (treatment: TreatmentCardProps['treatment']) => {
  if (treatment.heroImage && typeof treatment.heroImage === 'object' && 'url' in treatment.heroImage) {
    return getMediaUrl(treatment.heroImage.url)
  }

  return 'https://placehold.net/default.png'
}

const TreatmentCard = ({
  treatment,
  className,
  fallbackDescription,
  titleTag = 'h2',
  showReadMore = true,
  readMoreLabel,
}: TreatmentCardProps) => {
  const Title = titleTag
  const description = treatment.excerpt || treatment.meta?.description || fallbackDescription

  return (
    <Link
      href={`/treatments/${treatment.slug}`}
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-lg border bg-muted/50 transition-all hover:shadow-lg',
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        <Image
          src={getImageUrl(treatment)}
          alt={treatment.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div className="space-y-3">
          <Title className="text-xl font-semibold">{treatment.title}</Title>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {showReadMore && readMoreLabel ? (
          <div className="flex justify-between gap-6 text-sm">
            <span className="flex items-center gap-1 font-medium text-primary hover:underline">
              {readMoreLabel}
              <ChevronRight className="h-full w-3" />
            </span>
          </div>
        ) : null}
      </div>
    </Link>
  )
}

export { TreatmentCard }