import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { registerHooks } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { test } from 'node:test'
import ts from 'typescript'
import { renderToStaticMarkup } from 'react-dom/server'

const root = new URL('../src/', import.meta.url)
let records = []
let queries = []
let unavailable = false
let fail = false
const payload = { find: async options => {
  queries.push(options)
  if (fail) throw new Error('Test query failure')
  const docs = options.pagination === false ? records : records.slice((options.page - 1) * options.limit, options.page * options.limit)
  return { docs, page: options.page, totalDocs: records.length, totalPages: options.pagination === false ? 1 : Math.ceil(records.length / options.limit) }
} }
globalThis.__solutionsTestCMS = () => unavailable ? null : payload

// Execute the real query, page and list components; replace only external services
// and unrelated shell/media components. Transpile TSX without writing build files.
const hooks = registerHooks({
  resolve(specifier, context, next) {
    if (specifier === 'next/navigation') return { url: 'test:next-navigation', shortCircuit: true }
    let url
    if (specifier.startsWith('@/')) url = new URL(specifier.slice(2), root)
    else if (specifier.startsWith('.') && context.parentURL?.startsWith(root.href)) url = new URL(specifier, context.parentURL)
    if (url) {
      for (const suffix of ['', '.ts', '.tsx']) {
        const candidate = pathToFileURL(fileURLToPath(url) + suffix)
        if (existsSync(candidate)) return { url: candidate.href, shortCircuit: true }
      }
    }
    return next(specifier, context)
  },
  load(url, context, next) {
    let source
    if (url === 'test:next-navigation') source = 'export function notFound() { throw new Error("404") }'
    else if (url === new URL('lib/cms.ts', root).href) source = 'export const getPublicPayload = async () => globalThis.__solutionsTestCMS()'
    else if (url.endsWith('/content/ContentShell.tsx')) source = 'export const ContentShell = ({children}) => children'
    else if (url.endsWith('/content/ContentMedia.tsx')) source = 'export const ContentMedia = () => null; export const ContentVideo = ContentMedia; export const Gallery = ContentMedia'
    else if (url.endsWith('/content/EditorialText.tsx')) source = 'export const EditorialText = () => null'
    else if (url.startsWith(root.href) && /\.tsx?$/.test(url)) {
      source = ts.transpileModule(readFileSync(new URL(url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText
    }
    return source === undefined ? next(url, context) : { format: 'module', source, shortCircuit: true }
  },
})
const { findAllSolutions, findEditorial } = await import('../src/lib/content-data.ts')
const { IndexPage, indexMetadata } = await import('../src/components/content/SectionPages.tsx')
const { localizedHref } = await import('../src/lib/i18n.ts')
const { publicSolutionGroups, publicSolutionGroupForHomepageCategory } = await import('../src/lib/public-solution-groups.ts')
const manifest = JSON.parse(readFileSync(new URL('../content-import/manifest/catalog-content.json', import.meta.url), 'utf8'))
const counts = { 'digital-retail': 5, 'brand-experiences': 3, 'custom-engineering': 3, entertainment: 1 }
const reassignedGroups = {
  'impressive-custom-shelves': 'digital-retail',
  'interactive-promotional-games': 'brand-experiences',
  'custom-furniture-equipment': 'custom-engineering',
}

async function localizedRecords(locale) {
  if (process.env.SOLUTIONS_TEST_LIVE === '1') {
    const url = new URL('https://new.devstudio.biz/api/solutions')
    url.search = new URLSearchParams({ locale, 'fallback-locale': 'none', pagination: 'false', depth: '0', sort: 'title' })
    const response = await fetch(url)
    assert.equal(response.status, 200)
    const data = await response.json()
    assert.equal(data.docs.length, data.totalDocs)
    return data.docs
  }
  return manifest.solutions.map((doc, index) => ({
    id: index + 1,
    key: doc.key,
    ...doc.locales[locale],
    solutionGroup: reassignedGroups[doc.key] || doc.solutionGroup,
    _status: 'published',
  })).sort((a, b) => a.title.localeCompare(b.title))
}

test('Solutions index renders the four finalized public groups in both locales', async () => {
  for (const locale of ['bhs', 'en']) {
    const publicLabel = locale === 'bhs' ? 'Šta stvaramo' : 'What We Build'
    records = await localizedRecords(locale)
    assert.equal(records.length, 13)
    assert.ok(records.every(doc => doc._status === 'published' && doc.title && doc.slug))
    for (const page of ['1', '2', '99']) {
      queries = []
      const html = renderToStaticMarkup(await IndexPage({ collection: 'solutions', locale, searchParams: Promise.resolve({ page }) }))
      assert.match(html, new RegExp(`DEV STUDIO / ${publicLabel}`))
      assert.match(html, new RegExp(`<h1><span>${publicLabel}</span></h1>`))
      assert.equal(queries[0].pagination, false)
      assert.equal(queries[0].locale, locale)
      assert.equal(queries[0].fallbackLocale, false)
      assert.equal(queries[0].overrideAccess, false)
      assert.equal(queries[0].draft, false)
      assert.deepEqual(queries[0].where.and, [
        { _status: { equals: 'published' } }, { title: { exists: true } }, { title: { not_equals: '' } },
        { slug: { exists: true } }, { slug: { not_equals: '' } },
      ])
      assert.doesNotMatch(html, /content-pagination/)
      assert.equal((html.match(/<article /g) || []).length, 12)
      assert.doesNotMatch(html, /id="production"/)
      const groupPositions = publicSolutionGroups.map(group => html.indexOf(`id="${group}"`))
      assert.ok(groupPositions.every(position => position >= 0))
      assert.ok(groupPositions.every((position, index) => index === 0 || position > groupPositions[index - 1]))
      for (const [group, count] of Object.entries(counts)) {
        const section = html.match(new RegExp(`<section class="solution-group" id="${group}"[^>]*>([\\s\\S]*?)</section>`))?.[1]
        assert.ok(section, group)
        assert.equal((section.match(/<article /g) || []).length, count, `${locale}/${group}`)
        for (const doc of records.filter(doc => doc.solutionGroup === group)) {
          assert.ok(section.includes(`href="${localizedHref(`/solutions/${doc.slug}`, locale)}"`))
        }
        assert.equal(localizedHref(`/solutions#${group}`, locale), `${locale === 'en' ? '/en' : ''}/solutions#${group}`)
      }
      const manufacturingSlug = locale === 'bhs' ? 'proizvodnja-po-narudzbi' : 'custom-manufacturing'
      const manufacturing = records.find(doc => doc.slug === manufacturingSlug)
      assert.equal(manufacturing?.solutionGroup, 'production')
      assert.equal(localizedHref(`/solutions/${manufacturingSlug}`, locale), `${locale === 'en' ? '/en' : ''}/solutions/${manufacturingSlug}`)
      assert.doesNotMatch(html, new RegExp(`href="${localizedHref(`/solutions/${manufacturingSlug}`, locale)}"`))
      const finalizedAssignments = locale === 'bhs'
        ? [['impresivne-police-po-mjeri', 'digital-retail'], ['interaktivne-promotivne-igre', 'brand-experiences'], ['mobilijar-i-oprema-po-mjeri', 'custom-engineering'], ['kids-play', 'entertainment']]
        : [['impressive-custom-shelves', 'digital-retail'], ['interactive-promotional-games', 'brand-experiences'], ['custom-furniture-equipment', 'custom-engineering'], ['kids-play', 'entertainment']]
      for (const [slug, group] of finalizedAssignments) assert.equal(records.find(doc => doc.slug === slug)?.solutionGroup, group)
      const metadata = await indexMetadata('solutions', locale, Promise.resolve({ page }))
      assert.equal(metadata.title, `${publicLabel} — Dev Studio`)
      assert.equal(metadata.alternates.canonical, localizedHref('/solutions', locale))
    }
    console.log(`${locale} rendered counts (${process.env.SOLUTIONS_TEST_LIVE === '1' ? 'live CMS' : 'manifest fixture'}): ${JSON.stringify(counts)}`)
  }
})

test('Solutions stay complete as CMS grows; other editorial queries remain paginated', async () => {
  records = Array.from({ length: 125 }, (_, id) => ({ id, title: `Solution ${id}`, slug: `solution-${id}`, solutionGroup: [...publicSolutionGroups, 'production'][id % 5], _status: 'published' }))
  assert.equal((await findAllSolutions('bhs')).docs.length, 125)
  for (const collection of ['projects', 'stories', 'solutions']) {
    assert.equal((await findEditorial(collection, 'en', 2)).docs.length, 8)
    assert.equal(queries.at(-1).pagination, true)
    assert.equal(queries.at(-1).page, 2)
  }
  records.push({ id: 126, _status: 'draft' })
  assert.equal((await findAllSolutions('en')).docs.length, 125)
})

test('Homepage categories use explicit finalized BHS and EN mappings', () => {
  assert.deepEqual(publicSolutionGroups, ['digital-retail', 'brand-experiences', 'custom-engineering', 'entertainment'])
  for (const [name, group] of [
    ['Retail Technology & Digital Systems', 'digital-retail'],
    ['Brand Experiences & Activations', 'brand-experiences'],
    ['Custom Products & Interactive Systems', 'custom-engineering'],
    ['Dev Studio Products', 'entertainment'],
    ['Retail tehnologija i digitalni sistemi', 'digital-retail'],
    ['Brend iskustva i aktivacije', 'brand-experiences'],
    ['Custom proizvodi i interaktivni sistemi', 'custom-engineering'],
    ['Dev Studio proizvodi', 'entertainment'],
  ]) assert.equal(publicSolutionGroupForHomepageCategory(name), group)
  assert.equal(publicSolutionGroupForHomepageCategory('Production & Fabrication'), undefined)
  assert.equal(publicSolutionGroupForHomepageCategory('Custom proizvodi i interaktivni sistemi'), 'custom-engineering')
  assert.equal(publicSolutionGroupForHomepageCategory('Dev Studio proizvodi'), 'entertainment')
})

test('empty and unavailable CMS remain supported', async () => {
  records = []
  assert.deepEqual((await findAllSolutions('bhs')).docs, [])
  unavailable = true
  assert.equal((await findAllSolutions('en')).unavailable, true)
  unavailable = false
  fail = true
  assert.equal((await findAllSolutions('bhs')).unavailable, true)
  fail = false
})

test.after(() => { hooks.deregister(); delete globalThis.__solutionsTestCMS })
