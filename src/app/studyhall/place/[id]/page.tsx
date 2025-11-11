"use client"

import { useState } from "react"
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

// Mock data - no auth required
const MOCK_PLACE = {
  id: "1",
  name: "Health Sciences Library - Silent Zone",
  category: "Library",
  distance: 250,
  rating: 4.8,
  reviewCount: 124,
  crowdLevel: "moderate" as const,
  isOpen: true,
  openingHours: "Mon-Fri: 7:00 AM - 12:00 AM\nSat-Sun: 9:00 AM - 10:00 PM",
  address: "1280 Main St W, Hamilton, ON L8S 4L8",
  amenities: {
    wifi: true,
    outlets: true,
    groupTables: false,
    naturalLight: true,
  },
  description:
    "Dedicated silent study zone on the third floor. Perfect for focused work with minimal distractions.",
  tags: ["Quiet", "Outlets", "Natural Light", "Study Carrels"],
  reviews: [
    {
      id: "1",
      author: "Sarah M.",
      rating: 5,
      date: "2 days ago",
      comment: "Perfect for exam prep! Very quiet and lots of outlets.",
      tags: ["Quiet", "Outlets"],
    },
    {
      id: "2",
      author: "Alex K.",
      rating: 4,
      date: "1 week ago",
      comment: "Great spot but can get crowded during finals.",
      tags: ["Quiet", "Crowded"],
    },
  ],
  qna: [
    {
      id: "1",
      question: "Are there group study rooms nearby?",
      answer: "Yes, on the second floor",
      timestamp: "3 days ago",
    },
  ],
}

export default function PlaceDetailsPage() {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

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
              onClick={() => setIsFavorite(!isFavorite)}
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
              <h1 className="text-2xl font-bold mb-2">{MOCK_PLACE.name}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary">{MOCK_PLACE.category}</Badge>
                <span>•</span>
                <span>{MOCK_PLACE.distance}m away</span>
              </div>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-lg">{MOCK_PLACE.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {MOCK_PLACE.reviewCount} reviews
              </span>
            </div>

            {/* Live Crowd Meter */}
            <CrowdMeter level={MOCK_PLACE.crowdLevel} />

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
              <Badge variant={MOCK_PLACE.isOpen ? "default" : "secondary"}>
                <Clock className="h-3 w-3 mr-1" />
                {MOCK_PLACE.isOpen ? "Open Now" : "Closed"}
              </Badge>
            </div>
            <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
              {MOCK_PLACE.openingHours}
            </pre>
          </div>

          <Separator />

          {/* Amenities */}
          <div className="px-4 space-y-3">
            <h2 className="font-semibold">Amenities</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Wifi, label: "Wi-Fi", available: MOCK_PLACE.amenities.wifi },
                { icon: Plug, label: "Outlets", available: MOCK_PLACE.amenities.outlets },
                { icon: Users, label: "Group Tables", available: MOCK_PLACE.amenities.groupTables },
                { icon: Star, label: "Natural Light", available: MOCK_PLACE.amenities.naturalLight },
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
            <p className="text-sm text-muted-foreground">{MOCK_PLACE.description}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {MOCK_PLACE.tags.map((tag) => (
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
              {MOCK_PLACE.reviews.map((review) => (
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
              {MOCK_PLACE.qna.map((item) => (
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


