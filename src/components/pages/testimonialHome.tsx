'use client'

import { useSyncExternalStore } from 'react'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useTranslations } from 'next-intl'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'

interface DataItem {
  name: string
  content: string
  margin?: string
}

interface RewardCardProps {
  icon: string
  title: string
}

const RewardCard = ({ icon, title }: RewardCardProps) => (
  <div className="flex items-center justify-center rounded-xl bg-muted px-8 py-4 shadow-sm">
    <Image
      src={icon}
      alt={title}
      width={160}
      height={56}
      className="object-contain"
      style={{ width: 'auto', height: '56px' }}
    />
  </div>
)

interface TestimonialHomeProps {
  className?: string
}

const TestimonialHome = ({ className }: TestimonialHomeProps) => {
  const t = useTranslations('testimonialHome')
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  const DATA: DataItem[] = [
    { name: t('t1Name'), content: t('t1Content'), margin: 'mt-6' },
    { name: t('t2Name'), content: t('t2Content') },
    { name: t('t3Name'), content: t('t3Content'), margin: 'mt-4' },
    { name: t('t4Name'), content: t('t4Content') },
    { name: t('t5Name'), content: t('t5Content') },
    { name: t('t6Name'), content: t('t6Content') },
    { name: t('t7Name'), content: t('t7Content'), margin: 'mt-6' },
    { name: t('t8Name'), content: t('t8Content') },
    { name: t('t9Name'), content: t('t9Content'), margin: 'mt-4' },
  ]

  return (
    <section className={cn('py-32 flex justify-center', className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-4 px-4 sm:px-8">
          <Badge variant="outline" className="text-center ">
            {t('label')}
          </Badge>
          <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">{t('heading')}</h2>

          <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
            <RewardCard icon="/static/home/trustpilot.png" title="Trustpilot Reviews" />
            <RewardCard icon="/static/home/google.png" title="Google Reviews" />
          </div>
        </div>

        <div className="relative mt-14 w-full px-4 after:absolute after:inset-x-0 after:-bottom-2 after:h-96 after:bg-linear-to-t after:from-background sm:px-8 md:px-16 lg:px-32">
          {mounted && (
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1024: 3 }}>
              <Masonry gutter="20px" columnsCount={3}>
                {DATA.map((testimonial, idx) => (
                  <Card
                    key={idx}
                    className={cn(
                      'rounded-xl p-5 shadow-sm',
                      idx > 3 && idx <= 5 && 'hidden md:block',
                      idx > 5 && 'hidden lg:block',
                      testimonial.margin,
                    )}
                  >
                    <div className="mb-4 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary" />
                      ))}
                    </div>

                    <div className="mt-4 text-sm text-foreground">
                      <p>{testimonial.content}</p>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-bold">{testimonial.name}</p>
                    </div>
                  </Card>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
        </div>
      </div>
    </section>
  )
}

export { TestimonialHome }
