"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Volume2, Plug, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export default function OnboardingPage() {
  const router = useRouter()
  const [preferences, setPreferences] = useState({
    quiet: false,
    outlets: false,
    groupTables: false,
  })

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleContinue = () => {
    // Save preferences to localStorage (no authentication needed)
    localStorage.setItem("studyhall_preferences", JSON.stringify(preferences))
    router.push("/studyhall")
  }

  const prefOptions = [
    {
      key: "quiet" as const,
      title: "Quiet Spaces",
      description: "I prefer silent or low-noise areas",
      icon: Volume2,
    },
    {
      key: "outlets" as const,
      title: "Power Outlets",
      description: "I need access to charging",
      icon: Plug,
    },
    {
      key: "groupTables" as const,
      title: "Group Tables",
      description: "I often study with others",
      icon: Users,
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Welcome to StudyHall</h1>
          <p className="text-muted-foreground">
            Tell us your study preferences to get personalized recommendations
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Setup</CardTitle>
            <CardDescription>Select what matters most to you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {prefOptions.map((option) => {
              const Icon = option.icon
              const isSelected = preferences[option.key]
              return (
                <button
                  key={option.key}
                  onClick={() => togglePreference(option.key)}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 transition-all text-left",
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-muted-foreground"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Icon
                      className={cn(
                        "h-5 w-5 mt-0.5",
                        isSelected ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <div className="flex-1">
                      <div className="font-semibold">{option.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {option.description}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Button onClick={handleContinue} className="w-full" size="lg">
            Continue to StudyHall
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.push("/studyhall")}
            className="w-full"
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  )
}


