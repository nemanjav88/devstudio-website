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
    if (url === 'test:gallery-image') return { format: 'module', shortCircuit: true, source: `import Image from ${JSON.stringify(nextImage)}; export default Image.default || Image;` }
    if (url.startsWith(root.href) && /\.tsx?$/.test(url)) return { format: 'module', shortCircuit: true, source: ts.transpileModule(readFileSync(new URL(url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText }
    return next(url, context)
  },
})
const { ContentGallery } = await import('../src/components/content/ContentGallery.tsx')
const { ContentMedia } = await import('../src/components/content/ContentMedia.tsx')
const { EditorialList } = await import('../src/components/content/ContentLists.tsx')
const asset = (id, width, height) => ({ id, width, height, url: `/image-${id}.png`, mimeType: 'image/png', alt: `Product ${id}`, caption: 'Media caption' })

test('gallery keeps valid media order, full dimensions, and localized controls', () => {
  const gallery = [
    { image: asset(1, 1672, 941), caption: 'Gallery caption <safe>' },
    { image: 99 }, { image: null }, { image: { ...asset(3, 400, 600), url: 'javascript:alert(1)' } },
    { image: { ...asset(4, 400, 600), mimeType: 'video/mp4' } },
    { image: asset(2, 1213, 1296) },
  ]
  for (const locale of ['bhs', 'en']) {
    const html = renderToStaticMarkup(createElement(ContentGallery, { gallery, locale }))
    assert.equal((html.match(/class="gallery-open"/g) || []).length, 2)
    assert.equal((html.match(/solution-media--gallery-tile solution-media--contain/g) || []).length, 2)
    assert.match(html, /Gallery caption &lt;safe&gt;/)
    assert.match(html, /Media caption/)
    assert.match(html, /width="1672" height="941"/)
    assert.match(html, /width="1213" height="1296"/)
    assert.ok(html.indexOf('image-1.png') < html.indexOf('image-2.png'))
    assert.match(html, /aria-haspopup="dialog"/)
    assert.ok(html.includes(locale === 'en' ? 'Close gallery' : 'Zatvori galeriju'))
    assert.doesNotMatch(html, /<dialog[^>]+\sopen(?:\s|>)/)
  }
})

test('empty galleries disappear and single-image navigation is disabled', () => {
  assert.equal(renderToStaticMarkup(createElement(ContentGallery, { locale: 'en', gallery: [] })), '')
  const html = renderToStaticMarkup(createElement(ContentGallery, { locale: 'en', gallery: [{ image: asset(1, 100, 100) }] }))
  assert.equal((html.match(/disabled=""/g) || []).length, 2)
})

test('all retail listing geometries use the shared contain stage; editorial hero cover remains available', () => {
  const docs = [[429, 762], [339, 638], [578, 496], [1672, 941]].map(([width, height], id) => ({ id, slug: `solution-${id}`, title: `Solution ${id}`, solutionGroup: 'digital-retail', heroMedia: asset(id, width, height) }))
  const html = renderToStaticMarkup(createElement(EditorialList, { docs, locale: 'en', collection: 'solutions' }))
  assert.equal((html.match(/solution-media--solution-card solution-media--contain/g) || []).length, 4)
  assert.doesNotMatch(html, /solution-media--cover/)
  const hero = renderToStaticMarkup(createElement(ContentMedia, { media: asset(5, 1309, 927), presentation: 'solution-hero' }))
  assert.match(hero, /solution-media--solution-hero solution-media--cover/)
  const lightbox = renderToStaticMarkup(createElement(ContentMedia, { media: asset(5, 1309, 927), presentation: 'lightbox' }))
  assert.match(lightbox, /solution-media--lightbox solution-media--contain/)
})

test('versioned Payload images use responsive optimization without changing contain sizing inputs', () => {
  const media = { ...asset(1, 397, 758), url: '/api/media/file/product.png', updatedAt: '2026-09-11T09:15:59.355Z' }
  const html = renderToStaticMarkup(createElement(ContentMedia, { media, presentation: 'gallery-tile' }))
  assert.match(html, /srcSet=/)
  assert.match(html, /%2Fapi%2Fmedia%2Ffile%2Fproduct.png%3Fv%3D1789118159355/)
  assert.match(html, /loading="lazy"/)
  assert.match(html, /contain-intrinsic-size:397px 758px/)
  assert.match(html, /aspect-ratio:397 \/ 758/)
  assert.match(html, /width="397" height="758"/)
  const eager = renderToStaticMarkup(createElement(ContentMedia, { media, eager: true, presentation: 'solution-hero' }))
  assert.match(eager, /loading="eager"/)
  assert.match(eager, /fetchPriority="high"/)
})

test.after(() => hooks.deregister())
