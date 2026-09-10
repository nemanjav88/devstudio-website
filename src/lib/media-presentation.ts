import type { Media } from '@/payload-types'

export type SolutionMediaContext = 'solution-card' | 'solution-hero'
type MediaDimensions = Pick<Media, 'width' | 'height' | 'mimeType'>

/** Geometry is a conservative fallback, not a claim about the image's subject. */
export function solutionMediaPresentation(media: MediaDimensions, context: SolutionMediaContext) {
  const width = media.width && Number.isFinite(media.width) && media.width > 0 ? media.width : undefined
  const height = media.height && Number.isFinite(media.height) && media.height > 0 ? media.height : undefined
  const ratio = width && height ? width / height : undefined
  const image = Boolean(media.mimeType?.startsWith('image/'))
  const productLike = image && ratio !== undefined && ratio <= 1.2
  const smallHero = context === 'solution-hero' && width !== undefined && width < 1000
  const fit = !image || !ratio || productLike || smallHero ? 'contain' : 'cover'
  return { fit, productLike, width, height, ratio } as const
}
