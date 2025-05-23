import { Battery, Signal, Wifi } from "lucide-react"
import { formatTime } from "@/lib/utils"

interface StatusBarProps {
  time: Date
  dark?: boolean
}

export function StatusBar({ time, dark = false }: StatusBarProps) {
  return (
    <div
      className={`flex justify-between items-center px-6 pt-3 pb-1 text-sm font-medium select-none ${dark ? "text-white" : "text-black"}`}
    >
      <div>{formatTime(time, false)}</div>
      <div className="flex items-center gap-1.5">
        <Signal className="h-3.5 w-3.5" />
        <Wifi className="h-3.5 w-3.5" />
        <Battery className="h-4 w-4" />
      </div>
    </div>
  )
}
