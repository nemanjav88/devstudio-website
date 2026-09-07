import { cache } from 'react'
import type { Config, Download } from '@/payload-types'
import type { Where, JoinQuery } from 'payload'
import { getPublicPayload } from './cms'
import { availableDownload, isPublished, type EditorialCollection, type EditorialDocument } from './content'
import { localizedHref, type Locale } from './i18n'

const translatedPublished: Where = { and: [
  { _status: { equals: 'published' } }, { title: { exists: true } }, { title: { not_equals: '' } },
  { slug: { exists: true } }, { slug: { not_equals: '' } },
] }

export async function findEditorial<C extends EditorialCollection>(collection: C, locale: Locale, page = 1, where?: Where, limit = 8) {
  const empty = { docs: [] as Config['collections'][C][], page, totalPages: 0, totalDocs: 0, unavailable: false }
  const payload = await getPublicPayload()
  if (!payload) return { ...empty, unavailable: true }
  try {
    const result = await payload.find({
      collection, locale, fallbackLocale: false, overrideAccess: false, draft: false, depth: 2,
      joins: false as JoinQuery<C>, limit, page, sort: collection === 'solutions' ? 'title' : '-createdAt',
      where: where ? { and: [translatedPublished, where] } : translatedPublished,
    })
    return { docs: result.docs.filter(isPublished), page: result.page || page, totalPages: result.totalPages, totalDocs: result.totalDocs, unavailable: false }
  } catch {
    console.warn(`[frontend] ${collection} query unavailable.`)
    return { ...empty, unavailable: true }
  }
}

export const getDetail = cache(async (collection: EditorialCollection, slug: string, locale: Locale) => {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { doc: null, unavailable: false, translatedPaths: {}, languages: {} }
  const result = await findEditorial(collection, locale, 1, { slug: { equals: slug } }, 1)
  const doc = result.docs[0] || null
  const translatedPaths: Partial<Record<Locale, string>> = {}
  const languages: Record<string, string> = {}
  if (doc) {
    const other: Locale = locale === 'bhs' ? 'en' : 'bhs'
    const counterpart = await findEditorial(collection, other, 1, { id: { equals: doc.id } }, 1)
    translatedPaths[locale] = localizedHref(`/${collection}/${doc.slug}`, locale)
    translatedPaths[other] = localizedHref(counterpart.docs[0] ? `/${collection}/${counterpart.docs[0].slug}` : `/${collection}`, other)
    languages[locale === 'bhs' ? 'bs' : 'en'] = translatedPaths[locale]!
    // A section index is a switcher fallback, never a detail page hreflang alternate.
    if (counterpart.docs[0]) languages[other === 'bhs' ? 'bs' : 'en'] = translatedPaths[other]!
    if (languages.bs) languages['x-default'] = languages.bs
  }
  return { doc, unavailable: result.unavailable, translatedPaths, languages }
})

export async function findDownloads(locale: Locale, page = 1, language: Locale | 'all' = locale, category?: Download['category'], where?: Where, limit = 18) {
  const empty = { docs: [] as Download[], page, totalPages: 0, totalDocs: 0, unavailable: false }
  const payload = await getPublicPayload()
  if (!payload) return { ...empty, unavailable: true }
  const filters: Where[] = [{ mimeType: { equals: 'application/pdf' } }]
  if (language !== 'all') filters.push({ language: { equals: language } })
  if (category) filters.push({ category: { equals: category } })
  if (where) filters.push(where)
  try {
    const result = await payload.find({
      collection: 'downloads', locale, fallbackLocale: false, overrideAccess: false, depth: 1,
      page, limit, sort: ['-featured', '-year', '-createdAt'], where: { and: filters },
    })
    return { docs: result.docs.filter(availableDownload), page: result.page || page, totalPages: result.totalPages, totalDocs: result.totalDocs, unavailable: false }
  } catch {
    console.warn('[frontend] Downloads query unavailable.')
    return { ...empty, unavailable: true }
  }
}

export async function getRelated(collection: EditorialCollection, doc: EditorialDocument, locale: Locale) {
  const id = doc.id
  const ids = (values: (number | { id: number })[] | null | undefined) => (values || []).map(value => typeof value === 'number' ? value : value.id)
  const none: Where = { id: { in: [] } }
  let projects: Where = none
  let stories: Where = none
  let solutions: Where = none
  let downloads: Where = { id: { in: ids(doc.downloads) } }
  if (collection === 'solutions') {
    projects = { relatedSolution: { equals: id } }
    stories = { relatedSolutions: { in: [id] } }
    downloads = { or: [downloads, { relatedSolution: { equals: id } }] }
  } else if (collection === 'projects' && 'relatedSolution' in doc) {
    const solutionID = typeof doc.relatedSolution === 'object' ? doc.relatedSolution?.id : doc.relatedSolution
    if (solutionID) {
      solutions = { id: { equals: solutionID } }
      projects = { and: [{ relatedSolution: { equals: solutionID } }, { id: { not_equals: id } }] }
    }
    stories = { relatedProjects: { in: [id] } }
  } else if (collection === 'projects') {
    stories = { relatedProjects: { in: [id] } }
  } else if (collection === 'stories' && 'type' in doc) {
    projects = { id: { in: ids(doc.relatedProjects) } }
    solutions = { id: { in: ids(doc.relatedSolutions) } }
  }
  const [projectResult, storyResult, solutionResult, downloadResult] = await Promise.all([
    findEditorial('projects', locale, 1, projects, 6), findEditorial('stories', locale, 1, stories, 6),
    findEditorial('solutions', locale, 1, solutions, 6), findDownloads(locale, 1, locale, undefined, downloads, 12),
  ])
  return { projects: projectResult.docs, stories: storyResult.docs, solutions: solutionResult.docs, downloads: downloadResult.docs }
}
