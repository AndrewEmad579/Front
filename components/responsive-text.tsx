import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ResponsiveTextProps {
  children: ReactNode
  className?: string
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl"
}

export function ResponsiveText({ children, className, size = "base" }: ResponsiveTextProps) {
  const sizeClasses = {
    xs: "text-[0.65rem] sm:text-xs",
    sm: "text-xs sm:text-sm",
    base: "text-sm sm:text-base",
    lg: "text-base sm:text-lg",
    xl: "text-lg sm:text-xl",
    "2xl": "text-xl sm:text-2xl",
  }

  return <span className={cn(sizeClasses[size], className)}>{children}</span>
}
