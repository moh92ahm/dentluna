import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'

interface AboutQualityProps {
  className?: string
}

const AboutQuality = async ({ className }: AboutQualityProps) => {
  const t = await getTranslations('qualityMaterials')
  return (
    <section className={cn('py-32 mx-auto flex justify-center', className)}>
      <div className="container">
        <div className="flex-row-reverse lg:flex">
          <div className="lg:w-1/2">
            <div className="mb-6 md:mb-8 lg:mb-0">
              <img
                src="/static/about/dental_quality.jpg"
                alt="placeholder hero"
                className="aspect-4/3 w-full rounded-md border border-border object-cover"
              />
            </div>
          </div>
          <div className="lg:flex lg:w-1/2 lg:items-center lg:pr-24 2xl:pr-32">
            <div>
              <h3 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
                {t('heading')}
              </h3>
              <p className="text-muted-foreground lg:text-lg">{t('text1')}</p>
              <p className="text-muted-foreground lg:text-lg">{t('text2')}</p>
              <p className="text-muted-foreground lg:text-lg">
                {t.rich('text3', { bold: (chunks) => <strong>{chunks}</strong> })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { AboutQuality }
