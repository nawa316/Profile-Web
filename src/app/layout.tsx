import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, DM_Serif_Text } from "next/font/google";

const playfair_display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: "400",
});

const dm_serif_text = DM_Serif_Text({
  subsets: ["latin"],
  variable: "--font-dm-serif-text",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Muhammad Ade Dzakwan",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair_display.variable}, ${dm_serif_text.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
