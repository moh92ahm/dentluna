import { ArchiveBlog } from '@/components/blog/archiveBlog'

export default async function BlogPage() {
  return (
    <main>
      <section className="py-32 flex justify-center">
        <div className="container">
          <h1 className="mb-12 text-center text-4xl font-medium md:text-7xl">Latest Blog</h1>
          <div className="mt-24">
            <ArchiveBlog />
          </div>
        </div>
      </section>
    </main>
  )
}
