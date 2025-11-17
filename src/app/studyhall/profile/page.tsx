"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  Bell,
  Heart,
  Clock,
  MapPin,
  ChevronRight,
  HelpCircle,
  Shield,
  MessageSquare,
} from "lucide-react"
import { useFavorites } from "@/hooks/use-favorites"

export default function ProfilePage() {
  const router = useRouter()
  const { favorites, visited } = useFavorites()

  // Dynamic stats based on actual data
  const stats = [
    { label: "Places Visited", value: visited.length.toString(), icon: MapPin },
    { label: "Favorites", value: favorites.length.toString(), icon: Heart },
    { label: "Reviews", value: "0", icon: MessageSquare },
  ]

  const menuItems = [
    {
      icon: Bell,
      label: "Notifications",
      description: "Manage alerts",
      href: "/studyhall/notifications",
    },
    {
      icon: Settings,
      label: "Preferences",
      description: "Study spot preferences",
      href: "/studyhall/onboarding",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      description: "Get assistance",
      href: "#",
    },
    {
      icon: Shield,
      label: "Privacy",
      description: "Data & privacy settings",
      href: "#",
    },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b px-4 py-4">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    SH
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">StudyHall User</h2>
                  <Badge variant="secondary" className="mt-2">
                    McMaster Student
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label}>
                  <CardContent className="p-4 text-center space-y-1">
                    <Icon className="h-5 w-5 mx-auto text-primary" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground px-1">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => router.push("/studyhall/favorites")}
                className="h-auto py-4 flex-col gap-2"
              >
                <Heart className="h-5 w-5" />
                <span className="text-sm">Favorites</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/studyhall/favorites")}
                className="h-auto py-4 flex-col gap-2"
              >
                <Clock className="h-5 w-5" />
                <span className="text-sm">History</span>
              </Button>
            </div>
          </div>

          <Separator />

          {/* Settings Menu */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground px-1">
              Settings
            </h3>
            <Card>
              <CardContent className="p-0">
                {menuItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => router.push(item.href)}
                        className="w-full flex items-center gap-3 p-4 hover:bg-accent transition-colors text-left"
                      >
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{item.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.description}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                      {index < menuItems.length - 1 && (
                        <Separator className="mx-4" />
                      )}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* About */}
          <Card className="bg-muted/50">
            <CardContent className="p-4 text-center space-y-2">
              <h3 className="font-semibold text-2xl" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                StudyHall
              </h3>
              <p className="text-xs text-muted-foreground">
                Version 1.0.0 • Made for McMaster students
              </p>
            </CardContent>
          </Card>

          {/* Extra spacing at bottom */}
          <div className="pb-20"></div>
        </div>
      </div>
    </div>
  )
}


