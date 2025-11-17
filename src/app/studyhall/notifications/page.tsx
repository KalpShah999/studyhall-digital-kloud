"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Bell, Clock } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const NOTIFICATIONS_KEY = "studyhall_notifications"
const GLOBAL_ENABLED_KEY = "studyhall_notifications_enabled"

type NotificationRule = {
  id: string
  placeName: string
  crowdThreshold: "calm" | "moderate"
  timeWindow: {
    start: string
    end: string
  }
  enabled: boolean
}

// Mock data - no auth required
const MOCK_RULES: NotificationRule[] = [
  {
    id: "1",
    placeName: "Togo Café Back Room",
    crowdThreshold: "calm",
    timeWindow: { start: "18:00", end: "21:00" },
    enabled: true,
  },
  {
    id: "2",
    placeName: "Student Center Lounge",
    crowdThreshold: "moderate",
    timeWindow: { start: "09:00", end: "17:00" },
    enabled: false,
  },
]

export default function NotificationsPage() {
  const router = useRouter()
  const [rules, setRules] = useState<NotificationRule[]>([])
  const [globalEnabled, setGlobalEnabled] = useState(true)

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(NOTIFICATIONS_KEY)
      const enabledSaved = localStorage.getItem(GLOBAL_ENABLED_KEY)
      
      if (saved) {
        setRules(JSON.parse(saved))
      } else {
        setRules(MOCK_RULES)
      }
      
      if (enabledSaved !== null) {
        setGlobalEnabled(enabledSaved === "true")
      }
    } catch {
      setRules(MOCK_RULES)
    }
  }, [])

  // Save to localStorage whenever rules or globalEnabled changes
  useEffect(() => {
    if (rules.length > 0 || localStorage.getItem(NOTIFICATIONS_KEY)) {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(rules))
    }
  }, [rules])

  useEffect(() => {
    localStorage.setItem(GLOBAL_ENABLED_KEY, String(globalEnabled))
  }, [globalEnabled])

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    )
  }

  const updateThreshold = (id: string, threshold: "calm" | "moderate") => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === id ? { ...rule, crowdThreshold: threshold } : rule
      )
    )
  }

  const deleteRule = (id: string) => {
    setRules((prev) => prev.filter((rule) => rule.id !== id))
    toast({
      title: "Alert removed",
      description: "You won't receive notifications for this place anymore",
    })
  }

  const handleSave = () => {
    // Settings are auto-saved, just show confirmation
    toast({
      title: "Settings saved!",
      description: "Your notification preferences have been updated",
    })
    router.back()
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => router.back()}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Notification Settings</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-6">
          {/* Global Toggle */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-primary" />
                  <div>
                    <Label>Enable Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive crowd alerts for your favorites
                    </p>
                  </div>
                </div>
                <Switch
                  checked={globalEnabled}
                  onCheckedChange={setGlobalEnabled}
                />
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Place Alerts</h2>
              {rules.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {rules.filter((r) => r.enabled).length} active
                </span>
              )}
            </div>

            {rules.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center space-y-3">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div>
                    <p className="font-medium">No alerts set up</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Go to your favorites and set up alerts to get notified when they're less crowded
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/studyhall/favorites")}
                  >
                    View Favorites
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {rules.map((rule) => (
                  <Card key={rule.id}>
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">
                            {rule.placeName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant={rule.enabled ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {rule.enabled ? "Active" : "Paused"}
                            </Badge>
                          </div>
                        </div>
                        <Switch
                          checked={rule.enabled}
                          onCheckedChange={() => toggleRule(rule.id)}
                        />
                      </div>

                      {/* Settings */}
                      <div className="space-y-3 pt-2 border-t">
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Alert when crowd level is
                          </Label>
                          <Select
                            value={rule.crowdThreshold}
                            onValueChange={(value: "calm" | "moderate") =>
                              updateThreshold(rule.id, value)
                            }
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="calm">Calm or less</SelectItem>
                              <SelectItem value="moderate">
                                Moderate or less
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Time window
                          </Label>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {rule.timeWindow.start} - {rule.timeWindow.end}
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteRule(rule.id)}
                          className="w-full text-muted-foreground hover:text-destructive"
                        >
                          Remove Alert
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Info Card */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <h3 className="font-medium text-sm mb-2">How it works</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Get notified when your favorite places are less crowded</li>
                <li>• Set time windows for when you're available</li>
                <li>• Alerts are based on real-time check-ins from students</li>
              </ul>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="pb-20">
            <Button onClick={handleSave} className="w-full" size="lg">
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


