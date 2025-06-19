"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

interface AuthGuardProps {
  children: React.ReactNode
}

const publicRoutes = ["/auth/signin", "/auth/signup"]

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      const isPublicRoute = publicRoutes.includes(pathname)

      if (!isAuthenticated && !isPublicRoute) {
        // User is not authenticated and trying to access protected route
        router.push("/auth/signin")
      } else if (isAuthenticated && isPublicRoute) {
        // User is authenticated but on auth page, redirect to home
        router.push("/")
      }
    }
  }, [isAuthenticated, isLoading, pathname, router])

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-black">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto">
            <svg viewBox="0 0 24 24" className="w-full h-full text-[#FFD700] animate-pulse">
              <path
                fill="currentColor"
                d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,3.18L19,6.3V11.22C19,12.92 18.5,14.65 17.65,16.17C16,14.94 13.26,14.5 12,14.5C10.74,14.5 8,14.94 6.35,16.17C5.5,14.65 5,12.92 5,11.22V6.3L12,3.18M12,6A3.5,3.5 0 0,0 8.5,9.5A3.5,3.5 0 0,0 12,13A3.5,3.5 0 0,0 15.5,9.5A3.5,3.5 0 0,0 12,6M12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8Z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#FFD700] font-poppins">AEGYPTUS</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
