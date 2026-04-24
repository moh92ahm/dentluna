import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Treatments } from './collections/Treatments'
import { Posts } from './collections/Posts'
import { Doctors } from './collections/Doctors'
import { Categories } from './collections/Posts/Categories'
import { Gallery } from './collections/Gallery'
import { GalleryCategory } from './collections/Gallery/GalleryCategory'
import { Faqs } from './collections/FAQs/Faqs'
import { FaqCategories } from './collections/FAQs/FaqCategories'
import { FormSubmissions } from './collections/FormSubmissions'
import { payloadLocales, defaultLocale } from './i18n/locales'
import { CrmSettings } from './globals/CrmSettings'
import { FooterSettings } from './globals/FooterSettings'
import { HeaderSettings } from './globals/HeaderSettings'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const smtpSecure = ['1', 'true', 'ssl', 'yes'].includes(
  String(process.env.SMTP_SECURE || '').toLowerCase(),
)
const smtpSkipVerify = ['1', 'true', 'yes'].includes(
  String(process.env.SMTP_SKIP_VERIFY || 'true').toLowerCase(),
)
const isBuildPhase = process.env.DISABLE_EMAIL_ADAPTER === 'true'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization: {
    locales: payloadLocales,
    defaultLocale,
    fallback: true,
  },
  collections: [
    Treatments,
    Doctors,
    Posts,
    Categories,
    Gallery,
    GalleryCategory,
    Faqs,
    FaqCategories,
    FormSubmissions,
    Users,
    Media,
  ],
  globals: [CrmSettings, FooterSettings, HeaderSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    prodMigrations: migrations,
  }),
  email:
    !isBuildPhase && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
      ? nodemailerAdapter({
          defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'no-reply@dentluna.com',
          defaultFromName: process.env.EMAIL_FROM_NAME || 'Dentluna No-Reply',
          skipVerify: smtpSkipVerify,
          transportOptions: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: smtpSecure,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          },
        })
      : undefined,
  sharp,
  plugins: [
    seoPlugin({
      generateTitle: ({ doc }) => `${doc?.title ?? ''} – Dent Luna`,
      generateDescription: ({ doc }) => doc?.excerpt ?? '',
    }),
  ],
})
