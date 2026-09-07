import type { Metadata } from 'next'
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
    <section className="capability-media-band section-dark content-pad"><div className="media-placeholder"><span className="meta">WORKSHOP / MATERIAL / DETAIL</span><span className="placeholder-cross">✳</span><p>{locale === 'bhs' ? 'Mjesto za stvarne fotografije radionice, materijala i procesa.' : 'A place for real workshop, material and process photography.'}</p></div><div><p className="eyebrow">{homeText(locale, 'FROM IDEA TO REALITY.')}</p><h2>{locale === 'bhs' ? 'Svaka disciplina' : 'Every discipline'}<br /><em>{locale === 'bhs' ? 'ostaje uz proizvod.' : 'stays with the product.'}</em></h2><p>{locale === 'bhs' ? 'Od koncepta do podrške, znanje putuje sa proizvodom. To je razlika između niza usluga i jednog tima.' : 'From concept to support, knowledge travels with the product. That is the difference between a list of services and one team.'}</p></div></section>
  </ContentShell>
}

export async function AboutPage({ locale }: { locale: Locale }) {
  return <ContentShell locale={locale}>
    <CoreHero page="about" eyebrow={locale === 'bhs' ? '01 / DEV STUDIO' : '01 / DEV STUDIO'} title={locale === 'bhs' ? 'Dizajniramo.\nRazvijamo.\nIzrađujemo.' : 'We design.\nEngineer.\nBuild.'} intro={locale === 'bhs' ? 'Dev Studio je integrisani studio za razvoj proizvoda i tehnologije iz Banje Luke.' : 'Dev Studio is an integrated product development and technology studio based in Banja Luka.'} />
    <section className="about-statement section-light content-pad"><div className="section-label"><span>{locale === 'bhs' ? 'JEDAN KROV' : 'ONE ROOF'}</span><span>BANJA LUKA · BA</span></div><h2>{locale === 'bhs' ? <>Kompletni proizvodi.<br /><span>Tehnološka iskustva.</span><br />Jedan tim.</> : <>Complete products.<br /><span>Technology experiences.</span><br />One team.</>}</h2><p>{locale === 'bhs' ? 'Kombinujemo dizajn, mehaniku, elektroniku, softver i proizvodnju da ideje pretvorimo u proizvode i iskustva koja mogu biti postavljena, korištena i dalje razvijana.' : 'We combine design, mechanics, electronics, software and manufacturing to turn ideas into products and experiences that can be deployed, used and developed further.'}</p></section>
    <section className="about-split section-dark content-pad"><div className="about-copy"><p className="eyebrow">{locale === 'bhs' ? 'BUILT FOR BRANDS. READY FOR AGENCIES.' : 'BUILT FOR BRANDS. READY FOR AGENCIES.'}</p><h2>{locale === 'bhs' ? <>Od prve ideje<br /><em>do stvarne upotrebe.</em></> : <>From the first idea<br /><em>to the real world.</em></>}</h2><p>{locale === 'bhs' ? 'Radimo direktno sa brendovima i partnerima kojima treba tim sposoban da poveže strategiju, dizajn, tehnologiju i izradu. Naš doprinos je konkretan: proizvod, sistem ili iskustvo koje može živjeti izvan prezentacije.' : 'We work directly with brands and partners who need a team able to connect strategy, design, technology and making. Our contribution is tangible: a product, system or experience that can live beyond the presentation.'}</p></div><div className="media-placeholder media-placeholder--tall"><span className="meta">STUDIO / TEAM / WORKSHOP</span><span className="placeholder-cross">✳</span><p>{locale === 'bhs' ? 'Mjesto za potvrđene fotografije tima i radionice.' : 'A place for confirmed studio and workshop photography.'}</p></div></section>
    <section className="about-principles section-yellow content-pad"><div className="section-label"><span>{locale === 'bhs' ? 'KAKO RADIMO' : 'HOW WE WORK'}</span><span>+</span></div><div className="principle-grid"><div><span>01</span><h3>{locale === 'bhs' ? 'Razmišljamo zajedno.' : 'We think together.'}</h3><p>{locale === 'bhs' ? 'Dizajn i inženjering razgovaraju od početka.' : 'Design and engineering speak from the beginning.'}</p></div><div><span>02</span><h3>{locale === 'bhs' ? 'Gradimo stvarno.' : 'We make real.'}</h3><p>{locale === 'bhs' ? 'Materijali, mašine i korisnik provjeravaju ideju.' : 'Materials, machines and use test the idea.'}</p></div><div><span>03</span><h3>{locale === 'bhs' ? 'Ostajemo blizu.' : 'We stay close.'}</h3><p>{locale === 'bhs' ? 'Podrška i iteracija su dio proizvoda.' : 'Support and iteration remain part of the product.'}</p></div></div></section>
  </ContentShell>
}

export async function ContactPage({ locale }: { locale: Locale }) {
  const settings = await getSiteSettings(locale)
  return <ContentShell locale={locale}>
    <CoreHero page="contact" eyebrow={locale === 'bhs' ? '01 / POKRENIMO PROJEKAT' : '01 / START A PROJECT'} title={locale === 'bhs' ? 'Imate ideju?\nIzgradimo je.' : 'Have an idea?\nLet’s build it.'} intro={locale === 'bhs' ? 'Recite nam šta želite izgraditi. Počećemo razgovor o proizvodu, iskustvu ili sistemu koji treba da postoji.' : 'Tell us what you want to build. We’ll start a conversation about the product, experience or system that needs to exist.'} />
    <section className="contact-layout section-light content-pad"><div className="contact-aside"><p className="eyebrow">{locale === 'bhs' ? 'RAZGOVARAJMO' : 'LET’S TALK'}</p><h2>{locale === 'bhs' ? <>Od ideje<br /><em>do prvog koraka.</em></> : <>From idea<br /><em>to first step.</em></>}</h2><p>{locale === 'bhs' ? 'Dajte nam dovoljno konteksta da razumijemo priliku. Ne morate imati gotov brief.' : 'Give us enough context to understand the opportunity. You do not need a finished brief.'}</p><div className="contact-details">{settings.contactEmail && <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail} ↗</a>}{settings.phone && <a href={`tel:${settings.phone}`}>{settings.phone} ↗</a>}{settings.location && <span>{settings.location}</span>}</div></div><ProjectInquiryForm locale={locale} /></section>
  </ContentShell>
}
