"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Heart, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export type Place = {
  id: string
  name: string
  category: "library" | "cafe" | "outdoor" | "other"
  distance: number // in meters
  rating: number
  reviewCount: number
  crowdLevel: "calm" | "moderate" | "busy"
  isOpen: boolean
  amenities: string[]
  image?: string
  isFavorite?: boolean
}

interface PlaceCardProps {
  place: Place
  onClick?: () => void
  onFavoriteToggle?: (id: string) => void
  showDistance?: boolean
}

export function PlaceCard({
  place,
  onClick,
  onFavoriteToggle,
  showDistance = true,
}: PlaceCardProps) {
  const crowdConfig = {
    calm: { label: "Calm", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" },
    moderate: { label: "Moderate", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" },
    busy: { label: "Busy", color: "bg-primary/10 text-primary" },
  }

  const crowd = crowdConfig[place.crowdLevel]

  return (
    <Card
      className={cn(
        "overflow-hidden transition-shadow hover:shadow-lg cursor-pointer",
        !place.isOpen && "opacity-75"
      )}
      onClick={onClick}
    >
      <div className="flex gap-3 p-3">
        {/* Image */}
        <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-muted">
          {place.image ? (
            <Image
              src={place.image}
              alt={place.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <MapPin className="h-8 w-8" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm leading-tight line-clamp-1">
              {place.name}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onFavoriteToggle?.(place.id)
              }}
              className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  place.isFavorite && "fill-primary text-primary"
                )}
              />
            </button>
          </div>

          {/* Rating & Distance */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-foreground">{place.rating}</span>
              <span>({place.reviewCount})</span>
            </div>
            {showDistance && (
              <>
                <span>•</span>
                <span>{place.distance < 1000 ? `${place.distance}m` : `${(place.distance / 1000).toFixed(1)}km`}</span>
              </>
            )}
          </div>

          {/* Status & Amenities */}
          <div className="flex flex-wrap gap-1">
            <Badge
              variant="secondary"
              className={cn("text-xs px-2 py-0", crowd.color)}
            >
              {crowd.label}
            </Badge>
            <Badge
              variant={place.isOpen ? "default" : "secondary"}
              className="text-xs px-2 py-0"
            >
              <Clock className="h-3 w-3 mr-1" />
              {place.isOpen ? "Open" : "Closed"}
            </Badge>
            {place.amenities.slice(0, 2).map((amenity) => (
              <Badge
                key={amenity}
                variant="outline"
                className="text-xs px-2 py-0"
              >
                {amenity}
              </Badge>
            ))}
            {place.amenities.length > 2 && (
              <Badge variant="outline" className="text-xs px-2 py-0">
                +{place.amenities.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}


