// Centralized mock data for all study places
// This ensures consistency across all pages
// Images are stored locally in /public/places/

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
  image?: string
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
    name: "Mills Memorial Library - Main Floor",
    category: "Library",
    distance: 180,
    rating: 4.7,
    reviewCount: 456,
    crowdLevel: "moderate",
    isOpen: true,
    openingHours: "Mon-Thu: 7:00 AM - 2:00 AM\nFri: 7:00 AM - 10:00 PM\nSat: 9:00 AM - 10:00 PM\nSun: 9:00 AM - 2:00 AM",
    address: "1280 Main Street West, Hamilton, ON L8S 4K1",
    image: "/places/mills-library.jpg",
    amenities: {
      wifi: true,
      outlets: true,
      groupTables: true,
      naturalLight: true,
    },
    description:
      "The central library on campus with multiple floors offering diverse study environments. Main floor features group tables, comfortable seating, and excellent natural light from large windows.",
    tags: ["Wi-Fi", "Outlets", "Group Tables", "Natural Light", "Central Location"],
    reviews: [
      {
        id: "1",
        author: "Jennifer L.",
        rating: 5,
        date: "4 hours ago",
        comment: "My favorite study spot! Always clean and well-maintained. Love the natural light!",
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
  "2": {
    id: "2",
    name: "H.G. Thode Library - Silent Study Zone",
    category: "Library",
    distance: 320,
    rating: 4.8,
    reviewCount: 342,
    crowdLevel: "calm",
    isOpen: true,
    openingHours: "Mon-Thu: 7:00 AM - 12:00 AM\nFri: 7:00 AM - 8:00 PM\nSat-Sun: 9:00 AM - 8:00 PM",
    address: "1280 Main Street West, Hamilton, ON L8S 4L8",
    image: "/places/thode-library.jpg",
    amenities: {
      wifi: true,
      outlets: true,
      groupTables: false,
      naturalLight: true,
    },
    description:
      "Premium silent study zone in Thode Library. Perfect for science and engineering students needing absolute quiet for focused work. Features individual study carrels with outlets.",
    tags: ["Quiet", "Outlets", "Natural Light", "Study Carrels", "Science"],
    reviews: [
      {
        id: "1",
        author: "Sarah M.",
        rating: 5,
        date: "2 days ago",
        comment: "Perfect for exam prep! Very quiet and lots of outlets. My go-to spot.",
        tags: ["Quiet", "Outlets"],
      },
      {
        id: "2",
        author: "Alex K.",
        rating: 4,
        date: "1 week ago",
        comment: "Great spot but can get crowded during finals. Come early!",
        tags: ["Quiet", "Crowded"],
      },
    ],
    qna: [
      {
        id: "1",
        question: "Are there group study rooms nearby?",
        answer: "Yes, on the first floor there are several group study spaces",
        timestamp: "3 days ago",
      },
    ],
  },
  "3": {
    id: "3",
    name: "Thode Library - iStudy Space",
    category: "Library",
    distance: 340,
    rating: 4.6,
    reviewCount: 187,
    crowdLevel: "moderate",
    isOpen: true,
    openingHours: "Mon-Fri: 8:00 AM - 10:00 PM\nSat-Sun: 10:00 AM - 6:00 PM",
    address: "1280 Main Street West, Hamilton, ON L8S 4L8",
    image: "/places/istudy-space.jpg",
    amenities: {
      wifi: true,
      outlets: true,
      groupTables: true,
      naturalLight: false,
    },
    description:
      "Collaborative learning space on the third floor of Thode Library designed for Honours Integrated Science students. Features work tables, large whiteboards, and project areas perfect for team-based work.",
    tags: ["Wi-Fi", "Outlets", "Group Tables", "Whiteboards", "Collaborative"],
    reviews: [
      {
        id: "1",
        author: "Marcus T.",
        rating: 5,
        date: "1 day ago",
        comment: "Perfect for group projects! The whiteboards are a game changer.",
        tags: ["Good Lighting", "Outlets"],
      },
    ],
    qna: [
      {
        id: "1",
        question: "Is this space open to all students?",
        answer: "While designed for iSci students, it's generally available to all",
        timestamp: "1 week ago",
      },
    ],
  },
  "4": {
    id: "4",
    name: "Innis Library",
    category: "Library",
    distance: 290,
    rating: 4.5,
    reviewCount: 234,
    crowdLevel: "calm",
    isOpen: true,
    openingHours: "Mon-Fri: 8:00 AM - 10:00 PM\nSat-Sun: 10:00 AM - 8:00 PM",
    address: "Kenneth Taylor Hall, 1280 Main St W, Hamilton, ON L8S 4M4",
    image: "/places/innis-library.jpg",
    amenities: {
      wifi: true,
      outlets: true,
      groupTables: true,
      naturalLight: true,
    },
    description:
      "Business library located in Kenneth Taylor Hall. Excellent resources for DeGroote School of Business students with quiet study areas and collaborative spaces. Modern design with lots of natural light.",
    tags: ["Wi-Fi", "Outlets", "Quiet", "Natural Light", "Business"],
    reviews: [
      {
        id: "1",
        author: "Priya S.",
        rating: 5,
        date: "3 days ago",
        comment: "Beautiful library! Great for business students. Very modern and clean.",
        tags: ["Quiet", "Good Lighting"],
      },
    ],
    qna: [
      {
        id: "1",
        question: "Are business databases accessible here?",
        answer: "Yes, all business databases and resources are available",
        timestamp: "5 days ago",
      },
    ],
  },
  "5": {
    id: "5",
    name: "Health Sciences Library - Silent Zone",
    category: "Library",
    distance: 250,
    rating: 4.9,
    reviewCount: 289,
    crowdLevel: "moderate",
    isOpen: true,
    openingHours: "Mon-Fri: 7:00 AM - 12:00 AM\nSat-Sun: 9:00 AM - 10:00 PM",
    address: "Health Sciences Centre, 1280 Main St W, Hamilton, ON L8S 4K1",
    image: "/places/hsl-silent.jpg",
    amenities: {
      wifi: true,
      outlets: true,
      groupTables: false,
      naturalLight: true,
    },
    description:
      "Dedicated silent study zone on the third floor of the Health Sciences Library. Extremely quiet atmosphere perfect for medical and health sciences students needing maximum concentration.",
    tags: ["Quiet", "Outlets", "Natural Light", "Health Sciences", "Study Carrels"],
    reviews: [
      {
        id: "1",
        author: "Emma K.",
        rating: 5,
        date: "1 day ago",
        comment: "The quietest spot on campus! Perfect for MCAT prep.",
        tags: ["Quiet"],
      },
    ],
    qna: [
      {
        id: "1",
        question: "Can non-health sciences students use this space?",
        answer: "Yes, it's open to all students!",
        timestamp: "2 days ago",
      },
    ],
  },
  "6": {
    id: "6",
    name: "McMaster University Student Centre (MUSC)",
    category: "Other",
    distance: 150,
    rating: 4.3,
    reviewCount: 412,
    crowdLevel: "busy",
    isOpen: true,
    openingHours: "Mon-Fri: 7:00 AM - 11:00 PM\nSat-Sun: 9:00 AM - 10:00 PM",
    address: "1280 Main Street West, Hamilton, ON L8S 4S4",
    image: "/places/musc.jpg",
    amenities: {
      wifi: true,
      outlets: true,
      groupTables: true,
      naturalLight: true,
    },
    description:
      "The heart of student life on campus! Features multiple study lounges, bookable group study rooms, and casual seating areas. Great for meeting friends and collaborative work. Food options nearby.",
    tags: ["Wi-Fi", "Outlets", "Group Tables", "Food Nearby", "Central"],
    reviews: [
      {
        id: "1",
        author: "Jake P.",
        rating: 4,
        date: "1 day ago",
        comment: "Great location with lots of seating. Can get noisy but good for group work.",
        tags: ["Loud"],
      },
    ],
    qna: [
      {
        id: "1",
        question: "Can I book study rooms here?",
        answer: "Yes, rooms can be booked through the MUSC website in 2-hour blocks",
        timestamp: "1 week ago",
      },
    ],
  },
  "7": {
    id: "7",
    name: "Michael DeGroote Centre for Learning (MDCL)",
    category: "Other",
    distance: 380,
    rating: 4.4,
    reviewCount: 198,
    crowdLevel: "moderate",
    isOpen: true,
    openingHours: "Mon-Fri: 7:00 AM - 11:00 PM\nSat-Sun: 9:00 AM - 10:00 PM",
    address: "1280 Main Street West, Hamilton, ON L8S 4L8",
    image: "/places/mdcl.jpg",
    amenities: {
      wifi: true,
      outlets: true,
      groupTables: true,
      naturalLight: true,
    },
    description:
      "Modern learning centre with open study spaces, group tables, and comfortable seating. Features floor-to-ceiling windows providing excellent natural light. Great for both individual study and group projects.",
    tags: ["Wi-Fi", "Outlets", "Group Tables", "Natural Light", "Modern"],
    reviews: [
      {
        id: "1",
        author: "Lisa M.",
        rating: 5,
        date: "2 days ago",
        comment: "Love this building! So modern and bright. Great study atmosphere.",
        tags: ["Good Lighting"],
      },
    ],
    qna: [
      {
        id: "1",
        question: "Is there a quiet zone in MDCL?",
        answer: "Room 1305 is designated as a quiet study space",
        timestamp: "4 days ago",
      },
    ],
  },
  "8": {
    id: "8",
    name: "Togo Café",
    category: "Café",
    distance: 420,
    rating: 4.5,
    reviewCount: 523,
    crowdLevel: "busy",
    isOpen: true,
    openingHours: "Mon-Fri: 7:30 AM - 8:00 PM\nSat-Sun: 9:00 AM - 6:00 PM",
    address: "1280 Main Street West, Hamilton, ON L8S 4L8",
    image: "/places/togo-cafe.jpg",
    amenities: {
      wifi: true,
      outlets: true,
      groupTables: true,
      naturalLight: false,
    },
    description:
      "Popular campus café with excellent coffee and a cozy atmosphere. Features a quieter back room perfect for studying. Great selection of pastries, sandwiches, and specialty drinks.",
    tags: ["Wi-Fi", "Outlets", "Food", "Coffee", "Group Tables"],
    reviews: [
      {
        id: "1",
        author: "Mike T.",
        rating: 5,
        date: "1 day ago",
        comment: "Love the atmosphere! Great coffee and good for studying. Back room is quieter.",
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
  "9": {
    id: "9",
    name: "McMaster Grind",
    category: "Café",
    distance: 240,
    rating: 4.6,
    reviewCount: 387,
    crowdLevel: "calm",
    isOpen: true,
    openingHours: "Mon-Fri: 7:00 AM - 6:00 PM\nSat-Sun: Closed",
    address: "Gilmour Hall, 1280 Main St W, Hamilton, ON L8S 4L9",
    image: "/places/mcmaster-grind.jpg",
    amenities: {
      wifi: true,
      outlets: true,
      groupTables: false,
      naturalLight: true,
    },
    description:
      "Cozy coffee shop in Gilmour Hall known for premium coffee and a quieter atmosphere. Perfect for individual study sessions. Limited seating makes it feel intimate and focused.",
    tags: ["Wi-Fi", "Outlets", "Food", "Coffee", "Quiet", "Natural Light"],
    reviews: [
      {
        id: "1",
        author: "Rachel S.",
        rating: 5,
        date: "3 days ago",
        comment: "Best coffee on campus! Quiet and cozy. My favorite spot.",
        tags: ["Quiet", "Outlets"],
      },
      {
        id: "2",
        author: "Chris H.",
        rating: 4,
        date: "1 week ago",
        comment: "Good for a few hours of studying. Gets busy around noon but worth it.",
        tags: ["Crowded"],
      },
    ],
    qna: [
      {
        id: "1",
        question: "Do they have vegan options?",
        answer: "Yes, several vegan pastries and milk alternatives available",
        timestamp: "4 days ago",
      },
    ],
  },
  "10": {
    id: "10",
    name: "Engineering Building - Atrium",
    category: "Other",
    distance: 320,
    rating: 4.2,
    reviewCount: 167,
    crowdLevel: "moderate",
    isOpen: true,
    openingHours: "Mon-Fri: 6:00 AM - 11:00 PM\nSat-Sun: 8:00 AM - 10:00 PM",
    address: "John Hodgins Engineering Building, 1280 Main St W, Hamilton, ON L8S 4L7",
    image: "/places/engineering-atrium.jpg",
    amenities: {
      wifi: true,
      outlets: false,
      groupTables: true,
      naturalLight: true,
    },
    description:
      "Bright, open atrium space in the heart of the Engineering building. Features high ceilings and abundant natural light. Popular spot for engineering students working on group projects.",
    tags: ["Wi-Fi", "Group Tables", "Natural Light", "Open Space", "Engineering"],
    reviews: [
      {
        id: "1",
        author: "Tom B.",
        rating: 4,
        date: "1 week ago",
        comment: "Good for group work. Natural light is amazing but can be noisy sometimes.",
        tags: ["Loud", "Good Lighting"],
      },
      {
        id: "2",
        author: "Lisa K.",
        rating: 4,
        date: "2 weeks ago",
        comment: "Nice natural light and open space. Not ideal for quiet study though.",
        tags: ["Good Lighting"],
      },
    ],
    qna: [
      {
        id: "1",
        question: "Are there whiteboards available?",
        answer: "Yes, several portable whiteboards are available for group use",
        timestamp: "2 weeks ago",
      },
    ],
  },
  "11": {
    id: "11",
    name: "Burke Science Building - Study Lounge",
    category: "Other",
    distance: 410,
    rating: 4.3,
    reviewCount: 145,
    crowdLevel: "calm",
    isOpen: true,
    openingHours: "Mon-Fri: 7:00 AM - 10:00 PM\nSat-Sun: 9:00 AM - 8:00 PM",
    address: "1280 Main Street West, Hamilton, ON L8S 4L8",
    image: "/places/burke-science.jpg",
    amenities: {
      wifi: true,
      outlets: true,
      groupTables: true,
      naturalLight: true,
    },
    description:
      "Peaceful study lounge in the Burke Science Building. Features comfortable seating, study tables, and a quiet atmosphere. Popular among science students but open to all.",
    tags: ["Wi-Fi", "Outlets", "Quiet", "Natural Light", "Science"],
    reviews: [
      {
        id: "1",
        author: "Nina H.",
        rating: 5,
        date: "5 days ago",
        comment: "Hidden gem! Very quiet and peaceful. Great for long study sessions.",
        tags: ["Quiet"],
      },
    ],
    qna: [
      {
        id: "1",
        question: "Is this space usually crowded?",
        answer: "It's quieter than most spots, usually easy to find a seat",
        timestamp: "1 week ago",
      },
    ],
  },
  "12": {
    id: "12",
    name: "Kenneth Taylor Hall - Business Commons",
    category: "Other",
    distance: 290,
    rating: 4.4,
    reviewCount: 211,
    crowdLevel: "moderate",
    isOpen: true,
    openingHours: "Mon-Fri: 7:00 AM - 11:00 PM\nSat-Sun: 9:00 AM - 9:00 PM",
    address: "1280 Main Street West, Hamilton, ON L8S 4M4",
    image: "/places/kth-commons.jpg",
    amenities: {
      wifi: true,
      outlets: true,
      groupTables: true,
      naturalLight: true,
    },
    description:
      "Modern collaborative space in Kenneth Taylor Hall designed for business students. Features flexible seating, writable walls, and a professional atmosphere perfect for case study prep and group presentations.",
    tags: ["Wi-Fi", "Outlets", "Group Tables", "Natural Light", "Business", "Modern"],
    reviews: [
      {
        id: "1",
        author: "Jordan L.",
        rating: 5,
        date: "2 days ago",
        comment: "Perfect for MBA group work! Love the writable walls for brainstorming.",
        tags: ["Good Lighting"],
      },
    ],
    qna: [
      {
        id: "1",
        question: "Is this space restricted to business students?",
        answer: "Primarily for DeGroote students but generally open to all",
        timestamp: "3 days ago",
      },
    ],
  },
  "13": {
    id: "13",
    name: "LRW Building - Study Area",
    category: "Other",
    distance: 360,
    rating: 4.1,
    reviewCount: 98,
    crowdLevel: "calm",
    isOpen: true,
    openingHours: "Mon-Fri: 7:00 AM - 10:00 PM\nSat-Sun: 9:00 AM - 8:00 PM",
    address: "1280 Main Street West, Hamilton, ON L8S 4L8",
    image: "/places/lrw-study.jpg",
    amenities: {
      wifi: true,
      outlets: true,
      groupTables: false,
      naturalLight: true,
    },
    description:
      "Quiet study area in the LRW Building. Features individual study desks and a calm atmosphere. Less crowded than main libraries, making it a great alternative during busy periods.",
    tags: ["Wi-Fi", "Outlets", "Quiet", "Natural Light"],
    reviews: [
      {
        id: "1",
        author: "Sam D.",
        rating: 4,
        date: "1 week ago",
        comment: "Great quiet spot that most people don't know about. Hidden gem!",
        tags: ["Quiet"],
      },
    ],
    qna: [
      {
        id: "1",
        question: "Are there printers nearby?",
        answer: "Yes, there's a print station on the second floor",
        timestamp: "2 weeks ago",
      },
    ],
  },
  "14": {
    id: "14",
    name: "Campus Accessibility Tech Space (CATS)",
    category: "Other",
    distance: 185,
    rating: 4.9,
    reviewCount: 76,
    crowdLevel: "calm",
    isOpen: true,
    openingHours: "Mon-Fri: 8:30 AM - 8:00 PM\nSat-Sun: Closed",
    address: "Mills Memorial Library, 1280 Main St W, Hamilton, ON L8S 4K1",
    image: "/places/cats-space.jpg",
    amenities: {
      wifi: true,
      outlets: true,
      groupTables: false,
      naturalLight: false,
    },
    description:
      "Dedicated quiet study space in Mills Library for students registered with Student Accessibility Services. Features specialized assistive technology, ergonomic workstations, and a distraction-free environment.",
    tags: ["Quiet", "Outlets", "Accessible", "Technology", "Study Carrels"],
    reviews: [
      {
        id: "1",
        author: "Taylor W.",
        rating: 5,
        date: "3 days ago",
        comment: "Amazing space with excellent accessibility features. Very quiet and supportive.",
        tags: ["Quiet"],
      },
    ],
    qna: [
      {
        id: "1",
        question: "How do I access this space?",
        answer: "Register with Student Accessibility Services to get access",
        timestamp: "1 week ago",
      },
    ],
  },
  "15": {
    id: "15",
    name: "McMaster Museum of Art",
    category: "Other",
    distance: 270,
    rating: 4.5,
    reviewCount: 89,
    crowdLevel: "calm",
    isOpen: true,
    openingHours: "Tue-Sat: 11:00 AM - 5:00 PM\nSun-Mon: Closed",
    address: "Alvin A. Lee Building, 1280 Main St W, Hamilton, ON L8S 4L9",
    image: "/places/museum-art.jpg",
    amenities: {
      wifi: true,
      outlets: false,
      groupTables: false,
      naturalLight: true,
    },
    description:
      "Unique study environment surrounded by art collections. Offers a serene and inspiring atmosphere for studying. Very quiet with comfortable seating. Perfect for humanities students or anyone seeking creative inspiration.",
    tags: ["Quiet", "Natural Light", "Art", "Unique", "Inspiring"],
    reviews: [
      {
        id: "1",
        author: "Ava J.",
        rating: 5,
        date: "4 days ago",
        comment: "Such an inspiring place to study! Quiet and beautiful. Highly recommend.",
        tags: ["Quiet", "Good Lighting"],
      },
    ],
    qna: [
      {
        id: "1",
        question: "Is there an admission fee?",
        answer: "No, it's free for McMaster students with ID",
        timestamp: "1 week ago",
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
