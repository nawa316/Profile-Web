import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Blog } from "@/lib/types";
import { FaClock, FaUser, FaCalendar, FaTag } from "react-icons/fa";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const MAX_VISIBLE_TAGS = 3;

export function FeaturedBlogCard({ post }: { post: Blog }) {
  const { t } = useLanguage();
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="group relative bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden border border-slate-200 hover:border-[#6b8af6]/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-[#6b8af6]/20 hover:-translate-y-1"
      >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-[#6b8af6] to-[#3c45b9] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <span className="text-white text-8xl font-bold opacity-30">
              {post.title.charAt(0)}
            </span>
          )}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              {t("blog.featured")}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex items-center gap-4 text-slate-500 text-sm mb-4">
            <span className="flex items-center gap-1">
              <FaCalendar className="text-[#6b8af6]" />
              {new Date(post.published_at).toLocaleDateString('id-ID', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
            <span className="flex items-center gap-1">
              <FaClock className="text-[#6b8af6]" />
              {post.read_time} min read
            </span>
          </div>

          <span className="inline-block px-3 py-1 bg-[#6b8af6]/20 text-[#6b8af6] rounded-full text-sm w-fit mb-4">
            {t(post.category)}
          </span>

          <h2 className="dm_serif_text text-2xl md:text-3xl text-slate-800 mb-4 group-hover:text-[#6b8af6] transition-colors">
            {t(post.title)}
          </h2>

          <p className="text-slate-600 mb-6 line-clamp-3">
            {t(post.excerpt)}
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#6b8af6] flex items-center justify-center">
                <FaUser className="text-white" />
              </div>
              <span className="text-slate-700">{post.author}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
    </Link>
  );
}

export default function BlogCard({ post, index }: { post: Blog; index: number }) {
  const { t } = useLanguage();
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
        className="group bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-200 hover:border-[#6b8af6]/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#6b8af6]/20 flex flex-col h-full hover:-translate-y-1"
      >
      {/* Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 z-10"></div>
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <span className="text-white text-6xl font-bold opacity-20 group-hover:scale-110 transition-transform duration-300">
            {post.title.charAt(0)}
          </span>
        )}
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
            {t(post.category)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-slate-500 text-xs mb-3">
          <span className="flex items-center gap-1">
            <FaCalendar />
            {new Date(post.published_at).toLocaleDateString('id-ID', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
          <span className="flex items-center gap-1">
            <FaClock />
            {post.read_time} min
          </span>
        </div>

        <h3 className="dm_serif_text text-xl text-slate-800 mb-3 group-hover:text-[#6b8af6] transition-colors line-clamp-2">
          {t(post.title)}
        </h3>

        <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">
          {t(post.excerpt)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(post.tags || []).slice(0, MAX_VISIBLE_TAGS).map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2 py-1 bg-slate-200 text-slate-600 rounded text-xs"
            >
              <FaTag className="text-[10px]" />
              {t(tag)}
            </span>
          ))}
        </div>

        {/* Author */}
        <div className="flex items-center gap-2 pt-4 border-t border-slate-100 mt-auto">
          <div className="w-8 h-8 rounded-full bg-[#6b8af6]/20 flex items-center justify-center">
            <FaUser className="text-[#6b8af6] text-sm" />
          </div>
          <span className="text-slate-600 text-sm">{post.author}</span>
        </div>
      </div>
    </motion.article>
    </Link>
  );
}
