"use client"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import type { RootState } from "@/app/redux/store"
import { setNavOpen } from "@/app/redux/slices/uiSlice"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const dispatch = useDispatch()
  const { navOpen } = useSelector((state: RootState) => state.ui)

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          className="text-xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Samir.
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="text-white/80 hover:text-white transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => dispatch(setNavOpen(!navOpen))}>
          {navOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {navOpen && (
        <motion.div
          className="md:hidden bg-black/95 backdrop-blur-sm border-t border-white/10"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-white/80 hover:text-white transition-colors"
                onClick={() => dispatch(setNavOpen(false))}
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  )
}
