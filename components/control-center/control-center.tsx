"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useAppState } from "@/lib/app-state"
import { useEffect, useState } from "react"
import { useMusicStore } from "@/lib/music-state"
import { ConnectivityModule } from "./modules/connectivity-module"
import { MusicModule } from "./modules/music-module"
import { ScreenModule } from "./modules/screen-module"
import { SliderModule } from "./modules/slider-module"
import { FocusModule } from "./modules/focus-module"
import { UtilityModule } from "./modules/utility-module"
import { StatusBar } from "../status-bar"

export function ControlCenter() {
  const { controlCenterOpen, closeControlCenter } = useAppState()
  const { currentSong } = useMusicStore()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {controlCenterOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/20"
            onClick={closeControlCenter}
          />

          {/* Control Center Panel */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 overflow-auto"
            style={{
              background: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="min-h-full w-full p-4 pt-0">
              <StatusBar time={time} dark />

              <div className="grid grid-cols-2 gap-3 mt-2">
                {/* Connectivity Module */}
                <ConnectivityModule />

                {/* Music Module */}
                {currentSong ? (
                  <MusicModule />
                ) : (
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 aspect-square"></div>
                )}

                {/* Screen Mirroring & Rotation Lock */}
                <div className="grid grid-cols-2 gap-3">
                  <ScreenModule icon="lock" label="Rotation" />
                  <ScreenModule icon="screen" label="Screen Mirror" />
                </div>

                {/* Brightness & Volume Sliders */}
                <div className="grid grid-cols-1 gap-3">
                  <SliderModule type="brightness" />
                  <SliderModule type="volume" />
                </div>

                {/* Focus Mode */}
                <FocusModule />

                {/* Utilities */}
                <div className="grid grid-cols-2 gap-3">
                  <UtilityModule icon="flashlight" />
                  <UtilityModule icon="timer" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <UtilityModule icon="calculator" />
                  <UtilityModule icon="camera" />
                </div>

                {/* QR Code Scanner */}
                <div className="col-span-1">
                  <UtilityModule icon="qrcode" />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
