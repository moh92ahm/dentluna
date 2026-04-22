import { cn } from '@/lib/utils'
import { getCachedDocuments } from '@/utilities/getDocument'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Link } from '@/i18n/navigation'
import type { Doctor } from '@/payload-types'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { defaultLocale } from '@/i18n/locales'

interface DoctorsPageProps {
  className?: string
  locale?: string
}

const DoctorsPage = async ({ className, locale = defaultLocale }: DoctorsPageProps) => {
  const cachedGetDoctors = getCachedDocuments('doctors', 12, 1, locale)
  const doctors = (await cachedGetDoctors()) as Doctor[]

  if (!doctors || doctors.length === 0) {
    return <p className="text-center text-muted-foreground">No doctors available yet.</p>
  }

  const getImage = (doctor: Doctor) => {
    if (
      doctor.profileImage &&
      typeof doctor.profileImage === 'object' &&
      'url' in doctor.profileImage
    ) {
      return getMediaUrl((doctor.profileImage as any).url)
    }
    return 'https://placehold.net/default.png'
  }

  return (
    <div className={cn('mx-auto max-w-7xl grid gap-7 md:grid-cols-2 lg:grid-cols-3', className)}>
      {doctors.map((doctor) => (
        <Link key={doctor.id} href={`/doctors/${doctor.slug}` as any}>
          <Card className="border-none bg-muted/60 transition-all hover:shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-lg font-semibold md:text-2xl">{doctor.name}</CardTitle>
              <CardDescription className="text-muted-foreground md:text-lg">
                {doctor.specialty}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-7 pb-7">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
                <Image
                  src={getImage(doctor)}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export { DoctorsPage }
