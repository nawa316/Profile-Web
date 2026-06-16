"use client";

import React, { useState, useRef } from "react";
import { Download, Loader2 } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { PDFTemplate } from "./pdf/PDFTemplate";
import { Portfolio, Experience, Profile } from "@/lib/types";

interface DownloadPDFButtonProps {
  portfolioData: Portfolio[];
  experienceData: Experience[];
  profileData: Profile | null;
}

export default function DownloadPDFButton({ portfolioData, experienceData, profileData }: DownloadPDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!pdfRef.current) return;
    
    try {
      setIsGenerating(true);
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      // Find all pages inside the template
      const pages = pdfRef.current.querySelectorAll("[data-pdf-page]");
      
      for (let i = 0; i < pages.length; i++) {
        const pageElement = pages[i] as HTMLElement;
        
        const canvas = await html2canvas(pageElement, {
          scale: 2, // Higher scale for better quality
          useCORS: true, // Important for external images
          logging: false,
          backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        
        // A4 format dimensions in px (at 96 DPI: 794x1123)
        // jsPDF with format 'a4' and unit 'px' will use 445.9 x 630.9 as internal dimension?
        // Let's get internal dimensions to be safe:
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        if (i > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      }
      
      pdf.save("Nawa_Portfolio.pdf");
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generating PDF...</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>Download Portfolio (PDF)</span>
          </>
        )}
      </button>

      {/* Hidden PDF Template Container */}
      <div className="overflow-hidden w-0 h-0 absolute pointer-events-none">
        <PDFTemplate 
          ref={pdfRef} 
          portfolioData={portfolioData} 
          experienceData={experienceData} 
          profileData={profileData}
        />
      </div>
    </>
  );
}
