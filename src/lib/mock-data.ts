// Centralized mock data for all study places
// This ensures consistency across all pages

export type PlaceDetail = {
  id: string
  name: string
  category: "Library" | "Café" | "Outdoor" | "Other"
  distance: number
  rating: number
  reviewCount: number
  crowdLevel: "calm" | "moderate" | "busy"
  isOpen: boolean
  openingHours: string
  address: string
  amenities: {
    wifi: boolean
    outlets: boolean
    groupTables: boolean
    naturalLight: boolean
  }
  description: string
  tags: string[]
  reviews: Array<{
    id: string
    author: string
    rating: number
    date: string
    comment: string
    tags: string[]
  }>
  qna: Array<{
    id: string
    question: string
    answer: string
    timestamp: string
  }>
}

export const PLACES_DATABASE: Record<string, PlaceDetail> = {
  "1": {
    id: "1",
    name: "Health Sciences Library - Silent Zone",
    category: "Library",
    distance: 250,
    rating: 4.8,
    reviewCount: 124,
    crowdLevel: "moderate",
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
  },
  "2": {
    id: "2",
    name: "Togo Café Back Room",
    category: "Café",
    distance: 420,
    rating: 4.5,
    reviewCount: 89,
    crowdLevel: "busy",
    isOpen: true,
    openingHours: "Mon-Fri: 7:30 AM - 8:00 PM\nSat-Sun: 9:00 AM - 6:00 PM",
    address: "1280 Main St W, Hamilton, ON L8S 4L8",
    amenities: {
      wifi: true,
      outlets: true,
      groupTables: true,
      naturalLight: false,
    },
    description:
      "Cozy back room at Togo Café with comfortable seating and great coffee. Perfect for group study or solo work with a caffeine boost.",
    tags: ["Wi-Fi", "Outlets", "Food", "Coffee"],
    reviews: [
      {
        id: "1",
        author: "Mike T.",
        rating: 5,
        date: "1 day ago",
        comment: "Love the atmosphere! Great coffee and good for studying.",
        tags: ["Good Lighting", "Outlets"],
      },
      {
        id: "2",
        author: "Emma R.",
        rating: 4,
        date: "3 days ago",
        comment: "Can get a bit loud during lunch hours, but otherwise great!",
        tags: ["Loud", "Crowded"],
      },
    ],
    qna: [
      {
        id: "1",
        question: "Do they have oat milk?",
        answer: "Yes, they have oat, almond, and soy milk options",
        timestamp: "5 days ago",
      },
    ],
  },
  "3": {
    id: "3",
    name: "Mills Library Study Lounge",
    category: "Library",
    distance: 180,
    rating: 4.7,
    reviewCount: 156,
    crowdLevel: "calm",
    isOpen: true,
    openingHours: "Mon-Fri: 7:00 AM - 2:00 AM\nSat-Sun: 9:00 AM - 2:00 AM",
    address: "1280 Main St W, Hamilton, ON L8S 4K1",
    amenities: {
      wifi: true,
      outlets: true,
      groupTables: true,
      naturalLight: true,
    },
    description:
      "Spacious study lounge with comfortable seating and plenty of natural light. Great for both individual and group study sessions.",
    tags: ["Wi-Fi", "Outlets", "Group Tables", "Natural Light"],
    reviews: [
      {
        id: "1",
        author: "Jennifer L.",
        rating: 5,
        date: "4 hours ago",
        comment: "My favorite study spot! Always clean and well-maintained.",
        tags: ["Quiet", "Good Lighting"],
      },
      {
        id: "2",
        author: "David P.",
        rating: 5,
        date: "2 days ago",
        comment: "Great for group projects. Plenty of space and outlets.",
        tags: ["Good Lighting", "Outlets"],
      },
    ],
    qna: [
      {
        id: "1",
        question: "Is food allowed here?",
        answer: "Yes, but please keep it tidy!",
        timestamp: "1 week ago",
      },
    ],
  },
  "4": {
    id: "4",
    name: "Engineering Building Atrium",
    category: "Other",
    distance: 320,
    rating: 4.2,
    reviewCount: 67,
    crowdLevel: "moderate",
    isOpen: true,
    openingHours: "Mon-Fri: 6:00 AM - 11:00 PM\nSat-Sun: 8:00 AM - 10:00 PM",
    address: "1280 Main St W, Hamilton, ON L8S 4L7",
    amenities: {
      wifi: true,
      outlets: false,
      groupTables: true,
      naturalLight: true,
    },
    description:
      "Open atrium space in the Engineering building. Good for collaborative work and group discussions.",
    tags: ["Wi-Fi", "Group Tables", "Natural Light", "Open Space"],
    reviews: [
      {
        id: "1",
        author: "Tom B.",
        rating: 4,
        date: "1 week ago",
        comment: "Good for group work, but can be noisy sometimes.",
        tags: ["Loud", "Good Lighting"],
      },
      {
        id: "2",
        author: "Lisa K.",
        rating: 4,
        date: "2 weeks ago",
        comment: "Nice natural light and open space.",
        tags: ["Good Lighting"],
      },
    ],
    qna: [
      {
        id: "1",
        question: "Are there whiteboards available?",
        answer: "Yes, several portable whiteboards are available",
        timestamp: "2 weeks ago",
      },
    ],
  },
  "5": {
    id: "5",
    name: "McMaster Grind",
    category: "Café",
    distance: 540,
    rating: 4.6,
    reviewCount: 203,
    crowdLevel: "calm",
    isOpen: false,
    openingHours: "Mon-Fri: 7:00 AM - 6:00 PM\nSat-Sun: Closed",
    address: "1280 Main St W, Hamilton, ON L8S 4K1",
    amenities: {
      wifi: true,
      outlets: true,
      groupTables: false,
      naturalLight: false,
    },
    description:
      "Popular coffee shop on campus. Great coffee, pastries, and a relaxed atmosphere for studying.",
    tags: ["Wi-Fi", "Outlets", "Food", "Coffee", "Quiet"],
    reviews: [
      {
        id: "1",
        author: "Rachel S.",
        rating: 5,
        date: "3 days ago",
        comment: "Best coffee on campus! Quiet and cozy.",
        tags: ["Quiet", "Outlets"],
      },
      {
        id: "2",
        author: "Chris H.",
        rating: 4,
        date: "1 week ago",
        comment: "Good for a few hours of studying. Gets busy around noon.",
        tags: ["Crowded"],
      },
    ],
    qna: [
      {
        id: "1",
        question: "Do they have vegan options?",
        answer: "Yes, several vegan pastries and milk alternatives",
        timestamp: "4 days ago",
      },
    ],
  },
}

// Helper function to get place by ID
export function getPlaceById(id: string): PlaceDetail | null {
  return PLACES_DATABASE[id] || null
}

// Helper function to get all places
export function getAllPlaces(): PlaceDetail[] {
  return Object.values(PLACES_DATABASE)
}

