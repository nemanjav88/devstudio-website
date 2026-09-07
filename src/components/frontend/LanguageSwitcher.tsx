'use client'

import { usePathname } from 'next/navigation'
import type { MouseEvent } from 'react'
import { htmlLanguages, locales, localizedHref, type Locale } from '@/lib/i18n'

export function LanguageSwitcher({ locale, translatedPaths, onNavigate }: {
  locale: Locale
  translatedPaths?: Partial<Record<Locale, string>>
  onNavigate?: () => void
}) {
  const pathname = usePathname()

  function preserveLocation(event: MouseEvent<HTMLAnchorElement>, target: Locale) {
    // Native anchors also support keyboard activation, modifier clicks and navigation without JS.
    event.currentTarget.href = localizedHref(translatedPaths?.[target] ?? window.location.pathname, target)
      + window.location.search + window.location.hash
    onNavigate?.()
  }

  return <div className="language-switcher" role="group" aria-label={locale === 'bhs' ? 'Jezik' : 'Language'}>
    {locales.map(target => <a
      key={target}
      href={localizedHref(translatedPaths?.[target] ?? pathname, target)}
      hrefLang={htmlLanguages[target]}
      lang={htmlLanguages[target]}
      aria-label={target === 'bhs' ? 'BHS — Bosanski / Hrvatski / Srpski' : 'English'}
      aria-current={target === locale ? 'true' : undefined}
      onClick={event => preserveLocation(event, target)}
      onAuxClick={event => preserveLocation(event, target)}
    >{target === 'bhs' ? 'BHS' : 'EN'}</a>)}
  </div>
}
