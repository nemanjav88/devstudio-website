import { CapabilitiesPage, coreMetadata } from '@/components/core/CorePages'

export const dynamic = 'force-dynamic'
export const generateMetadata = () => coreMetadata('capabilities', 'bhs')
export default function Page() { return <CapabilitiesPage locale="bhs" /> }
