import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Trash2 } from "lucide-react"

// Mock data for translation history
const historyItems = [
  {
    id: 1,
    original: "𓀀𓁐𓂓𓃒𓄤",
    translated: "The pharaoh commands the building of a temple",
    from: "hieroglyph",
    to: "english",
    date: "2 hours ago",
  },
  {
    id: 2,
    original: "𓅓𓆓𓇯𓈗𓉐",
    translated: "Offerings to the gods bring prosperity",
    from: "hieroglyph",
    to: "english",
    date: "Yesterday",
  },
]

export default function TranslationHistory() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Translation History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {historyItems.map((item) => (
          <div key={item.id} className="border-b border-border pb-2 last:border-0 last:pb-0">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-muted-foreground">
                  {item.from} → {item.to}
                </p>
                <p className="text-sm font-medium mt-1">{item.original}</p>
                <p className="text-xs mt-1">{item.translated}</p>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
