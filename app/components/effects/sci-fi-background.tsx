"use client"

import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import type { RootState } from "@/app/redux/store"

export function SciFiBackground() {
  const { fxLevel } = useSelector((state: RootState) => state.ui)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    if (fxLevel === "subtle") return

    const particleCount = fxLevel === "max" ? 50 : 25
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [fxLevel])

  if (fxLevel === "subtle") return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 grid-bg opacity-5"
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary/40 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Scanning lines (max FX only) */}
      {fxLevel === "max" && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-32"
            animate={{
              y: ["-100%", "100vh"],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent w-32"
            animate={{
              x: ["-100%", "100vw"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: 3,
            }}
          />
        </>
      )}

      {/* Corner UI elements */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-primary/30" />

      {/* Central HUD element */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="w-32 h-32 border border-primary/20 rounded-full relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-accent/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-primary/30 rounded-full" />
        </div>
      </motion.div>
    </div>
  )
}
