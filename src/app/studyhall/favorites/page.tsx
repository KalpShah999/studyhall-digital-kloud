"use client"

import { useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlaceCard, Place } from "@/components/studyhall/place-card"
import { Button } from "@/components/ui/button"
import { Heart, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useFavorites } from "@/hooks/use-favorites"
import { getAllPlaces } from "@/lib/mock-data"

export default function FavoritesPage() {
  const router = useRouter()
  const { favorites: favoriteIds, visited: visitedIds, toggleFavorite, isFavorite } = useFavorites()
  
  // Get all places from database
  const allPlaces = useMemo(() => getAllPlaces(), [])

  // Convert favorite IDs to Place objects
  const favoritePlaces = useMemo(() => {
    return favoriteIds
      .map((id) => allPlaces.find((p) => p.id === id))
      .filter((p): p is NonNullable<typeof p> => p !== undefined)
      .map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category.toLowerCase() as "library" | "cafe" | "outdoor" | "other",
        distance: p.distance,
        rating: p.rating,
        reviewCount: p.reviewCount,
        crowdLevel: p.crowdLevel,
        isOpen: p.isOpen,
        amenities: p.tags.slice(0, 3),
        isFavorite: true,
      }))
  }, [favoriteIds, allPlaces])

  // Convert visited IDs to Place objects
  const visitedPlaces = useMemo(() => {
    return visitedIds
      .map((id) => allPlaces.find((p) => p.id === id))
      .filter((p): p is NonNullable<typeof p> => p !== undefined)
      .map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category.toLowerCase() as "library" | "cafe" | "outdoor" | "other",
        distance: p.distance,
        rating: p.rating,
        reviewCount: p.reviewCount,
        crowdLevel: p.crowdLevel,
        isOpen: p.isOpen,
        amenities: p.tags.slice(0, 3),
        isFavorite: isFavorite(p.id),
      }))
  }, [visitedIds, allPlaces, isFavorite])

  const handleFavoriteToggle = (id: string) => {
    toggleFavorite(id)
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
              {favoritePlaces.length === 0 ? (
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
                      {favoritePlaces.length} favorite{favoritePlaces.length !== 1 ? "s" : ""}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push("/studyhall/notifications")}
                    >
                      Manage Alerts
                    </Button>
                  </div>
                  {favoritePlaces.map((place) => (
                    <PlaceCard
                      key={place.id}
                      place={place}
                      onClick={() => router.push(`/studyhall/place/${place.id}`)}
                      onFavoriteToggle={handleFavoriteToggle}
                    />
                  ))}
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="visited" className="flex-1 overflow-auto mt-0">
            <div className="p-4 space-y-3">
              {visitedPlaces.length === 0 ? (
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
                      {visitedPlaces.length} place{visitedPlaces.length !== 1 ? "s" : ""} visited
                    </p>
                  </div>
                  {visitedPlaces.map((place) => (
                    <PlaceCard
                      key={place.id}
                      place={place}
                      onClick={() => router.push(`/studyhall/place/${place.id}`)}
                      onFavoriteToggle={handleFavoriteToggle}
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


