"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/app/redux/api/wordpress";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "").substring(0, 150) + "...";
  };

  return (
    <motion.div
      className="group glass-effect rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="relative overflow-hidden">
          <img
            src={
              project._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "/placeholder.svg?height=200&width=400&query=project showcase image" ||
              "/placeholder.svg"
            }
            alt={
              project._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
              project.title.rendered
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
          {project.acf?.project_category && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full border border-accent/30">
                {project.acf.project_category}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {project.title.rendered}
          </h3>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
            {stripHtml(
              project.excerpt.rendered || project.content.rendered
            ).slice(0, 150)}
          </p>

          {project.acf?.tech_stack && (
            <div className="flex flex-wrap gap-2">
              {project.acf.tech_stack
                .slice(0, 4)
                .map((item: { tech: string }, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                  >
                    {item.tech}
                  </span>
                ))}
              {project.acf.tech_stack.length > 4 && (
                <span className="px-3 py-1 bg-gray-500/10 text-gray-400 text-xs rounded-full border border-gray-500/20">
                  +{project.acf.tech_stack.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
