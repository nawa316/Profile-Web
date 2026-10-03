"use client";
import React, { useEffect, useState, use } from "react";
import { blogApi } from "@/lib/api";
import type { Blog } from "@/lib/types";
import Navbar from "@/components/Navbar";
import { FaClock, FaUser, FaCalendar, FaTag, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import ImageModal from "@/components/ImageModal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLanguage, useTranslate } from "@/context/LanguageContext";

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { t, language } = useLanguage();
  const unwrappedParams = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const translatedContent = useTranslate(blog?.content);
  const translatedTitle = useTranslate(blog?.title);
  const translatedCategory = useTranslate(blog?.category);

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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-[#6b8af6] border-t-transparent animate-spin" />
          <p className="text-slate-500 dark:text-white text-sm">{t("blog.loading")}</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <p className="text-slate-700 dark:text-white text-2xl font-semibold">{t("blog.notFound")}</p>
        <Link href="/blog" className="px-6 py-3 bg-[#6b8af6] hover:bg-[#5271df] transition-colors text-white rounded-full font-medium shadow-md shadow-[#6b8af6]/25">
          {t("btn.backToBlog")}
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:text-white pt-24 pb-20">
        <Navbar />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 dark:text-white hover:text-[#6b8af6] dark:hover:text-[#6b8af6] transition-colors mb-8 group">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">{t("btn.backToBlog")}</span>
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 text-slate-500 dark:text-white text-sm mb-6">
              <span className="px-4 py-1.5 bg-[#6b8af6]/10 text-[#6b8af6] rounded-full font-semibold">
                {translatedCategory}
              </span>
              <span className="flex items-center gap-1.5">
                <FaCalendar className="text-[#6b8af6]" />
                {new Date(blog.published_at).toLocaleDateString(language === 'id' ? 'id-ID' : language === 'de' ? 'de-DE' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <FaClock className="text-[#6b8af6]" />
                {blog.read_time} {t("min.read")}
              </span>
            </div>

            <h1 className="dm_serif_text text-4xl md:text-5xl lg:text-6xl text-slate-800 dark:text-white mb-8 leading-tight">
              {translatedTitle}
            </h1>

            <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-700 pb-8">
              <div className="w-12 h-12 rounded-full bg-[#6b8af6] flex items-center justify-center flex-shrink-0">
                <FaUser className="text-white text-xl" />
              </div>
              <div>
                <p className="text-slate-800 dark:text-white font-semibold text-base">{blog.author}</p>
                <p className="text-slate-500 dark:text-slate-200 text-sm">Author</p>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {blog.image && (
            <div 
              className="relative w-full h-64 sm:h-80 md:h-[450px] rounded-2xl md:rounded-3xl overflow-hidden mb-10 shadow-lg border border-slate-200 dark:border-slate-800 group cursor-pointer"
              onClick={() => openModal(blog.image!)}
            >
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm">
                  {t("Click to enlarge")}
                </span>
              </div>
            </div>
          )}

          {/* Markdown Content */}
          <article className="
            text-slate-700 dark:text-white text-lg leading-relaxed
            [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-slate-800 dark:[&>h1]:text-white [&>h1]:mt-10 [&>h1]:mb-4 [&>h1]:dm_serif_text
            [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-slate-800 dark:[&>h2]:text-white [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:dm_serif_text
            [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-slate-800 dark:[&>h3]:text-white [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:dm_serif_text
            [&>p]:mb-6 [&>p]:text-slate-600 dark:[&>p]:text-white
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>ul>li]:text-slate-600 dark:[&>ul>li]:text-white
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2 [&>ol>li]:text-slate-600 dark:[&>ol>li]:text-white
            [&>blockquote]:border-l-4 [&>blockquote]:border-[#6b8af6] [&>blockquote]:pl-5 [&>blockquote]:italic [&>blockquote]:my-6 [&>blockquote]:text-slate-500 dark:[&>blockquote]:text-white [&>blockquote]:bg-[#6b8af6]/5 [&>blockquote]:py-2 [&>blockquote]:rounded-r-lg
            [&>a]:text-[#6b8af6] [&>a]:underline hover:[&>a]:text-[#3c45b9] dark:hover:[&>a]:text-[#93c5fd]
            [&>pre]:bg-slate-800 dark:[&>pre]:bg-slate-900 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:mb-6 [&>pre]:text-sm [&>pre]:text-white
            [&>code]:bg-slate-100 dark:[&>code]:bg-slate-800 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-[#6b8af6] dark:[&>code]:text-[#93c5fd] [&>code]:text-sm [&>code]:border [&>code]:border-slate-200 dark:[&>code]:border-slate-700
            [&>img]:rounded-xl [&>img]:shadow-md [&>img]:my-6
            [&>hr]:border-slate-200 dark:[&>hr]:border-slate-700 [&>hr]:my-8
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {translatedContent}
            </ReactMarkdown>
          </article>

          {/* Tags */}
          {(blog.tags || []).length > 0 && (
            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-white mb-4">{t("blog.tags")}</h3>
              <div className="flex flex-wrap gap-2">
                {(blog.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-[#6b8af6]/5 border border-slate-200 dark:border-slate-700 hover:border-[#6b8af6]/40 transition-colors text-slate-600 dark:text-white rounded-lg text-sm cursor-default"
                  >
                    <FaTag className="text-xs text-[#6b8af6]" />
                    {t(tag)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Image Modal for full size view */}
        {selectedImage && (
          <ImageModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            imageUrl={selectedImage}
            altText={blog.title}
          />
        )}
      </div>
    </>
  );
}
