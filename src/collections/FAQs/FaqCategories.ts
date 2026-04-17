import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { slugField } from 'payload'
import {
  revalidateFaqPageAfterChange,
  revalidateFaqPageAfterDelete,
} from './hooks/revalidateFaqPage'

export const FaqCategories: CollectionConfig = {
  slug: 'faq-categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
  hooks: {
    afterChange: [revalidateFaqPageAfterChange],
    afterDelete: [revalidateFaqPageAfterDelete],
  },
}
