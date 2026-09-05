import type { CollectionConfig } from 'payload'
import { editorialAccess } from '../access/content'
import { content, downloads, featured, gallery, image, slug, title, video } from '../fields/content'

export const Stories: CollectionConfig = {
  slug: 'stories',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'type', 'featured', '_status'], group: 'Content' },
  access: editorialAccess,
  versions: { drafts: true, maxPerDoc: 50 },
  fields: [
    title(), slug(),
    { name: 'type', type: 'select', required: true, index: true, options: [
      { label: 'Project Story', value: 'project-story' },
      { label: 'Video', value: 'video' },
      { label: 'News', value: 'news' },
      { label: 'Technology', value: 'technology' },
      { label: 'Behind the Build', value: 'behind-the-build' },
      { label: 'Case Study', value: 'case-study' },
    ] },
    { name: 'excerpt', type: 'textarea', localized: true },
    content(), image('coverImage'), gallery(), video(),
    { name: 'relatedProjects', type: 'relationship', relationTo: 'projects', hasMany: true },
    { name: 'relatedSolutions', type: 'relationship', relationTo: 'solutions', hasMany: true },
    downloads(), featured(),
  ],
}
