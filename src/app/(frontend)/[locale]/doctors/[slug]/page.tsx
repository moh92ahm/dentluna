import type { Metadata } from 'next'
import type { Doctor } from '@/payload-types'
import { getTranslations } from 'next-intl/server'
import { getCachedDocument } from '@/utilities/getDocument'
import { generateMeta } from '@/utilities/generateMeta'
import { SingleDoctor } from '@/components/doctors/singleDoctor'

type Props = {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const cachedGetDoctor = getCachedDocument('doctors', slug, 0, locale)
  const doctor = (await cachedGetDoctor()) as Doctor
  return generateMeta({ doc: doctor })
}

export default async function DoctorDetailPage({ params }: Props) {
  const { slug, locale } = await params
  const t = await getTranslations({ locale, namespace: 'notFound' })

  const cachedGetDoctor = getCachedDocument('doctors', slug, 2, locale)
  const doctor = (await cachedGetDoctor()) as Doctor

  if (!doctor) {
    return (
      <main>
        <section className="py-32">
          <div className="container">
            <h1 className="text-4xl font-medium">{t('doctor')}</h1>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <article className="py-16">
        <SingleDoctor doctor={doctor} />
      </article>
    </main>
  )
}
