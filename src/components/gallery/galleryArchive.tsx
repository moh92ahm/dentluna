import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Gallery, GalleryCategory } from '@/payload-types'
import { BeforeAfterGallery } from './beforeAfterGallery'
import type { ComparisonItem, GalleryTabCategory } from './beforeAfterGallery'
import { defaultLocale } from '@/i18n/locales'

interface GalleryArchiveProps {
  className?: string
  locale?: string
}

export const GalleryArchive = async ({
  className,
  locale = defaultLocale,
}: GalleryArchiveProps) => {
  const payload = await getPayload({ config: configPromise })

  // Fetch all gallery items and categories
  const [galleryResponse, categoriesResponse] = await Promise.all([
    payload.find({
      collection: 'gallery',
      depth: 1,
      limit: 100,
      overrideAccess: false,
      sort: 'createdAt',
      locale: locale as any,
    }),
    payload.find({
      collection: 'gallery-category',
      limit: 100,
      overrideAccess: false,
      sort: 'createdAt',
      locale: locale as any,
    }),
  ])

  const galleryItems = (galleryResponse.docs || []) as Gallery[]
  const categories = (categoriesResponse.docs || []) as GalleryCategory[]

  const getImageUrl = (image: any) => {
    if (image && typeof image === 'object' && 'url' in image) {
      return getMediaUrl((image as any).url)
    }
    return '/website-template-OG.webp'
  }

  // Build comparison items
  const allItems: ComparisonItem[] = galleryItems
    .filter((item) => item.beforeImage && item.afterImage)
    .map((item) => ({
      id: String(item.id),
      title: item.title,
      beforeImage: getImageUrl(item.beforeImage),
      afterImage: getImageUrl(item.afterImage),
    }))

  // Group items by category
  const categoryMap = new Map<string, ComparisonItem[]>()

  // Initialize categories
  categories.forEach((cat) => {
    categoryMap.set(String(cat.id), [])
  })

  // Add "All" category
  categoryMap.set('all', allItems)

  // Group items
  galleryItems.forEach((item) => {
    const comparisonItem: ComparisonItem = {
      id: String(item.id),
      title: item.title,
      beforeImage: getImageUrl(item.beforeImage),
      afterImage: getImageUrl(item.afterImage),
    }

    if (item.category) {
      const categoryId =
        typeof item.category === 'number'
          ? String(item.category)
          : String((item.category as any).id)
      if (categoryMap.has(categoryId)) {
        categoryMap.get(categoryId)?.push(comparisonItem)
      }
    }
  })

  // Build final categories array
  const tabCategories: GalleryTabCategory[] = [
    {
      id: 'all',
      label: 'All',
      items: allItems,
    },
    ...categories
      .filter((cat) => (categoryMap.get(String(cat.id)) || []).length > 0)
      .map((cat) => ({
        id: String(cat.id),
        label: cat.title,
        items: categoryMap.get(String(cat.id)) || [],
      })),
  ]

  return <BeforeAfterGallery categories={tabCategories} className={className} />
}
