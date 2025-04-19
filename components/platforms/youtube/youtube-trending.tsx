"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, TrendingUp, Calendar, FlameIcon as Fire } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock trending tags data
const TRENDING_CATEGORIES = [
  {
    name: "Gaming",
    tags: [
      { tag: "minecraft", volume: 8500, trending: true },
      { tag: "fortnite", volume: 7200, trending: true },
      { tag: "roblox", volume: 6800, trending: true },
      { tag: "call of duty", volume: 5900, trending: false },
      { tag: "gaming", volume: 5500, trending: false },
      { tag: "valorant", volume: 4800, trending: true },
      { tag: "gta 5", volume: 4200, trending: false },
      { tag: "apex legends", volume: 3900, trending: true },
    ],
  },
  {
    name: "Technology",
    tags: [
      { tag: "iphone 15", volume: 9200, trending: true },
      { tag: "android", volume: 6100, trending: false },
      { tag: "tech review", volume: 5400, trending: false },
      { tag: "unboxing", volume: 4800, trending: true },
      { tag: "tech tips", volume: 4200, trending: false },
      { tag: "ai", volume: 7500, trending: true },
      { tag: "smartphone", volume: 3800, trending: false },
      { tag: "computer", volume: 3500, trending: false },
    ],
  },
  {
    name: "Lifestyle",
    tags: [
      { tag: "vlog", volume: 7800, trending: true },
      { tag: "day in my life", volume: 6500, trending: true },
      { tag: "morning routine", volume: 5900, trending: false },
      { tag: "productivity", volume: 5200, trending: true },
      { tag: "self care", volume: 4800, trending: true },
      { tag: "lifestyle", volume: 4500, trending: false },
      { tag: "organization", volume: 3900, trending: false },
      { tag: "minimalism", volume: 3600, trending: true },
    ],
  },
  {
    name: "Education",
    tags: [
      { tag: "tutorial", volume: 8900, trending: false },
      { tag: "how to", volume: 8200, trending: false },
      { tag: "learn", volume: 6800, trending: false },
      { tag: "tips and tricks", volume: 6200, trending: true },
      { tag: "guide", volume: 5500, trending: false },
      { tag: "educational", volume: 4900, trending: false },
      { tag: "study with me", volume: 4500, trending: true },
      { tag: "online course", volume: 4100, trending: true },
    ],
  },
]

// Mock weekly trending tags
const WEEKLY_TRENDING = [
  { tag: "ai tools", volume: 12500, growth: "+45%" },
  { tag: "chatgpt tutorial", volume: 9800, growth: "+38%" },
  { tag: "summer vacation", volume: 8700, growth: "+25%" },
  { tag: "iphone 15 review", volume: 7900, growth: "+22%" },
  { tag: "viral tiktok", volume: 7200, growth: "+18%" },
  { tag: "home workout", volume: 6500, growth: "+15%" },
  { tag: "passive income", volume: 6100, growth: "+12%" },
  { tag: "coding challenge", volume: 5800, growth: "+10%" },
]

export function YoutubeTrending() {
  const [activeCategory, setActiveCategory] = useState(TRENDING_CATEGORIES[0])
  const [activeTab, setActiveTab] = useState("categories")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const copyTags = (tags: Array<{ tag: string }>) => {
    const tagString = tags.map((t) => t.tag).join(", ")
    navigator.clipboard.writeText(tagString)

    toast({
      title: "Tags copied!",
      description: "Trending tags have been copied to your clipboard.",
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
            <p className="mt-2">Loading trending tags data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="categories">
              <Fire className="h-4 w-4 mr-2" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="weekly">
              <Calendar className="h-4 w-4 mr-2" />
              Weekly Trends
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
                      {tag.trending && <TrendingUp className="h-4 w-4 text-red-500 mr-2" />}
                      <span>{tag.tag}</span>
                    </div>
                    <span className="text-xs text-gray-500">{tag.volume.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full" onClick={() => copyTags(activeCategory.tags)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy {activeCategory.name} Tags
              </Button>

              <p className="text-xs text-gray-500 mt-2">
                These tags are trending in the {activeCategory.name} category. Use them to increase your video's
                visibility.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4 mt-4">
            <h3 className="font-medium flex items-center">
              <TrendingUp className="h-4 w-4 text-red-500 mr-2" />
              This Week's Fastest Growing Tags
            </h3>

            <div className="space-y-2">
              {WEEKLY_TRENDING.map((tag, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-200"
                >
                  <div className="flex items-center">
                    <span className="font-medium">{tag.tag}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-2">{tag.volume.toLocaleString()}</span>
                    <span className="text-xs text-green-600 font-medium">{tag.growth}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full" onClick={() => copyTags(WEEKLY_TRENDING)}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Weekly Trending Tags
            </Button>

            <p className="text-xs text-gray-500 mt-2">
              These tags have shown significant growth in the past week. Consider using them in your videos to
              capitalize on current trends.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
