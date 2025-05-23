"use client"

import { useMusicStore } from "@/lib/music-state"
import { SkipBack, Play, Pause, SkipForward } from "lucide-react"

export function MusicModule() {
  const { currentSong, isPlaying, setIsPlaying } = useMusicStore()

  if (!currentSong) return null

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 aspect-square">
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-2">
          <div className="w-12 h-12 rounded-lg overflow-hidden mr-3">
            <img
              src={currentSong.albumArt || "/placeholder.svg?height=48&width=48"}
              alt={currentSong.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <h3 className="text-white text-sm font-medium truncate">{currentSong.title}</h3>
            <p className="text-white/70 text-xs truncate">{currentSong.artist}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <button className="text-white">
            <SkipBack className="h-6 w-6" />
          </button>

          <button className="text-white" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
          </button>

          <button className="text-white">
            <SkipForward className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
