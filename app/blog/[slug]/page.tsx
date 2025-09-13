"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { useGetPostBySlugQuery } from "@/app/redux/api/wordpress"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { data: posts, error, isLoading } = useGetPostBySlugQuery(params.slug)
  const post = posts?.[0]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-300">Loading post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(" ").length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} min read`
  }

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
          <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Featured Image */}
        {post._embedded?.["wp:featuredmedia"]?.[0] && (
          <motion.div
            className="mb-8 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={post._embedded["wp:featuredmedia"][0].source_url || "/placeholder.svg"}
              alt={post._embedded["wp:featuredmedia"][0].alt_text || post.title.rendered}
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
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{post.title.rendered}</h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {calculateReadTime(post.content.rendered)}
            </div>
            <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          className="prose prose-invert prose-lg max-w-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>
    </div>
  )
}
