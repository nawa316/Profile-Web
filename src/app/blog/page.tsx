"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { blogApi } from "@/lib/api";
import type { Blog } from "@/lib/types";
import BlogCard, { FeaturedBlogCard } from "@/components/BlogCard";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [blogData, setBlogData] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogApi.getAll();
        setBlogData(data || []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = ["All", ...Array.from(new Set(blogData.map(post => post.category)))];

  const filteredPosts = selectedCategory === "All"
    ? blogData
    : blogData.filter(post => post.category === selectedCategory);

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />

        {/* Header */}
        <div className="pt-28 pb-10 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              className="dm_serif_text text-4xl md:text-6xl text-slate-800 mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t("nav.blog")}
            </motion.h1>
            <div className="w-12 h-1 bg-[#6b8af6] rounded-full mx-auto mb-4" />
            <motion.p
              className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("blog.desc")}
            </motion.p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto px-4 mb-10">
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
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                  selectedCategory === category
                    ? "bg-[#6b8af6] text-white shadow-md shadow-[#6b8af6]/25"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-[#6b8af6]/50 hover:text-[#6b8af6]"
                }`}
              >
                {category === "All" ? t("filter.all") : t(category)}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="max-w-7xl mx-auto px-4 pb-20">
            <div className="h-64 bg-slate-200 rounded-3xl animate-pulse mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-72 bg-slate-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <p className="text-center text-slate-400 py-20 text-lg">{t("blog.notFound")}</p>
        ) : (
          <>
            {/* Featured Post */}
            <div className="max-w-7xl mx-auto px-4 mb-10">
              <FeaturedBlogCard post={filteredPosts[0]} />
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(1).map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
