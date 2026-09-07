import type { Homepage } from '../payload-types'
import { cache } from 'react'
import type { HomeCmsData, HomeLocale } from './homepage-types'
export type { HomeCmsData, HomeLocale } from './homepage-types'

export const getHomeCmsData = cache(async (locale: HomeLocale): Promise<HomeCmsData> => {
  const fallback: HomeCmsData = { locale, settings: {}, homepage: {} as Homepage }
  const databaseURL = process.env.DATABASE_URL
  const payloadSecret = process.env.PAYLOAD_SECRET
  if (!databaseURL || !payloadSecret || databaseURL.includes('YOUR_') || payloadSecret.startsWith('REPLACE_WITH_')) return fallback

  try {
    const [{ getPayload }, { default: config }] = await Promise.all([
      import('payload'), import('@payload-config'),
    ])
    const payload = await getPayload({ config })
    const [homeResult, settingsResult] = await Promise.allSettled([
      payload.findGlobal({ slug: 'homepage', locale, fallbackLocale: false, overrideAccess: false, depth: 2 }),
      payload.findGlobal({ slug: 'site-settings', locale, fallbackLocale: false, overrideAccess: false, depth: 2 }),
    ])
    for (const [index, result] of [homeResult, settingsResult].entries()) {
      if (result.status === 'rejected') console.warn(`[homepage] ${index === 0 ? 'Homepage' : 'Site Settings'} unavailable; using local fallback.`)
    }
    const homepage = homeResult.status === 'fulfilled' ? homeResult.value : fallback.homepage
    const settings = settingsResult.status === 'fulfilled' ? settingsResult.value : undefined
    return { locale, homepage, settings: {
      companyName: settings?.companyName,
      contactEmail: settings?.contactEmail,
      phone: settings?.phone,
      location: settings?.location,
      navigation: settings?.navigation,
      seo: settings?.seo,
    } }
  } catch (error) {
    console.warn('[homepage] CMS unavailable; using local prototype fallback.', error instanceof Error ? error.message : error)
    return fallback
  }
})
