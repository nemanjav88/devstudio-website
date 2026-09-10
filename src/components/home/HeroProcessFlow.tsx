'use client'

import { useId, useState } from 'react'
import Image from 'next/image'
import type { Locale } from '@/lib/i18n'
import { homeText } from '@/lib/home-copy'
import './hero-process-flow.css'

const steps = [
  ['Idea', 'We define the concept and product goal.'],
  ['Design', 'We shape form, function and experience.'],
  ['Mechanics', 'We develop structure and components.'],
  ['Electronics', 'We integrate PCB, sensors and control.'],
  ['Software', 'We build interaction, logic and content.'],
  ['Production', 'We manufacture, assemble and deliver.'],
] as const

export function HeroProcessFlow({ locale }: { locale: Locale }) {
  const [activeStep, setActiveStep] = useState(0)
  const id = useId()
  const t = (text: string) => homeText(locale, text)

  return <div className="hero-process-media">
    <Image
      className="hero-process-image"
      src="/home/devstudio-home-hero-process.png"
      alt={t('Product development workshop with design drawings, electronics, manufacturing equipment and a finished interactive terminal.')}
      width={1809}
      height={869}
      sizes="(max-width: 580px) 88vw, (max-width: 850px) 91vw, 42vw"
      preload
    />
    <div className="hero-process-flow" role="group" aria-label={t('ONE CONTINUOUS PROCESS')}>
      <p className="hero-process-heading meta">{t('FROM IDEA TO REALITY.')} <span aria-hidden="true">01 — 06</span></p>
      <ol className="hero-process-list" role="list">
        {steps.map(([title, description], index) => <li className="hero-process-node" data-active={activeStep === index} key={title}>
          <button
            type="button"
            className="hero-process-trigger"
            aria-pressed={activeStep === index}
            aria-describedby={`${id}-${index}`}
            onClick={() => setActiveStep(index)}
            onFocus={() => setActiveStep(index)}
            onPointerEnter={event => {
              // Touch selection remains explicit; keyboard focus takes precedence over hover.
              if (event.pointerType === 'mouse' && !event.currentTarget.closest('ol')?.matches(':focus-within')) setActiveStep(index)
            }}
          >
            <span className="hero-process-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span className="hero-process-title">{t(title)}</span>
          </button>
          <p className="hero-process-description" id={`${id}-${index}`}>{t(description)}</p>
        </li>)}
      </ol>
    </div>
  </div>
}
