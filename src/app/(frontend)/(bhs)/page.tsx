import { LocalizedHome, homeMetadata } from '@/components/home/LocalizedHome'

export const dynamic = 'force-dynamic'
export const generateMetadata = () => homeMetadata('bhs')

export default function HomePage() {
  return <LocalizedHome locale="bhs" />
}
