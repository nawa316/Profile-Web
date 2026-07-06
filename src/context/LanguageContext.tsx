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
  "hero.greeting_prefix": { id: "Halo! Saya ", en: "Hi! I'm ", de: "Hi! Ich bin " },
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

  // --- DATABASE TRANSLATION MAPPINGS ---
  
  // Greeting mappings
  "Hi! I'm Awan": { id: "Halo! Saya Awan", en: "Hi! I'm Awan", de: "Hi! Ich bin Awan" },
  "Halo! Saya Awan": { id: "Halo! Saya Awan", en: "Hi! I'm Awan", de: "Hi! Ich bin Awan" },
  
  // Custom Date / Helper strings
  "Present": { id: "Sekarang", en: "Present", de: "Heute" },
  "Details": { id: "Detail", en: "Details", de: "Details" },
  "View Source Code": { id: "Lihat Kode Sumber", en: "View Source Code", de: "Quellcode anzeigen" },
  "Live Demo": { id: "Demo Langsung", en: "Live Demo", de: "Live-Demo" },
  "Technologies Used": { id: "Teknologi yang Digunakan", en: "Technologies Used", de: "Verwendete Technologien" },
  "Skills & Technologies": { id: "Keahlian & Teknologi", en: "Skills & Technologies", de: "Fähigkeiten & Technologien" },
  "Gallery": { id: "Galeri", en: "Gallery", de: "Galerie" },
  "Enlarge": { id: "Perbesar", en: "Enlarge", de: "Vergrößern" },
  "Click to enlarge": { id: "Klik untuk memperbesar", en: "Click to enlarge", de: "Zum Vergrößern klicken" },

  // Profile Table Data
  "Information Systems Student & Web Developer": {
    id: "Mahasiswa Sistem Informasi & Web Developer",
    en: "Information Systems Student & Web Developer",
    de: "Wirtschaftsinformatik-Student & Webentwickler"
  },
  "Mahasiswa Sistem Informasi & Web Developer": {
    id: "Mahasiswa Sistem Informasi & Web Developer",
    en: "Information Systems Student & Web Developer",
    de: "Wirtschaftsinformatik-Student & Webentwickler"
  },
  "Seorang mahasiswa Sistem Informasi dengan passion dalam pengembangan web...": {
    id: "Seorang mahasiswa Sistem Informasi dengan passion dalam pengembangan web...",
    en: "An Information Systems student with a passion for web development...",
    de: "Ein Wirtschaftsinformatik-Student mit einer Leidenschaft für Webentwicklung..."
  },
  "An Information Systems student with a passion for web development...": {
    id: "Seorang mahasiswa Sistem Informasi dengan passion dalam pengembangan web...",
    en: "An Information Systems student with a passion for web development...",
    de: "Ein Wirtschaftsinformatik-Student mit einer Leidenschaft für Webentwicklung..."
  },
  "Surabaya, Jawa Timur": {
    id: "Surabaya, Jawa Timur",
    en: "Surabaya, East Java",
    de: "Surabaya, Ost-Java"
  },
  "Surabaya, East Java": {
    id: "Surabaya, Jawa Timur",
    en: "Surabaya, East Java",
    de: "Surabaya, Ost-Java"
  },

  // Educations Table Data
  "Institut Teknologi Sepuluh Nopember": {
    id: "Institut Teknologi Sepuluh Nopember",
    en: "Sepuluh Nopember Institute of Technology",
    de: "Sepuluh Nopember Institut für Technologie"
  },
  "Sepuluh Nopember Institute of Technology": {
    id: "Institut Teknologi Sepuluh Nopember",
    en: "Sepuluh Nopember Institute of Technology",
    de: "Sepuluh Nopember Institut für Technologie"
  },
  "Sistem Informasi": {
    id: "Sistem Informasi",
    en: "Information Systems",
    de: "Wirtschaftsinformatik"
  },
  "Information Systems": {
    id: "Sistem Informasi",
    en: "Information Systems",
    de: "Wirtschaftsinformatik"
  },
  "Active student.": {
    id: "Mahasiswa aktif.",
    en: "Active student.",
    de: "Aktiver Student."
  },
  "Mahasiswa aktif.": {
    id: "Mahasiswa aktif.",
    en: "Active student.",
    de: "Aktiver Student."
  },

  // Experiences Categories / Types
  "organization": { id: "Organisasi", en: "Organization", de: "Organisation" },
  "work": { id: "Pekerjaan", en: "Work", de: "Arbeit" },
  "volunteer": { id: "Volunter", en: "Volunteer", de: "Ehrenamtlich" },

  // Experiences Role names
  "Staff Media & Informasi": {
    id: "Staf Media & Informasi",
    en: "Media & Information Staff",
    de: "Mitarbeiter für Medien & Information"
  },
  "Staff Divisi IT": {
    id: "Staf Divisi IT",
    en: "IT Division Staff",
    de: "Mitarbeiter der IT-Abteilung"
  },
  "IT Division Staff": {
    id: "Staf Divisi IT",
    en: "IT Division Staff",
    de: "Mitarbeiter der IT-Abteilung"
  },
  "Staff Web Developer": {
    id: "Staf Web Developer",
    en: "Staff Web Developer",
    de: "Webentwickler-Mitarbeiter"
  },

  // Experiences Descriptions
  "Berkontribusi dalam pengelolaan media sosial dan penyebaran informasi kegiatan dakwah kampus di wilayah Surabaya Raya.": {
    id: "Berkontribusi dalam pengelolaan media sosial dan penyebaran informasi kegiatan dakwah kampus di wilayah Surabaya Raya.",
    en: "Contributed to social media management and the dissemination of campus preaching activities' information in the Surabaya Raya region.",
    de: "Mitarbeit an der Social-Media-Verwaltung und Verbreitung von Informationen über Campus-Predigtaktivitäten in der Region Surabaya Raya."
  },
  "Contributed to social media management and the dissemination of campus preaching activities' information in the Surabaya Raya region.": {
    id: "Berkontribusi dalam pengelolaan media sosial dan penyebaran informasi kegiatan dakwah kampus di wilayah Surabaya Raya.",
    en: "Contributed to social media management and the dissemination of campus preaching activities' information in the Surabaya Raya region.",
    de: "Mitarbeit an der Social-Media-Verwaltung und Verbreitung von Informationen über Campus-Predigtaktivitäten in der Region Surabaya Raya."
  },
  "Berkontribusi dalam pengembangan sistem informasi dan website untuk kegiatan open campus terbesar di ITS.": {
    id: "Berkontribusi dalam pengembangan sistem informasi dan website untuk kegiatan open campus terbesar di ITS.",
    en: "Contributed to the development of the information system and website for the largest open campus event at ITS.",
    de: "Mitarbeit an der Entwicklung des Informationssystems und der Website für die größte Open-Campus-Veranstaltung am ITS."
  },
  "Contributed to the development of the information system and website for the largest open campus event at ITS.": {
    id: "Berkontribusi dalam pengembangan sistem informasi dan website untuk kegiatan open campus terbesar di ITS.",
    en: "Contributed to the development of the information system and website for the largest open campus event at ITS.",
    de: "Mitarbeit an der Entwicklung des Informationssystems und der Website für die größte Open-Campus-Veranstaltung am ITS."
  },
  "Mengembangkan website untuk acara expo tahunan departemen Sistem Informasi ITS.": {
    id: "Mengembangkan website untuk acara expo tahunan departemen Sistem Informasi ITS.",
    en: "Developed the website for the annual expo of the ITS Information Systems department.",
    de: "Entwicklung der Website für die jährliche Expo-Veranstaltung der Abteilung für Wirtschaftsinformatik am ITS."
  },
  "Developed the website for the annual expo of the ITS Information Systems department.": {
    id: "Mengembangkan website untuk acara expo tahunan departemen Sistem Informasi ITS.",
    en: "Developed the website for the annual expo of the ITS Information Systems department.",
    de: "Entwicklung der Website für die jährliche Expo-Veranstaltung der Abteilung für Wirtschaftsinformatik am ITS."
  },
  "Surabaya": {
    id: "Surabaya",
    en: "Surabaya",
    de: "Surabaya"
  },

  // Portfolios Categories / Titles / Descriptions
  "Web Development": { id: "Pengembangan Web", en: "Web Development", de: "Webentwicklung" },
  "Pengembangan Web": { id: "Pengembangan Web", en: "Web Development", de: "Webentwicklung" },
  "Mobile Development": { id: "Pengembangan Mobile", en: "Mobile Development", de: "Mobile Entwicklung" },
  "Pengembangan Mobile": { id: "Pengembangan Mobile", en: "Mobile Development", de: "Mobile Entwicklung" },

  "E-Commerce Website": {
    id: "Website E-Commerce",
    en: "E-Commerce Website",
    de: "E-Commerce-Website"
  },
  "Website E-Commerce": {
    id: "Website E-Commerce",
    en: "E-Commerce Website",
    de: "E-Commerce-Website"
  },
  "Platform e-commerce lengkap dengan fitur keranjang belanja, pembayaran, dan manajemen produk. Dibangun dengan Next.js dan Tailwind CSS untuk performa optimal.": {
    id: "Platform e-commerce lengkap dengan fitur keranjang belanja, pembayaran, dan manajemen produk. Dibangun dengan Next.js dan Tailwind CSS untuk performa optimal.",
    en: "A complete e-commerce platform with shopping cart, payment, and product management features. Built with Next.js and Tailwind CSS for optimal performance.",
    de: "Eine komplette E-Commerce-Plattform dengan Warenkorb-, Zahlungs- und Produktverwaltungsfunktionen. Erstellt mit Next.js und Tailwind CSS für optimale Leistung."
  },
  "A complete e-commerce platform with shopping cart, payment, and product management features. Built with Next.js and Tailwind CSS for optimal performance.": {
    id: "Platform e-commerce lengkap dengan fitur keranjang belanja, pembayaran, dan manajemen produk. Dibangun dengan Next.js dan Tailwind CSS untuk performa optimal.",
    en: "A complete e-commerce platform with shopping cart, payment, and product management features. Built with Next.js and Tailwind CSS for optimal performance.",
    de: "Eine komplette E-Commerce-Plattform mit Warenkorb-, Zahlungs- und Produktverwaltungsfunktionen. Erstellt mit Next.js und Tailwind CSS für optimale Leistung."
  },

  "Mobile Banking App": {
    id: "Aplikasi Mobile Banking",
    en: "Mobile Banking App",
    de: "Mobile-Banking-App"
  },
  "Aplikasi Mobile Banking": {
    id: "Aplikasi Mobile Banking",
    en: "Mobile Banking App",
    de: "Mobile-Banking-App"
  },
  "Aplikasi mobile banking dengan fitur transfer, pembayaran tagihan, dan monitoring transaksi secara real-time.": {
    id: "Aplikasi mobile banking dengan fitur transfer, pembayaran tagihan, dan monitoring transaksi secara real-time.",
    en: "A mobile banking application with features for transfers, bill payments, and real-time transaction monitoring.",
    de: "Eine Mobile-Banking-Anwendung mit Überweisungs-, Rechnungszahlungs- und Echtzeit-Transaktionsüberwachungsfunktionen."
  },
  "A mobile banking application with features for transfers, bill payments, and real-time transaction monitoring.": {
    id: "Aplikasi mobile banking dengan fitur transfer, pembayaran tagihan, dan monitoring transaksi secara real-time.",
    en: "A mobile banking application with features for transfers, bill payments, and real-time transaction monitoring.",
    de: "Eine Mobile-Banking-Anwendung mit Überweisungs-, Rechnungszahlungs- und Echtzeit-Transaktionsüberwachungsfunktionen."
  },

  "Dashboard Analytics": {
    id: "Dashboard Analitik",
    en: "Analytics Dashboard",
    de: "Analyse-Dashboard"
  },
  "Dashboard Analitik": {
    id: "Dashboard Analitik",
    en: "Analytics Dashboard",
    de: "Analyse-Dashboard"
  },
  "Dashboard interaktif untuk visualisasi data bisnis dengan grafik dan laporan yang komprehensif.": {
    id: "Dashboard interaktif untuk visualisasi data bisnis dengan grafik dan laporan yang komprehensif.",
    en: "An interactive dashboard for business data visualization with comprehensive charts and reports.",
    de: "Ein interaktives Dashboard zur Visualisierung von Geschäftsdaten mit umfassenden Diagrammen und Berichten."
  },
  "An interactive dashboard for business data visualization with comprehensive charts and reports.": {
    id: "Dashboard interaktif untuk visualisasi data bisnis dengan grafik dan laporan yang komprehensif.",
    en: "An interactive dashboard for business data visualization with comprehensive charts and reports.",
    de: "Ein interaktives Dashboard zur Visualisierung von Geschäftsdaten mit umfassenden Diagrammen und Berichten."
  },

  // Blog Titles
  "Memulai Karir sebagai Web Developer di 2024": {
    id: "Memulai Karir sebagai Web Developer di 2024",
    en: "Starting a Career as a Web Developer in 2024",
    de: "Karriere als Webentwickler im Jahr 2024 starten"
  },
  "Starting a Career as a Web Developer in 2024": {
    id: "Memulai Karir sebagai Web Developer di 2024",
    en: "Starting a Career as a Web Developer in 2024",
    de: "Karriere als Webentwickler im Jahr 2024 starten"
  },
  "Tips Optimasi Performa Website dengan Next.js": {
    id: "Tips Optimasi Performa Website dengan Next.js",
    en: "Website Performance Optimization Tips with Next.js",
    de: "Tipps zur Optimierung der Website-Performance dengan Next.js"
  },
  "Website Performance Optimization Tips with Next.js": {
    id: "Tips Optimasi Performa Website dengan Next.js",
    en: "Website Performance Optimization Tips with Next.js",
    de: "Tipps zur Optimierung der Website-Performance mit Next.js"
  },
  "Pentingnya UI/UX dalam Pengembangan Aplikasi": {
    id: "Pentingnya UI/UX dalam Pengembangan Aplikasi",
    en: "The Importance of UI/UX in App Development",
    de: "Die Bedeutung von UI/UX in der App-Entwicklung"
  },
  "The Importance of UI/UX in App Development": {
    id: "Pentingnya UI/UX dalam Pengembangan Aplikasi",
    en: "The Importance of UI/UX in App Development",
    de: "Die Bedeutung von UI/UX in der App-Entwicklung"
  },

  // Blog Excerpts
  "Panduan lengkap untuk memulai karir sebagai web developer, dari belajar dasar-dasar hingga mendapatkan pekerjaan pertama.": {
    id: "Panduan lengkap untuk memulai karir sebagai web developer, dari belajar dasar-dasar hingga mendapatkan pekerjaan pertama.",
    en: "A complete guide to starting a career as a web developer, from learning the basics to landing your first job.",
    de: "Ein kompletter Leitfaden für den Start einer Karriere als Webentwickler, vom Erlernen der Grundlagen bis zum ersten Job."
  },
  "A complete guide to starting a career as a web developer, from learning the basics to landing your first job.": {
    id: "Panduan lengkap untuk memulai karir sebagai web developer, dari belajar dasar-dasar hingga mendapatkan pekerjaan pertama.",
    en: "A complete guide to starting a career as a web developer, from learning the basics to landing your first job.",
    de: "Ein kompletter Leitfaden für den Start einer Karriere als Webentwickler, vom Erlernen der Grundlagen bis zum ersten Job."
  },
  "Pelajari cara mengoptimalkan performa website Next.js Anda dengan teknik-teknik terbaik.": {
    id: "Pelajari cara mengoptimalkan performa website Next.js Anda dengan teknik-teknik terbaik.",
    en: "Learn how to optimize your Next.js website performance with the best techniques.",
    de: "Erfahren Sie, wie Sie die Leistung Ihrer Next.js-Website mit den besten Techniken optimieren."
  },
  "Learn how to optimize your Next.js website performance with the best techniques.": {
    id: "Pelajari cara mengoptimalkan performa website Next.js Anda dengan teknik-teknik terbaik.",
    en: "Learn how to optimize your Next.js website performance with the best techniques.",
    de: "Erfahren Sie, wie Sie die Leistung Ihrer Next.js-Website mit den besten Techniken optimieren."
  },
  "Mengapa UI/UX sangat penting dalam pengembangan aplikasi dan bagaimana cara menerapkannya dengan baik.": {
    id: "Mengapa UI/UX sangat penting dalam pengembangan aplikasi dan bagaimana cara menerapkannya dengan baik.",
    en: "Why UI/UX is very important in application development and how to implement it well.",
    de: "Warum UI/UX bei der Anwendungsentwicklung sehr wichtig ist und wie man es gut umsetzt."
  },
  "Why UI/UX is very important in application development and how to implement it well.": {
    id: "Mengapa UI/UX sangat penting dalam pengembangan aplikasi dan bagaimana cara menerapkannya dengan baik.",
    en: "Why UI/UX is very important in application development and how to implement it well.",
    de: "Warum UI/UX bei der Anwendungsentwicklung sehr wichtig ist und wie man es gut umsetzt."
  },

  // Blog Content 1
  "Web development adalah salah satu bidang yang paling diminati saat ini. Dengan semakin banyaknya bisnis yang beralih ke platform digital, kebutuhan akan web developer terus meningkat.\n\n## Langkah Pertama: Pelajari Dasar-Dasar\n\nMulailah dengan mempelajari HTML, CSS, dan JavaScript. Ketiga teknologi ini adalah fondasi dari web development.\n\n## Framework Modern\n\nSetelah menguasai dasar-dasar, pelajari framework modern seperti React, Vue, atau Angular untuk frontend, dan Node.js, Express, atau Laravel untuk backend.\n\n## Bangun Portfolio\n\nBuat proyek-proyek kecil untuk mengisi portfolio Anda. Ini akan membantu Anda mendapatkan pekerjaan pertama.": {
    id: "Web development adalah salah satu bidang yang paling diminati saat ini. Dengan semakin banyaknya bisnis yang beralih ke platform digital, kebutuhan akan web developer terus meningkat.\n\n## Langkah Pertama: Pelajari Dasar-Dasar\n\nMulailah dengan mempelajari HTML, CSS, dan JavaScript. Ketiga teknologi ini adalah fondasi dari web development.\n\n## Framework Modern\n\nSetelah menguasai dasar-dasar, pelajari framework modern seperti React, Vue, atau Angular untuk frontend, dan Node.js, Express, atau Laravel untuk backend.\n\n## Bangun Portfolio\n\nBuat proyek-proyek kecil untuk mengisi portfolio Anda. Ini akan membantu Anda mendapatkan pekerjaan pertama.",
    en: "Web development is one of the most in-demand fields today. With more and more businesses moving to digital platforms, the need for web developers continues to rise.\n\n## First Step: Learn the Basics\n\nStart by learning HTML, CSS, and JavaScript. These three technologies are the foundation of web development.\n\n## Modern Frameworks\n\nAfter mastering the basics, learn modern frameworks like React, Vue, or Angular for the frontend, and Node.js, Express, or Laravel for the backend.\n\n## Build a Portfolio\n\nCreate small projects to fill your portfolio. This will help you land your first job.",
    de: "Webentwicklung ist heute einer der gefragtesten Bereiche. Da immer mehr Unternehmen auf digitale Plattformen umsteigen, steigt der Bedarf an Webentwicklern stetig.\n\n## Erster Schritt: Grundlagen lernen\n\nLernen Sie zunächst HTML, CSS und JavaScript. Diese drei Technologien sind die Grundlage der Webentwicklung.\n\n## Moderne Frameworks\n\nNachdem Sie die Grundlagen beherrschen, lernen Sie moderne Frameworks wie React, Vue oder Angular für das Frontend und Node.js, Express oder Laravel für das Backend.\n\n## Portfolio aufbauen\n\nErstellen Sie kleine Projekte, um Ihr Portfolio zu füllen. Dies wird Ihnen helfen, Ihren ersten Job zu bekommen."
  },
  "Web development is one of the most in-demand fields today. With more and more businesses moving to digital platforms, the need for web developers continues to rise.\n\n## First Step: Learn the Basics\n\nStart by learning HTML, CSS, and JavaScript. These three technologies are the foundation of web development.\n\n## Modern Frameworks\n\nAfter mastering the basics, learn modern frameworks like React, Vue, or Angular for the frontend, and Node.js, Express, or Laravel for the backend.\n\n## Build a Portfolio\n\nCreate small projects to fill your portfolio. This will help you land your first job.": {
    id: "Web development adalah salah satu bidang yang paling diminati saat ini. Dengan semakin banyaknya bisnis yang beralih ke platform digital, kebutuhan akan web developer terus meningkat.\n\n## Langkah Pertama: Pelajari Dasar-Dasar\n\nMulailah dengan mempelajari HTML, CSS, dan JavaScript. Ketiga teknologi ini adalah fondasi dari web development.\n\n## Framework Modern\n\nSetelah menguasai dasar-dasar, pelajari framework modern seperti React, Vue, atau Angular untuk frontend, dan Node.js, Express, atau Laravel untuk backend.\n\n## Bangun Portfolio\n\nBuat proyek-proyek kecil untuk mengisi portfolio Anda. Ini akan membantu Anda mendapatkan pekerjaan pertama.",
    en: "Web development is one of the most in-demand fields today. With more and more businesses moving to digital platforms, the need for web developers continues to rise.\n\n## First Step: Learn the Basics\n\nStart by learning HTML, CSS, and JavaScript. These three technologies are the foundation of web development.\n\n## Modern Frameworks\n\nAfter mastering the basics, learn modern frameworks like React, Vue, or Angular for the frontend, and Node.js, Express, or Laravel for the backend.\n\n## Build a Portfolio\n\nCreate small projects to fill your portfolio. This will help you land your first job.",
    de: "Webentwicklung ist heute einer der gefragtesten Bereiche. Da immer mehr Unternehmen auf digitale Plattformen umsteigen, steigt der Bedarf an Webentwicklern stetig.\n\n## Erster Schritt: Grundlagen lernen\n\nLernen Sie zunächst HTML, CSS and JavaScript. Diese drei Technologien sind die Grundlage der Webentwicklung.\n\n## Moderne Frameworks\n\nNachdem Sie die Grundlagen beherrschen, lernen Sie moderne Frameworks wie React, Vue oder Angular für das Frontend und Node.js, Express oder Laravel für das Backend.\n\n## Portfolio aufbauen\n\nErstellen Sie kleine Projekte, um Ihr Portfolio zu füllen. Dies wird Ihnen helfen, Ihren ersten Job zu bekommen."
  },

  // Blog Content 2
  "Next.js adalah framework React yang powerful untuk membangun website dengan performa tinggi. Berikut adalah tips untuk mengoptimalkan website Next.js Anda.\n\n## Image Optimization\n\nGunakan komponen Image dari Next.js untuk mengoptimalkan gambar secara otomatis.\n\n## Code Splitting\n\nNext.js secara otomatis melakukan code splitting, tetapi Anda bisa mengoptimalkannya lebih lanjut dengan dynamic imports.\n\n## Caching Strategy\n\nImplementasikan strategi caching yang tepat untuk meningkatkan waktu loading.": {
    id: "Next.js adalah framework React yang powerful untuk membangun website dengan performa tinggi. Berikut adalah tips untuk mengoptimalkan website Next.js Anda.\n\n## Image Optimization\n\nGunakan komponen Image dari Next.js untuk mengoptimalkan gambar secara otomatis.\n\n## Code Splitting\n\nNext.js secara otomatis melakukan code splitting, tetapi Anda bisa mengoptimalkannya lebih lanjut dengan dynamic imports.\n\n## Caching Strategy\n\nImplementasikan strategi caching yang tepat untuk meningkatkan waktu loading.",
    en: "Next.js is a powerful React framework for building high-performance websites. Here are tips to optimize your Next.js website.\n\n## Image Optimization\n\nUse the Image component from Next.js to optimize images automatically.\n\n## Code Splitting\n\nNext.js automatically does code splitting, but you can optimize it further with dynamic imports.\n\n## Caching Strategy\n\nImplement appropriate caching strategies to improve loading times.",
    de: "Next.js ist ein leistungsstarkes React-Framework für die Erstellung hochperformanter Websites. Hier sind Tipps zur Optimierung Ihrer Next.js-Website.\n\n## Bildoptimierung\n\nVerwenden Sie die Image-Komponente von Next.js, um Bilder automatisch zu optimieren.\n\n## Code-Splitting\n\nNext.js führt automatisch Code-Splitting durch, aber Sie können dies mit dynamischen Importen weiter optimieren.\n\n## Caching-Strategie\n\nImplementieren Sie geeignete Caching-Strategien, um die Ladezeiten zu verkürzen."
  },
  "Next.js is a powerful React framework for building high-performance websites. Here are tips to optimize your Next.js website.\n\n## Image Optimization\n\nUse the Image component from Next.js to optimize images automatically.\n\n## Code Splitting\n\nNext.js automatically does code splitting, but you can optimize it further with dynamic imports.\n\n## Caching Strategy\n\nImplement appropriate caching strategies to improve loading times.": {
    id: "Next.js adalah framework React yang powerful untuk membangun website dengan performa tinggi. Berikut adalah tips untuk mengoptimalkan website Next.js Anda.\n\n## Image Optimization\n\nGunakan komponen Image dari Next.js untuk mengoptimalkan gambar secara otomatis.\n\n## Code Splitting\n\nNext.js secara otomatis melakukan code splitting, tetapi Anda bisa mengoptimalkannya lebih lanjut dengan dynamic imports.\n\n## Caching Strategy\n\nImplementasikan strategi caching yang tepat untuk meningkatkan waktu loading.",
    en: "Next.js is a powerful React framework for building high-performance websites. Here are tips to optimize your Next.js website.\n\n## Image Optimization\n\nUse the Image component from Next.js to optimize images automatically.\n\n## Code Splitting\n\nNext.js automatically does code splitting, but you can optimize it further with dynamic imports.\n\n## Caching Strategy\n\nImplement appropriate caching strategies to improve loading times.",
    de: "Next.js ist ein leistungsstarkes React-Framework für die Erstellung hochperformanter Websites. Hier sind Tipps zur Optimierung Ihrer Next.js-Website.\n\n## Bildoptimierung\n\nVerwenden Sie die Image-Komponente von Next.js, um Bilder automatisch zu optimieren.\n\n## Code-Splitting\n\nNext.js führt automatisch Code-Splitting durch, aber Sie können dies mit dynamischen Importen weiter optimieren.\n\n## Caching-Strategie\n\nImplementieren Sie geeignete Caching-Strategien, um die Ladezeiten zu verkürzen."
  },

  // Blog Content 3
  "UI/UX adalah aspek yang sering diabaikan dalam pengembangan aplikasi, padahal sangat penting untuk kesuksesan produk.\n\n## Apa itu UI/UX?\n\nUI (User Interface) adalah tampilan visual dari aplikasi, sedangkan UX (User Experience) adalah pengalaman pengguna saat menggunakan aplikasi.\n\n## Mengapa Penting?\n\nAplikasi dengan UI/UX yang baik akan meningkatkan kepuasan pengguna dan retensi.\n\n## Best Practices\n\n- Konsisten dalam desain\n- Fokus pada kebutuhan pengguna\n- Lakukan user testing": {
    id: "UI/UX adalah aspek yang sering diabaikan dalam pengembangan aplikasi, padahal sangat penting untuk kesuksesan produk.\n\n## Apa itu UI/UX?\n\nUI (User Interface) adalah tampilan visual dari aplikasi, sedangkan UX (User Experience) adalah pengalaman pengguna saat menggunakan aplikasi.\n\n## Mengapa Penting?\n\nAplikasi dengan UI/UX yang baik akan meningkatkan kepuasan pengguna dan retensi.\n\n## Best Practices\n\n- Konsisten dalam desain\n- Fokus pada kebutuhan pengguna\n- Lakukan user testing",
    en: "UI/UX is an aspect often overlooked in application development, even though it is crucial for a product's success.\n\n## What is UI/UX?\n\nUI (User Interface) is the visual look of the application, while UX (User Experience) is the user experience when using the application.\n\n## Why is it Important?\n\nApplications with good UI/UX will increase user satisfaction and retention.\n\n## Best Practices\n\n- Consistency in design\n- Focus on user needs\n- Perform user testing",
    de: "UI/UX ist ein Aspekt, der bei der Anwendungsentwicklung oft übersehen wird, obwohl er für den Erfolg eines Produkts entscheidend ist.\n\n## Was ist UI/UX?\n\nUI (User Interface) ist das visuelle Erscheinungsbild der Anwendung, während UX (User Experience) die Erfahrung des Benutzers bei der Verwendung der Anwendung ist.\n\n## Warum ist es wichtig?\n\nAnwendungen mit einer guten UI/UX erhöhen die Benutzerzufriedenheit und die Benutzerbindung.\n\n## Best Practices\n\n- Konsistenz im Design\n- Fokus auf Benutzerbedürfnisse\n- Benutzertests durchführen"
  },
  "UI/UX is an aspect often overlooked in application development, even though it is crucial for a product's success.\n\n## What is UI/UX?\n\nUI (User Interface) is the visual look of the application, while UX (User Experience) is the user experience when using the application.\n\n## Why is it Important?\n\n// UI/UX is an aspect often...": {
    id: "UI/UX adalah aspek yang sering diabaikan dalam pengembangan aplikasi, padahal sangat penting untuk kesuksesan produk.\n\n## Apa itu UI/UX?\n\nUI (User Interface) adalah tampilan visual dari aplikasi, sedangkan UX (User Experience) adalah pengalaman pengguna saat menggunakan aplikasi.\n\n## Mengapa Penting?\n\nAplikasi dengan UI/UX yang baik akan meningkatkan kepuasan pengguna dan retensi.\n\n## Best Practices\n\n- Konsisten dalam desain\n- Fokus pada kebutuhan pengguna\n- Lakukan user testing",
    en: "UI/UX is an aspect often overlooked in application development, even though it is crucial for a product's success.\n\n## What is UI/UX?\n\nUI (User Interface) is the visual look of the application, while UX (User Experience) is the user experience when using the application.\n\n## Why is it Important?\n\nApplications with good UI/UX will increase user satisfaction and retention.\n\n## Best Practices\n\n- Consistency in design\n- Focus on user needs\n- Perform user testing",
    de: "UI/UX ist ein Aspekt, der bei der Anwendungsentwicklung oft übersehen wird, obwohl er für den Erfolg eines Produkts entscheidend ist.\n\n## Was ist UI/UX?\n\nUI (User Interface) ist das visuelle Erscheinungsbild der Anwendung, während UX (User Experience) die Erfahrung des Benutzers bei der Verwendung der Anwendung ist.\n\n## Warum ist es wichtig?\n\nAnwendungen mit einer guten UI/UX erhöhen die Benutzerzufriedenheit und die Benutzerbindung.\n\n## Best Practices\n\n- Konsistenz im Design\n- Fokus auf Benutzerbedürfnisse\n- Benutzertests durchführen"
  },

  // Missing Translation Keys
  "Location": { id: "Lokasi", en: "Location", de: "Standort" },
  "Surabaya, Jawa Timur, Indonesia": {
    id: "Surabaya, Jawa Timur, Indonesia",
    en: "Surabaya, East Java, Indonesia",
    de: "Surabaya, Ost-Java, Indonesien"
  },
  "Back to Portfolio": {
    id: "Kembali ke Portofolio",
    en: "Back to Portfolio",
    de: "Zurück zum Portfolio"
  },
  "Back to Experience": {
    id: "Kembali ke Pengalaman",
    en: "Back to Experience",
    de: "Zurück zur Erfahrung"
  },
  "Back to Main Page": {
    id: "Kembali ke Halaman Utama",
    en: "Back to Main Page",
    de: "Zurück zur Hauptseite"
  },
  "Visit": { id: "Kunjungi", en: "Visit", de: "Besuchen" },
  "Code": { id: "Kode", en: "Code", de: "Code" },
  "min.read": { id: "menit baca", en: "min read", de: "Min. Lesedauer" },
  "min": { id: "menit", en: "min", de: "Min." },
  "more": { id: "lebih banyak", en: "more", de: "weitere" },
  "Generating PDF...": {
    id: "Membuat PDF...",
    en: "Generating PDF...",
    de: "PDF wird generiert..."
  },
  "Download Portfolio (PDF)": {
    id: "Unduh Portofolio (PDF)",
    en: "Download Portfolio (PDF)",
    de: "Portfolio herunterladen (PDF)"
  },
  "Failed to generate PDF. Please try again later.": {
    id: "Gagal membuat PDF. Silakan coba beberapa saat lagi.",
    en: "Failed to generate PDF. Please try again later.",
    de: "Fehler beim Generieren der PDF. Bitte versuchen Sie es später noch einmal."
  },
  "Hey I'm": {
    id: "Halo Saya",
    en: "Hey I'm",
    de: "Hallo, ich bin"
  },
  "Tech Stack & Skills": {
    id: "Keahlian & Teknologi",
    en: "Tech Stack & Skills",
    de: "Tech Stack & Fähigkeiten"
  },
  "Education": {
    id: "Pendidikan",
    en: "Education",
    de: "Ausbildung"
  },
  "Experiences": {
    id: "Pengalaman",
    en: "Experiences",
    de: "Erfahrungen"
  },
  "Licenses & Certifications": {
    id: "Lisensi & Sertifikasi",
    en: "Licenses & Certifications",
    de: "Lizenzen & Zertifizierungen"
  },
  "Achievements": {
    id: "Prestasi",
    en: "Achievements",
    de: "Erfolge"
  },
  "Volunteer Experience": {
    id: "Pengalaman Sukarelawan",
    en: "Volunteer Experience",
    de: "Ehrenamtliche Erfahrung"
  },
  "Download CV (PDF)": {
    id: "Unduh CV (PDF)",
    en: "Download CV (PDF)",
    de: "Lebenslauf herunterladen (PDF)"
  },
  "LinkedIn Profile": {
    id: "Profil LinkedIn",
    en: "LinkedIn Profile",
    de: "LinkedIn Profil"
  },
  "Phone / WhatsApp": {
    id: "Telepon / WhatsApp",
    en: "Phone / WhatsApp",
    de: "Telefon / WhatsApp"
  },
  "Loading CV Data...": {
    id: "Memuat data CV...",
    en: "Loading CV Data...",
    de: "CV-Daten werden geladen..."
  },
  "GPA / Grade": {
    id: "IPK / Nilai",
    en: "GPA / Grade",
    de: "GPA / Note"
  },
  "cv.defaultBio": {
    id: "Seorang mahasiswa Sistem Informasi dengan passion dalam pengembangan web, pengembangan perangkat lunak, dan kecerdasan buatan. Berpengalaman bekerja dalam tim dengan komunikasi yang kuat, teliti, dan dapat diandalkan. Memiliki pendekatan dinamis dalam menyelesaikan masalah di dunia pemrograman.",
    en: "An Information Systems student with a passion for web development, software engineering, and artificial intelligence. Experienced in working in teams with strong communication, detail-oriented, and reliable. Has a dynamic approach to problem-solving in the programming world.",
    de: "Ein Wirtschaftsinformatik-Student mit einer Leidenschaft für Webentwicklung, Software Engineering und Künstliche Intelligenz. Erfahren in der Teamarbeit mit starker Kommunikation, detailorientiert und zuverlässig. Besitzt einen dynamischen Ansatz zur Problemlösung in der Welt der Programmierung."
  }
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
    if (!key) return "";
    const trimmedKey = key.trim();
    if (!translations[trimmedKey]) return key;
    return translations[trimmedKey][language] || translations[trimmedKey]["en"] || key;
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
