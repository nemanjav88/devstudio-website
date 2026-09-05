import type { CollectionConfig } from 'payload'
import { editorialAccess } from '../access/content'
import { content, downloads, featured, gallery, slug, title, video, year } from '../fields/content'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'client', 'year', 'featured', '_status'], group: 'Content' },
  access: editorialAccess,
  versions: { drafts: true, maxPerDoc: 50 },
  fields: [
    title(), slug(),
    { name: 'client', type: 'relationship', relationTo: 'clients' },
    year(),
    { name: 'industry', type: 'text', localized: true },
    { name: 'services', type: 'array', localized: true, fields: [{ name: 'service', type: 'text', required: true }] },
    { name: 'technologies', type: 'array', fields: [{ name: 'technology', type: 'text', required: true }] },
    { name: 'shortDescription', type: 'textarea', localized: true },
    content(), gallery(), video(),
    { name: 'relatedSolution', type: 'relationship', relationTo: 'solutions', index: true },
    downloads(), featured(),
  ],
}
