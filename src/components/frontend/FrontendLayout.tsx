import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { htmlLanguages, type Locale } from '@/lib/i18n'
import '@/app/(frontend)/globals.css'
import '@/app/(frontend)/content.css'

export const frontendMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://new.devstudio.biz'),
  title: 'Dev Studio — From Idea to Reality',
  description: 'An integrated product development and technology studio in Banja Luka. Design, electronics, software and manufacturing. From idea to reality.',
  robots: { index: false, follow: false },
}

export function FrontendLayout({ children, locale }: { children: ReactNode; locale: Locale }) {
  return <html lang={htmlLanguages[locale]}><body>{children}</body></html>
}
