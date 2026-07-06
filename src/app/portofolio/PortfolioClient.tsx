"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Portfolio, Experience, Profile } from "@/lib/types";
import PortfolioCard from "@/components/PortfolioCard";
import Navbar from "@/components/Navbar";
import DownloadPDFButton from "@/components/DownloadPDFButton";
import { useLanguage } from "@/context/LanguageContext";

interface PortfolioClientProps {
  initialData: Portfolio[];
  experienceData: Experience[];
  profileData: Profile | null;
}

export default function PortfolioClient({ initialData, experienceData, profileData }: PortfolioClientProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(initialData.map(item => item.category)))];

  const filteredPortfolio = selectedCategory === "All"
    ? initialData
    : initialData.filter(item => item.category === selectedCategory);

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
              {t("section.portfolio")}
            </motion.h1>
            <div className="w-12 h-1 bg-[#6b8af6] rounded-full mx-auto mb-4" />
            <motion.p
              className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("portfolio.desc")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center"
            >
              <DownloadPDFButton portfolioData={initialData} experienceData={experienceData} profileData={profileData} />
            </motion.div>
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

        {/* Portfolio Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-20">
          {filteredPortfolio.length === 0 ? (
            <p className="text-center text-slate-400 py-20 text-lg">{t("portfolio.notFound")}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPortfolio.map((item, index) => (
                <PortfolioCard key={item.id} item={item} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
