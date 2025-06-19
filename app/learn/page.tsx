"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BookOpen, CheckCircle, Clock, Crown, Play, Star } from "lucide-react"
import Link from "next/link"
import { getQuizzes, getUserProgress } from "@/lib/quiz-service"
import type { Quiz } from "@/types/quiz"

// Mock data for learning content
const courses = [
  {
    id: 1,
    title: "Hieroglyphs for Beginners",
    description: "Learn to read and write basic hieroglyphs",
    image:
      "https://www.britishmuseum.org/sites/default/files/styles/bm_gallery_medium_700h/public/2022-06/Hieroglyphs_unlocking_ancient_Egypt_hero.jpg?itok=CoQzKChb",
    lessons: 12,
    duration: "4 hours",
    level: "Beginner",
    progress: 25,
    featured: true,
  },
  {
    id: 2,
    title: "Egyptian Mythology",
    description: "Explore the gods and myths of ancient Egypt",
    image: "https://visitegypt.com/wp-content/uploads/2025/01/egyptian-gods-names-and-powers.webp",
    lessons: 8,
    duration: "3 hours",
    level: "Intermediate",
    progress: 0,
    featured: true,
  },
  {
    id: 3,
    title: "Pharaohs & Dynasties",
    description: "The rulers and royal families of ancient Egypt",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/CairoEgMuseumTaaMaskMostlyPhotographed.jpg/1200px-CairoEgMuseumTaaMaskMostlyPhotographed.jpg",
    lessons: 15,
    duration: "6 hours",
    level: "Advanced",
    progress: 60,
    featured: false,
  },
  {
    id: 4,
    title: "Egyptian Architecture",
    description: "The principles and evolution of Egyptian buildings",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/1200px-All_Gizah_Pyramids.jpg",
    lessons: 10,
    duration: "4 hours",
    level: "Intermediate",
    progress: 0,
    featured: false,
  },
  {
    id: 5,
    title: "Egyptology",
    description: "The scientific study of ancient Egyptian civilization",
    image: "https://www.booksfortopics.com/wp-content/uploads/Egyptology-Search-for-the-Tomb-of-Osiris.jpeg",
    lessons: 14,
    duration: "5 hours",
    level: "Advanced",
    progress: 0,
    featured: false,
  },
]

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("courses")
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([])

  useEffect(() => {
    const allQuizzes = getQuizzes()
    setQuizzes(allQuizzes)

    const userProgress = getUserProgress()
    const completed = Object.keys(userProgress).filter((id) => userProgress[id].completed)
    setCompletedQuizzes(completed)
  }, [])

  const featuredCourses = courses.filter((course) => course.featured)
  const inProgressCourses = courses.filter((course) => course.progress > 0)

  const recentQuizzes = quizzes.slice(0, 3)

  return (
    <div className="p-4 space-y-6 pb-20">
      <h1 className="text-2xl font-bold text-[#FFD700] font-poppins">Learn</h1>

      {selectedCourse === null ? (
        <>
          {inProgressCourses.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-medium">Continue Learning</h2>
              <div className="space-y-3">
                {inProgressCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="overflow-hidden border-border hover:border-[#FFD700]/50 transition-colors"
                    onClick={() => setSelectedCourse(course.id)}
                  >
                    <div className="flex h-24">
                      <div className="w-24 h-24 shrink-0">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardContent className="p-3 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-sm">{course.title}</h3>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {course.duration}
                            </div>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {course.level}
                          </Badge>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{course.progress}% complete</span>
                            <span>
                              {Math.round((course.progress / 100) * course.lessons)}/{course.lessons} lessons
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-1" />
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Featured Quizzes Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Featured Quizzes</h2>
              <Link href="/learn/quiz">
                <Button variant="link" className="text-[#FFD700] p-0 h-auto">
                  View All
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentQuizzes.map((quiz) => (
                <Card
                  key={quiz.id}
                  className="overflow-hidden border-border hover:border-[#FFD700]/50 transition-colors"
                >
                  <Link href={`/learn/quiz/${quiz.id}`}>
                    <div className="relative h-32">
                      <img
                        src={quiz.imageUrl || "/placeholder.svg"}
                        alt={quiz.title}
                        className="object-cover w-full h-full"
                      />
                      <Badge
                        className={`absolute top-2 right-2 ${
                          quiz.difficulty === "Easy"
                            ? "bg-green-500"
                            : quiz.difficulty === "Medium"
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                      >
                        {quiz.difficulty}
                      </Badge>
                    </div>
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{quiz.title}</h3>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Star className="h-3 w-3 mr-1" />
                            {quiz.questions.length} questions
                          </div>
                        </div>
                        {completedQuizzes.includes(quiz.id) && (
                          <div className="flex items-center text-xs text-[#FFD700]">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>

            <Link href="/learn/quiz">
              <Button className="w-full mt-2 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black">Explore All Quizzes</Button>
            </Link>
          </div>

          <Tabs defaultValue="courses" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="quizzes">Daily Challenge</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h2 className="text-sm font-medium">All Courses</h2>
                <div className="space-y-3">
                  {courses.map((course) => (
                    <Card
                      key={course.id}
                      className="overflow-hidden border-border hover:border-[#FFD700]/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedCourse(course.id)}
                    >
                      <div className="flex h-24">
                        <div className="w-24 h-24 shrink-0">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <CardContent className="p-3 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-sm">{course.title}</h3>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{course.description}</p>
                            </div>
                            <Badge variant="outline" className="ml-2">
                              {course.level}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {course.lessons} lessons
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {course.duration}
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="quizzes" className="space-y-4 mt-4">
              <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-[#FFD700]/20">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-[#FFD700]">Daily Challenge</h3>
                    <p className="text-xs text-muted-foreground mt-1">Complete today's quiz to earn bonus points</p>
                  </div>
                  <div className="flex items-center">
                    <Crown className="h-5 w-5 text-[#FFD700] mr-2" />
                    <Link href="/learn/quiz/daily-challenge">
                      <Button size="sm" className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black">
                        Start
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center p-6">
                <p className="text-muted-foreground mb-4">
                  Complete daily challenges to earn points and unlock achievements
                </p>
                <Link href="/learn/quiz">
                  <Button variant="outline">View All Quizzes</Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <CourseDetailView
          course={courses.find((course) => course.id === selectedCourse)!}
          onBack={() => setSelectedCourse(null)}
        />
      )}
    </div>
  )
}

interface CourseDetailViewProps {
  course: {
    id: number
    title: string
    description: string
    image: string
    lessons: number
    duration: string
    level: string
    progress: number
  }
  onBack: () => void
}

function CourseDetailView({ course, onBack }: CourseDetailViewProps) {
  // Mock lesson data
  const lessons = Array.from({ length: course.lessons }, (_, i) => ({
    id: i + 1,
    title: `Lesson ${i + 1}: ${i === 0 ? "Introduction" : `Advanced Topic ${i}`}`,
    duration: `${Math.floor(Math.random() * 20) + 5} min`,
    completed: i < Math.ceil((course.progress / 100) * course.lessons),
  }))

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={onBack}>
        ← Back to courses
      </Button>

      <div className="relative rounded-lg overflow-hidden">
        <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full aspect-video object-cover" />
        {course.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-background/30">
            <div className="h-full bg-[#FFD700]" style={{ width: `${course.progress}%` }}></div>
          </div>
        )}
      </div>

      <div>
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold">{course.title}</h2>
          <Badge variant="outline">{course.level}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{course.description}</p>

        <div className="flex items-center space-x-4 mt-3 text-sm">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            {course.lessons} lessons
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {course.duration}
          </div>
        </div>
      </div>

      {course.progress > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{course.progress}% complete</span>
            <span>
              {Math.round((course.progress / 100) * course.lessons)}/{course.lessons}
            </span>
          </div>
          <Progress value={course.progress} className="h-2" />
        </div>
      )}

      <div className="space-y-3">
        <h3 className="text-lg font-medium">Course Content</h3>

        <div className="space-y-2">
          {lessons.map((lesson, index) => (
            <Card key={lesson.id} className={`border-border ${lesson.completed ? "bg-card/50" : ""}`}>
              <CardContent className="p-3 flex justify-between items-center">
                <div className="flex items-center">
                  {lesson.completed ? (
                    <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center mr-3">
                      <CheckCircle className="h-4 w-4 text-[#FFD700]" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center mr-3 border border-border">
                      <span className="text-sm">{lesson.id}</span>
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-medium">{lesson.title}</h4>
                    <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                  </div>
                </div>
                <Button
                  variant={index === Math.ceil((course.progress / 100) * course.lessons) ? "default" : "outline"}
                  size="sm"
                  className={
                    index === Math.ceil((course.progress / 100) * course.lessons)
                      ? "bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                      : ""
                  }
                >
                  {lesson.completed ? "Replay" : <Play className="h-3 w-3" />}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
