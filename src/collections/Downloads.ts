import path from 'node:path'
import type { CollectionConfig } from 'payload'
import { contentAccess } from '../access/content'
import { featured, image, title, year } from '../fields/content'

export const Downloads: CollectionConfig = {
  slug: 'downloads',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'language', 'year'], group: 'Assets' },
  access: contentAccess,
  upload: {
    staticDir: path.resolve(process.cwd(), 'media/downloads'),
    mimeTypes: ['application/pdf'],
  },
  fields: [
    title(),
    { name: 'category', type: 'select', required: true, index: true, options: [
      { label: 'Complete catalog', value: 'catalog' },
      { label: 'Product / flyer', value: 'product-flyer' },
      { label: 'Thematic brochure', value: 'thematic-brochure' },
    ] },
    { name: 'language', type: 'select', required: true, index: true, options: [
      { label: 'BHS', value: 'bhs' }, { label: 'English', value: 'en' },
    ], admin: { description: 'Language of the uploaded PDF. Create separate records for each language version.' } },
    image('thumbnail'), year(),
    { name: 'relatedSolution', type: 'relationship', relationTo: 'solutions' },
    featured(),
  ],
}
