"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ImageIcon } from "lucide-react"
import { useWallpaper } from "@/lib/wallpaper-state"

export function WallpaperSwitcher() {
  const { wallpaper, setWallpaper } = useWallpaper()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <ImageIcon className="h-5 w-5" />
          <span className="sr-only">Toggle wallpaper</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setWallpaper("yellow")} className="cursor-pointer">
          Yellow
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setWallpaper("purple")} className="cursor-pointer">
          Purple
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setWallpaper("azure")} className="cursor-pointer">
          Azure
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setWallpaper("pink")} className="cursor-pointer">
          Pink
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
