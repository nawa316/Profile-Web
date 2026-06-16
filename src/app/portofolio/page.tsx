import React from "react";
import { PortfolioModel } from "@/lib/db/models/Portfolio";
import PortfolioClient from "./PortfolioClient";

import { Portfolio } from "@/lib/types";

// Revalidate cache every hour (3600 seconds)
export const revalidate = 3600;

export default async function PortfolioPage() {
  let portfolioData: Portfolio[] = [];
  try {
    // Fetch directly from database model in Server Component
    // This skips the API route network hop and allows Next.js to cache the result
    portfolioData = await PortfolioModel.findAll();
  } catch (error) {
    console.error("Failed to fetch portfolio:", error);
  }

  return <PortfolioClient initialData={portfolioData} />;
}

