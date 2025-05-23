"use client"

import { useState } from "react"
import { LockIcon as LockRotate, Tv2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScreenModuleProps {
  icon: "lock" | "screen"
  label: string
}

export function ScreenModule({ icon, label }: ScreenModuleProps) {
  const [isActive, setIsActive] = useState(false)

  return (
    <button
      className={cn(
        "rounded-full flex flex-col items-center justify-center aspect-square transition-colors",
        isActive ? "bg-white/20" : "bg-white/5",
      )}
      onClick={() => setIsActive(!isActive)}
    >
      {icon === "lock" ? <LockRotate className="h-5 w-5 text-white" /> : <Tv2 className="h-5 w-5 text-white" />}
    </button>
  )
}
