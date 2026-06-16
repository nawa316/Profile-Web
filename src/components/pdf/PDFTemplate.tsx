"use client";

import React, { forwardRef } from "react";
import { Portfolio, Experience, Profile } from "@/lib/types";

interface PDFTemplateProps {
  portfolioData: Portfolio[];
  experienceData: Experience[];
  profileData: Profile | null;
}

// A4 Dimensions: 794px by 1123px (at 96 DPI)
const A4_WIDTH = "794px";
const A4_HEIGHT = "1123px";

export const PDFTemplate = forwardRef<HTMLDivElement, PDFTemplateProps>(
  ({ portfolioData, experienceData, profileData }, ref) => {
    // We will show up to 6 portfolio items in the main portfolio page
    const displayPortfolios = portfolioData.slice(0, 6);

    return (
      <div
        ref={ref}
        className="absolute top-0 left-0 -z-50 opacity-0 pointer-events-none"
        style={{ width: A4_WIDTH }}
      >
        {/* Page 1: Profile & Skills */}
        <div
          className="bg-gray-50 flex flex-col justify-between p-12"
          style={{ width: A4_WIDTH, height: A4_HEIGHT, boxSizing: "border-box" }}
          data-pdf-page="1"
        >
          <div className="flex justify-between items-start">
            <div className="w-2/3 pr-8">
              <h1 className="text-6xl font-extrabold text-gray-900 leading-tight mb-2">
                Hey I&apos;m <br />
                <span className="text-indigo-600">Nawa</span>
              </h1>
              <h2 className="text-2xl font-bold text-gray-600 mb-8 tracking-wide">
                FULLSTACK DEVELOPER
              </h2>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-indigo-600 inline-block">
                  About Me
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  I am a passionate software developer with expertise in building scalable
                  web applications. I love crafting beautiful and functional user interfaces
                  and robust backend systems. Always eager to learn new technologies and
                  solve complex problems.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-indigo-600 inline-block">
                  Tech Stack & Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Supabase"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-1/3 flex justify-end">
              <div className="w-48 h-48 bg-indigo-100 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={profileData?.photo_url || "/images/pp.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          </div>
          
          {/* Footer Contact */}
          <div className="mt-auto border-t pt-6 flex justify-between text-xs text-gray-500 font-medium">
            <span>WA: +62 812-3456-7890</span>
            <span>Email: hello@example.com</span>
            <span>LinkedIn: /in/nawa</span>
            <span>GitHub: github.com/nawa</span>
          </div>
        </div>

        {/* Page 2: Experiences & Education */}
        <div
          className="bg-gray-50 flex flex-col justify-between p-12"
          style={{ width: A4_WIDTH, height: A4_HEIGHT, boxSizing: "border-box" }}
          data-pdf-page="2"
        >
          <div className="flex gap-12">
            {/* Left Col: Photo & Education */}
            <div className="w-1/3">
              <div className="w-full aspect-[3/4] bg-gray-200 rounded-xl overflow-hidden mb-8 shadow-md">
                <img
                  src={profileData?.photo_url || "/images/pp.png"}
                  alt="Formal Profile"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                  crossOrigin="anonymous"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-indigo-600 inline-block">
                Education
              </h3>
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 text-sm">Institut Teknologi Sepuluh Nopember</h4>
                <p className="text-xs text-gray-500 mb-1">Information Systems</p>
                <p className="text-xs font-semibold text-indigo-600">2023 - Present</p>
              </div>
            </div>
            
            {/* Right Col: Experiences */}
            <div className="w-2/3">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-indigo-600 inline-block uppercase tracking-wider">
                Experiences
              </h3>
              <div className="space-y-6">
                {experienceData.slice(0, 4).map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-gray-200">
                    <div className="absolute w-3 h-3 bg-indigo-600 rounded-full -left-[7px] top-1.5"></div>
                    <h4 className="text-base font-bold text-gray-800">{exp.role}</h4>
                    <h5 className="text-sm font-semibold text-gray-600">{exp.organization}</h5>
                    <p className="text-xs font-semibold text-indigo-600 mb-2">
                      {exp.start_date ? String(exp.start_date) : ""} - {exp.end_date ? String(exp.end_date) : "Present"}
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-auto border-t pt-6 flex justify-between text-xs text-gray-500 font-medium">
            <span>WA: +62 812-3456-7890</span>
            <span>Email: hello@example.com</span>
            <span>LinkedIn: /in/nawa</span>
            <span>GitHub: github.com/nawa</span>
          </div>
        </div>

        {/* Page 3: Portfolio */}
        <div
          className="bg-gray-50 flex flex-col justify-between p-12"
          style={{ width: A4_WIDTH, height: A4_HEIGHT, boxSizing: "border-box" }}
          data-pdf-page="3"
        >
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 uppercase tracking-widest text-center">
              Portfolio
            </h2>
            <div className="grid grid-cols-2 gap-8">
              {displayPortfolios.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  <div className="h-40 bg-gray-200 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-3 mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-auto border-t pt-6 flex justify-between text-xs text-gray-500 font-medium">
            <span>WA: +62 812-3456-7890</span>
            <span>Email: hello@example.com</span>
            <span>LinkedIn: /in/nawa</span>
            <span>GitHub: github.com/nawa</span>
          </div>
        </div>
      </div>
    );
  }
);

PDFTemplate.displayName = "PDFTemplate";
