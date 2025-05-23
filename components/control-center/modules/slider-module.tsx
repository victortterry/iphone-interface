"use client"

import type React from "react"

import { useState } from "react"
import { Sun, Volume2 } from "lucide-react"

interface SliderModuleProps {
  type: "brightness" | "volume"
}

export function SliderModule({ type }: SliderModuleProps) {
  const [value, setValue] = useState(50)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number.parseInt(e.target.value))
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 flex items-center">
      <div className="mr-3">
        {type === "brightness" ? <Sun className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
      </div>

      <div className="flex-1">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleChange}
          className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, white ${value}%, rgba(255,255,255,0.2) ${value}%)`,
          }}
        />
      </div>
    </div>
  )
}
