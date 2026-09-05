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
      { label: 'Digital & Retail', value: 'digital-retail' },
      { label: 'Brand Experiences', value: 'brand-experiences' },
      { label: 'Entertainment', value: 'entertainment' },
      { label: 'Custom Engineering', value: 'custom-engineering' },
      { label: 'Production', value: 'production' },
    ] },
    { name: 'shortDescription', type: 'textarea', localized: true },
    content(),
    { name: 'heroMedia', type: 'upload', relationTo: 'media' },
    gallery(),
    { name: 'relatedProjects', type: 'join', collection: 'projects', on: 'relatedSolution' },
    { name: 'relatedStories', type: 'join', collection: 'stories', on: 'relatedSolutions' },
    downloads(),
  ],
}
