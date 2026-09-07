import type { Homepage, Media, Project, SiteSetting, Story } from '../payload-types'
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

export function projectTitle(value: number | Project | null | undefined): string | undefined {
  return populated<Project>(value)?.title
}

export function storyData(value: number | Story): Story | undefined {
  return populated<Story>(value)
}

export function mediaURL(value: number | Media | null | undefined): string | undefined {
  return populated<Media>(value)?.url ?? undefined
}
