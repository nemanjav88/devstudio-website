import type { Homepage } from '../payload-types'
import { cache } from 'react'
import { getPublicPayload, getSiteSettings } from './cms'
import type { HomeCmsData, HomeLocale } from './homepage-types'
export type { HomeCmsData, HomeLocale } from './homepage-types'

export const getHomeCmsData = cache(async (locale: HomeLocale): Promise<HomeCmsData> => {
  const [payload, settings] = await Promise.all([getPublicPayload(), getSiteSettings(locale)])
  let homepage = {} as Homepage
  if (payload) {
    try {
      homepage = await payload.findGlobal({ slug: 'homepage', locale, fallbackLocale: false, overrideAccess: false, depth: 2 })
    } catch {
      console.warn('[homepage] Homepage unavailable; using local fallback.')
    }
  }
  return { locale, homepage, settings }
})
