'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const work = [
  { title: 'Smart Retail', kind: 'retail', label: 'DIGITAL MEETS PHYSICAL', text: 'Exploring the space between a digital interface and a physical retail experience.' },
  { title: 'Interactive Systems', kind: 'interactive', label: 'TECHNOLOGY YOU CAN TOUCH', text: 'Interfaces, electronics and enclosures considered together as one complete system.' },
  { title: 'Brand Experiences', kind: 'brand', label: 'IDEAS WITH A PHYSICAL PRESENCE', text: 'A space for expressive installations and memorable physical interactions.' },
  { title: 'Kids Play', kind: 'play', label: 'AN ORIGINAL DEV STUDIO PRODUCT', text: 'Our own product, Kids Play. Product photography and the full story will be added in the content phase.' },
]
const steps = [
  ['Concept', 'Find the right problem. Shape the idea. Define what the product needs to become.'],
  ['Design & Engineering', 'Turn intent into form, materials, mechanics and a plan that can be built.'],
  ['Hardware + Software', 'Make the physical and digital work together, from electronics to the interface.'],
  ['Production', 'Bring the design off the screen and into the workshop. Manufacture, assemble and refine.'],
  ['Installation', 'Bring every part together in its real environment, with support beyond delivery.'],
]
const stories = [
  ['Behind the Build', 'The thinking behind the making.', 'machine'],
  ['Technology', 'Where hardware meets software.', 'interactive'],
  ['Studio Notes', 'Ideas are only the beginning.', 'brand'],
]
const nav = [['Solutions', '#solutions'], ['Projects', '#projects'], ['Capabilities', '#process'], ['About', '#about'], ['Stories', '#stories']]

function Arrow() { return <span aria-hidden="true">↗</span> }

function Visual({ kind, hero = false }: { kind: string; hero?: boolean }) {
  return <div className={`visual visual--${kind} ${hero ? 'visual--hero' : ''}`} aria-hidden="true">
    <div className="visual-grid" />
    {kind === 'machine' ? <div className="assembly"><div className="axis" />{[0, 1, 2, 3].map(i => <div className={`disc disc-${i}`} key={i}><div className="disc-hole" /></div>)}<span className="measure measure-a">CONCEPT / FORM</span><span className="measure measure-b">HARDWARE / MATTER</span></div>
      : kind === 'retail' ? <div className="kiosk"><div className="kiosk-screen"><span>HELLO.</span><div className="screen-lines" /><i /><b>LET’S INTERACT ↗</b></div><div className="kiosk-foot" /></div>
      : kind === 'interactive' ? <div className="circuit"><div className="circuit-ring ring-a" /><div className="circuit-ring ring-b" /><div className="chip"><span>INPUT<br />MEETS<br /><b>OUTPUT.</b></span></div><div className="circuit-node" /></div>
      : kind === 'brand' ? <div className="monoliths"><i /><i /><i /><div className="brand-orbit" /></div>
      : <div className="play-shapes"><div className="play-arch" /><div className="play-ball" /><div className="play-cube" /><div className="play-floor" /></div>}
    <span className="visual-caption">{hero ? 'FORM STUDY — 001' : 'ABSTRACT VISUAL STUDY'}</span><span className="crosshair">+</span>
  </div>
}

export function HomePrototype() {
  const root = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const [panel, setPanel] = useState({ title: '', text: '', kind: '' })
  const [menu, setMenu] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  function openPanel(title: string, text: string, kind = '') {
    setPanel({ title, text, kind })
    setMenu(false)
    dialog.current?.showModal()
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-copy > *', { y: 24, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out' })
      gsap.to('.hero .assembly', { y: -45, rotate: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
      gsap.to('.process-progress', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.process-steps', start: 'top 60%', end: 'bottom 60%', scrub: true } })
      gsap.utils.toArray<HTMLElement>('.process-step').forEach(step => {
        ScrollTrigger.create({ trigger: step, start: 'top 65%', end: 'bottom 40%', toggleClass: 'is-active' })
      })
    }, root)
    return () => mm.revert()
  }, [])

  useEffect(() => {
    if (!menu) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenu(false); menuButton.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menu])

  const contact = () => openPanel('Let’s start with your idea.', 'The project enquiry form is coming next. This design prototype does not collect or send information. Visit the current Dev Studio website to get in touch.', 'contact')
  const resources = () => openPanel('The details. All in one place.', 'The Dev Studio catalog, product flyers and thematic brochures will be available here in BHS and English. Download files have not been added to this prototype.')

  return <div className="studio-home" ref={root}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a className="wordmark" href="#" aria-label="Dev Studio home">dev<span className="logo-symbol">✳</span><small>STUDIO</small></a>
      <button className="menu-toggle" ref={menuButton} aria-expanded={menu} aria-controls="main-navigation" onClick={() => setMenu(!menu)}>{menu ? 'CLOSE −' : 'MENU +'}</button>
      <nav id="main-navigation" aria-label="Main navigation" className={menu ? 'navigation is-open' : 'navigation'}>
        {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenu(false)}>{label}</a>)}
        <button onClick={resources}>Resources</button><button onClick={contact}>Contact</button>
        <button className="header-cta" onClick={contact}>START A PROJECT <Arrow /></button>
      </nav>
    </header>
    <main id="main">
      <section className="hero section-dark" aria-labelledby="hero-title">
        <div className="hero-top meta"><span><i className="status-dot" /> INDEPENDENT THINKING. INTEGRATED MAKING.</span><span>BANJA LUKA · BA</span></div>
        <div className="hero-stage"><Visual kind="machine" hero />
          <div className="hero-copy"><p className="eyebrow">FROM IDEA TO REALITY.</p><h1 id="hero-title">WE BUILD<br />WHAT OTHERS<br /><em>ONLY IMAGINE.</em></h1>
            <p className="hero-disciplines">Design. Electronics. Software. Manufacturing.</p>
            <p className="hero-description">From the first idea to a finished product — engineered, built and delivered by one team.</p>
            <div className="hero-actions"><button className="button button-yellow" onClick={contact}>Start a Project <Arrow /></button><a className="text-link" href="#projects">Explore our work <span aria-hidden="true">↓</span></a></div>
          </div>
        </div>
        <div className="hero-bottom meta"><span>IDEAS ARE JUST THE BEGINNING.</span><span>SCROLL TO DISCOVER ↓</span><span>DESIGN × ENGINEERING × PRODUCTION</span></div>
      </section>
      <section className="positioning section-light section-pad" id="about">
        <div className="section-label"><span>01 / THE STUDIO</span><span>+</span></div>
        <h2>ONE TEAM.<br /><span>EVERY DISCIPLINE REQUIRED</span><br />TO BUILD THE ENTIRE PRODUCT.</h2>
        <div className="position-bottom"><span className="asterisk" aria-hidden="true">✳</span><p>Industrial design, electronics, software, manufacturing and installation. Different disciplines, working at the same table. We connect every part of the process to turn ambitious ideas into things that exist.</p><a className="text-link" href="#advantage">Meet the one-team advantage <Arrow /></a></div>
      </section>
      <section className="work-section section-dark section-pad" id="projects">
        <div className="section-label"><span>02 / SELECTED DIRECTIONS</span><span>PHYSICAL. DIGITAL. EVERYTHING BETWEEN.</span></div>
        <div className="section-heading"><h2>IDEAS.<br /><span className="muted">MADE TANGIBLE.</span></h2><p>A first look at the worlds we build in.<br />Visual studies for the projects to come.</p></div>
        <div className="work-grid">{work.map((project, i) => <button className={`work-item work-item-${i}`} key={project.title} onClick={() => openPanel(project.title, `${project.text} This abstract visual is a design placeholder, not a photograph of a completed project.`, project.kind)}><div className="work-image"><Visual kind={project.kind} /><span className="round-arrow"><Arrow /></span></div><div className="work-caption"><div><span className="meta">0{i + 1} / {project.label}</span><h3>{project.title}</h3></div><span className="meta">VIEW STUDY ↗</span></div></button>)}</div>
      </section>
      <section className="build-section section-light section-pad" id="solutions">
        <div className="section-label"><span>03 / WHAT WE BUILD</span><span>NO SINGLE DISCIPLINE. NO SINGLE BOX.</span></div>
        <div className="build-layout"><h2>COMPLEX IDEAS.<br />COMPLETE<br /><span className="muted">SOLUTIONS.</span></h2><div className="capability-list">{['Interactive Systems', 'Retail Technology', 'Brand Experiences', 'Custom Products', 'Entertainment', 'Manufacturing'].map((name, i) => <a href="#process" key={name}><span className="meta">0{i + 1}</span><span>{name}</span><Arrow /></a>)}</div></div>
      </section>
      <section className="process-section section-dark section-pad" id="process">
        <div className="section-label"><span>04 / FROM FIRST THOUGHT TO FINAL DETAIL</span><span>ONE CONTINUOUS PROCESS</span></div>
        <div className="process-layout"><div className="process-intro"><p className="eyebrow">YOU BRING THE IDEA.</p><h2>WE MAKE<br />IT <em>REAL.</em></h2><div className="process-drawing" aria-hidden="true"><div /><div /><div /><span>IDEA → OBJECT</span></div><p>Every decision moves the product forward.<br />Every discipline stays connected.</p></div>
          <div className="process-steps"><div className="process-track"><div className="process-progress" /></div>{steps.map(([title, text], i) => <article className="process-step" key={title}><span className="step-number">0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div>
        <div className="process-closing">WE DELIVER THE PRODUCT.<Arrow /></div>
      </section>
      <section className="advantage section-yellow section-pad" id="advantage"><div className="section-label"><span>05 / THE ONE-TEAM ADVANTAGE</span><span>LESS DISTANCE BETWEEN IDEA AND REALITY.</span></div><h2>NO HANDOFF<br />BETWEEN FIVE<br />COMPANIES.</h2><div className="advantage-bottom"><span className="connection-mark" aria-hidden="true">↔</span><p>One conversation that continues from concept to installation. Designers talk to engineers. Software meets hardware. Production informs the design. The knowledge stays with the team, and the team stays with the product.</p><a className="text-link" href="#made-here">See where it comes together <Arrow /></a></div></section>
      <section className="made-section section-dark" id="made-here"><div className="made-visual"><Visual kind="machine" /><span className="vertical-label meta">MATERIAL / MECHANICS / MAKING</span></div><div className="made-copy"><p className="eyebrow">06 / MADE HERE</p><h2>DESIGNED HERE.<br />ENGINEERED HERE.<br /><em>BUILT HERE.</em></h2><p>Close to the materials. Close to the machines. Close to every decision that makes the final product better.</p><div className="location"><span className="status-dot" /><span>Banja Luka, Bosnia & Herzegovina</span></div><span className="meta muted">INDUSTRIAL FORM STUDY / WORKSHOP MEDIA TO FOLLOW</span></div></section>
      <section className="own-section section-light section-pad" id="own-products"><div className="section-label"><span>07 / OUR OWN IDEAS, OUT IN THE WORLD</span><span>DEV STUDIO ORIGINALS</span></div><h2>WE DON’T ONLY BUILD FOR CLIENTS.<br /><span className="muted">WE BUILD OUR OWN PRODUCTS.</span></h2><div className="own-layout"><div className="own-visual"><Visual kind="play" /><span className="kids-wordmark">kids<span>play</span></span></div><div className="own-copy"><p className="eyebrow">IMAGINED AND DEVELOPED BY DEV STUDIO</p><h3>A little more<br />room for <em>play.</em></h3><p>Kids Play is an original Dev Studio product. The same integrated thinking, applied to an idea of our own.</p><button className="button button-dark" onClick={() => openPanel('Kids Play', 'An original Dev Studio product. This visual explores a playful design direction; product details and real photography will follow.', 'play')}>Discover Kids Play <Arrow /></button></div></div></section>
      <section className="stories-section section-light section-pad" id="stories"><div className="section-label"><span>08 / LATEST FROM THE STUDIO</span><span>WORK IN PROGRESS. THINKING IN MOTION.</span></div><div className="section-heading"><h2>INSIDE<br />THE MAKING.</h2><span className="meta muted">EDITORIAL PREVIEWS / STORIES COMING SOON</span></div><div className="stories-grid">{stories.map(([type, title, kind]) => <button className="story" key={title} onClick={() => openPanel(title, `A placeholder for a future ${type.toLowerCase()} story. Editorial content will be added when the homepage is connected to the CMS.`, kind)}><div className="story-image"><Visual kind={kind} /></div><p className="meta">{type.toUpperCase()} <span>PREVIEW</span></p><h3>{title}<Arrow /></h3></button>)}</div></section>
      <section className="final-cta section-dark section-pad" id="contact"><div className="section-label"><span>THE NEXT THING WE BUILD COULD BE YOURS.</span><span>LET’S TALK.</span></div><h2>GOT AN IDEA?<br /><em>LET’S BUILD IT.</em></h2><button className="button button-yellow" onClick={contact}>START A PROJECT <Arrow /></button><div className="cta-rule" /></section>
    </main>
    <footer className="site-footer section-dark"><a className="wordmark" href="#" aria-label="Dev Studio back to top">dev<span className="logo-symbol">✳</span><small>STUDIO</small></a><p>FROM IDEA TO REALITY.<br /><span>Banja Luka, Bosnia & Herzegovina</span></p><span className="meta">© {new Date().getFullYear()} DEV STUDIO</span><a className="text-link" href="#">BACK TO TOP ↑</a></footer>
    <dialog ref={dialog} className="prototype-dialog" aria-labelledby="dialog-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}><div className="dialog-content"><button className="dialog-close" onClick={() => dialog.current?.close()} aria-label="Close panel">CLOSE ×</button><p className="eyebrow">DEV STUDIO / DESIGN PREVIEW</p><h2 id="dialog-title">{panel.title}</h2>{panel.kind && panel.kind !== 'contact' && <Visual kind={panel.kind} />}<p>{panel.text}</p>{panel.kind === 'contact' && <a className="button button-yellow" href="https://devstudio.biz">Visit the current website <Arrow /></a>}</div></dialog>
  </div>
}
