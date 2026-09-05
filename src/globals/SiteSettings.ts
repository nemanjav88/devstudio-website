import type { GlobalConfig } from 'payload'
import { globalAccess } from '../access/globals'
import { httpURL, image } from '../fields/content'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Settings' },
  access: globalAccess,
  fields: [
    { name: 'companyName', type: 'text', required: true, defaultValue: 'Dev Studio' },
    {
      name: 'navigation', type: 'group', label: 'Navigation labels', fields: [
        { name: 'solutions', type: 'text', required: true, localized: true, defaultValue: 'Solutions' },
        { name: 'projects', type: 'text', required: true, localized: true, defaultValue: 'Projects' },
        { name: 'capabilities', type: 'text', required: true, localized: true, defaultValue: 'Capabilities' },
        { name: 'about', type: 'text', required: true, localized: true, defaultValue: 'About' },
        { name: 'stories', type: 'text', required: true, localized: true, defaultValue: 'Stories' },
        { name: 'resources', type: 'text', required: true, localized: true, defaultValue: 'Resources' },
        { name: 'contact', type: 'text', required: true, localized: true, defaultValue: 'Contact' },
        { name: 'startAProject', type: 'text', required: true, localized: true, defaultValue: 'Start a Project' },
      ],
    },
    { name: 'contactEmail', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'location', type: 'text', localized: true },
    {
      name: 'socialLinks', type: 'array', fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'url', type: 'text', required: true, validate: httpURL },
      ],
    },
    {
      name: 'seo', type: 'group', label: 'Default SEO', fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', required: true, localized: true },
        image('shareImage'),
      ],
    },
  ],
}
