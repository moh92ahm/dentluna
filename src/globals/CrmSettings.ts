import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const CrmSettings: GlobalConfig = {
  slug: 'crm-settings',
  label: 'CRM Settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'webhookUrl',
      type: 'text',
      required: true,
      label: 'CRM Webhook URL',
      admin: {
        description:
          'The URL to send form submissions to',
      },
    },
    {
      name: 'fromWebsite',
      type: 'text',
      defaultValue: 'website',
      label: 'From Website Identifier',
      admin: {
        description: 'Value sent as "from website" field to the CRM',
      },
    },
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Enable CRM Integration',
      admin: {
        description: 'Toggle CRM webhook forwarding on/off',
      },
    },
  ],
}
