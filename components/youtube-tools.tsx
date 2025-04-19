"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, CheckCircle, Sparkles } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock function to generate title suggestions
const generateTitles = (input: string): string[] => {
  if (!input.trim()) return []

  const baseTitle = input.trim()
  const currentYear = new Date().getFullYear()

  return [
    `How to ${baseTitle} - Complete Guide (${currentYear})`,
    `${baseTitle.charAt(0).toUpperCase() + baseTitle.slice(1)} Tutorial for Beginners`,
    `The Ultimate ${baseTitle} Guide in ${currentYear}`,
    `${baseTitle} - Tips and Tricks You Need to Know`,
    `Why ${baseTitle} is Important for Your Channel`,
    `${baseTitle} Masterclass - From Beginner to Pro`,
    `${baseTitle} Explained in 5 Minutes`,
    `Top 10 ${baseTitle} Techniques That Actually Work`,
    `${baseTitle} - What No One Tells You`,
    `${baseTitle} Secrets Revealed`,
  ]
}

// Mock function to generate description
const generateDescription = (input: string): string => {
  if (!input.trim()) return ""

  const baseDesc = input.trim()
  const currentYear = new Date().getFullYear()

  return `
🔍 ${baseDesc.charAt(0).toUpperCase() + baseDesc.slice(1)}

In this video, I'll show you everything you need to know about ${baseDesc}. Whether you're a beginner or looking to improve your skills, this guide has you covered.

⏱️ TIMESTAMPS:
00:00 - Introduction
01:30 - Getting Started
04:45 - Essential Tips
08:20 - Advanced Techniques
12:15 - Common Mistakes to Avoid
15:30 - Conclusion

🔥 KEY POINTS COVERED:
- Complete step-by-step guide for ${baseDesc}
- Tips and tricks to improve your results
- Common mistakes to avoid
- Advanced techniques for experienced users
- Latest updates for ${currentYear}

📌 RESOURCES MENTIONED:
- Website: https://example.com
- Free Guide: https://example.com/guide
- Tools: https://example.com/tools

If you found this video helpful, please give it a LIKE 👍 and SUBSCRIBE to the channel for more content like this! Hit the notification bell 🔔 to be notified when I upload new videos.

💬 COMMENT below with your questions or experiences with ${baseDesc}. I'd love to hear from you!

#${baseDesc.replace(/\s+/g, "")} #Tutorial #HowTo #Guide #YouTube
  `.trim()
}

export function YoutubeTools() {
  const [activeTab, setActiveTab] = useState("title")
  const [titleInput, setTitleInput] = useState("")
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([])
  const [descInput, setDescInput] = useState("")
  const [generatedDesc, setGeneratedDesc] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedTitle, setCopiedTitle] = useState<number | null>(null)
  const [copiedDesc, setCopiedDesc] = useState(false)

  const handleGenerateTitles = () => {
    if (!titleInput.trim()) return

    setIsGenerating(true)

    // Simulate API delay
    setTimeout(() => {
      const suggestions = generateTitles(titleInput)
      setTitleSuggestions(suggestions)
      setIsGenerating(false)
    }, 800)
  }

  const handleGenerateDescription = () => {
    if (!descInput.trim()) return

    setIsGenerating(true)

    // Simulate API delay
    setTimeout(() => {
      const description = generateDescription(descInput)
      setGeneratedDesc(description)
      setIsGenerating(false)
    }, 1000)
  }

  const copyTitle = (index: number) => {
    navigator.clipboard.writeText(titleSuggestions[index])
    setCopiedTitle(index)

    toast({
      title: "Title copied!",
      description: "Title has been copied to your clipboard.",
    })

    setTimeout(() => setCopiedTitle(null), 2000)
  }

  const copyDescription = () => {
    navigator.clipboard.writeText(generatedDesc)
    setCopiedDesc(true)

    toast({
      title: "Description copied!",
      description: "Description has been copied to your clipboard.",
    })

    setTimeout(() => setCopiedDesc(false), 2000)
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="title">Title Generator</TabsTrigger>
            <TabsTrigger value="description">Description Generator</TabsTrigger>
          </TabsList>

          <TabsContent value="title" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Input
                placeholder="Enter your video topic..."
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleGenerateTitles()
                }}
              />
              <Button
                onClick={handleGenerateTitles}
                disabled={!titleInput.trim() || isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isGenerating ? "Generating..." : "Generate Title Ideas"}
                {!isGenerating && <Sparkles className="ml-2 h-4 w-4" />}
              </Button>
            </div>

            {titleSuggestions.length > 0 && (
              <div className="space-y-2 mt-4">
                <h3 className="font-medium">Title Suggestions:</h3>
                <ul className="space-y-2">
                  {titleSuggestions.map((title, index) => (
                    <li
                      key={index}
                      className="p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 flex justify-between items-center group"
                    >
                      <span>{title}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyTitle(index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedTitle === index ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500">Click on a title to copy it</p>
              </div>
            )}

            {titleSuggestions.length === 0 && !isGenerating && (
              <div className="text-center py-8 text-gray-500">
                <p>Enter your video topic to generate engaging title ideas</p>
                <p className="text-sm mt-2">Example: "minecraft building tips" or "healthy breakfast recipes"</p>
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
                <p className="mt-2">Generating catchy title ideas...</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="description" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Enter your video topic or brief description..."
                value={descInput}
                onChange={(e) => setDescInput(e.target.value)}
                rows={3}
              />
              <Button
                onClick={handleGenerateDescription}
                disabled={!descInput.trim() || isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isGenerating ? "Generating..." : "Generate Description"}
                {!isGenerating && <Sparkles className="ml-2 h-4 w-4" />}
              </Button>
            </div>

            {generatedDesc && (
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Generated Description:</h3>
                  <Button size="sm" variant="outline" onClick={copyDescription}>
                    {copiedDesc ? (
                      <>
                        <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1 h-4 w-4" />
                        Copy All
                      </>
                    )}
                  </Button>
                </div>
                <div className="p-3 bg-gray-50 rounded border border-gray-200 whitespace-pre-line text-sm max-h-80 overflow-y-auto">
                  {generatedDesc}
                </div>
                <p className="text-xs text-gray-500">
                  This description includes timestamps, key points, and hashtags to improve your video's SEO.
                </p>
              </div>
            )}

            {!generatedDesc && !isGenerating && (
              <div className="text-center py-8 text-gray-500">
                <p>Enter your video topic to generate an optimized description</p>
                <p className="text-sm mt-2">Example: "smartphone review" or "cooking tutorial"</p>
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
                <p className="mt-2">Crafting the perfect description...</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
