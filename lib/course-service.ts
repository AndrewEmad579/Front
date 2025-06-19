import type { Course, UserProgress } from "@/types/course"
import { courseData } from "@/data/course-data"

// Get all courses
export function getCourses(): Course[] {
  return courseData
}

// Get a specific course by ID
export function getCourseById(id: string): Course | undefined {
  return courseData.find((course) => course.id === id)
}

// Get user progress for a course
export function getUserProgress(courseId: string): UserProgress | null {
  if (typeof window === "undefined") return null

  const progress = localStorage.getItem(`course_progress_${courseId}`)
  return progress ? JSON.parse(progress) : null
}

// Save user progress
export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return

  localStorage.setItem(`course_progress_${progress.courseId}`, JSON.stringify(progress))
}

// Mark lesson as completed
export function markLessonCompleted(courseId: string, lessonId: string): void {
  let progress = getUserProgress(courseId)

  if (!progress) {
    progress = {
      courseId,
      completedLessons: [],
      quizScores: {},
      lastAccessed: new Date().toISOString(),
      totalProgress: 0,
    }
  }

  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId)
  }

  const course = getCourseById(courseId)
  if (course) {
    progress.totalProgress = Math.round((progress.completedLessons.length / course.totalLessons) * 100)
  }

  progress.lastAccessed = new Date().toISOString()
  saveUserProgress(progress)
}

// Save quiz score
export function saveQuizScore(courseId: string, lessonId: string, score: number): void {
  let progress = getUserProgress(courseId)

  if (!progress) {
    progress = {
      courseId,
      completedLessons: [],
      quizScores: {},
      lastAccessed: new Date().toISOString(),
      totalProgress: 0,
    }
  }

  progress.quizScores[lessonId] = score
  progress.lastAccessed = new Date().toISOString()
  saveUserProgress(progress)
}

// Check if lesson is completed
export function isLessonCompleted(courseId: string, lessonId: string): boolean {
  const progress = getUserProgress(courseId)
  return progress ? progress.completedLessons.includes(lessonId) : false
}

// Get course progress percentage
export function getCourseProgress(courseId: string): number {
  const progress = getUserProgress(courseId)
  return progress ? progress.totalProgress : 0
}

// Get completed courses
export function getCompletedCourses(): Course[] {
  return courseData.filter((course) => {
    const progress = getUserProgress(course.id)
    return progress && progress.totalProgress === 100
  })
}

// Extract YouTube video ID from URL
export function extractYouTubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : ""
}
