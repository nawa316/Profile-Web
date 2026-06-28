"use client";
import React from "react";
import HamburgerMenu from "@/components/HamburgerMenu";
import Link from "next/link";

export default function Navbar() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Experience", href: "/experience" },
    { name: "Portfolio", href: "/portofolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="flex w-full items-center flex-row justify-between fixed px-6 py-4 top-0 z-50 bg-[#6b8af6] md:px-12">
      <Link href="/" className="text-3xl font-bold dm_serif_text text-white hover:text-gray-200 transition-colors">
        Awan
      </Link>
      
      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-white hover:text-gray-200 transition-colors dm_serif_text text-lg"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <HamburgerMenu />
      </div>
    </nav>
  );
}

