'use client'

import { useState, type FormEvent } from 'react'
import type { Locale } from '@/lib/i18n'

const options = {
  en: ['Retail solution', 'Interactive device', 'Brand activation', 'Custom product', 'Software + hardware', 'Manufacturing', 'Something else'],
  bhs: ['Maloprodajno rješenje', 'Interaktivni uređaj', 'Aktivacija brenda', 'Proizvod po mjeri', 'Softver + hardver', 'Proizvodnja', 'Nešto drugo'],
} as const

export function ProjectInquiryForm({ locale }: { locale: Locale }) {
  const bhs = locale === 'bhs'
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending' || status === 'success') return
    const values = new FormData(event.currentTarget)
    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.get('name'), company: values.get('company'), email: values.get('email'), phone: values.get('phone'),
          projectType: values.get('projectType'), message: values.get('message'), budget: values.get('budget'), targetDate: values.get('targetDate'),
        }),
      })
      if (!response.ok) throw new Error('Contact request failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }
  return <form className="project-form" onSubmit={submit}>
    <div className="form-grid"><label><span>{bhs ? 'Ime i prezime' : 'Name'} *</span><input name="name" required autoComplete="name" /></label><label><span>{bhs ? 'Kompanija' : 'Company'} *</span><input name="company" required autoComplete="organization" /></label><label><span>Email *</span><input type="email" name="email" required autoComplete="email" /></label><label><span>{bhs ? 'Telefon (opcionalno)' : 'Phone (optional)'}</span><input type="tel" name="phone" autoComplete="tel" /></label></div>
    <fieldset><legend>{bhs ? 'Šta želite izgraditi?' : 'What do you want to build?'} *</legend><div className="form-options">{options[locale].map(option => <label key={option}><input type="radio" name="projectType" value={option} required /><span>{option}</span></label>)}</div></fieldset>
    <label><span>{bhs ? 'Recite nam nešto o ideji / projektu' : 'Tell us about the idea / project'} *</span><textarea name="message" rows={7} required /></label>
    <div className="form-grid"><label><span>{bhs ? 'Približan budžet (opcionalno)' : 'Approximate budget (optional)'}</span><input name="budget" /></label><label><span>{bhs ? 'Ciljni datum (opcionalno)' : 'Target date (optional)'}</span><input name="targetDate" type="date" /></label></div>
    <label className="file-field"><span>{bhs ? 'Priložite brief / reference (opcionalno)' : 'Attach project brief / references (optional)'}</span><input type="file" name="attachment" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" /><small>{bhs ? 'Slanje datoteke biće povezano u narednoj fazi.' : 'File handling will be connected in a later phase.'}</small></label>
    <div className="form-submit"><button className="button button-dark" type="submit" disabled={status === 'sending' || status === 'success'}>{status === 'sending' ? (bhs ? 'Slanje...' : 'Sending...') : (bhs ? 'Pošalji projektni upit' : 'Submit project enquiry')} <span aria-hidden="true">↗</span></button>{status === 'success' && <p className="form-status" role="status">{bhs ? 'Hvala. Vaš upit je uspješno poslat. Javićemo vam se uskoro.' : 'Thank you. Your enquiry has been sent successfully. We’ll get back to you soon.'}</p>}{status === 'error' && <p className="form-status" role="alert">{bhs ? 'Došlo je do greške pri slanju. Pokušajte ponovo ili nam pišite na info@devstudio.biz.' : 'There was a problem sending your enquiry. Please try again or email us at info@devstudio.biz.'}</p>}</div>
  </form>
}
