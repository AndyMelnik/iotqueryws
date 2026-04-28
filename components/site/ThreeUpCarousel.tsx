"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SiteCard } from "@/lib/site-config";

type Props = {
  cards: SiteCard[];
};

export default function ThreeUpCarousel({ cards }: Props) {
  const groups = useMemo(() => {
    const chunks: SiteCard[][] = [];
    for (let i = 0; i < cards.length; i += 3) chunks.push(cards.slice(i, i + 3));
    return chunks;
  }, [cards]);
  const [index, setIndex] = useState(0);

  if (!groups.length) return null;

  const prev = () => setIndex((i) => (i - 1 + groups.length) % groups.length);
  const next = () => setIndex((i) => (i + 1) % groups.length);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        {groups[index].map((card) => (
          <article
            key={card.title}
            className="glass rounded-3xl p-5 text-center"
            style={{ border: "1px solid rgba(100,150,255,0.22)", background: "rgba(100,150,255,0.06)" }}
          >
            <h3 className="text-xl font-semibold">{card.title}</h3>
            {card.text ? (
              <p className="mt-2 text-sm md:text-base" style={{ color: "rgba(224,234,255,0.78)" }}>
                {card.text}
              </p>
            ) : null}
          </article>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={prev}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ border: "1px solid rgba(100,150,255,0.28)", background: "rgba(100,150,255,0.08)", color: "#e0eaff" }}
          aria-label="Previous cards"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center gap-2">
          {groups.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: i === index ? "#00f0ff" : "rgba(224,234,255,0.28)" }}
              aria-label={`Go to card group ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ border: "1px solid rgba(100,150,255,0.28)", background: "rgba(100,150,255,0.08)", color: "#e0eaff" }}
          aria-label="Next cards"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
