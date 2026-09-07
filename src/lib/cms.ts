import { cache } from 'react'
import type { Payload } from 'payload'
import type { HomeCmsData } from './homepage-types'
import type { Locale } from './i18n'

// Request-scoped, server-only use. Missing local credentials never initialize Payload.
export const getPublicPayload = cache(async (): Promise<Payload | null> => {
  const databaseURL = process.env.DATABASE_URL
  const secret = process.env.PAYLOAD_SECRET
  if (!databaseURL || !secret || databaseURL.includes('YOUR_') || secret.startsWith('REPLACE_WITH_')) return null
  try {
    const [{ getPayload }, { default: config }] = await Promise.all([import('payload'), import('@payload-config')])
    return await getPayload({ config })
  } catch {
    console.warn('[frontend] CMS connection unavailable.')
    return null
  }
})

export const getSiteSettings = cache(async (locale: Locale): Promise<HomeCmsData['settings']> => {
  const payload = await getPublicPayload()
  if (!payload) return {}
  try {
    const settings = await payload.findGlobal({ slug: 'site-settings', locale, fallbackLocale: false, overrideAccess: false, depth: 1 })
    return {
      companyName: settings.companyName, contactEmail: settings.contactEmail, phone: settings.phone,
      location: settings.location, navigation: settings.navigation, seo: settings.seo,
    }
  } catch {
    console.warn('[frontend] Site Settings unavailable; using local labels.')
    return {}
  }
})
