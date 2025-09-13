"use client"

import { useEffect, useRef } from "react"

interface StarfieldProps {
  count?: number
  speed?: number
}

export function Starfield({ count = 100, speed = 1 }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create stars
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1000,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
    }))

    let animationId: number

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        // Move star towards viewer
        star.z -= speed * 2

        // Reset star when it gets too close
        if (star.z <= 0) {
          star.z = 1000
          star.x = Math.random() * canvas.width
          star.y = Math.random() * canvas.height
        }

        // Calculate 3D position
        const x = (star.x - canvas.width / 2) * (1000 / star.z) + canvas.width / 2
        const y = (star.y - canvas.height / 2) * (1000 / star.z) + canvas.height / 2
        const size = star.size * (1000 / star.z)
        const opacity = (star.opacity * (1000 / star.z)) / 1000

        // Draw star
        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 255, 255, ${Math.min(opacity, 1)})`
          ctx.fill()

          // Add glow effect for larger stars
          if (size > 1) {
            ctx.beginPath()
            ctx.arc(x, y, size * 2, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(0, 255, 255, ${Math.min(opacity * 0.3, 0.3)})`
            ctx.fill()
          }
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [count, speed])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ background: "transparent" }} />
  )
}
