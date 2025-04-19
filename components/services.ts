// lib/services.ts
export interface Service {
  name: string;
  description: string;
  features: string[];
  icon: string;
}

export const SERVICES: Service[] = [
  {
    name: "Video Topic Generator",
    description: "Generate engaging video topics based on trending topics and audience interests",
    features: [
      "Trending topic analysis",
      "Audience engagement prediction",
      "Category-specific suggestions",
      "Cross-platform optimization",
      "Competitor analysis"
    ],
    icon: "video-camera"
  },
  {
    name: "Content Description Generator",
    description: "Create optimized descriptions for videos, articles, and social media posts",
    features: [
      "SEO-optimized content",
      "Keyword integration",
      "Engaging hooks",
      "Cross-platform compatibility",
      "Multi-language support"
    ],
    icon: "edit"
  },
  {
    name: "Tag Generator",
    description: "Generate relevant tags for YouTube, TikTok, and X (Twitter)",
    features: [
      "Platform-specific tags",
      "Trending topic integration",
      "Sentiment analysis",
      "Performance metrics",
      "Related content suggestions"
    ],
    icon: "tag"
  },
  {
    name: "Content Analyzer",
    description: "Analyze existing content for optimization opportunities",
    features: [
      "Engagement analysis",
      "Keyword performance",
      "Trend alignment",
      "Competitor comparison",
      "Improvement suggestions"
    ],
    icon: "analytics"
  }
];