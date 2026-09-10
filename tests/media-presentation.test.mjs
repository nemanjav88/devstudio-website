import assert from 'node:assert/strict'
import { test } from 'node:test'
import { solutionMediaPresentation } from '../src/lib/media-presentation.ts'

const image = (width, height, mimeType = 'image/jpeg') => ({ width, height, mimeType })

test('portrait and near-square Solutions media are contained in cards and heroes', () => {
  for (const context of ['solution-card', 'solution-hero']) {
    for (const media of [image(1213, 1296, 'image/png'), image(339, 638), image(900, 900), image(1200, 1000)]) {
      const result = solutionMediaPresentation(media, context)
      assert.equal(result.fit, 'contain')
      assert.equal(result.productLike, true)
      assert.equal(result.width, media.width)
      assert.equal(result.height, media.height)
    }
  }
})

test('wide photography keeps cover; small landscapes are bounded only in heroes', () => {
  for (const media of [image(1309, 927), image(1920, 1080), image(1000, 600)]) {
    for (const context of ['solution-card', 'solution-hero']) {
      const result = solutionMediaPresentation(media, context)
      assert.equal(result.fit, 'cover')
      assert.equal(result.productLike, false)
    }
  }
  assert.equal(solutionMediaPresentation(image(668, 477), 'solution-card').fit, 'cover')
  assert.equal(solutionMediaPresentation(image(668, 477), 'solution-hero').fit, 'contain')
})

test('missing or invalid dimensions and video use a safe contained fallback', () => {
  for (const context of ['solution-card', 'solution-hero']) {
    for (const media of [image(null, null), image(1200, undefined), image(0, 200), image(-30, 100), image(Infinity, 900), image(1200, NaN), image(1920, 1080, 'video/mp4')]) {
      const result = solutionMediaPresentation(media, context)
      assert.equal(result.fit, 'contain')
      assert.equal(result.productLike, false)
    }
  }
})
