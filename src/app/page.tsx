"use client";
import React, { useState, useEffect } from "react";
import { experienceApi, portfolioApi, blogApi, profileApi, educationApi } from "@/lib/api";
import type { Experience, Portfolio, Blog, Profile, Education } from "@/lib/types";
import ExperienceCard from "@/components/ExperienceCard";
import PortfolioCard from "@/components/PortfolioCard";
import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";
import TypeWriter from "@/components/TypeWriter";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import Contact from '@/components/Contact';
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function Home() {
  const [experienceData, setExperienceData] = useState<Experience[]>([]);
  const [portfolioData, setPortfolioData] = useState<Portfolio[]>([]);
  const [blogData, setBlogData] = useState<Blog[]>([]);
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [educationData, setEducationData] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Motion values for 3D card tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Map mouse position to degree of rotation with spring physics
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [15, -15]), { damping: 20, stiffness: 300 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-15, 15]), { damping: 20, stiffness: 300 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = event.clientX - rect.left - width / 2;
    const y = event.clientY - rect.top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [exp, port, blog, profile, edu] = await Promise.all([
          experienceApi.getAll(),
          portfolioApi.getAll(),
          blogApi.getAll(),
          profileApi.get(),
          educationApi.getAll()
        ]);
        setExperienceData(exp || []);
        setPortfolioData(port || []);
        setBlogData(blog || []);
        setProfileData(profile || null);
        setEducationData(edu || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-200">
        <Navbar />
        <div className="section_wrapper">
          {/* ── Hero Section ── */}
          <section
            className="w-full min-h-screen flex flex-col justify-center items-center px-4 md:px-0 py-2.5 pt-20 md:pt-2.5 section"
            id="home"
          >
            <div className="flex flex-col justify-center items-center w-fit h-fit gap-4">
              <p
                className="dm_serif_text text-5xl md:text-9xl text-[#6b8af6] text-center"
                data-aos="fade-down"
                data-aos-delay="100"
              >
                <TypeWriter text="Hi! I'm Awan" typingSpeed={150} />
                <span className="text-[#3c45b9]">.</span>
              </p>
              <p
                className="text-lg md:text-2xl text-gray-600 text-center max-w-[600px]"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                {profileData?.tagline || "Information Systems Student & Web Developer"}
              </p>
              <div
                className="flex flex-row w-full h-full gap-4 items-center justify-center mt-4"
                data-aos="zoom-in"
                data-aos-delay="350"
              >
                <Link href="/cv" className="relative w-[32px] h-[32px] md:w-[42px] md:h-[42px] hover:scale-110 transition-transform">
                  <Image
                    src="/images/curriculum-vitae.png"
                    alt="Icon CV"
                    layout="fill"
                    objectFit="contain"
                  />
                </Link>
                <Link href="https://github.com/nawa316" target="_blank" className="hover:scale-110 transition-transform">
                  <AiFillGithub className="w-8 h-8 md:w-[42px] md:h-[42px]" color="#6b8af6" />
                </Link>
                <Link href="https://www.linkedin.com/in/muhammad-ade-dzakwan/" target="_blank" className="hover:scale-110 transition-transform">
                  <FaLinkedin className="w-8 h-8 md:w-[42px] md:h-[42px]" color="#6b8af6" />
                </Link>
                <Link href="mailto:muhammadadedzakwan@gmail.com" target="_blank" className="hover:scale-110 transition-transform">
                  <MdEmail className="w-8 h-8 md:w-[42px] md:h-[42px]" color="#6b8af6" />
                </Link>
              </div>
            </div>
          </section>

          {/* ── About Section ── */}
          <section
            className="flex flex-col w-full min-h-screen justify-center items-center section px-4 md:px-0 py-8 md:py-0"
            id="about"
          >
            <div
              className="flex justify-center items-center bg-[#6b8af6] mb-8 md:mb-[50px] px-5 py-2 rounded-[30px]"
              data-aos="fade-down"
            >
              <h2 className="dm_serif_text text-2xl md:text-4xl text-white">About Me</h2>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 px-4 md:px-40">
              {isLoading ? (
                <div className="w-[200px] md:w-[300px] h-[300px] md:h-[450px] bg-gray-300 animate-pulse rounded-xl" />
              ) : (
                <div 
                  className="relative flex flex-col items-center origin-top group md:mt-0 mt-4 cursor-grab active:cursor-grabbing select-none"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  style={{ perspective: 1000 }}
                >
                  {/* Lanyard String */}
                  <div className="w-1 h-8 md:h-12 bg-slate-300 shadow-sm -mb-2 z-0" />
                  
                  {/* The Clip */}
                  <div className="w-12 h-5 bg-gradient-to-b from-slate-300 to-slate-400 rounded-sm shadow-md z-10 flex justify-center items-center border-t border-slate-200">
                     <div className="w-3 h-1.5 bg-slate-500 rounded-full opacity-50" />
                  </div>
                  
                  {/* The ID Card */}
                  <motion.div
                    style={{ 
                      rotateX: rotateX, 
                      rotateY: rotateY,
                      transformStyle: "preserve-3d" 
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.6}
                    whileDrag={{ scale: 1.05, z: 50 }}
                    className="w-[240px] md:w-[300px] bg-white p-4 pt-6 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300 -mt-2 border border-slate-100 flex flex-col items-center relative hover:shadow-[0_25px_50px_rgba(0,0,0,0.18)]"
                  >
                    {/* Hole punch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-2.5 bg-slate-100 rounded-full shadow-inner border border-slate-200" style={{ transform: "translateZ(20px)" }} />
                    
                    {/* Photo Container */}
                    <div 
                      className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mt-3 mb-4 shadow-inner bg-slate-100"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      <Image
                        src={profileData?.photo_url || "/images/1688908285904.JPG"}
                        alt="Foto Profile"
                        fill
                        className="object-cover pointer-events-none select-none"
                      />
                    </div>
                    
                    {/* Name tag text */}
                    <h3 className="dm_serif_text text-2xl text-slate-800 uppercase tracking-widest mt-1" style={{ transform: "translateZ(25px)" }}>Awan</h3>
                    <p className="text-xs text-[#6b8af6] font-bold tracking-widest mt-1 mb-2" style={{ transform: "translateZ(20px)" }}>DEVELOPER</p>
                    
                    {/* Barcode/Pattern decoration */}
                    <div className="w-full flex justify-center gap-[3px] mt-2 opacity-20" style={{ transform: "translateZ(15px)" }}>
                       <div className="w-1 h-8 bg-slate-900" />
                       <div className="w-2 h-8 bg-slate-900" />
                       <div className="w-1 h-8 bg-slate-900" />
                       <div className="w-3 h-8 bg-slate-900" />
                       <div className="w-1 h-8 bg-slate-900" />
                       <div className="w-2 h-8 bg-slate-900" />
                       <div className="w-1 h-8 bg-slate-900" />
                       <div className="w-[5px] h-8 bg-slate-900" />
                       <div className="w-1 h-8 bg-slate-900" />
                       <div className="w-2 h-8 bg-slate-900" />
                       <div className="w-1 h-8 bg-slate-900" />
                    </div>
                  </motion.div>
                </div>
              )}
              <div
                className="w-full flex flex-col items-center md:items-start h-fit justify-start gap-5 p-0"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="w-full flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                  <p className="text-center md:text-left">
                    <span className="text-2xl md:text-4xl font-bold">Muhammad Ade Dzakwan</span>{" "}
                    <br />
                    <span className="text-lg md:text-2xl">Surabaya, Jawa Timur</span>
                  </p>
                  <Image
                    src="/images/Lambang ITS.png"
                    alt="FSLDK"
                    width={1559}
                    height={1559}
                    className="w-16 h-16 md:w-20 md:h-20 md:ml-auto md:mr-5"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-lg md:text-xl font-medium">Description</h2>
                  <div className="text-base md:text-lg whitespace-pre-wrap">
                    {profileData?.about_text || "Loading description..."}
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-lg md:text-xl font-medium">Education &amp; Qualifications</h2>
                  <ul className="text-base md:text-lg list-disc pl-6 md:pl-10 text-left">
                    {educationData.length > 0 ? (
                      educationData.map((edu) => (
                        <li key={edu.id}>
                          {edu.major ? `${edu.major}, ` : ''}{edu.institution} - {new Date(edu.start_date).getFullYear()}-{edu.end_date ? new Date(edu.end_date).getFullYear() : 'Now'}
                        </li>
                      ))
                    ) : (
                      <li>Loading education...</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <Link
              href="/about"
              className="mt-8 p-2 px-6 bg-[#6b8af6] text-white rounded-full hover:scale-105 transition-transform font-medium"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              Selengkapnya
            </Link>
          </section>

          {/* ── Experience Section ── */}
          <section
            className="w-full min-h-screen gap-6 md:gap-10 flex flex-col justify-center items-center section py-8 md:py-0 px-4"
            id="experience"
          >
            <div
              className="flex flex-row justify-center items-center"
              data-aos="fade-down"
            >
              <h2 className="dm_serif_text text-2xl md:text-4xl text-[#3c45b9] drop-shadow-sm">Experience</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto w-full">
              {experienceData.slice(0, 3).map((item, index) => (
                <div
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <ExperienceCard item={item} index={index} />
                </div>
              ))}
            </div>
            <Link
              href="/experience"
              className="mt-4 p-2 px-6 bg-[#3c45b9] text-white shadow-md rounded-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-medium"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              Lihat Semua
            </Link>
          </section>

          {/* ── Portfolio Section ── */}
          <section
            className="w-full min-h-screen flex flex-col justify-center items-center gap-6 md:gap-10 section py-8 px-4"
            id="portofolio"
          >
            <div
              className="flex flex-row justify-center items-center"
              data-aos="fade-down"
            >
              <h2 className="dm_serif_text text-2xl md:text-4xl text-[#483D8B] drop-shadow-sm">Portofolio</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto w-full">
              {portfolioData.slice(0, 3).map((item, index) => (
                <div
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <PortfolioCard item={item} index={index} />
                </div>
              ))}
            </div>
            <Link
              href="/portofolio"
              className="mt-4 p-2 px-6 bg-[#6b8af6] text-white shadow-md rounded-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-medium"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              Lihat Semua
            </Link>
          </section>

          {/* ── Blog Section ── */}
          <section
            className="w-full min-h-screen flex flex-col justify-center items-center gap-6 md:gap-10 section py-8 px-4"
            id="blog"
          >
            <div
              className="flex flex-row justify-center items-center"
              data-aos="fade-down"
            >
              <h2 className="dm_serif_text text-2xl md:text-4xl text-gray-800 drop-shadow-sm">Blog</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto w-full">
              {blogData.slice(0, 3).map((item, index) => (
                <div
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <BlogCard post={item} index={index} />
                </div>
              ))}
            </div>
            <Link
              href="/blog"
              className="mt-4 p-2 px-6 bg-[#6b8af6] text-white shadow-md rounded-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-medium"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              Lihat Semua
            </Link>
          </section>

          {/* ── Contact / Footer Section ── */}
          <footer className="w-full flex flex-col justify-center items-center section bg-gradient-to-b from-[#6b8af6] to-[#3c45b9] gap-6 md:gap-10 py-16 md:py-24 px-4 rounded-t-[40px] md:rounded-t-[80px] mt-10 md:mt-20 shadow-[0_-10px_40px_rgba(107,138,246,0.15)]">
            <div
              className="flex flex-col gap-2 justify-center items-center text-center text-white"
              data-aos="fade-up"
            >
              <h2 className="dm_serif_text text-2xl md:text-4xl">Contact Me!</h2>
              <p className="text-base md:text-lg mb-4">Apakah Anda tertarik untuk berkolaborasi atau sekedar berdiskusi seputar Pengembangan Web dan Perangkat Lunak? <br /> Jangan ragu untuk menghubungi saya!</p>

              <div
                className="flex flex-col md:flex-row gap-4 mt-2 mb-6"
                data-aos="zoom-in"
                data-aos-delay="150"
              >
                <a href="mailto:muhammadadedzakwan@gmail.com" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-colors">
                  <MdEmail size={20} />
                  <span className="font-medium">muhammadadedzakwan@gmail.com</span>
                </a>
                <a href="https://wa.me/6289513601357" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-colors">
                  <FaWhatsapp size={20} />
                  <span className="font-medium">+62 895-1360-1357</span>
                </a>
              </div>
            </div>
            <div
              className="w-full lg:w-[800px] h-auto flex justify-center items-center bg-white rounded-3xl p-6 md:p-8 shadow-xl"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Contact />
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
