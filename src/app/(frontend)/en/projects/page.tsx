import { IndexPage, indexMetadata } from '@/components/content/SectionPages'
import type { SearchParams } from '@/lib/content'

export const dynamic = 'force-dynamic'
type Props = { searchParams: Promise<SearchParams> }
export const generateMetadata = ({ searchParams }: Props) => indexMetadata('projects', 'en', searchParams)
export default function Page({ searchParams }: Props) {
  return <IndexPage collection="projects" locale="en" searchParams={searchParams} />
}
