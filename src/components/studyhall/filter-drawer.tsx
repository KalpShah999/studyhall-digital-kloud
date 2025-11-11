"use client"

import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

export type FilterState = {
  openNow: boolean
  hasOutlets: boolean
  hasWifi: boolean
  nearFood: boolean
  noiseLevel: number // 0 = quiet, 100 = lively
  maxDistance: number // in km
}

interface FilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  resultCount?: number
}

export function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  resultCount,
}: FilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters)

  const updateFilter = (key: keyof FilterState, value: boolean | number) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleApply = () => {
    onFiltersChange(localFilters)
    onClose()
  }

  const handleReset = () => {
    const defaultFilters: FilterState = {
      openNow: false,
      hasOutlets: false,
      hasWifi: false,
      nearFood: false,
      noiseLevel: 50,
      maxDistance: 2,
    }
    setLocalFilters(defaultFilters)
  }

  const getNoiseLabel = (value: number) => {
    if (value < 30) return "Quiet"
    if (value < 70) return "Moderate"
    return "Lively"
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[85vh] max-w-[390px] mx-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Refine your search for the perfect study spot
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6 overflow-y-auto h-[calc(85vh-180px)] pb-4">
          {/* Toggle Filters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="openNow">Open Now</Label>
              <Switch
                id="openNow"
                checked={localFilters.openNow}
                onCheckedChange={(checked) => updateFilter("openNow", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="outlets">Has Outlets</Label>
              <Switch
                id="outlets"
                checked={localFilters.hasOutlets}
                onCheckedChange={(checked) => updateFilter("hasOutlets", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="wifi">Has Wi-Fi</Label>
              <Switch
                id="wifi"
                checked={localFilters.hasWifi}
                onCheckedChange={(checked) => updateFilter("hasWifi", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="food">Near Food</Label>
              <Switch
                id="food"
                checked={localFilters.nearFood}
                onCheckedChange={(checked) => updateFilter("nearFood", checked)}
              />
            </div>
          </div>

          {/* Noise Level Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Noise Preference</Label>
              <Badge variant="secondary">
                {getNoiseLabel(localFilters.noiseLevel)}
              </Badge>
            </div>
            <Slider
              value={[localFilters.noiseLevel]}
              onValueChange={([value]) => updateFilter("noiseLevel", value)}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Quiet</span>
              <span>Lively</span>
            </div>
          </div>

          {/* Distance Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Maximum Distance</Label>
              <Badge variant="secondary">
                {localFilters.maxDistance}km
              </Badge>
            </div>
            <Slider
              value={[localFilters.maxDistance]}
              onValueChange={([value]) => updateFilter("maxDistance", value)}
              min={0.5}
              max={5}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* Result Preview */}
          {resultCount !== undefined && (
            <div className="pt-2 text-center text-sm text-muted-foreground">
              {resultCount} results match your filters
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t space-y-2">
          <Button onClick={handleApply} className="w-full" size="lg">
            Apply Filters
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full"
          >
            Reset All
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}


