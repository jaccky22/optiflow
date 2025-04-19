"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, CheckCircle, Sparkles, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

// Mock function to generate tweet suggestions
const generateTweets = (input: string): string[] => {
  if (!input.trim()) return []

  const baseTweet = input.trim()
  const currentYear = new Date().getFullYear()

  return [
    `Just shared my thoughts on ${baseTweet}. What's your take? #Discussion`,
    `${baseTweet.charAt(0).toUpperCase() + baseTweet.slice(1)} is changing the game in ${currentYear}. Here's why it matters 🧵`,
    `5 things you need to know about ${baseTweet}:`,
    `Hot take: ${baseTweet} isn't what most people think it is. Let me explain...`,
    `I've been researching ${baseTweet} for months, and here's what I've learned:`,
    `The truth about ${baseTweet} that nobody is talking about 👇`,
    `${baseTweet} explained in one tweet: simple, effective, and game-changing.`,
    `Unpopular opinion: ${baseTweet} is overrated. Here's why:`,
    `Just discovered this amazing resource about ${baseTweet}. Check it out!`,
    `Question for my network: How has ${baseTweet} impacted your work?`,
  ]
}

// Mock function to analyze tweet length and engagement
const analyzeTweet = (tweet: string) => {
  const length = tweet.length
  const maxLength = 280
  const remaining = maxLength - length

  // Calculate estimated engagement based on tweet length and content
  let engagement = 0

  // Tweets between 70-100 characters tend to get more engagement
  if (length >= 70 && length <= 100) {
    engagement = 85 + Math.floor(Math.random() * 15)
  } else if (length < 70) {
    engagement = 60 + Math.floor(Math.random() * 20)
  } else if (length <= 200) {
    engagement = 70 + Math.floor(Math.random() * 15)
  } else {
    engagement = 50 + Math.floor(Math.random() * 20)
  }

  // Boost engagement if tweet contains engagement triggers
  if (tweet.includes("?")) engagement += 5
  if (tweet.includes("#")) engagement += 3
  if (tweet.includes("!")) engagement += 2
  if (tweet.includes("🧵") || tweet.includes("👇")) engagement += 7

  // Cap at 100
  engagement = Math.min(engagement, 100)

  return {
    length,
    remaining,
    engagement,
    isOptimal: length >= 70 && length <= 240,
  }
}

export function TwitterTools() {
  const [activeTab, setActiveTab] = useState("tweet")
  const [tweetInput, setTweetInput] = useState("")
  const [tweetSuggestions, setTweetSuggestions] = useState<string[]>([])
  const [draftTweet, setDraftTweet] = useState("")
  const [tweetAnalysis, setTweetAnalysis] = useState<ReturnType<typeof analyzeTweet> | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedTweet, setCopiedTweet] = useState<number | null>(null)

  const handleGenerateTweets = () => {
    if (!tweetInput.trim()) return

    setIsGenerating(true)

    // Simulate API delay
    setTimeout(() => {
      const suggestions = generateTweets(tweetInput)
      setTweetSuggestions(suggestions)
      setIsGenerating(false)
    }, 800)
  }

  const copyTweet = (index: number) => {
    navigator.clipboard.writeText(tweetSuggestions[index])
    setCopiedTweet(index)

    toast({
      title: "Tweet copied!",
      description: "Tweet has been copied to your clipboard.",
    })

    setTimeout(() => setCopiedTweet(null), 2000)
  }

  const handleDraftChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDraft = e.target.value
    setDraftTweet(newDraft)
    setTweetAnalysis(analyzeTweet(newDraft))
  }

  const getEngagementColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getRemainingColor = (remaining: number) => {
    if (remaining < 0) return "text-red-600"
    if (remaining < 20) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tweet">Tweet Generator</TabsTrigger>
            <TabsTrigger value="analyzer">Tweet Analyzer</TabsTrigger>
          </TabsList>

          <TabsContent value="tweet" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Input
                placeholder="Enter your tweet topic..."
                value={tweetInput}
                onChange={(e) => setTweetInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleGenerateTweets()
                }}
              />
              <Button
                onClick={handleGenerateTweets}
                disabled={!tweetInput.trim() || isGenerating}
                className="w-full bg-[#1DA1F2] hover:bg-[#1a94df]"
              >
                {isGenerating ? "Generating..." : "Generate Tweet Ideas"}
                {!isGenerating && <Sparkles className="ml-2 h-4 w-4" />}
              </Button>
            </div>

            {tweetSuggestions.length > 0 && (
              <div className="space-y-2 mt-4">
                <h3 className="font-medium">Tweet Suggestions:</h3>
                <ul className="space-y-2">
                  {tweetSuggestions.map((tweet, index) => (
                    <li
                      key={index}
                      className="p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 flex justify-between items-center group"
                    >
                      <span>{tweet}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyTweet(index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedTweet === index ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500">Click on a tweet to copy it</p>
              </div>
            )}

            {tweetSuggestions.length === 0 && !isGenerating && (
              <div className="text-center py-8 text-gray-500">
                <p>Enter your topic to generate engaging tweet ideas</p>
                <p className="text-sm mt-2">Example: "artificial intelligence" or "remote work"</p>
              </div>
            )}

            {isGenerating && (
              <div className="text-center py-8 text-gray-500">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
                <p className="mt-2">Generating engaging tweet ideas...</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analyzer" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Draft your tweet here to analyze its potential engagement..."
                value={draftTweet}
                onChange={handleDraftChange}
                rows={4}
                maxLength={280}
              />

              {tweetAnalysis && (
                <div className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className={getRemainingColor(tweetAnalysis.remaining)}>
                        {tweetAnalysis.remaining < 0 ? "Exceeded by " : ""}
                        {Math.abs(tweetAnalysis.remaining)} characters
                        {tweetAnalysis.remaining >= 0 ? " remaining" : ""}
                      </span>
                    </div>
                    <div className="text-sm">{tweetAnalysis.length}/280 characters</div>
                  </div>

                  <Progress
                    value={(tweetAnalysis.length / 280) * 100}
                    className={`h-2 ${tweetAnalysis.remaining < 0 ? "bg-red-200" : ""}`}
                  />

                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                    <h4 className="font-medium text-sm mb-2">Tweet Analysis</h4>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Estimated Engagement</span>
                        <span className={`font-medium ${getEngagementColor(tweetAnalysis.engagement)}`}>
                          {tweetAnalysis.engagement}/100
                        </span>
                      </div>

                      <Progress value={tweetAnalysis.engagement} className="h-2" />

                      {tweetAnalysis.isOptimal ? (
                        <Alert className="bg-green-50 border-green-200 mt-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <AlertTitle className="text-green-800">Optimal Length</AlertTitle>
                          <AlertDescription className="text-xs text-green-700">
                            Your tweet is within the optimal length range for maximum engagement.
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <Alert className="bg-yellow-50 border-yellow-200 mt-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <AlertTitle className="text-yellow-800">Length Optimization</AlertTitle>
                          <AlertDescription className="text-xs text-yellow-700">
                            Tweets between 70-100 characters typically get the most engagement.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {!draftTweet && (
              <div className="text-center py-8 text-gray-500">
                <p>Draft your tweet above to analyze its potential engagement</p>
                <p className="text-sm mt-2">We'll provide feedback on length, readability, and engagement potential</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
