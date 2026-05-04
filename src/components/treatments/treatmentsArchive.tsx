import { cn } from '@/lib/utils'
import { getCachedDocuments } from '@/utilities/getDocument'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Link } from '@/i18n/navigation'
import type { Treatment } from '@/payload-types'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { defaultLocale } from '@/i18n/locales'

interface TreatmentsArchiveProps {
  className?: string
  locale?: string
}

const TreatmentsArchive = async ({ className, locale = defaultLocale }: TreatmentsArchiveProps) => {
  const t = await getTranslations({ locale, namespace: 'common' })
  const cachedGetTreatments = getCachedDocuments('treatments', 12, 1, locale)
  const treatments = (await cachedGetTreatments()) as Treatment[]

  if (!treatments || treatments.length === 0) {
    return <p className="text-center text-muted-foreground">{t('noTreatmentsAvailable')}</p>
  }

  const getImage = (treatment: Treatment) => {
    if (
      treatment.heroImage &&
      typeof treatment.heroImage === 'object' &&
      'url' in treatment.heroImage
    ) {
      return getMediaUrl((treatment.heroImage as { url: string }).url)
    }
    return 'https://placehold.net/default.png'
  }

  return (
    <div className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}>
      {treatments.map((treatment) => (
        <Link
          key={treatment.id}
          href={`/treatments/${treatment.slug}`}
          className="flex flex-col border rounded-lg bg-muted/50 transition-all hover:shadow-lg"
        >
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={getImage(treatment)}
              alt={treatment.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-col justify-between gap-4 p-4">
            <h2 className="text-xl font-semibold">{treatment.title}</h2>
            <p className="text-sm text-muted-foreground">
              {treatment.excerpt || treatment.meta?.description || t('treatmentArchiveFallback')}
            </p>
            <div className="flex justify-between gap-6 text-sm">
              <span className="flex items-center gap-1 text-primary font-medium hover:underline">
                {t('readMore')}
                <ChevronRight className="h-full w-3" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export { TreatmentsArchive }
