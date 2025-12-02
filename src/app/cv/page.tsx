'use client';
import React from 'react';
import { Download, Mail, Phone, Linkedin, MapPin, ArrowLeft } from 'lucide-react';
import CustomCursor from '../components/CustomCursor';
import Link from 'next/link';

export default function CVPage() {
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 mb-6 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali ke Halaman Utama</span>
        </Link>
        {/* Header with Download Button */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 sm:px-8 py-8 sm:py-12 text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Muhammad Ade Dzakwan</h1>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm mb-6">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Surabaya, Jawa Timur</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>0895-1360-1357</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:muhammadadedzakwan@gmail.com" className="hover:underline">
                  muhammadadedzakwan@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin size={16} />
                <a 
                  href="https://linkedin.com/in/muhammad-ade-dzakwan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
            <a
              href="/CV Muhammad Ade Dzakwan.pdf"
              download
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-50 transition-colors shadow-lg w-full sm:w-auto"
            >
              <Download size={18} className="sm:w-5 sm:h-5" />
              Download CV (PDF)
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          {/* About Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 border-b-2 border-blue-600 pb-2">
              Tentang Saya
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Seorang mahasiswa Sistem Informasi dengan passion dalam pengembangan web, 
              pengembangan perangkat lunak, dan kecerdasan buatan. Berpengalaman bekerja 
              dalam tim dengan komunikasi yang kuat, teliti, dan dapat diandalkan. 
              Memiliki pendekatan dinamis dalam menyelesaikan masalah di dunia pemrograman.
            </p>
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 border-b-2 border-blue-600 pb-2">
              Pendidikan
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-3 sm:pl-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Institut Teknologi Sepuluh Nopember
                </h3>
                <p className="text-sm sm:text-base text-gray-600 italic mb-2">
                  S1 Sistem Informasi (Agustus 2023 – Sekarang)
                </p>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700">
                  <li>IPK/IPS: 3,64 / 3,50</li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-500 pl-3 sm:pl-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  SMA Negeri 1 Tenggarang
                </h3>
                <p className="text-sm sm:text-base text-gray-600 italic mb-2">
                  Jurusan MIPA (Juli 2020 – Mei 2023)
                </p>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700">
                  <li>Nilai Ujian Sekolah: 90,01</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Certifications Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 border-b-2 border-blue-600 pb-2">
              Lisensi & Sertifikasi
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                  PMI Project Management Ready™ 2025
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Project Management, Business Analysis, Agile (Scrum), Waterfall
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                  Frontend GENICS 2024
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  HTML, Tailwind CSS, React JS, Next.js
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                  IT Mentoring Frontend & UI/UX — ISE! 2023
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Figma, HTML, Tailwind CSS, React JS
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                  Dicoding Academy Batch 9 — 2023
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  SQL, MySQL, Git & GitHub
                </p>
              </div>
            </div>
          </section>

          {/* Organization Experience Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 border-b-2 border-blue-600 pb-2">
              Pengalaman Organisasi
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-3 sm:pl-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Ketua Divisi IT Development — ISE! 2025
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2">(2025)</p>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                  <li>Memimpin 20+ tim development</li>
                  <li>Scrum Master & task management</li>
                  <li>Deployment & server administration</li>
                </ul>
              </div>
              <div className="border-l-4 border-green-500 pl-3 sm:pl-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Staff Ahli Kajian Strategis — JMMI ITS 2025
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2">(2025)</p>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                  <li>Menjalankan agenda kajian</li>
                  <li>Output poster & artikel</li>
                  <li>Kajian isu-isu Islam</li>
                </ul>
              </div>
              <div className="border-l-4 border-green-500 pl-3 sm:pl-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Staff IT Development — Ini Lho ITS! 2025
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2">(2024)</p>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                  <li>Whitebox testing & unit test</li>
                  <li>Laporan testing</li>
                </ul>
              </div>
              <div className="border-l-4 border-green-500 pl-3 sm:pl-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Staff IT Development — ISE! 2024
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2">(2024)</p>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                  <li>Slicing desain</li>
                  <li>Integrasi API</li>
                  <li>Bug fixing UI</li>
                </ul>
              </div>
              <div className="border-l-4 border-green-500 pl-3 sm:pl-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Ketua Pelaksana — Ini Lho ITS! Forum Daerah Bondowoso 2024
                </h3>
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 mt-2">
                  <li>Koordinasi acara 500+ peserta</li>
                  <li>Jobdesk panitia</li>
                  <li>Arahan & tugas panitia</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Achievements Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 border-b-2 border-blue-600 pb-2">
              Prestasi
            </h2>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0"></div>
                <p className="text-sm sm:text-base text-gray-700">Juara 1 OSN-K Fisika Bondowoso 2022</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0"></div>
                <p className="text-sm sm:text-base text-gray-700">Juara 2 OSN-K Fisika Bondowoso 2021</p>
              </div>
            </div>
          </section>

          {/* Volunteer Experience Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 border-b-2 border-blue-600 pb-2">
              Pengalaman Sukarelawan
            </h2>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-500 flex-shrink-0"></div>
                <p className="text-sm sm:text-base text-gray-700">Mentor — Mentoring Agama Islam ITS 2025</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-500 flex-shrink-0"></div>
                <p className="text-sm sm:text-base text-gray-700">Mentor — SIMETRI 2024</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-500 flex-shrink-0"></div>
                <p className="text-sm sm:text-base text-gray-700">Volunteer — SINERGI Batch X 2023</p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer with another download button */}
        <div className="mt-6 sm:mt-8 text-center">
          <a
            href="/CV Muhammad Ade Dzakwan.pdf"
            download
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 transition-colors shadow-lg w-full sm:w-auto"
          >
            <Download size={18} className="sm:w-5 sm:h-5" />
            Download CV (PDF)
          </a>
        </div>
      </div>
    </div>
    </>
  );
}
