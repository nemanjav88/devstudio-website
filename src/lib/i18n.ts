export const locales = ['bhs', 'en'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'bhs'
export const htmlLanguages = { bhs: 'bs', en: 'en' } as const

/** Only the complete /en segment selects English; never inspect browser preferences. */
export function localeFromPath(path: string): Locale {
  return /^\/en(?:\/|[?#]|$)/.test(path) ? 'en' : defaultLocale
}

/** Root-relative frontend URLs only. Assets, Payload, external URLs and local anchors stay intact. */
export function localizedHref(href: string, locale: Locale): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href
  const boundary = href.search(/[?#]/)
  const pathname = boundary === -1 ? href : href.slice(0, boundary)
  const suffix = boundary === -1 ? '' : href.slice(boundary)
  const path = pathname.replace(/^\/en(?=\/|$)/, '') || '/'
  if (/^\/(?:admin|api|_next|media)(?:\/|$)/.test(path) || /\/[^/]*\.[^/]+$/.test(path)) return href
  return (locale === 'en' ? `/en${path === '/' ? '' : path}` : path) + suffix
}

/** Supply translated paths when future CMS detail pages use different localized slugs. */
export function languageAlternates(path: string, translatedPaths?: Partial<Record<Locale, string>>) {
  return {
    bs: localizedHref(translatedPaths?.bhs ?? path, 'bhs'),
    en: localizedHref(translatedPaths?.en ?? path, 'en'),
    'x-default': localizedHref(translatedPaths?.bhs ?? path, 'bhs'),
  }
}
