import type { Metadata } from 'next'
import type { Doctor } from '@/payload-types'
import { getCachedDocument } from '@/utilities/getDocument'
import { generateMeta } from '@/utilities/generateMeta'
import { SingleDoctor } from '@/components/doctors/singleDoctor'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cachedGetDoctor = getCachedDocument('doctors', slug, 0)
  const doctor = (await cachedGetDoctor()) as Doctor
  return generateMeta({ doc: doctor })
}

export default async function DoctorDetailPage(props: Props) {
  const { slug } = await props.params

  const cachedGetDoctor = getCachedDocument('doctors', slug, 2)
  const doctor = (await cachedGetDoctor()) as Doctor

  if (!doctor) {
    return (
      <main>
        <section className="py-32">
          <div className="container">
            <h1 className="text-4xl font-medium">Doctor not found</h1>
          </div>
        </section>
      </main>
    )
  }
  return (
    <main>
      <article className="py-16">
        <SingleDoctor doctor={doctor} />
      </article>
    </main>
  )
}
