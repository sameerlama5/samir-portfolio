"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Loader2, AlertCircle } from "lucide-react";
import { useGetProjectsQuery } from "@/app/redux/api/wordpress";
import Link from "next/link";

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

        {projects && projects.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((project, index) => (
              <motion.div
                key={project.id}
                className="group glass-effect rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        project._embedded?.["wp:featuredmedia"]?.[0]
                          ?.source_url ||
                        "/placeholder.svg?height=200&width=400&query=project showcase image" ||
                        "/placeholder.svg"
                      }
                      alt={
                        project._embedded?.["wp:featuredmedia"]?.[0]
                          ?.alt_text || project.title.rendered
                      }
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      {project.acf?.demo_link && (
                        <a
                          href={project.acf.demo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-black/50 rounded-lg hover:bg-primary/20 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} className="text-white" />
                        </a>
                      )}
                      {project.acf?.github_link && (
                        <a
                          href={project.acf.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-black/50 rounded-lg hover:bg-primary/20 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={16} className="text-white" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {project.title.rendered}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {stripHtml(
                        project.excerpt.rendered || project.content.rendered
                      ).slice(0, 150)}
                    </p>

                    {project.acf?.tech_stack && (
                      <div className="flex flex-wrap gap-2">
                        {project.acf.tech_stack.map(
                          (item: { tech: string }, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                            >
                              {item.tech}
                            </span>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

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
