"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CuboidIcon as Cube, Info, RotateCw, ZoomIn } from "lucide-react"

const vrExperiences = [
  {
    id: 2,
    name: "Tutankhamun's Mask",
    description: "Examine the famous golden mask in interactive 3D",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/CairoEgMuseumTaaMaskMostlyPhotographed.jpg/1200px-CairoEgMuseumTaaMaskMostlyPhotographed.jpg",
    type: "artifact",
    embedUrl: "https://sketchfab.com/models/4d5723e76ef446daabc293ce8fc332b8/embed",
  },
  {
    id: 4,
    name: "Rosetta Stone",
    description: "Study the key to deciphering hieroglyphs",
    image:
      "https://www.britishmuseum.org/sites/default/files/styles/uncropped_huge/public/2022-06/Rosetta-Stone-in-situ.jpg?itok=BOzcDbrL",
    type: "artifact",
    embedUrl: "https://sketchfab.com/models/1e03509704a3490e99a173e53b93e282/embed",
  },
  {
    id: 5,
    name: "Egyptian Pharaohs Buildings",
    description: "Explore ancient Egyptian pharaonic architecture",
    image:
      "https://media.sketchfab.com/models/a730765db5344b7593d25671ce2c9f4f/thumbnails/155bc84fecb64e03af64d320ab7425a6/73c6065d3d5a4942a5c92edb3439bf32.jpeg",
    type: "monument",
    embedUrl: "https://sketchfab.com/models/a730765db5344b7593d25671ce2c9f4f/embed",
  },
  {
    id: 6,
    name: "Egyptian Pottery",
    description: "Examine ancient Egyptian pottery and ceramics",
    image:
      "https://media.sketchfab.com/models/47fcc5c4e54949a082a8b3508b8ada4f/thumbnails/d30ce3dc8cc042f09d8d4ba8a57dfbad/e8068737af1d4b1c9fb7ceae38e47a69.jpeg",
    type: "artifact",
    embedUrl: "https://sketchfab.com/models/47fcc5c4e54949a082a8b3508b8ada4f/embed",
  },
  {
    id: 7,
    name: "Egyptian Weapons",
    description: "Study ancient Egyptian weaponry and tools",
    image:
      "https://media.sketchfab.com/models/3f04f9a7f9eb4ebabefea13a6b3d6cef/thumbnails/61e7e3bcd61d4778919b7a2ec973baa3/bb8a924a181f4dcdb601e8f6924bf910.jpeg",
    type: "artifact",
    embedUrl: "https://sketchfab.com/models/3f04f9a7f9eb4ebabefea13a6b3d6cef/embed",
  },
  {
    id: 8,
    name: "Egypt Souvenir Box",
    description: "Examine a decorative Egyptian souvenir box",
    image:
      "https://media.sketchfab.com/models/8d2930eab3ba4ee58dbafeae9036a238/thumbnails/9684cfada43d412dbd7fd6317176bbd6/829e99fe2b4c4ed89482ac9bdf080893.jpeg",
    type: "artifact",
    embedUrl: "https://sketchfab.com/models/8d2930eab3ba4ee58dbafeae9036a238/embed",
  },
  {
    id: 9,
    name: "Egyptian Obelisk",
    description: "Study the iconic Egyptian obelisk structure",
    image:
      "https://media.sketchfab.com/models/88d990ba831648728850517056169939/thumbnails/ce920b76abe24252988f9a4fba85b14d/b6003758c9b14f4192e477e5a3822b98.jpeg",
    type: "monument",
    embedUrl: "https://sketchfab.com/models/88d990ba831648728850517056169939/embed",
  },
  {
    id: 10,
    name: "Nested Coffins of Iawttasheret",
    description: "Explore ancient Egyptian burial coffins",
    image:
      "https://media.sketchfab.com/models/d94cb95d440d48d4b3a3711410013f17/thumbnails/5f4601f1ad6f4c6ca3d773ba43bd9c46/d61d5bf493794f16a82f92d5c5da29f5.jpeg",
    type: "artifact",
    embedUrl: "https://sketchfab.com/models/d94cb95d440d48d4b3a3711410013f17/embed",
  },
  {
    id: 11,
    name: "Egyptian Cat Statue",
    description: "Examine a statue of a cat, sacred to ancient Egyptians",
    image:
      "https://media.sketchfab.com/models/02b0456362f9442da46d39fb34b3ee5b/thumbnails/413b7ece335740a0a3e19958dfb89d70/c61fbb34d74a49ffb56b87c4f6719669.jpeg",
    type: "artifact",
    embedUrl: "https://sketchfab.com/models/02b0456362f9442da46d39fb34b3ee5b/embed",
  },
  {
    id: 12,
    name: "Egyptian Crown with Uraeus",
    description: "Study the royal crown with cobra emblem",
    image:
      "https://media.sketchfab.com/models/3fe38e74b4cc4a2b84c907a06673b415/thumbnails/873228a87b054f11b876f6fda2c82bc2/1f022ffbb9844070b97e884ea8fff70c.jpeg",
    embedUrl: "https://sketchfab.com/models/3fe38e74b4cc4a2b84c907a06673b415/embed",
  },
  {
    id: 13,
    name: "Egyptian Scarab Beetle",
    description: "Examine the sacred scarab beetle artifact",
    image:
      "https://media.sketchfab.com/models/b4cd7baabeea42e192c54eb02ca72c1a/thumbnails/15fdfd4b4320493cabd083d87a180714/1024x576.jpeg",
    type: "artifact",
    embedUrl: "https://sketchfab.com/models/b4cd7baabeea42e192c54eb02ca72c1a/embed",
  },
  {
    id: 14,
    name: "Egyptian Sandal",
    description: "Study ancient Egyptian footwear",
    image:
      "https://media.sketchfab.com/models/a412bc98d3504336bd1baa250dc9394a/thumbnails/b1ddfbdd4d584c45ae3be77904a32c11/377118089b6b451b91ebcbecebb279da.jpeg",
    type: "artifact",
    embedUrl: "https://sketchfab.com/models/a412bc98d3504336bd1baa250dc9394a/embed",
  },
  {
    id: 15,
    name: "Egyptian Temple",
    description: "Explore the architecture of an Egyptian temple",
    image:
      "https://media.sketchfab.com/models/c46e7c4460ab4bea9628823a037068ed/thumbnails/963e20cbfea74639b8a62dec50584bf2/eb52f5b7b429466a8788b9def5fbe768.jpeg",
    type: "monument",
    embedUrl: "https://sketchfab.com/models/c46e7c4460ab4bea9628823a037068ed/embed",
  },
  {
    id: 16,
    name: "Egyptian Column",
    description: "Study the detailed design of an Egyptian column",
    image:
      "https://media.sketchfab.com/models/288240111c3e4d68867b932448db1bb4/thumbnails/437752b5e67443289918ba642f565e89/9738d66404cd4b19b23f3468cc54bf02.jpeg",
    type: "monument",
    embedUrl: "https://sketchfab.com/models/288240111c3e4d68867b932448db1bb4/embed",
  },
  {
    id: 17,
    name: "Coffins of Pa-di-mut, Mut-iy-y, and Ankh-Khonsu",
    description: "Examine ancient Egyptian burial coffins",
    image:
      "https://media.sketchfab.com/models/012ae83b8d9045468b30584883149035/thumbnails/264e2b5af5d642d4ac4b6ee5ee9f4a2d/69ebfde922c741eca8683b7734b0eba9.jpeg",
    type: "artifact",
    embedUrl: "https://sketchfab.com/models/012ae83b8d9045468b30584883149035/embed",
  },
  {
    id: 18,
    name: "Ancient Egypt Pack",
    description: "Collection of various Egyptian artifacts",
    image:
      "https://media.sketchfab.com/models/a04604cf286242819f01b16395f23cd0/thumbnails/96196de1d70c43fca4fdbd5d3719566e/6f271859200741e1b57d6fe2e811d6a4.jpeg",
    type: "artifact",
    embedUrl: "https://sketchfab.com/models/a04604cf286242819f01b16395f23cd0/embed",
  },
]

export default function VrPage() {
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null)
  const [activeType, setActiveType] = useState("all")

  const filteredExperiences = vrExperiences.filter((exp) => activeType === "all" || exp.type === activeType)

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-[#FFD700] font-poppins">VR Experience</h1>

      <Tabs defaultValue="vr">
        <TabsList className="w-full">
          <TabsTrigger value="vr" className="w-full">
            {selectedExperience !== null
              ? vrExperiences.find((exp) => exp.id === selectedExperience)?.name
              : "Experiences"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vr" className="space-y-4 mt-4">
          {selectedExperience === null ? (
            <>
              <div className="flex space-x-2 overflow-x-auto py-1 -mx-4 px-4">
                <Button
                  variant={activeType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveType("all")}
                  className={activeType === "all" ? "bg-[#FFD700] text-black hover:bg-[#FFD700]/90" : ""}
                >
                  All
                </Button>
                <Button
                  variant={activeType === "monument" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveType("monument")}
                  className={activeType === "monument" ? "bg-[#FFD700] text-black hover:bg-[#FFD700]/90" : ""}
                >
                  Monuments
                </Button>
                <Button
                  variant={activeType === "artifact" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveType("artifact")}
                  className={activeType === "artifact" ? "bg-[#FFD700] text-black hover:bg-[#FFD700]/90" : ""}
                >
                  Artifacts
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {filteredExperiences.map((exp) => (
                  <Card
                    key={exp.id}
                    className="overflow-hidden border-border hover:border-[#FFD700]/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedExperience(exp.id)}
                  >
                    <div className="aspect-square relative bg-accent">
                      <img
                        src={exp.image || "/placeholder.svg"}
                        alt={exp.name}
                        className="object-cover w-full h-full"
                      />
                      <Badge
                        className="absolute top-2 right-2"
                        variant={exp.type === "monument" ? "default" : "secondary"}
                      >
                        {exp.type === "monument" ? "Monument" : "Artifact"}
                      </Badge>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm">{exp.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{exp.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <VrExperienceView
              experience={vrExperiences.find((exp) => exp.id === selectedExperience)!}
              onBack={() => setSelectedExperience(null)}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface VrExperienceViewProps {
  experience: {
    id: number
    name: string
    description: string
    image: string
    type: string
    embedUrl: string | null
  }
  onBack: () => void
}

function VrExperienceView({ experience, onBack }: VrExperienceViewProps) {
  const [showInfo, setShowInfo] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={onBack}>
        ← Back to experiences
      </Button>

      <div ref={contentRef} className="relative rounded-lg overflow-hidden bg-black aspect-square">
        {experience.embedUrl ? (
          <div className="w-full h-full">
            <iframe
              ref={iframeRef}
              title={experience.name}
              frameBorder="0"
              allowFullScreen
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              xr-spatial-tracking="true"
              execution-while-out-of-viewport="true"
              execution-while-not-rendered="true"
              web-share="true"
              src={experience.embedUrl}
              className="w-full h-full"
            />
          </div>
        ) : (
          <>
            <img
              src={experience.image || "/placeholder.svg"}
              alt={experience.name}
              className="object-cover w-full h-full opacity-80"
            />

            <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
              <Button variant="outline" size="icon" className="bg-background/20 backdrop-blur-sm">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-background/20 backdrop-blur-sm">
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`bg-background/20 backdrop-blur-sm ${showInfo ? "border-[#FFD700]" : ""}`}
                onClick={() => setShowInfo(!showInfo)}
              >
                <Info className={`h-4 w-4 ${showInfo ? "text-[#FFD700]" : ""}`} />
              </Button>
            </div>

            <div className="absolute top-4 left-4">
              <Badge className="bg-[#FFD700] text-black">VR Mode</Badge>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Cube className="h-16 w-16 text-[#FFD700]/50 animate-pulse" />
            </div>
          </>
        )}

        {showInfo && (
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Card className="bg-background/90 backdrop-blur-sm border-[#FFD700]/30">
              <CardContent className="p-4 space-y-2">
                <h3 className="text-sm font-medium text-[#FFD700]">{experience.name}</h3>
                <p className="text-xs">{experience.description}</p>
                <div className="text-xs text-muted-foreground">
                  <p>• Drag to rotate the 3D model</p>
                  <p>• Scroll to zoom in and out</p>
                  <p>• Double click to reset view</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
