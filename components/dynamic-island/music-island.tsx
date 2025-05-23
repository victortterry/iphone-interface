"use client"

import { useEffect, useState } from "react"
import { Play, Pause, SkipBack, SkipForward, Speaker } from "lucide-react"
import { useMusicStore } from "@/lib/music-state"

export function MusicIsland() {
  const { currentSong, isPlaying, setIsPlaying, playNextSong, playPreviousSong, showMusicIsland } = useMusicStore()
  const [timeRemaining, setTimeRemaining] = useState("0:00")
  const [progress, setProgress] = useState(0)

  // Update progress and time remaining
  useEffect(() => {
    if (!currentSong) return

    const updateProgress = () => {
      const audio = document.querySelector("audio")
      if (audio) {
        // Update progress
        const currentProgress = (audio.currentTime / audio.duration) * 100
        setProgress(isNaN(currentProgress) ? 0 : currentProgress)

        // Update time remaining
        const remaining = audio.duration - audio.currentTime
        if (!isNaN(remaining)) {
          const minutes = Math.floor(remaining / 60)
          const seconds = Math.floor(remaining % 60)
          setTimeRemaining(`-${minutes}:${seconds.toString().padStart(2, "0")}`)
        }
      }
    }

    const interval = setInterval(updateProgress, 1000)

    // Also listen for timeupdate events
    const audio = document.querySelector("audio")
    if (audio) {
      audio.addEventListener("timeupdate", updateProgress)
    }

    return () => {
      clearInterval(interval)
      if (audio) {
        audio.removeEventListener("timeupdate", updateProgress)
      }
    }
  }, [currentSong])

  if (!currentSong || !showMusicIsland) return null

  return (
    <div
      className="absolute top-2 left-1/2 -translate-x-1/2 w-[95%] max-w-[350px] bg-black rounded-[32px] overflow-hidden z-[9999]"
      style={{
        boxShadow: "0 0 0 1px rgba(255, 0, 128, 0.2), 0 0 20px 0 rgba(255, 0, 128, 0.3)",
        background: "linear-gradient(to bottom, rgba(30, 30, 30, 0.95), rgba(10, 10, 10, 0.98))",
      }}
    >
      <div className="p-3 flex items-center gap-3">
        <img
          src={currentSong.albumArt || "/placeholder.svg?height=48&width=48"}
          alt={currentSong.title}
          className="w-12 h-12 rounded-lg object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=48&width=48"
          }}
        />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-white truncate">{currentSong.title}</div>
          <div className="text-xs text-white/70 truncate">{currentSong.artist}</div>
          <div className="flex items-center mt-1 gap-2">
            <div className="text-xs text-white/50">{timeRemaining}</div>
            {/* Progress bar */}
            <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white transition-all duration-100" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 ml-2">
          <button className="text-white" onClick={playPreviousSong}>
            <SkipBack className="h-5 w-5" />
          </button>
          <button className="text-white" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </button>
          <button className="text-white" onClick={playNextSong}>
            <SkipForward className="h-5 w-5" />
          </button>
          <button className="text-white">
            <Speaker className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
