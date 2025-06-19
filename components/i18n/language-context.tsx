"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Language, type TranslationKey } from "./translations"

type LanguageContextType = {
  language: Language
  t: (key: TranslationKey) => string
  setLanguage: (lang: Language) => void
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  // Initialize language from localStorage when component mounts
  useEffect(() => {
    setMounted(true)
    const storedLanguage = localStorage.getItem("language") as Language
    if (storedLanguage && (storedLanguage === "en" || storedLanguage === "ar" || storedLanguage === "vr")) {
      setLanguageState(storedLanguage)
    }
  }, [])

  // Update localStorage and document direction when language changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language)

      // Apply RTL direction when language is Arabic or VR
      const isRtl = language === "ar" || language === "vr"
      document.documentElement.dir = isRtl ? "rtl" : "ltr"
      // Add a class to help with styling RTL-specific elements
      document.documentElement.classList.toggle("rtl", isRtl)
      // Update the lang attribute for proper language identification
      document.documentElement.lang = language
    }
  }, [language, mounted])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const t = (key: TranslationKey): string => {
    const lang = language === "vr" ? "ar" : language
    return translations[lang][key] || translations.en[key] || key
  }

  const isRTL = language === "ar" || language === "vr"

  return <LanguageContext.Provider value={{ language, t, setLanguage, isRTL }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
