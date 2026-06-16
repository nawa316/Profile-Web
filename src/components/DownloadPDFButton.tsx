"use client";

import React, { useState, useRef } from "react";
import { Download, Loader2 } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { PDFTemplate } from "./pdf/PDFTemplate";
import { Portfolio, Experience, Profile } from "@/lib/types";

interface DownloadPDFButtonProps {
  portfolioData: Portfolio[];
  experienceData: Experience[];
  profileData: Profile | null;
}

export default function DownloadPDFButton({ portfolioData, experienceData, profileData }: DownloadPDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "Awan_Portfolio",
    onBeforePrint: () => {
      setIsGenerating(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsGenerating(false);
    },
    onPrintError: () => {
      setIsGenerating(false);
      alert("Failed to generate PDF. Please try again later.");
    }
  });

  return (
    <>
      <button
        onClick={() => handlePrint()}
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
      <div className="hidden">
        <PDFTemplate 
          ref={contentRef} 
          portfolioData={portfolioData} 
          experienceData={experienceData} 
          profileData={profileData}
        />
      </div>
    </>
  );
}
