import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Experience } from "@/lib/types";
import { FaCalendar, FaMapMarkerAlt } from "react-icons/fa";

const MAX_VISIBLE_SKILLS = 4;

export const formatTypeLabel = (type: string) => {
  switch (type) {
    case "organization": return "Organization";
    case "work": return "Work";
    case "volunteer": return "Volunteer";
    default: return type;
  }
};

export default function ExperienceCard({ item, index }: { item: Experience; index: number }) {
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

  return (
    <Link href={`/experience/${item.id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#6b8af6]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#6b8af6]/10 h-full flex flex-col"
      >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-[#6b8af6] to-[#3c45b9] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
        <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl p-2 group-hover:scale-110 transition-transform duration-300">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.organization}
              fill
              className="object-contain p-2"
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center text-[#6b8af6] font-bold text-2xl">
              {item.organization.charAt(0)}
            </div>
          )}
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
            {formatDate(item.start_date)} - {item.end_date ? formatDate(item.end_date) : "Present"}
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
          {(item.skills || []).slice(0, MAX_VISIBLE_SKILLS).map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-[#6b8af6]/20 text-[#6b8af6] rounded text-xs"
            >
              {skill}
            </span>
          ))}
          {(item.skills || []).length > MAX_VISIBLE_SKILLS && (
            <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs">
              +{(item.skills || []).length - MAX_VISIBLE_SKILLS} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
    </Link>
  );
}
