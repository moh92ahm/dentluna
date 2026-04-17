import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import {
  revalidateGalleryPageAfterChange,
  revalidateGalleryPageAfterDelete,
} from './hooks/revalidateGalleryPage'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'createdAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    slugField({
      position: 'sidebar',
    }),
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'gallery-category',
      required: false,
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'beforeImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Before image for the procedure',
      },
    },
    {
      name: 'afterImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'After image showing the results',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateGalleryPageAfterChange],
    afterDelete: [revalidateGalleryPageAfterDelete],
  },
  timestamps: true,
}
