import { DetailPage, detailMetadata } from '@/components/content/SectionPages'

export const dynamic = 'force-dynamic'
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) {
  return detailMetadata('solutions', 'en', (await params).slug)
}
export default async function Page({ params }: Props) {
  return <DetailPage collection="solutions" locale="en" slug={(await params).slug} />
}
