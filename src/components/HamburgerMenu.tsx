"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const languages = [
    { code: "id", label: "ID 🇮🇩" },
    { code: "en", label: "EN 🇬🇧" },
    { code: "de", label: "DE 🇩🇪" }
  ] as const;

  return (
    <div className="relative">
      {/* Button Hamburger */}
      <button
        className="flex flex-col justify-between w-10 h-8 z-50 relative"
        onClick={toggleMenu}
      >
        <motion.div
          className="w-10 h-1 bg-white rounded origin-left"
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-10 h-1 bg-white rounded"
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-10 h-1 bg-white rounded origin-left"
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </button>

      {/* Menu */}
      <motion.div
        className={`fixed top-0 left-0 w-full h-full bg-black/95 flex flex-col items-center justify-center gap-8 transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" onClick={closeMenu} className="text-white text-2xl hover:text-[#6b8af6] transition-colors dm_serif_text">
          {t("nav.home")}
        </Link>
        <Link href="/about" onClick={closeMenu} className="text-white text-2xl hover:text-[#6b8af6] transition-colors dm_serif_text">
          {t("nav.about")}
        </Link>
        <Link href="/experience" onClick={closeMenu} className="text-white text-2xl hover:text-[#6b8af6] transition-colors dm_serif_text">
          {t("nav.experience")}
        </Link>
        <Link href="/portofolio" onClick={closeMenu} className="text-white text-2xl hover:text-[#6b8af6] transition-colors dm_serif_text">
          {t("nav.portfolio")}
        </Link>
        <Link href="/blog" onClick={closeMenu} className="text-white text-2xl hover:text-[#6b8af6] transition-colors dm_serif_text">
          {t("nav.blog")}
        </Link>
        <Link href="/contact" onClick={closeMenu} className="text-white text-2xl hover:text-[#6b8af6] transition-colors dm_serif_text">
          {t("nav.contact")}
        </Link>

        {/* Mobile Actions (Language & Theme Switcher Placeholder) */}
        <div className="flex flex-col items-center gap-6 mt-8 pt-8 border-t border-white/10 w-52 justify-center">
          {/* Theme Toggle Button */}
          <div className="flex items-center gap-3">
            <span className="text-white/80 text-sm font-medium">Theme:</span>
            <button
              onClick={() => {
                toggleTheme();
                closeMenu();
              }}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-all text-sm"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>

          {/* Language Switcher */}
          <div className="flex gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  closeMenu();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  language === lang.code
                    ? "bg-[#6b8af6] text-white shadow-md shadow-[#6b8af6]/30"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
