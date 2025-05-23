"use client"
import { Widget } from "./widget"

export function Calendar() {
  const today = new Date()
  const dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

  const content = (
    <div className="flex flex-col text-white">
      <div className="text-red-400 font-medium">{dayNames[today.getDay()]}</div>
      <div className="text-6xl font-light my-1">{today.getDate()}</div>
      <div className="flex items-center gap-2 text-sm mb-1">
        <span>🔒</span>
        <span>2 birthdays</span>
      </div>
      <div className="text-red-400">Portfolio work session</div>
      <div className="text-sm">10 - 10:30AM</div>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <button className="text-sm text-gray-400 hover:text-gray-200">Previous</button>
          <button className="text-sm text-gray-400 hover:text-gray-200">Next</button>
        </div>
      </div>
    </div>
  )

  return <Widget title="Calendar" content={content} className="bg-[#1c1c1e]" />
}
