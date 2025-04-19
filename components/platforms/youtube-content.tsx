"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { YoutubeGenerator } from "@/components/platforms/youtube/youtube-generator"
import { YoutubeAnalyzer } from "@/components/platforms/youtube/youtube-analyzer"
import { YoutubeTools } from "@/components/platforms/youtube/youtube-tools"
import { YoutubeTrending } from "@/components/platforms/youtube/youtube-trending"
import { Sparkles, BarChart, Wrench, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export function YoutubeContent() {
  const [activeTab, setActiveTab] = useState("generator")

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-youtube">YouTube Tag Optimizer</h2>
        <p className="text-muted-foreground">Generate and analyze the perfect tags for your YouTube videos</p>
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

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="generator" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
            <YoutubeGenerator />
          </TabsContent>

          <TabsContent value="analyzer" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
            <YoutubeAnalyzer />
          </TabsContent>

          <TabsContent value="tools" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
            <YoutubeTools />
          </TabsContent>

          <TabsContent value="trending" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
            <YoutubeTrending />
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  )
}
