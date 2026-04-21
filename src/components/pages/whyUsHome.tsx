import { CircleCheckBig } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'

interface WhyUsHomeProps {
  className?: string
}

const WhyUsHome = async ({ className }: WhyUsHomeProps) => {
  const t = await getTranslations('whyUsHome')
  return (
    <section className={cn('py-32 flex justify-center', className)}>
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Badge variant="outline" className='mb-4'>{t('badge')}</Badge>
            <h2 className="mb-5 text-3xl font-medium text-balance lg:text-6xl">{t('heading')}</h2>
            <p className="mb-12 text-lg text-muted-foreground">{t('description')}</p>
            <ul className="grid max-w-xl gap-5 sm:grid-cols-2">
              {(
                ['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6'] as const
              ).map((key) => (
                <li key={key} className="flex items-center gap-1.5">
                  <CircleCheckBig className="size-5 shrink-0" />
                  <p className="text-sm font-medium">{t(key)}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative max-h-[500px] overflow-hidden rounded-2xl border border-border lg:max-h-none lg:min-h-[32rem]">
            <Image
              src="/static/home/why_choose_us.jpg"
              alt="Why Choose Us"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export { WhyUsHome }
