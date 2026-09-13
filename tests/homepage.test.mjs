import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync, existsSync } from 'node:fs'
import { createRequire, registerHooks } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ts from 'typescript'

const root = new URL('../src/', import.meta.url)
const nextImage = pathToFileURL(createRequire(import.meta.url).resolve('next/image')).href
// Execute the real TSX components, including Next Image, without build output.
const hooks = registerHooks({
  resolve(specifier, context, next) {
    if (specifier === 'gsap' || specifier === 'gsap/ScrollTrigger') return { url: 'test:motion', shortCircuit: true }
    if (specifier === 'next/image') return { url: 'test:gallery-image', shortCircuit: true }
    const url = specifier.startsWith('@/') ? new URL(specifier.slice(2), root)
      : specifier.startsWith('.') && context.parentURL?.startsWith(root.href) ? new URL(specifier, context.parentURL) : null
    if (url) for (const suffix of ['', '.ts', '.tsx']) {
      const candidate = pathToFileURL(fileURLToPath(url) + suffix)
      if (existsSync(candidate)) return { url: candidate.href, shortCircuit: true }
    }
    return next(specifier, context)
  },
  load(url, context, next) {
    if (url === 'test:motion') return { format: 'module', shortCircuit: true, source: 'export default {}; export const ScrollTrigger = {}' }
    if (/\/(SiteHeader|SiteFooter|HeroProcessFlow)\.tsx$/.test(url)) return { format: 'module', shortCircuit: true, source: 'export const SiteHeader = () => null; export const SiteFooter = () => null; export const HeroProcessFlow = () => null;' }
    if (url === 'test:gallery-image') return { format: 'module', shortCircuit: true, source: `import Image from ${JSON.stringify(nextImage)}; export default Image.default || Image;` }
    if (url.startsWith(root.href) && /\.tsx?$/.test(url)) return { format: 'module', shortCircuit: true, source: ts.transpileModule(readFileSync(new URL(url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText }
    return next(url, context)
  },
})

const { HomePrototype } = await import('../src/components/home/HomePrototype.tsx')
const render = (locale, homepage) => renderToStaticMarkup(createElement(HomePrototype, { cms: { locale, homepage, settings: {} } }))
const media = { id: 1, url: '/work.png', mimeType: 'image/png', width: 800, height: 600, alt: 'Real solution photo' }
const solution = (id, locale) => ({ id, title: `Title ${locale} ${id}`, slug: `slug-${locale}-${id}`, shortDescription: `Description ${locale} ${id}`, _status: 'published', heroMedia: media })

test('Homepage renders up to four published Solutions with localized links and real media', () => {
  for (const locale of ['bhs', 'en']) {
    const html = render(locale, { selectedWork: { projects: [{ title: 'Legacy project' }], solutions: [99, { ...solution(8, locale), _status: 'draft' }, ...[1,2,3,4,5].map(id => solution(id, locale))] } })
    assert.equal((html.match(/class="work-item work-item-/g) || []).length, 4)
    assert.doesNotMatch(html, /Legacy project|Title (?:en|bhs) [58]/)
    for (const id of [1,2,3,4]) {
      assert.ok(html.includes(`href="${locale === 'en' ? '/en' : ''}/solutions/slug-${locale}-${id}"`))
      assert.ok(html.includes(`Description ${locale} ${id}`))
    }
    const work = html.split('id="projects"')[1].split('id="solutions"')[0]
    assert.equal((work.match(/class="work-solution-image"/g) || []).length, 4)
    assert.doesNotMatch(work, /class="visual|<button/)
  }
})

test('Homepage ignores legacy Projects and preserves a fallback for a Solution without media', () => {
  assert.doesNotMatch(render('en', { selectedWork: { projects: [{ title: 'Legacy project' }] } }), /Legacy project|class="work-item work-item-/)
  const html = render('en', { selectedWork: { solutions: [{ ...solution(1, 'en'), heroMedia: 123 }] } })
  assert.match(html, /href="\/en\/solutions\/slug-en-1"/)
  assert.match(html, /visual--machine/)
})

test('References replaces removed sections, with twenty explicitly temporary marks or an uploaded image', () => {
  for (const locale of ['bhs', 'en']) {
    const html = render(locale, { ownProducts: { headline: 'Old own section' }, latestFromTheStudio: { headline: 'Old stories section' } })
    assert.doesNotMatch(html, /own-section|stories-section|Old own section|Old stories section/)
    assert.equal((html.match(/class="reference-mark reference-mark-/g) || []).length, 20)
    assert.ok(html.includes(locale === 'bhs' ? '07 / REFERENCE' : '07 / REFERENCES'))
    assert.ok(html.includes(locale === 'bhs' ? 'Privremene oznake za reference' : 'Temporary reference placeholders'))
    assert.ok(html.indexOf('id="made-here"') < html.indexOf('id="references"'))
    assert.ok(html.indexOf('id="references"') < html.indexOf('id="contact"'))
    const populated = render(locale, { references: { headline: 'CMS headline', intro: 'CMS intro', media } })
    assert.match(populated, /class="references-image"/)
    assert.match(populated, /CMS headline/)
    assert.doesNotMatch(populated, /class="references-grid"/)
  }
})
test.after(() => hooks.deregister())
