"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

interface Props {
  value: DateRange | undefined
  onChange: (v: DateRange | undefined) => void
  className?: string
}

export function DateRangePicker({ value, onChange, className }: Props) {
  const label = value?.from && value?.to
    ? `${value.from.toLocaleDateString()} – ${value.to.toLocaleDateString()}`
    : "Select date"

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={className + " justify-between font-normal"}>
          {label}
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="range"
          captionLayout="dropdown"
          selected={value}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  )
} 