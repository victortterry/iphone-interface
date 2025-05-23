"use client"

import { motion } from "framer-motion"
import { Search, Edit } from "lucide-react"
import { useMessagesStore } from "@/lib/messages-state"
import { formatRelativeTime } from "@/lib/utils"

export function ConversationList() {
  const { conversations, setActiveConversation } = useMessagesStore()

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b mt-12">
        <button className="text-blue-500 font-medium">Edit</button>
        <h1 className="text-xl font-bold">Messages</h1>
        <button className="text-blue-500">
          <Edit className="h-5 w-5" />
        </button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="flex items-center gap-2 bg-gray-200 rounded-full px-4 py-2">
          <Search className="h-4 w-4 text-gray-500" />
          <input type="text" placeholder="Search" className="bg-transparent w-full outline-none text-sm" />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-auto">
        {conversations.map((conversation) => (
          <motion.div
            key={conversation.id}
            className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100"
            onClick={() => setActiveConversation(conversation.id)}
            whileTap={{ scale: 0.98 }}
          >
            {/* Avatar */}
            <div className="relative">
              <img
                src={conversation.contact.avatar || "/placeholder.svg"}
                alt={conversation.contact.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {conversation.contact.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold truncate">{conversation.contact.name}</h3>
                <span className="text-xs text-gray-500">{formatRelativeTime(conversation.lastMessageAt)}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {conversation.messages[conversation.messages.length - 1]?.content}
              </p>
            </div>

            {/* Unread count */}
            {conversation.unreadCount > 0 && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">{conversation.unreadCount}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
