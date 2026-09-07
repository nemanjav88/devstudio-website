import type { ReactNode } from 'react'
import { FrontendLayout, frontendMetadata } from '@/components/frontend/FrontendLayout'

export const metadata = frontendMetadata

export default function BhsLayout({ children }: { children: ReactNode }) {
  return <FrontendLayout locale="bhs">{children}</FrontendLayout>
}
