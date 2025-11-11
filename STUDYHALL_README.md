# StudyHall - Campus Study Place Review App

A mobile-first web application for discovering, reviewing, and tracking campus study locations. Built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui components.

## 🎨 Design System

**Color Scheme:**
- **Primary:** Maroon (`hsl(0 70% 30%)`) - buttons, CTAs, active states
- **Secondary:** Light maroon/pink - badges, subtle backgrounds
- **Accent:** Maroon variants for highlights
- **Background:** White
- **Foreground:** Black
- **Borders:** Light gray

**Typography:**
- Headlines: Bold, clear hierarchy
- Body: Readable 14-16px
- Labels: 12-13px with proper contrast

**Spacing & Layout:**
- Mobile-first design (390×844px - iPhone 15)
- 16px base padding
- Card-based UI with consistent spacing
- Touch targets ≥44×44px

## 📱 Application Structure

### Routes

```
/studyhall/
├── /                       # Home (List/Map view)
├── /onboarding             # Preferences setup
├── /search                 # Search with suggestions
├── /place/[id]             # Place details + modals
├── /favorites              # Favorites & Visited tabs
├── /add-place              # Add new place form
├── /notifications          # Notification settings
└── /profile                # User profile

```

### Key Components

**Shared Components** (`/components/studyhall/`):
- `place-card.tsx` - Reusable place listing card
- `crowd-meter.tsx` - Live crowd indicator
- `filter-drawer.tsx` - Bottom sheet filters

**UI Components** (`/components/ui/`):
- All shadcn/ui components (Button, Card, Badge, Dialog, etc.)

## 🎯 Features Implemented

### ✅ Core Requirements (Option #2)

1. **Study Place Listings**
   - List and map toggle views
   - Category badges (Library, Café, Outdoor, Other)
   - Distance from user
   - Opening hours status

2. **Favorites & Visited**
   - Persistent favorites with heart icon
   - Automatic visit tracking via check-ins
   - Separate tabs for each

3. **Search & Filtering**
   - Real-time search with suggestions
   - Advanced filters:
     - Open Now toggle
     - Has Outlets, Wi-Fi, Near Food
     - Noise level slider (Quiet → Lively)
     - Distance radius (0.5-5km)
   - Filter count badge
   - Result preview count

4. **Reviews & Ratings**
   - 5-star rating system
   - Structured tags (Quiet, Loud, Outlets, etc.)
   - Optional text comments
   - Review display on place details

### ✨ Additional Features

5. **Live Crowd Meter**
   - Real-time crowd levels (Calm, Moderate, Busy)
   - Check-in modal with anonymous aggregation
   - Info tooltip with details
   - Color-coded badges (green, yellow, maroon)

6. **Add a Place**
   - Multi-step form with validation
   - Photo upload preview
   - Location picker (map pin placeholder)
   - Amenity toggles
   - Custom tags
   - Opening hours input
   - Moderation status indicator

7. **Smart Notifications**
   - Per-favorite alert rules
   - Crowd threshold settings (Calm/Moderate)
   - Time window configuration
   - Enable/disable toggles
   - Global notification switch

8. **Community Q&A**
   - Question/answer threads per place
   - Timestamp display
   - "Ask a Question" CTA
   - Report flag (placeholder)

9. **User Profile**
   - Stats dashboard (visits, favorites, reviews)
   - Quick actions
   - Settings menu
   - Preferences link
   - Sign out

10. **Onboarding Flow**
    - Preference quick-set (Quiet, Outlets, Group Tables)
    - Skip option
    - LocalStorage persistence

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to project
cd /Users/kalp/Documents/School/4HC3/Assignments/A2/StudyHallGeneral/StudyHall

# Install dependencies (if not already done)
npm install

# Run development server
npm run dev
```

### Access the App

1. Open [http://localhost:3000/studyhall/onboarding](http://localhost:3000/studyhall/onboarding)
2. Complete preferences or skip
3. Navigate through the app using bottom navigation

## 📱 Navigation Flow

### Bottom Navigation Tabs
1. **Home** - Browse places (list/map)
2. **Search** - Search with filters
3. **Add** - Contribute a new place
4. **Favorites** - Your saved & visited places
5. **Profile** - Settings and account

### Key User Flows

**Flow A: Discover → Review**
```
Home → Filters → Apply → Place Details → Write Review → Submit
```

**Flow B: Live Crowd Check-in**
```
Home (Map) → Place Details → Check-In → Updated Crowd Chip
```

**Flow C: Favorites & Notifications**
```
Place Details → Favorite → Profile → Favorites → Manage Alerts
```

**Flow D: Add Place**
```
Add → Fill Form → Submit → Moderation Queue
```

## 🎨 Design Principles Applied

### Norman's Principles
- **Affordances:** Buttons look clickable, switches toggle-able
- **Signifiers:** Icons indicate functionality (Heart = favorite, Star = review)
- **Constraints:** Disabled states, required fields, validation
- **Feedback:** Toasts, loading states, success messages
- **Mapping:** Intuitive controls (slider for noise, toggle for on/off)
- **Consistency:** Reused components, predictable navigation

### Gestalt Principles
- **Proximity:** Related info grouped (amenities, tags)
- **Similarity:** Consistent card layouts, icon styles
- **Closure:** Cards with rounded borders
- **Figure/Ground:** Clear content hierarchy

### Fitts' Law
- Large touch targets (44×44px minimum)
- Bottom-anchored primary actions
- Thumb-friendly navigation

### Hick's Law
- Progressive disclosure (filters in drawer)
- Clear information hierarchy
- Limited choices per screen

## 🧪 Testing & Validation

### Accessibility
- WCAG AA contrast ratios
- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Touch target sizes ≥44px

### Error Handling
- Form validation with clear messages
- Empty states with CTAs
- No-results states with reset options
- Loading indicators
- Network error handling (ready for API integration)

### Edge Cases
- Empty favorites list
- No search results
- Closed places
- No active filters
- No visit history

## 📊 Mock Data

Currently using mock data for demonstration:
- 5 sample study places
- 2 reviews per place
- 2 favorite places
- 3 visited places
- 2 notification rules

**To integrate real data:**
Replace mock arrays in each page with API calls to your backend.

## 🎯 Assignment Alignment

### Required Elements
✅ Study place listings (indoor/outdoor)
✅ Store favorites & visited
✅ Search and filter by location & factors
✅ Reviews & ratings

### Extra Value
✅ Live Crowd Meter with check-ins
✅ Add Place with moderation
✅ Smart Notifications per favorite
✅ Community Q&A
✅ Personalized recommendations (via onboarding)

### Design Document Coverage
✅ User personas (Commuter, Grad, TA)
✅ Task-to-screen mapping (see Features section)
✅ Norman's principles applied
✅ Gestalt principles applied
✅ Accessibility considerations
✅ Error prevention & edge cases

## 🔧 Technical Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Icons:** Lucide React
- **Forms:** React Hook Form (ready to integrate)
- **State:** React hooks (useState, useEffect)
- **Routing:** Next.js App Router with route groups

## 📁 File Structure

```
src/
├── app/
│   ├── (studyhall)/          # Route group for StudyHall
│   │   ├── layout.tsx           # Bottom nav layout
│   │   ├── page.tsx             # Home (list/map)
│   │   ├── onboarding/          # Preferences setup
│   │   ├── search/              # Search page
│   │   ├── place/[id]/          # Dynamic place details
│   │   ├── favorites/           # Favorites & visited
│   │   ├── add-place/           # Add new place
│   │   ├── notifications/       # Alert settings
│   │   └── profile/             # User profile
│   └── globals.css              # Global styles with maroon theme
├── components/
│   ├── studyhall/             # App-specific components
│   │   ├── place-card.tsx
│   │   ├── crowd-meter.tsx
│   │   └── filter-drawer.tsx
│   └── ui/                      # shadcn components
└── lib/
    └── utils.ts                 # Utility functions
```

## 🎥 Demo Script

1. **Onboarding:** Select preferences (Quiet, Outlets)
2. **Home:** Toggle List/Map, open Filters, set "Quiet" + "Open Now"
3. **Search:** Type "library", see suggestions, select result
4. **Place Details:** View crowd meter, tap "Check In", tap "Write Review" (5★)
5. **Favorites:** Tap heart on place, go to Favorites tab
6. **Notifications:** Tap "Manage Alerts", set threshold to "Calm, 6-9pm"
7. **Add Place:** Fill form, upload photo, submit
8. **Profile:** View stats, access settings

## 🚧 Future Enhancements

- Real-time database integration (Supabase/Firebase)
- Actual map integration (Mapbox/Google Maps)
- Push notifications
- Image optimization and CDN
- Advanced search (fuzzy matching)
- Social features (follow friends, share places)
- Analytics dashboard
- Admin moderation panel
- Export study schedule
- Offline support (PWA)

## 📝 Notes

- All pages are mobile-optimized (390px width)
- Components use semantic HTML
- Maroon color scheme applied throughout
- Mock data makes app fully interactive
- No backend required for prototype demo
- Ready for production API integration

## 🎓 Assignment Submission Checklist

✅ All 4 Option #2 requirements implemented
✅ 6+ additional features (Crowd, Add, Notify, Q&A, Onboarding, Profile)
✅ Complete task flows (no dead ends)
✅ All widgets/controls demonstrated (sliders, toggles, chips, modals)
✅ Clear information structure
✅ Design principles documented
✅ Accessibility considered
✅ Error handling & edge cases
✅ Mobile-first design (390×844px)

---

**Built with ❤️ for SFWRENG 4HC3/6HC3**


