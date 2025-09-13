"use client"

import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import type { RootState } from "@/app/redux/store"

export function ScrollProgress() {
  const { scrollProgress } = useSelector((state: RootState) => state.ui)

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-50 origin-left"
      style={{ scaleX: scrollProgress }}
      initial={{ scaleX: 0 }}
    />
  )
}
