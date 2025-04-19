"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, CheckCircle, Sparkles, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock function to generate TikTok caption suggestions
const generateCaptions = (input: string): string[] => {
  if (!input.trim()) return []

  const baseCaption = input.trim()

  return [
    `${baseCaption} ✨ #fyp #foryou #viral`,
    `trying out ${baseCaption} for the first time! 🤩 #tiktoktutorial`,
    `POV: when you discover ${baseCaption} 😱 #trending`,
    `${baseCaption} hack you didn't know you needed 🔥 #lifehack`,
    `day in my life: ${baseCaption} edition 📱 #dayinmylife`,
    `${baseCaption} challenge accepted ✅ #challenge #tiktokviral`,
    `${baseCaption} but make it aesthetic ✨ #aesthetic`,
    `${baseCaption} tutorial for beginners 💯 #learnontiktok`,
    `${baseCaption} gone wrong 😂 #funny #comedy`,
    `${baseCaption} check ✓ #foryoupage`,
  ]
}

// Mock function to generate TikTok sound suggestions
const generateSoundSuggestions = (input: string): Array<{ name: string; popularity: string; trending: boolean }> => {
  if (!input.trim()) return []

  // This would be an API call in a real application
  // Returning mock data based on input
  return [
    {
      name: "Original Sound - " + input,
      popularity: "High",
      trending: Math.random() > 0.5,
    },
    {
      name: "Monkeys Spinning Monkeys - Kevin MacLeod",
      popularity: "Very High",
      trending: true,
    },
    {
      name: "Oh No - Kreepa",
      popularity: "High",
      trending: true,
    },
    {
      name: "Sunroof - Nicky Youre & dazy",
      popularity: "Medium",
      trending: Math.random() > 0.5,
    },
    {
      name: "Aesthetic - Xilo",
      popularity: "Medium",
      trending: Math.random() > 0.5,
    },
    {
      name: "STAY - The Kid LAROI & Justin Bieber",
      popularity: "High",
      trending: Math.random() > 0.7,
    },
    {
      name: "Funny Song - Cavendish Music",
      popularity: "Medium",
      trending: Math.random() > 0.6,
    },
  ]
}

export function TiktokTools() {
  const [activeTab, setActiveTab] = useState("caption")
  const [captionInput, setCaptionInput] = useState("")
  const [captionSuggestions, setCaptionSuggestions] = useState<string[]>([])
  const [soundInput, setSoundInput] = useState("")
  const [soundSuggestions, setSoundSuggestions] = useState<ReturnType<typeof generateSoundSuggestions>>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedCaption, setCopiedCaption] = useState<number | null>(null)

  const handleGenerateCaptions = () => {
    if (!captionInput.trim()) return

    setIsGenerating(true)

    // Simulate API delay
    setTimeout(() => {
      const suggestions = generateCaptions(captionInput)
      setCaptionSuggestions(suggestions)
      setIsGenerating(false)
    }, 800)
  }

  const handleGenerateSounds = () => {
    if (!soundInput.trim()) return

    setIsGenerating(true)

    // Simulate API delay
    setTimeout(() => {
      const suggestions = generateSoundSuggestions(soundInput)
      setSoundSuggestions(suggestions)
      setIsGenerating(false)
    }, 1000)
  }

  const copyCaption = (index: number) => {
    navigator.clipboard.writeText(captionSuggestions[index])
    setCopiedCaption(index)

    toast({
      title: "Caption copied!",
      description: "Caption has been copied to your clipboard.",
    })

    setTimeout(() => setCopiedCaption(null), 2000)
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="caption">Caption Generator</TabsTrigger>
            <TabsTrigger value="sound">Sound Suggestions</TabsTrigger>
          </TabsList>

          <TabsContent value="caption" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Input
                placeholder="Enter your TikTok video topic..."
                value={captionInput}
                onChange={(e) => setCaptionInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleGenerateCaptions()
                }}
              />
              <Button
                onClick={handleGenerateCaptions}
                disabled={!captionInput.trim() || isGenerating}
                className="w-full bg-black hover:bg-gray-800"
              >
                {isGenerating ? "Generating..." : "Generate Caption Ideas"}
                {!isGenerating && <Sparkles className="ml-2 h-4 w-4" />}
              </Button>
            </div>

            <Alert className="bg-gray-50 border-gray-200">
              <AlertCircle className="h-4 w-4 text-gray-500" />
              <AlertTitle>TikTok Caption Tips</AlertTitle>
              <AlertDescription className="text-xs text-gray-600">
                Keep captions short and engaging. Use 3-5 relevant hashtags and emojis to increase engagement.
              </AlertDescription>
            </Alert>

            {captionSuggestions.length > 0 && (
              <div className="space-y-2 mt-4">
                <h3 className="font-medium">Caption Suggestions:</h3>
                <ul className="space-y-2">
                  {captionSuggestions.map((caption, index) => (
                    <li
                      key={index}
                      className="p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 flex justify-between items-center group"
                    >
                      <span>{caption}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyCaption(index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedCaption === index ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500">Click on a caption to copy it</p>
              </div>
            )}

            {captionSuggestions.length === 0 && !isGenerating && (
              <div className="text-center py-8 text-gray-500">
                <p>Enter your TikTok video topic to generate engaging caption ideas</p>
                <p className="text-sm mt-2">Example: "dance routine" or "makeup tutorial"</p>
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
                <p className="mt-2">Generating catchy caption ideas...</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sound" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Input
                placeholder="Enter your TikTok video theme for sound suggestions..."
                value={soundInput}
                onChange={(e) => setSoundInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleGenerateSounds()
                }}
              />
              <Button
                onClick={handleGenerateSounds}
                disabled={!soundInput.trim() || isGenerating}
                className="w-full bg-black hover:bg-gray-800"
              >
                {isGenerating ? "Finding sounds..." : "Find Trending Sounds"}
                {!isGenerating && <Sparkles className="ml-2 h-4 w-4" />}
              </Button>
            </div>

            {soundSuggestions.length > 0 && (
              <div className="space-y-2 mt-4">
                <h3 className="font-medium">Recommended Sounds:</h3>
                <ul className="space-y-2">
                  {soundSuggestions.map((sound, index) => (
                    <li key={index} className="p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{sound.name}</span>
                        {sound.trending && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Trending
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Popularity: {sound.popularity}</div>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500">
                  Using trending sounds can significantly increase your video's reach on TikTok
                </p>
              </div>
            )}

            {soundSuggestions.length === 0 && !isGenerating && (
              <div className="text-center py-8 text-gray-500">
                <p>Enter your video theme to find trending sounds that match your content</p>
                <p className="text-sm mt-2">Example: "dance" or "comedy"</p>
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
                <p className="mt-2">Finding the perfect sounds for your content...</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
