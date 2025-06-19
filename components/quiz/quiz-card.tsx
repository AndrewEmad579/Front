"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Star } from "lucide-react"
import type { Quiz } from "@/types/quiz"
import { isQuizCompleted, getQuizScore } from "@/lib/quiz-service"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface QuizCardProps {
  quiz: Quiz
}

export function QuizCard({ quiz }: QuizCardProps) {
  const router = useRouter()
  const [completed, setCompleted] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  useEffect(() => {
    setCompleted(isQuizCompleted(quiz.id))
    setScore(getQuizScore(quiz.id))
  }, [quiz.id])

  const getBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500"
      case "Medium":
        return "bg-amber-500"
      case "Hard":
        return "bg-red-500"
      default:
        return ""
    }
  }

  return (
    <Card className="overflow-hidden border-border hover:border-[#FFD700]/50 transition-colors">
      <div className="relative h-32">
        <img src={quiz.imageUrl || "/placeholder.svg"} alt={quiz.title} className="object-cover w-full h-full" />
        <Badge className={`absolute top-2 right-2 ${getBadgeColor(quiz.difficulty)}`}>{quiz.difficulty}</Badge>
      </div>
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{quiz.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{quiz.description}</p>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Star className="h-3 w-3 mr-1" />
              {quiz.questions.length} questions
            </div>
          </div>
          {completed && (
            <div className="flex flex-col items-end">
              <div className="flex items-center text-xs text-[#FFD700] mt-1">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
              </div>
              {score !== null && <span className="text-xs font-medium mt-1">Score: {score}%</span>}
            </div>
          )}
        </div>
        <Button
          className="w-full mt-3 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
          onClick={() => router.push(`/learn/quiz/${quiz.id}`)}
        >
          {completed ? "Retry Quiz" : "Start Quiz"}
        </Button>
      </CardContent>
    </Card>
  )
}
