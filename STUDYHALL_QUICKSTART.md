# StudyHall - Quick Start Guide

## 🚀 How to Run StudyHall

### Start the Development Server

```bash
cd /Users/kalp/Documents/School/4HC3/Assignments/A2/StudyHallGeneral/StudyHall
npm run dev
```

### Access the App

Open your browser and go to:
**[http://localhost:3000/studyhall/onboarding](http://localhost:3000/studyhall/onboarding)**

## 📱 Main Routes

| Screen | URL | Description |
|--------|-----|-------------|
| **Onboarding** | `/studyhall/onboarding` | Set preferences (start here!) |
| **Home** | `/studyhall` | Browse places with list/map toggle |
| **Search** | `/studyhall/search` | Search with smart suggestions |
| **Place Details** | `/studyhall/place/1` | View details, check-in, review |
| **Favorites** | `/studyhall/favorites` | Your saved & visited places |
| **Add Place** | `/studyhall/add-place` | Contribute new study spot |
| **Notifications** | `/studyhall/notifications` | Manage crowd alerts |
| **Profile** | `/studyhall/profile` | Settings & account |

## 🎯 Test the Key Flows

### Flow 1: Discover & Review
1. Go to `/studyhall` (Home)
2. Click "Filters" button
3. Enable "Quiet" and "Open Now"
4. Click "Apply Filters"
5. Click on "Health Sciences Library"
6. Click "Write Review"
7. Select 5 stars, add tags, submit

### Flow 2: Live Crowd Check-in
1. On Home page, click on any place card
2. Click "Check In" button
3. Confirm check-in
4. See toast notification
5. Crowd meter updates automatically

### Flow 3: Favorites & Notifications
1. On Place Details, click the heart icon (favorite)
2. Go to "Favorites" tab at bottom
3. Click "Manage Alerts"
4. Toggle alert settings
5. Set crowd threshold
6. Save settings

### Flow 4: Add New Place
1. Click "Add" tab at bottom
2. Fill in place name and category
3. Upload a photo (optional)
4. Toggle amenities (Wi-Fi, Outlets, etc.)
5. Add tags
6. Click "Submit for Review"

## 🎨 Features to Showcase

### Home Screen
- **List/Map Toggle** - Switch between views
- **Filters Badge** - Shows active filter count
- **Place Cards** - Interactive, show crowd level, distance, rating
- **Heart Icon** - Toggle favorite status

### Search Screen
- **Quick Searches** - Pre-defined search buttons
- **Recent Searches** - Shows search history
- **Popular Tags** - Clickable tag chips
- **Smart Suggestions** - Updates as you type

### Place Details
- **Crowd Meter** - Live indicator with info tooltip
- **Check-In** - Opens modal, anonymous contribution
- **Write Review** - Modal with star rating, tags, comment
- **Amenities** - Icons show available features
- **Community Q&A** - Questions and answers section
- **Opening Hours** - Status badge and schedule

### Filters Drawer
- **Toggles** - Open Now, Outlets, Wi-Fi, Near Food
- **Noise Slider** - Quiet → Lively
- **Distance Slider** - 0.5km → 5km
- **Result Count** - Live preview of filtered results
- **Reset Button** - Clear all filters

### Favorites & Visited
- **Tabs** - Switch between Favorites and Visited
- **Empty States** - Helpful prompts when no data
- **Manage Alerts** - Link to notification settings

### Notifications
- **Global Toggle** - Enable/disable all notifications
- **Per-Place Rules** - Individual alert settings
- **Crowd Threshold** - Choose Calm or Moderate
- **Time Windows** - Set availability hours
- **Active Count** - Shows how many alerts are on

### Add Place
- **Photo Upload** - Image preview before submit
- **Category Selector** - Dropdown with options
- **Amenity Toggles** - Enable/disable features
- **Tag Input** - Add custom tags with chips
- **Map Pin** - Location picker (placeholder)
- **Moderation Status** - Shows pending state

### Profile
- **Stats Cards** - Places visited, favorites, reviews
- **Quick Actions** - Fast access to favorites & history
- **Settings Menu** - Organized list with icons
- **Sign Out** - Logout button

## 🎬 Demo Video Script

**Opening (15 seconds)**
"Hi, I'm demonstrating StudyHall, a mobile app for discovering campus study places. Let's walk through the key features."

**Onboarding (20 seconds)**
"First-time users select their preferences - I'll choose Quiet Spaces and Power Outlets. These personalize recommendations."

**Home & Filters (30 seconds)**
"The home screen shows nearby places with live crowd indicators. I can toggle between list and map views. Let me open filters... I'll set Quiet, enable Open Now, and limit distance to 500 meters. Now I see 3 results."

**Place Details & Check-In (40 seconds)**
"Tapping a place shows details - rating, opening hours, and this Live Crowd Meter showing it's Busy right now. I'll check in to help others... Done! Let me write a review too - 4 stars, I'll tag it as Quiet and Good Lighting, and add a comment. Submitted."

**Search (20 seconds)**
"The Search tab has quick searches, recent history, and popular tags. I'll search 'library'... instant results filtered by my query."

**Favorites & Notifications (30 seconds)**
"I've favorited Togo Café. In the Favorites tab, I can see all my saved places and visit history. Let me set up a notification... Alert me when this place is Calm between 6-9 PM. Perfect for evening study sessions."

**Add Place (25 seconds)**
"Anyone can contribute! I'll add the Engineering Atrium - upload a photo, select category, toggle Wi-Fi and Group Tables as amenities, add some tags... Submit for moderation. This helps grow the community."

**Closing (10 seconds)**
"That's StudyHall - helping students find the perfect study spot with real-time crowd data, reviews, and smart notifications."

**Total: ~3 minutes**

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Missing Dependencies
```bash
npm install
```

### Styles Not Loading
```bash
# Restart the dev server
Ctrl+C
npm run dev
```

## 📱 Mobile Testing

### Chrome DevTools
1. Open DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or custom size: 390×844
4. Refresh page

### Responsive.app / Sizzy
Use these tools for multi-device preview

### Real Device
Find your local IP:
```bash
ipconfig getifaddr en0
```
Access: `http://YOUR_IP:3000/studyhall/onboarding`

## 💡 Tips for Demo

1. **Start Fresh** - Clear browser localStorage to show onboarding
2. **Mobile View** - Always demo in mobile viewport (390px)
3. **Click Through Flows** - Show complete user journeys
4. **Highlight Interactions** - Point out modals, toasts, animations
5. **Explain Design Choices** - Mention Norman's principles, accessibility
6. **Show Edge Cases** - Empty states, no results, validation errors
7. **Note Mock Data** - Explain it's a prototype ready for API integration

## 🎨 Color Reference

| Element | Color | HSL |
|---------|-------|-----|
| Primary (Maroon) | ![#7D1F1F](https://via.placeholder.com/20/7D1F1F/000000?text=+) | `hsl(0 70% 30%)` |
| Accent | ![#8B2828](https://via.placeholder.com/20/8B2828/000000?text=+) | `hsl(0 70% 35%)` |
| Secondary | ![#F9E5E5](https://via.placeholder.com/20/F9E5E5/000000?text=+) | `hsl(0 60% 95%)` |
| Background | ![#FFFFFF](https://via.placeholder.com/20/FFFFFF/000000?text=+) | `hsl(0 0% 100%)` |
| Foreground | ![#1A1A1A](https://via.placeholder.com/20/1A1A1A/000000?text=+) | `hsl(0 0% 10%)` |

## ✅ Pre-Demo Checklist

- [ ] Dev server running
- [ ] Browser at `localhost:3000/studyhall/onboarding`
- [ ] DevTools mobile view enabled (390×844)
- [ ] Zoom comfortable (100-125%)
- [ ] Audio for video recording tested
- [ ] Screen recording software ready
- [ ] Design document PDF prepared
- [ ] Have backup screenshots/video

---

**Ready to demo? Start at `/studyhall/onboarding` and enjoy! 🎉**


