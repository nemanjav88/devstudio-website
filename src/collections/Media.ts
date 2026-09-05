import path from 'node:path'
import type { CollectionConfig } from 'payload'
import { contentAccess } from '../access/content'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media', plural: 'Media' },
  admin: { useAsTitle: 'filename', group: 'Assets' },
  access: contentAccess,
  upload: {
    staticDir: path.resolve(process.cwd(), 'media/assets'),
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime'],
  },
  fields: [
    { name: 'alt', label: 'Alt text / accessible description', type: 'text', required: true, localized: true },
    { name: 'caption', type: 'textarea', localized: true },
  ],
}
