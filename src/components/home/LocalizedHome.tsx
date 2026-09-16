import type { Metadata } from 'next'
import { getHomeCmsData } from '@/lib/homepage'
import { languageAlternates, localizedHref, type Locale } from '@/lib/i18n'
import { metadataImage, socialMetadata } from '@/lib/seo'
import { HomePrototype } from './HomePrototype'

export async function homeMetadata(locale: Locale): Promise<Metadata> {
  const { settings } = await getHomeCmsData(locale)
  const title = settings.seo?.title || (locale === 'bhs'
    ? 'Dev Studio | Razvoj proizvoda, tehnologija i proizvodnja'
    : 'Dev Studio | Product Development, Technology & Manufacturing')
  const description = settings.seo?.description || (locale === 'bhs'
    ? 'Dev Studio iz Banje Luke razvija proizvode, retail tehnologiju i interaktivne sisteme — od koncepta i dizajna do elektronike, softvera i proizvodnje.'
    : 'Dev Studio in Banja Luka develops products, retail technology and interactive systems—from concept and design to electronics, software and manufacturing.')
  const canonical = localizedHref('/', locale)
  return {
    title, description, alternates: { canonical, languages: languageAlternates('/') },
    ...socialMetadata({ title, description, url: canonical, locale, image: metadataImage(settings.seo?.shareImage) }),
  }
}

export async function LocalizedHome({ locale }: { locale: Locale }) {
  return <HomePrototype cms={await getHomeCmsData(locale)} />
}
