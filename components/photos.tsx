"use client"

import { useEffect, useState } from "react"
import { MoreHorizontal, ImageIcon, Heart, FolderIcon, Search } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { PhotoDetail } from "./photos/photo-detail"

interface Photo {
  id: string
  url: string
  timestamp: number
}

export function Photos() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [selectedFilter, setSelectedFilter] = useState<"All Photos" | "Days" | "Months" | "Years">("All Photos")
  const [selectedTab, setSelectedTab] = useState<"Library" | "For You" | "Albums" | "Search">("Library")
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set())
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  // Load photos from localStorage on mount
  useEffect(() => {
    const storedPhotos = localStorage.getItem("photos")
    if (storedPhotos) {
      setPhotos(JSON.parse(storedPhotos))
    }
  }, [])

  // Save photos to localStorage when they change
  useEffect(() => {
    localStorage.setItem("photos", JSON.stringify(photos))
  }, [photos])

  const deleteSelectedPhotos = () => {
    const newPhotos = photos.filter((photo) => !selectedPhotos.has(photo.id))
    setPhotos(newPhotos)
    setSelectedPhotos(new Set())
    setIsSelecting(false)
  }

  const deletePhoto = (id: string) => {
    const newPhotos = photos.filter((photo) => photo.id !== id)
    setPhotos(newPhotos)
    setSelectedPhoto(null)
  }

  const togglePhotoSelection = (id: string) => {
    const newSelected = new Set(selectedPhotos)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedPhotos(newSelected)
  }

  const handlePhotoClick = (photo: Photo) => {
    if (isSelecting) {
      togglePhotoSelection(photo.id)
    } else {
      setSelectedPhoto(photo)
    }
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const filters = ["Years", "Months", "Days", "All Photos"] as const
  const tabs = [
    { id: "Library", icon: ImageIcon },
    { id: "For You", icon: Heart },
    { id: "Albums", icon: FolderIcon },
    { id: "Search", icon: Search },
  ] as const

  // If a photo is selected, show the photo detail view
  if (selectedPhoto) {
    return <PhotoDetail photo={selectedPhoto} onBack={() => setSelectedPhoto(null)} onDelete={deletePhoto} />
  }

  return (
    <div className="h-full w-full bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 mt-12">
        <h1 className="text-xl font-semibold">
          {isSelecting ? `${selectedPhotos.size} Selected` : formatDate(Date.now())}
        </h1>
        <div className="flex gap-4">
          <button onClick={() => setIsSelecting(!isSelecting)} className="text-blue-500 font-medium">
            {isSelecting ? "Cancel" : "Select"}
          </button>
          {!isSelecting && (
            <button className="text-blue-500">
              <MoreHorizontal className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="flex-1 overflow-auto px-1 pt-2">
        <div className="grid grid-cols-3 gap-1">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              className={cn("aspect-square relative overflow-hidden", "cursor-pointer")}
              onClick={() => handlePhotoClick(photo)}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={photo.url || "/placeholder.svg"}
                alt={`Photo from ${formatDate(photo.timestamp)}`}
                className="w-full h-full object-cover"
              />
              {isSelecting && (
                <div className={cn("absolute inset-0 bg-black/20", selectedPhotos.has(photo.id) && "bg-blue-500/20")}>
                  <div
                    className={cn(
                      "absolute top-2 right-2 w-5 h-5 rounded-full border-2",
                      selectedPhotos.has(photo.id) ? "bg-blue-500 border-blue-500" : "border-white",
                    )}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-2 flex justify-between border-t">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={cn(
              "px-4 py-1 rounded-full text-sm",
              selectedFilter === filter ? "bg-gray-200 font-medium" : "text-gray-500",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-around items-center py-2 border-t bg-white">
        {tabs.map(({ id, icon: Icon }) => (
          <button key={id} onClick={() => setSelectedTab(id)} className="flex flex-col items-center gap-1">
            <Icon className={cn("h-6 w-6", selectedTab === id ? "text-blue-500" : "text-gray-400")} />
            <span className={cn("text-xs", selectedTab === id ? "text-blue-500" : "text-gray-400")}>{id}</span>
          </button>
        ))}
      </div>

      {/* Delete Button */}
      {isSelecting && selectedPhotos.size > 0 && (
        <div className="absolute bottom-20 left-0 right-0 flex justify-center">
          <button onClick={deleteSelectedPhotos} className="bg-red-500 text-white px-6 py-2 rounded-full">
            Delete {selectedPhotos.size} Photo{selectedPhotos.size !== 1 ? "s" : ""}
          </button>
        </div>
      )}
    </div>
  )
}
