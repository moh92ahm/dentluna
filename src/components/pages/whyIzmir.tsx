import { getTranslations } from 'next-intl/server'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils'

interface WhyIzmirProps {
  className?: string
}

const WhyIzmir = async ({ className }: WhyIzmirProps) => {
  const t = await getTranslations('whyIzmir')
  return (
    <section
      className={cn('bg-card container mx-auto p-20 rounded-2xl justify-center flex', className)}
    >
      <div className="container">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <AspectRatio ratio={1.5} className="overflow-hidden rounded-2xl">
              <video
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-8.mp4"
                className="block size-full object-cover object-center"
                loop
                autoPlay
                muted
                controls={false}
              />
            </AspectRatio>
          </div>
          <div className="order-1 space-y-6 lg:order-2">
            <h2 className="text-4xl leading-none font-semibold tracking-tight md:text-5xl">
              {t('heading')}
            </h2>
            <p className="text-lg leading-[1.4] font-medium text-muted-foreground md:text-xl">
              {t('intro')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg text-muted-foreground md:text-xl">
              {(['item1', 'item2', 'item3', 'item4'] as const).map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
            <p className="text-lg leading-[1.4] font-medium text-muted-foreground md:text-xl">
              {t('outro')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export { WhyIzmir }
