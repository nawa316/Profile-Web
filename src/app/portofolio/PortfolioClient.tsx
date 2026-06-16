"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Portfolio } from "@/lib/types";
import CustomCursor from "@/components/CustomCursor";
import PortfolioCard from "@/components/PortfolioCard";
import Navbar from "@/components/Navbar";

interface PortfolioClientProps {
  initialData: Portfolio[];
}

export default function PortfolioClient({ initialData }: PortfolioClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(initialData.map(item => item.category)))];

  const filteredPortfolio = selectedCategory === "All"
    ? initialData
    : initialData.filter(item => item.category === selectedCategory);

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
        {/* Navigation */}
        <Navbar />

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
    </>
  );
}
