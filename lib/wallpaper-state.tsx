"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useTheme } from "next-themes"

type WallpaperTheme = "yellow" | "purple" | "azure" | "pink"

type WallpaperState = {
  wallpaper: WallpaperTheme
  setWallpaper: (theme: WallpaperTheme) => void
  getWallpaperUrl: () => string
}

const WallpaperContext = createContext<WallpaperState | undefined>(undefined)

const wallpapers = {
  yellow: {
    light: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iOS18-Yellow-7P0ALlOC3U3E8oWPQGnTjI1T3hjHeK.webp",
    dark: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iOS18-Yellow-Dark-kcXZWygM44kkgPTfePqDuUFKg3tJve.webp",
  },
  purple: {
    light: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iOS18-Purple-kB13dHiBzPqiVTERkEPRH2DKitsdgd.webp",
    dark: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iOS18-Purple-Dark-dwaQjVqVXHSynFy9VfdyNkc2BlT6xI.webp",
  },
  azure: {
    light: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iOS18-Azure-9Ax4tYYD2NK3Y9BWyohSWE63jMX9eo.webp",
    dark: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iOS18-Azure-Dark-0LT7qgEXqo3Hvm5Z2ZVyl8hkoCBcnd.webp",
  },
  pink: {
    light: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iOS18-Pink-ZRgZ6xgYCAg8FVNWyzmwWH1CKRInFs.webp",
    dark: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iOS18-Pink-Dark-cV3JSRD3LsJA86KNdXSBDO3GivqzNJ.webp",
  },
}

export function WallpaperProvider({ children }: { children: ReactNode }) {
  const [wallpaper, setWallpaper] = useState<WallpaperTheme>("azure")
  const { theme } = useTheme()

  const getWallpaperUrl = () => {
    const isDark = theme === "dark"
    return wallpapers[wallpaper][isDark ? "dark" : "light"]
  }

  return (
    <WallpaperContext.Provider
      value={{
        wallpaper,
        setWallpaper,
        getWallpaperUrl,
      }}
    >
      {children}
    </WallpaperContext.Provider>
  )
}

export function useWallpaper() {
  const context = useContext(WallpaperContext)
  if (context === undefined) {
    throw new Error("useWallpaper must be used within a WallpaperProvider")
  }
  return context
}
