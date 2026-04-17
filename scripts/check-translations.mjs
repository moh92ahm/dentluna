#!/usr/bin/env node
// scripts/check-translations.mjs
// Checks that all keys present in the default locale (en) exist in every
// other locale file, and flags any keys that appear in other locales but
// not in en.json.

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const messagesDir = resolve(__dirname, '../messages')

const locales = ['en', 'de', 'fr']
const defaultLocale = 'en'

function flattenKeys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return flattenKeys(value, fullKey)
    }
    return [fullKey]
  })
}

const data = {}
for (const locale of locales) {
  const raw = readFileSync(resolve(messagesDir, `${locale}.json`), 'utf8')
  data[locale] = JSON.parse(raw)
}

const defaultKeys = new Set(flattenKeys(data[defaultLocale]))
let hasError = false

for (const locale of locales.filter((l) => l !== defaultLocale)) {
  const localeKeys = new Set(flattenKeys(data[locale]))

  const missing = [...defaultKeys].filter((k) => !localeKeys.has(k))
  const extra = [...localeKeys].filter((k) => !defaultKeys.has(k))

  if (missing.length > 0) {
    console.error(
      `\n[${locale}] Missing ${missing.length} key(s) (present in ${defaultLocale} but not in ${locale}):`,
    )
    missing.forEach((k) => console.error(`  - ${k}`))
    hasError = true
  } else {
    console.log(`[${locale}] ✓ No missing keys`)
  }

  if (extra.length > 0) {
    console.warn(
      `[${locale}] Extra ${extra.length} key(s) (in ${locale} but not in ${defaultLocale}):`,
    )
    extra.forEach((k) => console.warn(`  + ${k}`))
  }
}

if (hasError) {
  process.exit(1)
} else {
  console.log('\nAll locale files are in sync.')
}
