import { DetailPage, detailMetadata } from '@/components/content/SectionPages'

export const dynamic = 'force-dynamic'
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) {
  return detailMetadata('projects', 'bhs', (await params).slug)
}
export default async function Page({ params }: Props) {
  return <DetailPage collection="projects" locale="bhs" slug={(await params).slug} />
}
