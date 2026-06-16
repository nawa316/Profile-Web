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
      
      const content = pdfRef.current.innerHTML;
      const printWindow = window.open('', '_blank');
      
      if (!printWindow) {
        alert("Please allow popups for this site to generate the PDF.");
        setIsGenerating(false);
        return;
      }
      
      // Copy styles from the current document to ensure Tailwind works
      const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
        .map(node => node.outerHTML)
        .join('');
        
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Awan_Portfolio</title>
            ${styles}
            <style>
              @media print {
                @page { margin: 0; size: A4 portrait; }
                body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              }
              body { background-color: white; }
            </style>
          </head>
          <body>
            ${content}
          </body>
        </html>
      `);
      
      printWindow.document.close();
      printWindow.focus();
      
      // Wait slightly for fonts and styles to load before triggering print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        setIsGenerating(false);
      }, 750);
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again later.");
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
      <div className="fixed -left-[9999px] top-0 opacity-0 pointer-events-none">
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
