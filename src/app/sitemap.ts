import type { MetadataRoute } from 'next'
import { connection } from 'next/server'
import { findAllSolutions } from '@/lib/content-data'

const siteUrl = 'https://devstudio.biz'

const staticPaths = [
  '/', '/solutions', '/capabilities', '/about', '/contact', '/stories', '/resources',
  '/en', '/en/solutions', '/en/capabilities', '/en/about', '/en/contact', '/en/stories', '/en/resources',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection()
  const [bhsSolutions, englishSolutions] = await Promise.all([
    findAllSolutions('bhs'),
    findAllSolutions('en'),
  ])

  return [
    ...staticPaths.map(path => ({ url: `${siteUrl}${path}` })),
    ...bhsSolutions.docs.map(solution => ({ url: `${siteUrl}/solutions/${solution.slug}` })),
    ...englishSolutions.docs.map(solution => ({ url: `${siteUrl}/en/solutions/${solution.slug}` })),
  ]
}
