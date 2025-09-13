"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const skillCategories = [
  {
    title: "Frontend",
    skills: ["HTML5","CSS3", "Bootstrap", "React", "Next.js", "JavaScript", "Tailwind CSS", "Framer Motion"],
    color: "from-primary to-primary/60",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "CMS"],
    color: "from-accent to-accent/60",
  },
 
  {
    title: "DevOps",
    skills: [ "Vercel", "GitHub Actions"],
    color: "from-purple-400 to-purple-600",
  },
]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="min-h-screen flex items-center py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A comprehensive toolkit for building the future of web applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="glass-effect rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} mb-4 flex items-center justify-center`}
              >
                <div className="w-6 h-6 bg-white rounded-sm" />
              </div>

              <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>

              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                  >
                    <span className="text-gray-300 text-sm">{skill}</span>
                    <motion.div
                      className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "4rem" } : {}}
                      transition={{ duration: 0.8, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${category.color}`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${80 + Math.random() * 20}%` } : {}}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.5 }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-5" />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </section>
  )
}
