import { ResourcesPage, indexMetadata } from '@/components/content/SectionPages'
import type { SearchParams } from '@/lib/content'

export const dynamic = 'force-dynamic'
export const generateMetadata = () => indexMetadata('resources', 'bhs')
export default function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return <ResourcesPage locale="bhs" searchParams={searchParams} />
}
