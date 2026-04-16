import { CircleCheckBig } from 'lucide-react'

import { cn } from '@/lib/utils'

interface WhyUsHomeProps {
  className?: string
}

const WhyUsHome = ({ className }: WhyUsHomeProps) => {
  return (
    <section className={cn('py-32 flex justify-center', className)}>
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-5 text-5xl font-medium text-balance lg:text-7xl">
              More Than Just Treatment — A Complete Experience
            </h2>
            <p className="mb-12 text-lg text-muted-foreground">
              At Dent Luna, we go beyond traditional dental care. We offer a comprehensive
              experience that includes personalized treatment plans, expert guidance, and ongoing
              support to ensure your smile transformation is not just successful but also enjoyable.
            </p>
            <ul className="grid max-w-xl gap-5 sm:grid-cols-2">
              <li className="flex items-center gap-1.5">
                <CircleCheckBig className="size-5 shrink-0" />
                <p className="text-sm font-medium">Expert dentists</p>
              </li>
              <li className="flex items-center gap-1.5">
                <CircleCheckBig className="size-5 shrink-0" />
                <p className="text-sm font-medium">Premium materials</p>
              </li>
              <li className="flex items-center gap-1.5">
                <CircleCheckBig className="size-5 shrink-0" />
                <p className="text-sm font-medium">Personalized care</p>
              </li>
              <li className="flex items-center gap-1.5">
                <CircleCheckBig className="size-5 shrink-0" />
                <p className="text-sm font-medium">Dedicated support</p>
              </li>
              <li className="flex items-center gap-1.5">
                <CircleCheckBig className="size-5 shrink-0" />
                <p className="text-sm font-medium">Efficient scheduling</p>
              </li>
              <li className="flex items-center gap-1.5">
                <CircleCheckBig className="size-5 shrink-0" />
                <p className="text-sm font-medium">Ongoing follow-up</p>
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-t from-background to-transparent to-30%" />
            <div className="absolute inset-0 bg-linear-to-l from-background to-transparent to-30%" />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="placeholder"
              className="max-h-[500px] w-full rounded-2xl border border-border object-cover lg:max-h-none"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export { WhyUsHome }
