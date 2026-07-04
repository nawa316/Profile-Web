"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { experienceApi } from "@/lib/api";
import type { Experience } from "@/lib/types";
import ExperienceCard, { formatTypeLabel } from "@/components/ExperienceCard";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

export default function ExperiencePage() {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>("All");
  const [experienceData, setExperienceData] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const data = await experienceApi.getAll();
        setExperienceData(data || []);
      } catch (error) {
        console.error("Failed to fetch experience:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExperience();
  }, []);

  const types = ["All", ...Array.from(new Set(experienceData.map(item => item.type)))];

  const filteredExperience = selectedType === "All"
    ? experienceData
    : experienceData.filter(item => item.type === selectedType);

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
              {t("section.experience")}
            </motion.h1>
            <div className="w-12 h-1 bg-[#6b8af6] rounded-full mx-auto mb-4" />
            <motion.p
              className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("experience.desc")}
            </motion.p>
          </div>
        </div>

        {/* Type Filter */}
        <div className="max-w-7xl mx-auto px-4 mb-10">
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                  selectedType === type
                    ? "bg-[#6b8af6] text-white shadow-md shadow-[#6b8af6]/25"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-[#6b8af6]/50 hover:text-[#6b8af6]"
                }`}
              >
                {type === "All" ? t("filter.all") : formatTypeLabel(type)}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Experience Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-20">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-72 bg-slate-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filteredExperience.length === 0 ? (
            <p className="text-center text-slate-400 py-20 text-lg">{t("experience.notFound")}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExperience.map((item, index) => (
                <ExperienceCard key={item.id} item={item} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
