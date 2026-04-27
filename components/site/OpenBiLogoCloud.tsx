"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const logoSlides = [
  { src: "/logo-powerbi.png", title: "Power BI", w: 84, h: 84 },
  { src: "/logo-metabase.png", title: "Metabase", w: 84, h: 84 },
  { src: "/logo-superset.png", title: "Apache Superset", w: 84, h: 84 },
  { src: "/logo-grafana.png", title: "Grafana", w: 74, h: 74 },
];

export default function OpenBiLogoCloud() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % logoSlides.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const activeLogo = logoSlides[activeIndex];

  return (
    <div className="relative h-full flex flex-col min-h-0">
      <div
        className="rounded-2xl p-3 flex-1 min-h-0 relative overflow-hidden"
        style={{
          background: "rgba(10,16,43,0.72)",
          border: "1px solid rgba(100,150,255,0.22)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(0,240,255,0.14), transparent 40%), radial-gradient(circle at 80% 80%, rgba(179,0,255,0.12), transparent 45%)",
          }}
        />

        <div className="relative h-full min-h-[144px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLogo.title}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center justify-center"
            >
              <Image
                src={activeLogo.src}
                alt={activeLogo.title}
                width={activeLogo.w}
                height={activeLogo.h}
                className="object-contain"
              />
              <p className="mt-3 text-sm md:text-base font-semibold text-center" style={{ color: "rgba(224,234,255,0.9)" }}>
                {activeLogo.title}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-center gap-1.5">
        {logoSlides.map((slide, idx) => (
          <button
            key={slide.title}
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
            aria-label={`Show ${slide.title}`}
          >
            
          </button>
        ))}
      </div>
    </div>
  );
}
