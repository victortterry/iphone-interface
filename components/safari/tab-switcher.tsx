"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Plus } from "lucide-react"
import { VercelWebsite } from "./mock-websites/vercel-website"
import { GoogleWebsite } from "./mock-websites/google-website"

interface Tab {
  id: string
  url: string
  title: string
  isLoading: boolean
}

interface TabSwitcherProps {
  isVisible: boolean
  tabs: Tab[]
  activeTabId: string
  onClose: (id: string) => void
  onSelect: (id: string) => void
  onNew: () => void
  onDismiss: () => void
}

export function TabSwitcher({ isVisible, tabs, activeTabId, onClose, onSelect, onNew, onDismiss }: TabSwitcherProps) {
  const getTabPreview = (url: string) => {
    const hostname = new URL(url).hostname.toLowerCase()

    if (hostname === "vercel.com" || hostname === "www.vercel.com") {
      return (
        <div className="w-full h-full overflow-hidden scale-[0.5] origin-top-left">
          <div className="w-[200%] h-[200%]">
            <VercelWebsite />
          </div>
        </div>
      )
    }

    if (hostname === "google.com" || hostname === "www.google.com") {
      return (
        <div className="w-full h-full overflow-hidden scale-[0.5] origin-top-left">
          <div className="w-[200%] h-[200%]">
            <GoogleWebsite />
          </div>
        </div>
      )
    }

    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-2xl font-bold text-gray-400">{hostname}</div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute inset-x-0 bottom-0 bg-gray-100/80 backdrop-blur-xl rounded-t-xl p-4 pb-8"
          style={{ maxHeight: "80vh" }}
        >
          <div className="flex items-center justify-between mb-4">
            <button onClick={onDismiss} className="text-gray-500">
              Done
            </button>
            <button onClick={onNew} className="text-blue-500">
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 overflow-auto">
            {tabs.map((tab) => (
              <motion.div
                key={tab.id}
                layoutId={tab.id}
                className={`relative aspect-[3/2] rounded-xl overflow-hidden border ${
                  tab.id === activeTabId ? "border-blue-500" : "border-gray-200"
                }`}
                onClick={() => onSelect(tab.id)}
              >
                {getTabPreview(tab.url)}
                <div className="absolute inset-x-0 bottom-0 bg-white/80 backdrop-blur-sm p-2">
                  <div className="flex items-center justify-between">
                    <div className="truncate text-xs">{tab.title}</div>
                    {tabs.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onClose(tab.id)
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
