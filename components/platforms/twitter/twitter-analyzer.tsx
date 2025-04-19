"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Search, TrendingUp, Users, Repeat } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock function to analyze Twitter hashtags
const analyzeHashtags = (tag: string) => {
  // This would be an API call in a real application
  const tagWithoutHash = tag.replace(/^#/, "")

  // Generate random but somewhat realistic metrics
  const reach = Math.floor(Math.random() * 1000000) + 10000
  const competition = Math.random() * 0.8 + 0.2
  const engagement = (Math.random() * 5 + 0.5).toFixed(2) // 0.5% to 5.5%
  const trending = Math.random() > 0.7

  // Adjust values based on tag content for more realistic simulation
  let adjustedReach = reach
  let adjustedCompetition = competition

  if (tagWithoutHash.includes("news") || tagWithoutHash.includes("politics") || tagWithoutHash.includes("breaking")) {
    adjustedReach *= 1.5
    adjustedCompetition *= 1.2
  }

  if (tagWithoutHash.length <= 5) {
    adjustedReach *= 1.3
    adjustedCompetition *= 1.3
  }

  return {
    tag: tagWithoutHash,
    reach: formatNumber(adjustedReach),
    rawReach: adjustedReach,
    competition: adjustedCompetition,
    engagement: engagement,
    trending: trending,
    recommendationScore: Math.floor((adjustedReach / 1000000) * (1 - adjustedCompetition / 2) * 100),
  }
}

// Helper function to format large numbers
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  } else {
    return num.toString()
  }
}

export function TwitterAnalyzer() {
  const [tagInput, setTagInput] = useState("")
  const [analyzedTags, setAnalyzedTags] = useState<ReturnType<typeof analyzeHashtags>[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = () => {
    if (!tagInput.trim()) return

    setIsAnalyzing(true)

    // Simulate API delay
    setTimeout(() => {
      const tags = tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag)
      const results = tags.map(analyzeHashtags)
      setAnalyzedTags(results)
      setIsAnalyzing(false)
    }, 1200)
  }

  const getCompetitionLabel = (value: number) => {
    if (value < 0.3) return "Low"
    if (value < 0.6) return "Medium"
    return "High"
  }

  const getCompetitionColor = (value: number) => {
    if (value < 0.3) return "text-green-600"
    if (value < 0.6) return "text-yellow-600"
    return "text-red-600"
  }

  const getEngagementColor = (value: string) => {
    const numValue = Number.parseFloat(value)
    if (numValue > 3) return "text-green-600"
    if (numValue > 1.5) return "text-yellow-600"
    return "text-red-600"
  }

  const getRecommendationColor = (score: number) => {
    if (score >= 70) return "text-green-600"
    if (score >= 40) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-2 mb-6">
          <Input
            placeholder="Enter hashtags to analyze (comma separated)..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAnalyze()
            }}
            className="flex-1"
          />
          <Button
            onClick={handleAnalyze}
            disabled={!tagInput.trim() || isAnalyzing}
            className="bg-[#1DA1F2] hover:bg-[#1a94df]"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Hashtags"}
            {!isAnalyzing && <BarChart className="ml-2 h-4 w-4" />}
          </Button>
        </div>

        {analyzedTags.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hashtag</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      <Search className="h-4 w-4 mr-1" />
                      Reach
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Competition
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      <Repeat className="h-4 w-4 mr-1" />
                      Engagement
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Trending
                    </div>
                  </TableHead>
                  <TableHead>Recommendation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analyzedTags.map((tag, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">#{tag.tag}</TableCell>
                    <TableCell>{tag.reach}</TableCell>
                    <TableCell>
                      <span className={getCompetitionColor(tag.competition)}>
                        {getCompetitionLabel(tag.competition)}
                      </span>
                      <Progress value={tag.competition * 100} className="h-1 mt-1" />
                    </TableCell>
                    <TableCell>
                      <span className={getEngagementColor(tag.engagement)}>{tag.engagement}%</span>
                    </TableCell>
                    <TableCell>
                      {tag.trending ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Yes
                        </span>
                      ) : (
                        <span className="text-gray-500">No</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className={`font-medium ${getRecommendationColor(tag.recommendationScore)}`}>
                          {tag.recommendationScore}/100
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {analyzedTags.length === 0 && !isAnalyzing && (
          <div className="text-center py-8 text-gray-500">
            <p>Enter hashtags separated by commas to analyze their performance</p>
            <p className="text-sm mt-2">Example: tech, news, sports, politics</p>
          </div>
        )}

        {isAnalyzing && (
          <div className="text-center py-8 text-gray-500">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <p className="mt-2">Analyzing hashtag metrics...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
