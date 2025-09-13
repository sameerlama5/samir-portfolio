"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { setCurrentSection, setScrollProgress } from "@/app/redux/slices/uiSlice"

interface ScrollProviderProps {
  children: React.ReactNode
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const dispatch = useDispatch()
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Smooth scrolling setup
    const lenis = async () => {
      const { default: Lenis } = await import("@studio-freight/lenis")

      const lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      })

      function raf(time: number) {
        lenisInstance.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      return lenisInstance
    }

    lenis()

    // Scroll progress tracking
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = scrollTop / docHeight
      dispatch(setScrollProgress(scrollPercent))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    // Section intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.id
            dispatch(setCurrentSection(sectionId))
          }
        })
      },
      {
        threshold: [0.1, 0.5, 0.9],
        rootMargin: "-20% 0px -20% 0px",
      },
    )

    // Observe all sections
    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => {
      observerRef.current?.observe(section)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observerRef.current?.disconnect()
    }
  }, [dispatch])

  return <>{children}</>
}
