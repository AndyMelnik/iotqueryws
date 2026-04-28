"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Slide = {
  title: string;
  text?: string;
};

type Props = {
  slides: Slide[];
};

export default function LogisticsReadyCarousel({ slides }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;
  const activeSlide = slides[activeIndex];

  return (
    <div className="relative h-full flex flex-col min-h-0">
      <div
        className="rounded-2xl p-4 flex-1 min-h-0 overflow-hidden"
        style={{
          background: "rgba(10,16,43,0.74)",
          border: "1px solid rgba(100,150,255,0.24)",
        }}
      >
        <div
          className="h-full min-h-[180px] rounded-xl p-4 flex items-center"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(0,240,255,0.12), transparent 45%), radial-gradient(circle at 80% 80%, rgba(179,0,255,0.12), transparent 45%), rgba(5,10,34,0.4)",
            border: "1px solid rgba(100,150,255,0.18)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
              className="w-full grid gap-3 md:grid-cols-12 items-stretch"
            >
              <div className="md:col-span-7">
                <p className="text-lg md:text-xl font-semibold">{activeSlide.title}</p>
                {activeSlide.text ? (
                  <p className="mt-2 text-sm md:text-base" style={{ color: "rgba(224,234,255,0.78)" }}>
                    {activeSlide.text}
                  </p>
                ) : null}
              </div>
              <div className="md:col-span-5">
                <div
                  className="h-full min-h-[120px] rounded-xl flex items-center justify-center text-xs md:text-sm font-medium text-center px-3"
                  style={{
                    border: "1px dashed rgba(100,150,255,0.38)",
                    background: "rgba(100,150,255,0.08)",
                    color: "rgba(224,234,255,0.66)",
                  }}
                >
                  Image placeholder
                  <br />
                  {activeSlide.title}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-center gap-1.5">
        {slides.map((slide, idx) => (
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
          />
        ))}
      </div>
    </div>
  );
}
