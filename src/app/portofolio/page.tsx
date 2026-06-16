import React from "react";
import { PortfolioModel } from "@/lib/db/models/Portfolio";
import { ExperienceModel } from "@/lib/db/models/Experience";
import { ProfileModel } from "@/lib/db/models/Profile";
import PortfolioClient from "./PortfolioClient";
import { Portfolio, Experience, Profile } from "@/lib/types";

// Revalidate cache every hour (3600 seconds)
export const revalidate = 3600;

export default async function PortfolioPage() {
  let portfolioData: Portfolio[] = [];
  let experienceData: Experience[] = [];
  let profileData: Profile | null = null;
  try {
    // Fetch directly from database model in Server Component
    portfolioData = await PortfolioModel.findAll();
    experienceData = await ExperienceModel.findAll();
    profileData = await ProfileModel.get();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }

  return <PortfolioClient initialData={portfolioData} experienceData={experienceData} profileData={profileData} />;
}

