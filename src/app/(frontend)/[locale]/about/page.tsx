import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { WhoWeAre } from '@/components/pages/whoWeAre'
import { WhyChooseUs } from '@/components/pages/aboutWhyChooseUs'
import { WhyIzmir } from '@/components/pages/whyIzmir'
import { AboutQuality } from '@/components/pages/aboutQuality'
import { HeroAbout } from '@/components/pages/heroAbout'

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
    <main >
      <HeroAbout />
      <WhoWeAre />
      <AboutQuality />
      <WhyIzmir />
      <WhyChooseUs />
    </main>
  )
}
