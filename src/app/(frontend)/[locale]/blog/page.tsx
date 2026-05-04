import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ArchiveBlog } from '@/components/blog/archiveBlog'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  }
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params
  const { page } = await searchParams
  const t = await getTranslations({ locale, namespace: 'blog' })
  const pageNumber = Number(page)
  const currentPage = Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1

  return (
    <main>
      <section className="py-32 flex justify-center">
        <div className="container">
          <h1 className="mb-12 text-center text-4xl font-medium md:text-7xl">{t('heading')}</h1>
          <div className="mt-24">
            <ArchiveBlog locale={locale} page={currentPage} />
          </div>
        </div>
      </section>
    </main>
  )
}
