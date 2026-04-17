import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { DoctorsPage } from '@/components/doctors/doctorsPage'
import { Badge } from '@/components/ui/badge'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'doctors' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  }
}

export default async function DoctorPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'doctors' })

  return (
    <main>
      <section className="py-32 flex justify-center">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <Badge variant="outline">{t('badge')}</Badge>
            <h1 className="text-3xl font-semibold md:text-5xl">{t('heading')}</h1>
            <p className="max-w-2xl text-muted-foreground md:text-lg">{t('description')}</p>
          </div>
          <div className="mt-20">
            <DoctorsPage locale={locale} />
          </div>
        </div>
      </section>
    </main>
  )
}
