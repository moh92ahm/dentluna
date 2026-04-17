import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'

interface About6Props {
  className?: string
}

const About6 = async ({ className }: About6Props) => {
  const t = await getTranslations('aboutContent')
  return (
    <section className={cn('py-32 flex justify-center container mx-auto', className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-start gap-6 lg:flex-row">
          <div className="flex w-full flex-col items-start justify-start gap-24 lg:w-1/2">
            <div className="pr-6">
              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:mb-10 lg:text-6xl">
                {t('whoWeAre')}
              </h1>
              <p className="mb-9 text-muted-foreground lg:text-xl">{t('intro1')}</p>
              <p className="mb-9 text-muted-foreground lg:text-xl">{t('intro2')}</p>
              <p className="mb-9 text-muted-foreground font-semibold lg:text-xl">{t('mission')}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-MChSQHxGZrQ-unsplash.jpg"
                alt="about 1"
                className="aspect-[0.7] w-full rounded-lg object-cover md:w-1/2"
              />
              <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-AkftcHujUmk-unsplash.jpg"
                  alt="about 2"
                  className="aspect-[1.1] rounded-lg object-cover"
                />
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-vGgn0xLdy8s-unsplash.jpg"
                  alt="about 3"
                  className="aspect-[0.7] rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-12 pt-12 lg:w-1/2 lg:pt-48">
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/johnson-wang-iI4sR_nkkbc-unsplash.jpg"
                alt="about 4"
                className="aspect-[0.9] w-full rounded-lg object-cover md:w-1/2"
              />
              <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/nastuh-abootalebi-eHD8Y1Znfpk-unsplash.jpg"
                  alt="about 5"
                  className="aspect-[0.8] rounded-lg object-cover"
                />
              </div>
            </div>
            <div className="px-8">
              <h1 className="mb-8 text-2xl font-semibold lg:mb-6">{t('ourApproach')}</h1>
              <p className="mb-9 lg:text-xl">{t('approachText')}</p>
              <p className="text-muted-foreground">{t('processLabel')}</p>
              <ul className="list-disc list-inside mt-4 mb-6 text-muted-foreground">
                {(['process1', 'process2', 'process3', 'process4', 'process5'] as const).map(
                  (key) => (
                    <li key={key}>{t(key)}</li>
                  ),
                )}
              </ul>
              <p className="text-muted-foreground">{t('processOutro')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { About6 }
