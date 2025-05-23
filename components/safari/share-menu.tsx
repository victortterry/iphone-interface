"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Copy, BookmarkPlus, Send, MessageCircle, Mail, Printer, QrCode } from "lucide-react"

interface ShareMenuProps {
  isVisible: boolean
  url: string
  onDismiss: () => void
}

export function ShareMenu({ isVisible, url, onDismiss }: ShareMenuProps) {
  const shareOptions = [
    { icon: MessageCircle, label: "Messages" },
    { icon: Mail, label: "Mail" },
    { icon: Copy, label: "Copy" },
    { icon: BookmarkPlus, label: "Add Bookmark" },
    { icon: Send, label: "AirDrop" },
    { icon: Printer, label: "Print" },
    { icon: QrCode, label: "QR Code" },
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
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-1 bg-gray-300 rounded-full mb-4" />
              <h2 className="text-lg font-semibold mb-4">Share</h2>
              <div className="grid grid-cols-4 gap-4 w-full mb-4">
                {shareOptions.map((option) => (
                  <button key={option.label} className="flex flex-col items-center gap-1" onClick={onDismiss}>
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <option.icon className="h-6 w-6 text-blue-500" />
                    </div>
                    <span className="text-xs">{option.label}</span>
                  </button>
                ))}
              </div>
              <div className="w-full rounded-xl bg-white p-4 mb-4">
                <p className="text-sm truncate">{url}</p>
              </div>
              <button className="w-full py-3 text-red-500 font-medium" onClick={onDismiss}>
                Cancel
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
