"use client"

import { useSelector } from "react-redux"
import { useEffect } from "react"
import type { RootState } from "@/app/redux/store"
import { Navigation } from "./navigation"
import { ScrollProvider } from "../animations/scroll-provider"
import { SciFiBackground } from "../effects/sci-fi-background"
import { ThemeControls } from "../ui/theme-controls"
import { HeroSection } from "../sections/hero-section"
import { AboutSection } from "../sections/about-section"
import { SkillsSection } from "../sections/skills-section"
import { ProjectsSection } from "../sections/projects-section"
import { ResumeSection } from "../sections/resume-section"
import { BlogSection } from "../sections/blog-section"
import { ContactSection } from "../sections/contact-section"
import { ScrollProgress } from "../ui/scroll-progress"

export default function MainLayout() {
  const { introPlayed, fxLevel } = useSelector((state: RootState) => state.ui)

  useEffect(() => {
    document.body.className = `font-sans fx-${fxLevel}`
  }, [fxLevel])

  if (!introPlayed) return null

  return (
    <ScrollProvider>
      <div className="min-h-screen bg-black text-white relative">
        <SciFiBackground />
        <Navigation />
        <ScrollProgress />
        <ThemeControls />
        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ResumeSection />
          <BlogSection />
          <ContactSection />
        </main>
      </div>
    </ScrollProvider>
  )
}
