import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { registerHooks } from 'node:module'
import { test } from 'node:test'
import ts from 'typescript'

const root = new URL('../src/', import.meta.url)
let transportOptions
let sentMessage

const hooks = registerHooks({
  resolve(specifier, context, next) {
    if (specifier === 'nodemailer') return { url: 'test:nodemailer', shortCircuit: true }
    if (specifier === 'next/server') return { url: 'test:next-server', shortCircuit: true }
    const url = specifier.startsWith('@/') ? new URL(specifier.slice(2), root)
      : specifier.startsWith('.') && context.parentURL?.startsWith(root.href) ? new URL(specifier, context.parentURL) : null
    if (url) for (const suffix of ['', '.ts', '.tsx']) {
      const candidate = pathToFileURL(fileURLToPath(url) + suffix)
      if (existsSync(candidate)) return { url: candidate.href, shortCircuit: true }
    }
    return next(specifier, context)
  },
  load(url, context, next) {
    if (url === 'test:nodemailer') return { format: 'module', shortCircuit: true, source: 'export default { createTransport(options) { globalThis.__contactTransport = options; return { sendMail: async message => { globalThis.__contactMessage = message; if (globalThis.__contactFailure) throw new Error("SMTP failed") } } } }' }
    if (url === 'test:next-server') return { format: 'module', shortCircuit: true, source: 'export const NextResponse = { json: (body, init = {}) => ({ body, status: init.status || 200 }) }' }
    if (url.startsWith(root.href) && /\.tsx?$/.test(url)) return { format: 'module', shortCircuit: true, source: ts.transpileModule(readFileSync(new URL(url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText }
    return next(url, context)
  },
})

const { POST } = await import('../src/app/api/contact/route.ts')
const keys = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_SECURE', 'SMTP_FROM_EMAIL']
const previous = Object.fromEntries(keys.map(key => [key, process.env[key]]))

function configureSmtp() {
  process.env.SMTP_HOST = 'smtp.example.test'
  process.env.SMTP_PORT = '587'
  process.env.SMTP_USER = 'sender@example.test'
  process.env.SMTP_PASS = 'test-password'
  process.env.SMTP_SECURE = 'false'
  process.env.SMTP_FROM_EMAIL = 'sender@example.test'
}

const validSubmission = {
  name: 'Ada Lovelace', company: 'Analytical Engines', email: 'ada@example.test', phone: '+387 65 000 000',
  projectType: 'Custom product', message: 'A machine that can calculate.', budget: '10,000 EUR', targetDate: '2026-12-01',
}

test('contact endpoint rejects invalid requests before SMTP delivery', async () => {
  transportOptions = undefined
  const response = await POST({ json: async () => ({ ...validSubmission, email: 'not-an-email' }) })
  assert.equal(response.status, 400)
  assert.equal(transportOptions, undefined)
})

test('contact endpoint sends validated form fields only to the fixed recipient', async () => {
  configureSmtp()
  globalThis.__contactTransport = undefined
  globalThis.__contactMessage = undefined
  globalThis.__contactFailure = false
  const response = await POST({ json: async () => validSubmission })
  transportOptions = globalThis.__contactTransport
  sentMessage = globalThis.__contactMessage
  assert.equal(response.status, 200)
  assert.deepEqual(transportOptions, { host: 'smtp.example.test', port: 587, secure: false, auth: { user: 'sender@example.test', pass: 'test-password' } })
  assert.equal(sentMessage.from, 'sender@example.test')
  assert.equal(sentMessage.to, 'info@devstudio.biz')
  assert.equal(sentMessage.replyTo, validSubmission.email)
  for (const value of Object.values(validSubmission)) assert.match(sentMessage.text, new RegExp(value.replace(/[+]/g, '\\+')))
})

test('contact endpoint returns an error when SMTP delivery fails', async () => {
  configureSmtp()
  globalThis.__contactFailure = true
  const response = await POST({ json: async () => validSubmission })
  assert.equal(response.status, 500)
  globalThis.__contactFailure = false
})

test.after(() => {
  for (const key of keys) {
    if (previous[key] === undefined) delete process.env[key]
    else process.env[key] = previous[key]
  }
  hooks.deregister()
  delete globalThis.__contactTransport
  delete globalThis.__contactMessage
  delete globalThis.__contactFailure
})
