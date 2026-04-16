import { TreatmentsArchive } from '@/components/treatments/treatmentsArchive'
import { Badge } from '@/components/ui/badge'

export default async function TreatmentsPage() {
  return (
    <main>
      <section className="py-32 flex justify-center">
        <div className="container">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <Badge variant="outline">Services</Badge>
            <h1 className="text-4xl font-semibold text-balance">Discover our range of services</h1>
            <p className="text-muted-foreground">
              Explore our comprehensive dental services designed to meet all your oral health needs.
              From routine check-ups to advanced cosmetic procedures, we offer personalized care for
              a healthy and beautiful smile.
            </p>
          </div>
          <div className="mt-20">
            <TreatmentsArchive />
          </div>
        </div>
      </section>
    </main>
  )
}
