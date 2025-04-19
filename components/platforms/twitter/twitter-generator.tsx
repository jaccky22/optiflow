"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Search, CheckCircle, Info } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock function to generate Twitter hashtags based on input
const generateHashtags = (input: string): Array<{ tag: string; relevance: number; engagement?: string }> => {
  if (!input.trim()) return []

  // This is a simplified mock implementation
  // In a real app, this would call an API or use a more sophisticated algorithm
  const baseWords = input.toLowerCase().split(/\s+/)
  const tagsMap = new Map<string, { relevance: number; engagement?: string }>()

  // Add the input as a tag with high relevance
  const mainTag = input.toLowerCase().replace(/\s+/g, "")
  if (mainTag.length <= 20) {
    // Twitter hashtag length limit
    tagsMap.set(mainTag, {
      relevance: 95,
      engagement: randomEngagement(true),
    })
  }

  // Add each word as a tag with medium relevance
  baseWords.forEach((word) => {
    if (word.length > 2 && word.length <= 20) {
      tagsMap.set(word, {
        relevance: 75 + Math.floor(Math.random() * 15),
        engagement: randomEngagement(),
      })
    }
  })

  // Add some common Twitter-related tags with lower relevance
  tagsMap.set("Twitter", { relevance: 60, engagement: "High" })
  tagsMap.set("Tweet", { relevance: 55, engagement: "Medium" })

  // Add topic-specific tags based on input keywords
  if (input.match(/tech|technology|digital|ai|software/i)) {
    tagsMap.set("Tech", { relevance: 90, engagement: "High" })
    tagsMap.set("Technology", { relevance: 85, engagement: "High" })
    tagsMap.set("Innovation", { relevance: 80, engagement: "Medium" })
    tagsMap.set("AI", { relevance: 85, engagement: "High" })
  }

  if (input.match(/business|entrepreneur|startup|marketing/i)) {
    tagsMap.set("Business", { relevance: 90, engagement: "High" })
    tagsMap.set("Entrepreneur", { relevance: 85, engagement: "Medium" })
    tagsMap.set("Marketing", { relevance: 80, engagement: "Medium" })
    tagsMap.set("Startup", { relevance: 75, engagement: "Medium" })
  }

  if (input.match(/news|politics|world|current/i)) {
    tagsMap.set("News", { relevance: 90, engagement: "High" })
    tagsMap.set("Politics", { relevance: 85, engagement: "High" })
    tagsMap.set("WorldNews", { relevance: 80, engagement: "Medium" })
    tagsMap.set("Breaking", { relevance: 75, engagement: "High" })
  }

  if (input.match(/sports|football|basketball|soccer|nfl|nba/i)) {
    tagsMap.set("Sports", { relevance: 90, engagement: "High" })
    tagsMap.set("Football", { relevance: 85, engagement: "High" })
    tagsMap.set("NBA", { relevance: 80, engagement: "High" })
    tagsMap.set("Soccer", { relevance: 75, engagement: "Medium" })
  }

  // Convert map to array and sort by relevance
  return Array.from(tagsMap.entries())
    .map(([tag, data]) => ({ tag, ...data }))
    .sort((a, b) => b.relevance - a.relevance)
}

// Helper function to generate random engagement levels
function randomEngagement(isHighRelevance = false): string {
  const rand = Math.random()
  if (isHighRelevance) {
    return rand > 0.3 ? "High" : "Medium"
  } else {
    return rand > 0.7 ? "High" : rand > 0.3 ? "Medium" : "Low"
  }
}

export function TwitterGenerator() {
  const [input, setInput] = useState("")
  const [hashtags, setHashtags] = useState<Array<{ tag: string; relevance: number; engagement?: string }>>([])
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const MAX_TWEET_CHARS = 280
  const RECOMMENDED_HASHTAG_COUNT = 2

  const handleGenerate = () => {
    if (!input.trim()) return

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const generatedHashtags = generateHashtags(input)
      setHashtags(generatedHashtags)
      setIsLoading(false)

      // Calculate total character count
      const totalChars = generatedHashtags.reduce((acc, tag) => acc + tag.tag.length + 1, 0) // +1 for the # symbol
      setCharCount(totalChars)
    }, 800)
  }

  const handleCopyHashtags = () => {
    const hashtagString = hashtags.map((t) => `#${t.tag}`).join(" ")
    navigator.clipboard.writeText(hashtagString)
    setCopied(true)

    toast({
      title: "Hashtags copied!",
      description: "Hashtags have been copied to your clipboard.",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-2 mb-6">
          <Input
            placeholder="Enter tweet topic or keywords..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGenerate()
            }}
            className="flex-1"
          />
          <Button
            onClick={handleGenerate}
            disabled={!input.trim() || isLoading}
            className="bg-[#1DA1F2] hover:bg-[#1a94df]"
          >
            {isLoading ? "Generating..." : "Generate Hashtags"}
            {!isLoading && <Search className="ml-2 h-4 w-4" />}
          </Button>
        </div>

        {hashtags.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Generated Hashtags ({hashtags.length})</h3>
              <div className="text-xs text-gray-500">
                <span>Recommended: {RECOMMENDED_HASHTAG_COUNT} hashtags per tweet</span>
              </div>
            </div>

            {hashtags.length > RECOMMENDED_HASHTAG_COUNT && (
              <Alert variant="warning" className="bg-blue-50 text-blue-800 border-blue-200">
                <Info className="h-4 w-4" />
                <AlertTitle>X (Twitter) Best Practices</AlertTitle>
                <AlertDescription>
                  For best engagement on X, use only {RECOMMENDED_HASHTAG_COUNT}-3 hashtags per tweet. We recommend
                  selecting the most relevant ones.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {hashtags.map((tag, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge
                        variant="outline"
                        className={`text-sm py-1 cursor-default ${
                          index < RECOMMENDED_HASHTAG_COUNT
                            ? "bg-blue-100 text-blue-800 border-blue-300"
                            : "bg-gray-100 text-gray-800 border-gray-300"
                        }`}
                      >
                        #{tag.tag}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Relevance: {tag.relevance}%</p>
                      {tag.engagement && <p>Engagement: {tag.engagement}</p>}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleCopyHashtags} className="flex-1 bg-[#1DA1F2] hover:bg-[#1a94df]">
                {copied ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy All Hashtags
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  const selectedTags = hashtags
                    .filter((_, i) => i < RECOMMENDED_HASHTAG_COUNT)
                    .map((t) => `#${t.tag}`)
                    .join(" ")
                  navigator.clipboard.writeText(selectedTags)
                  toast({
                    title: "Top hashtags copied!",
                    description: `Top ${RECOMMENDED_HASHTAG_COUNT} hashtags have been copied to your clipboard.`,
                  })
                }}
              >
                Copy Top {RECOMMENDED_HASHTAG_COUNT} Only
              </Button>
            </div>

            <div className="bg-gray-50 p-3 rounded-md border border-gray-200 mt-4">
              <h4 className="font-medium text-sm mb-2 flex items-center">
                <Info className="h-4 w-4 mr-1 text-blue-500" />X (Twitter) Hashtag Format
              </h4>
              <p className="text-xs text-gray-600 break-words">{hashtags.map((t) => `#${t.tag}`).join(" ")}</p>
            </div>
          </div>
        )}

        {hashtags.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            <p>Enter your tweet topic or keywords and click "Generate Hashtags"</p>
            <p className="text-sm mt-2">Example: "tech news" or "sports update"</p>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-8 text-gray-500">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <p className="mt-2">Analyzing and generating optimal X (Twitter) hashtags...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
