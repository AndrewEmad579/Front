import { Card, CardContent, CardHeader, CardTitle, type CardProps } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ResponsiveCardProps extends CardProps {
  title?: string
  titleIcon?: ReactNode
  children: ReactNode
  className?: string
  contentClassName?: string
}

export function ResponsiveCard({
  title,
  titleIcon,
  children,
  className,
  contentClassName,
  ...props
}: ResponsiveCardProps) {
  return (
    <Card className={cn("border-border", className)} {...props}>
      {title && (
        <CardHeader className="pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
          <CardTitle className="text-md flex items-center text-[#FFD700]">
            {titleIcon}
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn("p-2 sm:p-3", contentClassName)}>{children}</CardContent>
    </Card>
  )
}
