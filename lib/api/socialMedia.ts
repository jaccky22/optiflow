// lib/api/socialMedia.ts
import { SocialMediaTag, SocialMediaAnalysis } from '../types';
import { getYouTubeTrendingTags } from './youtube';

const rateLimit = {
  youtube: {
    limit: 100,
    remaining: 100,
    reset: new Date()
  },
  tiktok: {
    limit: 1000,
    remaining: 1000,
    reset: new Date()
  },
  x: {
    limit: 1500,
    remaining: 1500,
    reset: new Date()
  }
};

const checkRateLimit = (platform: string): boolean => {
  const now = new Date();
  const limit = rateLimit[platform];
  
  if (now > limit.reset) {
    limit.remaining = limit.limit;
    limit.reset = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  }
  
  if (limit.remaining <= 0) {
    throw new Error(`${platform} API rate limit exceeded`);
  }
  
  limit.remaining--;
  return true;
};

export const getSocialMediaTags = async (query: string): Promise<SocialMediaAnalysis> => {
  try {
    // Check rate limits
    checkRateLimit('youtube');
    checkRateLimit('tiktok');
    checkRateLimit('x');

    // Fetch data from all platforms
    const [youtubeTags, tiktokTags, xTags] = await Promise.all([
      getYouTubeTrendingTags(query),
      getTikTokTrendingTags(query),
      getXTrendingTags(query)
    ]);

    // Process and combine results
    const allTags = [...youtubeTags, ...tiktokTags, ...xTags]
      .map(tag => ({
        ...tag,
        platform: tag.platform,
        relevance: tag.relevance
      }))
      .sort((a, b) => b.relevance - a.relevance);

    // Calculate platform metrics
    const platformMetrics = {
      youtube: youtubeTags.reduce((sum, tag) => sum + (tag.metrics.views || 0), 0),
      tiktok: tiktokTags.reduce((sum, tag) => sum + (tag.metrics.views || 0), 0),
      x: xTags.reduce((sum, tag) => sum + (tag.metrics.impressions || 0), 0)
    };

    // Get trending topics
    const trendingTopics = [
      ...getYouTubeTrendingTopics(),
      ...getTikTokTrendingTopics(),
      ...getXTrendingTopics()
    ];

    return {
      tags: allTags,
      trendingTopics,
      platformMetrics,
      rateLimits: rateLimit
    };
  } catch (error) {
    console.error('Error in social media service:', error);
    throw error;
  }
};