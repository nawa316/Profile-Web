"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogData, BlogPost } from "@/app/data/blogData";
import { FaArrowLeft, FaClock, FaUser, FaCalendar, FaTag } from "react-icons/fa";

const MAX_VISIBLE_TAGS = 3;

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const categories = ["All", ...Array.from(new Set(blogData.map(post => post.category)))];
  
  const filteredPosts = selectedCategory === "All" 
    ? blogData 
    : blogData.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-[#6b8af6] transition-colors">
              <FaArrowLeft />
              <span className="dm_serif_text text-xl">Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/portofolio" className="text-white hover:text-[#6b8af6] transition-colors dm_serif_text">
                Portfolio
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="dm_serif_text text-4xl md:text-6xl text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Blog
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Artikel dan tulisan seputar teknologi, programming, dan pengembangan diri
          </motion.p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <motion.div 
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#6b8af6] text-white shadow-lg shadow-[#6b8af6]/30"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <FeaturedBlogCard post={filteredPosts[0]} />
        </div>
      )}

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturedBlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="group relative bg-gradient-to-r from-[#6b8af6]/20 to-[#3c45b9]/20 rounded-3xl overflow-hidden border border-white/10 hover:border-[#6b8af6]/50 transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Placeholder */}
        <div className="md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-[#6b8af6] to-[#3c45b9] flex items-center justify-center relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <span className="text-white text-8xl font-bold opacity-30">
            {post.title.charAt(0)}
          </span>
          <div className="absolute top-4 left-4">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              Featured
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
            <span className="flex items-center gap-1">
              <FaCalendar className="text-[#6b8af6]" />
              {new Date(post.publishedAt).toLocaleDateString('id-ID', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <span className="flex items-center gap-1">
              <FaClock className="text-[#6b8af6]" />
              {post.readTime} min read
            </span>
          </div>

          <span className="inline-block px-3 py-1 bg-[#6b8af6]/20 text-[#6b8af6] rounded-full text-sm w-fit mb-4">
            {post.category}
          </span>

          <h2 className="dm_serif_text text-2xl md:text-3xl text-white mb-4 group-hover:text-[#6b8af6] transition-colors">
            {post.title}
          </h2>

          <p className="text-gray-400 mb-6 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#6b8af6] flex items-center justify-center">
                <FaUser className="text-white" />
              </div>
              <span className="text-gray-300">{post.author}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
      className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#6b8af6]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#6b8af6]/10"
    >
      {/* Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
        <span className="text-white text-6xl font-bold opacity-20 group-hover:scale-110 transition-transform duration-300">
          {post.title.charAt(0)}
        </span>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-gray-500 text-xs mb-3">
          <span className="flex items-center gap-1">
            <FaCalendar />
            {new Date(post.publishedAt).toLocaleDateString('id-ID', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
          <span className="flex items-center gap-1">
            <FaClock />
            {post.readTime} min
          </span>
        </div>

        <h3 className="dm_serif_text text-xl text-white mb-3 group-hover:text-[#6b8af6] transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, MAX_VISIBLE_TAGS).map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs"
            >
              <FaTag className="text-[10px]" />
              {tag}
            </span>
          ))}
        </div>

        {/* Author */}
        <div className="flex items-center gap-2 pt-4 border-t border-white/10">
          <div className="w-8 h-8 rounded-full bg-[#6b8af6]/20 flex items-center justify-center">
            <FaUser className="text-[#6b8af6] text-sm" />
          </div>
          <span className="text-gray-400 text-sm">{post.author}</span>
        </div>
      </div>
    </motion.article>
  );
}
