import type { CollectionConfig } from 'payload'
import { editorialAccess } from '../access/content'
import { content, downloads, gallery, slug, title } from '../fields/content'

export const Solutions: CollectionConfig = {
  slug: 'solutions',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'solutionGroup', '_status'], group: 'Content' },
  access: editorialAccess,
  versions: { drafts: true, maxPerDoc: 50 },
  fields: [
    title(), slug(),
    { name: 'solutionGroup', type: 'select', required: true, index: true, options: [
      { label: 'Retail Technology & Digital Systems', value: 'digital-retail' },
      { label: 'Brand Experiences & Activations', value: 'brand-experiences' },
      { label: 'Dev Studio Products', value: 'entertainment' },
      { label: 'Custom Products & Interactive Systems', value: 'custom-engineering' },
      { label: 'Production', value: 'production' },
    ] },
    { name: 'shortDescription', type: 'textarea', localized: true },
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'SEO title',
          type: 'text',
          localized: true,
          admin: {
            description: "Optional search title. Do not include '| Dev Studio'; the brand suffix is added automatically.",
          },
        },
        {
          name: 'description',
          label: 'SEO description',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Optional search description. Falls back to Short Description when empty.',
          },
        },
      ],
    },
    content(),
    { name: 'heroMedia', type: 'upload', relationTo: 'media' },
    gallery(),
    { name: 'relatedProjects', type: 'join', collection: 'projects', on: 'relatedSolution' },
    { name: 'relatedStories', type: 'join', collection: 'stories', on: 'relatedSolutions' },
    downloads(),
  ],
}
