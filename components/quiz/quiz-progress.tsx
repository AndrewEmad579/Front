"use client"

import { Progress } from "@/components/ui/progress"

interface QuizProgressProps {
  currentQuestion: number
  totalQuestions: number
}

export function QuizProgress({ currentQuestion, totalQuestions }: QuizProgressProps) {
  const progressPercentage = (currentQuestion / totalQuestions) * 100

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span>{Math.round(progressPercentage)}% complete</span>
      </div>
      <Progress value={progressPercentage} className="h-1" />
    </div>
  )
}
