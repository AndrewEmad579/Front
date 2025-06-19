import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Sign In - AEGYPTUS",
  description: "Sign in to your AEGYPTUS account",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 