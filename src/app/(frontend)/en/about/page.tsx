import { AboutPage, coreMetadata } from '@/components/core/CorePages'

export const dynamic = 'force-dynamic'
export const generateMetadata = () => coreMetadata('about', 'en')
export default function Page() { return <AboutPage locale="en" /> }
