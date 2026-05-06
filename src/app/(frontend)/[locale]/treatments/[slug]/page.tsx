import type { Metadata } from 'next'
import type { Treatment } from '@/payload-types'
import { getTranslations } from 'next-intl/server'
import { SingleTreatment } from '@/components/treatments/singleTreatment'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getCachedDocument, getDraftDocument } from '@/utilities/getDocument'
import { generateMeta } from '@/utilities/generateMeta'

type Props = {
  params: Promise<{ slug: string; locale: string }>
  searchParams: Promise<{ preview?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const cachedGetTreatment = getCachedDocument('treatments', slug, 0, locale)
  const treatment = (await cachedGetTreatment()) as Treatment
  return generateMeta({ doc: treatment })
}

export default async function TreatmentDetailPage({ params, searchParams }: Props) {
  const { slug, locale } = await params
  const { preview } = await searchParams
  const isPreview = preview === '1'
  const t = await getTranslations({ locale, namespace: 'notFound' })

  const treatment = isPreview
    ? ((await getDraftDocument('treatments', slug, 2, locale)) as Treatment)
    : ((await getCachedDocument('treatments', slug, 2, locale)()) as Treatment)

  if (!treatment) {
    return (
      <main>
        <section className="py-32">
          <div className="container">
            <h1 className="text-4xl font-medium">{t('treatment')}</h1>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      {isPreview && <LivePreviewListener />}
      <SingleTreatment treatment={treatment} />
    </main>
  )
}
