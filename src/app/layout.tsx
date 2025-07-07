import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Renart - Premium Jewelry Collection',
  description: 'Discover our exquisite collection of engagement rings and fine jewelry',
  keywords: 'jewelry, engagement rings, wedding bands, diamonds, gold, silver',
  authors: [{ name: 'Renart' }],
  openGraph: {
    title: 'Renart - Premium Jewelry Collection',
    description: 'Discover our exclusive collection of engagement rings and fine jewelry crafted with precision and elegance.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-white">
        <div className="relative">
         
          {children}
        </div>
      </body>
    </html>
  )
} 