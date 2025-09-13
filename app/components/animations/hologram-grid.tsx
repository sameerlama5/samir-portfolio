"use client"

import { motion } from "framer-motion"

interface HologramGridProps {
  opacity?: number
}

export function HologramGrid({ opacity = 0.2 }: HologramGridProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Animated grid lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, ${opacity}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, ${opacity}) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Scanning lines */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent h-32"
        animate={{
          y: ["-100%", "100vh"],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary opacity-60" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary opacity-60" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary opacity-60" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary opacity-60" />

      {/* Center crosshair */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="w-8 h-0.5 bg-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <div className="w-0.5 h-8 bg-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <div className="w-16 h-16 border border-primary rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    </div>
  )
}
