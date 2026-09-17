import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { htmlLanguages, type Locale } from '@/lib/i18n'
import { getSiteSettings } from '@/lib/cms'
import { organizationStructuredData, StructuredDataScript, websiteStructuredData } from '@/components/seo/StructuredData'
import '@/app/(frontend)/globals.css'
import '@/app/(frontend)/content.css'

export const frontendMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://devstudio.biz'),
  title: 'Dev Studio — From Idea to Reality',
  description: 'An integrated product development and technology studio in Banja Luka. Design, electronics, software and manufacturing. From idea to reality.',
}

export async function FrontendLayout({ children, locale }: { children: ReactNode; locale: Locale }) {
  const settings = await getSiteSettings(locale)
  return <html lang={htmlLanguages[locale]}><body><StructuredDataScript data={organizationStructuredData(settings)} /><StructuredDataScript data={websiteStructuredData(locale)} />{children}</body></html>
}
