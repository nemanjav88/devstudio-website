import { localizedHref, type Locale } from '@/lib/i18n'

const siteUrl = 'https://devstudio.biz'

type OrganizationSettings = {
  companyName?: string
  contactEmail?: string
  phone?: string | null
  socialLinks?: { url: string }[] | null
}

type StructuredData = Record<string, unknown>

export function StructuredDataScript({ data }: { data: StructuredData }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

export function organizationStructuredData(settings: OrganizationSettings): StructuredData {
  const sameAs = settings.socialLinks?.map(link => link.url).filter(Boolean)
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    url: siteUrl,
    name: settings.companyName || 'Dev Studio',
    logo: `${siteUrl}/brand/logo.png`,
    ...(settings.contactEmail ? { email: settings.contactEmail } : {}),
    ...(settings.phone ? { telephone: settings.phone } : {}),
    ...(sameAs?.length ? { sameAs } : {}),
  }
}

export function websiteStructuredData(locale: Locale): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'Dev Studio',
    publisher: { '@id': `${siteUrl}/#organization` },
    inLanguage: locale === 'bhs' ? 'bs' : 'en',
  }
}

export function breadcrumbStructuredData({ locale, section, title, path }: { locale: Locale; section: 'solutions' | 'stories'; title: string; path: string }): StructuredData {
  const sectionName = section === 'solutions'
    ? (locale === 'bhs' ? 'Šta stvaramo' : 'What We Build')
    : (locale === 'bhs' ? 'Priče' : 'Stories')
  const homePath = localizedHref('/', locale)
  const sectionPath = localizedHref(`/${section}`, locale)
  const absolute = (value: string) => new URL(value, siteUrl).toString()
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Dev Studio', item: absolute(homePath) },
      { '@type': 'ListItem', position: 2, name: sectionName, item: absolute(sectionPath) },
      { '@type': 'ListItem', position: 3, name: title, item: absolute(path) },
    ],
  }
}
