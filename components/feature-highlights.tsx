"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, BarChart, TrendingUp, Zap, Globe, Lock } from "lucide-react"
import { motion } from "framer-motion"

export function FeatureHighlights() {
  const features = [
    {
      icon: <Sparkles className="h-10 w-10 text-indigo-500" />,
      title: "AI-Powered Tag Generation",
      description: "Generate optimized tags and hashtags using advanced AI algorithms tailored for each platform.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-purple-500" />,
      title: "Performance Analytics",
      description: "Analyze tag performance with detailed metrics to understand what works best for your content.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-pink-500" />,
      title: "Trending Topics",
      description: "Stay ahead with real-time trending topics and hashtags across all major platforms.",
    },
    {
      icon: <Zap className="h-10 w-10 text-amber-500" />,
      title: "Instant Results",
      description: "Get immediate tag suggestions with one click, saving you time and research effort.",
    },
    {
      icon: <Globe className="h-10 w-10 text-blue-500" />,
      title: "Multi-Platform Support",
      description: "Optimize content for YouTube, TikTok, and X (Twitter) all in one place.",
    },
    {
      icon: <Lock className="h-10 w-10 text-green-500" />,
      title: "100% Free Forever",
      description: "All features are completely free with no hidden costs, premium tiers, or paywalls.",
    },
  ]

  return (
    <section id="features" className="w-full py-8 md:py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-3 text-center mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">
              Powerful Features for Content Creators
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg">
              Everything you need to optimize your content and grow your audience across platforms
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-4">
                <CardHeader className="flex flex-col items-center text-center">
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-2">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
