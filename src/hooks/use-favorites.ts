/**
 * Custom hook for managing favorites with localStorage sync
 */

import { useState, useEffect, useCallback } from "react"
import {
  getFavorites,
  getVisited,
  toggleFavorite as toggleFavoriteStorage,
  isFavorite,
  addVisited as addVisitedStorage,
} from "@/lib/favorites"

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [visited, setVisited] = useState<string[]>([])

  // Load favorites and visited from localStorage
  useEffect(() => {
    setFavorites(getFavorites())
    setVisited(getVisited())

    // Listen for changes from other components
    const handleFavoritesChange = () => {
      setFavorites(getFavorites())
    }

    const handleVisitedChange = () => {
      setVisited(getVisited())
    }

    window.addEventListener("favoritesChanged", handleFavoritesChange)
    window.addEventListener("visitedChanged", handleVisitedChange)

    return () => {
      window.removeEventListener("favoritesChanged", handleFavoritesChange)
      window.removeEventListener("visitedChanged", handleVisitedChange)
    }
  }, [])

  const toggleFavorite = useCallback((placeId: string) => {
    const newState = toggleFavoriteStorage(placeId)
    setFavorites(getFavorites())
    return newState
  }, [])

  const addVisited = useCallback((placeId: string) => {
    addVisitedStorage(placeId)
    setVisited(getVisited())
  }, [])

  const checkIsFavorite = useCallback((placeId: string) => {
    return favorites.includes(placeId)
  }, [favorites])

  return {
    favorites,
    visited,
    toggleFavorite,
    addVisited,
    isFavorite: checkIsFavorite,
  }
}

