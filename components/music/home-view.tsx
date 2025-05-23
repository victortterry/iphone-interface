"use client"

import type React from "react"

import { useState } from "react"
import { MoreVertical, Plus, Play } from "lucide-react"
import { FEATURED_ALBUMS, SAMPLE_SONGS } from "@/lib/music-data"
import { useMusicStore } from "@/lib/music-state"

export function HomeView() {
  const { setCurrentSong, setIsPlaying, addToQueue } = useMusicStore()
  const [showOptions, setShowOptions] = useState<string | null>(null)

  const handleAlbumClick = (albumId: string) => {
    const album = FEATURED_ALBUMS.find((album) => album.id === albumId)
    if (album && album.songs.length > 0) {
      setCurrentSong(album.songs[0])
      setIsPlaying(true)
    }
  }

  const handleAddToQueue = (songId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const song = SAMPLE_SONGS.find((song) => song.id === songId)
    if (song) {
      addToQueue(song)
      setShowOptions(null)
    }
  }

  return (
    <div className="h-full overflow-auto">
      <div className="px-4 pt-14 pb-4">
        <h1 className="text-2xl font-bold">TonesChat</h1>
      </div>

      {/* Featured Section */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-4 text-white">
          <h2 className="text-sm font-medium mb-2">FEATURED PLAYLIST</h2>
          <div className="flex items-center">
            <img
              src={FEATURED_ALBUMS[0].artwork || "/placeholder.svg?height=80&width=80"}
              alt={FEATURED_ALBUMS[0].title}
              className="w-20 h-20 rounded-lg mr-4 object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=80&width=80"
              }}
            />
            <div className="flex-1">
              <h3 className="font-bold text-lg">{FEATURED_ALBUMS[0].title}</h3>
              <p className="text-sm text-white/80">{FEATURED_ALBUMS[0].artist}</p>
              <button
                className="mt-2 bg-white text-red-500 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                onClick={() => handleAlbumClick(FEATURED_ALBUMS[0].id)}
              >
                <Play className="h-3 w-3" /> Play
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Albums */}
      <div className="px-4 pb-4">
        <h2 className="text-lg font-semibold mb-3">Featured Albums</h2>
        <div className="grid grid-cols-2 gap-4">
          {FEATURED_ALBUMS.map((album) => (
            <div key={album.id} className="flex flex-col cursor-pointer" onClick={() => handleAlbumClick(album.id)}>
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={album.artwork || "/placeholder.svg?height=200&width=200"}
                  alt={album.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=200&width=200"
                  }}
                />
              </div>
              <div className="mt-2">
                <h3 className="font-medium text-sm truncate">{album.title}</h3>
                <p className="text-xs text-gray-500 truncate">{album.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Added */}
      <div className="px-4 pb-4">
        <h2 className="text-lg font-semibold mb-3">Recently Added</h2>
        <div className="space-y-2">
          {SAMPLE_SONGS.map((song) => (
            <div key={song.id} className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer relative">
              <img
                src={song.albumArt || "/placeholder.svg?height=48&width=48"}
                alt={song.title}
                className="w-12 h-12 rounded-lg mr-3 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=48&width=48"
                }}
              />
              <div
                className="flex-1"
                onClick={() => {
                  setCurrentSong(song)
                  setIsPlaying(true)
                }}
              >
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
                    onClick={(e) => handleAddToQueue(song.id, e)}
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
    </div>
  )
}
