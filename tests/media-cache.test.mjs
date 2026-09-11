import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mkdtemp, copyFile, rm, utimes, stat } from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { withMediaCache } from '../src/lib/media-cache.ts'
import { getFileHandler } from '../node_modules/payload/dist/uploads/endpoints/getFile.js'
import { mergeHeaders } from '../node_modules/payload/dist/utilities/mergeHeaders.js'

test('Payload originals revalidate, replacements invalidate, ranges and access remain intact', async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'devstudio-media-cache-'))
  try {
    const file = path.join(dir, 'sample.png')
    await copyFile(new URL('../public/home/devstudio-home-hero-process.png', import.meta.url), file)
    let allowed = true
    const collection = { slug: 'media', fields: [{ name: 'alt', type: 'text', localized: true }], access: { read: () => allowed }, upload: { staticDir: dir } }
    const config = withMediaCache(collection)
    assert.equal(config.fields, collection.fields)
    assert.equal(config.access, collection.access)
    assert.equal(config.upload.staticDir, dir)
    assert.equal(collection.upload.handlers, undefined)
    const request = async (headers = {}, filename = 'sample.png') => {
      const req = { method: 'GET', headers: new Headers(headers), searchParams: new URLSearchParams(), routeParams: { collection: 'media', filename }, t: key => key, payload: { config: {}, collections: { media: { config } }, logger: { error() {} } } }
      const res = await getFileHandler(req)
      return new Response(res.body, { status: res.status, headers: mergeHeaders(req.responseHeaders || new Headers(), res.headers) })
    }
    const first = await request()
    assert.equal(first.status, 200)
    assert.equal(first.headers.get('cache-control'), 'public, max-age=0, must-revalidate')
    const etag = first.headers.get('etag')
    const modified = first.headers.get('last-modified')
    assert.match(etag, /^W\/"[^",]+"$/)
    assert.ok(modified)
    assert.equal((await first.arrayBuffer()).byteLength, Number(first.headers.get('content-length')))
    for (const headers of [{ 'If-None-Match': etag }, { 'If-None-Match': `"other", ${etag}` }, { 'If-None-Match': etag.slice(2) }, { 'If-Modified-Since': modified }]) {
      const res = await request(headers)
      assert.equal(res.status, 304)
      assert.equal((await res.arrayBuffer()).byteLength, 0)
      assert.equal(res.headers.get('etag'), etag) // No duplicated validator headers.
    }
    const mismatch = await request({ 'If-None-Match': '"different"', 'If-Modified-Since': modified })
    assert.equal(mismatch.status, 200)
    await mismatch.arrayBuffer()
    const before = await stat(file)
    await utimes(file, before.atime, new Date(before.mtimeMs + 2000))
    const replaced = await request({ 'If-None-Match': etag })
    assert.equal(replaced.status, 200)
    assert.notEqual(replaced.headers.get('etag'), etag)
    await replaced.arrayBuffer()
    const range = await request({ Range: 'bytes=0-15', 'If-None-Match': etag })
    assert.equal(range.status, 206)
    assert.equal((await range.arrayBuffer()).byteLength, 16)
    assert.match(range.headers.get('content-range'), /^bytes 0-15\//)
    const missing = await request({}, 'missing.png')
    assert.equal(missing.status, 500) // Preserve Payload's missing-file behavior.
    assert.equal(missing.headers.get('etag'), null)
    await assert.rejects(request({}, '../sample.png'))
    allowed = false
    await assert.rejects(request({ 'If-None-Match': etag }))
  } finally { await rm(dir, { recursive: true, force: true }) }
})
