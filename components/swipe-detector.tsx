"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useAppState } from "@/lib/app-state"

interface SwipeDetectorProps {
  children: React.ReactNode
}

export function SwipeDetector({ children }: SwipeDetectorProps) {
  const { openControlCenter, closeControlCenter, controlCenterOpen } = useAppState()
  const containerRef = useRef<HTMLDivElement>(null)
  const [touchStartY, setTouchStartY] = useState(0)
  const [touchStartX, setTouchStartX] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY)
      setTouchStartX(e.touches[0].clientX)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return

      const touchY = e.touches[0].clientY
      const touchX = e.touches[0].clientX
      const deltaY = touchY - touchStartY
      const deltaX = touchX - touchStartX

      // Only consider vertical swipes (ignore diagonal)
      if (Math.abs(deltaX) > Math.abs(deltaY) * 0.8) return

      // Swipe down anywhere to open control center
      if (!controlCenterOpen && deltaY > 50) {
        e.preventDefault()
        openControlCenter()
      }

      // Swipe up anywhere to close control center
      if (controlCenterOpen && deltaY < -50) {
        e.preventDefault()
        closeControlCenter()
      }
    }

    // Remove the direct click handler for testing as per the update request.

    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
    }
  }, [touchStartY, touchStartX, openControlCenter, closeControlCenter, controlCenterOpen])

  return (
    <div ref={containerRef} className="h-full w-full">
      {children}
    </div>
  )
}
