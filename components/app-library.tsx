"use client"

import { useState } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { AppIcon } from "./app-icon"

interface AppCategory {
  id: string
  name: string
  apps: Array<{
    id: string
    name: string
    color: string
    icon: string
  }>
}

// App categories based on functionality
const appCategories: AppCategory[] = [
  {
    id: "lifestyle",
    name: "Lifestyle",
    apps: [
      { id: "health", name: "Health", color: "bg-gradient-to-br from-pink-400 to-red-500", icon: "health" },
      { id: "reminders", name: "Reminders", color: "bg-white", icon: "reminders" },
      { id: "clock", name: "Clock", color: "bg-black", icon: "clock" },
    ],
  },
  {
    id: "utilities",
    name: "Utilities",
    apps: [
      { id: "settings", name: "Settings", color: "bg-gray-200", icon: "settings" },
      { id: "wallet", name: "Wallet", color: "bg-gradient-to-b from-yellow-400 to-red-500", icon: "wallet" },
      { id: "maps", name: "Maps", color: "", icon: "maps" },
    ],
  },
  {
    id: "information",
    name: "Information",
    apps: [
      { id: "calendar", name: "Calendar", color: "", icon: "calendar" },
      { id: "news", name: "News", color: "bg-gradient-to-br from-red-500 to-pink-500", icon: "news" },
      { id: "notes", name: "Notes", color: "bg-yellow-100", icon: "notes" },
    ],
  },
  {
    id: "media",
    name: "Media",
    apps: [
      { id: "podcasts", name: "Podcasts", color: "", icon: "podcasts" },
      { id: "tv", name: "TV", color: "", icon: "tv" },
      { id: "music", name: "Music", color: "", icon: "music" },
    ],
  },
  {
    id: "creativity",
    name: "Creativity",
    apps: [
      { id: "camera", name: "Camera", color: "bg-gray-800", icon: "camera" },
      {
        id: "photos",
        name: "Photos",
        color: "bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400",
        icon: "photos",
      },
    ],
  },
  {
    id: "connectivity",
    name: "Connectivity",
    apps: [
      { id: "phone", name: "Phone", color: "bg-green-500", icon: "phone" },
      { id: "messages", name: "Messages", color: "", icon: "messages" },
      { id: "facetime", name: "FaceTime", color: "", icon: "facetime" },
      { id: "mail", name: "Mail", color: "", icon: "mail" },
    ],
  },
]

interface AppLibraryProps {
  isVisible: boolean
  onClose: () => void
}

export function AppLibrary({ isVisible, onClose }: AppLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const dragX = useMotionValue(0)

  // Transform values for animation effects
  const opacity = useTransform(dragX, [0, 100], [1, 0.8], {
    clamp: true,
  })
  const scale = useTransform(dragX, [0, 100], [1, 0.98], {
    clamp: true,
  })

  // Filter apps based on search query
  const filteredCategories = searchQuery
    ? appCategories
        .map((category) => ({
          ...category,
          apps: category.apps.filter((app) => app.name.toLowerCase().includes(searchQuery.toLowerCase())),
        }))
        .filter((category) => category.apps.length > 0)
    : appCategories

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 300,
            mass: 1,
          }}
          className="absolute inset-0 bg-black/10 backdrop-blur-xl z-50 select-none"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          dragTransition={{
            bounceStiffness: 600,
            bounceDamping: 30,
          }}
          style={{
            x: dragX,
            opacity: isNaN(opacity.get()) ? 1 : opacity.get(),
            scale: scale.get(),
          }}
          onDragEnd={(event, info) => {
            // Close the app library if swiped right (positive x offset)
            if (info.offset.x > 50 || info.velocity.x > 500) {
              onClose()
            }
            // Reset drag position
            dragX.set(0)
          }}
        >
          {/* Search Bar */}
          <div className="px-4 pt-14 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="App Library"
                className="w-full h-9 bg-white/10 backdrop-blur-xl rounded-lg pl-9 pr-4 text-white placeholder-white/70 outline-none select-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
            </div>
          </div>

          {/* App Categories Grid */}
          <div className="px-4 pb-4 overflow-auto h-[calc(100%-6rem)]">
            <div className="grid grid-cols-2 gap-4">
              {filteredCategories.map((category) => (
                <div key={category.id} className="space-y-1">
                  <div className="relative aspect-square bg-white/10 backdrop-blur-xl rounded-2xl p-2 overflow-hidden">
                    <div className="grid grid-cols-2 gap-2 h-full">
                      {category.apps.map((app, index) => (
                        <div
                          key={app.id}
                          className={cn(
                            "relative",
                            index === 3 && category.apps.length > 4 && "grid grid-cols-3 gap-0.5",
                          )}
                        >
                          <AppIcon id={app.id} name={app.name} color={app.color} icon={app.icon} size="small" />
                          {index === 3 &&
                            category.apps.slice(4).map((extraApp) => (
                              <div
                                key={extraApp.id}
                                className="aspect-square rounded-lg bg-gray-200 text-[8px] flex items-center justify-center"
                              >
                                {extraApp.name[0]}
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-white/90 text-center font-medium select-none">{category.name}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
