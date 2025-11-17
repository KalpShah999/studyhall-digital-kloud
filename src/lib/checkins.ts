/**
 * Check-in Management System
 * Tracks current check-in location
 */

const CHECKIN_KEY = "studyhall_current_checkin"

export interface CheckIn {
  placeId: string
  placeName: string
  timestamp: number
}

export function getCurrentCheckIn(): CheckIn | null {
  if (typeof window === "undefined") return null
  try {
    const checkin = localStorage.getItem(CHECKIN_KEY)
    return checkin ? JSON.parse(checkin) : null
  } catch {
    return null
  }
}

export function checkInToPlace(placeId: string, placeName: string): void {
  if (typeof window === "undefined") return
  const checkin: CheckIn = {
    placeId,
    placeName,
    timestamp: Date.now(),
  }
  localStorage.setItem(CHECKIN_KEY, JSON.stringify(checkin))
  window.dispatchEvent(new CustomEvent("checkinChanged"))
}

export function clearCheckIn(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(CHECKIN_KEY)
  window.dispatchEvent(new CustomEvent("checkinChanged"))
}

export function isCheckedInAt(placeId: string): boolean {
  const checkin = getCurrentCheckIn()
  return checkin?.placeId === placeId
}

