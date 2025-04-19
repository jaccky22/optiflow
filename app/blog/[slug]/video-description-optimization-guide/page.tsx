import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writing Video Descriptions That Drive Engagement',
  description: 'Learn how to use AI to write video descriptions that boost SEO, viewer retention, and engagement across YouTube, TikTok, and X (Twitter).',
  alternates: {
    canonical: 'https://optiflowai.com/blog/video-description-optimization-guide'
  }
}

export default function BlogPost() {
  return (
    <div className="prose prose-lg max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Writing Video Descriptions That Drive Engagement</h1>
      <p className="text-gray-600 mb-8">Published: April 19, 2025</p>
      <section>
        <h2>Importance of Video Descriptions</h2>
        <p>Descriptions help algorithms understand your content. AI can optimize these for SEO and viewer clarity.</p>
      </section>
      <section>
        <h2>Optiflow’s AI Description Generator</h2>
        <p>Generate detailed, keyword-rich descriptions that improve discoverability and keep viewers engaged.</p>
      </section>
      <section>
        <h2>Tips for Effective Descriptions</h2>
        <ul>
          <li>Include primary keywords early</li>
          <li>Summarize video content clearly</li>
          <li>Add calls to action</li>
        </ul>
      </section>
    </div>
  )
}
