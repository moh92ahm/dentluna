import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
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
    Users,
    Media,
  ],
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
  sharp,
  plugins: [
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
