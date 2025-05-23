"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Share, BookOpen, Square, Lock, RotateCcw } from "lucide-react"
import { useLocalStorage } from "@/lib/use-local-storage"
import { TabSwitcher } from "./tab-switcher"
import { ShareMenu } from "./share-menu"
import { BookmarksView } from "./bookmarks-view"
import { SafariError } from "./safari-error"
import { HomeIndicator } from "@/components/home-indicator"
import { VercelWebsite } from "./mock-websites/vercel-website"
import { GoogleWebsite } from "./mock-websites/google-website"

const MOCK_WEBSITES = {
  "vercel.com": "vercel",
  "www.vercel.com": "vercel",
  "google.com": "google",
  "www.google.com": "google",
}

interface Tab {
  id: string
  url: string
  title: string
  isLoading: boolean
}

export function SafariApp() {
  const [tabs, setTabs] = useLocalStorage<Tab[]>("safari-tabs", [
    {
      id: "1",
      url: "https://vercel.com",
      title: "Vercel: Cloud Application Platform",
      isLoading: false,
    },
  ])
  const [activeTabId, setActiveTabId] = useLocalStorage<string>("safari-active-tab", "1")
  const [showTabs, setShowTabs] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showBookmarks, setShowBookmarks] = useState(false)
  const [urlInput, setUrlInput] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const webviewRef = useRef<HTMLIFrameElement>(null)

  const activeTab = tabs.find((tab) => tab.id === activeTabId)

  useEffect(() => {
    if (activeTab) {
      setUrlInput(activeTab.url)
    }
  }, [activeTab])

  const handleNewTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      url: "https://vercel.com",
      title: "New Tab",
      isLoading: true,
    }
    setTabs([...tabs, newTab])
    setActiveTabId(newTab.id)
    setShowTabs(false)
  }

  const handleCloseTab = (tabId: string) => {
    const newTabs = tabs.filter((tab) => tab.id !== tabId)
    if (newTabs.length === 0) {
      handleNewTab()
    } else if (activeTabId === tabId) {
      setActiveTabId(newTabs[newTabs.length - 1].id)
    }
    setTabs(newTabs)
  }

  const handleNavigate = (url: string) => {
    // Check if input is a URL or a search query
    const isUrl = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(url)

    if (isUrl) {
      // Add https:// if not present
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url
      }
    } else {
      // Treat as a search query
      url = `https://www.google.com/search?q=${encodeURIComponent(url)}`
    }

    const updatedTabs = tabs.map((tab) =>
      tab.id === activeTabId
        ? {
            ...tab,
            url,
            isLoading: true,
          }
        : tab,
    )
    setTabs(updatedTabs)
    setIsEditing(false)
    setLoadError(false)

    // Simulate loading
    setTimeout(() => {
      const updatedTabs = tabs.map((tab) =>
        tab.id === activeTabId
          ? {
              ...tab,
              isLoading: false,
              title: getMockTitle(url),
            }
          : tab,
      )
      setTabs(updatedTabs)
    }, 500)
  }

  const getMockTitle = (url: string) => {
    const hostname = new URL(url).hostname

    if (hostname === "vercel.com" || hostname === "www.vercel.com") {
      return "Vercel: Cloud Application Platform"
    }

    if (hostname === "google.com" || hostname === "www.google.com") {
      return "Google"
    }

    if (url.includes("google.com/search")) {
      const params = new URLSearchParams(new URL(url).search)
      const query = params.get("q")
      return query ? `${query} - Google Search` : "Google Search"
    }

    return hostname
  }

  const getMockWebsite = () => {
    if (!activeTab) return null

    const url = new URL(activeTab.url)
    const hostname = url.hostname.toLowerCase()

    // Check if we have a mock for this website
    const mockType = Object.entries(MOCK_WEBSITES).find(
      ([domain]) => hostname === domain || hostname.endsWith(`.${domain}`),
    )?.[1]

    switch (mockType) {
      case "vercel":
        return <VercelWebsite />
      case "google":
        return <GoogleWebsite />
      default:
        // For URLs we don't have mocks for, show the error page
        return <SafariError url={activeTab.url} onRetry={() => handleNavigate(activeTab.url)} />
    }
  }

  const handleRefresh = () => {
    if (activeTab) {
      const updatedTabs = tabs.map((tab) =>
        tab.id === activeTabId
          ? {
              ...tab,
              isLoading: true,
            }
          : tab,
      )
      setTabs(updatedTabs)

      // Simulate loading
      setTimeout(() => {
        const updatedTabs = tabs.map((tab) =>
          tab.id === activeTabId
            ? {
                ...tab,
                isLoading: false,
              }
            : tab,
        )
        setTabs(updatedTabs)
      }, 500)
    }
  }

  return (
    <HomeIndicator>
      <div className="h-full w-full bg-white flex flex-col">
        {/* Web View */}
        <div className="flex-1 overflow-hidden pt-12">{getMockWebsite()}</div>

        {/* Bottom Bar */}
        <motion.div
          initial={false}
          animate={{ y: showTabs || showShare || showBookmarks ? 300 : 0 }}
          className="bg-white/80 backdrop-blur-xl border-t"
        >
          {/* URL/Search Bar */}
          <div className="flex items-center gap-2 mx-4 my-2 bg-gray-100 rounded-lg px-3 py-1">
            {activeTab?.isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <RotateCcw className="h-4 w-4 text-gray-400" />
              </motion.div>
            ) : (
              <button onClick={handleRefresh}>
                <Lock className="h-4 w-4 text-gray-400" />
              </button>
            )}
            <input
              type="text"
              value={isEditing ? urlInput : activeTab?.url || ""}
              onChange={(e) => setUrlInput(e.target.value)}
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => e.key === "Enter" && handleNavigate(urlInput)}
              className="flex-1 bg-transparent text-sm outline-none"
              placeholder="Search or enter website name"
            />
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between px-6 py-2">
            <div className="flex gap-8">
              <button
                onClick={() => {
                  // Simulate back navigation
                  if (activeTab) {
                    handleNavigate(activeTab.url)
                  }
                }}
              >
                <ArrowLeft className="h-5 w-5 text-blue-500" />
              </button>
              <button
                onClick={() => {
                  // Simulate forward navigation
                  if (activeTab) {
                    handleNavigate(activeTab.url)
                  }
                }}
              >
                <ArrowRight className="h-5 w-5 text-blue-500" />
              </button>
            </div>
            <div className="flex gap-8">
              <button onClick={() => setShowShare(true)}>
                <Share className="h-5 w-5 text-blue-500" />
              </button>
              <button onClick={() => setShowBookmarks(true)}>
                <BookOpen className="h-5 w-5 text-blue-500" />
              </button>
              <button onClick={() => setShowTabs(true)}>
                <Square className="h-5 w-5 text-blue-500" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tab Switcher */}
        <TabSwitcher
          isVisible={showTabs}
          tabs={tabs}
          activeTabId={activeTabId}
          onClose={handleCloseTab}
          onSelect={(id) => {
            setActiveTabId(id)
            setShowTabs(false)
          }}
          onNew={handleNewTab}
          onDismiss={() => setShowTabs(false)}
        />

        {/* Share Menu */}
        <ShareMenu isVisible={showShare} url={activeTab?.url || ""} onDismiss={() => setShowShare(false)} />

        {/* Bookmarks View */}
        <BookmarksView
          isVisible={showBookmarks}
          onSelect={(url) => {
            handleNavigate(url)
            setShowBookmarks(false)
          }}
          onDismiss={() => setShowBookmarks(false)}
        />
      </div>
    </HomeIndicator>
  )
}
