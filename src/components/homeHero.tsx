import React from 'react'

import { ThreeDMarquee } from '@/components/ui/3d-marquee'
import { cn } from '@/lib/utils'

interface HomeHeroProps {
  className?: string
}

const HomeHero = ({ className }: HomeHeroProps) => {
  const images = [
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img1.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img2.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img3.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img4.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img5.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img6.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img7.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img8.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img9.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img10.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img11.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img12.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img13.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img14.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img15.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img16.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img17.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img18.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img19.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img20.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img21.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img22.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img23.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img24.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img25.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img26.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img27.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img1.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img2.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img3.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img4.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img5.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img6.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img7.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img8.jpeg',
    'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/img9.jpeg',
  ]

  return (
    <section
      className={cn(
        'relative flex w-full items-center justify-center overflow-hidden py-20 lg:min-h-screen',
        className,
      )}
    >
      <div className="container flex max-h-screen flex-col items-center justify-center gap-5 overflow-y-auto text-center">
        <div className="flex items-center gap-2">
          <Zap className="size-5" />
          <p className="w-fit rounded-full py-1 font-medium tracking-tight">Dent Luna Clinic</p>
        </div>
        <h1 className="mt-3 max-w-xl text-5xl font-medium font-semibold tracking-tighter lg:max-w-3xl lg:text-6xl">
          Premium Dental Treatments in Izmir
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Transform your smile with experienced dentists, advanced techniques, and high-quality materials — all in one seamless journey.
        </p>
        <ul className="mt-6 flex items-center justify-center gap-6">
          <li>✔ Multilingual patient coordinators</li>
          <li>✔ Transparent and clear pricing</li>
          <li>✔ Modern clinics & certified dentists</li>
          <li>✔ Continuous support before and after treatment</li>
        </ul>


        <div className="mt-5 flex w-full max-h-96 items-center justify-center overflow-hidden lg:max-h-full">
          <ThreeDMarquee className="rounded-none" images={images} />
          <div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-background via-background to-transparent" />
        </div>
      </div>
    </section>
  )
}

export { HomeHero }

const Zap = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="35"
      height="23"
      viewBox="0 0 35 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.042 0.547306C22.2981 -0.152487 23.288 -0.152487 23.544 0.547306L24.3089 2.63602C24.9087 4.27458 25.8587 5.76264 27.0925 6.99648C28.3263 8.23031 29.8144 9.18025 31.453 9.7801L33.5417 10.545C34.2425 10.801 34.2425 11.7909 33.5417 12.047L31.453 12.8118C29.8144 13.4117 28.3263 14.3616 27.0925 15.5954C25.8587 16.8293 24.9087 18.3173 24.3089 19.9559L23.544 22.0446C23.288 22.7455 22.2981 22.7455 22.042 22.0446L21.2772 19.9559C20.6773 18.3173 19.7274 16.8293 18.4935 15.5954C17.2597 14.3616 15.7717 13.4117 14.1331 12.8118L12.0444 12.047C11.3446 11.7909 11.3446 10.801 12.0444 10.545L14.1331 9.7801C15.7717 9.18025 17.2597 8.23031 18.4935 6.99648C19.7274 5.76264 20.6773 4.27458 21.2772 2.63602L22.042 0.547306Z"
        fill="#343433"
      />
      <path
        d="M5.50713 0.284873C5.63513 -0.0650096 6.13009 -0.0650096 6.2581 0.284873L6.64051 1.32919C6.94042 2.14844 7.41537 2.89243 8.03227 3.50933C8.64916 4.12622 9.39316 4.60117 10.2124 4.90108L11.2567 5.2835C11.6071 5.4115 11.6071 5.90646 11.2567 6.03446L10.2124 6.41688C9.39316 6.71679 8.64916 7.19174 8.03227 7.80863C7.41537 8.42553 6.94042 9.16952 6.64051 9.98877L6.2581 11.0331C6.13009 11.3835 5.63513 11.3835 5.50713 11.0331L5.12471 9.98877C4.8248 9.16952 4.34985 8.42553 3.73296 7.80863C3.11607 7.19174 2.37207 6.71679 1.55282 6.41688L0.508505 6.03446C0.158623 5.90646 0.158623 5.4115 0.508505 5.2835L1.55282 4.90108C2.37207 4.60117 3.11607 4.12622 3.73296 3.50933C4.34985 2.89243 4.8248 2.14844 5.12471 1.32919L5.50713 0.284873Z"
        fill="#343433"
      />
    </svg>
  )
}
