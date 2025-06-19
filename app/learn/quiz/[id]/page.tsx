"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, AlertCircle } from "lucide-react"
import { QuizOption } from "@/components/quiz/quiz-option"
import { QuizProgress } from "@/components/quiz/quiz-progress"
import { QuizResults } from "@/components/quiz/quiz-result"
import { getQuizById, saveQuizResult } from "@/lib/quiz-service"
import type { Quiz, QuizResult } from "@/types/quiz"

export default function QuizDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)

  useEffect(() => {
    if (params.id) {
      const quizData = getQuizById(params.id as string)
      if (quizData) {
        setQuiz(quizData)
      }
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-[70vh]">
        <div className="animate-pulse">Loading quiz...</div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[70vh]">
        <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">Quiz Not Found</h2>
        <p className="text-muted-foreground mb-6 text-center">
          The quiz you're looking for doesn't exist or has been removed.
        </p>
        <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black" onClick={() => router.push("/learn/quiz")}>
          Back to Quizzes
        </Button>
      </div>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1

  const handleOptionSelect = (index: number) => {
    if (showResult) return
    setSelectedOption(index)
  }

  const handleNextQuestion = () => {
    // Check if answer is correct and update score
    if (selectedOption === currentQuestion.correctAnswer) {
      setCorrectAnswers((prev) => prev + 1)
    }

    if (isLastQuestion) {
      // Quiz completed
      const score = selectedOption === currentQuestion.correctAnswer ? correctAnswers + 1 : correctAnswers
      const result: QuizResult = {
        quizId: quiz.id,
        completed: true,
        score: score,
        totalQuestions: quiz.questions.length,
        date: new Date().toISOString(),
      }

      // Save result to local storage
      saveQuizResult(result)
      setQuizResult(result)
      setQuizCompleted(true)
    } else {
      // Move to next question
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedOption(null)
      setShowResult(false)
    }
  }

  const handleCheckAnswer = () => {
    setShowResult(true)
  }

  const handleRetryQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setShowResult(false)
    setCorrectAnswers(0)
    setQuizCompleted(false)
    setQuizResult(null)
  }

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

  if (quizCompleted && quizResult) {
    return (
      <div className="p-4 pb-20">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.push("/learn/quiz")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold ml-2">{quiz.title}</h1>
          <Badge className={`ml-2 ${getBadgeColor(quiz.difficulty)}`}>{quiz.difficulty}</Badge>
        </div>

        <QuizResults result={quizResult} onRetry={handleRetryQuiz} />
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.push("/learn/quiz")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold ml-2">{quiz.title}</h1>
        <Badge className={`ml-2 ${getBadgeColor(quiz.difficulty)}`}>{quiz.difficulty}</Badge>
      </div>

      <QuizProgress currentQuestion={currentQuestionIndex + 1} totalQuestions={quiz.questions.length} />

      <Card>
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-lg font-medium mb-4">{currentQuestion.question}</h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <QuizOption
                key={index}
                label={option}
                index={index}
                selected={selectedOption === index}
                correct={showResult ? index === currentQuestion.correctAnswer : null}
                showResult={showResult}
                onSelect={() => handleOptionSelect(index)}
              />
            ))}
          </div>

          {showResult && (
            <div
              className={`mt-4 p-3 rounded-md ${
                selectedOption === currentQuestion.correctAnswer
                  ? "bg-green-500/10 border border-green-500/50"
                  : "bg-red-500/10 border border-red-500/50"
              }`}
            >
              <p className="text-sm">
                {selectedOption === currentQuestion.correctAnswer
                  ? "Correct! Well done."
                  : `Incorrect. The correct answer is: ${currentQuestion.options[currentQuestion.correctAnswer]}`}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => router.push("/learn/quiz")}>
          Exit Quiz
        </Button>

        {selectedOption !== null && !showResult ? (
          <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black" onClick={handleCheckAnswer}>
            Check Answer
          </Button>
        ) : showResult ? (
          <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black" onClick={handleNextQuestion}>
            {isLastQuestion ? "Finish Quiz" : "Next Question"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : null}
      </div>
    </div>
  )
}
