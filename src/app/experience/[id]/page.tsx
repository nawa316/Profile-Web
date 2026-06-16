"use client";
import React, { useEffect, useState, use } from "react";
import { experienceApi } from "@/lib/api";
import type { Experience } from "@/lib/types";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import { FaCalendar, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { formatTypeLabel } from "@/components/ExperienceCard";
import ImageModal from "@/components/ImageModal";

export default function ExperienceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [experience, setExperience] = useState<Experience | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const data = await experienceApi.getById(parseInt(unwrappedParams.id, 10));
        setExperience(data);
      } catch (error) {
        console.error("Failed to fetch experience:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExperience();
  }, [unwrappedParams.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#3c45b9] to-gray-900 flex items-center justify-center">
        <p className="text-white text-xl animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#3c45b9] to-gray-900 flex flex-col items-center justify-center">
        <p className="text-white text-2xl mb-6">Experience not found.</p>
        <Link href="/experience" className="px-6 py-3 bg-[#6b8af6] hover:bg-[#5a76e0] transition-colors text-white rounded-full font-medium">
          Back to Experience
        </Link>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long' });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "organization": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "work": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "volunteer": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-gradient-to-br from-[#1a1b2e] to-[#0f101a] text-white pt-24 pb-20">
        <Navbar />
        
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          {/* Back Button */}
          <Link href="/experience" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#6b8af6] transition-colors mb-8">
            <FaArrowLeft />
            <span className="font-medium">Back to Experience</span>
          </Link>

          {/* Header */}
          <header className="mb-12 bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              {/* Main Image */}
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-white p-4 flex items-center justify-center flex-shrink-0">
                {experience.image ? (
                  <div 
                    className="relative w-full h-full cursor-pointer group"
                    onClick={() => openModal(experience.image!)}
                  >
                    <Image
                      src={experience.image}
                      alt={experience.organization}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">Enlarge</span>
                    </div>
                  </div>
                ) : (
                  <span className="text-[#6b8af6] text-6xl font-bold">
                    {experience.organization.charAt(0)}
                  </span>
                )}
              </div>

              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-4 py-1.5 border rounded-full text-sm font-medium ${getTypeColor(experience.type)}`}>
                    {formatTypeLabel(experience.type)}
                  </span>
                  
                  <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                    <FaCalendar className="text-[#6b8af6]" />
                    {formatDate(experience.start_date)} - {experience.end_date ? formatDate(experience.end_date) : "Present"}
                  </span>
                  
                  {experience.location && (
                    <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                      <FaMapMarkerAlt className="text-[#6b8af6]" />
                      {experience.location}
                    </span>
                  )}
                </div>

                <h1 className="dm_serif_text text-4xl md:text-5xl text-white mb-2 leading-tight">
                  {experience.organization}
                </h1>
                
                <h2 className="text-2xl text-[#6b8af6] font-medium mb-6">
                  {experience.role}
                </h2>
                
                <p className="text-gray-300 text-lg leading-relaxed max-w-3xl whitespace-pre-wrap">
                  {experience.description}
                </p>
              </div>
            </div>
          </header>

          {/* Skills Section */}
          {experience.skills && experience.skills.length > 0 && (
            <div className="mb-12 bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl">
              <h3 className="text-2xl dm_serif_text text-white mb-6">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {experience.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-[#6b8af6]/20 text-[#6b8af6] rounded-xl font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Photo Gallery Section */}
          {experience.photos && experience.photos.length > 0 && (
            <div className="mb-12">
              <h3 className="text-3xl dm_serif_text text-white mb-8 border-b border-white/10 pb-4">
                Gallery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experience.photos.map((photoUrl, index) => (
                  <div 
                    key={index} 
                    className="relative h-64 rounded-2xl overflow-hidden group border border-white/10 hover:border-[#6b8af6]/50 transition-all duration-300 cursor-pointer"
                    onClick={() => openModal(photoUrl)}
                  >
                    <Image
                      src={photoUrl}
                      alt={`${experience.organization} photo ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-3 py-1.5 rounded-full text-sm font-medium">Click to enlarge</span>
                    </div>
                  </div>
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
        altText="Experience Photo"
      />
    </>
  );
}
