// lib/api/youtube.ts
import { YouTubeVideo } from '../types';

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

if (!API_KEY) {
  throw new Error('YouTube API key not found');
}

const fetchYouTube = async (endpoint: string, params: Record<string, string>): Promise<any> => {
  const url = new URL(`[https://www.googleapis.com/youtube/v3/${endpoint}`);](https://www.googleapis.com/youtube/v3/${endpoint}`);)
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
  url.searchParams.append('key', API_KEY);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`YouTube API error: ${errorData.error?.message || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    throw error;
  }
};

export const getYouTubeTrendingTags = async (query: string): Promise<YouTubeVideo[]> => {
  try {
    // Fetch trending videos
    const trendingVideos = await fetchYouTube('search', {
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: '10',
      order: 'relevance'
    });

    // Extract video IDs
    const videoIds = trendingVideos.items.map((item: any) => item.id.videoId).join(',');

    // Fetch video details including statistics
    const videoDetails = await fetchYouTube('videos', {
      part: 'snippet,statistics',
      id: videoIds
    });

    return videoDetails.items;
  } catch (error) {
    console.error('Error in YouTube API call:', error);
    throw error;
  }
};