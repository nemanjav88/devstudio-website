import type { Homepage, Media, Solution, SiteSetting } from '../payload-types'
import type { Locale } from './i18n'

export type HomeLocale = Locale

export type HomeCmsData = {
  locale: HomeLocale
  settings: {
    companyName?: string
    contactEmail?: string
    phone?: string | null
    location?: string | null
    navigation?: Partial<SiteSetting['navigation']>
    seo?: Partial<SiteSetting['seo']>
  }
  homepage: Homepage
}

function populated<T>(value: number | T | null | undefined): T | undefined {
  return typeof value === 'object' && value !== null ? value as T : undefined
}

export function selectedSolutions(values?: (number | Solution)[] | null): Solution[] {
  return (values || []).map(value => populated<Solution>(value))
    .filter((value): value is Solution => Boolean(value?.title && value.slug && value._status === 'published')).slice(0, 4)
}

export function homepageImage(value: number | Media | null | undefined): Media | undefined {
  const asset = populated<Media>(value)
  return asset?.mimeType?.startsWith('image/') && asset.url ? asset : undefined
}

export function mediaURL(value: number | Media | null | undefined): string | undefined {
  return populated<Media>(value)?.url ?? undefined
}
