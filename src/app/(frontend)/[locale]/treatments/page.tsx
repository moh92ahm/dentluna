import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { TreatmentsArchive } from '@/components/treatments/treatmentsArchive'
import { Badge } from '@/components/ui/badge'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'treatments' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  }
}

export default async function TreatmentsPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'treatments' })

  return (
    <main>
      <section className="pt-14 flex justify-center">
        <div className="container">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <Badge variant="outline">{t('badge')}</Badge>
            <h1 className="text-4xl font-semibold text-balance">{t('heading')}</h1>
            <p className="text-muted-foreground">{t('description')}</p>
          </div>
          <div className="mt-20">
            <TreatmentsArchive locale={locale} />
          </div>
        </div>
      </section>
    </main>
  )
}
