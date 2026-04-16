import type { Metadata } from 'next'
import type { Treatment } from '@/payload-types'
import { SingleTreatment } from '@/components/treatments/singleTreatment'
import { getCachedDocument } from '@/utilities/getDocument'
import { generateMeta } from '@/utilities/generateMeta'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cachedGetTreatment = getCachedDocument('treatments', slug, 0)
  const treatment = (await cachedGetTreatment()) as Treatment
  return generateMeta({ doc: treatment })
}

export default async function TreatmentDetailPage(props: Props) {
  const { slug } = await props.params

  const cachedGetTreatment = getCachedDocument('treatments', slug, 2)
  const treatment = (await cachedGetTreatment()) as Treatment

  if (!treatment) {
    return (
      <main>
        <section className="py-32">
          <div className="container">
            <h1 className="text-4xl font-medium">Treatment not found</h1>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <SingleTreatment treatment={treatment} />
    </main>
  )
}
