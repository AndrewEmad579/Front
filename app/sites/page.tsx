"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { MapPin, Navigation, Bookmark, BookmarkCheck, Info, MapIcon, Search, Share2 } from "lucide-react"
import { SiteDetailModal } from "@/components/site-detail-modal"
import {
  fetchSitesData,
  truncateDescription,
  getBookmarks,
  saveBookmark,
  removeBookmark,
  shareSite,
  type SiteData,
} from "@/lib/sites-data"

export default function SitesPage() {
  const [sites, setSites] = useState<SiteData[]>([])
  const [filteredSites, setFilteredSites] = useState<SiteData[]>([])
  const [selectedSite, setSelectedSite] = useState<SiteData | null>(null)
  const [savedSites, setSavedSites] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const { toast } = useToast()

  // Load sites data on component mount
  useEffect(() => {
    const loadSites = async () => {
      setLoading(true)
      try {
        const sitesData = await fetchSitesData()
        setSites(sitesData)
        setFilteredSites(sitesData)
        setSavedSites(getBookmarks())
      } catch (error) {
        console.error("Error loading sites:", error)
        toast({
          title: "Error",
          description: "Failed to load sites data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadSites()
  }, [toast])

  // Filter sites based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSites(sites)
    } else {
      const filtered = sites.filter(
        (site) =>
          site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          site.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          site.keyFeatures.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredSites(filtered)
    }
  }, [searchQuery, sites])

  const toggleSaved = (siteId: number) => {
    if (savedSites.includes(siteId)) {
      removeBookmark(siteId)
      setSavedSites(savedSites.filter((id) => id !== siteId))
      toast({
        title: "Bookmark Removed",
        description: "Site removed from your saved locations.",
      })
    } else {
      saveBookmark(siteId)
      setSavedSites([...savedSites, siteId])
      toast({
        title: "Bookmark Added",
        description: "Site saved to your bookmarks.",
      })
    }
  }

  const handleSiteDetails = (site: SiteData) => {
    setSelectedSite(site)
    setModalOpen(true)
  }

  const handleNavigate = (site: SiteData) => {
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

  const handleShare = async (site: SiteData) => {
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

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFD700] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading historical sites...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#FFD700] font-poppins">Sites</h1>
        <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "list" ? "map" : "list")}>
          {viewMode === "list" ? <MapIcon className="h-5 w-5" /> : <Info className="h-5 w-5" />}
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search historical sites..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Results count */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {filteredSites.length} site{filteredSites.length !== 1 ? "s" : ""} found
        </p>
        {savedSites.length > 0 && (
          <Badge variant="outline" className="text-[#FFD700]">
            {savedSites.length} saved
          </Badge>
        )}
      </div>

      {viewMode === "map" ? (
        <div className="relative rounded-lg overflow-hidden bg-slate-800 aspect-square">
          <iframe
            src="https://archmap.cultnat.org/Map.aspx"
            className="absolute inset-0 w-full h-full border-0"
            title="Archaeological Map of Egypt"
            loading="lazy"
            allowFullScreen
          ></iframe>

          <div className="absolute top-4 left-4">
            <Badge className="bg-background/80 backdrop-blur-sm text-foreground">
              Interactive Map - {filteredSites.length} sites
            </Badge>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSites.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No sites found</h3>
              <p className="text-muted-foreground">
                {searchQuery ? "Try adjusting your search terms" : "No historical sites available"}
              </p>
            </div>
          ) : (
            filteredSites.map((site) => (
              <Card key={site.id} className="overflow-hidden border-border hover:border-[#FFD700]/50 transition-colors">
                <div className="relative h-32">
                  <img
                    src={site.imageUrl || "/placeholder.svg"}
                    alt={site.name}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://via.placeholder.com/500x300/1e293b/ffd700?text=${encodeURIComponent(site.name)}`
                    }}
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-background/20 backdrop-blur-sm hover:bg-background/40 h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSaved(site.id)
                      }}
                    >
                      {savedSites.includes(site.id) ? (
                        <BookmarkCheck className="h-3 w-3 text-[#FFD700]" />
                      ) : (
                        <Bookmark className="h-3 w-3" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-background/20 backdrop-blur-sm hover:bg-background/40 h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleShare(site)
                      }}
                    >
                      <Share2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium">{site.name}</h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {site.location}
                      </div>
                      <p className="text-xs mt-2 line-clamp-2">{truncateDescription(site.keyFeatures, 25)}</p>
                    </div>
                    {site.distance && (
                      <Badge variant="outline" className="ml-2 shrink-0 text-xs">
                        {site.distance}
                      </Badge>
                    )}
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleSiteDetails(site)}>
                      Details
                    </Button>
                    <Button
                      className="flex-1 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                      size="sm"
                      onClick={() => handleNavigate(site)}
                    >
                      <Navigation className="h-3 w-3 mr-2" />
                      Navigate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Site Detail Modal */}
      <SiteDetailModal site={selectedSite} open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}
