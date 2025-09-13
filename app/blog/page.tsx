"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Search, Loader2, AlertCircle } from "lucide-react"
import { useGetPostsQuery } from "@/app/redux/api/wordpress"
import { BlogPostCard } from "@/app/components/blog/blog-post-card"

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const postsPerPage = 9

  const {
    data: posts,
    error,
    isLoading,
  } = useGetPostsQuery({
    per_page: postsPerPage,
    page: currentPage,
  })

  const filteredPosts =
    posts?.filter(
      (post) =>
        post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.rendered.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || []

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on modern web development
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-gray-300">Loading posts...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-center items-center py-20">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <span className="ml-2 text-gray-300">Failed to load posts. Please try again later.</span>
          </div>
        )}

        {/* Posts Grid */}
        {filteredPosts.length > 0 && (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredPosts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && !isLoading && !error && (
          <div className="text-center py-20">
            <p className="text-gray-300 text-lg">No posts found matching your search.</p>
          </div>
        )}

        {/* Pagination */}
        {posts && posts.length === postsPerPage && (
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-6 py-2 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-6 py-2 text-gray-300 flex items-center">Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-6 py-2 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-black transition-all duration-300"
            >
              Next
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
