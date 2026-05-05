import { cn } from '@/lib/utils'
import { getCachedDocumentsPaginated } from '@/utilities/getDocument'
import { Link } from '@/i18n/navigation'
import type { Treatment } from '@/payload-types'
import { getTranslations } from 'next-intl/server'

import { defaultLocale } from '@/i18n/locales'
import { TreatmentCard } from './treatmentCard'

interface TreatmentsArchiveProps {
  className?: string
  locale?: string
  page?: number
}

const TreatmentsArchive = async ({
  className,
  locale = defaultLocale,
  page = 1,
}: TreatmentsArchiveProps) => {
  const t = await getTranslations({ locale, namespace: 'common' })
  const cachedGetTreatments = getCachedDocumentsPaginated('treatments', 12, page, 1, locale)
  const treatmentsResult = await cachedGetTreatments()
  const treatments = treatmentsResult.docs as Treatment[]

  if (!treatments || treatments.length === 0) {
    return <p className="text-center text-muted-foreground">{t('noTreatmentsAvailable')}</p>
  }

  return (
    <div className={cn('space-y-10', className)}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {treatments.map((treatment) => (
          <TreatmentCard
            key={treatment.id}
            treatment={treatment}
            fallbackDescription={t('treatmentArchiveFallback')}
            readMoreLabel={t('readMore')}
          />
        ))}
      </div>

      {treatmentsResult.totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2" aria-label="Treatments pagination">
          <Link
            href={`/treatments?page=${Math.max(page - 1, 1)}`}
            aria-disabled={!treatmentsResult.hasPrevPage}
            className={cn(
              'rounded-md border px-3 py-2 text-sm transition-colors',
              treatmentsResult.hasPrevPage
                ? 'hover:bg-muted text-foreground'
                : 'pointer-events-none text-muted-foreground opacity-50',
            )}
          >
            {t('paginationPrevious')}
          </Link>

          {Array.from({ length: treatmentsResult.totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <Link
                key={pageNumber}
                href={`/treatments?page=${pageNumber}`}
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
            href={`/treatments?page=${Math.min(page + 1, treatmentsResult.totalPages)}`}
            aria-disabled={!treatmentsResult.hasNextPage}
            className={cn(
              'rounded-md border px-3 py-2 text-sm transition-colors',
              treatmentsResult.hasNextPage
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

export { TreatmentsArchive }
