'use client'

import { cn } from '@/lib/utils'
import { Link } from '@/i18n/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CompareSlider } from '@/components/ui/CompareSlider'

export interface ComparisonItem {
  id: string
  title: string
  beforeImage: string
  afterImage: string
}

export interface GalleryTabCategory {
  id: string
  label: string
  items: ComparisonItem[]
}

interface ComparisonCardProps {
  item: ComparisonItem
}

const ComparisonCard = ({ item }: ComparisonCardProps) => (
  <div className="flex flex-col gap-3">
    <CompareSlider beforeImage={item.beforeImage} afterImage={item.afterImage} />
  </div>
)

interface BeforeAfterGalleryClientProps {
  categories: GalleryTabCategory[]
  className?: string
  activeTabId?: string
  currentPage?: number
}

const ITEMS_PER_PAGE = 9

const getGalleryHref = (tabId: string, page: number) =>
  `/gallery?tab=${encodeURIComponent(tabId)}&page=${Math.max(page, 1)}`

export const BeforeAfterGalleryClient = ({
  categories,
  className,
  activeTabId,
  currentPage = 1,
}: BeforeAfterGalleryClientProps) => {
  if (!categories || categories.length === 0) {
    return <p className="text-center text-muted-foreground">No gallery items available yet.</p>
  }

  const activeCategory = categories.find((category) => category.id === activeTabId) || categories[0]
  const totalPages = Math.max(1, Math.ceil(activeCategory.items.length / ITEMS_PER_PAGE))
  const normalizedCurrentPage = Math.min(Math.max(currentPage, 1), totalPages)
  const startIndex = (normalizedCurrentPage - 1) * ITEMS_PER_PAGE
  const paginatedItems = activeCategory.items.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className={cn('flex justify-center', className)}>
      <div className="container">
        <Tabs value={activeCategory.id}>
          <div className="flex justify-center">
            <TabsList className="flex-wrap h-auto gap-1">
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id} asChild>
                  <Link href={getGalleryHref(cat.id, 1)}>{cat.label}</Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeCategory.id} className="mt-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedItems.map((item) => (
                <ComparisonCard key={item.id} item={item} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                className="mt-8 flex items-center justify-center gap-2"
                aria-label="Gallery pagination"
              >
                <Link
                  href={getGalleryHref(activeCategory.id, normalizedCurrentPage - 1)}
                  aria-disabled={normalizedCurrentPage === 1}
                  className={cn(
                    'rounded-md border px-3 py-2 text-sm transition-colors',
                    normalizedCurrentPage === 1
                      ? 'pointer-events-none text-muted-foreground opacity-50'
                      : 'hover:bg-muted text-foreground',
                  )}
                >
                  Prev
                </Link>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <Link
                    key={pageNumber}
                    href={getGalleryHref(activeCategory.id, pageNumber)}
                    aria-current={pageNumber === normalizedCurrentPage ? 'page' : undefined}
                    className={cn(
                      'rounded-md border px-3 py-2 text-sm transition-colors',
                      pageNumber === normalizedCurrentPage
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'hover:bg-muted text-foreground',
                    )}
                  >
                    {pageNumber}
                  </Link>
                ))}

                <Link
                  href={getGalleryHref(activeCategory.id, normalizedCurrentPage + 1)}
                  aria-disabled={normalizedCurrentPage === totalPages}
                  className={cn(
                    'rounded-md border px-3 py-2 text-sm transition-colors',
                    normalizedCurrentPage === totalPages
                      ? 'pointer-events-none text-muted-foreground opacity-50'
                      : 'hover:bg-muted text-foreground',
                  )}
                >
                  Next
                </Link>
              </nav>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export { BeforeAfterGalleryClient as BeforeAfterGallery }
