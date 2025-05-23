"use client"

import type React from "react"

import { useState } from "react"
import { Search, MoreVertical, Plus } from "lucide-react"
import { SAMPLE_SONGS } from "@/lib/music-data"
import { useMusicStore } from "@/lib/music-state"
import type { Song } from "@/lib/types"

export function SearchView() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Song[]>([])
  const { setCurrentSong, setIsPlaying, addToQueue } = useMusicStore()
  const [showOptions, setShowOptions] = useState<string | null>(null)

  const handleSearch = (value: string) => {
    setQuery(value)
    if (value.trim()) {
      // Simulate search results
      setResults(
        SAMPLE_SONGS.filter(
          (song) =>
            song.title.toLowerCase().includes(value.toLowerCase()) ||
            song.artist.toLowerCase().includes(value.toLowerCase()),
        ),
      )
    } else {
      setResults([])
    }
  }

  const handleSongClick = (song: Song) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const handleAddToQueue = (song: Song, e: React.MouseEvent) => {
    e.stopPropagation()
    addToQueue(song)
    setShowOptions(null)
  }

  return (
    <div className="h-full overflow-auto">
      <div className="px-4 pt-14 pb-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search"
            className="w-full h-9 bg-gray-100 rounded-lg pl-9 pr-4 text-sm outline-none"
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          {query && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {query && results.length === 0 && (
        <div className="px-4 py-8 text-center text-gray-500">No results found for "{query}"</div>
      )}

      {results.length > 0 && (
        <div className="px-4">
          <h2 className="text-lg font-semibold mb-3">Songs</h2>
          <div className="space-y-2">
            {results.map((song) => (
              <div key={song.id} className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer relative">
                <img
                  src={song.albumArt || "/placeholder.svg?height=48&width=48"}
                  alt={song.title}
                  className="w-12 h-12 rounded-lg mr-3 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=48&width=48"
                  }}
                />
                <div className="flex-1" onClick={() => handleSongClick(song)}>
                  <h3 className="font-medium text-sm">{song.title}</h3>
                  <p className="text-xs text-gray-500">{song.artist}</p>
                </div>
                <button
                  className="p-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowOptions(showOptions === song.id ? null : song.id)
                  }}
                >
                  <MoreVertical className="h-5 w-5 text-gray-400" />
                </button>

                {/* Options Menu */}
                {showOptions === song.id && (
                  <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg z-10 w-48">
                    <div
                      className="p-3 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                      onClick={(e) => handleAddToQueue(song, e)}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="text-sm">Add to Queue</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!query && (
        <div className="px-4">
          <h2 className="text-lg font-semibold mb-3">Browse Categories</h2>
          <div className="grid grid-cols-2 gap-3">
            {["Hip-Hop", "Pop", "Rock", "Electronic", "Jazz", "Classical", "R&B", "Country"].map((category) => (
              <div
                key={category}
                className="aspect-video bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center text-white font-bold"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
