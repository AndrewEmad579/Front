"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Target } from "lucide-react"
import { LessonVideo } from "@/components/course/lesson-video"
import { LessonQuiz } from "@/components/course/lesson-quiz"
import { getCourseById, markLessonCompleted, saveQuizScore, isLessonCompleted } from "@/lib/course-service"
import { useToast } from "@/hooks/use-toast"
import type { Course, Lesson } from "@/types/course"

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [course, setCourse] = useState<Course | null>(null)
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [lessonCompleted, setLessonCompleted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id && params.lessonId) {
      const courseData = getCourseById(params.id as string)
      if (courseData) {
        setCourse(courseData)
        const lessonData = courseData.lessons.find((l) => l.id === params.lessonId)
        if (lessonData) {
          setLesson(lessonData)
          setLessonCompleted(isLessonCompleted(courseData.id, lessonData.id))
        }
      }
      setLoading(false)
    }
  }, [params.id, params.lessonId])

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-[70vh]">
        <div className="animate-pulse">Loading lesson...</div>
      </div>
    )
  }

  if (!course || !lesson) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[70vh]">
        <h2 className="text-xl font-bold mb-2">Lesson Not Found</h2>
        <p className="text-muted-foreground mb-6 text-center">
          The lesson you're looking for doesn't exist or has been removed.
        </p>
        <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black" onClick={() => router.push("/learn/course")}>
          Back to Courses
        </Button>
      </div>
    )
  }

  const currentLessonIndex = course.lessons.findIndex((l) => l.id === lesson.id)
  const nextLesson = course.lessons[currentLessonIndex + 1]
  const prevLesson = course.lessons[currentLessonIndex - 1]

  const handleMarkCompleted = () => {
    markLessonCompleted(course.id, lesson.id)
    setLessonCompleted(true)
    toast({
      title: "Lesson Completed!",
      description: "Great job! You've completed this lesson.",
    })
  }

  const handleQuizComplete = (score: number) => {
    saveQuizScore(course.id, lesson.id, score)
    if (!lessonCompleted) {
      markLessonCompleted(course.id, lesson.id)
      setLessonCompleted(true)
    }

    toast({
      title: "Quiz Completed!",
      description: `You scored ${score}% on the quiz.`,
    })
  }

  const handleNext = () => {
    if (nextLesson) {
      router.push(`/learn/course/${course.id}/lesson/${nextLesson.id}`)
    } else {
      router.push(`/learn/course/${course.id}`)
    }
  }

  const handlePrevious = () => {
    if (prevLesson) {
      router.push(`/learn/course/${course.id}/lesson/${prevLesson.id}`)
    }
  }

  return (
    <div className="p-4 space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push(`/learn/course/${course.id}`)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="ml-2">
            <h1 className="text-lg font-bold">{lesson.title}</h1>
            <p className="text-sm text-muted-foreground">{course.title}</p>
          </div>
        </div>

        {lessonCompleted && (
          <Badge className="bg-[#FFD700]/20 text-[#FFD700]">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )}
      </div>

      {/* Video Player */}
      <LessonVideo videoId={lesson.videoId} title={lesson.title} />

      {/* Lesson Content */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-[#FFD700]" />
              Lesson Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{lesson.summary}</p>
          </CardContent>
        </Card>

        {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-[#FFD700]" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lesson.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-[#FFD700] mt-2 mr-3 flex-shrink-0" />
                    <span className="text-sm">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quiz Section */}
      {lesson.quiz && (
        <div className="space-y-4">
          <Separator />

          {!showQuiz ? (
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-medium mb-2">Ready for the Quiz?</h3>
                <p className="text-muted-foreground mb-4">
                  Test your understanding with {lesson.quiz.questions.length} questions
                </p>
                <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black" onClick={() => setShowQuiz(true)}>
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          ) : (
            <LessonQuiz quiz={lesson.quiz} onQuizComplete={handleQuizComplete} />
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" onClick={handlePrevious} disabled={!prevLesson}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex space-x-2">
          {!lessonCompleted && !lesson.quiz && (
            <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black" onClick={handleMarkCompleted}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Complete
            </Button>
          )}

          {(lessonCompleted || !lesson.quiz) && (
            <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black" onClick={handleNext}>
              {nextLesson ? "Next Lesson" : "Back to Course"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
