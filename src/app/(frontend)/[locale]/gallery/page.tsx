import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { GalleryArchive } from '@/components/gallery/galleryArchive'
import { Badge } from '@/components/ui/badge'
import { getLocalePolicy } from '@/i18n/localePolicy'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'gallery' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  }
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'gallery' })
  const localePolicy = getLocalePolicy(locale)

  return (
    <main>
      <section className="py-20 flex justify-center">
        <div className="container">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <Badge variant="outline">{t('badge')}</Badge>
            <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl">{t('heading')}</h2>
            <p className="max-w-xl text-muted-foreground">{t('description')}</p>
          </div>

          {localePolicy.showGalleryBeforeAfter ? (
            <GalleryArchive locale={locale} />
          ) : (
            <p className="mx-auto max-w-xl text-center text-muted-foreground">{t('description')}</p>
          )}
        </div>
      </section>
    </main>
  )
}
