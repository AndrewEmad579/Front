"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, RotateCw, Home } from "lucide-react"
import type { QuizResult } from "@/types/quiz"
import { useRouter } from "next/navigation"

interface QuizResultsProps {
  result: QuizResult
  onRetry: () => void
}

export function QuizResults({ result, onRetry }: QuizResultsProps) {
  const router = useRouter()
  const scorePercentage = Math.round((result.score / result.totalQuestions) * 100)

  const getScoreMessage = () => {
    if (scorePercentage >= 90) return "Excellent! You're a master of Egyptian knowledge!"
    if (scorePercentage >= 70) return "Great job! You know your Egyptian history well!"
    if (scorePercentage >= 50) return "Good effort! You're on your way to becoming an Egyptologist."
    return "Keep learning! The mysteries of Egypt await you."
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFD700]/20 mb-4">
          {scorePercentage >= 70 ? (
            <CheckCircle className="h-8 w-8 text-[#FFD700]" />
          ) : (
            <XCircle className="h-8 w-8 text-amber-500" />
          )}
        </div>
        <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
        <p className="text-muted-foreground">{getScoreMessage()}</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Score</span>
            <span className="text-2xl font-bold text-[#FFD700]">{scorePercentage}%</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Correct Answers</span>
            <span className="font-medium">
              {result.score} of {result.totalQuestions}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Date Completed</span>
            <span className="font-medium">{new Date(result.date).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black" onClick={onRetry}>
          <RotateCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
        <Button variant="outline" className="flex-1" onClick={() => router.push("/learn")}>
          <Home className="h-4 w-4 mr-2" />
          Back to Learn
        </Button>
      </div>
    </div>
  )
}
