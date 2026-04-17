import { cn } from '@/lib/utils'
import { getCachedDocuments } from '@/utilities/getDocument'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Link } from '@/i18n/navigation'
import type { Treatment } from '@/payload-types'
import { ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface TreatmentsArchiveProps {
  className?: string
  locale?: string
}

const TreatmentsArchive = async ({ className, locale = 'en' }: TreatmentsArchiveProps) => {
  const cachedGetTreatments = getCachedDocuments('treatments', 9, 0, locale)
  const treatments = (await cachedGetTreatments()) as Treatment[]

  if (!treatments || treatments.length === 0) {
    return <p className="text-center text-muted-foreground">No treatments available yet.</p>
  }

  const getImage = (treatment: Treatment) => {
    if (
      treatment.heroImage &&
      typeof treatment.heroImage === 'object' &&
      'url' in treatment.heroImage
    ) {
      return getMediaUrl((treatment.heroImage as any).url)
    }
    return '/website-template-OG.webp'
  }

  return (
    <div className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}>
      {treatments.map((treatment) => (
        <div key={treatment.id} className="flex flex-col">
          <div className="relative">
            <img
              src={getImage(treatment)}
              alt={treatment.title}
              className="aspect-video w-full rounded-lg object-cover"
            />
            <Badge
              variant="secondary"
              className="absolute top-4 right-4 bg-background/70 px-3 py-1 text-sm backdrop-blur-sm"
            >
              Service
            </Badge>
          </div>
          <div className="flex h-full flex-col justify-between p-4">
            <h2 className="mb-5 text-xl font-semibold">{treatment.title}</h2>
            <p className="mb-5 text-sm text-muted-foreground">
              {treatment.meta?.description || 'Discover this treatment option'}
            </p>
            <div className="flex justify-between gap-6 text-sm">
              <Link
                href={`/treatments/${treatment.slug}` as any}
                className="flex items-center gap-1"
              >
                Read more
                <ChevronRight className="h-full w-3" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export { TreatmentsArchive }
