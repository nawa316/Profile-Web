"use client";
import React, { useEffect, useState } from "react";
import { profileApi, portfolioApi, skillApi, certificationApi } from "@/lib/api";
import type { Profile, Portfolio, Skill, Certification } from "@/lib/types";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import { Code2, Laptop, Palette, Terminal, Database, Award, ExternalLink, FileText, Calendar } from "lucide-react";
import { useLanguage, Translate } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profData, portData, skillsData, certsData] = await Promise.all([
          profileApi.get(),
          portfolioApi.getAll(),
          skillApi.getAll(),
          certificationApi.getAll()
        ]);
        if (profData) setProfile(profData);
        if (portData) setPortfolios(portData);
        if (skillsData) setSkills(skillsData);
        if (certsData) setCertifications(certsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);


  const getIconForSkill = (skill: string) => {
    const lower = skill.toLowerCase();
    if (lower.includes('react') || lower.includes('next') || lower.includes('vue') || lower.includes('tailwind') || lower.includes('css') || lower.includes('html')) return <Laptop className="w-5 h-5 text-[#6b8af6]" />;
    if (lower.includes('node') || lower.includes('express') || lower.includes('sql') || lower.includes('database') || lower.includes('mongo') || lower.includes('postgre') || lower.includes('supa')) return <Database className="w-5 h-5 text-[#6b8af6]" />;
    if (lower.includes('git') || lower.includes('docker') || lower.includes('linux')) return <Terminal className="w-5 h-5 text-[#6b8af6]" />;
    if (lower.includes('figma') || lower.includes('ui') || lower.includes('ux') || lower.includes('design')) return <Palette className="w-5 h-5 text-[#6b8af6]" />;
    return <Code2 className="w-5 h-5 text-[#6b8af6]" />;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const isExpired = (expiryDate: string | null) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
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
              {/* ProfileCard (hanging ID card) */}
              <motion.div variants={itemVariants} className="w-full md:w-1/3 flex justify-center items-start pt-8">
                {isLoading ? (
                  <div className="w-[260px] h-[480px] bg-slate-200 animate-pulse rounded-2xl" />
                ) : (
                  <ProfileCard photoUrl={profile?.photo_url} name="Awan" />
                )}
              </motion.div>

              {/* Bio */}
              <motion.div variants={itemVariants} className="w-full md:w-2/3 text-center md:text-left">
                <h1 className="dm_serif_text text-4xl md:text-6xl text-slate-800 mb-1">
                  {t("section.about")}
                </h1>
                <div className="w-16 h-1 bg-[#6b8af6] rounded-full mb-5 mx-auto md:mx-0" />
                <p className="text-[#6b8af6] text-lg font-semibold mb-5">
                  {profile?.tagline ? <Translate text={profile.tagline} /> : t("hero.tagline")}
                </p>
                <div className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                  {profile?.about_text ? (
                    <p><Translate text={profile.about_text} /></p>
                  ) : (
                    <>
                      <p>{t("about.desc1")}</p>
                      <p>{t("about.desc2")}</p>
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
              <h2 className="dm_serif_text text-3xl md:text-5xl text-slate-800">{t("about.keahlian")}</h2>
              <div className="w-12 h-1 bg-[#6b8af6] mx-auto mt-3 rounded-full" />
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#6b8af6]/50 hover:shadow-lg hover:shadow-[#6b8af6]/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center justify-center text-center cursor-default animate-fade-in"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (index % 10) * 0.07 }}
                  >
                    <div className="bg-[#6b8af6]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-all duration-300 p-2 overflow-hidden">
                      {skill.image ? (
                        <img 
                          src={skill.image} 
                          alt={skill.name} 
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        getIconForSkill(skill.name)
                      )}
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-slate-700">{skill.name}</h3>
                    {skill.category && (
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mt-1">
                        {skill.category}
                      </span>
                    )}
                  </motion.div>
                ))
              ) : (
                <p className="text-slate-400 text-center col-span-full">{t("portfolio.notFound")}</p>
              )}
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        {certifications.length > 0 && (
          <div className="py-16 px-4 bg-slate-50 border-t border-slate-100">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="dm_serif_text text-3xl md:text-5xl text-slate-800">{t("about.sertifikasi")}</h2>
                <div className="w-12 h-1 bg-[#6b8af6] mx-auto mt-3 rounded-full" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    className="bg-white border border-slate-200 rounded-xl p-6 hover:border-[#6b8af6]/50 hover:shadow-lg hover:shadow-[#6b8af6]/10 hover:-translate-y-1 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (index % 6) * 0.08 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-[#6b8af6]/10 w-12 h-12 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300">
                        <Award className="w-6 h-6 text-[#6b8af6]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-800 text-base leading-tight mb-1">
                          <Translate text={cert.name} />
                        </h3>
                        <p className="text-sm text-[#6b8af6] font-medium mb-2">
                          <Translate text={cert.issuer} />
                        </p>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-2 flex-wrap">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(cert.date)}
                          </span>
                          {cert.expiry_date && (
                            <span className={`inline-flex items-center gap-1 ${isExpired(cert.expiry_date) ? 'text-red-500' : 'text-slate-500'}`}>
                              - {formatDate(cert.expiry_date)}
                              {isExpired(cert.expiry_date) && ' (Expired)'}
                            </span>
                          )}
                        </div>
                        {cert.description && (
                          <p className="text-sm text-slate-600 leading-relaxed mb-3">
                            <Translate text={cert.description} />
                          </p>
                        )}
                        <div className="flex items-center gap-3 flex-wrap">
                          {cert.credential_url && (
                            <a
                              href={cert.credential_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-[#6b8af6] hover:text-[#483D8B] font-medium transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" />
                              {t("about.viewCredential")}
                            </a>
                          )}
                          {cert.file_url && (
                            <a
                              href={cert.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-[#6b8af6] hover:text-[#483D8B] font-medium transition-colors"
                            >
                              <FileText className="w-3 h-3" />
                              {cert.file_url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? t("about.viewImage") : t("about.viewPdf")}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
