import React from "react"
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { HeaderNav } from '@/components/header-nav'
import './globals.css'

export const metadata: Metadata = {
  title: '黑暗三角人格测试 | Dark Triad Test',
  description: '探索你内心深处的黑暗面 - 自恋、马基雅维利主义、精神病态人格特质测试',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans antialiased`}>
          <HeaderNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
