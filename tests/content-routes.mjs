import assert from 'node:assert/strict'

const origin = process.argv[2] || 'http://127.0.0.1:3100'
const routes = [
  ['/', 'bs'], ['/en', 'en'],
  ['/projects', 'bs'], ['/projects/unknown', 'bs'], ['/solutions', 'bs'], ['/solutions/unknown', 'bs'], ['/stories', 'bs'], ['/stories/unknown', 'bs'], ['/resources', 'bs'],
  ['/capabilities', 'bs'], ['/about', 'bs'], ['/contact', 'bs'],
  ['/en/projects', 'en'], ['/en/projects/unknown', 'en'], ['/en/solutions', 'en'], ['/en/solutions/unknown', 'en'], ['/en/stories', 'en'], ['/en/stories/unknown', 'en'], ['/en/resources', 'en'],
  ['/en/capabilities', 'en'], ['/en/about', 'en'], ['/en/contact', 'en'],
]
for (const [path, language] of routes) {
  const response = await fetch(origin + path, { redirect: 'manual', headers: { 'Accept-Language': language === 'bs' ? 'en-US' : 'bs' } })
  const html = await response.text()
  // With the local smoke environment lacking a real database, detail pages render the
  // clean unavailable state. A configured Payload instance returns 404 for unknown slugs.
  assert.equal(response.status, 200, `${path} status`)
  assert.match(html, new RegExp(`<html lang="${language}"`), `${path} html language`)
  assert.match(html, /noindex, nofollow/, `${path} noindex`)
  assert.match(html, /class="language-switcher"/, `${path} switcher`)
  console.log(`PASS ${path} ${response.status}`)
}
