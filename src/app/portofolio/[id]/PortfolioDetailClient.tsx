"use client";
import React, { useState } from "react";
import type { Portfolio } from "@/lib/types";
import Navbar from "@/components/Navbar";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaTag } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import ImageModal from "@/components/ImageModal";
import { useLanguage, Translate } from "@/context/LanguageContext";

interface PortfolioDetailClientProps {
  portfolio: Portfolio;
}

export default function PortfolioDetailClient({ portfolio }: PortfolioDetailClientProps) {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-20">
        <Navbar />
        
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          {/* Back Button */}
          <Link href="/portofolio" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#6b8af6] transition-colors mb-8 group">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">{t("Back to Portfolio") || "Back to Portfolio"}</span>
          </Link>

          {/* Header */}
          <header className="mb-12 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
            <div className="flex flex-col gap-8">
              {/* Main Image */}
              <div className="w-full h-64 md:h-96 rounded-2xl bg-gradient-to-br from-[#6b8af6] to-[#3c45b9] p-2 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                {portfolio.image ? (
                  <div 
                    className="relative w-full h-full cursor-pointer group rounded-xl overflow-hidden"
                    onClick={() => openModal(portfolio.image!)}
                  >
                    <Image
                      src={portfolio.image}
                      alt={portfolio.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">{t("Click to enlarge")}</span>
                    </div>
                  </div>
                ) : (
                  <span className="text-white text-8xl font-bold opacity-30">
                    {portfolio.title.charAt(0)}
                  </span>
                )}
              </div>

              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-4 py-1.5 border rounded-full text-sm font-medium bg-blue-500/10 text-blue-600 border-blue-200/40 flex items-center gap-2">
                    <FaTag className="text-blue-500" />
                    <Translate text={portfolio.category} />
                  </span>
                </div>

                <h1 className="dm_serif_text text-4xl md:text-5xl text-slate-800 mb-6 leading-tight">
                  <Translate text={portfolio.title} />
                </h1>
                
                <p className="text-slate-600 text-lg leading-relaxed max-w-4xl whitespace-pre-wrap mb-8">
                  <Translate text={portfolio.description} />
                </p>

                {/* Links */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200">
                  {portfolio.github && (
                    <a
                      href={portfolio.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 transition-colors rounded-full text-slate-700 font-medium border border-slate-200"
                    >
                      <FaGithub size={20} className="text-slate-600" />
                      <span>{t("View Source Code")}</span>
                    </a>
                  )}
                  {portfolio.link && (
                    <a
                      href={portfolio.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#6b8af6] hover:bg-[#5271df] transition-colors rounded-full text-white font-medium shadow-md shadow-[#6b8af6]/25"
                    >
                      <FaExternalLinkAlt size={18} />
                      <span>{t("Live Demo")}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Technologies Section */}
          {portfolio.technologies && portfolio.technologies.length > 0 && (
            <div className="mb-12 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <h3 className="text-2xl dm_serif_text text-slate-800 mb-6">{t("Technologies Used")}</h3>
              <div className="flex flex-wrap gap-3">
                {portfolio.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-[#6b8af6]/10 text-[#6b8af6] rounded-xl font-medium border border-[#6b8af6]/10"
                  >
                    {t(tech)}
                  </span>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      <ImageModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        imageUrl={selectedImage} 
        altText="Portfolio Photo"
      />
    </>
  );
}
