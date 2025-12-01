"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Button Hamburger */}
      <button
        className="flex flex-col justify-between w-10 h-8 z-50 relative"
        onClick={toggleMenu}
      >
        <motion.div
          className="w-10 h-1 bg-white rounded origin-left"
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-10 h-1 bg-white rounded"
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-10 h-1 bg-white rounded origin-left"
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </button>

      {/* Menu */}
      <motion.div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex flex-col items-center justify-center gap-6 transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ duration: 0.5 }}
      >
        <a href="#" className="text-white text-2xl">
          Home
        </a>
        <a href="#" className="text-white text-2xl">
          About
        </a>
        <a href="#" className="text-white text-2xl">
          Services
        </a>
        <a href="#" className="text-white text-2xl">
          Contact
        </a>
      </motion.div>
    </div>
  );
}
