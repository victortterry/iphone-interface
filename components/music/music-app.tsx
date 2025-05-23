"use client"

import { useState } from "react"
import { HomeView } from "./home-view"
import { SearchView } from "./search-view"
import { RadioView } from "./radio-view"
import { LibraryView } from "./library-view"
import { MusicPlayer } from "./music-player"
import { Home, Radio, Library, Search } from "lucide-react"

export function MusicApp() {
  const [activeTab, setActiveTab] = useState<"home" | "radio" | "library" | "search">("home")

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-hidden">
        {activeTab === "home" && <HomeView />}
        {activeTab === "radio" && <RadioView />}
        {activeTab === "library" && <LibraryView />}
        {activeTab === "search" && <SearchView />}
      </div>

      <MusicPlayer />

      {/* Bottom Tab Bar */}
      <div className="flex justify-around items-center py-2 border-t">
        <button
          className={`flex flex-col items-center p-2 ${activeTab === "home" ? "text-red-500" : "text-gray-500"}`}
          onClick={() => setActiveTab("home")}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          className={`flex flex-col items-center p-2 ${activeTab === "radio" ? "text-red-500" : "text-gray-500"}`}
          onClick={() => setActiveTab("radio")}
        >
          <Radio className="h-6 w-6" />
          <span className="text-xs mt-1">Radio</span>
        </button>
        <button
          className={`flex flex-col items-center p-2 ${activeTab === "library" ? "text-red-500" : "text-gray-500"}`}
          onClick={() => setActiveTab("library")}
        >
          <Library className="h-6 w-6" />
          <span className="text-xs mt-1">Library</span>
        </button>
        <button
          className={`flex flex-col items-center p-2 ${activeTab === "search" ? "text-red-500" : "text-gray-500"}`}
          onClick={() => setActiveTab("search")}
        >
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">Search</span>
        </button>
      </div>
    </div>
  )
}
