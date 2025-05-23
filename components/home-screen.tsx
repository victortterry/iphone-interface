"use client"

import { useState, useEffect } from "react"
import { StatusBar } from "@/components/status-bar"
import { AppIcon } from "@/components/app-icon"
import { Widget } from "@/components/widget"
import { AppLibrary } from "@/components/app-library"
import { motion, AnimatePresence } from "framer-motion"
import { useAppState } from "@/lib/app-state"

interface HomeScreenProps {
  time: Date
}

export function HomeScreen({ time }: HomeScreenProps) {
  const [showAppLibrary, setShowAppLibrary] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const dayOfMonth = time.getDate()
  const { openControlCenter } = useAppState()

  // Preload critical SVG icons
  useEffect(() => {
    const preloadIcons = [
      "facetime",
      "calendar",
      "photos",
      "camera",
      "mail",
      "notes",
      "reminders",
      "clock",
      "phone",
      "safari",
      "messages",
      "music",
    ]

    preloadIcons.forEach((icon) => {
      const img = new Image()
      img.src = `/icons/${icon}.svg`
    })
  }, [])

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -50 && currentPage < 1) {
      // Swipe left
      setCurrentPage(currentPage + 1)
    } else if (info.offset.x > 50 && currentPage > 0) {
      // Swipe right
      setCurrentPage(currentPage - 1)
    } else if (info.offset.x < -50 && currentPage === 1) {
      // Open App Library from last page
      setShowAppLibrary(true)
    }
  }

  // Add touch handler for swipe down from top
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY
      if (touchY < 30) {
        // Touch started near the top of the screen
        const handleTouchMove = (moveEvent: TouchEvent) => {
          const currentY = moveEvent.touches[0].clientY
          if (currentY - touchY > 30) {
            // Swiped down at least 30px
            openControlCenter()
            document.removeEventListener("touchmove", handleTouchMove)
          }
        }

        document.addEventListener("touchmove", handleTouchMove, { once: true })
      }
    }

    document.addEventListener("touchstart", handleTouchStart)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
    }
  }, [openControlCenter])

  return (
    <div
      className="h-full w-full flex flex-col relative select-none overflow-hidden"
      style={{
        backgroundImage: `url(/wallpaper.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <StatusBar time={time} dark />

      {/* Pages Container */}
      <motion.div
        className="flex-1 relative"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {currentPage === 0 && (
            <motion.div
              key="page-0"
              className="absolute inset-0 px-6 pt-4 pb-6 flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              {/* Widgets */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Widget
                  className="bg-blue-500/80 backdrop-blur-md"
                  title="Weather"
                  content={
                    <div className="text-white">
                      <div className="text-sm">Cupertino</div>
                      <div className="text-5xl font-light">56°</div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-300 text-lg">☀️</span>
                        <span>Sunny</span>
                      </div>
                      <div className="text-xs mt-1">H:77° L:55°</div>
                    </div>
                  }
                />
                <Widget
                  className="bg-black/80 backdrop-blur-md"
                  title="Calendar"
                  content={
                    <div className="text-white">
                      <div className="text-xs text-red-500">MONDAY</div>
                      <div className="text-5xl font-light">{dayOfMonth}</div>
                      <div className="flex items-center gap-1 mt-1 text-xs">
                        <span className="text-gray-400">🔒</span>
                        <span>2 birthdays</span>
                      </div>
                      <div className="text-xs mt-1 text-red-500">
                        Portfolio work s...
                        <br />
                        10 - 10:30AM
                      </div>
                    </div>
                  }
                />
              </div>

              {/* First page app icons */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <AppIcon id="facetime" name="FaceTime" color="" />
                <AppIcon id="calendar" name="Calendar" color="" />
                <AppIcon id="photos" name="Photos" color="bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400" />
                <AppIcon id="camera" name="Camera" color="bg-gray-800" />
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <AppIcon id="mail" name="Mail" color="bg-blue-500" />
                <AppIcon id="notes" name="Notes" color="bg-yellow-100" />
                <AppIcon id="reminders" name="Reminders" color="bg-white" />
                <AppIcon id="clock" name="Clock" color="bg-black" />
              </div>
            </motion.div>
          )}

          {currentPage === 1 && (
            <motion.div
              key="page-1"
              className="absolute inset-0 px-6 pt-4 pb-6 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              {/* Second page app icons */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <AppIcon id="maps" name="Maps" color="" />
                <AppIcon id="health" name="Health" color="" />
                <AppIcon id="wallet" name="Wallet" color="bg-gradient-to-b from-yellow-400 to-red-500" />
                <AppIcon id="settings" name="Settings" color="bg-gray-200" />
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <AppIcon id="news" name="News" color="bg-red-600" />
                <AppIcon id="tv" name="TV" color="bg-black" />
                <AppIcon id="podcasts" name="Podcasts" color="" />
                <AppIcon id="appstore" name="App Store" color="" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Page Indicators */}
      <div className="flex justify-center mb-2">
        <div className="flex gap-1.5">
          <button
            className={`w-1.5 h-1.5 rounded-full ${currentPage === 0 ? "bg-white" : "bg-white/30"}`}
            onClick={() => setCurrentPage(0)}
          />
          <button
            className={`w-1.5 h-1.5 rounded-full ${currentPage === 1 ? "bg-white" : "bg-white/30"}`}
            onClick={() => setCurrentPage(1)}
          />
          <button className={`w-1.5 h-1.5 rounded-full ${showAppLibrary ? "bg-white" : "bg-white/30"}`} />
        </div>
      </div>

      {/* Dock */}
      <div className="grid grid-cols-4 gap-4 px-6 mb-6">
        <AppIcon id="phone" name="Phone" color="bg-green-500" />
        <AppIcon id="safari" name="Safari" color="" />
        <AppIcon id="messages" name="Messages" color="" />
        <AppIcon id="music" name="Music" color="" />
      </div>

      {/* App Library */}
      <AppLibrary isVisible={showAppLibrary} onClose={() => setShowAppLibrary(false)} />
    </div>
  )
}
