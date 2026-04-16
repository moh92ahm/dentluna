'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Gallery, GalleryCategory } from '@/payload-types'

export interface ComparisonItem {
  id: string
  title: string
  beforeImage: string
  afterImage: string
}

interface GalleryCategory_ {
  id: string
  title: string
  slug: string
}

export interface GalleryTabCategory {
  id: string
  label: string
  items: ComparisonItem[]
}

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
    </div>
    {/* {item.title && <p className="text-sm font-medium text-muted-foreground">{item.title}</p>} */}
  </div>
)

interface BeforeAfterGalleryClientProps {
  categories: GalleryTabCategory[]
  className?: string
}

export const BeforeAfterGalleryClient = ({
  categories,
  className,
}: BeforeAfterGalleryClientProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!categories || categories.length === 0) {
    return <p className="text-center text-muted-foreground">No gallery items available yet.</p>
  }

  return (
    <div className={cn('flex justify-center', className)}>
      <div className="container">
        <Tabs defaultValue={categories[0]?.id || 'all'}>
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
                {cat.items.map((item) => (
                  <ComparisonCard key={item.id} item={item} mounted={mounted} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export { BeforeAfterGalleryClient as BeforeAfterGallery }
