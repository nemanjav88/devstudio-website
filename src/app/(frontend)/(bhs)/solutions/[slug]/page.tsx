import { DetailPage, detailMetadata } from '@/components/content/SectionPages'

export const dynamic = 'force-dynamic'
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) {
  return detailMetadata('solutions', 'bhs', (await params).slug)
}
export default async function Page({ params }: Props) {
  return <DetailPage collection="solutions" locale="bhs" slug={(await params).slug} />
}
