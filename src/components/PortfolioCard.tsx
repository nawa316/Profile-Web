import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Portfolio } from "@/lib/types";
import { FaGithub, FaExternalLinkAlt, FaInfoCircle } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const MAX_VISIBLE_TECHNOLOGIES = 4;

export default function PortfolioCard({ item, index }: { item: Portfolio; index: number }) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-200 hover:border-[#6b8af6]/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#6b8af6]/20 flex flex-col h-full hover:-translate-y-1"
    >
      {/* Image */}
      <Link href={`/portofolio/${item.id}`} className="block">
        <div className="relative h-48 bg-gradient-to-br from-[#6b8af6] to-[#3c45b9] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <span className="text-white text-6xl font-bold opacity-30 group-hover:scale-110 transition-transform duration-300">
              {item.title.charAt(0)}
            </span>
          )}
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
              {t(item.category)}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <Link href={`/portofolio/${item.id}`}>
          <h3 className="dm_serif_text text-xl text-slate-800 mb-2 hover:text-[#6b8af6] transition-colors">
            {t(item.title)}
          </h3>
        </Link>
        <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
          {t(item.description)}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(item.technologies || []).slice(0, MAX_VISIBLE_TECHNOLOGIES).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-[#6b8af6]/20 text-[#6b8af6] rounded text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100 mt-auto">
          <Link
            href={`/portofolio/${item.id}`}
            className="flex items-center gap-2 text-slate-500 hover:text-[#6b8af6] transition-colors text-sm"
          >
            <FaInfoCircle />
            <span>{t("Details")}</span>
          </Link>
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 hover:text-[#6b8af6] transition-colors text-sm"
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
              className="flex items-center gap-2 text-slate-500 hover:text-[#6b8af6] transition-colors text-sm"
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
