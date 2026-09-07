import type { ReactNode } from 'react'
import { SiteHeader } from '@/components/frontend/SiteHeader'
import { SiteFooter } from '@/components/frontend/SiteFooter'
import { getSiteSettings } from '@/lib/cms'
import { localizedHref, type Locale } from '@/lib/i18n'
import { homeText } from '@/lib/home-copy'
import { ui } from '@/lib/section-copy'

export async function ContentShell({ locale, translatedPaths, children }: { locale: Locale; translatedPaths?: Partial<Record<Locale, string>>; children: ReactNode }) {
  const settings = await getSiteSettings(locale)
  return <div className="studio-home content-site">
    <a className="skip-link" href="#main">{homeText(locale, 'Skip to content')}</a>
    <SiteHeader locale={locale} settings={settings} translatedPaths={translatedPaths} />
    <main id="main">{children}</main>
    <section className="content-invitation content-pad">
      <p className="eyebrow">{homeText(locale, 'FROM IDEA TO REALITY.')}</p>
      <a href={localizedHref('/contact', locale)}>{ui(locale).contact}<span aria-hidden="true">↗</span></a>
    </section>
    <SiteFooter locale={locale} settings={settings} />
  </div>
}
