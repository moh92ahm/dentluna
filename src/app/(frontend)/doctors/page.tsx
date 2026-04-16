import { DoctorsPage } from '@/components/doctors/doctorsPage'
import { Badge } from '@/components/ui/badge'

export default async function DoctorPage() {
  return (
    <main>
      <section className="py-32 flex justify-center">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <Badge variant="outline">Our Doctors</Badge>
            <h1 className="text-3xl font-semibold md:text-5xl">Meet Our Doctors</h1>
            <p className="max-w-2xl text-muted-foreground md:text-lg">
              Our team of experienced dentists is dedicated to providing exceptional care and
              personalized treatment plans to ensure your oral health and a confident smile.
            </p>
          </div>
          <div className="mt-20">
            <DoctorsPage />
          </div>
        </div>
      </section>
    </main>
  )
}
