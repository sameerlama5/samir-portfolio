"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, Clock, ArrowRight, Loader2, AlertCircle } from "lucide-react"
import { useGetPostsQuery } from "@/app/redux/api/wordpress"
import Link from "next/link"

export function BlogSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const { data: posts, error, isLoading } = useGetPostsQuery({ per_page: 6 })

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
    <section id="blog" className="min-h-screen flex items-center py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Thoughts on technology, development, and the future of digital experiences
          </p>
        </motion.div>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-gray-300">Loading posts...</span>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center py-20">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <span className="ml-2 text-gray-300">Failed to load posts. Please try again later.</span>
          </div>
        )}

        {posts && posts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 6).map((post, index) => (
              <motion.article
                key={post.id}
                className="group glass-effect rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
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
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                      {post.title.rendered}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">{stripHtml(post.excerpt.rendered)}</p>

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
            ))}
          </div>
        )}

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/blog">
            <button className="px-8 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-black transition-all duration-300">
              View All Posts
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-5" />
    </section>
  )
}
