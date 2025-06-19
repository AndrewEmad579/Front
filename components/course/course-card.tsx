"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, CheckCircle } from "lucide-react"
import type { Course } from "@/types/course"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { getCourseProgress } from "@/lib/course-service"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(getCourseProgress(course.id))
  }, [course.id])

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

  const isCompleted = progress === 100

  return (
    <Card className="overflow-hidden border-border hover:border-[#FFD700]/50 transition-colors">
      <div className="relative h-32">
        <img src={course.imageUrl || "/placeholder.svg"} alt={course.title} className="object-cover w-full h-full" />
        <Badge className={`absolute top-2 right-2 ${getBadgeColor(course.level)}`}>{course.level}</Badge>
        {isCompleted && (
          <div className="absolute top-2 left-2 bg-[#FFD700]/20 backdrop-blur-sm rounded-full p-1">
            <CheckCircle className="h-4 w-4 text-[#FFD700]" />
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-medium text-lg">{course.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <BookOpen className="h-3 w-3 mr-1" />
              {course.totalLessons} lessons
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {course.duration}
            </div>
          </div>

          {progress > 0 && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1" />
            </div>
          )}

          <Button
            className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
            onClick={() => router.push(`/learn/course/${course.id}`)}
          >
            {progress > 0 ? "Continue" : "Start Course"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
