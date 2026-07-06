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
import ProfileCard from "@/components/ProfileCard";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const [experienceData, setExperienceData] = useState<Experience[]>([]);
  const [portfolioData, setPortfolioData] = useState<Portfolio[]>([]);
  const [blogData, setBlogData] = useState<Blog[]>([]);
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [educationData, setEducationData] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
                <TypeWriter text={t("hero.greeting_prefix") + (profileData?.name ? (profileData.name.split(" ").pop() || "Awan") : "Awan")} typingSpeed={150} />
                <span className="text-[#3c45b9]">.</span>
              </p>
              <p
                className="text-lg md:text-2xl text-gray-600 text-center max-w-[600px]"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                {profileData?.tagline ? t(profileData.tagline) : t("hero.tagline")}
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
            <div className="flex flex-col items-center mb-8 md:mb-12" data-aos="fade-down">
              <h2 className="dm_serif_text text-3xl md:text-5xl text-slate-800 text-center">{t("section.about")}</h2>
              <div className="w-12 h-1 bg-[#6b8af6] rounded-full mt-2" />
            </div>
            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 px-4 md:px-40">
              {isLoading ? (
                <div className="w-[260px] h-[480px] bg-gray-200 animate-pulse rounded-2xl" />
              ) : (
                <div data-aos="fade-up" data-aos-delay="100">
                  <ProfileCard photoUrl={profileData?.photo_url} name={profileData?.name ? (profileData.name.split(" ").pop() || "Awan") : "Awan"} />
                </div>
              )}
              <div
                className="w-full flex flex-col items-center md:items-start h-fit justify-start gap-5 p-0"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="w-full flex flex-col md:flex-row justify-center md:justify-start items-center gap-2">
                  <p className="text-center md:text-left">
                    <span className="text-2xl md:text-4xl font-bold">{profileData?.name || "Muhammad Ade Dzakwan"}</span>{" "}
                    <br />
                    <span className="text-lg md:text-2xl">{t(profileData?.location || "Surabaya, Jawa Timur")}</span>
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
                  <h2 className="text-lg md:text-xl font-medium">{t("desc.title")}</h2>
                  <div className="text-base md:text-lg whitespace-pre-wrap">
                    {profileData?.about_text ? t(profileData.about_text) : t("about.desc1")}
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-lg md:text-xl font-medium">{t("edu.title")}</h2>
                  <ul className="text-base md:text-lg list-disc pl-6 md:pl-10 text-left">
                    {educationData.length > 0 ? (
                      educationData.map((edu) => (
                        <li key={edu.id}>
                          {edu.major ? `${edu.major}, ` : ''}{edu.institution} - {new Date(edu.start_date).getFullYear()}-{edu.end_date ? new Date(edu.end_date).getFullYear() : 'Now'}
                        </li>
                      ))
                    ) : (
                      <li>{t("loading.data")}</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <Link
              href="/about"
              className="mt-8 p-3 px-8 bg-[#6b8af6] text-white shadow-md shadow-[#6b8af6]/10 rounded-full hover:bg-[#5271df] hover:shadow-lg hover:shadow-[#6b8af6]/25 hover:-translate-y-0.5 transition-all duration-300 font-medium text-sm md:text-base"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              {t("btn.more")}
            </Link>
          </section>

          {/* ── Experience Section ── */}
          <section
            className="w-full min-h-screen gap-6 md:gap-10 flex flex-col justify-center items-center section py-8 md:py-0 px-4"
            id="experience"
          >
            <div className="flex flex-col items-center mb-8 md:mb-12" data-aos="fade-down">
              <h2 className="dm_serif_text text-3xl md:text-5xl text-slate-800 text-center">{t("section.experience")}</h2>
              <div className="w-12 h-1 bg-[#6b8af6] rounded-full mt-2" />
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
              className="mt-8 p-3 px-8 bg-[#6b8af6] text-white shadow-md shadow-[#6b8af6]/10 rounded-full hover:bg-[#5271df] hover:shadow-lg hover:shadow-[#6b8af6]/25 hover:-translate-y-0.5 transition-all duration-300 font-medium text-sm md:text-base"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              {t("btn.viewAll")}
            </Link>
          </section>

          {/* ── Portfolio Section ── */}
          <section
            className="w-full min-h-screen flex flex-col justify-center items-center gap-6 md:gap-10 section py-8 px-4"
            id="portofolio"
          >
            <div className="flex flex-col items-center mb-8 md:mb-12" data-aos="fade-down">
              <h2 className="dm_serif_text text-3xl md:text-5xl text-slate-800 text-center">{t("section.portfolio")}</h2>
              <div className="w-12 h-1 bg-[#6b8af6] rounded-full mt-2" />
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
              className="mt-8 p-3 px-8 bg-[#6b8af6] text-white shadow-md shadow-[#6b8af6]/10 rounded-full hover:bg-[#5271df] hover:shadow-lg hover:shadow-[#6b8af6]/25 hover:-translate-y-0.5 transition-all duration-300 font-medium text-sm md:text-base"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              {t("btn.viewAll")}
            </Link>
          </section>

          {/* ── Blog Section ── */}
          <section
            className="w-full min-h-screen flex flex-col justify-center items-center gap-6 md:gap-10 section py-8 px-4"
            id="blog"
          >
            <div className="flex flex-col items-center mb-8 md:mb-12" data-aos="fade-down">
              <h2 className="dm_serif_text text-3xl md:text-5xl text-slate-800 text-center">{t("section.blog")}</h2>
              <div className="w-12 h-1 bg-[#6b8af6] rounded-full mt-2" />
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
              className="mt-8 p-3 px-8 bg-[#6b8af6] text-white shadow-md shadow-[#6b8af6]/10 rounded-full hover:bg-[#5271df] hover:shadow-lg hover:shadow-[#6b8af6]/25 hover:-translate-y-0.5 transition-all duration-300 font-medium text-sm md:text-base"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              {t("btn.viewAll")}
            </Link>
          </section>

          {/* ── Contact / Footer Section ── */}
          <footer className="w-full flex flex-col justify-center items-center section bg-gradient-to-b from-[#6b8af6] to-[#3c45b9] gap-6 md:gap-10 py-16 md:py-24 px-4 rounded-t-[40px] md:rounded-t-[80px] mt-10 md:mt-20 shadow-[0_-10px_40px_rgba(107,138,246,0.15)]">
            <div
              className="flex flex-col gap-2 justify-center items-center text-center text-white"
              data-aos="fade-up"
            >
              <h2 className="dm_serif_text text-2xl md:text-4xl">{t("section.contact")}</h2>
              <p className="text-base md:text-lg mb-4">{t("contact.desc")}</p>

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
