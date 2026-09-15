import type { Metadata } from 'next'
import Image from 'next/image'
import { ContentShell } from '@/components/content/ContentShell'
import { localizedHref, languageAlternates, type Locale } from '@/lib/i18n'
import { homeText } from '@/lib/home-copy'
import { getSiteSettings } from '@/lib/cms'
import { ProjectInquiryForm } from './ProjectInquiryForm'

export type CorePage = 'capabilities' | 'about' | 'contact'

export function coreMetadata(page: CorePage, locale: Locale): Metadata {
  const labels = {
    capabilities: locale === 'bhs' ? 'Mogućnosti i proizvodnja' : 'Capabilities & production',
    about: locale === 'bhs' ? 'O Dev Studiju' : 'About Dev Studio',
    contact: locale === 'bhs' ? 'Pokrenimo projekat' : 'Start a Project',
  }
  const descriptions = {
    capabilities: locale === 'bhs' ? 'Jedan tim za razvoj proizvoda, dizajn, elektroniku, softver, proizvodnju i instalaciju.' : 'One team for product development, design, electronics, software, manufacturing and installation.',
    about: locale === 'bhs' ? 'Dev Studio dizajnira, razvija, izrađuje i postavlja cjelovite proizvode i tehnološka iskustva iz Banje Luke.' : 'Dev Studio designs, engineers, builds and deploys complete products and technology experiences from Banja Luka.',
    contact: locale === 'bhs' ? 'Pokrenite razgovor o proizvodu, iskustvu ili sistemu koji želite izgraditi.' : 'Start a conversation about the product, experience or system you want to build.',
  }
  const path = `/${page}`
  return { title: `${labels[page]} — Dev Studio`, description: descriptions[page], robots: { index: false, follow: false }, alternates: { canonical: localizedHref(path, locale), languages: languageAlternates(path) } }
}

const capabilities = [
  ['01', 'Concept & product development', 'Shape the opportunity, define the product and carry the idea toward something that can exist.'],
  ['02', 'Industrial / mechanical design', 'Form, materials, mechanics and the decisions that make a physical product useful and considered.'],
  ['03', 'Electronics & embedded systems', 'Electronics and embedded intelligence designed as part of the product, not added at the end.'],
  ['04', 'Software & UX', 'Interfaces and software that connect the product to people, places and the systems around it.'],
  ['05', 'CNC and fabrication', 'Digital fabrication, CNC and workshop thinking that move form from screen to matter.'],
  ['06', 'Metalworking / welding', 'Metal, structure and fabrication detail for products and experiences built to live in the real world.'],
  ['07', 'Prototyping', 'Fast, purposeful iterations that make assumptions visible and give the next decision something tangible to respond to.'],
  ['08', 'Manufacturing', 'Production, assembly and refinement with the knowledge of design and engineering still close at hand.'],
  ['09', 'Installation & deployment', 'Bring every part together in its environment and make the experience work where it matters.'],
  ['10', 'Support & iteration', 'Stay close to the product after launch, learning from use and improving what comes next.'],
] as const

const capabilityBhs: Record<string, string> = {
  'Concept & product development': 'Koncept i razvoj proizvoda',
  'Shape the opportunity, define the product and carry the idea toward something that can exist.': 'Oblikujemo priliku, definišemo proizvod i vodimo ideju prema nečemu što može postojati.',
  'Industrial / mechanical design': 'Industrijski i mašinski dizajn',
  'Form, materials, mechanics and the decisions that make a physical product useful and considered.': 'Forma, materijali, mehanika i odluke koje fizički proizvod čine korisnim i promišljenim.',
  'Electronics & embedded systems': 'Elektronika i ugrađeni sistemi',
  'Electronics and embedded intelligence designed as part of the product, not added at the end.': 'Elektronika i ugrađena inteligencija projektovane su kao dio proizvoda, a ne dodane na kraju.',
  'Software & UX': 'Softver i UX',
  'Interfaces and software that connect the product to people, places and the systems around it.': 'Interfejsi i softver koji povezuju proizvod sa ljudima, prostorima i sistemima oko njega.',
  'CNC and fabrication': 'CNC i izrada',
  'Digital fabrication, CNC and workshop thinking that move form from screen to matter.': 'Digitalna izrada, CNC i razmišljanje radionice koji formu prenose sa ekrana u materiju.',
  'Metalworking / welding': 'Obrada metala i zavarivanje',
  'Metal, structure and fabrication detail for products and experiences built to live in the real world.': 'Metal, konstrukcija i detalji izrade za proizvode i iskustva namijenjena stvarnom svijetu.',
  'Prototyping': 'Prototipiranje',
  'Fast, purposeful iterations that make assumptions visible and give the next decision something tangible to respond to.': 'Brze, ciljane iteracije koje pretpostavke čine vidljivim i daju sljedećoj odluci nešto opipljivo na šta može odgovoriti.',
  'Manufacturing': 'Proizvodnja',
  'Production, assembly and refinement with the knowledge of design and engineering still close at hand.': 'Proizvodnja, sklapanje i usavršavanje uz znanje dizajna i inženjeringa nadohvat ruke.',
  'Installation & deployment': 'Instalacija i implementacija',
  'Bring every part together in its environment and make the experience work where it matters.': 'Povezujemo sve dijelove u njihovom okruženju i činimo da iskustvo funkcioniše tamo gdje je važno.',
  'Support & iteration': 'Podrška i iteracija',
  'Stay close to the product after launch, learning from use and improving what comes next.': 'Ostajemo uz proizvod nakon lansiranja, učimo iz upotrebe i unapređujemo ono što slijedi.',
}

function t(locale: Locale, value: string) { return locale === 'bhs' ? capabilityBhs[value] || value : value }

function SocialIcon({ platform }: { platform: string }) {
  const name = platform.trim().toLowerCase()
  const props = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  if (name === 'instagram') return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" /></svg>
  if (name === 'facebook') return <svg {...props}><path d="M14.5 21v-8h3l.5-3h-3.5V8.1c0-.9.3-1.6 1.7-1.6H18V3.8c-.4-.1-1.2-.2-2.2-.2-2.2 0-3.8 1.4-3.8 3.9V10H9v3h3v8" /></svg>
  if (name === 'linkedin') return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v6M8 7v.01M12 16v-3.4a2.6 2.6 0 0 1 5.2 0V16M12 10v6" /></svg>
  if (name === 'youtube') return <svg {...props}><path d="M21 12s0-3.3-.4-4.8a2.4 2.4 0 0 0-1.7-1.7C17.4 5 12 5 12 5s-5.4 0-6.9.5a2.4 2.4 0 0 0-1.7 1.7C3 8.7 3 12 3 12s0 3.3.4 4.8a2.4 2.4 0 0 0 1.7 1.7C6.6 19 12 19 12 19s5.4 0 6.9-.5a2.4 2.4 0 0 0 1.7-1.7C21 15.3 21 12 21 12Z" /><path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" /></svg>
  return <svg {...props}><path d="M14 3h7v7M21 3l-9 9M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" /></svg>
}

function CoreHero({ page, eyebrow, title, intro }: { page: CorePage; eyebrow: string; title: string; intro: string }) {
  return <header className={`core-hero core-hero--${page} content-pad`}>
    <div className="section-label"><span>{eyebrow}</span><span>DEV STUDIO / BANJA LUKA</span></div>
    <h1>{title.split('\n').map((line, index) => <span key={line} className={index ? 'muted' : undefined}>{line}</span>)}</h1>
    <p>{intro}</p>
  </header>
}

export async function CapabilitiesPage({ locale }: { locale: Locale }) {
  return <ContentShell locale={locale}>
    <CoreHero page="capabilities" eyebrow={locale === 'bhs' ? '01 / CIJELI PROCES' : '01 / THE COMPLETE PROCESS'} title={locale === 'bhs' ? 'Od ideje.\nDo stvarnosti.' : 'From idea.\nTo reality.'} intro={locale === 'bhs' ? 'Jedan tim koji povezuje razvoj proizvoda, dizajn, hardver, softver, proizvodnju i instalaciju.' : 'One team connecting product development, design, hardware, software, manufacturing and installation.'} />
    <section className="capability-intro section-yellow content-pad">
      <div className="section-label"><span>{locale === 'bhs' ? 'JEDAN POVEZAN SISTEM' : 'ONE CONNECTED SYSTEM'}</span><span>+</span></div>
      <h2>{locale === 'bhs' ? <>Različite discipline.<br /><em>Jedan proizvod.</em></> : <>Different disciplines.<br /><em>One product.</em></>}</h2>
      <p>{locale === 'bhs' ? 'Dizajn, mehanika, elektronika, softver i proizvodnja rade za istim stolom. Tako odluke ostaju povezane od prve skice do instalacije.' : 'Design, mechanics, electronics, software and production work at the same table. Decisions stay connected from the first sketch to installation.'}</p>
    </section>
    <section className="capability-sequence section-light content-pad" aria-label={locale === 'bhs' ? 'Mogućnosti' : 'Capabilities'}>
      <div className="section-label"><span>{locale === 'bhs' ? 'DISCIPLINE U POVEZANOM PROCESU' : 'DISCIPLINES IN A CONNECTED PROCESS'}</span><span>02 — 11</span></div>
      <div className="capability-rows">{capabilities.map(([number, title, body], index) => <article className="capability-row" key={number}>
        <span className="capability-number">{number}</span><div><h3>{t(locale, title)}</h3><p>{t(locale, body)}</p></div><span className="capability-mark" aria-hidden="true">{index === capabilities.length - 1 ? '↗' : '＋'}</span>
      </article>)}</div>
    </section>
    <section className="capability-media-band section-dark content-pad"><div className="media-placeholder"><Image src="/about/product-process-transition.png" alt={locale === 'bhs' ? 'Prijelaz procesa razvoja proizvoda' : 'Product development process transition'} fill sizes="(max-width: 850px) 100vw, 55vw" style={{ objectFit: 'contain' }} /></div><div><p className="eyebrow">{homeText(locale, 'FROM IDEA TO REALITY.')}</p><h2>{locale === 'bhs' ? 'Svaka disciplina' : 'Every discipline'}<br /><em>{locale === 'bhs' ? 'ostaje uz proizvod.' : 'stays with the product.'}</em></h2><p>{locale === 'bhs' ? 'Od koncepta do podrške, znanje putuje sa proizvodom. To je razlika između niza usluga i jednog tima.' : 'From concept to support, knowledge travels with the product. That is the difference between a list of services and one team.'}</p></div></section>
  </ContentShell>
}

const aboutPrinciples = [
  { image: '/about/how-we-work-meeting.png', alt: { bhs: 'Sastanak u radionici Dev Studija', en: 'Dev Studio workshop meeting' }, title: { bhs: 'Razmišljamo zajedno.', en: 'We think together.' }, body: { bhs: 'Dizajn i inženjering razgovaraju od početka.', en: 'Design and engineering speak from the beginning.' } },
  { image: '/about/how-we-work-production.png', alt: { bhs: 'Proizvodnja u radionici Dev Studija', en: 'Dev Studio workshop production' }, title: { bhs: 'Gradimo stvarno.', en: 'We make real.' }, body: { bhs: 'Izrađujemo od prototipa do serijske proizvodnje.', en: 'We build from prototype to serial production.' } },
  { image: '/about/how-we-work-support.png', alt: { bhs: 'Servisna podrška Dev Studija', en: 'Dev Studio field support' }, title: { bhs: 'Ostajemo blizu.', en: 'We stay close.' }, body: { bhs: 'Podrška, održavanje i iteracija ostaju dio životnog ciklusa proizvoda.', en: 'Support, maintenance and iteration remain part of the product lifecycle.' } },
] as const

export async function AboutPage({ locale }: { locale: Locale }) {
  return <ContentShell locale={locale}>
    <CoreHero page="about" eyebrow={locale === 'bhs' ? '01 / DEV STUDIO' : '01 / DEV STUDIO'} title={locale === 'bhs' ? 'Dizajniramo.\nRazvijamo.\nIzrađujemo.' : 'We design.\nEngineer.\nBuild.'} intro={locale === 'bhs' ? 'Dev Studio je integrisani studio za razvoj proizvoda i tehnologije iz Banjaluke.' : 'Dev Studio is an integrated product development and technology studio based in Banja Luka.'} />
    <section className="about-statement section-light content-pad"><div className="section-label"><span>{locale === 'bhs' ? 'JEDAN KROV' : 'ONE ROOF'}</span><span>BANJA LUKA · BA</span></div><h2>{locale === 'bhs' ? <>Kompletni proizvodi.<br /><span>Tehnološka iskustva.</span><br />Jedan tim.</> : <>Complete products.<br /><span>Technology experiences.</span><br />One team.</>}</h2><p>{locale === 'bhs' ? 'Kombinujemo dizajn, mehaniku, elektroniku, softver i proizvodnju da ideje pretvorimo u proizvode i iskustva koja mogu biti postavljena, korištena i dalje razvijana.' : 'We combine design, mechanics, electronics, software and manufacturing to turn ideas into products and experiences that can be deployed, used and developed further.'}</p></section>
    <section className="about-split section-dark content-pad"><div className="about-copy"><p className="eyebrow">{locale === 'bhs' ? 'BUILT FOR BRANDS. READY FOR AGENCIES.' : 'BUILT FOR BRANDS. READY FOR AGENCIES.'}</p><h2>{locale === 'bhs' ? <>Od prve ideje<br /><em>do stvarne upotrebe.</em></> : <>From the first idea<br /><em>to the real world.</em></>}</h2><p>{locale === 'bhs' ? 'Radimo direktno sa brendovima i partnerima kojima treba tim sposoban da poveže strategiju, dizajn, tehnologiju i izradu. Naš doprinos je konkretan: proizvod, sistem ili iskustvo koje može živjeti izvan prezentacije.' : 'We work directly with brands and partners who need a team able to connect strategy, design, technology and making. Our contribution is tangible: a product, system or experience that can live beyond the presentation.'}</p></div><div className="about-workshop-media"><div className="about-workshop-stage"><Image src="/about/devstudio-workshop-proces.png" alt={locale === 'bhs' ? 'Radionica Dev Studija' : 'Dev Studio workshop'} fill sizes="(max-width: 850px) 100vw, 45vw" /></div></div></section>
    <section className="about-principles section-yellow content-pad"><div className="section-label"><span>{locale === 'bhs' ? 'KAKO RADIMO' : 'HOW WE WORK'}</span><span>+</span></div><div className="principle-grid">{aboutPrinciples.map((principle, index) => <article className="about-principle" key={principle.image}><span>{String(index + 1).padStart(2, '0')}</span><div className="about-principle-media"><Image src={principle.image} alt={principle.alt[locale]} fill sizes="(max-width: 850px) 100vw, 30vw" /></div><h3>{principle.title[locale]}</h3><p>{principle.body[locale]}</p></article>)}</div></section>
  </ContentShell>
}

export async function ContactPage({ locale }: { locale: Locale }) {
  const settings = await getSiteSettings(locale)
  return <ContentShell locale={locale}>
    <CoreHero page="contact" eyebrow={locale === 'bhs' ? '01 / POKRENIMO PROJEKAT' : '01 / START A PROJECT'} title={locale === 'bhs' ? 'Imate ideju?\nIzgradimo je.' : 'Have an idea?\nLet’s build it.'} intro={locale === 'bhs' ? 'Recite nam šta želite izgraditi. Počećemo razgovor o proizvodu, iskustvu ili sistemu koji treba da postoji.' : 'Tell us what you want to build. We’ll start a conversation about the product, experience or system that needs to exist.'} />
    <section className="contact-layout section-light content-pad"><div className="contact-aside"><p className="eyebrow">{locale === 'bhs' ? 'RAZGOVARAJMO' : 'LET’S TALK'}</p><h2>{locale === 'bhs' ? <>Od ideje<br /><em>do prvog koraka.</em></> : <>From idea<br /><em>to first step.</em></>}</h2><p>{locale === 'bhs' ? 'Dajte nam dovoljno konteksta da razumijemo priliku. Ne morate imati gotov brief.' : 'Give us enough context to understand the opportunity. You do not need a finished brief.'}</p><div className="contact-details">{settings.location && <div className="contact-detail"><span className="meta">{locale === 'bhs' ? 'LOKACIJA' : 'LOCATION'}</span><span>{settings.location}</span></div>}{settings.contactEmail && <div className="contact-detail"><span className="meta">E-MAIL</span><a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a></div>}{settings.socialLinks?.length ? <div className="contact-social-links">{settings.socialLinks.map(link => <a href={link.url} target="_blank" rel="noreferrer" aria-label={link.platform} key={link.id || `${link.platform}-${link.url}`}><SocialIcon platform={link.platform} /></a>)}</div> : null}{settings.phone && <div className="contact-detail"><span className="meta">{locale === 'bhs' ? 'TELEFON' : 'PHONE'}</span><a href={`tel:${settings.phone}`}>{settings.phone}</a></div>}</div></div><ProjectInquiryForm locale={locale} /></section>
  </ContentShell>
}
