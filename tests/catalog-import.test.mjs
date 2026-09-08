import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { guardWrite, importRecords, parseArgs, validateManifest } from '../scripts/import-catalog-content.ts'

const source = JSON.parse(readFileSync('content-import/manifest/catalog-content.json', 'utf8'))
const fresh = () => structuredClone(source)

test('manifest validates all 21 pages, 13 required groups, references and original hashes', () => {
  const manifest = validateManifest(fresh())
  assert.equal(manifest.solutions.length, 13)
  assert.equal(manifest.assets.filter(a => a.importEnabled).length, 51)
  assert.deepEqual(manifest.projects, [])
  assert.deepEqual(manifest.mediaCoverage.map(s => s.mediaCount), [3,3,3,3,5,7,3,3,5,3,9,3,3])
  assert.deepEqual(manifest.solutions.filter(s => !s.importHeroMedia).map(s => s.key), ['retail-media-screens'])
})

test('deployed validation does not require the untracked raw source directory', () => {
  const manifest = fresh()
  manifest.source.file = 'content-source/catalog-not-present-in-deployment.pdf'
  assert.doesNotThrow(() => validateManifest(manifest))
})

test('rejects wrong grouping, AI as real work, missing disclosure, broken refs and translation drift', () => {
  for (const mutate of [
    m => { m.solutions[0].solutionGroup = 'production' },
    m => { m.assets.find(a => a.classification === 'ai_concept').safeAsRealization = true },
    m => { m.assets.find(a => a.classification === 'ai_concept').disclosure = null },
    m => { m.assets.find(a => a.classification === 'ai_concept').caption.en = 'An event' },
    m => { m.assets.find(a => a.classification === 'ai_concept').alt.bhs = 'Događaj' },
    m => { m.assets.find(a => a.id === 'p12-02').conceptual = false },
    m => { m.assets.find(a => a.id === 'p21-01').importEnabled = true },
    m => { m.assets.find(a => a.duplicateOf).importEnabled = true },
    m => { m.assets.find(a => a.id === 'p05-01').classification = 'real_photo' },
    m => { m.solutions[0].importHeroMedia = 'p07-01' },
    m => { m.solutions[0].importGalleryMedia = [] },
    m => { m.solutions[0].locales.en.body = 'Different from reviewed rich text' },
    m => { m.solutions[1].locales.en.slug = m.solutions[0].locales.en.slug },
    m => { m.assets[0].file = '../PROJECT_BRIEF.md' },
    m => { m.downloads[0].language = 'en' },
    m => { m.projects.push({ title: 'Unreviewed project' }) },
    m => { m.projectCandidates[0].images.push('p12-02') },
  ]) {
    const m = fresh(); mutate(m); assert.throws(() => validateManifest(m))
  }
})

test('editorial overrides and heading/paragraph structure survive into both import locales', () => {
  const shelf = source.solutions.find(s => s.key === 'smart-pos-shelf')
  assert.doesNotMatch(JSON.stringify(shelf), /\bBASIC\b|BASIC\s*\/\s*SMART\s*\/\s*CUSTOM/i)
  for (const locale of ['bhs', 'en']) {
    const kids = source.solutions.find(s => s.key === 'kids-play').locales[locale]
    assert.match(kids.body, /Made in BiH/)
    assert.match(kids.body, /3 (?:do )?11|3–11/)
    assert.match(kids.body, /24-in/)
    assert.match(kids.body, /30/)
    for (const solution of source.solutions) {
      const nodes = solution.locales[locale].content.root.children
      for (let i = 0; i < nodes.length; i++) if (nodes[i].type === 'heading') {
        assert.equal(nodes[i+1]?.type, 'paragraph', 'Prose following a heading must remain paragraph text')
        assert.doesNotMatch(nodes[i].children.map(n => n.text).join(''), /\n/)
      }
    }
  }
  const m = fresh()
  m.solutions.find(s => s.key === 'smart-pos-shelf').locales.en.shortDescription = 'BASIC / SMART / CUSTOM'
  assert.throws(() => validateManifest(m), /Obsolete Smart POS tier/)
})

test('default dry run completes with unusable DB settings and does not load Payload config', () => {
  const result = spawnSync(process.execPath, ['scripts/import-catalog-content.ts'], {
    encoding: 'utf8', env: { ...process.env, DATABASE_URL: 'invalid-no-database', PAYLOAD_SECRET: '' },
  })
  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /Payload config not loaded/)
  assert.doesNotMatch(result.stdout + result.stderr, /cannot connect|CREATE media|CREATE solution/)
})

test('writes require exact review hash, production mode and explicit matching database target', () => {
  assert.equal(parseArgs([]).write, false)
  assert.throws(() => parseArgs(['--writ']))
  assert.throws(() => parseArgs(['--write', '--dry-run']))
  const env = { NODE_ENV: 'production', DATABASE_URL: 'postgres://local:local@localhost:5432/review', PAYLOAD_SECRET: 'test-only' }
  const opts = { write: true, reviewed: 'review-hash', target: 'localhost:5432/review' }
  assert.throws(() => guardWrite({ ...opts, write: false }, 'review-hash', env))
  assert.throws(() => guardWrite({ ...opts, reviewed: 'stale' }, 'review-hash', env))
  assert.throws(() => guardWrite(opts, 'review-hash', { ...env, NODE_ENV: 'development' }))
  assert.throws(() => guardWrite(opts, 'review-hash', { ...env, PAYLOAD_DROP_DATABASE: 'true' }))
  assert.throws(() => guardWrite({ ...opts, target: 'different:5432/production' }, 'review-hash', env))
  assert.doesNotThrow(() => guardWrite(opts, 'review-hash', env))
})

// Minimal in-memory Local API with nested localized gallery captions. It writes
// only fixture uploads into a fresh OS temp directory, never real media or a DB.
class MemoryPayload {
  docs = { media: [], solutions: [], downloads: [] }
  sequence = 1
  rowSequence = 1
  mutations = 0
  events = []
  constructor(storage) { this.storage = storage }
  view(doc, locale = 'bhs') {
    return structuredClone({ ...doc.shared, ...doc[locale], ...(doc.shared.gallery ? {
      gallery: doc.shared.gallery.map(row => ({ id: row.id, image: row.image, caption: row.captions[locale] ?? null })),
    } : {}) })
  }
  store(doc, data, locale = 'bhs') {
    const localized = ['title', 'slug', 'shortDescription', 'content', 'alt', 'caption']
    for (const [key, value] of Object.entries(data)) {
      if (key === 'gallery') {
        doc.shared.gallery = value.map(row => ({
          id: row.id || `row-${this.rowSequence++}`, image: row.image,
          captions: { ...(doc.shared.gallery || []).find(old => old.id === row.id)?.captions, [locale]: row.caption },
        }))
      } else if (localized.includes(key)) doc[locale][key] = structuredClone(value)
      else doc.shared[key] = structuredClone(value)
    }
  }
  match(doc, where) {
    if (!where) return true
    return Object.entries(where).every(([key, value]) => key === 'and' ? value.every(w => this.match(doc, w)) : doc[key] === value.equals)
  }
  async find({ collection, where, locale, limit = 10 }) {
    assert(this.docs[collection], `Unexpected collection ${collection}`)
    const docs = this.docs[collection].map(d => this.view(d, locale)).filter(d => this.match(d, where))
    return { docs: docs.slice(0, limit), totalDocs: docs.length }
  }
  async findByID({ collection, id, locale }) {
    return this.view(this.docs[collection].find(d => d.shared.id === id), locale)
  }
  async create({ collection, data, locale, file, draft }) {
    assert(this.docs[collection]); if (collection === 'solutions') assert.equal(draft, true)
    const doc = { shared: { id: this.sequence++ }, bhs: {}, en: {} }
    this.store(doc, data, locale)
    if (file) {
      const folder = path.join(this.storage, collection === 'media' ? 'assets' : 'downloads')
      mkdirSync(folder, { recursive: true }); writeFileSync(path.join(folder, file.name), file.data)
      Object.assign(doc.shared, { filename: file.name, filesize: file.size })
    }
    this.docs[collection].push(doc); this.mutations++; this.events.push(`create:${collection}`)
    return this.view(doc, locale)
  }
  async update({ collection, id, data, locale, draft }) {
    if (collection === 'solutions') assert.equal(draft, true)
    const doc = this.docs[collection].find(d => d.shared.id === id)
    this.store(doc, data, locale); this.mutations++; this.events.push(`update:${collection}`)
    return this.view(doc, locale)
  }
}

test('two import passes create no duplicates or needless updates; locales and references persist', async () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'devstudio-catalog-test-'))
  try {
    const api = new MemoryPayload(dir)
    await importRecords(api, fresh(), dir)
    const count = api.mutations
    await importRecords(api, fresh(), dir)
    assert.equal(api.mutations, count, 'Second identical pass must be a no-op')
    assert.equal(api.docs.media.length, 51); assert.equal(api.docs.solutions.length, 13); assert.equal(api.docs.downloads.length, 1)
    assert(api.events.lastIndexOf('create:media') < api.events.indexOf('create:solutions'))
    for (const s of source.solutions) {
      const doc = api.docs.solutions.find(d => d.bhs.slug === s.locales.bhs.slug)
      assert.equal(doc.en.slug, s.locales.en.slug)
      assert.equal(doc.shared._status, 'draft')
      assert.deepEqual(doc.shared.downloads, [api.docs.downloads[0].shared.id])
      for (const locale of ['bhs', 'en']) {
        assert.equal(doc[locale].title, s.locales[locale].title)
        const gallery = api.view(doc, locale).gallery
        assert(gallery.every(row => row.caption))
        assert.equal(gallery.length, s.importGalleryMedia.length)
        for (const assetId of s.importGalleryMedia) {
          const asset = source.assets.find(a => a.id === assetId)
          const media = api.docs.media.find(d => d.shared.filename === asset.proposedCleanFilename)
          const row = gallery.find(r => r.image === media.shared.id)
          assert.equal(row.caption, asset.caption[locale])
          assert.equal(media[locale].caption, asset.caption[locale])
          if (asset.conceptual) assert.match(row.caption, locale === 'bhs' ? /Konceptualni vizual/ : /Conceptual visualization/)
        }
      }
    }
  } finally { rmSync(dir, { recursive: true }) }
})

test('existing manual gallery captions retain wording and receive missing disclosure once', async () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'devstudio-catalog-test-'))
  try {
    const api = new MemoryPayload(dir)
    await importRecords(api, fresh(), dir)
    const solution = api.docs.solutions.find(d => d.en.slug === 'retail-media-screens')
    const row = solution.shared.gallery[0]
    row.captions = { bhs: 'Prikaz na ulazu.', en: 'Entrance placement.' }
    const manualHero = solution.shared.heroMedia = 99999
    await importRecords(api, fresh(), dir)
    assert.equal(solution.shared.heroMedia, manualHero, 'Manual hero must be preserved')
    const revised = solution.shared.gallery[0]
    assert.match(revised.captions.bhs, /^Prikaz na ulazu\. Konceptualni vizual/)
    assert.match(revised.captions.en, /^Entrance placement\. Conceptual visualization/)
    const count = api.mutations
    await importRecords(api, fresh(), dir)
    assert.equal(api.mutations, count, 'Disclosure must not be appended repeatedly')
  } finally { rmSync(dir, { recursive: true }) }
})

test('published and conflicting localized slug matches abort before mutation', async () => {
  for (const scenario of ['published', 'collision']) {
    const api = new MemoryPayload('unused')
    const s = source.solutions[0]
    api.docs.solutions.push({ shared: { id: 1, _status: scenario === 'published' ? 'published' : 'draft' }, bhs: { slug: s.locales.bhs.slug }, en: {} })
    if (scenario === 'collision') api.docs.solutions.push({ shared: { id: 2, _status: 'draft' }, bhs: {}, en: { slug: s.locales.en.slug } })
    await assert.rejects(() => importRecords(api, fresh()))
    assert.equal(api.mutations, 0)
  }
})

test('an interrupted pass resumes using existing IDs', async () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'devstudio-catalog-test-'))
  try {
    const api = new MemoryPayload(dir)
    const create = api.create.bind(api)
    let once = true
    api.create = async options => {
      if (options.collection === 'solutions' && api.docs.solutions.length === 5 && once) { once = false; throw Error('Simulated interruption') }
      return create(options)
    }
    await assert.rejects(() => importRecords(api, fresh(), dir), /Simulated interruption/)
    const ids = api.docs.solutions.map(d => d.shared.id)
    await importRecords(api, fresh(), dir)
    assert.equal(api.docs.solutions.length, 13)
    assert.deepEqual(api.docs.solutions.slice(0,5).map(d => d.shared.id), ids)
    assert.equal(api.docs.media.length, 51)
  } finally { rmSync(dir, { recursive: true }) }
})
