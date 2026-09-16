'use client'

import Image from 'next/image'
import { mediaImageSource } from '@/lib/media-delivery'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SiteHeader } from '@/components/frontend/SiteHeader'
import { SiteFooter } from '@/components/frontend/SiteFooter'
import { HeroProcessFlow } from './HeroProcessFlow'
import { localizedHref } from '@/lib/i18n'
import { homeText } from '@/lib/home-copy'
import type { HomeCmsData } from '@/lib/homepage-types'
import { mediaURL, selectedSolutions, homepageImage } from '@/lib/homepage-types'
import { publicSolutionGroupForHomepageCategory, type PublicSolutionGroup } from '@/lib/public-solution-groups'

const baseSteps = [
  ['Concept', 'Find the right problem. Shape the idea. Define what the product needs to become.'],
  ['Design & Engineering', 'Turn intent into form, materials, mechanics and a plan that can be built.'],
  ['Hardware + Software', 'Make the physical and digital work together, from electronics to the interface.'],
  ['Production', 'Bring the design off the screen and into the workshop. Manufacture, assemble and refine.'],
  ['Installation', 'Bring every part together in its real environment, with support beyond delivery.'],
]
const solutionGroupLinks = [
  ['digital-retail', 'Retail Technology & Digital Systems'],
  ['brand-experiences', 'Brand Experiences & Activations'],
  ['custom-engineering', 'Custom Products & Interactive Systems'],
  ['entertainment', 'Dev Studio Products'],
] as const satisfies readonly (readonly [PublicSolutionGroup, string])[]

function Arrow() { return <span aria-hidden="true">↗</span> }

function LocationPin() { return <svg className="location-pin" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11s-8-6-8-11a8 8 0 1 1 16 0Z" fill="none" stroke="#FFCC00" strokeWidth="1.8" /><circle cx="12" cy="10" r="2.5" fill="#FFCC00" /></svg> }

function Visual({ kind, hero = false, media }: { kind: string; hero?: boolean; media?: string }) {
  return <div className={`visual visual--${kind} ${hero ? 'visual--hero' : ''}`} aria-hidden="true">
    {media && <img className="visual-media" src={media} alt="" />}
    <div className="visual-grid" />
    {kind === 'machine' ? (!hero && <div className="assembly"><div className="axis" />{[0, 1, 2, 3].map(i => <div className={`disc disc-${i}`} key={i}><div className="disc-hole" /></div>)}</div>)
      : kind === 'retail' ? <div className="kiosk"><div className="kiosk-screen"><span>HELLO.</span><div className="screen-lines" /><i /><b>LET’S INTERACT ↗</b></div><div className="kiosk-foot" /></div>
      : kind === 'interactive' ? <div className="circuit"><div className="circuit-ring ring-a" /><div className="circuit-ring ring-b" /><div className="chip"><span>INPUT<br />MEETS<br /><b>OUTPUT.</b></span></div><div className="circuit-node" /></div>
      : kind === 'brand' ? <div className="monoliths"><i /><i /><i /><div className="brand-orbit" /></div>
      : <div className="play-shapes"><div className="play-arch" /><div className="play-ball" /><div className="play-cube" /><div className="play-floor" /></div>}
    <span className="crosshair">+</span>
  </div>
}

export function HomePrototype({ cms }: { cms: HomeCmsData }) {
  const root = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const [panel, setPanel] = useState({ title: '', text: '', kind: '' })
  const locale = cms.locale
  const t = (text: string) => homeText(locale, text)
  const steps = baseSteps.map(step => step.map(t))
  const home = cms.homepage
  const settings = cms?.settings
  const workItems = selectedSolutions(home?.selectedWork?.solutions)
  const processItems = home?.process?.steps?.length
    ? home.process.steps.map((step, index) => [step.title || steps[index]?.[0] || '', step.description || steps[index]?.[1] || ''] as [string, string])
    : steps
  const buildItems = (home?.whatWeBuild?.categories?.length
    ? home.whatWeBuild.categories.map(category => ({ name: category.name, group: category.name ? publicSolutionGroupForHomepageCategory(category.name) : undefined }))
    : solutionGroupLinks.map(([group, name]) => ({ name: t(name), group })))
    .filter((item): item is { name: string; group: PublicSolutionGroup } => Boolean(item.name && item.group))
    .filter((item, index, items) => items.findIndex(candidate => candidate.group === item.group) === index)
  const referencesMedia = homepageImage(home?.references?.media)
  const finalCtaMedia = mediaURL(home?.finalCta?.media)

  function openPanel(title: string, text: string, kind = '') {
    setPanel({ title, text, kind })
    dialog.current?.showModal()
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-copy > *', { y: 24, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out' })
      gsap.from('.hero-process-trigger', { y: 8, opacity: 0, duration: 0.55, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: '.hero-process-flow', start: 'top 92%', once: true } })
      gsap.to('.process-progress', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.process-steps', start: 'top 60%', end: 'bottom 60%', scrub: true } })
      gsap.utils.toArray<HTMLElement>('.process-step').forEach(step => {
        ScrollTrigger.create({ trigger: step, start: 'top 65%', end: 'bottom 40%', toggleClass: 'is-active' })
      })
    }, root)
    return () => mm.revert()
  }, [])


  const contact = () => openPanel(t("Let’s start with your idea."), settings?.contactEmail ? (locale === 'bhs' ? `Pošaljite projektni upit na ${settings.contactEmail}${settings.phone ? ` ili pozovite ${settings.phone}` : ''}. Cijeli obrazac stiže uskoro; ovaj prototip ne prikuplja niti šalje podatke.` : `Send your project enquiry to ${settings.contactEmail}${settings.phone ? ` or call ${settings.phone}` : ''}. The full form is coming next; this prototype does not collect or send information.`) : t("The project enquiry form is coming next. This design prototype does not collect or send information. Visit the current Dev Studio website to get in touch."), 'contact')

  return <div className="studio-home" ref={root}>
    <a className="skip-link" href="#main">{t("Skip to content")}</a>
    <SiteHeader locale={locale} settings={settings} />
    <main id="main">
      <section className="hero section-dark" aria-labelledby="hero-title">
        <div className="hero-top meta"><span><i className="status-dot" />  {t("INDEPENDENT THINKING. INTEGRATED MAKING.")}</span><span>BANJA LUKA · BA</span></div>
        <div className="hero-stage">
          <div className="hero-copy"><p className="eyebrow">{home?.hero?.eyebrow || t("FROM IDEA TO REALITY.")}</p><h1 id="hero-title">{home?.hero?.headline ? home.hero.headline.split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>) : <>{t("WE BUILD")}<br />{t("WHAT OTHERS")}<br /><em>{t("ONLY IMAGINE.")}</em></>}</h1>
            <p className="hero-disciplines">{home?.hero?.supportingLine || t("Design. Electronics. Software. Manufacturing.")}</p>
            <p className="hero-description">{home?.hero?.subtext || t("From the first idea to a finished product — engineered, built and delivered by one team.")}</p>
            <div className="hero-actions"><button className="button button-yellow" onClick={contact}>{home?.hero?.primaryCtaLabel || t("Start a Project")} <Arrow /></button><a className="text-link" href={localizedHref('/#solutions', locale)}>{home?.hero?.secondaryCtaLabel || t("Explore our work")} <span aria-hidden="true">↓</span></a></div>
          </div>
          <HeroProcessFlow locale={locale} />
        </div>
        <div className="hero-bottom meta"><span>{t("IDEAS ARE JUST THE BEGINNING.")}</span><span>{t("SCROLL TO DISCOVER ↓")}</span><span>{t("DESIGN × ENGINEERING × PRODUCTION")}</span></div>
      </section>
      <section className="positioning section-light section-pad" id="about">
        <div className="section-label"><span>{t("01 / THE STUDIO")}</span><span>+</span></div>
        <h2>{home?.positioning?.headline ? home.positioning.headline.split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>) : <>{t("ONE TEAM.")}<br /><span>{t("EVERY DISCIPLINE REQUIRED")}</span><br />{t("TO BUILD THE ENTIRE PRODUCT.")}</>}</h2>
        <div className="position-bottom"><span className="asterisk" aria-hidden="true">✳</span><p>{home?.positioning?.supportingText || t("Industrial design, electronics, software, manufacturing and installation. Different disciplines, working at the same table. We connect every part of the process to turn ambitious ideas into things that exist.")}</p><a className="text-link" href={localizedHref('/#advantage', locale)}>{t("Meet the one-team advantage")} <Arrow /></a></div>
      </section>
      <section className="work-section section-dark section-pad" id="projects">
        <div className="section-label"><span>{t("02 / SELECTED DIRECTIONS")}</span><span>{t("PHYSICAL. DIGITAL. EVERYTHING BETWEEN.")}</span></div>
        <div className="section-heading"><h2>{home?.selectedWork?.headline || <>{t("IDEAS.")}<br /><span className="muted">{t("MADE TANGIBLE.")}</span></>}</h2><p>{home?.selectedWork?.intro || <>{t("A first look at the worlds we build in.")}<br />{t("Visual studies for the projects to come.")}</>}</p></div>
        <div className="work-grid">{workItems.map((solution, i) => {
          const media = homepageImage(solution.heroMedia)
          return <a className={`work-item work-item-${i}`} key={solution.id} href={localizedHref(`/solutions/${solution.slug}`, locale)}>
            <div className="work-image">{media ? <Image className="work-solution-image" {...mediaImageSource(media)} alt={media.alt || solution.title} fill sizes="(max-width: 700px) 100vw, 50vw" /> : <Visual kind="machine" />}<span className="round-arrow"><Arrow /></span></div>
            <div className="work-caption"><div><span className="meta">0{i + 1}</span><h3>{solution.title}</h3>{solution.shortDescription && <p className="work-description">{solution.shortDescription}</p>}</div><span className="meta">{t("VIEW SOLUTION ↗")}</span></div>
          </a>
        })}</div>
      </section>
      <section className="build-section section-light section-pad" id="solutions">
        <div className="section-label"><span>{t("03 / WHAT WE BUILD")}</span><span>{t("NO SINGLE DISCIPLINE. NO SINGLE BOX.")}</span></div>
        <div className="build-layout"><h2>{home?.whatWeBuild?.headline || <>{t("COMPLEX IDEAS.")}<br />{t("COMPLETE")}<br /><span className="muted">{t("SOLUTIONS.")}</span></>}</h2><div className="capability-list">{buildItems.map(({ name, group }, i) => <a href={localizedHref(`/solutions#${group}`, locale)} key={`${group}-${name}`}><span className="meta">0{i + 1}</span><span>{name}</span><Arrow /></a>)}</div></div>
      </section>
      <section className="process-section section-dark section-pad" id="process">
        <div className="section-label"><span>{t("04 / FROM FIRST THOUGHT TO FINAL DETAIL")}</span><span>{t("ONE CONTINUOUS PROCESS")}</span></div>
        <div className="process-layout"><div className="process-intro"><p className="eyebrow">{home?.process?.opening || t("YOU BRING THE IDEA.")}</p><h2>{home?.process?.headline || <>{t("WE MAKE")}<br />{t("IT")} <em>{t("REAL.")}</em></>}</h2><div className="process-drawing" aria-hidden="true"><div /><div /><div /><span>IDEA → OBJECT</span></div><p>{t("Every decision moves the product forward.")}<br />{t("Every discipline stays connected.")}</p></div>
          <div className="process-steps"><div className="process-track"><div className="process-progress" /></div>{processItems.map(([title, text], i) => <article className="process-step" key={title}><span className="step-number">0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div>
        <div className="process-closing">{home?.process?.closing || t("WE DELIVER THE PRODUCT.")}<Arrow /></div>
      </section>
      <section className="advantage section-yellow section-pad" id="advantage"><div className="section-label"><span>{t("05 / THE ONE-TEAM ADVANTAGE")}</span><span>{t("LESS DISTANCE BETWEEN IDEA AND REALITY.")}</span></div><h2>{home?.whyDevStudio?.headline || <>{t("NO HANDOFF")}<br />{t("BETWEEN FIVE")}<br />{t("COMPANIES.")}</>}</h2><div className="advantage-bottom"><span className="connection-mark" aria-hidden="true">↔</span><p>{home?.whyDevStudio?.body || t("One conversation that continues from concept to installation. Designers talk to engineers. Software meets hardware. Production informs the design. The knowledge stays with the team, and the team stays with the product.")}</p><a className="text-link" href={localizedHref('/#made-here', locale)}>{t("See where it comes together")} <Arrow /></a></div></section>
      <section className="made-section section-dark" id="made-here"><div className="made-visual"><img className="made-simulator-image" src="/home/devstudio-crash-simulator.png" alt="" /><span className="vertical-label meta">{t("AT DEV STUDIO, WE PUSH BOUNDARIES")}</span></div><div className="made-copy"><p className="eyebrow">{t("06 / MADE HERE")}</p><h2>{home?.madeHere?.headline || <>{t("DESIGNED HERE.")}<br />{t("ENGINEERED HERE.")}<br /><em>{t("BUILT HERE.")}</em></>}</h2><p>{home?.madeHere?.body || t("Close to the materials. Close to the machines. Close to every decision that makes the final product better.")}</p><div className="made-location"><div className="location"><LocationPin /><span>{home?.madeHere?.location || settings?.location || t("Banja Luka, Bosnia & Herzegovina")}</span></div><a className="made-solutions-link" href={localizedHref('/solutions', locale)}>{locale === 'bhs' ? 'Saznajte šta sve radimo' : 'See what we build'} <span aria-hidden="true">↗</span></a></div></div></section>
      <section className="references-section section-light section-pad" id="references">
        <div className="section-label"><span>{t("07 / REFERENCES")}</span><span>+</span></div>
        <div className="section-heading"><h2>{home?.references?.headline || t("REFERENCES")}</h2>{home?.references?.intro && <p>{home.references.intro}</p>}</div>
        {referencesMedia ? <Image className="references-image" {...mediaImageSource(referencesMedia)} alt={referencesMedia.alt || t("REFERENCES")} width={referencesMedia.width || 1600} height={referencesMedia.height || 1000} sizes="100vw" /> : <>
          <div className="references-grid" aria-label={t("Temporary reference placeholders")}>{Array.from({ length: 20 }, (_, i) => <span className={`reference-mark reference-mark-${i % 4}`} key={i}>REF {String(i + 1).padStart(2, '0')}</span>)}</div>
        </>}
      </section>
      <section className="final-cta section-dark section-pad" id="contact"><div className="section-label"><span>{t("THE NEXT THING WE BUILD COULD BE YOURS.")}</span><span>{t("LET’S TALK.")}</span></div><h2>{home?.finalCta?.headline || <>{t("GOT AN IDEA?")}<br /><em>{t("LET’S BUILD IT.")}</em></>}</h2><a className="button button-yellow" href={localizedHref('/contact', locale)}>{home?.finalCta?.buttonLabel || t("START A PROJECT")} <Arrow /></a>{finalCtaMedia && <img className="cta-media" src={finalCtaMedia} alt="" />}<div className="cta-rule" /></section>
    </main>
    <SiteFooter locale={locale} settings={settings} />
    <dialog ref={dialog} className="prototype-dialog" aria-labelledby="dialog-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}><div className="dialog-content"><button className="dialog-close" onClick={() => dialog.current?.close()} aria-label={t("Close panel")}>{t("CLOSE ×")}</button><p className="eyebrow">{t("DEV STUDIO / DESIGN PREVIEW")}</p><h2 id="dialog-title">{panel.title}</h2>{panel.kind && panel.kind !== 'contact' && <Visual kind={panel.kind} />}<p>{panel.text}</p>{panel.kind === 'contact' && <a className="button button-yellow" href="https://devstudio.biz">{t("Visit the current website")} <Arrow /></a>}</div></dialog>
  </div>
}
