"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
const heroImagesContent = [
  {
    src: "/image/gudeg.webp",
    alt: "Gudeg",
    caption: "Gudeg khas Yogyakarta",
  },
  {
    src: "/image/rawon.webp",
    alt: "Rawon",
    caption: "Rawon khas Jawa Timur",
  },
  {
    src: "/image/rendang.webp",
    alt: "Rendang",
    caption: "Rendang khas Sumatera",
  },
];

const shimmer = `
  <svg width="700" height="475" xmlns="http://www.w3.org/2000/svg">
    <rect width="700" height="475" fill="#f3f3f3"/>
    <rect id="r" width="700" height="475" fill="#ecebeb"/>
    <animate xlink:href="#r" attributeName="x" from="-700" to="700" dur="1s" repeatCount="indefinite" />
  </svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === heroImagesContent.length - 1 ? 0 : prev + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container z-10 flex gap-8 justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <Image
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer)}`}
            src={heroImagesContent[currentIndex].src}
            alt={heroImagesContent[currentIndex].alt}
            width={300}
            height={300}
            className="rounded-full mb-4 opacity-90 hover:opacity-100 shadow-lg transition-all duration-300"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center max-w-2/3 font-semibold font-serif text-4xl"
          >
            <span className="text-primary">
              {heroImagesContent[currentIndex].caption.split(" ")[0]}{" "}
            </span>
            {heroImagesContent[currentIndex].caption
              .split(" ")
              .slice(1)
              .join(" ")}
          </motion.h1>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
