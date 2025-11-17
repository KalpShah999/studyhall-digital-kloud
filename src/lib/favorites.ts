/**
 * Favorites Management System
 * Uses localStorage to persist favorites across the app
 */

const FAVORITES_KEY = "studyhall_favorites"
const VISITED_KEY = "studyhall_visited"

// Favorites Functions
export function getFavorites(): string[] {
  if (typeof window === "undefined") return []
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY)
    return favorites ? JSON.parse(favorites) : []
  } catch {
    return []
  }
}

export function addFavorite(placeId: string): void {
  if (typeof window === "undefined") return
  const favorites = getFavorites()
  if (!favorites.includes(placeId)) {
    favorites.push(placeId)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent("favoritesChanged"))
  }
}

export function removeFavorite(placeId: string): void {
  if (typeof window === "undefined") return
  const favorites = getFavorites().filter((id) => id !== placeId)
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  // Dispatch event to notify other components
  window.dispatchEvent(new CustomEvent("favoritesChanged"))
}

export function toggleFavorite(placeId: string): boolean {
  const favorites = getFavorites()
  const isFavorited = favorites.includes(placeId)
  
  if (isFavorited) {
    removeFavorite(placeId)
  } else {
    addFavorite(placeId)
  }
  
  return !isFavorited // Return new state
}

export function isFavorite(placeId: string): boolean {
  return getFavorites().includes(placeId)
}

// Visited Places Functions
export function getVisited(): string[] {
  if (typeof window === "undefined") return []
  try {
    const visited = localStorage.getItem(VISITED_KEY)
    return visited ? JSON.parse(visited) : []
  } catch {
    return []
  }
}

export function addVisited(placeId: string): void {
  if (typeof window === "undefined") return
  const visited = getVisited()
  // Add to beginning (most recent first)
  const filtered = visited.filter((id) => id !== placeId)
  filtered.unshift(placeId)
  // Keep only last 50 visited places
  const limited = filtered.slice(0, 50)
  localStorage.setItem(VISITED_KEY, JSON.stringify(limited))
  // Dispatch event to notify other components
  window.dispatchEvent(new CustomEvent("visitedChanged"))
}

export function clearVisited(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(VISITED_KEY)
  window.dispatchEvent(new CustomEvent("visitedChanged"))
}

