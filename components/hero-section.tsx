"use client"

import { useState } from "react"
import { Youtube, Sparkles } from "lucide-react"
import { TikTokIcon } from "@/components/icons/tiktok-icon"
import { TwitterXIcon } from "@/components/icons/twitter-x-icon"
import { motion } from "framer-motion"

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="w-full py-4 md:py-6 lg:py-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 dark:from-indigo-950 dark:via-purple-950 dark:to-indigo-950">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-3 mx-auto w-fit">
            <Sparkles className="mr-1 h-3 w-3" />
            New AI-Powered Content Optimization
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 mb-4">
            Optimize Your Video Content with AI
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg mb-6">
            Generate compelling titles, descriptions, and optimized tags for YouTube, TikTok, and X. Boost your content's visibility and engagement across social media platforms. Completely free, no login required.
          </p>
          <div className="mt-2 bg-primary/10 rounded-md p-2 text-center mb-4">
            <p className="text-sm font-medium text-primary">
              Start using our tools right away - scroll down to explore our platform features!
            </p>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <p className="text-sm text-muted-foreground">Supports:</p>
            <div className="flex space-x-1.5">
              <Youtube className="h-4 w-4 text-youtube" />
              <TikTokIcon className="h-4 w-4 text-tiktok" />
              <TwitterXIcon className="h-4 w-4 text-twitter" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
