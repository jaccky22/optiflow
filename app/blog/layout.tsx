// app/blog/layout.tsx
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navigation } from '@/components/navigation'
import { SiteFooter } from '@/components/site-footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Optiflow Blog - Video Optimization Tips & Guides',
  description: 'Read our expert guides on YouTube optimization, TikTok optimization, and social media content strategies. Learn how to boost your video content performance with AI-powered tools.',
  alternates: {
    canonical: 'http://localhost:3000/blog'
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}