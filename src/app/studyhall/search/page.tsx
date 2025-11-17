"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PlaceCard, Place } from "@/components/studyhall/place-card"
import { Search, MapPin, Clock, TrendingUp, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useFavorites } from "@/hooks/use-favorites"

// Mock data - no auth needed
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
    amenities: ["Quiet", "Outlets", "Natural Light", "Wi-Fi"],
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
    amenities: ["Wi-Fi", "Outlets", "Food", "Coffee", "Group Tables"],
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
    amenities: ["Wi-Fi", "Outlets", "Group Tables", "Natural Light"],
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
  {
    id: "5",
    name: "McMaster Grind",
    category: "cafe",
    distance: 540,
    rating: 4.6,
    reviewCount: 203,
    crowdLevel: "calm",
    isOpen: false,
    amenities: ["Wi-Fi", "Outlets", "Food", "Coffee", "Quiet"],
    isFavorite: false,
  },
]

const QUICK_SEARCHES = [
  { icon: MapPin, label: "Near Me", query: "", isTag: false },
  { icon: TrendingUp, label: "Library", query: "library", isTag: false },
  { icon: TrendingUp, label: "Café", query: "café", isTag: false },
  { icon: TrendingUp, label: "Quiet", query: "quiet", isTag: true },
  { icon: TrendingUp, label: "Outlets", query: "outlets", isTag: true },
  { icon: TrendingUp, label: "Natural Light", query: "natural light", isTag: true },
  { icon: TrendingUp, label: "Group Tables", query: "group tables", isTag: true },
  { icon: TrendingUp, label: "Wi-Fi", query: "wi-fi", isTag: true },
]

const RECENT_SEARCHES = ["Silent study areas", "Library", "Coffee shop"]

export default function SearchPage() {
  const router = useRouter()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [query, setQuery] = useState("")
  const [recentSearches, setRecentSearches] = useState<string[]>(RECENT_SEARCHES)
  const [results, setResults] = useState<Place[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Add favorite status to mock places
  const placesWithFavorites = useMemo(() => {
    return MOCK_PLACES.map((p) => ({
      ...p,
      isFavorite: isFavorite(p.id),
    }))
  }, [isFavorite])

  const handleSearch = (searchQuery: string, isTagSearch = false) => {
    setQuery(searchQuery)
    if (searchQuery.trim()) {
      setIsSearching(true)
      setTimeout(() => {
        const lowerQuery = searchQuery.toLowerCase()
        
        // If searching for a tag (from quick searches), prioritize amenity matches
        let filtered = placesWithFavorites.filter((p) => {
          const nameMatch = p.name.toLowerCase().includes(lowerQuery)
          const categoryMatch = p.category.toLowerCase().includes(lowerQuery)
          const amenityMatch = p.amenities.some((a) =>
            a.toLowerCase().includes(lowerQuery)
          )
          
          // If it's a tag search, only return places with matching amenities
          if (isTagSearch) {
            return amenityMatch
          }
          
          // Otherwise, search across all fields
          return nameMatch || categoryMatch || amenityMatch
        })
        
        setResults(filtered)
        setIsSearching(false)
        
        if (!recentSearches.includes(searchQuery)) {
          setRecentSearches([searchQuery, ...recentSearches.slice(0, 4)])
        }
      }, 300)
    } else {
      setResults([])
      setIsSearching(false)
    }
  }

  const removeRecentSearch = (search: string) => {
    setRecentSearches(recentSearches.filter((s) => s !== search))
  }

  const handleFavoriteToggle = (id: string) => {
    toggleFavorite(id)
    // Update local state immediately for UI responsiveness
    setResults((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header with Search */}
      <div className="sticky top-0 z-10 bg-background border-b px-4 py-4 space-y-3">
        <h1 className="text-2xl font-bold">Search</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for study places..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-10"
          />
          {query && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {!query ? (
          <div className="p-4 space-y-6">
            {/* Quick Searches */}
            <div className="space-y-3">
              <h2 className="font-semibold text-sm text-muted-foreground">
                Quick Searches
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_SEARCHES.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleSearch(item.query || item.label.toLowerCase(), item.isTag)}
                      className="flex items-center gap-2 p-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors text-left"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-semibold text-sm text-muted-foreground">
                  Recent Searches
                </h2>
                <div className="space-y-2">
                  {recentSearches.map((search) => (
                    <div
                      key={search}
                      className="flex items-center justify-between p-3 rounded-lg bg-card border border-border"
                    >
                      <button
                        onClick={() => handleSearch(search)}
                        className="flex items-center gap-3 flex-1 text-left"
                      >
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{search}</span>
                      </button>
                      <button
                        onClick={() => removeRecentSearch(search)}
                        className="text-muted-foreground hover:text-foreground p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Tags */}
            <div className="space-y-3">
              <h2 className="font-semibold text-sm text-muted-foreground">
                Popular Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {["Outlets", "Quiet", "Group Study", "Natural Light", "24/7", "Wi-Fi"].map(
                  (tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleSearch(tag)}
                    >
                      {tag}
                    </Badge>
                  )
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-sm text-muted-foreground">
                {isSearching
                  ? "Searching..."
                  : `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`}
              </h2>
            </div>

            {!isSearching && results.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <p className="text-muted-foreground">No matches found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or browsing all places
                </p>
              </div>
            ) : (
              results.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onClick={() => router.push(`/studyhall/place/${place.id}`)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}


