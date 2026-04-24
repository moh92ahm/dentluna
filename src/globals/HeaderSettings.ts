import type { GlobalConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const HeaderSettings: GlobalConfig = {
  slug: 'header-settings',
  label: 'Header',
  admin: {
    group: 'Settings',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'navLinks',
      type: 'array',
      label: 'Navigation Links',
      maxRows: 6,
      admin: {
        description: 'Add up to 6 navigation links shown in the header.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: 'Label',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
          admin: {
            description: 'Use relative paths, e.g. /about or /treatments',
          },
        },
      ],
    },
  ],
}
