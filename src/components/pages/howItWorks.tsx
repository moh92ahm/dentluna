'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Image, LocateFixed, Phone, Rocket, UserRoundPlus } from 'lucide-react'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const HowItWorks = () => {
  const t = useTranslations('howItWorks')
  const ref = useRef<HTMLDivElement>(null)

  const DATA = [
    {
      title: t('step1Title'),
      description: t('step1Desc'),
      icon: Image,
      image: {
        src: './static/home/x_ray.jpg',
        alt: t('step1Title'),
      },
    },
    {
      title: t('step2Title'),
      description: t('step2Desc'),
      icon: LocateFixed,
      image: {
        src: './static/home/treatment_plan.jpg',
        alt: t('step2Title'),
      },
      reverse: true,
    },
    {
      title: t('step3Title'),
      description: t('step3Desc'),
      icon: Rocket,
      image: {
        src: './static/home/plan_trip.jpg',
        alt: t('step3Title'),
      },
    },
    {
      title: t('step4Title'),
      description: t('step4Desc'),
      icon: UserRoundPlus,
      image: {
        src: './static/home/receive_treatment.jpg',
        alt: t('step4Title'),
      },
      reverse: true,
    },
    {
      title: t('step5Title'),
      description: t('step5Desc'),
      icon: Phone,
      image: {
        src: './static/home/follow_up.jpeg',
        alt: t('step5Title'),
      },
    },
  ]
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="py-32 flex flex-col items-center">
      <div>
        <div className="container flex flex-col gap-4 py-4">
          <h6>
            <Badge variant="outline" className="text-sm">
              {t('badge')}
            </Badge>
          </h6>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            {t('heading')}
          </h2>
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            {t('description')}
          </p>
        </div>
      </div>

      <div
        ref={ref}
        className="relative container pb-40 lg:pt-20 [&>*:last-child]:pb-20 [&>div>div:first-child]:pt-20!"
      >
        <div className="pointer-events-none absolute top-0 z-0 h-full w-[3px] translate-x-5 lg:left-1/2 lg:-translate-x-1/2">
          <div className="h-4 w-[3px] bg-linear-to-b from-transparent to-foreground/10"></div>
          <div className="relative h-[calc(100%-1rem)] w-full bg-linear-to-b from-foreground/10 via-foreground/10 to-transparent">
            <motion.div
              className="absolute top-0 left-0 z-10 w-[3px] rounded-full bg-linear-to-b from-transparent via-foreground to-transparent"
              style={{ height }}
            />
          </div>
        </div>
        {DATA.map((item, index) => (
          <div key={index} className="relative flex">
            <div
              className={`flex w-full justify-center px-1 py-10 text-end md:gap-6 lg:gap-10 ${item?.reverse ? 'lg:flex-row-reverse lg:text-start' : ''} `}
            >
              <div className="flex-1 max-lg:hidden">
                <h3 className="text-2xl tracking-[-0.96px]">{item.title}</h3>
                <p
                  className={`mt-2.5 max-w-[300px] tracking-[-0.32px] text-balance text-muted-foreground ${item?.reverse ? '' : 'ml-auto'}`}
                >
                  {item.description}
                </p>
              </div>
              <div className="z-[-1] size-fit -translate-y-5 bg-background p-4 max-lg:-translate-x-4">
                <div className="rounded-[10px] border bg-card p-[5px] shadow-md">
                  <div className="size-fit rounded-md border bg-muted p-1">
                    <item.icon className="size-4 shrink-0" />
                  </div>
                </div>
              </div>
              <div className="flex-1 max-lg:-translate-x-4">
                <div className="text-start lg:pointer-events-none lg:hidden">
                  <h3 className="text-2xl tracking-[-0.96px]">{item.title}</h3>
                  <p className="mt-2.5 mb-10 max-w-[300px] tracking-[-0.32px] text-balance text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-start justify-start">
                  <div className={` ${item?.reverse ? 'lg:ml-auto' : ''}`}>
                    <div className="px-6 lg:px-10">
                      <DiagonalPattern className="h-6 lg:h-10" />
                    </div>
                    <div className="relative grid grid-cols-[auto_1fr_auto] items-stretch">
                      <DiagonalPattern className="h-full w-6 lg:w-10" />
                      <img
                        src={item.image.src}
                        width={400}
                        height={500}
                        alt={item.image.alt}
                        className="object-contain dark:invert"
                      />
                      <DiagonalPattern className="w-6 lg:w-10" />
                    </div>
                    <div className="px-6 lg:px-10">
                      <DiagonalPattern className="h-6 lg:h-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-8 w-full md:h-12 lg:h-[112px]">
        <div className="container h-full w-full"></div>
      </div>
    </section>
  )
}

export { HowItWorks }

const DiagonalPattern = ({
  className,
  patternColor = 'hsl(var(--foreground))',
  patternOpacity = 0.15,
}: {
  className?: string
  patternColor?: string
  patternOpacity?: number
}) => {
  const svgPattern = `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${patternColor}' fill-opacity='${patternOpacity}' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`

  return (
    <div
      className={cn('h-full w-full border-2 border-dashed', className)}
      style={{
        backgroundImage: svgPattern,
      }}
    />
  )
}
