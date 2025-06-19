"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Navigation, Bookmark, BookmarkCheck, Share2 } from "lucide-react"
import type { SiteData } from "@/lib/sites-data"
import { useState, useEffect } from "react"
import { getBookmarks, saveBookmark, removeBookmark, shareSite } from "@/lib/sites-data"

interface SiteDetailModalProps {
  site: SiteData | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SiteDetailModal({ site, open, onOpenChange }: SiteDetailModalProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (site) {
      const bookmarks = getBookmarks()
      setIsBookmarked(bookmarks.includes(site.id))
    }
  }, [site])

  if (!site) return null

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      removeBookmark(site.id)
      setIsBookmarked(false)
      toast({
        title: "Bookmark Removed",
        description: "Site removed from your saved locations.",
      })
    } else {
      saveBookmark(site.id)
      setIsBookmarked(true)
      toast({
        title: "Bookmark Added",
        description: "Site saved to your bookmarks.",
      })
    }
  }

  const handleShare = async () => {
    try {
      await shareSite(site)
      toast({
        title: "Shared Successfully",
        description: "Site details have been shared.",
      })
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Unable to share site details. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleNavigate = () => {
    if (site.coordinates) {
      const url = `https://www.google.com/maps?q=${site.coordinates.lat},${site.coordinates.lng}`
      window.open(url, "_blank")
    } else {
      toast({
        title: "Navigation Error",
        description: "Location coordinates not available for this site.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#FFD700]">{site.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={site.imageUrl || "/placeholder.svg"}
              alt={site.name}
              className="w-full aspect-video object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `https://via.placeholder.com/500x300/1e293b/ffd700?text=${encodeURIComponent(site.name)}`
              }}
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-background/20 backdrop-blur-sm hover:bg-background/40"
                onClick={handleBookmarkToggle}
              >
                {isBookmarked ? <BookmarkCheck className="h-4 w-4 text-[#FFD700]" /> : <Bookmark className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-background/20 backdrop-blur-sm hover:bg-background/40"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {site.location}
              {site.distance && (
                <Badge variant="outline" className="ml-2">
                  {site.distance}
                </Badge>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">About</h3>
            <p className="text-sm text-muted-foreground">{site.keyFeatures}</p>
          </div>

          {site.coordinates && (
            <div className="rounded-lg overflow-hidden bg-slate-800 h-32">
              <div className="relative w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-[#FFD700] mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {site.coordinates.lat.toFixed(4)}, {site.coordinates.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleBookmarkToggle}>
              <Bookmark className="h-4 w-4 mr-2" />
              {isBookmarked ? "Saved" : "Save"}
            </Button>
            <Button className="flex-1 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black" onClick={handleNavigate}>
              <Navigation className="h-4 w-4 mr-2" />
              Navigate
            </Button>
          </div>

          <Button variant="ghost" className="w-full" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share Site
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
