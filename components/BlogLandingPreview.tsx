import Link from 'next/link'

const posts = [
  {
    title: 'AI Video Title Optimization: Boost Your Video Clicks',
    slug: 'video-title-optimization-ai-guide',
    date: '2025-04-19',
    description: 'Discover how to use AI to craft compelling, SEO-friendly video titles that increase clicks and engagement on YouTube, TikTok, and X (Twitter).',
  },
  {
    title: 'Writing Video Descriptions That Drive Engagement',
    slug: 'video-description-optimization-guide',
    date: '2025-04-19',
    description: 'Learn how to use AI to write video descriptions that boost SEO, viewer retention, and engagement across YouTube, TikTok, and X (Twitter).',
  },
  {
    title: 'AI Hashtag & Tag Strategies for Video Content',
    slug: 'hashtag-tag-strategy-ai',
    date: '2025-04-19',
    description: 'Unlock the power of AI to generate effective hashtags and tags for your videos on YouTube, TikTok, and X (Twitter).',
  },
  {
    title: 'Understanding Video Performance Analytics with AI',
    slug: 'video-performance-analytics-guide',
    date: '2025-04-19',
    description: 'Learn how to leverage AI-powered analytics to track, interpret, and improve your video content’s performance.',
  },
  {
    title: 'Cross-Platform Video Optimization with Optiflow',
    slug: 'cross-platform-video-optimization',
    date: '2025-04-19',
    description: 'Master the art of optimizing video content for YouTube, TikTok, and X (Twitter) using Optiflow’s AI-driven tools.',
  },
]

export default function BlogLandingPreview() {
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">From the Optiflow Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <article key={post.slug} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <Link href={`/blog/${post.slug}`} className="block">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-3">{post.description}</p>
                <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/blog" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Read All Blog Posts</Link>
        </div>
      </div>
    </section>
  )
}
