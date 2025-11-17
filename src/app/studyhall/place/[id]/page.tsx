"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CrowdMeter } from "@/components/studyhall/crowd-meter"
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Wifi,
  Plug,
  Users,
  MessageSquare,
  Heart,
  Share2,
  Navigation,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { getPlaceById, PlaceDetail } from "@/lib/mock-data"
import { use } from "react"
import { useFavorites } from "@/hooks/use-favorites"

export default function PlaceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const { toggleFavorite, isFavorite: checkIsFavorite, addVisited, favorites } = useFavorites()
  const [place, setPlace] = useState<PlaceDetail | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Load place data based on ID
  useEffect(() => {
    const placeData = getPlaceById(id)
    setPlace(placeData)
  }, [id])

  // Mark as visited only once when component mounts
  useEffect(() => {
    addVisited(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // Update favorite status when favorites change
  useEffect(() => {
    setIsFavorite(checkIsFavorite(id))
  }, [id, checkIsFavorite, favorites])

  // Show loading or not found state
  if (!place) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Place Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The study place you're looking for doesn't exist.
        </p>
        <Button onClick={() => router.push("/studyhall")}>
          Back to Home
        </Button>
      </div>
    )
  }

  const handleCheckIn = () => {
    setShowCheckIn(false)
    toast({
      title: "Checked in successfully!",
      description: "Thanks for helping the community.",
    })
  }

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive",
      })
      return
    }
    setShowReview(false)
    toast({
      title: "Review submitted!",
      description: "Thanks for your feedback.",
    })
    setRating(0)
    setReviewText("")
    setSelectedTags([])
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const reviewTags = ["Quiet", "Loud", "Good Lighting", "Dim", "Outlets", "Crowded"]

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                toggleFavorite(id)
                setIsFavorite(!isFavorite)
              }}
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  isFavorite && "fill-primary text-primary"
                )}
              />
            </button>
            <button className="p-2 hover:bg-accent rounded-full transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="space-y-6 pb-20">
          {/* Hero Image */}
          <div className="w-full h-48 bg-muted flex items-center justify-center">
            <MapPin className="h-12 w-12 text-muted-foreground" />
          </div>

          {/* Main Info */}
          <div className="px-4 space-y-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{place.name}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary">{place.category}</Badge>
                <span>•</span>
                <span>{place.distance}m away</span>
              </div>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-lg">{place.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {place.reviewCount} reviews
              </span>
            </div>

            {/* Live Crowd Meter */}
            <CrowdMeter level={place.crowdLevel} />

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => setShowCheckIn(true)}
                className="w-full"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Check In
              </Button>
              <Button
                onClick={() => setShowReview(true)}
                className="w-full"
              >
                <Star className="h-4 w-4 mr-2" />
                Write Review
              </Button>
            </div>
          </div>

          <Separator />

          {/* Opening Hours */}
          <div className="px-4 space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Opening Hours</h2>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={place.isOpen ? "default" : "secondary"}>
                <Clock className="h-3 w-3 mr-1" />
                {place.isOpen ? "Open Now" : "Closed"}
              </Badge>
            </div>
            <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
              {place.openingHours}
            </pre>
          </div>

          <Separator />

          {/* Amenities */}
          <div className="px-4 space-y-3">
            <h2 className="font-semibold">Amenities</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Wifi, label: "Wi-Fi", available: place.amenities.wifi },
                { icon: Plug, label: "Outlets", available: place.amenities.outlets },
                { icon: Users, label: "Group Tables", available: place.amenities.groupTables },
                { icon: Star, label: "Natural Light", available: place.amenities.naturalLight },
              ].map((amenity) => {
                const Icon = amenity.icon
                return (
                  <div
                    key={amenity.label}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg border",
                      amenity.available
                        ? "border-primary/30 bg-primary/5"
                        : "border-border bg-muted opacity-50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{amenity.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div className="px-4 space-y-2">
            <h2 className="font-semibold">About</h2>
            <p className="text-sm text-muted-foreground">{place.description}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {place.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Reviews */}
          <div className="px-4 space-y-3">
            <h2 className="font-semibold">Recent Reviews</h2>
            <div className="space-y-3">
              {place.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm">{review.author}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                    <div className="flex flex-wrap gap-1">
                      {review.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Q&A */}
          <div className="px-4 space-y-3">
            <h2 className="font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Community Q&A
            </h2>
            <div className="space-y-3">
              {place.qna.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4 space-y-2">
                    <p className="font-medium text-sm">{item.question}</p>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                    <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              Ask a Question
            </Button>
          </div>
        </div>
      </div>

      {/* Check-In Modal */}
      <Dialog open={showCheckIn} onOpenChange={setShowCheckIn}>
        <DialogContent className="max-w-[340px]">
          <DialogHeader>
            <DialogTitle>Check In</DialogTitle>
            <DialogDescription>
              Help others by sharing the current crowd level
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Your check-in is anonymous and helps keep crowd info accurate.
            </p>
            <div className="flex gap-3">
              <Button onClick={handleCheckIn} className="flex-1">
                I'm Here
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCheckIn(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Write Review Modal */}
      <Dialog open={showReview} onOpenChange={setShowReview}>
        <DialogContent className="max-w-[340px]">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>
              Share your experience with the community
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Rating */}
            <div className="space-y-2">
              <Label>Rating *</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1"
                  >
                    <Star
                      className={cn(
                        "h-8 w-8",
                        star <= rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags (optional)</Label>
              <div className="flex flex-wrap gap-2">
                {reviewTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="space-y-2">
              <Label htmlFor="review-comment">Comment (optional)</Label>
              <Textarea
                id="review-comment"
                placeholder="Share your experience..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSubmitReview} className="flex-1">
                Submit
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowReview(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


