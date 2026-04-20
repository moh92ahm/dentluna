import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Contact } from '@/components/pages/contactPage'


type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contactPage' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  const payload = await getPayload({ config })

  const { docs: treatments } = await payload.find({
    collection: 'treatments',
    limit: 100,
    depth: 0,
    locale: locale as 'en' | 'de' | 'fr',
    select: { title: true, slug: true },
    where: { _status: { equals: 'published' } },
    sort: 'title',
  })

  const treatmentOptions = treatments.map((t) => ({
    title: t.title,
    slug: t.slug,
  }))

  return (
    <main>
      <Contact treatments={treatmentOptions} />
    </main>
  )
}
