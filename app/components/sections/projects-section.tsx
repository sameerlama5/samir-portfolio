"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Loader2, AlertCircle } from "lucide-react";
import { useGetProjectsQuery } from "@/app/redux/api/wordpress";
import Link from "next/link";
import { ProjectCard } from "../projects/project-card"

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const {
    data: projects,
    error,
    isLoading,
  } = useGetProjectsQuery({ per_page: 6 });

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "").substring(0, 200) + "...";
  };

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Innovative solutions that push the boundaries of technology
          </p>
        </motion.div>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-gray-300">Loading projects...</span>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center py-20">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <span className="ml-2 text-gray-300">
              Failed to load projects. Please try again later.
            </span>
          </div>
        )}

      <ProjectCard>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/projects">
            <button className="px-8 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-black transition-all duration-300">
              View All Projects
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-5" />
    </section>
  );
}
