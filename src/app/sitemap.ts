import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
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
  const payload = await getPayload({ config: configPromise })

  const entries: MetadataRoute.Sitemap = []

  // Static routes for all locales
  for (const locale of routing.locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [loc, `${baseUrl}/${loc}${route}`]),
          ),
        },
      })
    }
  }

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
