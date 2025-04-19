"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Search, CheckCircle, Info, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock function to generate TikTok hashtags based on input
const generateHashtags = (input: string): Array<{ tag: string; relevance: number; views?: string }> => {
  if (!input.trim()) return []

  // This is a simplified mock implementation
  // In a real app, this would call an API or use a more sophisticated algorithm
  const baseWords = input.toLowerCase().split(/\s+/)
  const tagsMap = new Map<string, { relevance: number; views?: string }>()

  // Add the input as a tag with high relevance
  tagsMap.set(input.toLowerCase().replace(/\s+/g, ""), {
    relevance: 95,
    views: randomViews(true),
  })

  // Add each word as a tag with medium relevance
  baseWords.forEach((word) => {
    if (word.length > 2) {
      tagsMap.set(word, {
        relevance: 75 + Math.floor(Math.random() * 15),
        views: randomViews(),
      })
    }
  })

  // Add some common TikTok-related tags with lower relevance
  tagsMap.set("fyp", { relevance: 90, views: "19.8B" })
  tagsMap.set("foryou", { relevance: 85, views: "15.2B" })
  tagsMap.set("foryoupage", { relevance: 80, views: "12.7B" })
  tagsMap.set("viral", { relevance: 75, views: "9.5B" })
  tagsMap.set("trending", { relevance: 70, views: "7.3B" })

  // Add topic-specific tags based on input keywords
  if (input.match(/dance|dancing|choreography/i)) {
    tagsMap.set("dance", { relevance: 90, views: "11.2B" })
    tagsMap.set("dancer", { relevance: 85, views: "8.7B" })
    tagsMap.set("dancechallenge", { relevance: 80, views: "6.3B" })
  }

  if (input.match(/food|recipe|cooking|bake|baking/i)) {
    tagsMap.set("food", { relevance: 90, views: "10.8B" })
    tagsMap.set("recipe", { relevance: 85, views: "7.9B" })
    tagsMap.set("cooking", { relevance: 80, views: "6.5B" })
    tagsMap.set("foodtiktok", { relevance: 75, views: "4.2B" })
  }

  if (input.match(/beauty|makeup|skincare/i)) {
    tagsMap.set("beauty", { relevance: 90, views: "9.7B" })
    tagsMap.set("makeup", { relevance: 85, views: "8.3B" })
    tagsMap.set("skincare", { relevance: 80, views: "6.1B" })
    tagsMap.set("beautyhacks", { relevance: 75, views: "3.8B" })
  }

  if (input.match(/comedy|funny|humor|joke/i)) {
    tagsMap.set("comedy", { relevance: 90, views: "12.5B" })
    tagsMap.set("funny", { relevance: 85, views: "11.1B" })
    tagsMap.set("humor", { relevance: 80, views: "5.7B" })
    tagsMap.set("joke", { relevance: 75, views: "4.9B" })
  }

  // Convert map to array and sort by relevance
  return Array.from(tagsMap.entries())
    .map(([tag, data]) => ({ tag, ...data }))
    .sort((a, b) => b.relevance - a.relevance)
}

// Helper function to generate random view counts
function randomViews(isHighRelevance = false): string {
  const magnitude = isHighRelevance
    ? Math.floor(Math.random() * 3)
    : // 0, 1, 2 (M, B, T)
      Math.floor(Math.random() * 4) // 0, 1, 2, 3 (K, M, B, T)oor(Math.random() * 4); // 0, 1, 2, 3 (K, M, B, T)

  const value = isHighRelevance
    ? (Math.random() * 9 + 1).toFixed(1)
    : // 1.0-9.9
      (Math.random() * 900 + 100).toFixed(0) // 100-999

  const suffix = magnitude === 0 ? "K" : magnitude === 1 ? "M" : magnitude === 2 ? "B" : "T"

  return value + suffix
}

export function TiktokGenerator() {
  const [input, setInput] = useState("")
  const [hashtags, setHashtags] = useState<Array<{ tag: string; relevance: number; views?: string }>>([])
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const MAX_HASHTAG_CHARS = 100 // TikTok's approximate character limit for hashtags

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
            placeholder="Enter TikTok video topic or keywords..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGenerate()
            }}
            className="flex-1"
          />
          <Button onClick={handleGenerate} disabled={!input.trim() || isLoading} className="bg-black hover:bg-gray-800">
            {isLoading ? "Generating..." : "Generate Hashtags"}
            {!isLoading && <Search className="ml-2 h-4 w-4" />}
          </Button>
        </div>

        {hashtags.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Generated Hashtags ({hashtags.length})</h3>
              <div className="text-xs text-gray-500">
                <span className={charCount > MAX_HASHTAG_CHARS ? "text-red-500 font-medium" : ""}>
                  {charCount} characters
                </span>
              </div>
            </div>

            {charCount > MAX_HASHTAG_CHARS && (
              <Alert variant="warning" className="bg-amber-50 text-amber-800 border-amber-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Too many hashtags</AlertTitle>
                <AlertDescription>
                  TikTok has a character limit for hashtags. Consider using fewer hashtags.
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
                          tag.relevance >= 90
                            ? "bg-green-100 text-green-800 border-green-300"
                            : tag.relevance >= 75
                              ? "bg-blue-100 text-blue-800 border-blue-300"
                              : "bg-yellow-100 text-yellow-800 border-yellow-300"
                        }`}
                      >
                        #{tag.tag}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Relevance: {tag.relevance}%</p>
                      {tag.views && <p>~{tag.views} views</p>}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleCopyHashtags} className="flex-1 bg-[#00f2ea] hover:bg-[#00d1ca] text-black">
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
                    .filter((_, i) => i < 5) // Only take top 5 to stay within limits
                    .map((t) => `#${t.tag}`)
                    .join(" ")
                  navigator.clipboard.writeText(selectedTags)
                  toast({
                    title: "Top 5 hashtags copied!",
                    description: "Top 5 hashtags have been copied to your clipboard.",
                  })
                }}
              >
                Copy Top 5 Only
              </Button>
            </div>

            <div className="bg-gray-50 p-3 rounded-md border border-gray-200 mt-4">
              <h4 className="font-medium text-sm mb-2 flex items-center">
                <Info className="h-4 w-4 mr-1 text-blue-500" />
                TikTok Hashtag Format
              </h4>
              <p className="text-xs text-gray-600 break-words">{hashtags.map((t) => `#${t.tag}`).join(" ")}</p>
            </div>
          </div>
        )}

        {hashtags.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            <p>Enter your TikTok video topic or keywords and click "Generate Hashtags"</p>
            <p className="text-sm mt-2">Example: "dance tutorial" or "cooking recipe"</p>
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
            <p className="mt-2">Analyzing and generating optimal TikTok hashtags...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
