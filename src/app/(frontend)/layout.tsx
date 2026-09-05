import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'

export const metadata: Metadata = {
  title: 'Dev Studio — From Idea to Reality',
  description: 'An integrated product development and technology studio in Banja Luka. Design, electronics, software and manufacturing. From idea to reality.',
  robots: { index: false, follow: false },
}

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
