import type { ReactNode } from "react"

interface WidgetProps {
  title: string
  content: ReactNode
  className?: string
}

export function Widget({ title, content, className = "" }: WidgetProps) {
  return (
    <div className="flex flex-col select-none">
      <div className={`rounded-2xl p-4 backdrop-blur-xl bg-black/10 ${className}`}>{content}</div>
      <div className="text-[13px] text-white/80 mt-1 text-center">{title}</div>
    </div>
  )
}
