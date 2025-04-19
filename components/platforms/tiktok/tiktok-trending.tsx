"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, TrendingUp, Calendar, FlameIcon as Fire, Globe } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock trending hashtags data for TikTok
const TRENDING_CATEGORIES = [
  {
    name: "Dance",
    tags: [
      { tag: "dance", views: "18.5B", trending: true },
      { tag: "dancechallenge", views: "9.2B", trending: true },
      { tag: "dancetutorial", views: "5.7B", trending: false },
      { tag: "choreography", views: "4.3B", trending: false },
      { tag: "dancer", views: "7.8B", trending: true },
      { tag: "danceroutine", views: "3.2B", trending: true },
      { tag: "dancemoves", views: "2.9B", trending: false },
      { tag: "dancevideo", views: "2.5B", trending: true },
    ],
  },
  {
    name: "Comedy",
    tags: [
      { tag: "funny", views: "15.7B", trending: true },
      { tag: "comedy", views: "12.3B", trending: true },
      { tag: "joke", views: "8.5B", trending: false },
      { tag: "prank", views: "7.2B", trending: true },
      { tag: "humor", views: "5.9B", trending: false },
      { tag: "funnyvideos", views: "4.8B", trending: true },
      { tag: "laughing", views: "3.6B", trending: false },
      { tag: "comedyskit", views: "2.9B", trending: true },
    ],
  },
  {
    name: "Beauty",
    tags: [
      { tag: "makeup", views: "14.2B", trending: true },
      { tag: "beauty", views: "11.8B", trending: true },
      { tag: "skincare", views: "9.3B", trending: true },
      { tag: "makeuphacks", views: "6.7B", trending: false },
      { tag: "makeuptutorial", views: "5.5B", trending: true },
      { tag: "beautyhacks", views: "4.2B", trending: false },
      { tag: "glammakeup", views: "3.8B", trending: false },
      { tag: "skincareroutine", views: "3.1B", trending: true },
    ],
  },
  {
    name: "Food",
    tags: [
      { tag: "food", views: "16.9B", trending: true },
      { tag: "recipe", views: "10.5B", trending: true },
      { tag: "cooking", views: "8.7B", trending: false },
      { tag: "foodie", views: "7.3B", trending: true },
      { tag: "easyrecipe", views: "5.8B", trending: true },
      { tag: "foodtiktok", views: "4.9B", trending: false },
      { tag: "homecooking", views: "3.7B", trending: false },
      { tag: "foodhacks", views: "3.2B", trending: true },
    ],
  },
]

// Mock weekly trending hashtags for TikTok
const WEEKLY_TRENDING = [
  { tag: "tiktoktrend", views: "25.7B", growth: "+52%" },
  { tag: "viraltiktok", views: "18.3B", growth: "+45%" },
  { tag: "summertiktok", views: "12.5B", growth: "+38%" },
  { tag: "tiktokmademebuyit", views: "9.8B", growth: "+32%" },
  { tag: "fyp", views: "45.2B", growth: "+28%" },
  { tag: "foryou", views: "38.7B", growth: "+25%" },
  { tag: "trending", views: "22.3B", growth: "+20%" },
  { tag: "viral", views: "19.8B", growth: "+18%" },
]

// Mock regional trending hashtags
const REGIONAL_TRENDING = [
  {
    region: "United States",
    tags: [
      { tag: "americantiktok", views: "8.7B" },
      { tag: "usatrend", views: "5.3B" },
      { tag: "americanlife", views: "4.2B" },
    ],
  },
  {
    region: "United Kingdom",
    tags: [
      { tag: "uktiktok", views: "6.5B" },
      { tag: "britishhumour", views: "4.8B" },
      { tag: "londonlife", views: "3.9B" },
    ],
  },
  {
    region: "India",
    tags: [
      { tag: "indiantiktok", views: "12.3B" },
      { tag: "bollywood", views: "9.7B" },
      { tag: "indianfood", views: "7.2B" },
    ],
  },
  {
    region: "Brazil",
    tags: [
      { tag: "braziltiktok", views: "7.8B" },
      { tag: "carnaval", views: "5.6B" },
      { tag: "samba", views: "4.3B" },
    ],
  },
]

export function TiktokTrending() {
  const [activeCategory, setActiveCategory] = useState(TRENDING_CATEGORIES[0])
  const [activeTab, setActiveTab] = useState("categories")
  const [activeRegion, setActiveRegion] = useState(REGIONAL_TRENDING[0])
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
              <Fire className="h-4 w-4 mr-2" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="weekly">
              <Calendar className="h-4 w-4 mr-2" />
              Weekly
            </TabsTrigger>
            <TabsTrigger value="regional">
              <Globe className="h-4 w-4 mr-2" />
              Regional
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
                      {tag.trending && <TrendingUp className="h-4 w-4 text-black mr-2" />}
                      <span>#{tag.tag}</span>
                    </div>
                    <span className="text-xs text-gray-500">{tag.views}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full" onClick={() => copyHashtags(activeCategory.tags)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy {activeCategory.name} Hashtags
              </Button>

              <p className="text-xs text-gray-500 mt-2">
                These hashtags are trending in the {activeCategory.name} category. Use them to increase your TikTok
                video's visibility.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4 mt-4">
            <h3 className="font-medium flex items-center">
              <TrendingUp className="h-4 w-4 text-black mr-2" />
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
                    <span className="text-xs text-gray-500 mr-2">{tag.views}</span>
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
              These hashtags have shown significant growth in the past week. Consider using them in your videos to
              capitalize on current trends.
            </p>
          </TabsContent>

          <TabsContent value="regional" className="space-y-4 mt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {REGIONAL_TRENDING.map((region) => (
                <Badge
                  key={region.region}
                  variant={activeRegion.region === region.region ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setActiveRegion(region)}
                >
                  {region.region}
                </Badge>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium flex items-center">
                <Globe className="h-4 w-4 text-black mr-2" />
                Trending in {activeRegion.region}
              </h3>

              <div className="space-y-2">
                {activeRegion.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-200"
                  >
                    <div className="flex items-center">
                      <span className="font-medium">#{tag.tag}</span>
                    </div>
                    <span className="text-xs text-gray-500">{tag.views}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full" onClick={() => copyHashtags(activeRegion.tags)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy {activeRegion.region} Hashtags
              </Button>

              <p className="text-xs text-gray-500 mt-2">
                These hashtags are trending in {activeRegion.region}. Use them to target viewers in this region.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
