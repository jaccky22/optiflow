// app/platforms/youtube/page.tsx
import { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YouTube Optimization Tools - Optiflow',
  description: 'Optimize your YouTube videos with our AI-powered tools. Generate optimized titles, descriptions, and tags. Boost your views and engagement.',
  alternates: {
    canonical: 'https://optiflowai.com/platforms/youtube'
  }
}

export default function YouTubePage() {
  return (
    <div className="prose prose-lg max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">YouTube Optimization Tools</h1>
      {/* Your content here */}
    </div>
  )
}