"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuizCard } from "@/components/quiz/quiz-card"
import { getQuizzes } from "@/lib/quiz-service"
import type { Quiz, QuizCategory } from "@/types/quiz"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function QuizPage() {
  const router = useRouter()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("all")

  useEffect(() => {
    setQuizzes(getQuizzes())
  }, [])

  const filteredQuizzes =
    activeCategory === "all" ? quizzes : quizzes.filter((quiz) => quiz.category === activeCategory)

  const categories: { id: string | QuizCategory; name: string }[] = [
    { id: "all", name: "All Quizzes" },
    { id: "hieroglyphs", name: "Hieroglyphs" },
    { id: "pyramids", name: "Pyramids" },
    { id: "daily-life", name: "Daily Life" },
    { id: "gods", name: "Gods & Goddesses" },
    { id: "pharaohs", name: "Pharaohs" },
  ]

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.push("/learn")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-[#FFD700] font-poppins ml-2">Quizzes</h1>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveCategory} value={activeCategory}>
        <div className="overflow-x-auto pb-2 -mx-4 px-4">
          <TabsList className="inline-flex w-auto">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={activeCategory} className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>

          {filteredQuizzes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No quizzes found in this category.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
