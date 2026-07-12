import type { Metadata } from "next";
import { DM_Serif_Text, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSerifText = DM_Serif_Text({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif-text",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Ade Dzakwan",
  description: "Profile Web",
};

import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTop from "@/components/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerifText.variable} ${playfairDisplay.variable}`}>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <ScrollProgressBar />
            {children}
            <ScrollToTop />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
