"use client";
import React, { useState } from "react";
import type { Portfolio } from "@/lib/types";
import Navbar from "@/components/Navbar";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaTag } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import ImageModal from "@/components/ImageModal";

interface PortfolioDetailClientProps {
  portfolio: Portfolio;
}

export default function PortfolioDetailClient({ portfolio }: PortfolioDetailClientProps) {
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
      <div className="min-h-screen bg-gradient-to-br from-[#1a1b2e] to-[#0f101a] text-white pt-24 pb-20">
        <Navbar />
        
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          {/* Back Button */}
          <Link href="/portofolio" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#6b8af6] transition-colors mb-8">
            <FaArrowLeft />
            <span className="font-medium">Back to Portfolio</span>
          </Link>

          {/* Header */}
          <header className="mb-12 bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl">
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
                      <span className="text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">Click to enlarge</span>
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
                  <span className="px-4 py-1.5 border rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 border-blue-500/30 flex items-center gap-2">
                    <FaTag className="text-blue-400" />
                    {portfolio.category}
                  </span>
                </div>

                <h1 className="dm_serif_text text-4xl md:text-5xl text-white mb-6 leading-tight">
                  {portfolio.title}
                </h1>
                
                <p className="text-gray-300 text-lg leading-relaxed max-w-4xl whitespace-pre-wrap mb-8">
                  {portfolio.description}
                </p>

                {/* Links */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
                  {portfolio.github && (
                    <a
                      href={portfolio.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-white font-medium"
                    >
                      <FaGithub size={20} />
                      <span>View Source Code</span>
                    </a>
                  )}
                  {portfolio.link && (
                    <a
                      href={portfolio.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#6b8af6] hover:bg-[#5a76e0] transition-colors rounded-full text-white font-medium shadow-lg shadow-[#6b8af6]/20"
                    >
                      <FaExternalLinkAlt size={18} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Technologies Section */}
          {portfolio.technologies && portfolio.technologies.length > 0 && (
            <div className="mb-12 bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl">
              <h3 className="text-2xl dm_serif_text text-white mb-6">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {portfolio.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-[#6b8af6]/20 text-[#6b8af6] rounded-xl font-medium"
                  >
                    {tech}
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
