import React from 'react'

import './globals.css'
import { HomeHero } from '@/components/homeHero'
import { ServicesHome } from '@/components/servicesHome'
import { HowItWorks } from '@/components/howItWorks'
import { WhyUsHome } from '@/components/whyUsHome'
import { HomeBeforeAfter } from '@/components/beforeAfterHomeBlock'
import { TestimonialHome } from '@/components/testimonialHome'
import { CtaHome } from '@/components/ctaHome'

export default async function HomePage() {
  return (
    <main>
      <HomeHero />
      <ServicesHome />
      <HowItWorks />
      <WhyUsHome />
      <HomeBeforeAfter />
      <TestimonialHome />
      <CtaHome />
    </main>
  )
}
