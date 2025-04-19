"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TwitterGenerator } from "@/components/platforms/twitter/twitter-generator"
import { TwitterAnalyzer } from "@/components/platforms/twitter/twitter-analyzer"
import { TwitterTools } from "@/components/platforms/twitter/twitter-tools"
import { TwitterTrending } from "@/components/platforms/twitter/twitter-trending"
import { Sparkles, BarChart, Wrench, TrendingUp } from "lucide-react"

export function TwitterContent() {
  const [activeTab, setActiveTab] = useState("generator")

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">X (Twitter) Hashtag Optimizer</h2>
        <p className="text-muted-foreground">Generate and analyze the perfect hashtags for your tweets</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="generator" className="flex items-center gap-2 py-3">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Generator</span>
          </TabsTrigger>
          <TabsTrigger value="analyzer" className="flex items-center gap-2 py-3">
            <BarChart className="h-4 w-4" />
            <span className="hidden sm:inline">Analyzer</span>
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2 py-3">
            <Wrench className="h-4 w-4" />
            <span className="hidden sm:inline">Tools</span>
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-2 py-3">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Trending</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
          <TwitterGenerator />
        </TabsContent>

        <TabsContent value="analyzer" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
          <TwitterAnalyzer />
        </TabsContent>

        <TabsContent value="tools" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
          <TwitterTools />
        </TabsContent>

        <TabsContent value="trending" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
          <TwitterTrending />
        </TabsContent>
      </Tabs>
    </div>
  )
}
