"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  altText?: string;
}

export default function ImageModal({ isOpen, onClose, imageUrl, altText = "Image" }: ImageModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-pointer backdrop-blur-sm"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-[110] bg-black/50 p-2 rounded-full"
            aria-label="Close"
          >
            <FaTimes size={24} />
          </button>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-full max-w-6xl max-h-[85vh] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imageUrl}
              alt={altText}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
