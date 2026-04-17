#!/usr/bin/env tsx
/**
 * scripts/seed-locales.ts
 *
 * Seeds DE and FR locale content for existing English records.
 * Run with: pnpm tsx scripts/seed-locales.ts
 *
 * Prerequisites:
 * - DATABASE_URL and PAYLOAD_SECRET env vars must be set
 * - English content must already exist
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.js'

const deTranslations: Record<string, { title: string; specialty?: string }> = {
  'hollywood-smile': {
    title: 'Hollywood Smile',
    specialty: 'Kosmetische Zahnheilkunde',
  },
  'dental-implants': {
    title: 'Zahnimplantate',
    specialty: 'Implantologie',
  },
  veneers: {
    title: 'Veneers',
    specialty: 'Kosmetische Zahnheilkunde',
  },
  crowns: {
    title: 'Zahnkronen',
    specialty: 'Restaurative Zahnheilkunde',
  },
}

const frTranslations: Record<string, { title: string; specialty?: string }> = {
  'hollywood-smile': {
    title: 'Sourire Hollywood',
    specialty: 'Dentisterie esthétique',
  },
  'dental-implants': {
    title: 'Implants dentaires',
    specialty: 'Implantologie',
  },
  veneers: {
    title: 'Facettes dentaires',
    specialty: 'Dentisterie esthétique',
  },
  crowns: {
    title: 'Couronnes dentaires',
    specialty: 'Dentisterie restauratrice',
  },
}

async function main() {
  const payload = await getPayload({ config })

  // --- Seed Treatments ---
  const { docs: treatments } = await payload.find({
    collection: 'treatments',
    locale: 'en',
    depth: 0,
    limit: 100,
    overrideAccess: true,
  })

  console.log(`Found ${treatments.length} treatments to translate`)

  for (const treatment of treatments) {
    const slug = treatment.slug as string

    for (const [locale, translations] of [
      ['de', deTranslations],
      ['fr', frTranslations],
    ] as const) {
      const localeTranslation = translations[slug]
      if (!localeTranslation) {
        console.warn(`  No ${locale} translation for treatment: ${slug}`)
        continue
      }

      await payload.update({
        collection: 'treatments',
        id: treatment.id,
        locale,
        data: {
          title: localeTranslation.title,
        },
        overrideAccess: true,
      })
      console.log(`  ✓ Updated treatment "${slug}" [${locale}]: ${localeTranslation.title}`)
    }
  }

  // --- Seed Doctors ---
  const { docs: doctors } = await payload.find({
    collection: 'doctors',
    locale: 'en',
    depth: 0,
    limit: 100,
    overrideAccess: true,
  })

  console.log(`\nFound ${doctors.length} doctors to translate`)

  for (const doctor of doctors) {
    for (const locale of ['de', 'fr'] as const) {
      const specialtyMap: Record<'de' | 'fr', Record<string, string>> = {
        de: {
          Implantologist: 'Implantologe',
          'Cosmetic Dentist': 'Kosmetischer Zahnarzt',
          Orthodontist: 'Kieferorthopäde',
          'Oral Surgeon': 'Oralchirurg',
          'General Dentist': 'Allgemeinzahnarzt',
        },
        fr: {
          Implantologist: 'Implantologiste',
          'Cosmetic Dentist': 'Dentiste esthétique',
          Orthodontist: 'Orthodontiste',
          'Oral Surgeon': 'Chirurgien oral',
          'General Dentist': 'Dentiste généraliste',
        },
      }

      const enSpecialty = doctor.specialty as string
      const translatedSpecialty = specialtyMap[locale][enSpecialty] || enSpecialty

      await payload.update({
        collection: 'doctors',
        id: doctor.id,
        locale,
        data: {
          name: doctor.name as string,
          specialty: translatedSpecialty,
        },
        overrideAccess: true,
      })
      console.log(`  ✓ Updated doctor "${doctor.name}" [${locale}]: ${translatedSpecialty}`)
    }
  }

  console.log('\nSeeding complete!')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
