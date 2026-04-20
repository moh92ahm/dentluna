import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Header } from '@/components/global/header'
import { Footer } from '@/components/global/footer'
import { getServerSideURL } from '@/utilities/getURL'
import type { Metadata } from 'next'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = getServerSideURL()

  const alternates: Record<string, string> = {}
  for (const loc of routing.locales) {
    alternates[loc] = `${baseUrl}/${loc}`
  }
  alternates['x-default'] = `${baseUrl}/${routing.defaultLocale}`

  return {
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: alternates,
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <NextIntlClientProvider>
      <Header locale={locale} />
      <main className="container mx-auto px-4">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  )
}
