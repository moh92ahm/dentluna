'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ComparisonItem {
  beforeImage: string
  afterImage: string
  label?: string
}

interface Category {
  id: string
  label: string
  items: ComparisonItem[]
}

const categories: Category[] = [
  {
    id: 'all',
    label: 'All',
    items: [
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9jsQcDsxyqA-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9__Q24sJqKg-unsplash.jpg',
        label: 'Dental Implant',
      },
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-uR__S5GX8Io-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-gDmVqxZt1hg-unsplash.jpg',
        label: 'Hollywood Smile',
      },
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-o9F8dRoSucM-unsplash.jpg',
        label: 'Veneers',
      },
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-K1W9OjEgacI-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-sutfgh5DNIU-unsplash.jpg',
        label: 'Teeth Whitening',
      },
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-ZXLGP2Qh3Mo-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9jsQcDsxyqA-unsplash.jpg',
        label: 'Orthodontics',
      },
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-gDmVqxZt1hg-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-uR__S5GX8Io-unsplash.jpg',
        label: 'Composite Bonding',
      },
    ],
  },
  {
    id: 'implants',
    label: 'Implants',
    items: [
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9jsQcDsxyqA-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9__Q24sJqKg-unsplash.jpg',
        label: 'Single Implant',
      },
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-K1W9OjEgacI-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-o9F8dRoSucM-unsplash.jpg',
        label: 'Full Arch Implants',
      },
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-ZXLGP2Qh3Mo-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-sutfgh5DNIU-unsplash.jpg',
        label: 'All-on-4 Implants',
      },
    ],
  },
  {
    id: 'hollywood-smile',
    label: 'Hollywood Smile',
    items: [
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-uR__S5GX8Io-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-gDmVqxZt1hg-unsplash.jpg',
        label: 'Full Hollywood Smile',
      },
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9__Q24sJqKg-unsplash.jpg',
        label: 'Smile Makeover',
      },
    ],
  },
  {
    id: 'veneers',
    label: 'Veneers',
    items: [
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-o9F8dRoSucM-unsplash.jpg',
        label: 'Porcelain Veneers',
      },
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9__Q24sJqKg-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-uR__S5GX8Io-unsplash.jpg',
        label: 'Composite Veneers',
      },
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-ZXLGP2Qh3Mo-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-gDmVqxZt1hg-unsplash.jpg',
        label: 'Lumineers',
      },
    ],
  },
  {
    id: 'whitening',
    label: 'Whitening',
    items: [
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-K1W9OjEgacI-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-sutfgh5DNIU-unsplash.jpg',
        label: 'In-Office Whitening',
      },
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9jsQcDsxyqA-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg',
        label: 'Take-Home Whitening',
      },
    ],
  },
  {
    id: 'orthodontics',
    label: 'Orthodontics',
    items: [
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-ZXLGP2Qh3Mo-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9jsQcDsxyqA-unsplash.jpg',
        label: 'Clear Aligners',
      },
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-o9F8dRoSucM-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-K1W9OjEgacI-unsplash.jpg',
        label: 'Braces',
      },
      {
        beforeImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-gDmVqxZt1hg-unsplash.jpg',
        afterImage:
          'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-uR__S5GX8Io-unsplash.jpg',
        label: 'Retainers',
      },
    ],
  },
]

interface ComparisonCardProps {
  item: ComparisonItem
  mounted: boolean
}

const ComparisonCard = ({ item, mounted }: ComparisonCardProps) => (
  <div className="flex flex-col gap-3">
    <div className="relative w-full overflow-hidden rounded-2xl aspect-[4/3]">
      {mounted ? (
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={item.beforeImage}
              alt="Before"
              style={{ objectFit: 'cover' }}
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={item.afterImage}
              alt="After"
              style={{ objectFit: 'cover' }}
            />
          }
        />
      ) : (
        <img src={item.beforeImage} alt="Before" className="h-full w-full object-cover" />
      )}
      <div className="pointer-events-none absolute bottom-3 left-0 flex w-full justify-between px-4">
        <span className="rounded-full bg-black/50 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          Before
        </span>
        <span className="rounded-full bg-black/50 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          After
        </span>
      </div>
    </div>
    {item.label && <p className="text-sm font-medium text-muted-foreground">{item.label}</p>}
  </div>
)

interface BeforeAfterGalleryProps {
  className?: string
}

const BeforeAfterGallery = ({ className }: BeforeAfterGalleryProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className={cn('py-20 flex justify-center', className)}>
      <div className="container">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground/50">
            Before & After
          </h4>
          <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl">
            Real Results. Real Transformations.
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Browse our patient transformations by treatment category.
          </p>
        </div>

        <Tabs defaultValue="all">
          <div className="flex justify-center">
            <TabsList className="flex-wrap h-auto gap-1">
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((item, index) => (
                  <ComparisonCard key={index} item={item} mounted={mounted} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

export { BeforeAfterGallery }
