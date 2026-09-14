import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const recipient = 'info@devstudio.biz'
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const fields = ['name', 'company', 'email', 'phone', 'projectType', 'message', 'budget', 'targetDate'] as const

type ContactSubmission = Record<(typeof fields)[number], string>

function readSubmission(value: unknown): ContactSubmission | null {
  if (!value || typeof value !== 'object') return null
  const data = value as Record<string, unknown>
  const submission = Object.fromEntries(fields.map(field => [field, typeof data[field] === 'string' ? data[field].trim() : ''])) as ContactSubmission
  return submission.name && submission.company && submission.email && submission.projectType && submission.message && emailPattern.test(submission.email) ? submission : null
}

function smtpConfig() {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM_EMAIL
  if (!host || !port || !user || !pass || !from || !/^\d{1,5}$/.test(port)) return null
  const portNumber = Number(port)
  if (portNumber < 1 || portNumber > 65535) return null
  return { host, port: portNumber, secure: process.env.SMTP_SECURE === 'true', auth: { user, pass }, from }
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const submission = readSubmission(body)
  if (!submission) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })

  const config = smtpConfig()
  if (!config) {
    console.error('[contact] SMTP is not configured.')
    return NextResponse.json({ error: 'Unable to send message.' }, { status: 500 })
  }

  try {
    const transporter = nodemailer.createTransport({ host: config.host, port: config.port, secure: config.secure, auth: config.auth })
    const subjectName = (submission.company || submission.name).replace(/[\r\n]+/g, ' ')
    await transporter.sendMail({
      from: config.from, to: recipient, replyTo: submission.email,
      subject: `Novi projektni upit — ${subjectName}`,
      text: [
        `Name: ${submission.name}`,
        `Company: ${submission.company}`,
        `Email: ${submission.email}`,
        `Phone: ${submission.phone || '—'}`,
        `Project type: ${submission.projectType}`,
        `Message: ${submission.message}`,
        `Approximate budget: ${submission.budget || '—'}`,
        `Target date: ${submission.targetDate || '—'}`,
      ].join('\n'),
    })
    return NextResponse.json({ ok: true })
  } catch {
    console.error('[contact] SMTP delivery failed.')
    return NextResponse.json({ error: 'Unable to send message.' }, { status: 500 })
  }
}
