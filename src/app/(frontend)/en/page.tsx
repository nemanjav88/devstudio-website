import { LocalizedHome, homeMetadata } from '@/components/home/LocalizedHome'

export const dynamic = 'force-dynamic'
export const generateMetadata = () => homeMetadata('en')

export default function EnglishHomePage() {
  return <LocalizedHome locale="en" />
}
