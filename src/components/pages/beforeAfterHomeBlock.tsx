'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Link } from '@/i18n/navigation'
import { ArrowUpRight } from 'lucide-react'
import { CompareSlider } from '../ui/CompareSlider'

const comparisons = [
  { beforeImage: './static/before_1.jpg', afterImage: './static/after_1.jpg' },
  { beforeImage: './static/before_2.jpg', afterImage: './static/after_2.jpg' },
]

interface HomeBeforeAfterProps {
  className?: string
}

const HomeBeforeAfter = ({ className }: HomeBeforeAfterProps) => {
  const t = useTranslations('beforeAfterHome')

  return (
    <section className={cn('py-32 flex justify-center', className)}>
      <div className="container">
        <div className="flex justify-center mb-4">
          <Badge variant="outline">{t('label')}</Badge>
        </div>
        <h1 className="mx-auto mb-12 max-w-3xl text-center text-4xl font-semibold sm:text-5xl lg:text-[56px]">
          {t('heading')}
        </h1>
        <div className="flex flex-col justify-center gap-28 lg:flex-row">
          {comparisons.map((item, index) => (
            <CompareSlider
              key={index}
              beforeImage={item.beforeImage}
              afterImage={item.afterImage}
              beforeAlt="Before image"
              afterAlt="After image"
              className="max-w-2xl"
            />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button variant="outline" asChild>
            <Link href="/gallery">
              {t('viewAllBtn')} <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export { HomeBeforeAfter }
