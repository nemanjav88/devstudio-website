import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { Media, Project } from '@/payload-types'
import { populated, safeHref } from '@/lib/content'
import type { Locale } from '@/lib/i18n'
import { ui } from '@/lib/section-copy'
import { mediaPresentation, type MediaPresentationContext } from '@/lib/media-presentation'

export function ContentMedia({ media, alt = '', eager = false, presentation }: { media?: Media | number | null; alt?: string; eager?: boolean; presentation?: MediaPresentationContext }) {
  const asset = populated(media)
  const src = safeHref(asset?.url)
  if (!src || !asset) return null
  const strategy = presentation ? mediaPresentation(asset, presentation) : undefined
  const video = asset.mimeType?.startsWith('video/')
  if (!video && !asset.mimeType?.startsWith('image/')) return null
  const element = video ? <video className="content-image" controls playsInline preload="metadata" aria-label={asset.alt || alt}><source src={src} type={asset.mimeType!} /></video>
    : <Image className="content-image" src={src} alt={asset.alt || alt} width={asset.width || 1600} height={asset.height || 1000}
      unoptimized loading={eager ? 'eager' : 'lazy'} style={{ ...(strategy?.fit === 'contain' ? { width: 'auto', height: 'auto', aspectRatio: 'auto' } : {}), objectPosition: strategy?.fit === 'contain' ? '50% 50%' : `${asset.focalX ?? 50}% ${asset.focalY ?? 50}%` }} />
  if (!strategy) return element
  return <div className={`solution-media solution-media--${presentation} solution-media--${strategy.fit}`}
    style={{ '--media-width': `${strategy.width || 640}px`, '--media-height': `${strategy.height || 480}px`, '--media-ratio': strategy.ratio || 16 / 9 } as CSSProperties}>
    {element}
  </div>
}

export function Gallery({ gallery, locale }: { gallery: Project['gallery']; locale: Locale }) {
  const images = gallery?.filter(item => safeHref(populated(item.image)?.url))
  if (!images?.length) return null
  return <section className="content-gallery content-pad" aria-label={ui(locale).gallery}>
    <div className="section-label"><span>{ui(locale).gallery}</span><span>+</span></div>
    <div className="gallery-sequence">{images.map((item, index) => <figure key={item.id || index}>
      <ContentMedia media={item.image} />
      {(item.caption || populated(item.image)?.caption) && <figcaption>{item.caption || populated(item.image)?.caption}</figcaption>}
    </figure>)}</div>
  </section>
}

export function ContentVideo({ video, locale }: { video: Project['video']; locale: Locale }) {
  const file = populated(video?.file)
  const src = safeHref(file?.url || video?.url)
  if (!src) return null
  const direct = file?.mimeType?.startsWith('video/') || /\.(mp4|webm|ogg)(?:[?#]|$)/i.test(src)
  return <figure className="content-video">
    {direct ? <video controls playsInline preload="metadata" poster={safeHref(populated(video?.poster)?.url)} aria-label={video?.caption || ui(locale).watch}>
      <source src={src} type={file?.mimeType || undefined} />
    </video> : <a className="external-video" href={src} target="_blank" rel="noopener noreferrer">
      <ContentMedia media={video?.poster} /><span>{ui(locale).watch} <span aria-hidden="true">↗</span></span>
    </a>}
    {video?.caption && <figcaption>{video.caption}</figcaption>}
  </figure>
}
