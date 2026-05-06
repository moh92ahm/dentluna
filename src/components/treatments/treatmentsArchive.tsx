import { cn } from '@/lib/utils'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Link } from '@/i18n/navigation'
import type { Config, Treatment, TreatmentCategory } from '@/payload-types'
import { getTranslations } from 'next-intl/server'

import { defaultLocale } from '@/i18n/locales'
import { TreatmentCard } from './treatmentCard'
import { TreatmentCategoryTabs } from './treatmentCategoryTabs'

interface TreatmentsArchiveProps {
  className?: string
  locale?: string
  page?: number
  category?: string
}

type LocaleCode = Config['locale'] | 'all'

const TreatmentsArchive = async ({
  className,
  locale = defaultLocale,
  page = 1,
  category,
}: TreatmentsArchiveProps) => {
  const t = await getTranslations({ locale, namespace: 'common' })
  const tTreatments = await getTranslations({ locale, namespace: 'treatments' })
  const payload = await getPayload({ config: configPromise })

  const categoriesResult = await payload.find({
    collection: 'treatment-categories',
    depth: 0,
    limit: 100,
    locale: locale as LocaleCode,
    overrideAccess: false,
    sort: 'title',
  })

  const categories = categoriesResult.docs as TreatmentCategory[]
  const selectedCategory = categories.find((item) => item.slug === category)

  const treatmentsResult = await payload.find({
    collection: 'treatments',
    depth: 1,
    limit: 12,
    page,
    locale: locale as LocaleCode,
    overrideAccess: false,
    sort: '-createdAt',
    where: selectedCategory
      ? {
          categories: {
            in: [selectedCategory.id],
          },
        }
      : undefined,
  })

  const treatments = treatmentsResult.docs as Treatment[]

  const getTreatmentsHref = (targetPage: number, targetCategory?: string) => {
    const params = new URLSearchParams()

    if (targetCategory) {
      params.set('category', targetCategory)
    }

    if (targetPage > 1) {
      params.set('page', String(targetPage))
    }

    const query = params.toString()
    return query ? `/treatments?${query}` : '/treatments'
  }

  const tabsBlock = (
    <TreatmentCategoryTabs
      categories={categories}
      selectedValue={selectedCategory ? String(selectedCategory.id) : 'all'}
      allLabel={tTreatments('allCategories')}
    />
  )

  if (!treatments || treatments.length === 0) {
    return (
      <div className={cn('space-y-8', className)}>
        {tabsBlock}
        <p className="text-center text-muted-foreground">
          {selectedCategory
            ? tTreatments('noTreatmentsInCategory')
            : tTreatments('noTreatmentsAvailable')}
        </p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-8', className)}>
      {tabsBlock}

      <div className="space-y-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {treatments.map((treatment) => (
            <TreatmentCard
              key={treatment.id}
              treatment={treatment}
              fallbackDescription={tTreatments('treatmentArchiveFallback')}
              readMoreLabel={tTreatments('readMore')}
            />
          ))}
        </div>

        {treatmentsResult.totalPages > 1 && (
          <nav
            className="flex items-center justify-center gap-2"
            aria-label="Treatments pagination"
          >
            <Link
              href={getTreatmentsHref(Math.max(page - 1, 1), selectedCategory?.slug)}
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
                  href={getTreatmentsHref(pageNumber, selectedCategory?.slug)}
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
              href={getTreatmentsHref(
                Math.min(page + 1, treatmentsResult.totalPages),
                selectedCategory?.slug,
              )}
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
    </div>
  )
}

export { TreatmentsArchive }
