"use client"

import { Search, Mic, Grid } from "lucide-react"
import { useState } from "react"

export function GoogleWebsite() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="h-full w-full overflow-auto bg-white flex flex-col">
      <header className="p-4 flex justify-end items-center text-sm">
        <nav className="flex items-center space-x-4">
          <span className="cursor-pointer">Gmail</span>
          <span className="cursor-pointer">Images</span>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Grid className="h-5 w-5 text-gray-600" />
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Sign in</button>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-20">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <h1 className="text-6xl font-normal">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </h1>
          </div>

          <div className="relative mb-6">
            <div className="flex items-center border rounded-full px-4 py-2 hover:shadow-md focus-within:shadow-md">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                className="flex-1 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Mic className="h-5 w-5 text-blue-500 ml-2" />
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            <button className="bg-gray-100 px-4 py-2 text-sm rounded hover:shadow">Google Search</button>
            <button className="bg-gray-100 px-4 py-2 text-sm rounded hover:shadow">I'm Feeling Lucky</button>
          </div>

          <div className="mt-6 text-center text-sm">
            <p>
              Google offered in: <span className="text-blue-600 cursor-pointer">Español</span>
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 text-sm text-gray-600 p-4">
        <div className="border-b pb-4 mb-4">
          <p>United States</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex space-x-4 mb-2 md:mb-0">
            <span className="cursor-pointer">About</span>
            <span className="cursor-pointer">Advertising</span>
            <span className="cursor-pointer">Business</span>
            <span className="cursor-pointer">How Search works</span>
          </div>
          <div className="flex space-x-4">
            <span className="cursor-pointer">Privacy</span>
            <span className="cursor-pointer">Terms</span>
            <span className="cursor-pointer">Settings</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
