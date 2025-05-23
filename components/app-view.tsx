"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Clock } from "@/components/clock"
import { Settings } from "@/components/settings"
import { Weather } from "@/components/weather"
import { Calendar } from "@/components/calendar"
import { Camera } from "@/components/camera"
import { Photos } from "@/components/photos"
import { NotesApp } from "@/components/notes/notes-app"
import { useAppState } from "@/lib/app-state"
import { HomeIndicator } from "@/components/home-indicator"
import { MessagesApp } from "@/components/messages/messages-app"
import { SafariApp } from "@/components/safari/safari-app"
import { MusicApp } from "@/components/music/music-app"
import { PhoneApp } from "@/components/phone/phone-app"

interface AppViewProps {
  appId: string
}

export function AppView({ appId }: AppViewProps) {
  const { closeApp } = useAppState()

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    closeApp()
  }

  const renderApp = () => {
    switch (appId) {
      case "clock":
        return <Clock />
      case "settings":
        return <Settings />
      case "weather":
        return <Weather />
      case "calendar":
        return <Calendar />
      case "camera":
        return <Camera />
      case "photos":
        return <Photos />
      case "notes":
        return <NotesApp />
      case "messages":
        return <MessagesApp />
      case "safari":
        return <SafariApp />
      case "music":
        return <MusicApp />
      case "phone":
        return <PhoneApp />
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full bg-white text-black p-6">
            <div className="text-2xl font-bold mb-4">{appId.charAt(0).toUpperCase() + appId.slice(1)} App</div>
            <div className="text-sm text-gray-500">This is a placeholder for the {appId} app</div>
          </div>
        )
    }
  }

  const showHeader = !["camera", "messages", "photos", "notes", "safari", "phone"].includes(appId)

  return (
    <HomeIndicator>
      <div className="h-full w-full bg-white flex flex-col">
        {showHeader && (
          <div className="flex items-center px-4 py-3 border-b mt-12">
            <motion.button whileTap={{ scale: 0.9 }} onClick={handleBackClick} className="text-blue-500 z-40">
              <ArrowLeft className="h-5 w-5" />
            </motion.button>
            <div className="text-center flex-1 font-semibold -ml-5">
              {appId.charAt(0).toUpperCase() + appId.slice(1)}
            </div>
          </div>
        )}

        <div className={`flex-1 overflow-auto ${!showHeader ? "pt-0" : ""}`}>{renderApp()}</div>
      </div>
    </HomeIndicator>
  )
}
