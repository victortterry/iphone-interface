"use client"

import { useState } from "react"
import { ArrowLeft, Share2, Heart, Trash2, MoreHorizontal } from "lucide-react"

interface PhotoDetailProps {
  photo: {
    id: string
    url: string
    timestamp: number
  }
  onBack: () => void
  onDelete: (id: string) => void
}

export function PhotoDetail({ photo, onBack, onDelete }: PhotoDetailProps) {
  const [showControls, setShowControls] = useState(true)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  }

  const handleImageClick = () => {
    setShowControls(!showControls)
  }

  return (
    <div className="h-full w-full bg-black flex flex-col">
      {/* Header */}
      {showControls && (
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent">
          <button onClick={onBack}>
            <ArrowLeft className="h-6 w-6 text-white" />
          </button>
          <div className="flex gap-4">
            <button>
              <Share2 className="h-6 w-6 text-white" />
            </button>
            <button>
              <Heart className="h-6 w-6 text-white" />
            </button>
            <button onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash2 className="h-6 w-6 text-white" />
            </button>
            <button>
              <MoreHorizontal className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Photo */}
      <div className="flex-1 flex items-center justify-center" onClick={handleImageClick}>
        <img
          src={photo.url || "/placeholder.svg"}
          alt={`Photo from ${formatDate(photo.timestamp)}`}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Footer */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white text-sm text-center">{formatDate(photo.timestamp)}</p>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl w-[80%] overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-center text-white">Delete Photo</h3>
            </div>
            <div className="p-4">
              <p className="text-center mb-4 text-white">Are you sure you want to delete this photo?</p>
              <div className="flex justify-end gap-2">
                <button className="px-4 py-2 text-blue-400" onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  onClick={() => {
                    onDelete(photo.id)
                    setIsDeleteDialogOpen(false)
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
