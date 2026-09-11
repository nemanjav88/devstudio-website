import type { Media } from '../payload-types'
import type { MediaPresentationContext } from './media-presentation'

/** Only public, local Payload raster files with a revision enter the optimizer. */
export function mediaImageSource(asset: Pick<Media, 'url' | 'updatedAt' | 'mimeType' | 'width' | 'height'>) {
  const src = asset.url || ''
  const revision = Date.parse(asset.updatedAt)
  if (!/^\/api\/media\/file\/[^/?#\\]+$/.test(src)
    || !Number.isFinite(revision)
    || !asset.width || !asset.height || !Number.isFinite(asset.width) || !Number.isFinite(asset.height) || asset.width < 0 || asset.height < 0
    || !['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(asset.mimeType || '')) {
    return { src, unoptimized: true }
  }
  // Payload can overwrite a filename during crop/focal edits. The document's
  // persisted updatedAt changes on edits; never use a render-time timestamp.
  return { src: `${src}?v=${revision}`, unoptimized: false }
}

/** Match the existing CSS stages without changing their geometry. */
export function mediaImageSizes(context?: MediaPresentationContext) {
  if (context === 'solution-card') return '(max-width: 580px) 88vw, 28vw'
  if (context === 'gallery-tile') return '(max-width: 580px) 88vw, (max-width: 1100px) 44vw, 29vw'
  if (context === 'lightbox-thumbnail') return '88px'
  if (context === 'lightbox') return '94vw'
  return '88vw'
}
