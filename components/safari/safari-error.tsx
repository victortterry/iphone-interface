"use client"

import { RefreshCw } from "lucide-react"

interface SafariErrorProps {
  url: string
  onRetry: () => void
}

export function SafariError({ url, onRetry }: SafariErrorProps) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-white">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <RefreshCw className="h-8 w-8 text-gray-400" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Cannot Open Page</h2>
      <p className="text-gray-500 text-center mb-4">Safari cannot open the page because the server cannot be found.</p>
      <p className="text-sm text-gray-400 text-center mb-6 max-w-xs">{url}</p>
      <button onClick={onRetry} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Try Again
      </button>
    </div>
  )
}
