import { CapabilitiesPage, coreMetadata } from '@/components/core/CorePages'

export const dynamic = 'force-dynamic'
export const generateMetadata = () => coreMetadata('capabilities', 'en')
export default function Page() { return <CapabilitiesPage locale="en" /> }
