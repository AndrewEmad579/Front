"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseCard } from "@/components/course/course-card"
import { getCourses, getCompletedCourses } from "@/lib/course-service"
import type { Course } from "@/types/course"
import { ArrowLeft, Trophy } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CoursePage() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [completedCourses, setCompletedCourses] = useState<Course[]>([])
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    setCourses(getCourses())
    setCompletedCourses(getCompletedCourses())
  }, [])

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.push("/learn")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-[#FFD700] font-poppins ml-2">Courses</h1>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="completed">
            <Trophy className="h-4 w-4 mr-2" />
            Completed ({completedCourses.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {courses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No courses available.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            {completedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {completedCourses.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Completed Courses</h3>
              <p className="text-muted-foreground">Complete your first course to see it here!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
