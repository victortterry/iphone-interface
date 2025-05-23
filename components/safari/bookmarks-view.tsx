"use client"

import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Star, Clock, Square, FolderOpen } from "lucide-react"
import { useLocalStorage } from "@/lib/use-local-storage"

interface Bookmark {
  id: string
  title: string
  url: string
  favicon?: string
}

interface BookmarksViewProps {
  isVisible: boolean
  onSelect: (url: string) => void
  onDismiss: () => void
}

export function BookmarksView({ isVisible, onSelect, onDismiss }: BookmarksViewProps) {
  const [bookmarks] = useLocalStorage<Bookmark[]>("safari-bookmarks", [
    {
      id: "1",
      title: "Vercel",
      url: "https://vercel.com",
      favicon: "https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico",
    },
    {
      id: "2",
      title: "Next.js",
      url: "https://nextjs.org",
      favicon: "https://nextjs.org/favicon.ico",
    },
  ])

  const tabs = [
    { icon: BookOpen, label: "Bookmarks" },
    { icon: Star, label: "Favorites" },
    { icon: Clock, label: "History" },
    { icon: Square, label: "Shared" },
    { icon: FolderOpen, label: "Downloads" },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-50"
            onClick={onDismiss}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 bg-gray-100/80 backdrop-blur-xl rounded-t-xl p-4 z-50"
            style={{ maxHeight: "80vh" }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Bookmarks</h2>
                <button onClick={onDismiss} className="text-blue-500">
                  Done
                </button>
              </div>

              <div className="flex gap-4 mb-4 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                  <button key={tab.label} className="flex flex-col items-center gap-1 min-w-[64px]">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <tab.icon className="h-6 w-6 text-blue-500" />
                    </div>
                    <span className="text-xs">{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-auto">
                {bookmarks.map((bookmark) => (
                  <button
                    key={bookmark.id}
                    className="flex items-center gap-3 w-full p-3 hover:bg-gray-200/50 rounded-lg"
                    onClick={() => onSelect(bookmark.url)}
                  >
                    {bookmark.favicon ? (
                      <img src={bookmark.favicon || "/placeholder.svg"} alt="" className="w-5 h-5" />
                    ) : (
                      <div className="w-5 h-5 bg-gray-200 rounded" />
                    )}
                    <div className="flex-1 text-left">
                      <div className="font-medium">{bookmark.title}</div>
                      <div className="text-sm text-gray-500 truncate">{bookmark.url}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
