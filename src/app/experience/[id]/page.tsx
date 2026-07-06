"use client";
import React, { useEffect, useState, use } from "react";
import { experienceApi } from "@/lib/api";
import type { Experience } from "@/lib/types";
import Navbar from "@/components/Navbar";
import { FaCalendar, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useLanguage, Translate } from "@/context/LanguageContext";
import ImageModal from "@/components/ImageModal";

export default function ExperienceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { t, language } = useLanguage();
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-[#6b8af6] border-t-transparent animate-spin" />
          <p className="text-slate-500 text-sm">{t("loading.data")}</p>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <p className="text-slate-700 text-2xl font-semibold">{t("experience.notFound")}</p>
        <Link href="/experience" className="px-6 py-3 bg-[#6b8af6] hover:bg-[#5271df] transition-colors text-white rounded-full font-medium shadow-md shadow-[#6b8af6]/25">
          {t("btn.backToExperience") || t("Back to Experience")}
        </Link>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const locale = language === 'id' ? 'id-ID' : language === 'de' ? 'de-DE' : 'en-US';
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long' });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "organization": return "bg-blue-500/10 text-blue-600 border-blue-200/40";
      case "work": return "bg-green-500/10 text-green-600 border-green-200/40";
      case "volunteer": return "bg-purple-500/10 text-purple-600 border-purple-200/40";
      default: return "bg-gray-500/10 text-gray-600 border-gray-200/40";
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-20">
        <Navbar />
        
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          {/* Back Button */}
          <Link href="/experience" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#6b8af6] transition-colors mb-8 group">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">{t("Back to Experience")}</span>
          </Link>

          {/* Header */}
          <header className="mb-12 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              {/* Main Image */}
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-white border border-slate-200 p-4 flex items-center justify-center flex-shrink-0 shadow-inner">
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
                      <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">{t("Enlarge")}</span>
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
                    {t(experience.type)}
                  </span>
                  
                  <span className="flex items-center gap-1.5 text-slate-500 text-sm">
                    <FaCalendar className="text-[#6b8af6]" />
                    {formatDate(experience.start_date)} - {experience.end_date ? formatDate(experience.end_date) : t("Present")}
                  </span>
                  
                  {experience.location && (
                    <span className="flex items-center gap-1.5 text-slate-500 text-sm">
                      <FaMapMarkerAlt className="text-[#6b8af6]" />
                      <Translate text={experience.location} />
                    </span>
                  )}
                </div>

                <h1 className="dm_serif_text text-4xl md:text-5xl text-slate-800 mb-2 leading-tight">
                  <Translate text={experience.organization} />
                </h1>
                
                <h2 className="text-2xl text-[#6b8af6] font-medium mb-6">
                  <Translate text={experience.role} />
                </h2>
                
                <p className="text-slate-600 text-lg leading-relaxed max-w-3xl whitespace-pre-wrap">
                  <Translate text={experience.description} />
                </p>
              </div>
            </div>
          </header>

          {/* Skills Section */}
          {experience.skills && experience.skills.length > 0 && (
            <div className="mb-12 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <h3 className="text-2xl dm_serif_text text-slate-800 mb-6">{t("Skills & Technologies")}</h3>
              <div className="flex flex-wrap gap-3">
                {experience.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-[#6b8af6]/10 text-[#6b8af6] rounded-xl font-medium border border-[#6b8af6]/10"
                  >
                    {t(skill)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Photo Gallery Section */}
          {experience.photos && experience.photos.length > 0 && (
            <div className="mb-12">
              <h3 className="text-3xl dm_serif_text text-slate-800 mb-8 border-b border-slate-200 pb-4">
                {t("Gallery")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experience.photos.map((photoUrl, index) => (
                  <div 
                    key={index} 
                    className="relative h-64 rounded-2xl overflow-hidden group border border-slate-200 hover:border-[#6b8af6]/50 transition-all duration-300 cursor-pointer shadow-sm"
                    onClick={() => openModal(photoUrl)}
                  >
                    <Image
                      src={photoUrl}
                      alt={`${experience.organization} photo ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-3 py-1.5 rounded-full text-sm font-medium">{t("Click to enlarge")}</span>
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
