import type { GlobalConfig } from 'payload'
import { globalAccess } from '../access/globals'
import { image, video } from '../fields/content'

const localizedText = (name: string, label?: string) => ({ name, label, type: 'text' as const, localized: true })
const localizedTextarea = (name: string, label?: string) => ({ name, label, type: 'textarea' as const, localized: true })

const processSteps = {
  name: 'steps', type: 'array' as const, minRows: 5, maxRows: 5,
  fields: [
    { name: 'number', type: 'text' as const, required: true },
    { name: 'title', type: 'text' as const, required: true, localized: true },
    { name: 'description', type: 'textarea' as const, localized: true },
  ],
}

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: { group: 'Content' },
  access: globalAccess,
  fields: [
    {
      name: 'hero', type: 'group', fields: [
        localizedText('eyebrow', 'Eyebrow'), localizedText('headline', 'Headline'),
        localizedText('supportingLine', 'Supporting line'), localizedTextarea('subtext', 'Subtext'),
        localizedText('primaryCtaLabel', 'Primary CTA label'), localizedText('secondaryCtaLabel', 'Secondary CTA label'),
        { name: 'heroMedia', type: 'upload', relationTo: 'media' }, video(),
      ],
    },
    {
      name: 'positioning', type: 'group', fields: [
        localizedText('headline', 'Headline'), localizedTextarea('supportingText', 'Supporting text'),
      ],
    },
    {
      name: 'selectedWork', type: 'group', fields: [
        localizedText('headline', 'Headline'), localizedTextarea('intro', 'Intro'),
        { name: 'projects', type: 'relationship', relationTo: 'projects', hasMany: true, maxRows: 4 },
      ],
    },
    {
      name: 'whatWeBuild', type: 'group', fields: [
        localizedText('headline', 'Headline'),
        { name: 'categories', type: 'array', fields: [localizedText('name', 'Category name')] },
      ],
    },
    {
      name: 'process', type: 'group', fields: [
        localizedText('opening', 'Opening'), localizedText('headline', 'Headline'), processSteps,
        localizedText('closing', 'Closing'),
      ],
    },
    {
      name: 'whyDevStudio', type: 'group', fields: [
        localizedText('headline', 'Headline'), localizedTextarea('body', 'Body'),
      ],
    },
    {
      name: 'madeHere', type: 'group', fields: [
        localizedText('headline', 'Headline'), localizedTextarea('body', 'Body'),
        { name: 'location', type: 'text', localized: true }, image('media'),
      ],
    },
    {
      name: 'ownProducts', type: 'group', fields: [
        localizedText('headline', 'Headline'), localizedTextarea('body', 'Body'),
        { name: 'products', type: 'relationship', relationTo: 'projects', hasMany: true }, image('media'),
      ],
    },
    {
      name: 'latestFromTheStudio', type: 'group', fields: [
        localizedText('headline', 'Headline'), localizedTextarea('intro', 'Intro'),
        { name: 'stories', type: 'relationship', relationTo: 'stories', hasMany: true, maxRows: 3 },
      ],
    },
    {
      name: 'finalCta', type: 'group', fields: [
        localizedText('headline', 'Headline'), localizedTextarea('body', 'Body'),
        localizedText('buttonLabel', 'Button label'), image('media'),
      ],
    },
  ],
}
