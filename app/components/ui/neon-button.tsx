"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/redux/store"

interface NeonButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "accent"
  size?: "sm" | "md" | "lg"
  className?: string
  disabled?: boolean
}

export function NeonButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
}: NeonButtonProps) {
  const { fxLevel } = useSelector((state: RootState) => state.ui)

  const variants = {
    primary: "border-primary text-primary hover:bg-primary hover:text-black",
    secondary: "border-accent text-accent hover:bg-accent hover:text-black",
    accent: "border-green-400 text-green-400 hover:bg-green-400 hover:text-black",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  const glowClass = fxLevel !== "subtle" ? "neon-glow" : ""

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative border-2 font-semibold rounded-lg transition-all duration-300 
        ${variants[variant]} ${sizes[size]} ${glowClass} ${className}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        overflow-hidden
      `}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>

      {fxLevel === "max" && !disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.button>
  )
}
