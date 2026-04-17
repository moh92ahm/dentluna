import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { revalidateDoctor, revalidateDoctorDelete } from './hooks/revalidateDoctor'

export const Doctors: CollectionConfig = {
  slug: 'doctors',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'specialty', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'specialty',
      type: 'text',
      required: true,
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'biography',
      type: 'richText',
      label: 'Bio',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (!value && typeof siblingData?.name === 'string') {
              return siblingData.name
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, '')
            }

            return value
          },
        ],
      },
    },
  ],
  hooks: {
    afterChange: [revalidateDoctor],
    afterDelete: [revalidateDoctorDelete],
  },
  timestamps: true,
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 25,
  },
}
