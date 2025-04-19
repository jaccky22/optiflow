"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { YoutubeContent } from "@/components/platforms/youtube-content"
import { TiktokContent } from "@/components/platforms/tiktok-content"
import { TwitterContent } from "@/components/platforms/twitter-content"
import { Youtube, TrendingUp } from "lucide-react"
import { TikTokIcon } from "@/components/icons/tiktok-icon"
import { TwitterXIcon } from "@/components/icons/twitter-x-icon"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { AdSense } from "@/components/adsense/AdSense"

export function PlatformTabs() {
  const [activeTab, setActiveTab] = useState("youtube")

  return (
    <section id="platforms" className="w-full">
      <AdSense
        adClient="ca-pub-5760370419762495"
        adSlot="4855988487"
        adFormat="auto"
        className="mb-8"
      />
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 mb-1">Platform Tools</h2>
            <p className="text-base text-muted-foreground mt-1">Optimize your content for each platform with specialized tools</p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="grid w-full sm:w-auto grid-cols-3 h-auto p-1 rounded-lg bg-muted/50">
              <TabsTrigger
                value="youtube"
                className={`flex items-center gap-2 platform-tab-youtube data-[state=active]:shadow-sm py-1.5 px-3 rounded-lg transition-all duration-200 
                  ${activeTab === 'youtube' ? 'bg-red-500/10 text-red-600' : 'hover:bg-red-500/5 hover:text-red-600'}`}
              >
                <Youtube className={`h-4 w-4 ${activeTab === 'youtube' ? 'text-red-600' : 'text-red-500/80'}`} />
                <span className="hidden sm:inline">YouTube</span>
              </TabsTrigger>
              <TabsTrigger
                value="tiktok"
                className={`flex items-center gap-2 platform-tab-tiktok data-[state=active]:shadow-sm py-1.5 px-3 rounded-lg transition-all duration-200 
                  ${activeTab === 'tiktok' ? 'bg-pink-500/10 text-pink-600' : 'hover:bg-pink-500/5 hover:text-pink-600'}`}
              >
                <TikTokIcon className={`h-4 w-4 ${activeTab === 'tiktok' ? 'text-pink-600' : 'text-pink-500/80'}`} />
                <span className="hidden sm:inline">TikTok</span>
              </TabsTrigger>
              <TabsTrigger
                value="twitter"
                className={`flex items-center gap-2 platform-tab-twitter data-[state=active]:shadow-sm py-1.5 px-3 rounded-lg transition-all duration-200 
                  ${activeTab === 'twitter' ? 'bg-blue-500/10 text-blue-600' : 'hover:bg-blue-500/5 hover:text-blue-600'}`}
              >
                <TwitterXIcon className={`h-4 w-4 ${activeTab === 'twitter' ? 'text-blue-600' : 'text-blue-500/80'}`} />
                <span className="hidden sm:inline">X (Twitter)</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Card
          className="border-t-4 transition-all duration-300 ease-in-out overflow-hidden shadow-sm"
          style={{
            borderTopColor:
              activeTab === "youtube"
                ? "hsl(var(--youtube))"
                : activeTab === "tiktok"
                  ? "hsl(var(--tiktok))"
                  : "hsl(var(--twitter))",
          }}
        >
          <div className="p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Tabs value={activeTab} className="w-full">
                  <TabsContent value="youtube" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                    <YoutubeContent />
                  </TabsContent>
                  <TabsContent value="tiktok" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                    <TiktokContent />
                  </TabsContent>
                  <TabsContent value="twitter" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                    <TwitterContent />
                  </TabsContent>
                </Tabs>
              </motion.div>
            </AnimatePresence>
          </div>
        </Card>

        <div className="mt-4 flex items-center justify-center">
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 rounded-lg bg-accent/50">
            <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Updated with latest trends</span>
          </Badge>
        </div>
      </div>
    </section>
  )
}
