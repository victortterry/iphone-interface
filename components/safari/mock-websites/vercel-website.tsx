"use client"

import { Menu, X, ArrowRight } from "lucide-react"
import { useState } from "react"

export function VercelWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="h-full w-full overflow-auto bg-white">
      {/* Navigation */}
      <header className="sticky top-0 bg-white border-b z-10 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg height="22" viewBox="0 0 74 64" fill="black">
              <path d="M37.5896 0L75.1792 65H0L37.5896 0Z"></path>
            </svg>
            <span className="ml-2 font-semibold">Vercel</span>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4 text-sm">
            <span className="cursor-pointer">Products</span>
            <span className="cursor-pointer">Solutions</span>
            <span className="cursor-pointer">Resources</span>
            <span className="cursor-pointer">Enterprise</span>
            <span className="cursor-pointer">Docs</span>
            <span className="cursor-pointer">Pricing</span>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-3">
              <span className="cursor-pointer">Products</span>
              <span className="cursor-pointer">Solutions</span>
              <span className="cursor-pointer">Resources</span>
              <span className="cursor-pointer">Enterprise</span>
              <span className="cursor-pointer">Docs</span>
              <span className="cursor-pointer">Pricing</span>
            </div>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="px-4 py-8 md:py-12 border-b">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-5xl font-bold mb-4">Introducing Fluid compute</h1>
          <p className="text-gray-600 mb-6">The power of servers in serverless form.</p>
          <button className="bg-black text-white px-6 py-2 rounded-full font-medium">Learn more</button>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-8 md:py-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">Your complete platform for the web.</h2>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm md:text-base">
            Vercel provides the developer tools and cloud infrastructure to build, scale, and secure a faster, more
            personalized web.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="bg-black text-white px-6 py-3 rounded-full font-medium flex items-center justify-center">
              <svg className="mr-2" width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 19.7778H22L12 2Z"></path>
              </svg>
              Start Deploying
            </button>
            <button className="bg-white text-black px-6 py-3 rounded-full font-medium border">Get a Demo</button>
          </div>
        </div>

        {/* Background gradient */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-red-500 to-teal-500"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-8 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-3xl font-bold mb-8 text-center">Trusted by the world's leading companies</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">Frontend Infrastructure</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Deploy frontend projects with a single command and preview changes instantly.
              </p>
              <a href="#" className="text-blue-600 font-medium flex items-center text-sm">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">Edge Network</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Deliver content and run code at the edge, closer to your users for better performance.
              </p>
              <a href="#" className="text-blue-600 font-medium flex items-center text-sm">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">Next.js Platform</h3>
              <p className="text-gray-600 mb-4 text-sm">
                The best place to deploy Next.js applications with zero configuration.
              </p>
              <a href="#" className="text-blue-600 font-medium flex items-center text-sm">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-6 md:py-8 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <svg height="20" viewBox="0 0 74 64" fill="white">
                <path d="M37.5896 0L75.1792 65H0L37.5896 0Z"></path>
              </svg>
            </div>
            <div className="text-sm">© {new Date().getFullYear()} Vercel Inc.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
