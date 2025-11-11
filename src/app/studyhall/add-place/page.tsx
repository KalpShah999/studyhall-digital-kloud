"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Upload, MapPin, X } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function AddPlacePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    address: "",
    openingHours: "",
  })
  const [amenities, setAmenities] = useState({
    wifi: false,
    outlets: false,
    groupTables: false,
    naturalLight: false,
  })
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAmenityToggle = (amenity: keyof typeof amenities) => {
    setAmenities((prev) => ({ ...prev, [amenity]: !prev[amenity] }))
  }

  const addTag = () => {
    const trimmed = tagInput.trim()
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for this place",
        variant: "destructive",
      })
      return
    }

    if (!formData.category) {
      toast({
        title: "Category required",
        description: "Please select a category",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Place submitted!",
        description: "Your submission is pending moderation. Thanks for contributing!",
      })
      router.push("/studyhall")
    }, 1500)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b px-4 py-4">
        <h1 className="text-2xl font-bold">Add a Place</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Help others discover great study spots
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-auto">
        <div className="p-4 space-y-6">
          {/* Photo Upload */}
          <Card>
            <CardContent className="p-4">
              <Label>Photo (optional)</Label>
              <div className="mt-2">
                {imagePreview ? (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 p-1 bg-background rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">
                      Tap to upload
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Basic Info */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Mills Library 3rd Floor"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="library">Library</SelectItem>
                    <SelectItem value="cafe">Café</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="What makes this place special?"
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    placeholder="Building name or address"
                    className="pl-10"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Pin on Map
              </Button>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <Label>Amenities</Label>
              <div className="space-y-3">
                {[
                  { key: "wifi" as const, label: "Wi-Fi" },
                  { key: "outlets" as const, label: "Power Outlets" },
                  { key: "groupTables" as const, label: "Group Tables" },
                  { key: "naturalLight" as const, label: "Natural Light" },
                ].map((amenity) => (
                  <div
                    key={amenity.key}
                    className="flex items-center justify-between"
                  >
                    <Label htmlFor={amenity.key}>{amenity.label}</Label>
                    <Switch
                      id={amenity.key}
                      checked={amenities[amenity.key]}
                      onCheckedChange={() => handleAmenityToggle(amenity.key)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  placeholder="Add a tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  Add
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Opening Hours */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <Label htmlFor="hours">Opening Hours</Label>
              <Textarea
                id="hours"
                placeholder="e.g., Mon-Fri: 9AM-10PM"
                rows={3}
                value={formData.openingHours}
                onChange={(e) =>
                  handleInputChange("openingHours", e.target.value)
                }
              />
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="space-y-2 pb-20">
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit for Review"}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Your submission will be reviewed before appearing in search results
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}


