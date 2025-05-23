"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { useAppState } from "@/lib/app-state"

interface HomeIndicatorProps {
  children: React.ReactNode
}

export function HomeIndicator({ children }: HomeIndicatorProps) {
  const { closeApp } = useAppState()
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle swipe up gesture
  useEffect(() => {
    let touchStartY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY
      const diff = touchStartY - touchY

      // If swiped up more than 100px, go home
      if (diff > 100) {
        closeApp()
      }
    }

    const element = containerRef.current
    if (element) {
      element.addEventListener("touchstart", handleTouchStart)
      element.addEventListener("touchmove", handleTouchMove)
    }

    return () => {
      if (element) {
        element.removeEventListener("touchstart", handleTouchStart)
        element.removeEventListener("touchmove", handleTouchMove)
      }
    }
  }, [closeApp])

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      {children}

      {/* Home Indicator */}
      <div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-full z-50 opacity-30 cursor-pointer"
        onClick={closeApp}
      />
    </div>
  )
}
