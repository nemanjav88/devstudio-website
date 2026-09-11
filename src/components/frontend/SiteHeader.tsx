'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import officialLogo from '../../../public/brand/logo.png'
import { LanguageSwitcher } from './LanguageSwitcher'
import { localizedHref, type Locale } from '@/lib/i18n'
import { homeText } from '@/lib/home-copy'
import { sectionCopy } from '@/lib/section-copy'
import type { HomeCmsData } from '@/lib/homepage-types'

export function SiteHeader({ locale, settings, translatedPaths, detail }: {
  locale: Locale; settings: HomeCmsData['settings']; translatedPaths?: Partial<Record<Locale, string>>; detail?: boolean
}) {
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const button = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const t = (text: string) => homeText(locale, text)
  const labels = settings.navigation
  const items = [
    [labels?.solutions || sectionCopy(locale, 'solutions').label, '/solutions'],
    [labels?.capabilities || t('Capabilities'), '/capabilities'], [labels?.about || t('About'), '/about'],
    [labels?.stories || t('Stories'), '/stories'], [labels?.resources || t('Resources'), '/resources'],
  ]
  useEffect(() => {
    if (!menu) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenu(false); button.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menu])
  useEffect(() => {
    // Separate entry/exit thresholds prevent jitter around the scroll boundary.
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(previous => previous ? y > 8 : y > 32)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <header className={`site-header${detail ? ' site-header--detail' : ''}${scrolled ? ' is-scrolled' : ''}`}>
    <a className="wordmark" href={localizedHref('/#', locale)} aria-label={t('Dev Studio home')}>
      <Image className="wordmark-image" src={officialLogo} alt="" unoptimized priority />
    </a>
    <button className="menu-toggle" ref={button} aria-expanded={menu} aria-controls="main-navigation" onClick={() => setMenu(!menu)}>{menu ? t('CLOSE −') : t('MENU +')}</button>
    <nav id="main-navigation" aria-label={t('Main navigation')} className={menu ? 'navigation is-open' : 'navigation'}>
      {items.map(([label, path]) => {
        const href = localizedHref(path, locale)
        const active = !path.includes('#') && (pathname === href || pathname.startsWith(`${href}/`))
        return <a key={path} href={href} aria-current={active ? 'page' : undefined} onClick={() => setMenu(false)}>{label}</a>
      })}
      <a href={localizedHref('/contact', locale)} onClick={() => setMenu(false)}>{labels?.contact || t('Contact')}</a>
      <a className="header-cta" href={localizedHref('/contact', locale)} onClick={() => setMenu(false)}>{labels?.startAProject || t('START A PROJECT')} <span aria-hidden="true">↗</span></a>
      <LanguageSwitcher locale={locale} translatedPaths={translatedPaths} onNavigate={() => setMenu(false)} />
    </nav>
  </header>
}
