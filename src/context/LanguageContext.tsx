"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "id" | "en" | "de";

interface Translations {
  [key: string]: {
    id: string;
    en: string;
    de: string;
  };
}

export const translations: Translations = {
  // Navbar
  "nav.home": { id: "Beranda", en: "Home", de: "Startseite" },
  "nav.about": { id: "Tentang", en: "About", de: "Über mich" },
  "nav.experience": { id: "Pengalaman", en: "Experience", de: "Erfahrung" },
  "nav.portfolio": { id: "Portofolio", en: "Portfolio", de: "Portfolio" },
  "nav.blog": { id: "Blog", en: "Blog", de: "Blog" },
  "nav.contact": { id: "Kontak", en: "Contact", de: "Kontakt" },

  // Hero
  "hero.greeting": { id: "Halo! Saya Awan", en: "Hi! I'm Awan", de: "Hi! Ich bin Awan" },
  "hero.tagline": { id: "Mahasiswa Sistem Informasi & Web Developer", en: "Information Systems Student & Web Developer", de: "Wirtschaftsinformatik-Student & Webentwickler" },

  // Common titles
  "section.about": { id: "Tentang Saya", en: "About Me", de: "Über mich" },
  "section.experience": { id: "Pengalaman Kerja & Organisasi", en: "Experience", de: "Erfahrung" },
  "section.portfolio": { id: "Portofolio", en: "Portfolio", de: "Portfolio" },
  "section.blog": { id: "Blog Terbaru", en: "Latest Blog", de: "Neueste Blogs" },
  "section.contact": { id: "Hubungi Saya", en: "Contact Me!", de: "Kontaktiere mich!" },

  // Buttons
  "btn.more": { id: "Selengkapnya", en: "Read More", de: "Mehr lesen" },
  "btn.viewAll": { id: "Lihat Semua", en: "View All", de: "Alle anzeigen" },
  "btn.send": { id: "Kirim Pesan", en: "Send Message", de: "Nachricht senden" },
  "btn.backToBlog": { id: "Kembali ke Blog", en: "Back to Blog", de: "Zurück zum Blog" },
  "btn.downloadPdf": { id: "Unduh Resume PDF", en: "Download PDF Resume", de: "PDF-Lebenslauf herunterladen" },

  // Filters
  "filter.all": { id: "Semua", en: "All", de: "Alle" },

  // About Page
  "about.keahlian": { id: "Keahlian & Fokus", en: "Skills & Focus", de: "Fähigkeiten & Fokus" },
  "about.desc1": { 
    id: "Halo! Saya Muhammad Ade Dzakwan, atau biasa dipanggil Awan. Saya adalah mahasiswa Sistem Informasi di Institut Teknologi Sepuluh Nopember (ITS) Surabaya.", 
    en: "Hello! I am Muhammad Ade Dzakwan, or commonly called Awan. I am an Information Systems student at Institut Teknologi Sepuluh Nopember (ITS) Surabaya.", 
    de: "Hallo! Ich bin Muhammad Ade Dzakwan, oder einfach Awan genannt. Ich bin Student der Wirtschaftsinformatik am Institut Teknologi Sepuluh Nopember (ITS) Surabaya." 
  },
  "about.desc2": { 
    id: "Saya memiliki ketertarikan yang besar dalam dunia pengembangan web (Web Development), pengembangan perangkat lunak (Software Engineering), dan eksplorasi teknologi modern seperti kecerdasan buatan (AI).", 
    en: "I have a great interest in the world of Web Development, Software Engineering, and exploration of modern technologies such as Artificial Intelligence (AI).", 
    de: "Ich habe ein großes Interesse an der Welt der Webentwicklung, Software Engineering dan der Erforschung moderner Technologien wie Künstliche Intelligenz (KI)." 
  },

  // Experience Page
  "experience.desc": {
    id: "Perjalanan dan pengalaman organisasi serta kegiatan yang telah saya ikuti",
    en: "The journey and organizational experiences as well as activities that I have participated in",
    de: "Der Weg und die organisatorischen Erfahrungen sowie Aktivitäten, an denen ich teilgenommen habe"
  },
  "experience.notFound": { id: "Tidak ada pengalaman yang ditemukan.", en: "No experiences found.", de: "Keine Erfahrungen gefunden." },

  // Portfolio Page
  "portfolio.desc": {
    id: "Kumpulan proyek dan karya yang telah saya kerjakan",
    en: "A collection of projects and works that I have worked on",
    de: "Eine Sammlung von Projekten und Arbeiten, an denen ich gearbeitet habe"
  },
  "portfolio.notFound": { id: "Tidak ada portofolio yang ditemukan.", en: "No portfolios found.", de: "Keine Portfolios gefunden." },

  // Blog Page
  "blog.desc": {
    id: "Artikel dan tulisan seputar teknologi, programming, dan pengembangan diri",
    en: "Articles and writings about technology, programming, and self-development",
    de: "Artikel und Schriften über Technologie, Programmierung und Selbstentwicklung"
  },
  "blog.loading": { id: "Memuat data...", en: "Loading data...", de: "Daten werden geladen..." },
  "blog.notFound": { id: "Artikel tidak ditemukan.", en: "Article not found.", de: "Artikel nicht gefunden." },
  "blog.featured": { id: "Unggulan", en: "Featured", de: "Vorgestellt" },
  "blog.tags": { id: "Tags", en: "Tags", de: "Tags" },

  // Contact Page & Footer
  "contact.desc": {
    id: "Apakah Anda tertarik untuk berkolaborasi atau sekedar berdiskusi seputar Pengembangan Web dan Perangkat Lunak? Jangan ragu untuk menghubungi saya!",
    en: "Are you interested in collaborating or just discussing Web Development and Software? Do not hesitate to contact me!",
    de: "Haben Sie Interesse an einer Zusammenarbeit oder möchten Sie einfach über Webentwicklung und Software diskutieren? Zögern Sie nicht, mich zu kontaktieren!"
  },
  "contact.getInTouch": { id: "Hubungi Saya", en: "Get in Touch", de: "Kontakt aufnehmen" },
  "contact.info": { id: "Informasi Kontak", en: "Contact Info", de: "Kontaktinformationen" },
  "contact.send": { id: "Kirim Pesan", en: "Send a Message", de: "Nachricht senden" },
  
  // Contact Form Labels
  "form.name": { id: "Nama Lengkap", en: "Full Name", de: "Vollständiger Name" },
  "form.email": { id: "Alamat Email", en: "Email Address", de: "E-Mail-Adresse" },
  "form.message": { id: "Pesan", en: "Message", de: "Nachricht" },
  "form.placeholder.name": { id: "Nama Lengkap Anda", en: "Your Full Name", de: "Ihr vollständiger Name" },
  "form.placeholder.email": { id: "nama@domain.com", en: "name@domain.com", de: "name@domain.com" },
  "form.placeholder.message": { id: "Tulis pesan Anda di sini...", en: "Type your message here...", de: "Schreiben Sie Ihre Nachricht hier..." },

  // Image & Loading placeholders
  "loading.data": { id: "Memuat data...", en: "Loading data...", de: "Daten werden geladen..." },
  "desc.title": { id: "Deskripsi", en: "Description", de: "Beschreibung" },
  "edu.title": { id: "Pendidikan & Kualifikasi", en: "Education & Qualifications", de: "Ausbildung & Qualifikationen" },
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("profile_lang") as Language;
    if (savedLang && (savedLang === "id" || savedLang === "en" || savedLang === "de")) {
      setLanguageState(savedLang);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("profile_lang", lang);
  };

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language] || translations[key]["en"] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
