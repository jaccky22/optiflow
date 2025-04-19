"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, TrendingUp, Calendar, MessageCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock trending hashtags data for Twitter
const TRENDING_CATEGORIES = [
  {
    name: "News",
    tags: [
      { tag: "Breaking", volume: "1.2M tweets", trending: true },
      { tag: "Politics", volume: "950K tweets", trending: true },
      { tag: "WorldNews", volume: "780K tweets", trending: false },
      { tag: "Headlines", volume: "620K tweets", trending: false },
      { tag: "BreakingNews", volume: "580K tweets", trending: true },
      { tag: "CurrentEvents", volume: "450K tweets", trending: false },
      { tag: "NewsUpdate", volume: "380K tweets", trending: false },
      { tag: "LatestNews", volume: "320K tweets", trending: true },
    ],
  },
  {
    name: "Technology",
    tags: [
      { tag: "AI", volume: "890K tweets", trending: true },
      { tag: "Tech", volume: "750K tweets", trending: true },
      { tag: "Crypto", volume: "680K tweets", trending: false },
      { tag: "Bitcoin", volume: "590K tweets", trending: true },
      { tag: "Programming", volume: "480K tweets", trending: false },
      { tag: "MachineLearning", volume: "420K tweets", trending: true },
      { tag: "Cybersecurity", volume: "350K tweets", trending: false },
      { tag: "Web3", volume: "290K tweets", trending: true },
    ],
  },
  {
    name: "Entertainment",
    tags: [
      { tag: "Movies", volume: "980K tweets", trending: true },
      { tag: "Music", volume: "870K tweets", trending: true },
      { tag: "TV", volume: "720K tweets", trending: false },
      { tag: "Celebrity", volume: "650K tweets", trending: true },
      { tag: "Hollywood", volume: "520K tweets", trending: false },
      { tag: "Netflix", volume: "480K tweets", trending: true },
      { tag: "Gaming", volume: "430K tweets", trending: false },
      { tag: "Anime", volume: "380K tweets", trending: true },
    ],
  },
  {
    name: "Sports",
    tags: [
      { tag: "Football", volume: "1.1M tweets", trending: true },
      { tag: "Basketball", volume: "920K tweets", trending: true },
      { tag: "Soccer", volume: "850K tweets", trending: false },
      { tag: "NFL", volume: "780K tweets", trending: true },
      { tag: "NBA", volume: "720K tweets", trending: false },
      { tag: "MLB", volume: "580K tweets", trending: false },
      { tag: "Tennis", volume: "420K tweets", trending: true },
      { tag: "UFC", volume: "380K tweets", trending: false },
    ],
  },
]

// Mock weekly trending hashtags for Twitter
const WEEKLY_TRENDING = [
  { tag: "ElectionDay", volume: "2.5M tweets", growth: "+85%" },
  { tag: "ClimateAction", volume: "1.8M tweets", growth: "+62%" },
  { tag: "NewAlbum", volume: "1.5M tweets", growth: "+48%" },
  { tag: "SpaceX", volume: "1.2M tweets", growth: "+42%" },
  { tag: "Olympics", volume: "980K tweets", growth: "+35%" },
  { tag: "MondayMotivation", volume: "850K tweets", growth: "+28%" },
  { tag: "JobSearch", volume: "720K tweets", growth: "+22%" },
  { tag: "MentalHealth", volume: "650K tweets", growth: "+18%" },
]

// Mock conversations trending on Twitter
const CONVERSATIONS_TRENDING = [
  {
    topic: "Politics & Government",
    tags: [
      { tag: "Democracy", volume: "1.7M tweets" },
      { tag: "Election2024", volume: "1.5M tweets" },
      { tag: "VoterRights", volume: "980K tweets" },
    ],
  },
  {
    topic: "Business & Economy",
    tags: [
      { tag: "StockMarket", volume: "1.2M tweets" },
      { tag: "Inflation", volume: "950K tweets" },
      { tag: "JobMarket", volume: "780K tweets" },
    ],
  },
  {
    topic: "Science & Technology",
    tags: [
      { tag: "SpaceExploration", volume: "890K tweets" },
      { tag: "Robotics", volume: "720K tweets" },
      { tag: "ClimateScience", volume: "650K tweets" },
    ],
  },
  {
    topic: "Health & Wellness",
    tags: [
      { tag: "HealthcareTech", volume: "780K tweets" },
      { tag: "Nutrition", volume: "650K tweets" },
      { tag: "Mindfulness", volume: "520K tweets" },
    ],
  },
]

export function TwitterTrending() {
  const [activeCategory, setActiveCategory] = useState(TRENDING_CATEGORIES[0])
  const [activeTab, setActiveTab] = useState("categories")
  const [activeTopic, setActiveTopic] = useState(CONVERSATIONS_TRENDING[0])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const copyHashtags = (tags: Array<{ tag: string }>) => {
    const hashtagString = tags.map((t) => `#${t.tag}`).join(" ")
    navigator.clipboard.writeText(hashtagString)

    toast({
      title: "Hashtags copied!",
      description: "Trending hashtags have been copied to your clipboard.",
    })
  }

  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <div className="text-center py-8 text-gray-500">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <p className="mt-2">Loading trending hashtags data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="categories">
              <TrendingUp className="h-4 w-4 mr-2" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="weekly">
              <Calendar className="h-4 w-4 mr-2" />
              Weekly
            </TabsTrigger>
            <TabsTrigger value="conversations">
              <MessageCircle className="h-4 w-4 mr-2" />
              Conversations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-4 mt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {TRENDING_CATEGORIES.map((category) => (
                <Badge
                  key={category.name}
                  variant={activeCategory.name === category.name ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setActiveCategory(category)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeCategory.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-200"
                  >
                    <div className="flex items-center">
                      {tag.trending && <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />}
                      <span>#{tag.tag}</span>
                    </div>
                    <span className="text-xs text-gray-500">{tag.volume}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full" onClick={() => copyHashtags(activeCategory.tags)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy {activeCategory.name} Hashtags
              </Button>

              <p className="text-xs text-gray-500 mt-2">
                These hashtags are trending in the {activeCategory.name} category. Use them to increase your tweet's
                visibility.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4 mt-4">
            <h3 className="font-medium flex items-center">
              <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
              This Week's Fastest Growing Hashtags
            </h3>

            <div className="space-y-2">
              {WEEKLY_TRENDING.map((tag, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-200"
                >
                  <div className="flex items-center">
                    <span className="font-medium">#{tag.tag}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-2">{tag.volume}</span>
                    <span className="text-xs text-green-600 font-medium">{tag.growth}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full" onClick={() => copyHashtags(WEEKLY_TRENDING)}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Weekly Trending Hashtags
            </Button>

            <p className="text-xs text-gray-500 mt-2">
              These hashtags have shown significant growth in the past week. Consider using them in your tweets to join
              trending conversations.
            </p>
          </TabsContent>

          <TabsContent value="conversations" className="space-y-4 mt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {CONVERSATIONS_TRENDING.map((topic) => (
                <Badge
                  key={topic.topic}
                  variant={activeTopic.topic === topic.topic ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setActiveTopic(topic)}
                >
                  {topic.topic}
                </Badge>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium flex items-center">
                <MessageCircle className="h-4 w-4 text-blue-500 mr-2" />
                Conversations about {activeTopic.topic}
              </h3>

              <div className="space-y-2">
                {activeTopic.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-200"
                  >
                    <div className="flex items-center">
                      <span className="font-medium">#{tag.tag}</span>
                    </div>
                    <span className="text-xs text-gray-500">{tag.volume}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full" onClick={() => copyHashtags(activeTopic.tags)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy {activeTopic.topic} Hashtags
              </Button>

              <p className="text-xs text-gray-500 mt-2">
                These hashtags are driving conversations about {activeTopic.topic}. Use them to join relevant
                discussions.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
