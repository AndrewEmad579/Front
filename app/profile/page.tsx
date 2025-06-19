"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Globe, LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/i18n/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { t, language, setLanguage, isRTL } = useLanguage()
  const { user, signOut } = useAuth()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const router = useRouter()
  const [notifications, setNotifications] = useState({
    updates: true,
    offers: true,
    events: false,
  })

  const spaceClass = isRTL ? "ml-2" : "mr-2"

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteAccount = async () => {
    if (window.confirm(t("deleteAccountConfirmation"))) {
      try {
        await signOut()
        toast({
          title: t("accountDeleted"),
          description: t("accountDeletedDescription"),
        })
        router.push("/")
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete account. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="container max-w-3xl mx-auto p-4 space-y-6 pb-20">
      {/* Header Section */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-primary font-poppins">{t("profileAndSettings")}</h1>
        <div className="h-1 w-20 bg-primary/20 mx-auto rounded-full"></div>
      </div>

      {/* Welcome & Authentication Section */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            {t("welcome")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-medium text-primary">
            <span>👋 Hello, {user?.username || "Explorer"}!</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium text-muted-foreground">Username</h3>
            </div>
            <div className="p-3 bg-muted rounded-lg border border-border/50">
              <span className="text-xs sm:text-sm">{user?.username || "Not set"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* General Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            {t("generalSettings")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <span className="text-sm font-medium">{t("theme")}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? t("light") : t("dark")}
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <span className="text-sm font-medium">{t("language")}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              >
                {language === "en" ? t("arabic") : t("english")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-md flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            {t("accountActions")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div
            className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors"
            onClick={handleSignOut}
          >
            <div className={`flex items-center gap-3`}>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <LogOut className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm font-medium">{t("logOut")}</p>
            </div>
          </div>

          <div
            className="flex items-center justify-between p-3 hover:bg-destructive/10 rounded-lg cursor-pointer transition-colors"
            onClick={handleDeleteAccount}
          >
            <div className={`flex items-center gap-3`}>
              <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                <LogOut className="h-4 w-4 text-destructive" />
              </div>
              <p className="text-sm font-medium text-destructive">{t("deleteAccount")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex flex-col items-center gap-2 pt-4">
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full"></div>
        <div className="text-center text-xs text-muted-foreground">AEGYPTUS {t("version")}</div>
      </div>
    </div>
  )
}
