import type { MetadataRoute } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { routing } from '@/i18n/routing'

const staticRoutes = [
  '',
  '/about',
  '/contact',
  '/treatments',
  '/blog',
  '/doctors',
  '/gallery',
  '/faq',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getServerSideURL()

  const entries: MetadataRoute.Sitemap = []

  // Static routes for all locales
  // Turkish locale excludes /gallery for legal compliance
  const trRestrictedRoutes = new Set(['/gallery'])

  for (const locale of routing.locales) {
    for (const route of staticRoutes) {
      if (locale === 'tr' && trRestrictedRoutes.has(route)) continue

      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            routing.locales
              .filter((loc) => !(loc === 'tr' && trRestrictedRoutes.has(route)))
              .map((loc) => [loc, `${baseUrl}/${loc}${route}`]),
          ),
        },
      })
    }
  }

  if (process.env.SKIP_SITEMAP_DB === 'true') {
    return entries
  }

  const [{ getPayload }, { default: configPromise }] = await Promise.all([
    import('payload'),
    import('@payload-config'),
  ])
  const payload = await getPayload({ config: configPromise })

  // Dynamic: blog posts
  const posts = await payload.find({ collection: 'posts', limit: 1000, depth: 0 })
  for (const post of posts.docs) {
    if (!post.slug) continue
    for (const locale of routing.locales) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      })
    }
  }

  // Dynamic: treatments
  const treatments = await payload.find({ collection: 'treatments', limit: 1000, depth: 0 })
  for (const treatment of treatments.docs) {
    if (!treatment.slug) continue
    for (const locale of routing.locales) {
      entries.push({
        url: `${baseUrl}/${locale}/treatments/${treatment.slug}`,
        lastModified: treatment.updatedAt ? new Date(treatment.updatedAt) : new Date(),
      })
    }
  }

  // Dynamic: doctors
  const doctors = await payload.find({ collection: 'doctors', limit: 1000, depth: 0 })
  for (const doctor of doctors.docs) {
    if (!doctor.slug) continue
    for (const locale of routing.locales) {
      entries.push({
        url: `${baseUrl}/${locale}/doctors/${doctor.slug}`,
        lastModified: doctor.updatedAt ? new Date(doctor.updatedAt) : new Date(),
      })
    }
  }

  return entries
}
