import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'

import { Users } from './collections/Users'

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
  collections: [Users],
  secret: requiredEnv('PAYLOAD_SECRET'),
  db: postgresAdapter({
    pool: { connectionString: requiredEnv('DATABASE_URL') },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
