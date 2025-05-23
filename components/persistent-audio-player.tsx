"use client"

import { useEffect, useRef } from "react"
import { useMusicStore } from "@/lib/music-state"

export function PersistentAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { currentSong, isPlaying, setIsPlaying, toggleMusicIsland } = useMusicStore()

  // Set up audio element when component mounts
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Set up event listeners
    const handleEnded = () => {
      console.log("Audio ended")
      setIsPlaying(false)
    }

    const handleError = (e: ErrorEvent) => {
      console.error("Audio error:", e)
      setIsPlaying(false)
    }

    const handleCanPlay = () => {
      console.log("Audio can play")
      if (isPlaying) {
        audio.play().catch((err) => {
          console.error("Play error:", err)
          setIsPlaying(false)
        })
      }
    }

    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError as EventListener)
    audio.addEventListener("canplay", handleCanPlay)

    return () => {
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError as EventListener)
      audio.removeEventListener("canplay", handleCanPlay)
    }
  }, [setIsPlaying, isPlaying])

  // Handle song changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) return

    console.log("Loading song:", currentSong.title, currentSong.audioUrl)

    // Update audio source
    audio.src = currentSong.audioUrl
    audio.load()

    // Show music island when we have a current song
    toggleMusicIsland(!!currentSong)
  }, [currentSong, toggleMusicIsland])

  // Handle play/pause state changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) return

    console.log("Play state changed:", isPlaying)

    if (isPlaying) {
      audio.play().catch((err) => {
        console.error("Play error:", err)
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }

    // Update music island visibility based on playback state
    toggleMusicIsland(isPlaying && !!currentSong)
  }, [isPlaying, currentSong, setIsPlaying, toggleMusicIsland])

  return <audio ref={audioRef} preload="auto" style={{ display: "none" }} />
}
