/**
 * Suggested Tags for Places
 * Used for autocomplete when adding/reviewing places
 */

export const SUGGESTED_TAGS = [
  // Noise Level
  "Quiet",
  "Silent",
  "Moderate Noise",
  "Loud",
  "Conversational",
  
  // Amenities
  "Outlets",
  "Wi-Fi",
  "No Wi-Fi",
  "USB Charging",
  "Power Strips",
  
  // Lighting
  "Natural Light",
  "Good Lighting",
  "Dim",
  "Bright",
  "Windows",
  
  // Seating
  "Comfortable Seating",
  "Hard Chairs",
  "Sofas",
  "Study Carrels",
  "Standing Desks",
  "Adjustable Desks",
  
  // Space Type
  "Group Tables",
  "Individual Desks",
  "Collaborative Space",
  "Private Rooms",
  "Open Space",
  "Cubicles",
  
  // Atmosphere
  "Focused",
  "Relaxed",
  "Professional",
  "Casual",
  "Inspiring",
  
  // Food & Drink
  "Food Allowed",
  "No Food",
  "Drink Allowed",
  "Vending Machines",
  "Coffee Shop Nearby",
  "Microwave",
  
  // Crowding
  "Usually Empty",
  "Moderate Traffic",
  "Crowded",
  "Busy During Finals",
  "Quiet in Mornings",
  
  // Temperature
  "Air Conditioned",
  "Well Ventilated",
  "Cold",
  "Warm",
  
  // Accessibility
  "Wheelchair Accessible",
  "Elevator Access",
  "Ground Floor",
  
  // Other
  "24/7 Access",
  "Whiteboards",
  "Printers Nearby",
  "Lockers",
  "Bike Parking",
  "Close to Campus",
  "Scenic View",
]

export function searchTags(query: string): string[] {
  if (!query.trim()) return []
  
  const lowerQuery = query.toLowerCase()
  return SUGGESTED_TAGS.filter((tag) =>
    tag.toLowerCase().includes(lowerQuery)
  ).slice(0, 8) // Return top 8 matches
}

