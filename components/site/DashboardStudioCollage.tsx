"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  "/dashboard-studio-1.png",
  "/dashboard-studio-2.png",
  "/dashboard-studio-3.png",
];

export default function DashboardStudioCollage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full flex flex-col min-h-0">
      <div
        className="rounded-2xl p-3 flex-1 min-h-0"
        style={{
          background: "rgba(10,16,43,0.78)",
          border: "1px solid rgba(100,150,255,0.22)",
        }}
      >
        <div className="relative h-full min-h-[144px] overflow-hidden rounded-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={images[activeIndex]}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={images[activeIndex]}
                alt="Dashboard Studio example"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-2.5 flex justify-center gap-2">
        {images.map((src, idx) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className="h-2.5 w-2.5 rounded-full transition-all"
            style={{
              border:
                idx === activeIndex
                  ? "1px solid rgba(0,240,255,0.95)"
                  : "1px solid rgba(100,150,255,0.45)",
              background:
                idx === activeIndex
                  ? "rgba(0,240,255,0.85)"
                  : "rgba(100,150,255,0.22)",
              opacity: idx === activeIndex ? 1 : 0.9,
            }}
            aria-label={`Show dashboard sample ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
