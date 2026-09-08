/**
 * Offline by default: node --import tsx scripts/import-catalog-content.ts
 * Requires Node 22+ and the repository-installed tsx loader.
 * --write additionally requires NODE_ENV=production, reviewed manifest hash and
 * an explicit DB target. See content-import/reports/import-guide.md.
 * This entrypoint never writes Projects, Clients, Stories or globals.
 */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, realpathSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import type { Payload, SanitizedConfig } from 'payload'
import type { PostgresAdapter } from '@payloadcms/db-postgres'
import type { Solution, Media, Download } from '../src/payload-types'

type Locale = 'bhs' | 'en'
type Pair<T> = Record<Locale, T>
type Asset = {
  id: string; sourcePage: number; originalExtractedFilename: string; file: string; sha256: string
  width: number; height: number; duplicateOf: string | null; classification: string
  proposedCleanFilename: string; relatedSolution: string | null; safeAsRealization: boolean
  useful: boolean; importEnabled: boolean; importFile?: string; conceptual: boolean
  alt: Pair<string>; caption: Pair<string>; disclosure: Pair<string> | null
}
type SolutionPlan = {
  key: string; solutionGroup: Solution['solutionGroup']; sourcePages: number[]; status: 'draft'
  locales: Pair<{ title: string; slug: string; shortDescription: string; body: string; content: NonNullable<Solution['content']> }>
  recommendedHeroMedia: string | null; recommendedGalleryMedia: string[]
  importHeroMedia: string | null; importGalleryMedia: string[]; downloads: string[]
}
type DownloadPlan = {
  key: string; file: string; filename: string; sha256: string; category: Download['category']
  language: Download['language']; year: number; locales: Pair<{ title: string }>
  thumbnail: null; relatedSolution: null; relatedSolutions: string[]; featured: boolean
}
export type Manifest = {
  formatVersion: number; packageKey: string; approval: string
  source: { file: string; pages: number; sha256: string }
  solutions: SolutionPlan[]; assets: Asset[]; downloads: DownloadPlan[]
  projects: unknown[]; stories: unknown[]; clients: unknown[]
  projectCandidates: { confidence: string; images: string[] }[]
  mediaCoverage: { solution: string; hero: string | null; gallery: string[]; mediaCount: number }[]
}
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PACKAGE = path.join(ROOT, 'content-import')
const LOCALES: Locale[] = ['bhs', 'en']
const EXPECTED_GROUPS = {
  'interactive-screens-retrofit': 'digital-retail', 'multimedia-screens': 'digital-retail',
  'retail-media-screens': 'digital-retail', 'smart-pos-shelf': 'digital-retail',
  'brand-activations': 'brand-experiences', '360-video-platforms': 'brand-experiences',
  'interactive-promotional-games': 'entertainment', 'kids-play': 'entertainment',
  'smart-interactive-models': 'custom-engineering', 'custom-interactive-systems': 'custom-engineering',
  'impressive-custom-shelves': 'production', 'custom-furniture-equipment': 'production', 'custom-manufacturing': 'production',
} as const
const CLASSES = ['real_photo','real_product','product_render','ai_concept','diagram','icon','logo','decorative','unsuitable']
const hash = (buffer: Buffer) => createHash('sha256').update(buffer).digest('hex')

export function inside(base: string, relative: string): string {
  assert.equal(typeof relative, 'string', 'File path must be a string')
  assert(!path.isAbsolute(relative), 'Absolute paths are forbidden in manifests')
  const file = path.resolve(base, relative)
  const realBase = realpathSync(base)
  const relativeReal = path.relative(realBase, realpathSync(file))
  assert(relativeReal && relativeReal !== '..' && !relativeReal.startsWith(`..${path.sep}`) && !path.isAbsolute(relativeReal), 'File escapes allowed directory')
  return file
}

function assertFile(base: string, file: string, expected: string): Buffer {
  assert.match(expected, /^[a-f0-9]{64}$/)
  const data = readFileSync(inside(base, file))
  assert.equal(hash(data), expected, `File changed: ${file}`)
  return data
}

function text(value: unknown, label: string): asserts value is string {
  assert(typeof value === 'string' && value.trim().length > 0, `Missing ${label}`)
}

/** Strict offline validation: packaged sources, classifications and real schema hashes. */
export function validateManifest(input: unknown): Manifest {
  assert(input && typeof input === 'object', 'Manifest must be an object')
  const m = input as Manifest
  assert.equal(m.formatVersion, 1)
  assert.equal(m.packageKey, 'dev-studio-catalog-2026')
  assert.equal(m.source.pages, 21)
  // The raw source directory is intentionally local-only and may be absent in
  // a deployed container. The committed package is authoritative at runtime;
  // if the raw source is present locally, verify it as an optional provenance
  // check without making imports depend on it.
  assert(!path.isAbsolute(m.source.file), 'Source provenance path must be relative')
  const optionalSource = path.resolve(ROOT, m.source.file)
  const sourceRelative = path.relative(ROOT, optionalSource)
  assert(sourceRelative && sourceRelative !== '..' && !sourceRelative.startsWith(`..${path.sep}`) && !path.isAbsolute(sourceRelative), 'Source provenance path escapes repository')
  if (existsSync(optionalSource)) {
    const source = assertFile(ROOT, m.source.file, m.source.sha256)
    assert.equal(source.subarray(0,5).toString(), '%PDF-')
  }
  assert.deepEqual(m.projects, [], 'Project candidates are review-only')
  assert.deepEqual(m.stories, [], 'Stories are not in this import')
  assert.deepEqual(m.clients, [], 'Clients are not in this import')
  assert.equal(m.solutions.length, 13)
  assert.equal(new Set(m.solutions.map(s => s.key)).size, 13, 'Duplicate Solution key')
  const solutionKeys = new Set(Object.keys(EXPECTED_GROUPS))
  const assets = new Map<string, Asset>()
  const enabledFilenames = new Set<string>()
  for (const a of m.assets) {
    assert(!assets.has(a.id), `Duplicate asset ${a.id}`)
    assets.set(a.id, a)
    assert(Number.isInteger(a.sourcePage) && a.sourcePage >= 1 && a.sourcePage <= 21)
    assert(CLASSES.includes(a.classification), `Unknown classification ${a.id}`)
    assert(typeof a.safeAsRealization === 'boolean' && typeof a.importEnabled === 'boolean')
    assert.equal(typeof a.conceptual, 'boolean', `Missing conceptual flag ${a.id}`)
    assert(a.width > 0 && a.height > 0)
    assertFile(PACKAGE, a.file, a.sha256)
    if (a.relatedSolution) assert(solutionKeys.has(a.relatedSolution), `Unknown asset Solution ${a.id}`)
    if (a.importFile) assertFile(PACKAGE, a.importFile, a.sha256)
    if (a.importEnabled) {
      assert(!a.duplicateOf && a.useful, `Excluded/duplicate enabled asset ${a.id}`)
      assert(['real_photo','real_product','product_render','ai_concept','diagram'].includes(a.classification), `Unsuitable website media: ${a.id}`)
      assert(a.importFile, `Missing upload path ${a.id}`)
      assert.match(a.proposedCleanFilename, /^[a-z0-9-]+\.(jpg|jpeg|png|webp|avif)$/)
      assert(a.proposedCleanFilename.includes(a.sha256.slice(0,12)), 'Upload filenames must include source fingerprint')
      assert(!enabledFilenames.has(a.proposedCleanFilename), 'Duplicate upload filename')
      enabledFilenames.add(a.proposedCleanFilename)
      for (const locale of LOCALES) { text(a.alt[locale], 'alt'); text(a.caption[locale], 'caption') }
    }
    if (a.classification === 'ai_concept' || ['p12-02','p12-05'].includes(a.id)) assert(a.conceptual, `Concept flag removed: ${a.id}`)
    if (a.safeAsRealization) assert(['real_photo','real_product'].includes(a.classification), `Visualization cannot be real work: ${a.id}`)
    if (a.conceptual) {
      assert(!a.safeAsRealization, `Concept cannot be real work: ${a.id}`)
      for (const locale of LOCALES) {
        const marker = locale === 'bhs' ? 'Konceptualni vizual' : 'Conceptual visualization'
        text(a.disclosure?.[locale], 'concept disclosure')
        assert(a.disclosure![locale].includes(marker), `Concept must be explicitly labelled: ${a.id}/${locale}`)
        if (a.importEnabled) {
          assert(a.alt[locale].includes(marker), `Missing conceptual alt ${a.id}/${locale}`)
          assert(a.caption[locale].includes(a.disclosure![locale]), `Missing conceptual caption ${a.id}/${locale}`)
        }
      }
    }
    if (a.importEnabled && (['product_render','diagram'].includes(a.classification) || !a.safeAsRealization)) {
      for (const locale of LOCALES) {
        text(a.disclosure?.[locale], 'visualization/product provenance disclosure')
        assert(a.caption[locale].includes(a.disclosure![locale]), `Missing provenance caption ${a.id}/${locale}`)
      }
    }
    if ([7,8,11,15,16].includes(a.sourcePage) && a.useful) assert.equal(a.classification, 'ai_concept', `Explicit AI page misclassified: ${a.id}`)
    if (['p05-01','p05-02','p05-04','p18-01'].includes(a.id)) assert.equal(a.classification, 'ai_concept', `Inferred concept needs provenance review before reclassification: ${a.id}`)
  }
  const downloads = new Set(m.downloads.map(d => d.key))
  assert.equal(downloads.size, m.downloads.length)
  const slugs = { bhs: new Set<string>(), en: new Set<string>() }
  const usedMedia = new Set<string>()
  for (const s of m.solutions) {
    assert(solutionKeys.has(s.key), `Unknown Solution ${s.key}`)
    assert.equal(s.solutionGroup, EXPECTED_GROUPS[s.key as keyof typeof EXPECTED_GROUPS], `Grouping changed: ${s.key}`)
    assert.equal(s.status, 'draft')
    assert(s.sourcePages.length > 0 && s.sourcePages.every(p => Number.isInteger(p) && p >= 1 && p <= 21))
    for (const locale of LOCALES) {
      const data = s.locales[locale]
      for (const field of ['title','shortDescription','body'] as const) text(data[field], `${s.key} ${locale} ${field}`)
      assert.match(data.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      assert(!slugs[locale].has(data.slug), `Duplicate ${locale} slug`); slugs[locale].add(data.slug)
      assert.equal(data.content.root.type, 'root')
      assert(data.content.root.children.length > 0, 'Empty content')
      const contentBlocks = data.content.root.children.map(node => {
        assert(node.type === 'paragraph' || node.type === 'heading')
        const children = node.children as { text: string; type: string }[]
        assert(children.length > 0 && children.every(n => n.type === 'text' && typeof n.text === 'string'))
        const value = children.map(n => n.text).join('')
        if (node.type === 'heading') assert(!value.includes('\n') && node.tag === 'h2', 'Heading must not swallow paragraph text')
        return { type: node.type, text: value }
      })
      const expectedBlocks = data.body.split('\n\n').flatMap(block => block.startsWith('## ') ? [block.slice(0, block.indexOf('\n') < 0 ? undefined : block.indexOf('\n')), ...(block.includes('\n') ? [block.slice(block.indexOf('\n')+1)] : [])] : [block])
        .filter(block => block.trim()).map(block => ({type:block.startsWith('## ') ? 'heading' : 'paragraph', text:block.replace(/^## /,'')}))
      assert.deepEqual(contentBlocks, expectedBlocks, 'Review copy and rich text differ')
      if (s.key === 'smart-pos-shelf') {
        assert(!/\bbasic\b/i.test(JSON.stringify(data)), 'Obsolete Smart POS tier classification is forbidden')
        assert(!/^(?:##\s*)?(?:SMART|CUSTOM)\s*$/m.test(data.body), 'Obsolete Smart POS tier heading is forbidden')
      }
    }
    for (const id of [s.recommendedHeroMedia, ...s.recommendedGalleryMedia]) if (id) assert(assets.has(id), `Broken recommended media ${id}`)
    for (const id of [s.recommendedHeroMedia, s.importHeroMedia]) if (id) assert(!assets.get(id)?.conceptual, `Concepts are gallery-only, never Hero Media: ${id}`)
    const selected = [s.importHeroMedia, ...s.importGalleryMedia].filter((id): id is string => Boolean(id))
    assert.equal(new Set(selected).size, selected.length, `Duplicate media within ${s.key}`)
    for (const id of selected) { assert(assets.get(id)?.importEnabled, `Unapproved media reference ${id}`); usedMedia.add(id) }
    for (const key of s.downloads) assert(downloads.has(key), `Unknown Download ${key}`)
  }
  for (const a of m.assets.filter(a => a.importEnabled)) assert(usedMedia.has(a.id), `Orphan upload is not used by any Solution: ${a.id}`)
  assert.deepEqual(m.mediaCoverage, m.solutions.map(s => ({solution:s.key,hero:s.importHeroMedia,gallery:s.importGalleryMedia,mediaCount:Number(Boolean(s.importHeroMedia))+s.importGalleryMedia.length})), 'Media coverage report differs from executable plan')
  assert.equal(m.downloads.length, 1, 'Only the supplied BHS catalog is available')
  for (const d of m.downloads) {
    assert.equal(d.language, 'bhs'); assert.equal(d.category, 'catalog'); assert.equal(d.year, 2026)
    assert.equal(d.sha256, m.source.sha256)
    assertFile(PACKAGE, d.file, d.sha256)
    assert.match(d.filename, /^[a-z0-9-]+\.pdf$/)
    assert.equal(d.thumbnail, null); assert.equal(d.relatedSolution, null)
    for (const locale of LOCALES) text(d.locales[locale].title, 'download title')
    assert.deepEqual([...d.relatedSolutions].sort(), [...solutionKeys].sort())
  }
  for (const p of m.projectCandidates) {
    assert(['high','medium','low'].includes(p.confidence))
    for (const id of p.images) assert(assets.has(id) && !assets.get(id)!.conceptual && !['ai_concept','product_render','diagram'].includes(assets.get(id)!.classification), 'Concepts must never become project candidates')
  }
  const schema = JSON.parse(readFileSync(path.join(PACKAGE, 'manifest/cms-schema.json'), 'utf8')) as { sourceFiles: { file: string; sha256: string }[] }
  for (const s of schema.sourceFiles) assertFile(ROOT, s.file, s.sha256)
  return m
}

export function parseArgs(args: string[]) {
  for (const arg of args) assert(arg === '--dry-run' || arg === '--write' || arg.startsWith('--reviewed-manifest=') || arg.startsWith('--database-target='), `Unknown argument: ${arg}`)
  assert(!(args.includes('--write') && args.includes('--dry-run')), 'Conflicting modes')
  return { write: args.includes('--write'), reviewed: args.find(a => a.startsWith('--reviewed-manifest='))?.split('=')[1],
    target: args.find(a => a.startsWith('--database-target='))?.slice('--database-target='.length) }
}

export function guardWrite(options: ReturnType<typeof parseArgs>, manifestHash: string, env: NodeJS.ProcessEnv) {
  assert(options.write, 'Write flag required')
  assert.equal(options.reviewed, manifestHash, 'Review the manifest, then supply its exact SHA-256 in --reviewed-manifest=')
  assert.equal(env.NODE_ENV, 'production', 'NODE_ENV=production is required to disable development schema push')
  assert.notEqual(env.PAYLOAD_DROP_DATABASE, 'true', 'Destructive PAYLOAD_DROP_DATABASE environment is forbidden')
  assert(env.PAYLOAD_SECRET && !env.PAYLOAD_SECRET.startsWith('REPLACE_WITH_'), 'Existing Payload credentials required')
  assert(env.DATABASE_URL, 'DATABASE_URL required')
  const url = new URL(env.DATABASE_URL)
  assert(['postgres:', 'postgresql:'].includes(url.protocol))
  assert.equal(options.target, `${url.hostname}:${url.port || '5432'}${url.pathname}`, 'Database target must explicitly match configured host:port/database')
}

function comparable(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(comparable)
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).filter(([k]) => k !== 'id').sort(([a],[b])=>a.localeCompare(b)).map(([k,v]) => [k,comparable(v)]))
  return value
}
function equalSubset(existing: object, desired: object) {
  return Object.entries(desired).every(([k,v]) => JSON.stringify(comparable((existing as Record<string, unknown>)[k])) === JSON.stringify(comparable(v)))
}

async function one<T>(find: () => Promise<{ docs: T[]; totalDocs: number }>, label: string): Promise<T | undefined> {
  const found = await find()
  assert(found.totalDocs <= 1, `Ambiguous lookup: ${label}; refusing duplicates`)
  return found.docs[0]
}

/** Exported for an in-memory Local API test. Does not initialize a database. */
export async function importRecords(payload: Payload, m: Manifest, storageRoot = path.join(ROOT, 'media')) {
  const mediaIds = new Map<string, number>()
  const solutionIds = new Map<string, number>()
  const downloadIds = new Map<string, number>()
  // Resolve ALL Solution collisions before uploading anything. Published content
  // is immutable to this importer, including a published version behind a draft.
  const existingSolutions = new Map<string, Solution>()
  for (const s of m.solutions) {
    const found = await Promise.all(LOCALES.map(locale => one(() => payload.find({ collection: 'solutions', locale, fallbackLocale: false,
      where: { slug: { equals: s.locales[locale].slug } }, limit: 2, depth: 0, draft: true }), `${s.key}/${locale}`)))
    if (found[0] && found[1]) assert.equal(found[0].id, found[1].id, `Localized slug collision: ${s.key}`)
    const existing = found[0] || found[1]
    if (existing) {
      assert.equal(existing._status, 'draft', `Refusing to modify published Solution ${s.key}`)
      const live = await payload.find({ collection: 'solutions', where: { and: [{ id: { equals: existing.id } }, { _status: { equals: 'published' } }] }, limit: 1, depth: 0, draft: false })
      assert.equal(live.totalDocs, 0, `Solution ${s.key} has published content; manual merge required`)
      existingSolutions.set(s.key, existing)
    }
  }
  const existingMedia = new Map<string, Media | undefined>()
  const existingDownloads = new Map<string, Download | undefined>()
  // Check every upload collision before the first mutation, not halfway through.
  for (const a of m.assets.filter(a => a.importEnabled)) {
    const doc = await one<Media>(() => payload.find({collection:'media',where:{filename:{equals:a.proposedCleanFilename}},limit:2,depth:0,locale:'bhs',fallbackLocale:false}),a.id)
    const data = assertFile(PACKAGE,a.importFile!,a.sha256)
    const stored = path.join(storageRoot,'assets',a.proposedCleanFilename)
    if (doc) assert.equal(doc.filesize,data.length,`Media collision: ${a.id}`)
    if (doc || existsSync(stored)) assert(existsSync(stored) && hash(readFileSync(stored))===a.sha256,`Stored media differs or is unavailable: ${a.id}`)
    existingMedia.set(a.id,doc)
  }
  for (const d of m.downloads) {
    const doc = await one<Download>(() => payload.find({collection:'downloads',where:{filename:{equals:d.filename}},limit:2,depth:0,locale:'bhs',fallbackLocale:false}),d.key)
    const data = assertFile(PACKAGE,d.file,d.sha256)
    const stored = path.join(storageRoot,'downloads',d.filename)
    if (doc) { assert.equal(doc.filesize,data.length,'Catalog collision'); assert.equal(doc.language,d.language,'Catalog language collision') }
    if (doc || existsSync(stored)) assert(existsSync(stored) && hash(readFileSync(stored))===d.sha256,'Stored catalog differs or is unavailable')
    existingDownloads.set(d.key,doc)
  }
  // Public asset collections have no drafts. Enabled solution illustrations
  // include disclosed concepts; uploading never establishes completed work.
  for (const a of m.assets.filter(x => x.importEnabled)) {
    let doc = existingMedia.get(a.id)
    const file = assertFile(PACKAGE, a.importFile!, a.sha256)
    if (doc) assert.equal(doc.filesize, file.length, `Upload collision: ${a.id}`)
    if (!doc) {
      // A failed upload may leave a file with no DB row. Reuse only byte-identical
      // orphans; never overwrite unrelated media or silently accept renamed files.
      const local = path.join(storageRoot, 'assets', a.proposedCleanFilename)
      if (existsSync(local)) assert.equal(hash(readFileSync(local)), a.sha256, `Existing file collision ${a.id}`)
      doc = await payload.create({ collection:'media', locale:'bhs', data:{alt:a.alt.bhs, caption:a.caption.bhs},
        file:{ data:file, name:a.proposedCleanFilename, size:file.length, mimetype:a.proposedCleanFilename.endsWith('.png')?'image/png':'image/jpeg' }, overwriteExistingFiles:true })
      assert.equal(doc.filename, a.proposedCleanFilename, 'Unexpected upload rename; stop and reconcile')
      console.log(`CREATE media ${a.id} -> ${doc.id}`)
    }
    for (const locale of LOCALES) {
      const current = await payload.findByID({collection:'media', id:doc.id, locale, fallbackLocale:false, depth:0})
      const data = {alt:a.alt[locale], caption:a.caption[locale]}
      if (!equalSubset(current,data)) await payload.update({collection:'media', id:doc.id, locale, data})
    }
    mediaIds.set(a.id,doc.id)
  }
  // Create both locales first; relationships follow once all IDs exist.
  for (const s of m.solutions) {
    let doc = existingSolutions.get(s.key)
    for (const locale of LOCALES) {
      const c = s.locales[locale]
      const data = {title:c.title, slug:c.slug, shortDescription:c.shortDescription, content:c.content, solutionGroup:s.solutionGroup, _status:'draft' as const}
      if (!doc) { doc = await payload.create({collection:'solutions', locale, draft:true, data}); console.log(`CREATE solution ${s.key} -> ${doc.id}`) }
      else {
        const current = await payload.findByID({collection:'solutions',id:doc.id,locale,fallbackLocale:false,depth:0,draft:true})
        assert.equal(current._status,'draft',`Solution published during import: ${s.key}`)
        if (!equalSubset(current,data)) { await payload.update({collection:'solutions',id:doc.id,locale,draft:true,data}); console.log(`UPDATE solution ${s.key}/${locale}`) }
      }
    }
    solutionIds.set(s.key,doc!.id)
  }
  for (const d of m.downloads) {
    let doc = existingDownloads.get(d.key)
    const file = assertFile(PACKAGE,d.file,d.sha256)
    if (doc) {
      assert.equal(doc.filesize,file.length,'Catalog filename collision')
      assert.equal(doc.language,d.language,'Catalog language collision')
      const stored = path.join(storageRoot,'downloads',d.filename)
      assert(existsSync(stored) && hash(readFileSync(stored)) === d.sha256,'Existing catalog differs or local original unavailable; manual reconciliation required')
    }
    if (!doc) {
      const local = path.join(storageRoot,'downloads',d.filename)
      if (existsSync(local)) assert.equal(hash(readFileSync(local)),d.sha256,'Catalog file collision')
      doc = await payload.create({collection:'downloads',locale:'bhs',data:{title:d.locales.bhs.title,category:d.category,language:d.language,year:d.year,featured:false},
        file:{data:file,name:d.filename,size:file.length,mimetype:'application/pdf'},overwriteExistingFiles:true})
      assert.equal(doc.filename,d.filename,'Unexpected catalog rename; stop and reconcile')
      console.log(`CREATE download ${d.key} -> ${doc.id}`)
    }
    for (const locale of LOCALES) {
      const current = await payload.findByID({collection:'downloads',id:doc.id,locale,fallbackLocale:false,depth:0})
      const data = {title:d.locales[locale].title,category:d.category,language:d.language,year:d.year}
      if (!equalSubset(current,data)) await payload.update({collection:'downloads',id:doc.id,locale,data})
    }
    downloadIds.set(d.key,doc.id)
  }
  for (const s of m.solutions) {
    const id = solutionIds.get(s.key)!
    for (const locale of LOCALES) {
      const current = await payload.findByID({collection:'solutions',id,locale,fallbackLocale:false,depth:0,draft:true})
      assert.equal(current._status,'draft',`Solution published during import: ${s.key}`)
      // Merge relationships instead of clearing manually entered galleries/downloads.
      const downloads = [...new Set([...(current.downloads || []).map(x => typeof x === 'object' ? x.id : x), ...s.downloads.map(k=>downloadIds.get(k)!)])]
      const gallery = (current.gallery || []).map(row => ({ ...row }))
      for (const assetId of s.importGalleryMedia) {
        const mediaId = mediaIds.get(assetId)!
        if (!gallery.some(row => (typeof row.image === 'object' ? row.image.id : row.image) === mediaId)) {
          const a = m.assets.find(a=>a.id===assetId)!
          gallery.push({image:mediaId,caption:a.caption[locale]})
        } else {
          // Preserve human wording while guaranteeing visible disclosure, even
          // when a manually entered caption would override the Media caption.
          const a = m.assets.find(a=>a.id===assetId)!
          for (const row of gallery) if ((typeof row.image === 'object'?row.image.id:row.image)===mediaId) {
            if (!row.caption) row.caption = a.caption[locale]
            else if (a.disclosure && !row.caption.includes(a.disclosure[locale])) row.caption += ` ${a.disclosure[locale]}`
          }
        }
      }
      const data = {downloads,gallery,...(!current.heroMedia && s.importHeroMedia ? {heroMedia:mediaIds.get(s.importHeroMedia)!}:{}),_status:'draft' as const}
      if (!equalSubset(current,data)) { await payload.update({collection:'solutions',id,locale,draft:true,data}); console.log(`RELATE ${s.key}/${locale}`) }
    }
  }
  console.log('Completed draft Solutions, Media and BHS Download. No Projects, Stories, Clients or globals changed.')
}

export async function main(args = process.argv.slice(2)) {
  const options = parseArgs(args)
  const bytes = readFileSync(path.join(PACKAGE,'manifest/catalog-content.json'))
  const m = validateManifest(JSON.parse(bytes.toString('utf8')))
  const fingerprint = hash(bytes)
  console.log(`VALID manifest ${fingerprint}`)
  if (existsSync(path.resolve(ROOT, m.source.file))) console.log(`SOURCE PROVENANCE: local original verified at ${m.source.file}`)
  else console.log(`SOURCE PROVENANCE: original ${m.source.file} unavailable; using committed content-import package assets.`)
  console.log(`PLAN: ${m.solutions.length} draft Solutions (BHS + EN); ${m.assets.filter(a=>a.importEnabled).length} Media uploads; ${m.downloads.length} BHS Download; ${m.projectCandidates.length} review-only Project candidates.`)
  for (const s of m.solutions) console.log(`SOLUTION ${s.key} [${s.solutionGroup}] /solutions/${s.locales.bhs.slug} <-> /en/solutions/${s.locales.en.slug}; hero=${s.importHeroMedia || 'none: suitable non-concept image unavailable'}; gallery=${s.importGalleryMedia.length}; total=${Number(Boolean(s.importHeroMedia))+s.importGalleryMedia.length}`)
  if (!options.write) { console.log('DRY RUN: local validation only. Payload config not loaded. No database connection or writes.'); return }
  guardWrite(options,fingerprint,process.env)
  // All dry-run work and write guards precede these dynamic imports.
  const {getPayload} = await import('payload')
  const {default:configPromise} = await import(pathToFileURL(path.join(ROOT,'src/payload.config.ts')).href)
  const config: SanitizedConfig = await configPromise
  const initAdapter = config.db.init
  config.db = {...config.db,init: args => {
    const adapter = initAdapter(args) as PostgresAdapter
    assert.equal(adapter.name,'postgres','Unexpected database adapter')
    adapter.disableCreateDatabase = true
    adapter.push = false
    assert(!adapter.prodMigrations?.length,'Importer never runs migrations')
    assert.equal(Object.keys(adapter.extensions).length,0,'Importer never installs database extensions')
    return adapter
  }}
  const payload = await getPayload({config,disableOnInit:true})
  try {
    const connection = await payload.db.pool.connect()
    try {
      const result = await connection.query('SELECT pg_try_advisory_lock(1684371061, 2026) AS locked')
      assert.equal(result.rows[0].locked,true,'Another catalog import is running; try later')
      try { await importRecords(payload,m) }
      finally { await connection.query('SELECT pg_advisory_unlock(1684371061, 2026)') }
    } finally { connection.release() }
  } finally { await payload.destroy() }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error('IMPORT ABORTED:', error instanceof Error ? error.message : 'Unknown error'); process.exitCode=1 })
}
