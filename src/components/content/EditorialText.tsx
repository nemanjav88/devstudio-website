import { RichText, type JSXConvertersFunction, type JSXConverter } from '@payloadcms/richtext-lexical/react'
import type { SerializedLinkNode, SerializedAutoLinkNode } from '@payloadcms/richtext-lexical'
import type { Project, Media } from '@/payload-types'
import { isPublished, safeHref, type EditorialCollection } from '@/lib/content'
import { localizedHref, type Locale } from '@/lib/i18n'
import { ContentMedia } from './ContentMedia'

export function EditorialText({ content, locale }: { content: Project['content']; locale: Locale }) {
  if (!content?.root?.children?.length) return null
  const converters: JSXConvertersFunction = ({ defaultConverters }) => {
    const link: JSXConverter<SerializedLinkNode | SerializedAutoLinkNode> = ({ node, nodesToJSX }) => {
      const children = nodesToJSX({ nodes: node.children })
      let href = safeHref(node.fields.url)
      if (node.fields.linkType === 'internal') {
        const relation = node.fields.doc
        const value = relation?.value
        if (relation && ['projects', 'stories', 'solutions'].includes(relation.relationTo) && isPublished(value)) {
          href = `/${relation.relationTo as EditorialCollection}/${value.slug}`
        } else if (relation?.relationTo === 'downloads' && typeof value === 'object' && value) {
          href = safeHref(value.url)
        } else href = undefined
      }
      return href ? <a href={localizedHref(href, locale)} target={node.fields.newTab ? '_blank' : undefined} rel={node.fields.newTab ? 'noopener noreferrer' : undefined}>{children}</a> : <>{children}</>
    }
    return {
      ...defaultConverters, link, autolink: link,
      upload: ({ node }) => {
        if (typeof node.value !== 'object' || !node.value) return null
        const media = node.value as unknown as Media
        if (node.relationTo === 'media') return <ContentMedia media={media} />
        const href = safeHref(media.url)
        return href ? <a href={href}>{media.filename}</a> : null
      },
    }
  }
  return <RichText className="editorial-prose" data={content} converters={converters} />
}
