import React from 'react'

import './globals.css'
import { ServicesHome } from '@/components/pages/servicesHome'
import { HowItWorks } from '@/components/pages/howItWorks'
import { WhyUsHome } from '@/components/pages/whyUsHome'
import { HomeBeforeAfter } from '@/components/pages/beforeAfterHomeBlock'
import { TestimonialHome } from '@/components/pages/testimonialHome'
import { CtaHome } from '@/components/pages/ctaHome'
import { HeroCarousel } from '@/components/pages/heroCarousel'

export default async function HomePage() {
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
