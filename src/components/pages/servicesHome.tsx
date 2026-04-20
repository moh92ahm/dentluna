'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'

import { Link } from '@/i18n/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type ServiceProps = {
  title: string
  description: string
  image: string
  url: string
}

interface ServicesHomeProps {
  className?: string
}

const ServicesHome = ({ className }: ServicesHomeProps) => {
  const t = useTranslations('servicesHome')

  const services = [
    {
      title: t('veneersTitle'),
      description: t('veneersDesc'),
      image: './static/smile_design.jpg',
      url: '',
    },
    {
      title: t('fullMouthTitle'),
      description: t('fullMouthDesc'),
      image: './static/full_restoration.jpg',
      url: '',
    },
    {
      title: t('implantsTitle'),
      description: t('implantsDesc'),
      image: './static/dental_implants.jpg',
      url: '',
    },
    {
      title: t('zirconiumTitle'),
      description: t('zirconiumDesc'),
      image: './static/zirconium.jpg',
      url: '',
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
            <motion.a
              key={idx}
              href={service.url}
              whileHover={{ opacity: 0.8 }}
              className="group block overflow-hidden rounded-lg"
            >
              <Card className="relative aspect-square overflow-hidden p-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover"
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
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export { ServicesHome }
