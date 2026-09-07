'use client'

import { useState, type FormEvent } from 'react'
import type { Locale } from '@/lib/i18n'

const options = {
  en: ['Retail solution', 'Interactive device', 'Brand activation', 'Custom product', 'Software + hardware', 'Manufacturing', 'Something else'],
  bhs: ['Maloprodajno rješenje', 'Interaktivni uređaj', 'Aktivacija brenda', 'Proizvod po mjeri', 'Softver + hardver', 'Proizvodnja', 'Nešto drugo'],
} as const

export function ProjectInquiryForm({ locale }: { locale: Locale }) {
  const bhs = locale === 'bhs'
  const [submitted, setSubmitted] = useState(false)
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }
  return <form className="project-form" onSubmit={submit}>
    <div className="form-grid"><label><span>{bhs ? 'Ime i prezime' : 'Name'} *</span><input name="name" required autoComplete="name" /></label><label><span>{bhs ? 'Kompanija' : 'Company'} *</span><input name="company" required autoComplete="organization" /></label><label><span>Email *</span><input type="email" name="email" required autoComplete="email" /></label><label><span>{bhs ? 'Telefon (opcionalno)' : 'Phone (optional)'}</span><input type="tel" name="phone" autoComplete="tel" /></label></div>
    <fieldset><legend>{bhs ? 'Šta želite izgraditi?' : 'What do you want to build?'} *</legend><div className="form-options">{options[locale].map(option => <label key={option}><input type="radio" name="projectType" value={option} required /><span>{option}</span></label>)}</div></fieldset>
    <label><span>{bhs ? 'Recite nam nešto o ideji / projektu' : 'Tell us about the idea / project'} *</span><textarea name="message" rows={7} required /></label>
    <div className="form-grid"><label><span>{bhs ? 'Približan budžet (opcionalno)' : 'Approximate budget (optional)'}</span><input name="budget" /></label><label><span>{bhs ? 'Ciljni datum (opcionalno)' : 'Target date (optional)'}</span><input name="targetDate" type="date" /></label></div>
    <label className="file-field"><span>{bhs ? 'Priložite brief / reference (opcionalno)' : 'Attach project brief / references (optional)'}</span><input type="file" name="attachment" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" /><small>{bhs ? 'Slanje datoteke biće povezano u narednoj fazi.' : 'File handling will be connected in a later phase.'}</small></label>
    <div className="form-submit"><button className="button button-dark" type="submit">{bhs ? 'Pošalji projektni upit' : 'Submit project enquiry'} <span aria-hidden="true">↗</span></button>{submitted && <p className="form-status" role="status">{bhs ? 'Upit je pripremljen, ali još nije poslat. Backend slanje biće povezano naknadno.' : 'Your enquiry is prepared, but has not been sent. Backend delivery will be connected later.'}</p>}</div>
  </form>
}
