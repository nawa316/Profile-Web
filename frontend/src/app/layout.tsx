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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerifText.variable} ${playfairDisplay.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
