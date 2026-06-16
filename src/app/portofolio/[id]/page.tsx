import React from "react";
import { PortfolioModel } from "@/lib/db/models/Portfolio";
import Link from "next/link";
import PortfolioDetailClient from "./PortfolioDetailClient";

export const revalidate = 3600;

export default async function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = await params;
  const portfolioId = parseInt(unwrappedParams.id, 10);
  
  if (isNaN(portfolioId)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex flex-col items-center justify-center">
        <p className="text-white text-2xl mb-6">Invalid Portfolio ID.</p>
        <Link href="/portofolio" className="px-6 py-3 bg-[#6b8af6] hover:bg-[#5a76e0] transition-colors text-white rounded-full font-medium">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  let portfolio = null;
  try {
    portfolio = await PortfolioModel.findById(portfolioId);
  } catch (error) {
    console.error("Failed to fetch portfolio detail:", error);
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex flex-col items-center justify-center">
        <p className="text-white text-2xl mb-6">Portfolio not found.</p>
        <Link href="/portofolio" className="px-6 py-3 bg-[#6b8af6] hover:bg-[#5a76e0] transition-colors text-white rounded-full font-medium">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return <PortfolioDetailClient portfolio={portfolio} />;
}
