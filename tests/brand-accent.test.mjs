import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const frontend = new URL('../src/app/(frontend)/', import.meta.url)
const globals = readFileSync(new URL('globals.css', frontend), 'utf8')
const content = readFileSync(new URL('content.css', frontend), 'utf8')

test('public frontend uses the official Dev Studio yellow token', () => {
  assert.match(globals, /--yellow:\s*#ffcc00\b/i)
  for (const legacyYellow of ['#eafa35', '#f1ff77', '#e9ed47', '#b2ba5a', '#f0ff9a', '#cddd45']) {
    assert.doesNotMatch(`${globals}\n${content}`, new RegExp(legacyYellow, 'i'))
  }
  assert.match(content, /\.gallery-open:focus-visible \{ outline: 2px solid var\(--ink\).*box-shadow: 0 0 0 4px var\(--yellow\)/)
})
