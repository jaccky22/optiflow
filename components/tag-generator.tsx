// components/tag-generator.tsx
import { useState, useEffect } from 'react';
import { Copy, CopyCheck, X, CheckCircle, Info, ChevronDown, AlertCircle } from 'lucide-react';
import { getSocialMediaTags } from '../lib/api/socialMedia';
import { toast } from '@/hooks/use-toast';

interface PlatformIconProps {
  platform: string;
}

const PlatformIcon: React.FC<PlatformIconProps> = ({ platform }) => {
  const icons = {
    youtube: <span className="text-red-500">YT</span>,
    tiktok: <span className="text-black">TT</span>,
    x: <span className="text-blue-500">X</span>
  };

  return (
    <div className="flex items-center gap-1">
      {icons[platform]}
      <span className="text-xs text-gray-500">{platform}</span>
    </div>
  );
};

export default function TagGenerator() {
  const [input, setInput] = useState('');
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [showMetrics, setShowMetrics] = useState(false);

  const generateTags = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError(null);
    setSelectedPlatform(null);
    setShowMetrics(false);

    try {
      const analysis = await getSocialMediaTags(input);
      
      // Check rate limits
      const rateLimits = analysis.rateLimits;
      if (Object.values(rateLimits).some(limit => limit.remaining <= 0)) {
        throw new Error('API rate limit exceeded. Please try again later.');
      }

      // Combine and sort tags from all platforms
      const allTags = analysis.tags
        .map(tag => ({
          ...tag,
          platform: tag.platform,
          relevance: tag.relevance
        }))
        .sort((a, b) => b.relevance - a.relevance);

      setTags(allTags.slice(0, 50));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast({
        title: "Error",
        description: error,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyTag = async (tag: string) => {
    try {
      await navigator.clipboard.writeText(tag);
      toast({
        title: "Copied!",
        description: "Tag has been copied to clipboard",
        duration: 2000
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy tag",
        variant: "destructive"
      });
    }
  };

  const copyAllTags = async () => {
    try {
      const tagString = tags.map(tag => tag.tag).join(', ');
      await navigator.clipboard.writeText(tagString);
      toast({
        title: "Copied!",
        description: "All tags have been copied to clipboard",
        duration: 2000
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy tags",
        variant: "destructive"
      });
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500/10 text-green-500';
      case 'negative':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getMetricTooltip = (tag: any) => {
    const metrics = tag.metrics;
    return (
      <div className="space-y-1">
        <div>Views: {metrics.views || 0}</div>
        <div>Likes: {metrics.likes || 0}</div>
        <div>Comments: {metrics.comments || 0}</div>
        <div>Shares: {metrics.shares || 0}</div>
        <div>Retweets: {metrics.retweets || 0}</div>
        <div>Impressions: {metrics.impressions || 0}</div>
      </div>
    );
  };

  const filteredTags = selectedPlatform 
    ? tags.filter(tag => tag.platform === selectedPlatform)
    : tags;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your video title or description..."
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={generateTags}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Generating...
              </div>
            ) : (
              <span>Generate Tags</span>
            )}
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center mb-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-blue-500">Analyzing content across platforms...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <div className="flex items-center">
            <X className="w-4 h-4 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {tags.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedPlatform(null)}
                className={`px-4 py-2 rounded-lg ${selectedPlatform === null ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'} transition-colors`}
              >
                All Platforms
              </button>
              <button
                onClick={() => setSelectedPlatform('youtube')}
                className={`px-4 py-2 rounded-lg ${selectedPlatform === 'youtube' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'} transition-colors`}
              >
                YouTube
              </button>
              <button
                onClick={() => setSelectedPlatform('tiktok')}
                className={`px-4 py-2 rounded-lg ${selectedPlatform === 'tiktok' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'} transition-colors`}
              >
                TikTok
              </button>
              <button
                onClick={() => setSelectedPlatform('x')}
                className={`px-4 py-2 rounded-lg ${selectedPlatform === 'x' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'} transition-colors`}
              >
                X
              </button>
            </div>
            <button
              onClick={copyAllTags}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy All Tags
                          </button>
                        </div>
              
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {filteredTags.map((tag, index) => (
                            <div
                              key={index}
                              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                              onClick={() => copyTag(tag.tag)}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-blue-500 font-medium">{tag.tag}</span>
                                <div className="flex items-center gap-2">
                                  <PlatformIcon platform={tag.platform} />
                                  <div className="relative">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowMetrics(!showMetrics);
                                      }}
                                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                      <Info className="w-4 h-4 text-gray-500" />
                                    </button>
                                    {showMetrics && (
                                      <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg p-2 z-10">
                                        {getMetricTooltip(tag)}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                  <span>Relevance: {Math.round(tag.relevance)}</span>
                                  <span>Metrics: {tag.metrics.views || 0} views</span>
                                </div>
                                {tag.sentiment && (
                                  <div className="mt-1">
                                    Sentiment: <span className={getSentimentColor(tag.sentiment)}>{tag.sentiment}</span>
                                  </div>
                                )}
                                {tag.related && tag.related.length > 0 && (
                                  <div className="mt-2">
                                    Related: {tag.related.join(', ')}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }