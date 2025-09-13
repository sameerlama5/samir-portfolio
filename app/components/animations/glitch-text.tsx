"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface GlitchTextProps {
  text: string
  className?: string
  glitchIntensity?: number
}

export function GlitchText({ text, className = "", glitchIntensity = 0.1 }: GlitchTextProps) {
  const [glitchedText, setGlitchedText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?~`"

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < glitchIntensity) {
        setIsGlitching(true)

        // Create glitched version
        const chars = text.split("")
        const glitched = chars
          .map((char) => {
            if (char === " ") return char
            return Math.random() < 0.3 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
          })
          .join("")

        setGlitchedText(glitched)

        // Restore original text after brief moment
        setTimeout(
          () => {
            setGlitchedText(text)
            setIsGlitching(false)
          },
          50 + Math.random() * 100,
        )
      }
    }, 100)

    return () => clearInterval(glitchInterval)
  }, [text, glitchIntensity])

  return (
    <motion.div
      className={`relative ${className}`}
      animate={
        isGlitching
          ? {
              x: [0, -2, 2, 0],
              textShadow: ["0 0 0 transparent", "2px 0 0 #ff0000, -2px 0 0 #00ffff", "0 0 0 transparent"],
            }
          : {}
      }
      transition={{ duration: 0.1 }}
    >
      <span className="relative z-10">{glitchedText}</span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 text-red-500 opacity-70" style={{ transform: "translate(-1px, 0)" }}>
            {glitchedText}
          </span>
          <span className="absolute top-0 left-0 text-cyan-500 opacity-70" style={{ transform: "translate(1px, 0)" }}>
            {glitchedText}
          </span>
        </>
      )}
    </motion.div>
  )
}
