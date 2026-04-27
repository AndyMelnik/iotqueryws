"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  intro: string;
  phrases: string[];
};

export default function InteractiveHeroHeadline({ intro, phrases }: Props) {
  const [index, setIndex] = useState(0);
  const [renderedText, setRenderedText] = useState(phrases[0] ?? "");

  const scrambleChars = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", []);

  useEffect(() => {
    if (!phrases.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4400);

    return () => clearInterval(timer);
  }, [phrases]);

  useEffect(() => {
    const target = phrases[index] ?? "";
    if (!target) {
      setRenderedText("");
      return;
    }

    let frame = 0;
    const totalFrames = 36;
    const revealStart = Math.max(16, totalFrames / 2);
    let rafId = 0;

    const tick = () => {
      frame += 1;
      const progress = Math.min(1, frame / totalFrames);
      const revealedCount = Math.floor(
        ((frame - revealStart) / (totalFrames - revealStart)) * target.length
      );
      const safeRevealedCount = Math.max(0, Math.min(target.length, revealedCount));

      const nextText = target
        .split("")
        .map((char, charIndex) => {
          if (char === " ") return " ";
          if (charIndex < safeRevealedCount || progress === 1) return target[charIndex];
          const randomIndex = Math.floor(Math.random() * scrambleChars.length);
          return scrambleChars[randomIndex];
        })
        .join("");

      setRenderedText(nextText);

      if (frame < totalFrames) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [index, phrases, scrambleChars]);

  return (
    <h1
      className="font-bold leading-[1.05] tracking-[-0.06em] max-w-5xl"
      style={{ fontSize: "clamp(1.95rem, 5.2vw, 3.9rem)", color: "#e0eaff" }}
    >
      <span className="whitespace-nowrap inline-block">{intro}</span>
      <br />
      <span
        className="inline-block min-h-[1.2em] neon-text"
        style={{ fontFamily: "var(--font-jetbrains-mono)", letterSpacing: "-0.03em" }}
      >
        {(() => {
          const currentTarget = phrases[index] ?? "";
          const breakAt = currentTarget.lastIndexOf(" ");
          if (breakAt <= 0) return renderedText;

          const lineOne = renderedText.slice(0, breakAt);
          const lineTwo = renderedText.slice(breakAt + 1);

          return (
            <span className="inline-flex flex-col leading-[1.05]">
              <span>{lineOne}</span>
              <span>{lineTwo}</span>
            </span>
          );
        })()}
      </span>
    </h1>
  );
}
