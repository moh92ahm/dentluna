import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { About6 } from '@/components/pages/about6'
import { Feature114 } from '@/components/pages/feature114'
import { Feature220b } from '@/components/pages/feature220b'
import { Feature61 } from '@/components/pages/feature61'
import { Hero194 } from '@/components/pages/hero194'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  }
}

export default function AboutPage() {
  return (
    <main>
      <Hero194 />
      <About6 />
      <Feature61 />
      <Feature220b />
      <Feature114 />
    </main>
  )
}
