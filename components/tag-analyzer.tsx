"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Search, TrendingUp, Users, MousePointerClick } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock function to analyze tags
const analyzeTags = (tag: string) => {
  // This would be an API call in a real application

  // Generate random but somewhat realistic metrics
  const searchVolume = Math.floor(Math.random() * 10000) + 500
  const competition = Math.random() * 0.8 + 0.2
  const ctr = (Math.random() * 5 + 1).toFixed(2)
  const trending = Math.random() > 0.7

  // Adjust values based on tag content for more realistic simulation
  let adjustedSearchVolume = searchVolume
  let adjustedCompetition = competition

  if (tag.includes("gaming") || tag.includes("tutorial") || tag.includes("how to")) {
    adjustedSearchVolume *= 1.5
    adjustedCompetition *= 1.2
  }

  if (tag.length <= 5) {
    adjustedSearchVolume *= 1.3
    adjustedCompetition *= 1.3
  }

  return {
    tag,
    searchVolume: Math.floor(adjustedSearchVolume),
    competition: adjustedCompetition,
    ctr: ctr,
    trending: trending,
    recommendationScore: Math.floor((adjustedSearchVolume / 10000) * (1 - adjustedCompetition / 2) * 100),
  }
}

export function TagAnalyzer() {
  const [tagInput, setTagInput] = useState("")
  const [analyzedTags, setAnalyzedTags] = useState<ReturnType<typeof analyzeTags>[]>([])
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
      const results = tags.map(analyzeTags)
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
            placeholder="Enter tags to analyze (comma separated)..."
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
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Tags"}
            {!isAnalyzing && <BarChart className="ml-2 h-4 w-4" />}
          </Button>
        </div>

        {analyzedTags.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tag</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      <Search className="h-4 w-4 mr-1" />
                      Search Volume
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
                      <MousePointerClick className="h-4 w-4 mr-1" />
                      Est. CTR
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
                    <TableCell className="font-medium">{tag.tag}</TableCell>
                    <TableCell>{tag.searchVolume.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={getCompetitionColor(tag.competition)}>
                        {getCompetitionLabel(tag.competition)}
                      </span>
                      <Progress value={tag.competition * 100} className="h-1 mt-1" />
                    </TableCell>
                    <TableCell>{tag.ctr}%</TableCell>
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
            <p>Enter tags separated by commas to analyze their performance</p>
            <p className="text-sm mt-2">Example: gaming, minecraft tutorial, how to</p>
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
            <p className="mt-2">Analyzing tag metrics...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
