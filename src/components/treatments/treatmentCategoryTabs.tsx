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
    <div className="w-full overflow-x-auto scrollbar-hide">
      <Tabs value={selectedValue}>
        <TabsList className="h-auto w-max gap-1 rounded-full px-2">
          <TabsTrigger value="all" className="rounded-full whitespace-nowrap" asChild>
            <Link href="/treatments">{allLabel}</Link>
          </TabsTrigger>
          {categories.map((item) => (
            <TabsTrigger key={item.id} value={String(item.id)} className="rounded-full whitespace-nowrap" asChild>
              <Link href={`/treatments?category=${item.slug}`}>{item.title}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
