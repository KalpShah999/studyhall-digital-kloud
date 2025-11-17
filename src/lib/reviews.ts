/**
 * Reviews Management System
 * Stores user reviews for places
 */

const REVIEWS_KEY = "studyhall_reviews"

export interface Review {
  id: string
  placeId: string
  placeName: string
  rating: number
  comment: string
  tags: string[]
  timestamp: number
  author: string
}

export function getAllReviews(): Review[] {
  if (typeof window === "undefined") return []
  try {
    const reviews = localStorage.getItem(REVIEWS_KEY)
    return reviews ? JSON.parse(reviews) : []
  } catch {
    return []
  }
}

export function getReviewsForPlace(placeId: string): Review[] {
  return getAllReviews().filter((r) => r.placeId === placeId)
}

export function getUserReviews(): Review[] {
  return getAllReviews()
}

export function addReview(
  placeId: string,
  placeName: string,
  rating: number,
  comment: string,
  tags: string[]
): void {
  if (typeof window === "undefined") return
  
  const review: Review = {
    id: `review_${Date.now()}`,
    placeId,
    placeName,
    rating,
    comment,
    tags,
    timestamp: Date.now(),
    author: "You",
  }
  
  const reviews = getAllReviews()
  reviews.unshift(review) // Add to beginning
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews))
  window.dispatchEvent(new CustomEvent("reviewsChanged"))
}

export function deleteReview(reviewId: string): void {
  if (typeof window === "undefined") return
  const reviews = getAllReviews().filter((r) => r.id !== reviewId)
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews))
  window.dispatchEvent(new CustomEvent("reviewsChanged"))
}

