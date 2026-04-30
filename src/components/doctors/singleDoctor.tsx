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
    <section className={cn('w-screen overflow-hidden py-32', className)}>
      <div className="container grid h-full w-full grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <div className="mx-auto flex h-full w-full flex-col gap-4 rounded-lg border border-primary/20 bg-primary p-4 md:max-w-sm">
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
            <div className="space-y-2 p-4">
              <p className="font-mono text-sm text-muted-foreground">{doctor.specialty}</p>
              <h1 className="text-lg font-semibold text-primary-foreground">{doctor.name}</h1>
            </div>
          </div>
        </div>
        <div>
          {/* Biography */}
          {doctor.biography && (
            <section className="border-t pt-12">
              <RichText data={doctor.biography} enableGutter={false} />
            </section>
          )}
        </div>
      </div>
    </section>
  )
}
export { SingleDoctor }
