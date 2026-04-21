'use client'

import Image from 'next/image'
import { useSyncExternalStore } from 'react'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { cn } from '@/lib/utils'

interface CompareSliderProps {
  beforeImage: string
  afterImage: string
  beforeAlt?: string
  afterAlt?: string
  className?: string
}

const CompareSlider = ({
  beforeImage,
  afterImage,
  beforeAlt = 'Before',
  afterAlt = 'After',
  className,
}: CompareSliderProps) => {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  return (
    <div className={cn('relative w-full overflow-hidden rounded-2xl aspect-[4/3]', className)}>
      {mounted ? (
        <ReactCompareSlider
          style={{ width: '100%', height: '100%' }}
          itemOne={
            <ReactCompareSliderImage
              src={beforeImage}
              alt={beforeAlt}
              style={{ objectFit: 'cover' }}
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={afterImage}
              alt={afterAlt}
              style={{ objectFit: 'cover' }}
            />
          }
        />
      ) : (
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      )}
    </div>
  )
}

export { CompareSlider }
