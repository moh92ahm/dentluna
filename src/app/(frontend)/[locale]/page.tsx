import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { HeroCarousel } from '@/components/pages/heroCarousel'
import { ServicesHome } from '@/components/pages/servicesHome'
import { HowItWorks } from '@/components/pages/howItWorks'
import { WhyUsHome } from '@/components/pages/whyUsHome'
import { HomeBeforeAfter } from '@/components/pages/beforeAfterHomeBlock'
import { TestimonialHome } from '@/components/pages/testimonialHome'
import { CtaHome } from '@/components/pages/ctaHome'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function HomePage({ params }: Props) {
  // locale is available for future data-fetching with locale param
  const { locale: _locale } = await params

  return (
    <main>
      <HeroCarousel />
      <ServicesHome />
      <HowItWorks />
      <WhyUsHome />
      <HomeBeforeAfter />
      <TestimonialHome />
      <CtaHome />
    </main>
  )
}
