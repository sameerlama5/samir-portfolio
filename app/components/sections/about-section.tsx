"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="min-h-screen flex items-center py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              I'm a passionate developer who bridges the gap between cutting-edge technology and human-centered design.
              With expertise in modern web technologies, I create digital experiences that push the boundaries of what's
              possible.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              My journey spans full-stack development, AI integration, and creating immersive user interfaces that tell
              stories and solve real-world problems.
            </p>

            <div className="flex flex-wrap gap-4">
              {["Innovation", "Problem Solving", "User Experience", "Future Tech"].map((trait, index) => (
                <motion.span
                  key={trait}
                  className="px-4 py-2 border border-primary/30 rounded-lg text-primary font-mono text-sm glass-effect"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {trait}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 glass-effect">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 border-2 border-primary rounded-full flex items-center justify-center">
                    <motion.div
                      className="w-12 h-12 bg-primary rounded-full"
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
                  <p className="text-primary font-mono">DEVELOPER.EXE</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10" />
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </section>
  )
}
