"use client";
import React, { useEffect, useState } from "react";
import { profileApi, portfolioApi } from "@/lib/api";
import type { Profile, Portfolio } from "@/lib/types";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Code2, Laptop, Palette, Terminal, Database } from "lucide-react";

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
    if (lower.includes('react') || lower.includes('next') || lower.includes('vue') || lower.includes('tailwind') || lower.includes('css') || lower.includes('html')) return <Laptop className="w-5 h-5 text-[#6b8af6]" />;
    if (lower.includes('node') || lower.includes('express') || lower.includes('sql') || lower.includes('database') || lower.includes('mongo') || lower.includes('postgre') || lower.includes('supa')) return <Database className="w-5 h-5 text-[#6b8af6]" />;
    if (lower.includes('git') || lower.includes('docker') || lower.includes('linux')) return <Terminal className="w-5 h-5 text-[#6b8af6]" />;
    if (lower.includes('figma') || lower.includes('ui') || lower.includes('ux') || lower.includes('design')) return <Palette className="w-5 h-5 text-[#6b8af6]" />;
    return <Code2 className="w-5 h-5 text-[#6b8af6]" />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />

        {/* Hero / Header */}
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="flex flex-col md:flex-row items-center gap-10 md:gap-16"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Photo */}
              <motion.div variants={itemVariants} className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-[240px] h-[320px] md:w-[280px] md:h-[380px] rounded-2xl overflow-hidden shadow-xl shadow-[#6b8af6]/10 border border-slate-200 group">
                  {isLoading ? (
                    <div className="w-full h-full bg-slate-200 animate-pulse" />
                  ) : (
                    <Image
                      src={profile?.photo_url || "/images/1688908285904.JPG"}
                      alt={profile?.name || "Muhammad Ade Dzakwan"}
                      fill
                      sizes="280px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
              </motion.div>

              {/* Bio */}
              <motion.div variants={itemVariants} className="w-full md:w-2/3 text-center md:text-left">
                <h1 className="dm_serif_text text-4xl md:text-6xl text-slate-800 mb-1">
                  Tentang Saya
                </h1>
                <div className="w-16 h-1 bg-[#6b8af6] rounded-full mb-5 mx-auto md:mx-0" />
                <p className="text-[#6b8af6] text-lg font-semibold mb-5">
                  {profile?.tagline || "Information Systems Student & Web Developer"}
                </p>
                <div className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                  {profile?.about_text ? (
                    <p>{profile.about_text}</p>
                  ) : (
                    <>
                      <p>Halo! Saya Muhammad Ade Dzakwan, atau biasa dipanggil Awan. Saya adalah mahasiswa Sistem Informasi di Institut Teknologi Sepuluh Nopember (ITS) Surabaya.</p>
                      <p>Saya memiliki ketertarikan yang besar dalam dunia pengembangan web (Web Development), pengembangan perangkat lunak (Software Engineering), dan eksplorasi teknologi modern seperti kecerdasan buatan (AI).</p>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="py-16 px-4 bg-white border-t border-slate-100">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="dm_serif_text text-3xl md:text-5xl text-slate-800">Keahlian & Fokus</h2>
              <div className="w-12 h-1 bg-[#6b8af6] mx-auto mt-3 rounded-full" />
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uniqueSkills.length > 0 ? (
                uniqueSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#6b8af6]/50 hover:shadow-lg hover:shadow-[#6b8af6]/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center justify-center text-center cursor-default"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (index % 10) * 0.07 }}
                  >
                    <div className="bg-[#6b8af6]/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      {getIconForSkill(skill)}
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-slate-700">{skill}</h3>
                  </motion.div>
                ))
              ) : (
                <p className="text-slate-400 text-center col-span-full">Belum ada keahlian yang ditambahkan dari portofolio.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
