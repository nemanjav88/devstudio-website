import Image from 'next/image'
import officialLogo from '../../../public/brand/logo.png'
import { localizedHref, type Locale } from '@/lib/i18n'
import { homeText } from '@/lib/home-copy'
import type { HomeCmsData } from '@/lib/homepage-types'

export function SiteFooter({ locale, settings }: { locale: Locale; settings?: HomeCmsData['settings'] }) {
  const t = (text: string) => homeText(locale, text)
  return <footer className="site-footer section-dark">
    <a className="wordmark" href={localizedHref('/', locale)} aria-label={t('Dev Studio home')}><Image className="wordmark-image" src={officialLogo} alt="" unoptimized /></a>
    <p>{t('FROM IDEA TO REALITY.')}<br /><span>{settings?.location || t('Banja Luka, Bosnia & Herzegovina')}</span></p>
    <span className="meta">© {new Date().getFullYear()} DEV STUDIO</span>
    <a className="text-link" href="#">{t('BACK TO TOP ↑')}</a>
  </footer>
}
