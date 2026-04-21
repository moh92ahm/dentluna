import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
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
  globals: [CrmSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  email:
    !isBuildPhase && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
      ? nodemailerAdapter({
          defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'no-reply@dentluna.com',
          defaultFromName: process.env.EMAIL_FROM_NAME || 'Dentluna No-Reply',
          transportOptions: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: process.env.SMTP_SECURE === 'true',
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
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
      alwaysInsertFields: true,
      collections: {
        [Media.slug]: true,
      },
    }),
  ],
})
