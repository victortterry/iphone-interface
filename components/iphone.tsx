"use client"

import { useState } from "react"
import { HomeScreen } from "./home-screen"
import { AppScreen } from "./app-screen"
import { MusicIsland } from "./dynamic-island/music-island"
import { PersistentAudioPlayer } from "./persistent-audio-player"
import type { AppName } from "@/lib/types"

export function IPhone() {
  const [activeApp, setActiveApp] = useState<AppName | null>(null)

  return (
    <div className="relative w-[375px] h-[812px] bg-black rounded-[55px] overflow-hidden">
      {/* Persistent Audio Player - this must be included for audio to work */}
      <PersistentAudioPlayer />

      {/* iPhone Frame */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[34px] bg-black rounded-b-[20px] z-[9998]" />
      </div>

      {/* Dynamic Island - positioned with highest z-index */}
      <div className="absolute inset-0 z-[9999] pointer-events-auto">
        <MusicIsland />
      </div>

      {/* Screen Content */}
      <div className="relative w-full h-full bg-[#f6f6f6] overflow-hidden">
        {activeApp ? (
          <AppScreen app={activeApp} onClose={() => setActiveApp(null)} />
        ) : (
          <HomeScreen onAppClick={setActiveApp} />
        )}
      </div>
    </div>
  )
}
