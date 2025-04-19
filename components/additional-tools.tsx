"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export function AdditionalTools() {
  const [titleInput, setTitleInput] = useState("")
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([])

  const [descInput, setDescInput] = useState("")
  const [generatedDesc, setGeneratedDesc] = useState("")

  const generateTitles = () => {
    if (!titleInput.trim()) return

    // Mock title generation
    const baseTitle = titleInput.trim()
    const suggestions = [
      `How to ${baseTitle} - Complete Guide`,
      `${baseTitle.charAt(0).toUpperCase() + baseTitle.slice(1)} Tutorial for Beginners`,
      `The Ultimate ${baseTitle} Guide in 2023`,
      `${baseTitle} - Tips and Tricks You Need to Know`,
      `Why ${baseTitle} is Important for Your Channel`,
    ]

    setTitleSuggestions(suggestions)
  }

  const generateDescription = () => {
    if (!descInput.trim()) return

    // Mock description generation
    const baseDesc = descInput.trim()
    const generated = `
${baseDesc}

In this video, I'll show you everything you need to know about this topic. If you found this helpful, please like and subscribe to my channel for more content like this!

🔔 Subscribe for more: https://youtube.com/yourchannel
📱 Follow me on social media:
   - Instagram: https://instagram.com/youraccount
   - Twitter: https://twitter.com/youraccount

#YouTube #ContentCreator #VideoTips
    `.trim()

    setGeneratedDesc(generated)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional YouTube Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="title">
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
              />
              <Button onClick={generateTitles} disabled={!titleInput.trim()} className="w-full">
                Generate Title Ideas
              </Button>
            </div>

            {titleSuggestions.length > 0 && (
              <div className="space-y-2 mt-4">
                <h3 className="font-medium">Title Suggestions:</h3>
                <ul className="space-y-2">
                  {titleSuggestions.map((title, index) => (
                    <li
                      key={index}
                      className="p-2 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(title)
                      }}
                    >
                      {title}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500">Click on a title to copy it</p>
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
              <Button onClick={generateDescription} disabled={!descInput.trim()} className="w-full">
                Generate Description
              </Button>
            </div>

            {generatedDesc && (
              <div className="space-y-2 mt-4">
                <h3 className="font-medium">Generated Description:</h3>
                <div className="p-3 bg-gray-50 rounded border border-gray-200 whitespace-pre-line text-sm">
                  {generatedDesc}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedDesc)
                  }}
                >
                  Copy Description
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
