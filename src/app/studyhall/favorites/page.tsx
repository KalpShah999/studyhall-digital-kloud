"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlaceCard, Place } from "@/components/studyhall/place-card"
import { Button } from "@/components/ui/button"
import { Heart, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data - no auth needed
const MOCK_FAVORITES: Place[] = [
  {
    id: "2",
    name: "Togo Café Back Room",
    category: "cafe",
    distance: 420,
    rating: 4.5,
    reviewCount: 89,
    crowdLevel: "busy",
    isOpen: true,
    amenities: ["Outlets", "Wi-Fi", "Food"],
    isFavorite: true,
  },
  {
    id: "6",
    name: "Student Center Lounge",
    category: "other",
    distance: 350,
    rating: 4.3,
    reviewCount: 45,
    crowdLevel: "moderate",
    isOpen: true,
    amenities: ["Wi-Fi", "Group Tables"],
    isFavorite: true,
  },
]

const MOCK_VISITED: Place[] = [
  {
    id: "1",
    name: "Health Sciences Library - Silent Zone",
    category: "library",
    distance: 250,
    rating: 4.8,
    reviewCount: 124,
    crowdLevel: "moderate",
    isOpen: true,
    amenities: ["Outlets", "Wi-Fi", "Quiet"],
    isFavorite: false,
  },
  {
    id: "3",
    name: "Mills Library Study Lounge",
    category: "library",
    distance: 180,
    rating: 4.7,
    reviewCount: 156,
    crowdLevel: "calm",
    isOpen: true,
    amenities: ["Outlets", "Wi-Fi", "Group Tables"],
    isFavorite: false,
  },
  {
    id: "4",
    name: "Engineering Building Atrium",
    category: "other",
    distance: 320,
    rating: 4.2,
    reviewCount: 67,
    crowdLevel: "moderate",
    isOpen: true,
    amenities: ["Wi-Fi", "Group Tables", "Natural Light"],
    isFavorite: false,
  },
]

export default function FavoritesPage() {
  const router = useRouter()
  const [favorites, setFavorites] = useState<Place[]>(MOCK_FAVORITES)
  const [visited, setVisited] = useState<Place[]>(MOCK_VISITED)

  const handleFavoriteToggle = (id: string, isFavoritesTab: boolean) => {
    if (isFavoritesTab) {
      setFavorites((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
      )
    } else {
      setVisited((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
      )
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b px-4 py-4">
        <h1 className="text-2xl font-bold">My Places</h1>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="favorites" className="flex flex-col h-full">
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="favorites" className="flex-1">
              <Heart className="h-4 w-4 mr-2" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="visited" className="flex-1">
              <Clock className="h-4 w-4 mr-2" />
              Visited
            </TabsTrigger>
          </TabsList>

          <TabsContent value="favorites" className="flex-1 overflow-auto mt-0">
            <div className="p-4 space-y-3">
              {favorites.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <Heart className="h-16 w-16 mx-auto text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="font-medium">No favorites yet</p>
                    <p className="text-sm text-muted-foreground">
                      Tap the heart icon on any study place to add it here
                    </p>
                  </div>
                  <Button
                    onClick={() => router.push("/studyhall")}
                    variant="outline"
                  >
                    Explore Places
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      {favorites.length} favorite{favorites.length !== 1 ? "s" : ""}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push("/studyhall/notifications")}
                    >
                      Manage Alerts
                    </Button>
                  </div>
                  {favorites.map((place) => (
                    <PlaceCard
                      key={place.id}
                      place={place}
                      onClick={() => router.push(`/studyhall/place/${place.id}`)}
                      onFavoriteToggle={(id) => handleFavoriteToggle(id, true)}
                    />
                  ))}
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="visited" className="flex-1 overflow-auto mt-0">
            <div className="p-4 space-y-3">
              {visited.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <Clock className="h-16 w-16 mx-auto text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="font-medium">No visit history</p>
                    <p className="text-sm text-muted-foreground">
                      Places you check into will appear here
                    </p>
                  </div>
                  <Button
                    onClick={() => router.push("/studyhall")}
                    variant="outline"
                  >
                    Find a Place
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      {visited.length} place{visited.length !== 1 ? "s" : ""} visited
                    </p>
                  </div>
                  {visited.map((place) => (
                    <PlaceCard
                      key={place.id}
                      place={place}
                      onClick={() => router.push(`/studyhall/place/${place.id}`)}
                      onFavoriteToggle={(id) => handleFavoriteToggle(id, false)}
                    />
                  ))}
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


