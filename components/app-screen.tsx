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
import { useEffect } from "react"

interface AppViewProps {
  appId: string
}

export function AppView({ appId }: AppViewProps) {
  const { closeApp } = useAppState()

  // Preload app icon when app is opened
  useEffect(() => {
    const img = new Image()
    img.src = `/icons/${appId}.svg`
  }, [appId])

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    closeApp()
  }

  const appComponents = {
    clock: <Clock />,
    settings: <Settings />,
    weather: <Weather />,
    calendar: <Calendar />,
    camera: <Camera />,
    photos: <Photos />,
    notes: <NotesApp />,
    messages: <MessagesApp />,
    safari: <SafariApp />,
    music: <MusicApp />,
    phone: <PhoneApp />,
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full w-full flex-col bg-black"
    >
      <div className="flex h-[44px] w-full items-center justify-between px-4 bg-gray-800">
        <button onClick={handleBackClick} className="rounded-full p-2">
          <ArrowLeft className="h-6 w-6 text-white" />
        </button>
        <div className="flex gap-2">
          <HomeIndicator />
        </div>
      </div>
      <div className="flex h-[calc(100%-44px)] w-full flex-col overflow-y-auto p-4">
        {appComponents[appId as keyof typeof appComponents]}
      </div>
    </motion.div>
  )
}
