export interface Course {
  id: string
  title: string
  description: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  totalLessons: number
  progress: number
  imageUrl?: string
  lessons: Lesson[]
  completed: boolean
}

export interface Lesson {
  id: string
  title: string
  description: string
  duration: string
  videoUrl: string
  videoId: string
  summary: string
  learningObjectives: string[]
  completed: boolean
  quiz?: Quiz
}

export interface Quiz {
  id: string
  questions: QuizQuestion[]
}

export interface QuizQuestion {
  id: string
  question: string
  type: "multiple-choice" | "true-false"
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface UserProgress {
  courseId: string
  completedLessons: string[]
  quizScores: { [lessonId: string]: number }
  lastAccessed: string
  totalProgress: number
}
