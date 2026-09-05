import type { Field } from 'payload'

export const title = (): Field => ({
  name: 'title', type: 'text', required: true, localized: true,
})

export const slug = (): Field => ({
  name: 'slug', type: 'text', required: true, unique: true, localized: true,
  index: true,
  admin: { description: 'Unique URL segment for this language, e.g. kids-play. Use lowercase letters, numbers and hyphens.' },
  validate: (value: unknown) =>
    typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
      ? true : 'Use lowercase letters, numbers and single hyphens.',
})

export const content = (): Field => ({
  name: 'content', label: 'Full content', type: 'richText', localized: true,
})

export const featured = (): Field => ({
  name: 'featured', type: 'checkbox', defaultValue: false, index: true,
})

export const year = (): Field => ({
  name: 'year', type: 'number', min: 1900, max: 2200,
  validate: (value: unknown) =>
    value == null || (typeof value === 'number' && Number.isInteger(value) && value >= 1900 && value <= 2200)
      ? true : 'Enter a whole year between 1900 and 2200.',
})

export const gallery = (): Field => ({
  name: 'gallery', type: 'array',
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true, filterOptions: { mimeType: { contains: 'image/' } } },
    { name: 'caption', type: 'textarea', localized: true },
  ],
})

export const image = (name: string): Field => ({
  name, type: 'upload', relationTo: 'media',
  filterOptions: { mimeType: { contains: 'image/' } },
})

export const video = (): Field => ({
  name: 'video', type: 'group',
  admin: { description: 'Choose an uploaded video or provide an external video URL.' },
  fields: [
    { name: 'file', type: 'upload', relationTo: 'media', filterOptions: { mimeType: { contains: 'video/' } } },
    { name: 'url', type: 'text', validate: httpURL },
    image('poster'),
    { name: 'caption', type: 'textarea', localized: true },
  ],
})

export function httpURL(value: unknown): true | string {
  if (value == null || value === '') return true
  try {
    const url = new URL(String(value))
    return ['http:', 'https:'].includes(url.protocol) ? true : 'Use an HTTP or HTTPS URL.'
  } catch {
    return 'Enter a complete HTTP or HTTPS URL.'
  }
}

export const downloads = (): Field => ({
  name: 'downloads', type: 'relationship', relationTo: 'downloads', hasMany: true,
})
