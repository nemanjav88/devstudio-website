import type { Homepage } from '../payload-types'
import type { HomeCmsData, HomeLocale } from './homepage-types'
export type { HomeCmsData, HomeLocale } from './homepage-types'

export function homeLocaleFromAcceptLanguage(value: string | null): HomeLocale {
  return value?.toLowerCase().match(/^(bs|hr|sr)(-|,|;)/) ? 'bhs' : 'en'
}

export async function getHomeCmsData(locale: HomeLocale): Promise<HomeCmsData> {
  const fallback: HomeCmsData = { locale, settings: {}, homepage: {} as Homepage }
  const databaseURL = process.env.DATABASE_URL
  const payloadSecret = process.env.PAYLOAD_SECRET
  if (!databaseURL || !payloadSecret || databaseURL.includes('YOUR_') || payloadSecret.startsWith('REPLACE_WITH_')) return fallback

  try {
    const [{ getPayload }, { default: config }] = await Promise.all([
      import('payload'), import('@payload-config'),
    ])
    const payload = await getPayload({ config })
    const [homepage, settings] = await Promise.all([
      payload.findGlobal({ slug: 'homepage', locale, depth: 2 }),
      payload.findGlobal({ slug: 'site-settings', locale, depth: 2 }),
    ])
    return { locale, homepage, settings: {
      companyName: settings.companyName,
      contactEmail: settings.contactEmail,
      phone: settings.phone,
      location: settings.location,
      navigation: settings.navigation,
    } }
  } catch (error) {
    console.warn('[homepage] CMS unavailable; using local prototype fallback.', error instanceof Error ? error.message : error)
    return fallback
  }
}
