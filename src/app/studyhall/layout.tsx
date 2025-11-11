"use client"

import { Home, Search, Plus, Heart, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function StudyHallLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/studyhall", icon: Home },
    { name: "Search", href: "/studyhall/search", icon: Search },
    { name: "Add", href: "/studyhall/add-place", icon: Plus },
    { name: "Favorites", href: "/studyhall/favorites", icon: Heart },
    { name: "Profile", href: "/studyhall/profile", icon: User },
  ]

  return (
    <div className="flex flex-col h-screen max-w-[390px] mx-auto bg-background">
      {/* Main Content Area */}
      <main className="flex-1 overflow-auto pb-16">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-card border-t border-border">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}


