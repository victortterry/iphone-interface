"use client"

import { create } from "zustand"
import type { Message, Conversation } from "./types"

interface MessagesState {
  conversations: Conversation[]
  activeConversationId: string | null
  addMessage: (conversationId: string, message: Message) => void
  setActiveConversation: (id: string | null) => void
  markAsRead: (conversationId: string) => void
  addReaction: (conversationId: string, messageId: string, reaction: string) => void
}

// Initial conversation with Guillermo
const guillermoConversation: Conversation = {
  id: "guillermo",
  contact: {
    id: "guillermo",
    name: "Guillermo Rauch",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2ZG4j9TPtBOJ8H70dv7KGCcBrQsIoj.png",
    isOnline: true,
  },
  messages: [
    {
      id: "1",
      content: "Hey! I'd love to learn more about Vercel and v0. Can you tell me about them?",
      sender: "user",
      timestamp: Date.now() - 1000 * 60 * 10,
      status: "read",
    },
    {
      id: "2",
      content:
        "Hey there! 👋 Vercel is all about making deployment and development seamless. We're the platform for frontend developers, putting the developer experience first. And v0 is our new AI-powered coding assistant that helps you build faster with context-aware suggestions. What specific aspects are you curious about? 🚀",
      sender: "assistant",
      timestamp: Date.now() - 1000 * 60 * 8,
      status: "delivered",
    },
  ],
  lastMessageAt: Date.now() - 1000 * 60 * 8,
  unreadCount: 0,
}

export const useMessagesStore = create<MessagesState>((set) => ({
  conversations: [guillermoConversation],
  activeConversationId: null,
  addMessage: (conversationId, message) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [...conv.messages, message],
              lastMessageAt: message.timestamp,
              unreadCount: conv.unreadCount + (message.sender === "assistant" ? 1 : 0),
            }
          : conv,
      ),
    })),
  setActiveConversation: (id) => set({ activeConversationId: id }),
  markAsRead: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              unreadCount: 0,
              messages: conv.messages.map((msg) => ({
                ...msg,
                status: msg.sender === "user" ? "read" : msg.status,
              })),
            }
          : conv,
      ),
    })),
  addReaction: (conversationId, messageId, reaction) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: conv.messages.map((msg) =>
                msg.id === messageId
                  ? {
                      ...msg,
                      reactions: [...(msg.reactions || []), reaction],
                    }
                  : msg,
              ),
            }
          : conv,
      ),
    })),
}))
