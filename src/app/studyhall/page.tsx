"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlaceCard, Place } from "@/components/studyhall/place-card"
import { FilterDrawer, FilterState } from "@/components/studyhall/filter-drawer"
import { List, Map, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

// Mock data - no authentication needed
const MOCK_PLACES: Place[] = [
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
    image: undefined,
    isFavorite: false,
  },
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
    image: undefined,
    isFavorite: true,
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
    image: undefined,
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
    image: undefined,
    isFavorite: false,
  },
  {
    id: "5",
    name: "McMaster Grind",
    category: "cafe",
    distance: 540,
    rating: 4.6,
    reviewCount: 203,
    crowdLevel: "calm",
    isOpen: false,
    amenities: ["Outlets", "Wi-Fi", "Food"],
    image: undefined,
    isFavorite: false,
  },
]

export default function HomePage() {
  const router = useRouter()
  const [view, setView] = useState<"list" | "map">("list")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [places, setPlaces] = useState<Place[]>(MOCK_PLACES)
  const [filters, setFilters] = useState<FilterState>({
    openNow: false,
    hasOutlets: false,
    hasWifi: false,
    nearFood: false,
    noiseLevel: 50,
    maxDistance: 2,
  })

  const activeFilterCount = Object.entries(filters).filter(
    ([key, value]) => {
      if (key === "noiseLevel") return value !== 50
      if (key === "maxDistance") return value !== 2
      return value === true
    }
  ).length

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    let filtered = [...MOCK_PLACES]
    
    if (newFilters.openNow) {
      filtered = filtered.filter((p) => p.isOpen)
    }
    if (newFilters.hasOutlets) {
      filtered = filtered.filter((p) => p.amenities.includes("Outlets"))
    }
    if (newFilters.hasWifi) {
      filtered = filtered.filter((p) => p.amenities.includes("Wi-Fi"))
    }
    if (newFilters.nearFood) {
      filtered = filtered.filter((p) => 
        p.category === "cafe" || p.amenities.includes("Food")
      )
    }
    if (newFilters.maxDistance < 2) {
      filtered = filtered.filter((p) => p.distance <= newFilters.maxDistance * 1000)
    }

    setPlaces(filtered)
  }

  const handleFavoriteToggle = (id: string) => {
    setPlaces((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b px-4 py-3 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">StudyHall</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterOpen(true)}
            className="relative"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge
                variant="default"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("list")}
            className="flex-1"
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
          <Button
            variant={view === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("map")}
            className="flex-1"
          >
            <Map className="h-4 w-4 mr-2" />
            Map
          </Button>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          {places.length} study {places.length === 1 ? "place" : "places"} nearby
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {view === "list" ? (
          <div className="p-4 space-y-3">
            {places.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <p className="text-muted-foreground">No places match your filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    const resetFilters: FilterState = {
                      openNow: false,
                      hasOutlets: false,
                      hasWifi: false,
                      nearFood: false,
                      noiseLevel: 50,
                      maxDistance: 2,
                    }
                    handleFilterChange(resetFilters)
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              places.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onClick={() => router.push(`/studyhall/place/${place.id}`)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center bg-muted text-muted-foreground">
            <div className="text-center space-y-2 p-6">
              <Map className="h-12 w-12 mx-auto mb-2" />
              <p className="font-medium">Map View</p>
              <p className="text-sm">
                Interactive map would be rendered here
                <br />
                (Requires map integration like Mapbox or Google Maps)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={handleFilterChange}
        resultCount={places.length}
      />
    </div>
  )
}


