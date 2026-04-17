import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import {
  revalidateFaqPageAfterChange,
  revalidateFaqPageAfterDelete,
} from './hooks/revalidateFaqPage'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order', 'updatedAt'],
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'faq-categories',
      hasMany: false,
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first on the FAQ page.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFaqPageAfterChange],
    afterDelete: [revalidateFaqPageAfterDelete],
  },
  timestamps: true,
}
