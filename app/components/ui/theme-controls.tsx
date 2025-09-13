"use client"

import type React from "react"

import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, Zap, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import type { RootState } from "@/app/redux/store"
import { setFxLevel, type FxLevel } from "@/app/redux/slices/uiSlice"

export function ThemeControls() {
  const dispatch = useDispatch()
  const { fxLevel } = useSelector((state: RootState) => state.ui)
  const [isOpen, setIsOpen] = useState(false)

  const fxLevels: { level: FxLevel; label: string; icon: React.ReactNode; description: string }[] = [
    {
      level: "subtle",
      label: "Minimal",
      icon: <EyeOff size={16} />,
      description: "Reduced effects for better performance",
    },
    {
      level: "standard",
      label: "Standard",
      icon: <Eye size={16} />,
      description: "Balanced visual effects",
    },
    {
      level: "max",
      label: "Maximum",
      icon: <Zap size={16} />,
      description: "Full sci-fi experience",
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 glass-effect rounded-2xl p-4 border border-white/20 min-w-64"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Zap size={16} className="text-primary" />
              Visual Effects
            </h3>

            <div className="space-y-2">
              {fxLevels.map((fx) => (
                <motion.button
                  key={fx.level}
                  onClick={() => dispatch(setFxLevel(fx.level))}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                    fxLevel === fx.level
                      ? "bg-primary/20 border border-primary/30 text-primary"
                      : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`p-1 rounded ${fxLevel === fx.level ? "text-primary" : "text-gray-400"}`}>
                    {fx.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">{fx.label}</div>
                    <div className="text-xs opacity-70">{fx.description}</div>
                  </div>
                  {fxLevel === fx.level && (
                    <motion.div
                      className="w-2 h-2 bg-primary rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10">
              <p className="text-xs text-gray-400">
                Effects automatically reduce on mobile devices and for users with motion sensitivity preferences.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full glass-effect border border-white/20 flex items-center justify-center text-white hover:border-primary/30 transition-all duration-300 ${
          isOpen ? "bg-primary/20 text-primary" : ""
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
      >
        <Settings size={20} />
      </motion.button>
    </div>
  )
}
