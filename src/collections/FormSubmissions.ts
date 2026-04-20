import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    singular: 'Form Submission',
    plural: 'Form Submissions',
  },
  admin: {
    group: 'Forms',
    defaultColumns: ['name', 'phone', 'category', 'lang', 'crmSent', 'createdAt'],
    useAsTitle: 'name',
  },
  access: {
    read: authenticated,
    create: () => true, // Public — form submissions come from the frontend
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone Number',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
    },
    {
      name: 'category',
      type: 'text',
      label: 'Category',
    },
    {
      name: 'promoCode',
      type: 'text',
      label: 'Promotion Code',
    },
    {
      name: 'lang',
      type: 'text',
      label: 'Language',
      admin: {
        description: 'Language code of the visitor when they submitted the form',
      },
    },
    {
      name: 'crmSent',
      type: 'checkbox',
      defaultValue: false,
      label: 'Sent to CRM',
      admin: {
        readOnly: true,
        description: 'Whether this submission was successfully forwarded to the CRM',
      },
    },
    {
      name: 'crmError',
      type: 'textarea',
      label: 'CRM Error',
      admin: {
        readOnly: true,
        description: 'Error details if CRM forwarding failed',
        condition: (data) => Boolean(data?.crmError),
      },
    },
  ],
  timestamps: true,
}
