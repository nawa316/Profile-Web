"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { experienceData, ExperienceItem } from "@/app/data/experienceData";
import { FaArrowLeft, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import CustomCursor from "@/app/components/CustomCursor";

const MAX_VISIBLE_SKILLS = 4;

export default function ExperiencePage() {
  const [selectedType, setSelectedType] = useState<string>("All");
  
  const types = ["All", ...Array.from(new Set(experienceData.map(item => item.type)))];
  
  const filteredExperience = selectedType === "All" 
    ? experienceData 
    : experienceData.filter(item => item.type === selectedType);

  const formatTypeLabel = (type: string) => {
    switch (type) {
      case "organization": return "Organization";
      case "work": return "Work";
      case "volunteer": return "Volunteer";
      default: return type;
    }
  };

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-gradient-to-br from-[#3c45b9] via-[#1a1a2e] to-[#16213e]">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#6b8af6]/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors">
                <FaArrowLeft />
                <span className="dm_serif_text text-xl">Back to Home</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/portofolio" className="text-white hover:text-gray-200 transition-colors dm_serif_text">
                  Portfolio
                </Link>
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

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'short' });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "organization": return "bg-blue-500/20 text-blue-300";
      case "work": return "bg-green-500/20 text-green-300";
      case "volunteer": return "bg-purple-500/20 text-purple-300";
      default: return "bg-gray-500/20 text-gray-300";
    }
  };

  const formatTypeLabel = (type: string) => {
    switch (type) {
      case "organization": return "Organization";
      case "work": return "Work";
      case "volunteer": return "Volunteer";
      default: return type;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#6b8af6]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#6b8af6]/10"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-[#6b8af6] to-[#3c45b9] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
        <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl p-2 group-hover:scale-110 transition-transform duration-300">
          <Image
            src={item.image}
            alt={item.organization}
            fill
            className="object-contain p-2"
          />
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 backdrop-blur-sm rounded-full text-sm ${getTypeColor(item.type)}`}>
            {formatTypeLabel(item.type)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="dm_serif_text text-xl text-white mb-1 group-hover:text-[#6b8af6] transition-colors">
          {item.organization}
        </h3>
        <p className="text-[#6b8af6] font-medium mb-3">
          {item.role}
        </p>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {item.description}
        </p>

        {/* Date & Location */}
        <div className="flex flex-wrap gap-3 text-gray-500 text-xs mb-4">
          <span className="flex items-center gap-1">
            <FaCalendar className="text-[#6b8af6]" />
            {formatDate(item.startDate)} - {item.endDate ? formatDate(item.endDate) : "Present"}
          </span>
          {item.location && (
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-[#6b8af6]" />
              {item.location}
            </span>
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
          {item.skills.slice(0, MAX_VISIBLE_SKILLS).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-[#6b8af6]/20 text-[#6b8af6] rounded text-xs"
            >
              {skill}
            </span>
          ))}
          {item.skills.length > MAX_VISIBLE_SKILLS && (
            <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs">
              +{item.skills.length - MAX_VISIBLE_SKILLS} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
