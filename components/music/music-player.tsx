"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, SkipBack, SkipForward, List } from "lucide-react"
import { useMusicStore } from "@/lib/music-state"
import { QueueView } from "./queue-view"

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)
  const [showQueue, setShowQueue] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const { currentSong, isPlaying, setIsPlaying, queue } = useMusicStore()

  // Handle play/pause
  const togglePlayback = async () => {
    if (!audioRef.current || audioError) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        setIsLoading(true)
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.error("Play error:", error)
          if (error instanceof DOMException) {
            if (error.name === "NotSupportedError") {
              console.error("Format not supported")
            } else if (error.name === "NotAllowedError") {
              console.error("User interaction required")
            }
          }
          setIsPlaying(false)
          setAudioError(true)
        }
      }
    } catch (error) {
      console.error("Playback error:", error)
      setIsPlaying(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle song changes
  useEffect(() => {
    if (!currentSong) return

    const setupAudio = async () => {
      if (!audioRef.current) return

      // Reset state
      setProgress(0)
      setAudioError(false)
      setIsLoading(true)

      try {
        // Pause any current playback
        audioRef.current.pause()

        // Update audio source
        audioRef.current.src = currentSong.audioUrl

        // Add event listeners before loading
        const loadPromise = new Promise((resolve, reject) => {
          const loadedHandler = () => {
            audioRef.current?.removeEventListener("canplaythrough", loadedHandler)
            resolve(true)
          }

          const errorHandler = (e: Event) => {
            audioRef.current?.removeEventListener("error", errorHandler)
            console.error("Audio loading error:", e)
            reject(new Error("Failed to load audio"))
          }

          audioRef.current?.addEventListener("canplaythrough", loadedHandler, { once: true })
          audioRef.current?.addEventListener("error", errorHandler, { once: true })
        })

        audioRef.current.load()

        // Wait for loading or error
        await loadPromise

        // If isPlaying is true, attempt to play the new song
        if (isPlaying) {
          await audioRef.current.play()
        }
      } catch (error) {
        console.error("Audio setup error:", error)
        setAudioError(true)
        setIsPlaying(false)
      } finally {
        setIsLoading(false)
      }
    }

    setupAudio()

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [currentSong, isPlaying, setIsPlaying])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100
      setProgress(isNaN(currentProgress) ? 0 : currentProgress)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && !audioError) {
      const progressBar = e.currentTarget
      const clickPosition = e.clientX - progressBar.getBoundingClientRect().left
      const progressBarWidth = progressBar.clientWidth
      const percentage = clickPosition / progressBarWidth

      audioRef.current.currentTime = percentage * audioRef.current.duration
    }
  }

  const handleAudioError = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    console.error("Audio error event triggered")
    const audioElement = e.currentTarget
    if (audioElement.error) {
      console.error("Audio playback error:", audioElement.error.message)
    }
    setAudioError(true)
    setIsPlaying(false)
    setIsLoading(false)
  }

  if (!currentSong) return null

  return (
    <>
      <div className="border-t bg-white p-4">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onError={handleAudioError}
        />

        <div className="flex items-center gap-4">
          <img
            src={currentSong.albumArt || "/placeholder.svg?height=48&width=48"}
            alt={currentSong.title}
            className="w-12 h-12 rounded-lg object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=48&width=48"
            }}
          />

          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{currentSong.title}</div>
            <div className="text-xs text-gray-500 truncate">{currentSong.artist}</div>
            {audioError && <div className="text-xs text-red-500">Unable to play this track</div>}
          </div>

          <div className="flex items-center gap-4">
            <button className="text-gray-400" onClick={() => setShowQueue(true)}>
              <List className="h-5 w-5" />
            </button>
            <button className="text-gray-400">
              <SkipBack className="h-6 w-6" />
            </button>
            <button
              onClick={togglePlayback}
              className={`w-10 h-10 rounded-full ${audioError ? "bg-gray-400" : "bg-red-500"} text-white flex items-center justify-center`}
              disabled={isLoading || audioError}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>
            <button className="text-gray-400">
              <SkipForward className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden cursor-pointer" onClick={handleProgressClick}>
          <div className="h-full bg-red-500 transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Queue View */}
      <QueueView isOpen={showQueue} onClose={() => setShowQueue(false)} />
    </>
  )
}
