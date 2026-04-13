'use client'

import { cn } from '@/lib/utils'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'

const comparisons = [
  {
    beforeImage:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9jsQcDsxyqA-unsplash.jpg',
    afterImage:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9__Q24sJqKg-unsplash.jpg',
  },
  {
    beforeImage:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-uR__S5GX8Io-unsplash.jpg',
    afterImage:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-gDmVqxZt1hg-unsplash.jpg',
  },
]

interface HomeBeforeAfterProps {
  className?: string
}

const HomeBeforeAfter = ({ className }: HomeBeforeAfterProps) => {
  return (
    <section className={cn('py-32 flex justify-center', className)}>
      <div className="container">
        <h4 className="mb-4 text-center text-muted-foreground/50">Before & After</h4>
        <h1 className="mx-auto mb-12 max-w-3xl text-center text-4xl font-semibold sm:text-5xl lg:text-[56px]">
          Real Results. Real Transformations.
        </h1>
        <div className="flex flex-col justify-center gap-28 lg:flex-row">
          {comparisons.map((item, index) => (
            <div key={index} className="w-full max-w-2xl overflow-hidden rounded-2xl aspect-[4/3]">
              <ReactCompareSlider
                itemOne={
                  <ReactCompareSliderImage
                    src={item.beforeImage}
                    alt="Before image"
                    style={{ objectFit: 'cover' }}
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src={item.afterImage}
                    alt="After image"
                    style={{ objectFit: 'cover' }}
                  />
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { HomeBeforeAfter }
