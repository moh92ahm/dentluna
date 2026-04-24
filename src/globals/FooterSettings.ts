import type { GlobalConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const FooterSettings: GlobalConfig = {
  slug: 'footer-settings',
  label: 'Footer',
  admin: {
    group: 'Settings',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Branding',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              localized: true,
              label: 'Description',
              admin: {
                description: 'Short description shown below the logo',
              },
            },
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Social Links',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  label: 'Platform',
                  options: [
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Twitter / X', value: 'twitter' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'TikTok', value: 'tiktok' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  label: 'URL',
                },
              ],
            },
          ],
        },
        {
          label: 'Link Sections',
          fields: [
            {
              name: 'linkSections',
              type: 'array',
              label: 'Link Sections',
              admin: {
                description: 'Add up to 3 link column sections (shown in a 3-column grid)',
              },
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  localized: true,
                  required: true,
                  label: 'Section Heading',
                },
                {
                  name: 'links',
                  type: 'array',
                  label: 'Links',
                  fields: [
                    {
                      name: 'linkType',
                      type: 'select',
                      defaultValue: 'custom',
                      required: true,
                      label: 'Link Type',
                      options: [
                        { label: 'Custom URL', value: 'custom' },
                        { label: 'Treatment', value: 'treatment' },
                        { label: 'Post', value: 'post' },
                      ],
                    },
                    {
                      name: 'label',
                      type: 'text',
                      localized: true,
                      label: 'Label',
                      admin: {
                        description:
                          'Required for Custom URL. For Treatment/Post this overrides the document title.',
                        condition: () => true,
                      },
                    },
                    {
                      name: 'url',
                      type: 'text',
                      label: 'URL',
                      admin: {
                        condition: (_, siblingData) => siblingData?.linkType === 'custom',
                        description:
                          'Use /about for internal pages or https://... for external links.',
                      },
                    },
                    {
                      name: 'treatment',
                      type: 'relationship',
                      relationTo: 'treatments',
                      label: 'Treatment',
                      admin: {
                        condition: (_, siblingData) => siblingData?.linkType === 'treatment',
                      },
                    },
                    {
                      name: 'post',
                      type: 'relationship',
                      relationTo: 'posts',
                      label: 'Post',
                      admin: {
                        condition: (_, siblingData) => siblingData?.linkType === 'post',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Bottom Bar',
          fields: [
            {
              name: 'copyrightText',
              type: 'text',
              localized: true,
              label: 'Copyright Text',
              admin: {
                description: 'Use {year} as a placeholder for the current year',
              },
            },
            {
              name: 'legalLinks',
              type: 'array',
              label: 'Legal Links',
              admin: {
                description:
                  'Links shown at the bottom right (e.g. Terms & Conditions, Privacy Policy)',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                  required: true,
                  label: 'Link Label',
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  label: 'URL',
                  admin: {
                    description:
                      'Use /privacy-policy for internal pages or https://... for external links.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
