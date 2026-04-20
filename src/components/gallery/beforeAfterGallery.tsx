'use client'

import { cn } from '@/lib/utils'
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
}

export const BeforeAfterGalleryClient = ({
  categories,
  className,
}: BeforeAfterGalleryClientProps) => {
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
                  <ComparisonCard key={item.id} item={item} />
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
