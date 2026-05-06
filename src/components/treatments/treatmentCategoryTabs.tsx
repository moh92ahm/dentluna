'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link } from '@/i18n/navigation'

interface CategoryTab {
  id: string | number
  title: string | null
  slug: string | null
}

interface TreatmentCategoryTabsProps {
  categories: CategoryTab[]
  selectedValue: string
  allLabel: string
}

export function TreatmentCategoryTabs({
  categories,
  selectedValue,
  allLabel,
}: TreatmentCategoryTabsProps) {
  return (
    <div className="flex justify-center">
      <Tabs value={selectedValue}>
        <TabsList className="h-auto flex-wrap gap-1 rounded-full">
          <TabsTrigger value="all" className="rounded-full" asChild>
            <Link href="/treatments">{allLabel}</Link>
          </TabsTrigger>
          {categories.map((item) => (
            <TabsTrigger key={item.id} value={String(item.id)} className="rounded-full" asChild>
              <Link href={`/treatments?category=${item.slug}`}>{item.title}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
