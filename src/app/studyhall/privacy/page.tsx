"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Shield, Eye, Database, Lock } from "lucide-react"

export default function PrivacyPage() {
  const router = useRouter()

  const sections = [
    {
      icon: Database,
      title: "Data We Collect",
      content: "StudyHall stores your reviews, favorite places, check-ins, and notification preferences locally on your device. We do not collect personal information or track your activity.",
    },
    {
      icon: Eye,
      title: "Anonymous Usage",
      content: "All check-ins and crowd level reports are completely anonymous. Your reviews are displayed with 'You' as the author and are not linked to any personal identifier.",
    },
    {
      icon: Lock,
      title: "Local Storage",
      content: "All your data is stored locally in your browser using localStorage. This means your information stays on your device and is never sent to external servers.",
    },
    {
      icon: Shield,
      title: "Your Privacy Rights",
      content: "You can clear all your data at any time by clearing your browser's local storage. Your reviews, favorites, and other data will be permanently deleted from your device.",
    },
  ]

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
            <h1 className="text-xl font-bold">Privacy Policy</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Introduction */}
        <Card className="bg-secondary/20">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your privacy is important to us. StudyHall is designed with privacy in mind - all your data stays on your device and is never shared or uploaded to external servers.
            </p>
          </CardContent>
        </Card>

        {/* Policy Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <Card key={index}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold">{section.title}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Clear Data */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Clear Your Data</h2>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-3">
                Want to start fresh? You can clear all your StudyHall data at any time:
              </p>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Open your browser settings</li>
                <li>Navigate to Privacy & Security</li>
                <li>Select "Clear browsing data"</li>
                <li>Choose "Cookies and other site data"</li>
                <li>Clear data for studyhall.mcmaster.ca</li>
              </ol>
              <p className="text-xs text-muted-foreground mt-3 italic">
                This will permanently delete all your reviews, favorites, and preferences from your device.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Last Updated */}
        <div className="text-center text-xs text-muted-foreground pb-4">
          Last updated: November 17, 2025
        </div>
      </div>
    </div>
  )
}

