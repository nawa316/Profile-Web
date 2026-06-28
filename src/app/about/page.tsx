"use client";
import React, { useEffect, useState } from "react";
import { profileApi, portfolioApi } from "@/lib/api";
import type { Profile, Portfolio } from "@/lib/types";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Code2, Laptop, Palette, Terminal, Database, Lightbulb } from "lucide-react";

export default function AboutPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profData, portData] = await Promise.all([
          profileApi.get(),
          portfolioApi.getAll()
        ]);
        if (profData) setProfile(profData);
        if (portData) setPortfolios(portData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const uniqueSkills = Array.from(new Set(portfolios.flatMap(p => p.technologies || [])));

  const getIconForSkill = (skill: string) => {
    const lower = skill.toLowerCase();
    if (lower.includes('react') || lower.includes('next') || lower.includes('vue') || lower.includes('tailwind') || lower.includes('css') || lower.includes('html') || lower.includes('front')) return <Laptop className="w-6 h-6 text-[#6b8af6]" />;
    if (lower.includes('node') || lower.includes('express') || lower.includes('sql') || lower.includes('database') || lower.includes('mongo') || lower.includes('postgre') || lower.includes('supa') || lower.includes('back')) return <Database className="w-6 h-6 text-[#6b8af6]" />;
    if (lower.includes('git') || lower.includes('docker') || lower.includes('linux')) return <Terminal className="w-6 h-6 text-[#6b8af6]" />;
    if (lower.includes('figma') || lower.includes('ui') || lower.includes('ux') || lower.includes('design')) return <Palette className="w-6 h-6 text-[#6b8af6]" />;
    return <Code2 className="w-6 h-6 text-[#6b8af6]" />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#3c45b9] via-[#1a1a2e] to-[#16213e] overflow-hidden">
        <Navbar />

        {/* Header Section */}
        <div className="pt-32 pb-12 px-4 relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#6b8af6] rounded-full blur-[120px] opacity-20"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#3c45b9] rounded-full blur-[120px] opacity-20"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div 
              className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Photo */}
              <motion.div variants={itemVariants} className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-[250px] h-[350px] md:w-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl shadow-[#6b8af6]/20 border-4 border-white/10 group">
                  {isLoading ? (
                    <div className="w-full h-full bg-white/10 animate-pulse" />
                  ) : (
                    <Image
                      src={profile?.photo_url || "/images/1688908285904.JPG"}
                      alt={profile?.name || "Muhammad Ade Dzakwan"}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent opacity-60"></div>
                </div>
              </motion.div>

              {/* Bio */}
              <motion.div variants={itemVariants} className="w-full md:w-2/3 text-center md:text-left">
                <h1 className="dm_serif_text text-4xl md:text-6xl text-white mb-2">
                  Tentang Saya
                </h1>
                <p className="text-[#6b8af6] text-xl font-medium mb-6">
                  {profile?.tagline || "Information Systems Student & Web Developer"}
                </p>
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {profile?.about_text ? (
                    <p>{profile.about_text}</p>
                  ) : (
                    <>
                      <p>
                        Halo! Saya Muhammad Ade Dzakwan, atau biasa dipanggil Awan. Saya adalah mahasiswa Sistem Informasi di Institut Teknologi Sepuluh Nopember (ITS) Surabaya.
                      </p>
                      <p>
                        Saya memiliki ketertarikan yang besar dalam dunia pengembangan web (Web Development), pengembangan perangkat lunak (Software Engineering), dan eksplorasi teknologi modern seperti kecerdasan buatan (AI).
                      </p>
                      <p>
                        Di luar aspek teknis, saya memiliki pengalaman luas bekerja dalam tim, menjadi pemimpin divisi, serta mengelola berbagai proyek acara. Saya dikenal teliti, komunikatif, dan selalu berusaha memberikan pendekatan dinamis serta solusi inovatif di setiap masalah pemrograman yang saya hadapi.
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="py-16 px-4 relative z-10 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="dm_serif_text text-3xl md:text-4xl text-white">Keahlian & Fokus</h2>
              <div className="w-24 h-1 bg-[#6b8af6] mx-auto mt-4 rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {uniqueSkills.length > 0 ? (
                uniqueSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors group flex flex-col items-center justify-center text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (index % 10) * 0.1 }}
                  >
                    <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {getIconForSkill(skill)}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{skill}</h3>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-400 text-center col-span-full">Belum ada keahlian yang ditambahkan dari portofolio.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
