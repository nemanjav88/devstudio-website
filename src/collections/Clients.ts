import type { CollectionConfig } from 'payload'
import { contentAccess } from '../access/content'
import { featured, httpURL, image } from '../fields/content'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'industry', 'featured'], group: 'Content' },
  access: contentAccess,
  fields: [
    { name: 'name', type: 'text', required: true },
    image('logo'),
    { name: 'website', type: 'text', validate: httpURL },
    { name: 'industry', type: 'text', localized: true },
    featured(),
  ],
}
