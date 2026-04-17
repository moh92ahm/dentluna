import { GalleryArchive } from '@/components/gallery/galleryArchive'
import { Badge } from '@/components/ui/badge'

export default async function GalleryPage() {
  return (
    <main>
      <section className="py-20 flex justify-center">
        <div className="container">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <Badge variant="outline">Services</Badge>
            <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl">
              Real Results. Real Transformations.
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Browse our patient transformations by treatment category.
            </p>
          </div>

          <GalleryArchive />
        </div>
      </section>
    </main>
  )
}
