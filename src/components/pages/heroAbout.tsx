'use client'
import AutoScroll from 'embla-carousel-auto-scroll'
import { useTranslations } from 'next-intl'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { Button } from '../ui/button'
const teamImages = [
  {
    src: '/static/about/01.png',
    alt: '',
  },
  {
    src: '/static/about/02.png',
    alt: '',
  },
  {
    src: '/static/about/03.png',
    alt: '',
  },
  {
    src: '/static/about/04.png',
    alt: '',
  },

  {
    src: '/static/about/05.png',
    alt: '',
  },
  {
    src: '/static/about/06.png',
    alt: '',
  },
  {
    src: '/static/about/07.png',
    alt: '',
  },
  {
    src: '/static/about/08.png',
    alt: '',
  },
  {
    src: '/static/about/09.png',
    alt: '',
  },
]

const offsets = [0, 2, 4, 6]
const rotatedTeamImagesArray = offsets.map((offset) =>
  teamImages.slice(offset).concat(teamImages.slice(0, offset)),
)

const TeamCarousel = () => {
  return (
    <div className="w-full">
      <div className="relative -top-4 -right-[20%] hidden gap-2 lg:flex">
        {rotatedTeamImagesArray.map((rotatedTeamImages, index) => (
          <Carousel
            opts={{
              loop: true,
              align: 'center',
              axis: 'y',
            }}
            plugins={[
              AutoScroll({
                speed: 0.5,
                direction: index % 2 ? 'backward' : 'forward',
              }),
            ]}
            orientation="vertical"
            className="rotate-[7deg]"
            key={`carousel-1-team-${index}`}
          >
            <CarouselContent className="h-full max-h-[40.625rem] w-fit">
              {rotatedTeamImages.map((t, i) => (
                <CarouselItem key={`team-image-${i}`} className="-mt-2">
                  <div className="h-[9rem] w-[7.875rem] overflow-hidden rounded-lg">
                    <img src={t.src} alt={t.alt} className="size-full object-cover object-center" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ))}
      </div>

      <div className="flex flex-col gap-2.5 pb-12 lg:hidden">
        {[...Array(2)].map((_, i) => (
          <Carousel
            opts={{
              loop: true,
              align: 'center',
            }}
            plugins={[
              AutoScroll({
                speed: 0.5,
                direction: i % 2 ? 'backward' : 'forward',
              }),
            ]}
            key={`carousel-2-team-${i}`}
          >
            <CarouselContent>
              {teamImages.map((t, i) => (
                <CarouselItem
                  key={`team-image-${i}`}
                  className="h-[9rem] w-full max-w-[7.875rem] pl-2.5"
                >
                  <div className="size-full overflow-hidden rounded-lg">
                    <img
                      src={t.src}
                      alt={t.alt}
                      className="block size-full object-cover object-center"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ))}
      </div>
    </div>
  )
}

interface HeroAboutProps {
  className?: string
}

const HeroAbout = ({ className }: HeroAboutProps) => {
  const t = useTranslations('aboutHero')
  return (
    <section
      className={cn('container max-w-[1536px] py-10 flex justify-center mx-auto', className)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-card">
        <div className="grid h-full w-full grid-cols-1 lg:max-h-[37.5rem] lg:grid-cols-2">
          <div className="flex w-full max-w-[90%] flex-col justify-center gap-5 py-16 pr-10 pl-20 md:max-w-[70%] lg:max-w-full lg:py-0">
            <Badge variant="outline" className="w-fit">
              {t('label')}
            </Badge>
            <h1 className="text-4xl leading-[1.1] text-foreground md:text-5xl lg:text-4xl xl:text-5xl">
              {t('heading')}
            </h1>
            <p className="text-sm text-slate-600 md:text-base">{t('description')}</p>
            <Button className="flex gap-4 w-full max-w-max mt-8" variant="default" asChild>
              <Link href="/contact" className="btn btn-secondary">{t('ctaBtn')}</Link>
            </Button>
          </div>
          <div className="absolute left-1/2 z-10 hidden h-full w-[500px] bg-linear-to-r from-card via-card/95 to-transparent lg:block"></div>
          <div className="relative">
            <TeamCarousel />
          </div>
        </div>
      </div>
    </section>
  )
}

export { HeroAbout }
