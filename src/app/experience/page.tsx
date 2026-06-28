"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { experienceApi } from "@/lib/api";
import type { Experience } from "@/lib/types";
import ExperienceCard, { formatTypeLabel } from "@/components/ExperienceCard";
import Navbar from "@/components/Navbar";

export default function ExperiencePage() {
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
      <div className="min-h-screen bg-gradient-to-br from-[#3c45b9] via-[#1a1a2e] to-[#16213e]">
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
              My Experience
            </motion.h1>
            <motion.p 
              className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Perjalanan dan pengalaman organisasi serta kegiatan yang telah saya ikuti
            </motion.p>
          </div>
        </div>

        {/* Type Filter */}
        <div className="max-w-7xl mx-auto px-4 mb-12">
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
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedType === type
                    ? "bg-[#6b8af6] text-white shadow-lg shadow-[#6b8af6]/30"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {type === "All" ? "All" : formatTypeLabel(type)}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Experience Grid */}
        <div className="max-w-7xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperience.map((item, index) => (
              <ExperienceCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

