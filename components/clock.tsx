"use client"

import { useState, useEffect } from "react"
import { formatTime } from "@/lib/utils"

export function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-full flex flex-col items-center justify-center bg-black text-white p-6">
      <div className="relative w-48 h-48 rounded-full border-4 border-white flex items-center justify-center mb-8">
        <div className="absolute w-1 h-24 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-full origin-bottom transform rotate-[225deg]"></div>
        <div className="absolute w-0.5 h-20 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-full origin-bottom transform rotate-[45deg]"></div>
        <div
          className="absolute w-0.5 h-16 bg-red-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-full origin-bottom transform"
          style={{
            transform: `rotate(${time.getSeconds() * 6}deg)`,
          }}
        ></div>
        <div className="w-3 h-3 rounded-full bg-white"></div>
      </div>

      <div className="text-4xl font-light">{formatTime(time)}</div>
    </div>
  )
}
