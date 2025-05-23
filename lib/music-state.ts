"use client"

import { create } from "zustand"
import type { Song } from "./types"

interface MusicState {
  currentSong: Song | null
  isPlaying: boolean
  queue: Song[]
  setCurrentSong: (song: Song | null) => void
  setIsPlaying: (isPlaying: boolean) => void
  addToQueue: (song: Song) => void
  removeFromQueue: (songId: string) => void
  clearQueue: () => void
}

export const useMusicStore = create<MusicState>((set) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  setCurrentSong: (song) => set({ currentSong: song }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  addToQueue: (song) => set((state) => ({ queue: [...state.queue, song] })),
  removeFromQueue: (songId) =>
    set((state) => ({
      queue: state.queue.filter((song) => song.id !== songId),
    })),
  clearQueue: () => set({ queue: [] }),
}))
