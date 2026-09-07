import type { Metadata } from 'next'
import { getHomeCmsData } from '@/lib/homepage'
import { languageAlternates, localizedHref, type Locale } from '@/lib/i18n'
import { HomePrototype } from './HomePrototype'

export async function homeMetadata(locale: Locale): Promise<Metadata> {
  const { settings } = await getHomeCmsData(locale)
  return {
    title: settings.seo?.title || (locale === 'bhs' ? 'Dev Studio — Od ideje do stvarnosti' : 'Dev Studio — From Idea to Reality'),
    description: settings.seo?.description || (locale === 'bhs'
      ? 'Integrisani studio za razvoj proizvoda i tehnologije u Banjoj Luci. Dizajn, elektronika, softver i proizvodnja. Od ideje do stvarnosti.'
      : 'An integrated product development and technology studio in Banja Luka. Design, electronics, software and manufacturing. From idea to reality.'),
    alternates: { canonical: localizedHref('/', locale), languages: languageAlternates('/') },
  }
}

export async function LocalizedHome({ locale }: { locale: Locale }) {
  return <HomePrototype cms={await getHomeCmsData(locale)} />
}
