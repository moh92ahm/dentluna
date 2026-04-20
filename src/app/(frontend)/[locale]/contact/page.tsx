import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Contact } from '@/components/pages/contactPage'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contactPage' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
  }
}

export default function ContactPage() {
  return (
    <main>
      <Contact />
    </main>
  )
}
