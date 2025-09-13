"use client";

import { motion } from "framer-motion";
import { Calendar, ExternalLink, Github, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import { useGetProjectBySlugQuery } from "@/app/redux/api/wordpress";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const {
    data: projects,
    error,
    isLoading,
  } = useGetProjectBySlugQuery(params.slug);
  const project = projects?.[0];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-300">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Featured Image */}
        {project._embedded?.["wp:featuredmedia"]?.[0] && (
          <motion.div
            className="mb-8 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={
                project._embedded["wp:featuredmedia"][0].source_url ||
                "/placeholder.svg"
              }
              alt={
                project._embedded["wp:featuredmedia"][0].alt_text ||
                project.title.rendered
              }
              className="w-full h-64 md:h-96 object-cover"
            />
          </motion.div>
        )}

        {/* Header */}
        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {project.acf?.project_category && (
              <span className="px-3 py-1 bg-accent/20 text-accent text-sm rounded-full border border-accent/30">
                {project.acf.project_category}
              </span>
            )}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              {formatDate(project.date)}
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {project.title.rendered}
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.acf?.demo_link && (
              <a
                href={project.acf.demo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.acf?.github_link && (
              <a
                href={project.acf.github_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-black transition-all duration-300"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            )}
          </div>
        </motion.header>

        {/* Tech Stack */}
        {project.acf?.tech_stack && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.acf.tech_stack.map(
                (item: { tech: string }, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-lg border border-primary/20 font-medium"
                  >
                    {item.tech}
                  </span>
                )
              )}
            </div>
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          className="prose prose-invert prose-lg max-w-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          dangerouslySetInnerHTML={{ __html: project.content.rendered }}
        />
      </article>
    </div>
  );
}
