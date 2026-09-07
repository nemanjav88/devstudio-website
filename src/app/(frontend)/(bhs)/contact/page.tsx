import { ContactPage, coreMetadata } from '@/components/core/CorePages'

export const dynamic = 'force-dynamic'
export const generateMetadata = () => coreMetadata('contact', 'bhs')
export default function Page() { return <ContactPage locale="bhs" /> }
