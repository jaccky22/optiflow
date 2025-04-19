"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Search, CheckCircle, Info, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"

// Mock function to generate tags based on input
const generateTags = (input: string): Array<{ tag: string; relevance: number }> => {
  if (!input.trim()) return []

  // This is a simplified mock implementation
  // In a real app, this would call an API or use a more sophisticated algorithm
  const baseWords = input.toLowerCase().split(/\s+/)
  const tagsMap = new Map<string, number>()

  // Add the input as a tag with high relevance
  tagsMap.set(input.toLowerCase(), 95)

  // Add each word as a tag with medium relevance
  baseWords.forEach((word) => {
    if (word.length > 2) tagsMap.set(word, 75 + Math.floor(Math.random() * 15))
  })

  // Add some common YouTube-related tags with lower relevance
  tagsMap.set("youtube", 60 + Math.floor(Math.random() * 10))
  tagsMap.set("video", 55 + Math.floor(Math.random() * 10))

  // Add combinations with high relevance
  if (baseWords.length > 1) {
    for (let i = 0; i < baseWords.length - 1; i++) {
      const combo = `${baseWords[i]} ${baseWords[i + 1]}`
      tagsMap.set(combo, 85 + Math.floor(Math.random() * 10))
    }
  }

  // Add some topic-specific tags based on input keywords
  if (input.match(/gaming|game|play/i)) {
    tagsMap.set("gaming", 90 + Math.floor(Math.random() * 10))
    tagsMap.set("gameplay", 85 + Math.floor(Math.random() * 10))
    tagsMap.set("gamer", 80 + Math.floor(Math.random() * 10))
    tagsMap.set("videogames", 75 + Math.floor(Math.random() * 10))
    tagsMap.set("lets play", 70 + Math.floor(Math.random() * 10))
  }

  if (input.match(/tutorial|how to|guide|learn/i)) {
    tagsMap.set("tutorial", 90 + Math.floor(Math.random() * 10))
    tagsMap.set("how to", 85 + Math.floor(Math.random() * 10))
    tagsMap.set("guide", 80 + Math.floor(Math.random() * 10))
    tagsMap.set("tips", 75 + Math.floor(Math.random() * 10))
    tagsMap.set("tricks", 70 + Math.floor(Math.random() * 10))
    tagsMap.set("learn", 65 + Math.floor(Math.random() * 10))
  }

  if (input.match(/review|unboxing/i)) {
    tagsMap.set("review", 90 + Math.floor(Math.random() * 10))
    tagsMap.set("product review", 85 + Math.floor(Math.random() * 10))
    tagsMap.set("unboxing", 80 + Math.floor(Math.random() * 10))
    tagsMap.set("first look", 75 + Math.floor(Math.random() * 10))
  }

  if (input.match(/vlog|daily|life/i)) {
    tagsMap.set("vlog", 90 + Math.floor(Math.random() * 10))
    tagsMap.set("daily vlog", 85 + Math.floor(Math.random() * 10))
    tagsMap.set("lifestyle", 80 + Math.floor(Math.random() * 10))
    tagsMap.set("day in the life", 75 + Math.floor(Math.random() * 10))
  }

  // Convert map to array and sort by relevance
  return Array.from(tagsMap.entries())
    .map(([tag, relevance]) => ({ tag, relevance }))
    .sort((a, b) => b.relevance - a.relevance)
}

export function YoutubeGenerator() {
  const [input, setInput] = useState("")
  const [tags, setTags] = useState<Array<{ tag: string; relevance: number }>>([])
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = () => {
    if (!input.trim()) return

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const generatedTags = generateTags(input)
      setTags(generatedTags)
      setIsLoading(false)
    }, 800)
  }

  const handleCopyTags = () => {
    const tagString = tags.map((t) => t.tag).join(", ")
    navigator.clipboard.writeText(tagString)
    setCopied(true)

    toast({
      title: "Tags copied!",
      description: "Tags have been copied to your clipboard.",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 90) return "tag-relevance-high"
    if (relevance >= 75) return "tag-relevance-medium"
    return "tag-relevance-low"
  }

  return (
    <Card className="shadow-sm border-youtube/20">
      <CardHeader className="pb-3">
        <CardTitle>YouTube Tag Generator</CardTitle>
        <CardDescription>
          Generate optimized tags for your YouTube videos to improve visibility and search ranking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <Input
            placeholder="Enter video title or keywords..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGenerate()
            }}
            className="flex-1 focus-ring"
            aria-label="Video title or keywords"
          />
          <Button
            onClick={handleGenerate}
            disabled={!input.trim() || isLoading}
            className="bg-youtube hover:bg-youtube/90 text-youtube-foreground focus-ring"
            aria-label="Generate tags"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Generate Tags
                <Search className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {tags.length > 0 && !isLoading && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Generated Tags ({tags.length})</h3>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="mr-1">Tag relevance:</span>
                  <span className="inline-block w-3 h-3 rounded-full bg-green-500 dark:bg-green-400 mr-1"></span>
                  <span className="mr-2">High</span>
                  <span className="inline-block w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400 mr-1"></span>
                  <span className="mr-2">Medium</span>
                  <span className="inline-block w-3 h-3 rounded-full bg-amber-500 dark:bg-amber-400 mr-1"></span>
                  <span>Low</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4 custom-scrollbar max-h-[200px] overflow-y-auto p-1">
                {tags.map((tag, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className={`tag-badge ${getRelevanceColor(tag.relevance)}`}>
                          {tag.tag}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="tooltip-enter tooltip-enter-active">
                        <p>Relevance: {tag.relevance}%</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={handleCopyTags}
                  className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white focus-ring"
                  aria-label="Copy all tags"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy All Tags
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 focus-ring"
                  onClick={() => {
                    const tagString = tags.map((t) => t.tag).join(", ")
                    navigator.clipboard.writeText(tagString)
                    toast({
                      title: "Raw tags copied!",
                      description: "Raw tag string has been copied to your clipboard.",
                    })
                  }}
                  aria-label="Copy as text"
                >
                  Copy as Text
                </Button>
              </div>

              <div className="bg-muted p-3 rounded-md border mt-4">
                <h4 className="font-medium text-sm mb-2 flex items-center">
                  <Info className="h-4 w-4 mr-1 text-blue-500" />
                  YouTube Tag Format
                </h4>
                <p className="text-xs text-muted-foreground break-words font-mono">
                  {tags.map((t) => t.tag).join(", ")}
                </p>
              </div>
            </motion.div>
          )}

          {tags.length === 0 && !isLoading && (
            <motion.div
              className="text-center py-8 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p>Enter your video title or keywords and click "Generate Tags"</p>
              <p className="text-sm mt-2">Example: "How to make a delicious chocolate cake tutorial"</p>
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              className="text-center py-8 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="loading-dots inline-flex">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p className="mt-4">Analyzing and generating optimal YouTube tags...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between items-center text-xs text-muted-foreground">
        <span>YouTube recommends 10-15 relevant tags per video</span>
        <span>Updated April 2025</span>
      </CardFooter>
    </Card>
  )
}
