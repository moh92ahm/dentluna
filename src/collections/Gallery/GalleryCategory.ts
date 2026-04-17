import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { slugField } from 'payload'
import {
  revalidateGalleryPageAfterChange,
  revalidateGalleryPageAfterDelete,
} from './hooks/revalidateGalleryPage'

export const GalleryCategory: CollectionConfig = {
  slug: 'gallery-category',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    slugField({
      position: undefined,
    }),
  ],
  hooks: {
    afterChange: [revalidateGalleryPageAfterChange],
    afterDelete: [revalidateGalleryPageAfterDelete],
  },
}
