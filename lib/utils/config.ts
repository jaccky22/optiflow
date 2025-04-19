// lib/utils/config.ts
export const getConfig = () => {
  const config = {
    api: {
      youtube: {
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
        baseUrl: '[https://www.googleapis.com/youtube/v3',](https://www.googleapis.com/youtube/v3',)
        maxResults: 10,
        timeout: 10000
      },
      tiktok: {
        key: process.env.NEXT_PUBLIC_TIKTOK_API_KEY,
        baseUrl: '[https://api.tiktok.com](https://api.tiktok.com)',
        maxResults: 10,
        timeout: 10000
      },
      x: {
        key: process.env.NEXT_PUBLIC_X_API_KEY,
        baseUrl: '[https://api.twitter.com/2',](https://api.twitter.com/2',)
        maxResults: 10,
        timeout: 10000
      }
    },
    rateLimits: {
      youtube: {
        limit: 100,
        window: 24 * 60 * 60 * 1000 // 24 hours
      },
      tiktok: {
        limit: 1000,
        window: 24 * 60 * 60 * 1000 // 24 hours
      },
      x: {
        limit: 1500,
        window: 24 * 60 * 60 * 1000 // 24 hours
      }
    }
  };

  // Validate configuration
  const validateConfig = (config: any) => {
    const errors: string[] = [];

    // Check API keys
    if (!config.api.youtube.key) errors.push('YouTube API key is missing');
    if (!config.api.tiktok.key) errors.push('TikTok API key is missing');
    if (!config.api.x.key) errors.push('X API key is missing');

    // Check rate limits
    if (config.rateLimits.youtube.limit <= 0) errors.push('Invalid YouTube rate limit');
    if (config.rateLimits.tiktok.limit <= 0) errors.push('Invalid TikTok rate limit');
    if (config.rateLimits.x.limit <= 0) errors.push('Invalid X rate limit');

    if (errors.length > 0) {
      throw new Error(`Configuration validation failed: ${errors.join(', ')}`);
    }
  };

  validateConfig(config);

  return config;
};