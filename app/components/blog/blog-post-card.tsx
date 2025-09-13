"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Post } from "@/app/redux/api/wordpress"

interface BlogPostCardProps {
  post: Post
  index?: number
}

export function BlogPostCard({ post, index = 0 }: BlogPostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "").substring(0, 150) + "..."
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(" ").length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} min read`
  }

  return (
    <motion.article
      className="group glass-effect rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative overflow-hidden">
          <img
            src={
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              "/placeholder.svg?height=200&width=400&query=blog post featured image"
            }
            alt={post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30">
              Blog
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {post.title.rendered}
          </h3>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">{stripHtml(post.excerpt.rendered)}</p>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                {formatDate(post.date)}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                {calculateReadTime(post.content.rendered)}
              </div>
            </div>
            <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
