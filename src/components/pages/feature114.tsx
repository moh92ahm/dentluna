'use client'

import AutoScroll from 'embla-carousel-auto-scroll'
import {
  Globe,
  MoveRight,
  PanelsTopLeft,
  PenTool,
  Brain,
  ShieldCheck,
  UserCheck,
  Phone,
  Zap,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface Feature114Props {
  className?: string
}

const Feature114 = ({ className }: Feature114Props) => {
  const t = useTranslations('whyChooseUs')

  const features = [
    {
      title: t('feature1Title'),
      description: t('feature1Desc'),
      icon: <UserCheck className="h-auto w-8 md:w-12" />,
    },
    {
      title: t('feature2Title'),
      description: t('feature2Desc'),
      icon: <Brain className="h-auto w-8 md:w-12" />,
    },
    {
      title: t('feature3Title'),
      description: t('feature3Desc'),
      icon: <PanelsTopLeft className="h-auto w-8 md:w-12" />,
    },
    {
      title: t('feature4Title'),
      description: t('feature4Desc'),
      icon: <PenTool className="h-auto w-8 md:w-12" />,
    },
    {
      title: t('feature5Title'),
      description: t('feature5Desc'),
      icon: <Zap className="h-auto w-8 md:w-12" />,
    },
    {
      title: t('feature6Title'),
      description: t('feature6Desc'),
      icon: <ShieldCheck className="h-auto w-8 md:w-12" />,
    },
    {
      title: t('feature7Title'),
      description: t('feature7Desc'),
      icon: <Phone className="h-auto w-8 md:w-12" />,
    },
    {
      title: t('feature8Title'),
      description: t('feature8Desc'),
      icon: <Globe className="h-auto w-8 md:w-12" />,
    },
  ]

  return (
    <section className={cn('py-32 container mx-auto ', className)}>
      <div className="container">
        <div className="grid items-center gap-20 md:grid-cols-2">
          <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
            <h1 className="text-3xl font-semibold md:text-5xl">{t('heading')}</h1>
            <p className="text-muted-foreground md:text-lg">{t('description')}</p>
            <Button size="lg" className="w-fit gap-2">
              {t('getStarted')} <MoveRight className="h-auto w-5" />
            </Button>
            <div className="grid grid-cols-2 justify-between gap-4 pt-10 text-left md:gap-20">
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-semibold md:text-5xl">{t('sat')}</h2>
                <p className="text-muted-foreground md:text-lg">{t('satLabel')}</p>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-semibold md:text-5xl">{t('patients')}</h2>
                <p className="text-muted-foreground md:text-lg">{t('patientsLabel')}</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:gap-7 lg:grid-cols-2">
            <Carousel
              opts={{ loop: true, align: 'start' }}
              plugins={[AutoScroll({ speed: 0.7 })]}
              orientation="vertical"
              className="pointer-events-none relative lg:hidden"
            >
              <CarouselContent className="max-h-[600px]">
                {features.map((feature, index) => (
                  <CarouselItem key={index}>
                    <div className="flex flex-col rounded-xl border p-5 md:p-7">
                      {feature.icon}
                      <h3 className="mt-5 mb-2.5 font-semibold md:text-xl">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground md:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background"></div>
            </Carousel>
            <Carousel
              opts={{ loop: true, align: 'start' }}
              plugins={[AutoScroll({ speed: 0.7 })]}
              orientation="vertical"
              className="pointer-events-none relative hidden lg:block"
            >
              <CarouselContent className="max-h-[600px]">
                {features.slice(0, features.length / 2).map((feature, index) => (
                  <CarouselItem key={index}>
                    <div className="flex flex-col rounded-xl border p-4 md:p-7">
                      {feature.icon}
                      <h3 className="mt-5 mb-2.5 font-semibold md:text-xl">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground md:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background"></div>
            </Carousel>
            <Carousel
              opts={{ loop: true, align: 'start' }}
              plugins={[AutoScroll({ speed: 0.7 })]}
              orientation="vertical"
              className="pointer-events-none relative hidden lg:block"
            >
              <CarouselContent className="max-h-[600px]">
                {features.slice(features.length / 2).map((feature, index) => (
                  <CarouselItem key={index}>
                    <div className="flex flex-col rounded-xl border p-4 md:p-7">
                      {feature.icon}
                      <h3 className="mt-5 mb-2.5 font-semibold md:text-xl">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground md:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background"></div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Feature114 }
