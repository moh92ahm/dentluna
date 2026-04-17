import { CircleCheckBig } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { cn } from '@/lib/utils'

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
            <h2 className="mb-5 text-5xl font-medium text-balance lg:text-7xl">{t('heading')}</h2>
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
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-t from-background to-transparent to-30%" />
            <div className="absolute inset-0 bg-linear-to-l from-background to-transparent to-30%" />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="placeholder"
              className="max-h-[500px] w-full rounded-2xl border border-border object-cover lg:max-h-none"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export { WhyUsHome }
