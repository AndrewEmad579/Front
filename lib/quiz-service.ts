import type { Quiz, QuizResult, UserQuizProgress } from "@/types/quiz"
import { quizData } from "@/data/quiz-data"

// Get all available quizzes
export function getQuizzes(): Quiz[] {
  return quizData
}

// Get a specific quiz by ID
export function getQuizById(id: string): Quiz | undefined {
  return quizData.find((quiz) => quiz.id === id)
}

// Get quizzes by category
export function getQuizzesByCategory(category: string): Quiz[] {
  return quizData.filter((quiz) => quiz.category === category)
}

// Save quiz result to local storage
export function saveQuizResult(result: QuizResult): void {
  const progress = getUserProgress()
  progress[result.quizId] = result
  localStorage.setItem("quiz_progress", JSON.stringify(progress))
}

// Get user's quiz progress from local storage
export function getUserProgress(): UserQuizProgress {
  if (typeof window === "undefined") return {}

  const progress = localStorage.getItem("quiz_progress")
  return progress ? JSON.parse(progress) : {}
}

// Check if a quiz is completed
export function isQuizCompleted(quizId: string): boolean {
  const progress = getUserProgress()
  return progress[quizId]?.completed || false
}

// Get quiz score
export function getQuizScore(quizId: string): number | null {
  const progress = getUserProgress()
  return progress[quizId]?.score ?? null
}
