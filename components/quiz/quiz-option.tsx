"use client"

import { cn } from "@/lib/utils"

interface QuizOptionProps {
  label: string
  index: number
  selected: boolean
  correct?: boolean | null
  showResult: boolean
  onSelect: () => void
  disabled?: boolean
}

export function QuizOption({
  label,
  index,
  selected,
  correct,
  showResult,
  onSelect,
  disabled = false,
}: QuizOptionProps) {
  const letters = ["A", "B", "C", "D", "E", "F"]

  return (
    <button
      className={cn(
        "w-full text-left p-3 rounded-md border transition-colors flex items-start gap-3",
        selected ? "border-[#FFD700]" : "border-border",
        showResult && selected && correct ? "bg-green-500/20 border-green-500" : "",
        showResult && selected && correct === false ? "bg-red-500/20 border-red-500" : "",
        showResult && !selected && correct ? "bg-green-500/10 border-green-500/50" : "",
        !showResult && selected ? "bg-[#FFD700]/10" : "",
        !showResult && !selected ? "hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5" : "",
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
      )}
      onClick={onSelect}
      disabled={disabled || showResult}
    >
      <div
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
          selected ? "bg-[#FFD700] text-black" : "bg-muted text-muted-foreground",
          showResult && selected && correct ? "bg-green-500 text-white" : "",
          showResult && selected && correct === false ? "bg-red-500 text-white" : "",
          showResult && !selected && correct ? "bg-green-500/50 text-white" : "",
        )}
      >
        {letters[index]}
      </div>
      <span className="pt-0.5">{label}</span>
    </button>
  )
}
