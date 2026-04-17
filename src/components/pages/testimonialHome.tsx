'use client'

import { useSyncExternalStore } from 'react'
import { Star } from 'lucide-react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface DataItem {
  name: string
  avatar: string
  content: string
  margin?: string
}

const DATA: DataItem[] = [
  {
    name: 'Alex Johnson',
    avatar: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
    content:
      'This tool has completely transformed my workflow. The features are intuitive, and it’s made collaboration with my team so much easier.',
    margin: 'mt-6',
  },
  {
    name: 'Maria Garcia',
    avatar: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp',
    content:
      'The design templates are a lifesaver. They’ve helped me deliver projects faster without compromising on quality.',
  },
  {
    name: 'Chris Lee',
    avatar: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp',
    content:
      'Our team’s productivity has skyrocketed since we started using this platform. It’s a must-have for any creative team.',
    margin: 'mt-4',
  },
  {
    name: 'Emily Carter',
    avatar: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp',
    content:
      'The analytics dashboard is incredible. It gives us the insights we need to make data-driven decisions.',
  },
  {
    name: 'David Kim',
    avatar: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp',
    content:
      'Integration with our existing tools was seamless. The API documentation is thorough and easy to follow.',
  },
  {
    name: 'Sophia Martinez',
    avatar: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp',
    content:
      'The platform has made it so much easier to manage creative projects and keep everyone on the same page.',
  },
]

interface RewardCardProps {
  icon: string
  title: string
  subtitle: string
}

const RewardCard = ({ icon, title, subtitle }: RewardCardProps) => (
  <div className="flex flex-col gap-2 rounded-xl bg-muted p-2 px-4 shadow-sm">
    <div className="flex flex-row items-center gap-2">
      <div className="rounded-full bg-background p-2">
        <img src={icon} alt={title} width={40} height={40} className="rounded-full" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-sm text-muted-foreground">{subtitle}</span>
      </div>
    </div>
  </div>
)

interface TestimonialHomeProps {
  className?: string
}

const TestimonialHome = ({ className }: TestimonialHomeProps) => {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  return (
    <section className={cn('py-32 flex justify-center', className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-6 px-4 sm:px-8">
          <h6 className="text-center text-sm font-medium uppercase tracking-wide text-primary">
            Testimonials
          </h6>
          <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">
            What Our Patients Say
          </h2>

          <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
            <RewardCard
              icon="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
              title="Best for Design"
              subtitle="2023 Recognition"
            />
            <RewardCard
              icon="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg"
              title="Best for Creativity"
              subtitle="2022 Recognition"
            />
          </div>
        </div>

        <div className="relative mt-14 w-full px-4 after:absolute after:inset-x-0 after:-bottom-2 after:h-96 after:bg-linear-to-t after:from-background sm:px-8 md:px-16 lg:px-32">
          {mounted && (
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 1024: 3 }}>
              <Masonry gutter="20px" columnsCount={3}>
                {DATA.map((testimonial, idx) => (
                  <Card
                    key={idx}
                    className={cn(
                      'rounded-xl p-5 shadow-sm',
                      idx > 3 && idx <= 5 && 'hidden md:block',
                      idx > 5 && 'hidden lg:block',
                      testimonial.margin,
                    )}
                  >
                    <div className="mb-4 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary" />
                      ))}
                    </div>

                    <div className="mt-4 text-sm text-foreground">
                      <p>{testimonial.content}</p>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <Avatar className="size-9 rounded-full ring-1 ring-muted">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      </Avatar>
                      <div className="text-sm">
                        <p className="font-medium">{testimonial.name}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
        </div>
      </div>
    </section>
  )
}

export { TestimonialHome }
