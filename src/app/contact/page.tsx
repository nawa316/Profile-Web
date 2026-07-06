"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import { Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5 text-[#6b8af6]" />,
      title: t("form.email"),
      value: "muhammadadedzakwan@gmail.com",
      link: "mailto:muhammadadedzakwan@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5 text-[#6b8af6]" />,
      title: t("Phone / WhatsApp"),
      value: "+62 895-1360-1357",
      link: "https://wa.me/6289513601357",
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#6b8af6]" />,
      title: t("Location"),
      value: t("Surabaya, Jawa Timur, Indonesia"),
      link: null,
    },
    {
      icon: <Github className="w-5 h-5 text-[#6b8af6]" />,
      title: "GitHub",
      value: "github.com/nawa316",
      link: "https://github.com/nawa316",
    },
    {
      icon: <Linkedin className="w-5 h-5 text-[#6b8af6]" />,
      title: "LinkedIn",
      value: "muhammad-ade-dzakwan",
      link: "https://www.linkedin.com/in/muhammad-ade-dzakwan/",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />

        {/* Header */}
        <div className="pt-28 pb-10 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1
              className="dm_serif_text text-4xl md:text-6xl text-slate-800 mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t("contact.getInTouch")}
            </motion.h1>
            <div className="w-12 h-1 bg-[#6b8af6] rounded-full mx-auto mb-4" />
            <motion.p
              className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("contact.desc")}
            </motion.p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 pb-24">
          <motion.div
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Contact Info Cards */}
            <motion.div
              variants={itemVariants}
              className="w-full lg:w-2/5 flex flex-col gap-4"
            >
              <h2 className="dm_serif_text text-2xl text-slate-800 mb-2">{t("contact.info")}</h2>
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4 hover:border-[#6b8af6]/40 hover:shadow-md hover:shadow-[#6b8af6]/10 hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className="bg-[#6b8af6]/10 p-3 rounded-xl shrink-0 group-hover:bg-[#6b8af6]/20 transition-colors">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{info.title}</p>
                    {info.link ? (
                      <a
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-700 hover:text-[#6b8af6] transition-colors break-all text-sm font-medium"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-slate-700 text-sm font-medium">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="w-full lg:w-3/5 bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10"
            >
              <h2 className="dm_serif_text text-3xl text-slate-800 mb-1">{t("contact.send")}</h2>
              <div className="w-10 h-1 bg-[#6b8af6] rounded-full mb-6" />
              <Contact />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
