"use client";
import React, { useState, useRef, useEffect } from "react";
import HamburgerMenu from "@/components/HamburgerMenu";
import Link from "next/link";
import { useLanguage, Language } from "@/context/LanguageContext";
import { Globe, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.experience"), href: "/experience" },
    { name: t("nav.portfolio"), href: "/portofolio" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const languages = [
    { code: "id", name: "Indonesia", label: "ID 🇮🇩" },
    { code: "en", name: "English", label: "EN 🇬🇧" },
    { code: "de", name: "Deutsch", label: "DE 🇩🇪" }
  ] as const;

  const currentLang = languages.find((lang) => lang.code === language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex w-full items-center flex-row justify-between fixed px-6 py-4 top-0 z-50 bg-[#6b8af6] md:px-12 shadow-sm border-b border-white/10">
      {/* Left: Logo */}
      <div className="flex-1 flex justify-start">
        <Link href="/" className="text-3xl font-bold dm_serif_text text-white hover:text-gray-200 transition-colors">
          Awan
        </Link>
      </div>
      
      {/* Center: Desktop Navigation Links */}
      <div className="hidden md:flex flex-initial justify-center items-center gap-8 mx-auto">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-white hover:text-gray-200 transition-colors dm_serif_text text-lg"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Right: Desktop Action Buttons */}
      <div className="hidden md:flex flex-1 justify-end items-center gap-4">
        {/* Placeholder for future Theme Toggle button */}
        <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white cursor-pointer transition-all opacity-40 hover:opacity-100" title="Theme Toggle (Placeholder)">
          <span className="text-xs">🌓</span>
        </div>

        {/* Custom Language Dropdown Switcher */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-white text-sm font-semibold transition-all select-none"
          >
            <Globe className="w-4 h-4 text-white/80" />
            <span>{currentLang.label}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-white/80 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2.5 w-40 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-xl py-2 flex flex-col z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setDropdownOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-2 text-sm transition-colors text-left ${
                    language === lang.code
                      ? "text-[#6b8af6] font-bold bg-[#6b8af6]/5"
                      : "text-slate-700 hover:bg-slate-50 font-medium"
                  }`}
                >
                  <span>{lang.name}</span>
                  <span className="text-base">{lang.label.split(" ")[1]}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden flex items-center gap-4">
        <HamburgerMenu />
      </div>
    </nav>
  );
}

