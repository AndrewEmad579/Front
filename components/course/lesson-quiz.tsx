"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, HelpCircle } from "lucide-react"
import type { Quiz } from "@/types/course"

interface LessonQuizProps {
  quiz: Quiz
  onQuizComplete: (score: number) => void
}

export function LessonQuiz({ quiz, onQuizComplete }: LessonQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const question = quiz.questions[currentQuestion]
  const isLastQuestion = currentQuestion === quiz.questions.length - 1

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResults) return

    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex,
    })
  }

  const handleNext = () => {
    if (!showResults) {
      setShowResults(true)
    } else if (isLastQuestion) {
      // Calculate final score
      const correctAnswers = quiz.questions.reduce((count, q, index) => {
        return selectedAnswers[index] === q.correctAnswer ? count + 1 : count
      }, 0)

      const score = Math.round((correctAnswers / quiz.questions.length) * 100)
      setQuizCompleted(true)
      onQuizComplete(score)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setShowResults(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowResults(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-amber-500"
    return "text-red-500"
  }

  if (quizCompleted) {
    const correctAnswers = quiz.questions.reduce((count, q, index) => {
      return selectedAnswers[index] === q.correctAnswer ? count + 1 : count
    }, 0)
    const score = Math.round((correctAnswers / quiz.questions.length) * 100)

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 text-[#FFD700] mr-2" />
            Quiz Completed!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}%</div>
            <p className="text-muted-foreground">
              {correctAnswers} out of {quiz.questions.length} correct
            </p>
          </div>

          <div className="space-y-2">
            {quiz.questions.map((q, index) => (
              <div key={q.id} className="flex items-center justify-between p-2 rounded border">
                <span className="text-sm">Question {index + 1}</span>
                {selectedAnswers[index] === q.correctAnswer ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <HelpCircle className="h-5 w-5 text-[#FFD700] mr-2" />
            Lesson Quiz
          </CardTitle>
          <Badge variant="outline">
            {currentQuestion + 1} of {quiz.questions.length}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-4">{question.question}</h3>

          <div className="space-y-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`w-full text-left p-3 rounded-md border transition-colors ${
                  selectedAnswers[currentQuestion] === index
                    ? showResults
                      ? index === question.correctAnswer
                        ? "border-green-500 bg-green-500/10"
                        : "border-red-500 bg-red-500/10"
                      : "border-[#FFD700] bg-[#FFD700]/10"
                    : showResults && index === question.correctAnswer
                      ? "border-green-500 bg-green-500/10"
                      : "border-border hover:border-[#FFD700]/50"
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResults}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                  {showResults && selectedAnswers[currentQuestion] === index && (
                    <div className="ml-auto">
                      {index === question.correctAnswer ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {showResults && question.explanation && (
          <div className="p-3 bg-muted rounded-md">
            <p className="text-sm">
              <strong>Explanation:</strong> {question.explanation}
            </p>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            Previous
          </Button>

          <Button
            className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined && !showResults}
          >
            {!showResults ? "Check Answer" : isLastQuestion ? "Complete Quiz" : "Next Question"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
