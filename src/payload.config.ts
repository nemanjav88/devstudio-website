import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Projects } from './collections/Projects'
import { Stories } from './collections/Stories'
import { Solutions } from './collections/Solutions'
import { Downloads } from './collections/Downloads'
import { Clients } from './collections/Clients'
import { Media } from './collections/Media'
import { SiteSettings } from './globals/SiteSettings'
import { Homepage } from './globals/Homepage'

const dirname = path.dirname(fileURLToPath(import.meta.url))

function requiredEnv(name: 'DATABASE_URL' | 'PAYLOAD_SECRET'): string {
  const value = process.env[name]
  if (!value || value.includes('YOUR_') || value.startsWith('REPLACE_WITH_')) {
    throw new Error(`Set ${name} in .env or the server environment before running Payload.`)
  }
  return value
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
  },
  collections: [Users, Projects, Stories, Solutions, Downloads, Clients, Media],
  globals: [SiteSettings, Homepage],
  editor: lexicalEditor(),
  sharp,
  localization: {
    locales: [{ label: 'BHS', code: 'bhs' }, { label: 'English', code: 'en' }],
    defaultLocale: 'bhs',
    fallback: false,
  },
  secret: requiredEnv('PAYLOAD_SECRET'),
  db: postgresAdapter({
    pool: { connectionString: requiredEnv('DATABASE_URL') },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
