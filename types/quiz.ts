export type QuizDifficulty = "Easy" | "Medium" | "Hard"

export type QuizCategory = "hieroglyphs" | "pyramids" | "daily-life" | "gods" | "pharaohs"

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number // Index of the correct answer in options array
}

export interface Quiz {
  id: string
  title: string
  description: string
  category: QuizCategory
  difficulty: QuizDifficulty
  questions: QuizQuestion[]
  imageUrl?: string
}

export interface QuizResult {
  quizId: string
  completed: boolean
  score: number
  totalQuestions: number
  date: string
}

export interface UserQuizProgress {
  [quizId: string]: QuizResult
}
