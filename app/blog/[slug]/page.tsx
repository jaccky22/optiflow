// app/blog/[slug]/page.tsx
import { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'How to Optimize YouTube Videos for Maximum Views',
  description: 'Learn how to optimize your YouTube videos using AI-powered tools and proven strategies. Boost your views and engagement with our comprehensive guide.',
  alternates: {
    canonical: 'http://localhost:3000/blog/how-to-optimize-youtube-videos'
  }
}

export default function BlogPost() {
  return (
    <div className="prose prose-lg max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">How to Optimize YouTube Videos for Maximum Views</h1>
      <p className="text-gray-600 mb-8">Published: April 11, 2025</p>

      <section>
        <h2>Introduction to YouTube Optimization</h2>
        <p>YouTube is the second largest search engine after Google, making video optimization crucial for content creators...</p>
      </section>

      {/* Add more sections here */}
    </div>
  )
}