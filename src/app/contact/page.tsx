"use client";
import React from "react";
import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-[#6b8af6]" />,
      title: "Email",
      value: "muhammadadedzakwan@gmail.com",
      link: "mailto:muhammadadedzakwan@gmail.com",
    },
    {
      icon: <Phone className="w-6 h-6 text-[#6b8af6]" />,
      title: "Phone / WhatsApp",
      value: "+62 895-1360-1357",
      link: "https://wa.me/6289513601357",
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#6b8af6]" />,
      title: "Location",
      value: "Surabaya, Jawa Timur, Indonesia",
      link: null,
    },
  ];

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-gradient-to-br from-[#3c45b9] via-[#1a1a2e] to-[#16213e] flex flex-col items-center">
        <Navbar />

        {/* Header Content */}
        <div className="w-full pt-32 pb-12 px-4 relative flex-grow flex flex-col items-center justify-center">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-[10%] left-[-10%] w-[30%] h-[30%] bg-[#6b8af6] rounded-full blur-[120px] opacity-20"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#3c45b9] rounded-full blur-[120px] opacity-20"></div>
          </div>

          <div className="max-w-6xl w-full mx-auto relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="dm_serif_text text-4xl md:text-6xl text-white mb-4">
                Get in Touch
              </h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                Tertarik untuk berkolaborasi, berdiskusi, atau menawarkan peluang baru? Jangan ragu untuk menghubungi saya!
              </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start justify-center">
              {/* Contact Info */}
              <motion.div
                className="w-full lg:w-1/3 flex flex-col gap-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-start gap-4 hover:bg-white/10 transition-colors">
                    <div className="bg-white/10 p-3 rounded-xl shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">{info.title}</h3>
                      {info.link ? (
                        <a href={info.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#6b8af6] transition-colors break-all">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-400">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Contact Form */}
              <motion.div
                className="w-full lg:w-1/2 bg-white rounded-3xl shadow-2xl p-8 md:p-10"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="dm_serif_text text-3xl text-gray-800 mb-6">Send a Message</h2>
                <Contact />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
