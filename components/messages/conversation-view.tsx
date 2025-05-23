"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Video, ImageIcon, Mic, ChevronRight } from "lucide-react"
import { useMessagesStore } from "@/lib/messages-state"
import { generateChatResponse } from "@/lib/ai-chat"
import { formatTime } from "@/lib/utils"
import type { Message } from "@/lib/types"

export function ConversationView() {
  const { conversations, activeConversationId, setActiveConversation, addMessage, markAsRead } = useMessagesStore()
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get the active conversation
  const activeConversation = conversations.find((c) => c.id === activeConversationId)

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Mark messages as read and scroll to bottom when conversation changes
  useEffect(() => {
    if (activeConversation) {
      scrollToBottom()
      // Only mark as read when the conversation ID changes
      if (activeConversation.unreadCount > 0) {
        markAsRead(activeConversation.id)
      }
    }
  }, [activeConversationId, activeConversation, activeConversation?.unreadCount, scrollToBottom, markAsRead]) // Only depend on the ID changing

  // Handle sending a message
  const handleSend = async () => {
    if (!inputValue.trim() || !activeConversation) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: Date.now(),
      status: "sending",
    }

    addMessage(activeConversation.id, userMessage)
    setInputValue("")
    setIsTyping(true)

    try {
      const response = await generateChatResponse(inputValue)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "assistant",
        timestamp: Date.now(),
        status: "delivered",
      }
      addMessage(activeConversation.id, assistantMessage)
    } catch (error) {
      console.error("Failed to generate response:", error)
    } finally {
      setIsTyping(false)
    }
  }

  // If no active conversation, render nothing but ensure hooks are still called
  if (!activeConversation) {
    return null
  }

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between bg-gray-50 border-b mt-12">
        <button onClick={() => setActiveConversation(null)} className="text-blue-500">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <img
            src={activeConversation.contact.avatar || "/placeholder.svg"}
            alt={activeConversation.contact.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold">{activeConversation.contact.name}</span>
        </div>
        <button className="text-blue-500">
          <Video className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {activeConversation.messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.sender === "user" ? "bg-blue-500 text-white" : "bg-white"
                }`}
              >
                <p>{message.content}</p>
                <div className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                  {formatTime(new Date(message.timestamp))}
                  {message.sender === "user" && (
                    <span className="ml-1">
                      {message.status === "sent" && "✓"}
                      {message.status === "delivered" && "✓✓"}
                      {message.status === "read" && "✓✓✓"}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-full px-4 py-2">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="w-6 h-3 flex items-center gap-1"
              >
                <div className="w-1 h-1 bg-gray-500 rounded-full" />
                <div className="w-1 h-1 bg-gray-500 rounded-full" />
                <div className="w-1 h-1 bg-gray-500 rounded-full" />
              </motion.div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex items-center gap-2">
          <button className="text-gray-500">
            <ImageIcon className="h-6 w-6" />
          </button>
          <div className="flex-1 flex items-center bg-white rounded-full border px-4 py-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="iMessage"
              className="flex-1 outline-none text-sm"
            />
            {inputValue ? (
              <button onClick={handleSend} className="text-blue-500 ml-2">
                <ChevronRight className="h-5 w-5" />
              </button>
            ) : (
              <button className="text-gray-500 ml-2">
                <Mic className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
