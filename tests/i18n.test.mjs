import assert from 'node:assert/strict'
import { test } from 'node:test'
import { htmlLanguages, languageAlternates, localeFromPath, localizedHref } from '../src/lib/i18n.ts'

test('homepages and future nested routes round-trip without duplicate prefixes', () => {
  for (const path of ['/', '/projects', '/projects/example', '/solutions', '/stories/example', '/resources']) {
    const english = path === '/' ? '/en' : `/en${path}`
    assert.equal(localizedHref(path, 'en'), english)
    assert.equal(localizedHref(english, 'bhs'), path)
    assert.equal(localizedHref(english, 'en'), english)
    assert.equal(localeFromPath(path), 'bhs')
    assert.equal(localeFromPath(english), 'en')
  }
})

test('locale recognition uses a complete path segment', () => {
  for (const path of ['/english', '/engineering', '/projects/en', '/?locale=en', '/?path=/en']) {
    assert.equal(localeFromPath(path), 'bhs')
  }
  assert.equal(localeFromPath('/en?locale=bhs'), 'en')
  assert.equal(localizedHref('/engineering', 'en'), '/en/engineering')
  assert.equal(localizedHref('/en/', 'bhs'), '/')
})

test('switches preserve query parameters, encoded slugs and anchors', () => {
  assert.equal(localizedHref('/projects/proizvod%20A?source=nav#gallery', 'en'), '/en/projects/proizvod%20A?source=nav#gallery')
  assert.equal(localizedHref('/en?source=nav#projects', 'bhs'), '/?source=nav#projects')
  assert.equal(localizedHref('/#projects', 'en'), '/en#projects')
})

test('Payload, assets, external links and same-page anchors are not prefixed', () => {
  for (const href of ['/admin', '/admin/login?redirect=/', '/api/projects', '/_next/static/main.js', '/media/assets/image.jpg', '/catalog.pdf', 'https://devstudio.biz', '//example.com/path', 'mailto:hello@example.com', 'tel:+387123', '#main']) {
    assert.equal(localizedHref(href, 'en'), href)
    assert.equal(localizedHref(href, 'bhs'), href)
  }
})

test('SEO uses valid language tags and supports future translated slugs', () => {
  assert.deepEqual(htmlLanguages, { bhs: 'bs', en: 'en' })
  assert.deepEqual(languageAlternates('/'), { bs: '/', en: '/en', 'x-default': '/' })
  assert.deepEqual(languageAlternates('/projects/primjer', { en: '/projects/example' }), {
    bs: '/projects/primjer', en: '/en/projects/example', 'x-default': '/projects/primjer',
  })
})
