/**
 * Central locale configuration — single source of truth.
 *
 * Add, remove, or reorder locales here and the change propagates to:
 *   • next-intl routing  (src/i18n/routing.ts)
 *   • Payload CMS         (src/payload.config.ts)
 *   • Language switcher    (header.tsx)
 *   • Default-locale fallbacks across utilities
 */

export interface LocaleEntry {
  /** BCP-47 code used in URLs and the DB */
  code: string
  /** Human-readable name shown in the Payload admin */
  label: string
  /** Short uppercase tag for the frontend language switcher */
  shortLabel: string
  /** Flag emoji for the locale */
  flag: string
}

export interface ExternalLocaleEntry extends LocaleEntry {
  href: string
}

export const locales = [
  { code: 'en', label: 'English', shortLabel: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', shortLabel: 'DE', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', shortLabel: 'FR', flag: '🇫🇷' },
  { code: 'ro', label: 'Română', shortLabel: 'RO', flag: '🇷🇴' },
  { code: 'ru', label: 'Русский', shortLabel: 'RU', flag: '🇷🇺' },
  { code: 'uk', label: 'Українська', shortLabel: 'UK', flag: '🇺🇦' },
  { code: 'pl', label: 'Polski', shortLabel: 'PL', flag: '🇵🇱' },
] as const satisfies readonly LocaleEntry[]

export const externalLocales = [
  {
    code: 'tr',
    label: 'Türkçe',
    shortLabel: 'TR',
    flag: '🇹🇷',
    href: 'https://tr.dentluna.com',
  },
] as const satisfies readonly ExternalLocaleEntry[]

/** Just the codes, e.g. ['en', 'de', 'fr'] */
export const localeCodes = locales.map((l) => l.code) as unknown as [string, ...string[]]

/** Default locale code */
export const defaultLocale = 'en' satisfies (typeof locales)[number]['code']

/** Map of code → short label, e.g. { en: 'EN', de: 'DE', fr: 'FR' } */
export const localeLabels: Record<string, string> = Object.fromEntries(
  [...locales, ...externalLocales].map((l) => [l.code, l.shortLabel]),
)

/** Map of code → flag emoji */
export const localeFlags: Record<string, string> = Object.fromEntries(
  [...locales, ...externalLocales].map((l) => [l.code, l.flag]),
)

/** Map of code → full label (e.g. 'English') */
export const localeFullLabels: Record<string, string> = Object.fromEntries(
  [...locales, ...externalLocales].map((l) => [l.code, l.label]),
)

/** Payload-compatible locale objects */
export const payloadLocales = locales.map(({ code, label }) => ({ code, label }))
