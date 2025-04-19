import Link from 'next/link'

const posts = [
  {
    title: 'How to Optimize YouTube Videos for Maximum Views',
    slug: 'how-to-optimize-youtube-videos',
    date: '2025-04-11',
    description: 'Learn how to optimize your YouTube videos using AI-powered tools and proven strategies...',
  },
  {
    title: 'TikTok Optimization: Getting More Views on Your Videos',
    slug: 'tiktok-optimization-guide',
    date: '2025-04-11',
    description: 'Discover how to optimize your TikTok videos for maximum engagement and reach...',
  },
  {
    title: 'X (Twitter) Video Optimization Tips',
    slug: 'x-video-optimization',
    date: '2025-04-11',
    description: 'Learn how to optimize your X (Twitter) videos for better engagement and reach...',
  },
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

export default function BlogIndex() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Optiflow Blog</h1>
      <p className="text-gray-600 mb-12">Read our expert guides on video optimization and content creation strategies.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <Link href={`/blog/${post.slug}`} className="block">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}