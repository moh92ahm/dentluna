import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { LegalPage } from '@/components/pages/legal-page'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacyPolicy' })

  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  }
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacyPolicy' })

  const privacySections = [
    {
      heading: t('sections.collect.heading'),
      paragraphs: [t('sections.collect.p1')],
      items: [
        t('sections.collect.i1'),
        t('sections.collect.i2'),
        t('sections.collect.i3'),
        t('sections.collect.i4'),
      ],
    },
    {
      heading: t('sections.use.heading'),
      paragraphs: [t('sections.use.p1')],
      items: [
        t('sections.use.i1'),
        t('sections.use.i2'),
        t('sections.use.i3'),
        t('sections.use.i4'),
      ],
    },
    {
      heading: t('sections.share.heading'),
      paragraphs: [t('sections.share.p1')],
      items: [t('sections.share.i1'), t('sections.share.i2'), t('sections.share.i3')],
    },
    {
      heading: t('sections.retain.heading'),
      paragraphs: [t('sections.retain.p1'), t('sections.retain.p2')],
    },
    {
      heading: t('sections.rights.heading'),
      paragraphs: [t('sections.rights.p1'), t('sections.rights.p2')],
    },
  ]

  return (
    <main>
      <LegalPage
        eyebrow={t('eyebrow')}
        title={t('title')}
        intro={t('intro')}
        updatedAt={t('updatedAt')}
        sections={privacySections}
      />
    </main>
  )
}
