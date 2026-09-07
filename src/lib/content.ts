import type { Download, Media, Project, Solution, Story } from '@/payload-types'
import { localizedHref, type Locale } from './i18n'

export type EditorialCollection = 'projects' | 'solutions' | 'stories'
export type EditorialDocument = Project | Solution | Story
export type Section = EditorialCollection | 'resources'
export type SearchParams = Record<string, string | string[] | undefined>

export function populated<T>(value: T | number | null | undefined): T | undefined {
  return typeof value === 'object' && value !== null ? value : undefined
}

export function isPublished<T extends EditorialDocument = EditorialDocument>(doc: unknown): doc is T {
  if (typeof doc !== 'object' || doc === null) return false
  const value = doc as Partial<EditorialDocument>
  return value._status === 'published' && typeof value.title === 'string' && Boolean(value.title.trim())
    && typeof value.slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.slug)
}

export function documentHref(collection: EditorialCollection, doc: EditorialDocument, locale: Locale) {
  return localizedHref(`/${collection}/${doc.slug}`, locale)
}

export function coverMedia(doc: EditorialDocument): Media | undefined {
  if ('heroMedia' in doc && populated(doc.heroMedia)) return populated(doc.heroMedia)
  if ('coverImage' in doc && populated(doc.coverImage)) return populated(doc.coverImage)
  return populated(doc.gallery?.[0]?.image)
}

export function description(doc: EditorialDocument): string | undefined {
  return ('excerpt' in doc ? doc.excerpt : 'shortDescription' in doc ? doc.shortDescription : undefined) || undefined
}

export function pageNumber(value: string | string[] | undefined): number {
  if (typeof value !== 'string' || !/^[1-9]\d{0,5}$/.test(value)) return 1
  return Number(value)
}

/** Only web URLs, site paths and explicit contact/anchor links are renderable. */
export function safeHref(value: unknown): string | undefined {
  if (typeof value !== 'string' || Array.from(value).some(char => char.charCodeAt(0) <= 32 || char === '\\')) return undefined
  if ((value.startsWith('/') && !value.startsWith('//')) || value.startsWith('#')) return value
  try {
    return ['https:', 'http:', 'mailto:', 'tel:'].includes(new URL(value).protocol) ? value : undefined
  } catch { return undefined }
}

export function availableDownload(doc: Download | number | null | undefined): doc is Download {
  return typeof doc === 'object' && doc !== null && Boolean(safeHref(doc.url)) && doc.mimeType === 'application/pdf'
}

export function fileSize(bytes: number | null | undefined): string | undefined {
  if (!bytes || bytes < 0) return undefined
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`
}
