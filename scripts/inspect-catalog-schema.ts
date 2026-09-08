// Loads collection/global declarations only: no Payload config, initialization or DB.
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import type { Field } from 'payload'
import { Solutions } from '../src/collections/Solutions'
import { Projects } from '../src/collections/Projects'
import { Stories } from '../src/collections/Stories'
import { Downloads } from '../src/collections/Downloads'
import { Clients } from '../src/collections/Clients'
import { Media } from '../src/collections/Media'
import { Homepage } from '../src/globals/Homepage'
import { SiteSettings } from '../src/globals/SiteSettings'

function fields(items: Field[]): unknown[] {
  return items.map(field => {
    const f = field as Field & Record<string, unknown>
    return Object.fromEntries(Object.entries(f).filter(([key]) => key !== 'admin').map(([key, value]) => [
      key, key === 'fields' ? fields(value as Field[]) : typeof value === 'function' ? value.toString() : value,
    ]))
  })
}
const sourceFiles = [
  'src/collections/Solutions.ts', 'src/collections/Projects.ts', 'src/collections/Stories.ts',
  'src/collections/Downloads.ts', 'src/collections/Clients.ts', 'src/collections/Media.ts',
  'src/globals/Homepage.ts', 'src/globals/SiteSettings.ts', 'src/fields/content.ts',
  'src/payload.config.ts', 'src/access/content.ts', 'src/access/globals.ts',
]
const snapshot = {
  sourceFiles: sourceFiles.map(file => ({ file, sha256: createHash('sha256').update(readFileSync(file)).digest('hex') })),
  localization: { locales: ['bhs', 'en'], defaultLocale: 'bhs', fallback: false },
  collections: [Solutions, Projects, Stories, Downloads, Clients, Media].map(c => ({
    slug: c.slug, fields: fields(c.fields), versions: c.versions || false,
    upload: typeof c.upload === 'object' ? { mimeTypes: c.upload.mimeTypes, staticDir: c.slug === 'media' ? 'media/assets' : 'media/downloads' } : false,
  })),
  globals: [Homepage, SiteSettings].map(g => ({ slug: g.slug, fields: fields(g.fields) })),
}
writeFileSync('content-import/manifest/cms-schema.json', JSON.stringify(snapshot, null, 2) + '\n')
console.log('CMS schema snapshot: 6 collections, 2 globals, 12 source hashes. No database initialization.')
