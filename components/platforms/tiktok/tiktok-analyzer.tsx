"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, TrendingUp, Users, Eye } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock function to analyze TikTok hashtags
const analyzeHashtags = (tag: string) => {
  // This would be an API call in a real application
  const tagWithoutHash = tag.replace(/^#/, "")

  // Generate random but somewhat realistic metrics
  const views = Math.floor(Math.random() * 1000000000) + 10000000
  const competition = Math.random() * 0.8 + 0.2
  const growthRate = (Math.random() * 20 - 5).toFixed(1) // -5% to +15%
  const trending = Math.random() > 0.6

  // Adjust values based on tag content for more realistic simulation
  let adjustedViews = views
  let adjustedCompetition = competition

  if (tagWithoutHash === "fyp" || tagWithoutHash === "foryou" || tagWithoutHash === "foryoupage") {
    adjustedViews = 15000000000 + Math.floor(Math.random() * 5000000000)
    adjustedCompetition = 0.9 + Math.random() * 0.1
  }

  if (tagWithoutHash.includes("dance") || tagWithoutHash.includes("viral") || tagWithoutHash.includes("trending")) {
    adjustedViews *= 1.5
    adjustedCompetition *= 1.2
  }

  if (tagWithoutHash.length <= 5) {
    adjustedViews *= 1.3
    adjustedCompetition *= 1.3
  }

  return {
    tag: tagWithoutHash,
    views: formatViews(adjustedViews),
    rawViews: adjustedViews,
    competition: adjustedCompetition,
    growthRate: growthRate,
    trending: trending,
    recommendationScore: Math.floor((adjustedViews / 10000000000) * (1 - adjustedCompetition / 2) * 100),
  }
}

// Helper function to format large view numbers
function formatViews(views: number): string {
  if (views >= 1000000000) {
    return (views / 1000000000).toFixed(1) + "B"
  } else if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + "M"
  } else if (views >= 1000) {
    return (views / 1000).to(views / 1000).toFixed(1) + "K"
  } else {
    return views.toString()
  }
}

export function TiktokAnalyzer() {
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

  const getGrowthColor = (value: number) => {
    if (Number.parseFloat(value.toString()) > 0) return "text-green-600"
    if (Number.parseFloat(value.toString()) === 0) return "text-gray-600"
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
            className="bg-black hover:bg-gray-800"
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
                      <Eye className="h-4 w-4 mr-1" />
                      Views
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
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Growth
                    </div>
                  </TableHead>
                  <TableHead>Trending</TableHead>
                  <TableHead>Recommendation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analyzedTags.map((tag, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">#{tag.tag}</TableCell>
                    <TableCell>{tag.views}</TableCell>
                    <TableCell>
                      <span className={getCompetitionColor(tag.competition)}>
                        {getCompetitionLabel(tag.competition)}
                      </span>
                      <Progress value={tag.competition * 100} className="h-1 mt-1" />
                    </TableCell>
                    <TableCell>
                      <span className={getGrowthColor(tag.growthRate)}>
                        {Number.parseFloat(tag.growthRate.toString()) > 0 ? "+" : ""}
                        {tag.growthRate}%
                      </span>
                    </TableCell>
                    <TableCell>
                      {tag.trending ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
            <p className="text-sm mt-2">Example: fyp, dance, cooking, viral</p>
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
