"use client"

import { Badge } from "@/components/ui/badge"
import { Users, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface CrowdMeterProps {
  level: "calm" | "moderate" | "busy"
  lastUpdated?: string
  showInfo?: boolean
  className?: string
}

export function CrowdMeter({
  level,
  lastUpdated = "2 min ago",
  showInfo = true,
  className,
}: CrowdMeterProps) {
  const config = {
    calm: {
      label: "Calm",
      description: "20-30 people • Plenty of seats",
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      icon: "text-green-600 dark:text-green-400",
    },
    moderate: {
      label: "Moderate",
      description: "≈60% full • Some seats available",
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      icon: "text-yellow-600 dark:text-yellow-400",
    },
    busy: {
      label: "Busy",
      description: "Crowded • Limited seating",
      color: "bg-primary/10 text-primary",
      icon: "text-primary",
    },
  }

  const current = config[level]

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Badge className={cn("px-3 py-1 font-medium", current.color)}>
        <Users className={cn("h-3.5 w-3.5 mr-1.5", current.icon)} />
        {current.label}
      </Badge>
      {showInfo && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Info className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <div className="space-y-1">
                <p className="font-medium">{current.description}</p>
                <p className="text-xs text-muted-foreground">
                  Updated {lastUpdated} via student check-ins
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}


