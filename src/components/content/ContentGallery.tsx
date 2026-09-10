'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { Project } from '@/payload-types'
import { populated, safeHref } from '@/lib/content'
import type { Locale } from '@/lib/i18n'
import { ui } from '@/lib/section-copy'
import { ContentMedia } from './ContentMedia'

/** Uses the shared Payload gallery shape; enabled for Solutions in phase one. */
export function ContentGallery({ gallery, locale }: { gallery: Project['gallery']; locale: Locale }) {
  const items = (gallery || []).flatMap((entry, index) => {
    const media = populated(entry.image)
    return media?.mimeType?.startsWith('image/') && safeHref(media.url)
      ? [{ media, caption: entry.caption || media.caption, key: entry.id || `${media.id}-${index}` }]
      : []
  })
  const labels = ui(locale)
  const id = useId()
  const dialog = useRef<HTMLDialogElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const opener = useRef<HTMLButtonElement | null>(null)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const current = selected === null ? undefined : items[selected]
  const isOpen = Boolean(current)

  useEffect(() => {
    if (!isOpen || !dialog.current) return
    const modal = dialog.current
    const body = document.body
    const root = document.documentElement
    const scrollY = window.scrollY
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow, rootOverflow: root.style.overflow }
    // Fix the body at its current position, including on mobile browsers.
    body.style.width = `${body.getBoundingClientRect().width}px`
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.overflow = 'hidden'
    root.style.overflow = 'hidden'
    modal.showModal()
    closeButton.current?.focus({ preventScroll: true })
    return () => {
      modal.close()
      Object.assign(body.style, { position: previous.position, top: previous.top, width: previous.width, overflow: previous.overflow })
      root.style.overflow = previous.rootOverflow
      const behavior = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'
      window.scrollTo(0, scrollY)
      opener.current?.focus({ preventScroll: true })
      root.style.scrollBehavior = behavior
    }
  }, [isOpen])

  function move(direction: number) {
    setSelected(index => index === null ? null : (index + direction + items.length) % items.length)
  }

  if (!items.length) return null
  return <section className="content-gallery content-pad" aria-label={labels.gallery}>
    <div className="section-label"><span>{labels.gallery}</span><span>+</span></div>
    <div className="content-gallery-grid">{items.map((item, index) => <figure key={item.key}>
      <button type="button" className="gallery-open" aria-label={`${labels.openImage}: ${item.media.alt || index + 1}`} aria-haspopup="dialog" aria-controls={id}
        onClick={event => { opener.current = event.currentTarget; setSelected(index) }}>
        <ContentMedia media={item.media} presentation="gallery-tile" />
        <span className="gallery-enlarge" aria-hidden="true">↗</span>
      </button>
      {item.caption && <figcaption>{item.caption}</figcaption>}
    </figure>)}</div>
    <dialog ref={dialog} id={id} className="media-lightbox" aria-label={labels.gallery} aria-describedby={current?.caption ? `${id}-caption` : undefined}
      onCancel={event => { event.preventDefault(); setSelected(null) }} onClose={() => setSelected(null)}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1) }
        if (event.key === 'Tab') {
          const controls = event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), [tabindex="0"]')
          const first = controls[0]
          const last = controls[controls.length - 1]
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
        }
      }}>
      <div className="media-lightbox-layout">
        <div className="media-lightbox-toolbar">
          <span className="meta" role="status" aria-live="polite" aria-atomic="true">{selected === null ? '' : `${selected + 1} / ${items.length}`}</span>
          <button type="button" ref={closeButton} className="media-lightbox-control" aria-label={labels.closeGallery} onClick={() => setSelected(null)}>×</button>
        </div>
        <div className="media-lightbox-stage"
          onPointerDown={event => { if (event.pointerType === 'touch' && event.isPrimary) touch.current = { x: event.clientX, y: event.clientY } }}
          onPointerCancel={() => { touch.current = null }}
          onPointerUp={event => {
            const start = touch.current
            touch.current = null
            if (!start) return
            const dx = event.clientX - start.x
            const dy = event.clientY - start.y
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1)
          }}>
          {current && <ContentMedia key={current.key} media={current.media} presentation="lightbox" eager />}
        </div>
        <div className="media-lightbox-footer">
          <button type="button" className="media-lightbox-control" aria-label={labels.previousImage} disabled={items.length < 2} onClick={() => move(-1)}>←</button>
          <div className="media-lightbox-caption" id={`${id}-caption`} key={current?.key} tabIndex={current?.caption ? 0 : undefined}>{current?.caption}</div>
          <button type="button" className="media-lightbox-control" aria-label={labels.nextImage} disabled={items.length < 2} onClick={() => move(1)}>→</button>
        </div>
      </div>
    </dialog>
  </section>
}
