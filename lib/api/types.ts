// lib/api/types.ts
export interface SocialMediaTag {
  platform: 'youtube' | 'tiktok' | 'x';
  tag: string;
  relevance: number;
  metrics: {
    views?: number;
    likes?: number;
    comments?: number;
    shares?: number;
    retweets?: number;
    impressions?: number;
  };
  sentiment?: 'positive' | 'negative' | 'neutral';
  related?: string[];
}

export interface SocialMediaAnalysis {
  tags: SocialMediaTag[];
  trendingTopics: string[];
  platformMetrics: {
    youtube: number;
    tiktok: number;
    x: number;
  };
  rateLimits: {
    youtube: {
      remaining: number;
      reset: Date;
    };
    tiktok: {
      remaining: number;
      reset: Date;
    };
    x: {
      remaining: number;
      reset: Date;
    };
  };
}