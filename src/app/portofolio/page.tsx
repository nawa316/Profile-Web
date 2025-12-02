"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { portfolioData, PortfolioItem } from "@/app/data/portfolioData";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";

const MAX_VISIBLE_TECHNOLOGIES = 4;

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const categories = ["All", ...Array.from(new Set(portfolioData.map(item => item.category)))];
  
  const filteredPortfolio = selectedCategory === "All" 
    ? portfolioData 
    : portfolioData.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#6b8af6]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors">
              <FaArrowLeft />
              <span className="dm_serif_text text-xl">Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/blog" className="text-white hover:text-gray-200 transition-colors dm_serif_text">
                Blog
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
            My Portfolio
          </motion.h1>
          <motion.p 
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Kumpulan proyek dan karya yang telah saya kerjakan
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

      {/* Portfolio Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPortfolio.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#6b8af6]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#6b8af6]/10"
    >
      {/* Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-[#6b8af6] to-[#3c45b9] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
        <span className="text-white text-6xl font-bold opacity-30 group-hover:scale-110 transition-transform duration-300">
          {item.title.charAt(0)}
        </span>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="dm_serif_text text-xl text-white mb-2 group-hover:text-[#6b8af6] transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {item.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.technologies.slice(0, MAX_VISIBLE_TECHNOLOGIES).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-[#6b8af6]/20 text-[#6b8af6] rounded text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-white/10">
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <FaGithub />
              <span>Code</span>
            </a>
          )}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-[#6b8af6] transition-colors text-sm"
            >
              <FaExternalLinkAlt />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
