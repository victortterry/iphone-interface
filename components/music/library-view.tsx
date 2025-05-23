"use client"

import { useState } from "react"
import { Music, Mic, Clock, Download, Heart, Plus, MoreVertical } from "lucide-react"
import { FEATURED_ALBUMS, SAMPLE_SONGS } from "@/lib/music-data"
import { useMusicStore } from "@/lib/music-state"

export function LibraryView() {
  const { setCurrentSong, setIsPlaying } = useMusicStore()
  const [activeCategory, setActiveCategory] = useState<"playlists" | "artists" | "albums">("playlists")

  const handleSongClick = (songId: string) => {
    const song = SAMPLE_SONGS.find((s) => s.id === songId)
    if (song) {
      setCurrentSong(song)
      setIsPlaying(true)
    }
  }

  return (
    <div className="h-full overflow-auto">
      <div className="px-4 pt-14 pb-4">
        <h1 className="text-2xl font-bold">Library</h1>
      </div>

      {/* Category Tabs */}
      <div className="px-4 mb-4">
        <div className="flex space-x-4 border-b">
          <button
            className={`pb-2 px-1 text-sm font-medium ${
              activeCategory === "playlists" ? "text-red-500 border-b-2 border-red-500" : "text-gray-500"
            }`}
            onClick={() => setActiveCategory("playlists")}
          >
            Playlists
          </button>
          <button
            className={`pb-2 px-1 text-sm font-medium ${
              activeCategory === "artists" ? "text-red-500 border-b-2 border-red-500" : "text-gray-500"
            }`}
            onClick={() => setActiveCategory("artists")}
          >
            Artists
          </button>
          <button
            className={`pb-2 px-1 text-sm font-medium ${
              activeCategory === "albums" ? "text-red-500 border-b-2 border-red-500" : "text-gray-500"
            }`}
            onClick={() => setActiveCategory("albums")}
          >
            Albums
          </button>
        </div>
      </div>

      {/* Library Categories */}
      <div className="px-4 mb-6">
        <div className="space-y-3">
          <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mr-3">
              <Music className="h-5 w-5 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">All Songs</h3>
              <p className="text-xs text-gray-500">{SAMPLE_SONGS.length} songs</p>
            </div>
          </div>
          <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
              <Heart className="h-5 w-5 text-purple-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">Favorites</h3>
              <p className="text-xs text-gray-500">3 songs</p>
            </div>
          </div>
          <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
              <Download className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">Downloaded</h3>
              <p className="text-xs text-gray-500">2 songs</p>
            </div>
          </div>
          <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mr-3">
              <Clock className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">Recently Played</h3>
              <p className="text-xs text-gray-500">4 songs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Playlists */}
      {activeCategory === "playlists" && (
        <div className="px-4 pb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">My Playlists</h2>
            <button className="text-red-500">
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-3">
            {FEATURED_ALBUMS.map((album) => (
              <div key={album.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <img
                  src={album.artwork || "/placeholder.svg?height=48&width=48"}
                  alt={album.title}
                  className="w-12 h-12 rounded-lg mr-3 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=48&width=48"
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{album.title}</h3>
                  <p className="text-xs text-gray-500">{album.songs.length} songs</p>
                </div>
                <MoreVertical className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Albums */}
      {activeCategory === "albums" && (
        <div className="px-4 pb-20">
          <h2 className="text-lg font-semibold mb-3">Albums</h2>
          <div className="grid grid-cols-2 gap-4">
            {FEATURED_ALBUMS.map((album) => (
              <div key={album.id} className="flex flex-col cursor-pointer">
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
      )}

      {/* Artists */}
      {activeCategory === "artists" && (
        <div className="px-4 pb-20">
          <h2 className="text-lg font-semibold mb-3">Artists</h2>
          <div className="space-y-3">
            {["OLEXY", "MUSICTOWN", "FASSounds", "Alex_MakeMusic", "Urban Beats"].map((artist, index) => (
              <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <Mic className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{artist}</h3>
                  <p className="text-xs text-gray-500">Artist</p>
                </div>
                <MoreVertical className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
