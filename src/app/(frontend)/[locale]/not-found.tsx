import { getLocale, getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function NotFound() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'notFound' })

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-32 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="text-3xl font-semibold md:text-4xl">{t('heading')}</h1>
      <p className="max-w-md text-muted-foreground">{t('message')}</p>
      <Link
        href={`/${locale}`}
        className="mt-4 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        {t('backHome')}
      </Link>
    </section>
  )
}
