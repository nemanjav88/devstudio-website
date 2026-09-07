import assert from 'node:assert/strict'

// Run against a local production server: node tests/http-smoke.mjs http://127.0.0.1:3100
const origin = process.argv[2] || 'http://127.0.0.1:3100'
for (const [path, language] of [['/', 'bs'], ['/en', 'en']]) {
  for (const acceptLanguage of ['en-US,en;q=0.9', 'bs,hr,sr;q=0.9', 'de-DE', '']) {
    const response = await fetch(`${origin}${path}?locale=${language === 'bs' ? 'en' : 'bhs'}`, {
      redirect: 'manual',
      headers: { 'Accept-Language': acceptLanguage },
    })
    assert.equal(response.status, 200, `${path}: unexpected response or redirect`)
    assert.equal(response.headers.get('location'), null)
    const html = await response.text()
    assert.match(html, new RegExp(`<html[^>]+lang="${language}"`))
    assert.match(html, /<meta name="robots" content="noindex, nofollow"/)
    for (const [tag, suffix] of [['bs', '/'], ['en', '/en'], ['x-default', '/']]) {
      const href = html.match(new RegExp(`<link rel="alternate" hrefLang="${tag}" href="([^"]+)"`, 'i'))?.[1]
      assert.ok(href, `Missing ${tag} alternate`)
      const alternate = new URL(href)
      assert.equal(alternate.pathname, suffix)
      assert.equal(alternate.search + alternate.hash, '')
    }
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1]
    assert.ok(canonical, 'Missing canonical')
    assert.equal(new URL(canonical).pathname, path)
    const navigation = html.match(/<nav\b[^>]*id="main-navigation"[\s\S]*?<\/nav>/)?.[0]
    assert.ok(navigation, 'Navigation must be server rendered')
    assert.match(navigation, /class="language-switcher"/)
    assert.match(navigation, /href="\/en"/)
    assert.match(navigation, /href="\/"/)
    const activeLanguageLink = navigation.match(/<a\b[^>]*aria-current="true"[^>]*>(BHS|EN)<\/a>/)?.[1]
    assert.equal(activeLanguageLink, language === 'bs' ? 'BHS' : 'EN')
    for (const anchor of ['solutions', 'projects', 'process', 'about', 'stories']) {
      assert.ok(navigation.includes(`href="${path === '/' ? '/' : '/en'}#${anchor}"`))
    }
    assert.ok(!html.includes('Set DATABASE_URL'), 'Missing CMS configuration must fall back safely')
    console.log(`PASS ${path} (${language}), Accept-Language: ${acceptLanguage || '(empty)'}`)
  }
}
