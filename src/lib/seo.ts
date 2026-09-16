import type { Metadata } from 'next'
import type { Media } from '@/payload-types'
import { populated } from './content'
import type { Locale } from './i18n'

type SocialImage = { url: string; alt?: string; width?: number; height?: number }

export function metadataImage(value: Media | number | null | undefined): SocialImage | undefined {
  const image = populated(value)
  if (!image?.url || (image.mimeType && !image.mimeType.startsWith('image/'))) return undefined
  return { url: image.url, ...(image.alt ? { alt: image.alt } : {}), ...(image.width ? { width: image.width } : {}), ...(image.height ? { height: image.height } : {}) }
}

export function socialMetadata({ title, description, url, locale, image }: { title: string; description?: string; url: string; locale: Locale; image?: SocialImage }): Pick<Metadata, 'openGraph' | 'twitter'> {
  const images = image ? [image] : undefined
  return {
    openGraph: {
      type: 'website', siteName: 'Dev Studio', url, title,
      ...(description ? { description } : {}), locale: locale === 'bhs' ? 'bs_BA' : 'en_US',
      ...(images ? { images } : {}),
    },
    twitter: {
      card: 'summary_large_image', title,
      ...(description ? { description } : {}),
      ...(images ? { images } : {}),
    },
  }
}
