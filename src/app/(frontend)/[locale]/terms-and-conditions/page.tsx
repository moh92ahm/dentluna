import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { LegalPage } from '@/components/pages/legal-page'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'termsAndConditions' })

  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  }
}

export default async function TermsAndConditionsPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'termsAndConditions' })

  const termsSections = [
    {
      heading: t('sections.website.heading'),
      paragraphs: [t('sections.website.p1'), t('sections.website.p2')],
    },
    {
      heading: t('sections.consultation.heading'),
      paragraphs: [t('sections.consultation.p1')],
      items: [
        t('sections.consultation.i1'),
        t('sections.consultation.i2'),
        t('sections.consultation.i3'),
      ],
    },
    {
      heading: t('sections.thirdParty.heading'),
      paragraphs: [t('sections.thirdParty.p1')],
    },
    {
      heading: t('sections.ip.heading'),
      paragraphs: [t('sections.ip.p1')],
    },
    {
      heading: t('sections.liability.heading'),
      paragraphs: [t('sections.liability.p1'), t('sections.liability.p2')],
    },
    {
      heading: t('sections.changes.heading'),
      paragraphs: [t('sections.changes.p1')],
    },
  ]

  return (
    <main>
      <LegalPage
        eyebrow={t('eyebrow')}
        title={t('title')}
        intro={t('intro')}
        updatedAt={t('updatedAt')}
        sections={termsSections}
      />
    </main>
  )
}
