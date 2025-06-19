"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, BookOpen, Clock, CheckCircle, Play, Lock } from "lucide-react"
import { getCourseById, getCourseProgress, isLessonCompleted } from "@/lib/course-service"
import type { Course } from "@/types/course"

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const courseData = getCourseById(params.id as string)
      if (courseData) {
        setCourse(courseData)
        setProgress(getCourseProgress(courseData.id))
      }
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-[70vh]">
        <div className="animate-pulse">Loading course...</div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[70vh]">
        <h2 className="text-xl font-bold mb-2">Course Not Found</h2>
        <p className="text-muted-foreground mb-6 text-center">
          The course you're looking for doesn't exist or has been removed.
        </p>
        <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black" onClick={() => router.push("/learn/course")}>
          Back to Courses
        </Button>
      </div>
    )
  }

  const getBadgeColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-500"
      case "Intermediate":
        return "bg-amber-500"
      case "Advanced":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getNextAvailableLesson = () => {
    return course.lessons.find((lesson, index) => {
      if (index === 0) return true // First lesson is always available
      return isLessonCompleted(course.id, course.lessons[index - 1].id)
    })
  }

  const nextLesson = getNextAvailableLesson()

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.push("/learn/course")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold ml-2">{course.title}</h1>
        <Badge className={`ml-2 ${getBadgeColor(course.level)}`}>{course.level}</Badge>
      </div>

      {/* Course Header */}
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={course.imageUrl || "/placeholder.svg"}
          alt={course.title}
          className="w-full aspect-video object-cover"
        />
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-background/30">
            <div className="h-full bg-[#FFD700]" style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>

      {/* Course Info */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">{course.title}</h2>
          <p className="text-muted-foreground mt-2">{course.description}</p>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            {course.totalLessons} lessons
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {course.duration}
          </div>
        </div>

        {progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Course Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {nextLesson && (
          <Button
            className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
            onClick={() => router.push(`/learn/course/${course.id}/lesson/${nextLesson.id}`)}
          >
            <Play className="h-4 w-4 mr-2" />
            {progress > 0 ? "Continue Learning" : "Start Course"}
          </Button>
        )}
      </div>

      {/* Lessons List */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Course Content</h3>

        <div className="space-y-2">
          {course.lessons.map((lesson, index) => {
            const isCompleted = isLessonCompleted(course.id, lesson.id)
            const isAvailable = index === 0 || isLessonCompleted(course.id, course.lessons[index - 1].id)

            return (
              <Card
                key={lesson.id}
                className={`border-border ${isCompleted ? "bg-card/50" : ""} ${
                  isAvailable ? "hover:border-[#FFD700]/50 cursor-pointer" : "opacity-60"
                } transition-colors`}
                onClick={() => {
                  if (isAvailable) {
                    router.push(`/learn/course/${course.id}/lesson/${lesson.id}`)
                  }
                }}
              >
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mr-3 border border-border">
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-[#FFD700]" />
                      ) : isAvailable ? (
                        <span className="text-sm font-medium">{index + 1}</span>
                      ) : (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{lesson.title}</h4>
                      <p className="text-sm text-muted-foreground">{lesson.description}</p>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {lesson.duration}
                      </div>
                    </div>
                  </div>

                  {isAvailable && (
                    <Button
                      variant={isCompleted ? "outline" : "default"}
                      size="sm"
                      className={!isCompleted ? "bg-[#FFD700] hover:bg-[#FFD700]/90 text-black" : ""}
                    >
                      {isCompleted ? "Review" : "Start"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
