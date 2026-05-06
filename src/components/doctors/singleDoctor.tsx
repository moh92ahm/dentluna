import type { Media } from '@/payload-types'
import Image from 'next/image'

import { EvervaultCard } from '@/components/ui/evervault-card'
import { cn } from '@/lib/utils'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import RichText from '../RichText'

interface SingleDoctorProps {
  className?: string
  doctor: {
    name: string
    specialty: string
    biography?: any
    profileImage?: number | Media | null
  }
}

const SingleDoctor = ({ className, doctor }: SingleDoctorProps) => {
  const profileImageUrl =
    doctor.profileImage && typeof doctor.profileImage === 'object' && 'url' in doctor.profileImage
      ? getMediaUrl(doctor.profileImage.url)
      : null

  return (
    <section className={cn('w-full py-12', className)}>
      <div className="container px-4 grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
        <div>
          <div className="mx-auto flex w-full flex-col gap-4 rounded-lg border border-border bg-muted/60 p-4 md:max-w-sm">
            {profileImageUrl ? (
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-background">
                <Image
                  src={profileImageUrl}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              </div>
            ) : (
              <div className="h-full w-full rounded-md border border-border/50 bg-background p-4">
                <EvervaultCard
                  text="Hover to Encrypt"
                  className="w-full text-center text-xl font-medium tracking-tight"
                />
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="mb-6 flex flex-col items-center gap-2 text-center md:items-start md:text-left">
            <h1 className="text-2xl font-semibold text-accent-background">{doctor.name}</h1>
            <p className="text-md text-accent-background">{doctor.specialty}</p>
          </div>
          {/* Biography */}
          {doctor.biography && (
            <section className="pt-6">
              <RichText data={doctor.biography} enableGutter={false} />
            </section>
          )}
        </div>
      </div>
    </section>
  )
}
export { SingleDoctor }
