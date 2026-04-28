"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  intro: string;
  phrases: string[];
};

function toSentenceCase(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const sentence = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  return sentence
    .replace(/\biot query\b/gi, "IoT Query")
    .replace(/\bnavixy\b/gi, "Navixy")
    .replace(/\bpowerbi\b/gi, "PowerBI")
    .replace(/\broi\b/gi, "ROI")
    .replace(/\bbi\b/g, "BI");
}

function splitForTwoWordSecondLine(value: string): { lineOnePart: string; lineTwoPart: string } {
  const words = value.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 2) {
    return {
      lineOnePart: "",
      lineTwoPart: words.join(" "),
    };
  }
  return {
    lineOnePart: words.slice(0, -2).join(" "),
    lineTwoPart: words.slice(-2).join(" "),
  };
}

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

  const currentTarget = phrases[index] ?? "";
  const intoPrefixMatch = currentTarget.match(/^into\s+/i);
  const useIntoTwoLinePattern = Boolean(intoPrefixMatch);
  const intoRemainder = useIntoTwoLinePattern
    ? renderedText.slice(intoPrefixMatch?.[0].length ?? 0).trimStart()
    : renderedText;
  const normalizedIntro = toSentenceCase(intro);
  const normalizedRemainder = intoRemainder.toLowerCase();
  const normalizedRenderedText = toSentenceCase(renderedText).toLowerCase();
  const splitLine = splitForTwoWordSecondLine(useIntoTwoLinePattern ? normalizedRemainder : normalizedRenderedText);
  const firstLineText = useIntoTwoLinePattern
    ? [normalizedIntro, "into", splitLine.lineOnePart].filter(Boolean).join(" ")
    : [normalizedIntro, splitLine.lineOnePart].filter(Boolean).join(" ");
  const secondLineText = splitLine.lineTwoPart || "\u00A0";

  return (
    <h1
      className="font-bold leading-[1.05] tracking-[-0.06em] max-w-5xl"
      style={{ fontSize: "clamp(1.95rem, 5.2vw, 3.9rem)", color: "#e0eaff" }}
    >
      <span className="whitespace-nowrap inline-block">{firstLineText}</span>
      <br />
      <span
        className="inline-block min-h-[1.2em] neon-text whitespace-nowrap"
        style={{ fontFamily: "var(--font-jetbrains-mono)", letterSpacing: "-0.03em" }}
      >
        {secondLineText}
      </span>
    </h1>
  );
}
