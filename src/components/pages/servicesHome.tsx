'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'

import { Link } from '@/i18n/navigation'

const MotionLink = motion(Link)

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ServicesHomeProps {
  className?: string
}

const ServicesHome = ({ className }: ServicesHomeProps) => {
  const t = useTranslations('treatmentsHome')

  const services = [
    {
      title: t('veneersTitle'),
      description: t('veneersDesc'),
      image: '/static/home/smile_design.jpg',
      url: '/treatments/dental-veneers',
    },
    {
      title: t('fullMouthTitle'),
      description: t('fullMouthDesc'),
      image: '/static/home/full_restoration.jpg',
      url: '/treatments/full-mouth-restoration',
    },
    {
      title: t('implantsTitle'),
      description: t('implantsDesc'),
      image: '/static/home/dental_implants.jpg',
      url: '/treatments/dental-implants',
    },
    {
      title: t('zirconiumTitle'),
      description: t('zirconiumDesc'),
      image: '/static/home/zirconium.jpg',
      url: '/treatments/zirconium-crowns',
    },
  ]

  return (
    <section className={cn('py-32 flex justify-center', className)}>
      <div className="container grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* <section className={cn("flex min-h-screen items-center", className)}>
      <div className="container grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2"> */}
        <div className="flex flex-col justify-between">
          <div>
            <Badge variant="outline" className='mb-4'>
              {t('heading')}
            </Badge>
            <h2 className="mb-8 text-4xl text-foreground max-w-xl">{t('subheading')}</h2>
            <p className="w-80 text-base tracking-tight text-muted-foreground">
              {t('description')}
            </p>
          </div>
          <Button variant="outline" className="mt-8 w-fit" asChild>
            <Link href="/treatments">
              {t('exploreBtn')} <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {services.map((service, idx) => (
            <MotionLink
              key={idx}
              href={service.url}
              whileHover={{ opacity: 0.8 }}
              className="group block overflow-hidden rounded-lg"
            >
              <Card className="relative aspect-square overflow-hidden p-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-secondary/10 to-transparent" />
                <CardContent className="absolute inset-0 flex flex-col justify-end p-4">
                  <div>
                    <div className="font-semibold text-white">{service.title}</div>
                    <div className="mt-1 text-sm text-white/90">{service.description}</div>
                  </div>
                </CardContent>
                <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-white transition-transform group-hover:scale-110" />
              </Card>
            </MotionLink>
          ))}
        </div>
      </div>
    </section>
  )
}

export { ServicesHome }
