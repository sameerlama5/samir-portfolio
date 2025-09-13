"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import type { RootState } from "@/app/redux/store"
import { setIntroPlayed } from "@/app/redux/slices/uiSlice"
import { Starfield } from "./starfield"
import { GlitchText } from "./glitch-text"
import { HologramGrid } from "./hologram-grid"

export function IntroAnimation() {
  const dispatch = useDispatch()
  const { introPlayed, fxLevel } = useSelector((state: RootState) => state.ui)
  const [phase, setPhase] = useState(0)
  const [showSkip, setShowSkip] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const progress = useMotionValue(0)
  const opacity = useTransform(progress, [0, 1], [1, 0])

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip to final phase for reduced motion
      setPhase(3)
      const timer = setTimeout(() => setShowSkip(true), 500)
      return () => clearTimeout(timer)
    }

    // Phase progression for full animation
    const timers = [
      setTimeout(() => setPhase(1), 1000), // Starfield appears
      setTimeout(() => setPhase(2), 2500), // Grid and text
      setTimeout(() => setPhase(3), 4000), // Final reveal
      setTimeout(() => setShowSkip(true), 1500), // Show skip early
    ]

    return () => timers.forEach(clearTimeout)
  }, [prefersReducedMotion])

  const handleComplete = () => {
    progress.set(1)
    setTimeout(() => dispatch(setIntroPlayed(true)), 1000)
  }

  const handleSkip = () => {
    dispatch(setIntroPlayed(true))
  }

  if (introPlayed) return null

  const shouldShowEffects = fxLevel !== "subtle" && !prefersReducedMotion

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black overflow-hidden"
        style={{ opacity }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        {shouldShowEffects && phase >= 1 && (
          <Starfield count={fxLevel === "max" ? 200 : 100} speed={fxLevel === "max" ? 2 : 1} />
        )}

        {shouldShowEffects && phase >= 2 && <HologramGrid opacity={0.3} />}

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center max-w-4xl px-4">
            {/* Phase 0-1: Initial fade in */}
            {phase >= 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: phase >= 1 ? 1 : 0, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="mb-8"
              >
                <div className="w-16 h-16 mx-auto mb-6 border-2 border-primary rounded-full flex items-center justify-center">
                  <motion.div
                    className="w-8 h-8 bg-primary rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            )}

            {/* Phase 2: Main title with glitch effect */}
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mb-6"
              >
                {shouldShowEffects ? (
                  <GlitchText text="INITIALIZING PORTFOLIO" className="text-4xl md:text-7xl font-bold text-white" />
                ) : (
                  <h1 className="text-4xl md:text-7xl font-bold text-white">INITIALIZING PORTFOLIO</h1>
                )}
              </motion.div>
            )}

            {/* Phase 2: Subtitle */}
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="mb-8"
              >
                <p className="text-lg md:text-xl text-primary font-mono">{"> "}LOADING FUTURE TECHNOLOGIES...</p>

                {/* Loading bar */}
                <div className="w-64 h-1 bg-white/20 mx-auto mt-4 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 1 }}
                  />
                </div>
              </motion.div>
            )}

            {/* Phase 3: Final reveal */}
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                onAnimationComplete={handleComplete}
              >
                <motion.p
                  className="text-accent font-mono text-sm md:text-base"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: 2,
                    ease: "easeInOut",
                  }}
                >
                  SYSTEM READY • PRESS ANY KEY TO CONTINUE
                </motion.p>
              </motion.div>
            )}
          </div>
        </div>

        {showSkip && (
          <motion.button
            onClick={handleSkip}
            className="absolute bottom-8 right-8 px-4 py-2 border border-white/30 text-white/70 hover:text-white hover:border-white/60 transition-all duration-300 font-mono text-sm backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            SKIP_INTRO.exe
          </motion.button>
        )}

        <motion.div
          className="absolute inset-0"
          onClick={phase >= 3 ? handleComplete : undefined}
          onKeyDown={(e) => {
            if (phase >= 3) {
              e.preventDefault()
              handleComplete()
            }
          }}
          tabIndex={phase >= 3 ? 0 : -1}
          style={{ cursor: phase >= 3 ? "pointer" : "default" }}
        />

        {shouldShowEffects && fxLevel === "max" && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-pulse" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
