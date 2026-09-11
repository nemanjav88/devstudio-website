import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mediaImageSource, mediaImageSizes } from '../src/lib/media-delivery.ts'

const asset = { url: '/api/media/file/product.png', updatedAt: '2026-09-11T09:15:59.355Z', mimeType: 'image/png', width: 1448, height: 1086 }
test('local raster revisions produce stable optimizer keys, independent of locale', () => {
  const first = mediaImageSource(asset)
  assert.equal(first.unoptimized, false)
  assert.equal(first.src, '/api/media/file/product.png?v=1789118159355')
  assert.deepEqual(mediaImageSource({ ...asset, alt: 'Proizvod' }), first)
  assert.notEqual(mediaImageSource({ ...asset, updatedAt: '2026-09-11T09:16:00Z' }).src, first.src)
})
test('external, unversioned, animated and unsafe sources keep direct delivery', () => {
  for (const change of [{ url: 'https://example.com/image.png' }, { url: '//example.com/image.png' }, { url: '/api/media/file/product.png?token=abc' }, { url: '/home/image.png' }, { updatedAt: '' }, { updatedAt: undefined }, { width: null }, { height: -1 }, { mimeType: 'image/gif' }, { mimeType: 'image/svg+xml' }, { mimeType: 'video/mp4' }]) {
    const input = { ...asset, ...change }
    assert.deepEqual(mediaImageSource(input), { src: input.url, unoptimized: true })
  }
})
test('responsive source hints follow existing card and gallery breakpoints', () => {
  assert.equal(mediaImageSizes('solution-card'), '(max-width: 580px) 88vw, 28vw')
  assert.equal(mediaImageSizes('gallery-tile'), '(max-width: 580px) 88vw, (max-width: 1100px) 44vw, 29vw')
  assert.equal(mediaImageSizes('lightbox'), '94vw')
})
