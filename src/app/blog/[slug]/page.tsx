"use client";
import React, { useEffect, useState, use } from "react";
import { blogApi } from "@/lib/api";
import type { Blog } from "@/lib/types";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import { FaClock, FaUser, FaCalendar, FaTag, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogApi.getBySlug(unwrappedParams.slug);
        setBlog(data);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [unwrappedParams.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <p className="text-white text-xl animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center">
        <p className="text-white text-2xl mb-6">Article not found.</p>
        <Link href="/blog" className="px-6 py-3 bg-[#6b8af6] hover:bg-[#5a76e0] transition-colors text-white rounded-full font-medium">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-24 pb-20">
        <Navbar />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#6b8af6] transition-colors mb-8">
            <FaArrowLeft />
            <span className="font-medium">Back to Blog</span>
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-6">
              <span className="px-4 py-1.5 bg-[#6b8af6]/20 text-[#6b8af6] rounded-full font-medium">
                {blog.category}
              </span>
              <span className="flex items-center gap-1.5">
                <FaCalendar className="text-gray-500" />
                {new Date(blog.published_at).toLocaleDateString('id-ID', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <FaClock className="text-gray-500" />
                {blog.read_time} min read
              </span>
            </div>

            <h1 className="dm_serif_text text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4 border-b border-white/10 pb-8">
              <div className="w-12 h-12 rounded-full bg-[#6b8af6] flex items-center justify-center">
                <FaUser className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-200 font-medium text-lg">{blog.author}</p>
                <p className="text-gray-500 text-sm">Author</p>
              </div>
            </div>
          </header>

          {/* Markdown Content */}
          <article className="
            text-gray-300 text-lg leading-relaxed
            [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mt-10 [&>h1]:mb-4 [&>h1]:dm_serif_text
            [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:dm_serif_text
            [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:dm_serif_text
            [&>p]:mb-6
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2
            [&>blockquote]:border-l-4 [&>blockquote]:border-[#6b8af6] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-6 [&>blockquote]:text-gray-400
            [&>a]:text-[#6b8af6] [&>a]:underline hover:[&>a]:text-blue-400
            [&>pre]:bg-gray-800 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:mb-6
            [&>code]:bg-gray-800 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-[#6b8af6] [&>code]:text-sm
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </article>

          {/* Tags */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <h3 className="text-xl font-medium text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {(blog.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gray-800 hover:bg-gray-700 transition-colors text-gray-300 rounded-lg text-sm cursor-pointer border border-white/5"
                >
                  <FaTag className="text-xs text-[#6b8af6]" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
