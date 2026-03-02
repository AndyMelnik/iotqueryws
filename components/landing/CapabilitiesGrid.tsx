"use client";

import { motion } from "framer-motion";
import {
  BarChart2, FileCheck, RefreshCw, MessageSquare, TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: "easeInOut" as const },
  }),
};

// ── Static mini bar chart ──────────────────────────────────────────────────────
function MiniBarChart({ bars, color }: { bars: number[]; color: string }) {
  const max = Math.max(...bars);
  return (
    <div className="flex items-end gap-1 h-10">
      {bars.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height: `${(v / max) * 100}%`,
            background: i === bars.indexOf(max)
              ? color
              : `${color}50`,
            minHeight: 3,
          }}
        />
      ))}
    </div>
  );
}

// ── Static mini sparkline (dots + line) ──────────────────────────────────────
function MiniSparkline({ points, color }: { points: number[]; color: string }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const norm = (v: number) => ((v - min) / (max - min || 1)) * 32;
  const w = 100 / (points.length - 1);
  const pathD = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * w} ${36 - norm(v)}`)
    .join(" ");
  return (
    <svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none" className="overflow-visible">
      <defs>
        <linearGradient id={`sg-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={`${pathD} L ${(points.length - 1) * w} 40 L 0 40 Z`} fill={`url(#sg-${color.replace("#","")})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((v, i) => (
        <circle key={i} cx={i * w} cy={36 - norm(v)} r={i === points.length - 1 ? 3 : 1.5} fill={color} />
      ))}
    </svg>
  );
}

// ── Compliance tile visual ─────────────────────────────────────────────────────
function ComplianceTileVisual() {
  const items = [
    { label: "Risk", color: "#ff3366" },
    { label: "Compliance", color: "#00f0ff" },
    { label: "Regulatory scope", color: "#b300ff" },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: `${it.color}12`, border: `1px solid ${it.color}30` }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: it.color }} />
          <span className="text-[10px] font-semibold" style={{ color: it.color, fontFamily: "var(--font-jetbrains-mono)" }}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Chat preview ──────────────────────────────────────────────────────────────
function ChatPreview() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-start">
        <div className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(179,0,255,0.15)", border: "1px solid rgba(179,0,255,0.3)" }}>
          <MessageSquare size={10} style={{ color: "#b300ff" }} />
        </div>
        <div className="rounded-xl rounded-tl-sm px-3 py-1.5 text-[11px] leading-snug" style={{ background: "rgba(100,150,255,0.08)", border: "1px solid rgba(100,150,255,0.15)", color: "rgba(224,234,255,0.65)" }}>
          Which vehicles waste the most fuel?
        </div>
      </div>
      <div className="flex gap-2 items-start flex-row-reverse">
        <div className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(0,240,255,0.1)", border: "1px solid rgba(0,240,255,0.25)" }}>
          <span style={{ color: "#00f0ff", fontSize: 8, fontWeight: 700 }}>AI</span>
        </div>
        <div className="rounded-xl rounded-tr-sm px-3 py-1.5 text-[11px] leading-snug" style={{ background: "rgba(179,0,255,0.08)", border: "1px solid rgba(179,0,255,0.2)", color: "rgba(224,234,255,0.7)" }}>
          Truck Alpha — <span style={{ color: "#b300ff", fontWeight: 700 }}>318 L</span> · 18% above avg
        </div>
      </div>
    </div>
  );
}

// ── Data layer pills ──────────────────────────────────────────────────────────
function DataLayers() {
  const layers = [
    { label: "RAW", desc: "GPS · sensors · messages", color: "rgba(100,150,255,0.5)" },
    { label: "AGG", desc: "Trips · KPIs · events",   color: "#00f0ff" },
    { label: "FEAT", desc: "AI-ready features",       color: "#b300ff" },
  ];
  return (
    <div className="flex flex-col gap-1.5">
      {layers.map((l, i) => (
        <div key={l.label} className="flex items-center gap-3">
          <div className="flex-1 h-0.5 rounded-full" style={{ background: "rgba(100,150,255,0.1)" }}>
            <div className="h-full rounded-full" style={{ width: `${100 - i * 20}%`, background: l.color }} />
          </div>
          <span className="text-[9px] w-8 font-bold tracking-widest" style={{ color: l.color, fontFamily: "var(--font-jetbrains-mono)" }}>{l.label}</span>
          <span className="text-[9px] w-28 hidden sm:block" style={{ color: "rgba(224,234,255,0.35)", fontFamily: "var(--font-jetbrains-mono)" }}>{l.desc}</span>
        </div>
      ))}
    </div>
  );
}

// ── Tile definition ───────────────────────────────────────────────────────────
const TILES = [
  {
    icon: <BarChart2 size={16} />,
    eyebrow: "Realtime Dashboards",
    accent: "#b300ff",
    headline: "Live KPIs from your telematics",
    body: "Filter by vehicle, driver, or time. Dashboards update in real time — every metric is a direct SQL query.",
    bullets: ["Filters and sorting", "Live KPI cards", "Auto-updating charts"],
    visual: <MiniBarChart bars={[6, 9, 7, 12, 10, 14, 11, 15, 13, 16]} color="#b300ff" />,
    span: "lg:col-span-4",
    href: "#analytics-dashboard",
  },
  {
    icon: <FileCheck size={16} />,
    eyebrow: "Custom Reporting",
    accent: "#ff3366",
    headline: "Risk, compliance & regulatory",
    body: "Build reports for driver risk and compliance. Example: EU tachograph rules for driving and rest hours.",
    bullets: ["Risk & compliance snapshot", "Regulatory scope", "Custom rules and scorecards"],
    visual: <ComplianceTileVisual />,
    span: "lg:col-span-4",
    href: "#analytics-compliance",
  },
  {
    icon: <RefreshCw size={16} />,
    eyebrow: "Data Transformation",
    accent: "#00f0ff",
    headline: "Custom statuses and states",
    body: "Define and aggregate custom statuses from raw telemetry — roll up by time, vehicle, or driver.",
    bullets: ["Custom status definitions", "Status & event aggregation", "Business-level rollups"],
    visual: <DataLayers />,
    span: "lg:col-span-4",
    href: "#analytics-transform",
  },
  {
    icon: <MessageSquare size={16} />,
    eyebrow: "AI-Readiness",
    accent: "#b300ff",
    headline: "Custom Assistants & Agents with MCP",
    body: "Telematics data ready for AI. Use Model Context Protocol (MCP) to build custom assistants and agents.",
    bullets: ["MCP-compatible access", "Custom AI assistants & agents", "Automation and autonomy-ready"],
    visual: <ChatPreview />,
    span: "lg:col-span-6",
    href: "#analytics-ai",
  },
  {
    icon: <TrendingUp size={16} />,
    eyebrow: "Data Modeling",
    accent: "#00f0ff",
    headline: "ML and forecasting on unified data",
    body: "Data modeling with ML and forecasting: predict costs, fuel, and utilization with confidence intervals.",
    bullets: ["Data modeling & ML", "Cost projections", "Historical + forecast"],
    visual: <MiniSparkline points={[480, 472, 501, 456, 489, 512, 469, 495, 510, 520]} color="#00f0ff" />,
    span: "lg:col-span-6",
    href: "#analytics-forecast",
  },
];

export default function CapabilitiesGrid() {
  return (
    <section id="capabilities" className="py-20 px-4 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <p className="text-xs font-medium mb-4 tracking-widest uppercase" style={{ color: "#00f0ff", fontFamily: "var(--font-jetbrains-mono)" }}>
            Platform Capabilities
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#e0eaff" }}>
            Everything your team needs.{" "}
            <span className="neon-text">Nothing you don&apos;t.</span>
          </h2>
          <p className="mt-4 text-base max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(224,234,255,0.5)" }}>
            Five integrated modules — all powered by direct SQL access to your telematics data.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
          {TILES.map((tile, i) => (
            <a
              key={tile.eyebrow}
              href={tile.href}
              className={`${tile.span} block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a22] focus-visible:ring-[#b300ff] rounded-[1.75rem] cursor-pointer`}
            >
              <motion.div
                custom={i + 1}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                className="group relative flex flex-col gap-4 p-6 h-full rounded-[1.75rem] overflow-hidden transition-all duration-300"
                style={{
                  background: "rgba(10,16,43,0.7)",
                  border: "1px solid rgba(100,150,255,0.13)",
                  backdropFilter: "blur(16px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${tile.accent}45`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${tile.accent}0e`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(100,150,255,0.13)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
              {/* Subtle radial glow in corner */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${tile.accent}18 0%, transparent 70%)` }}
              />

              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${tile.accent}18`, border: `1px solid ${tile.accent}35`, color: tile.accent }}
                  >
                    {tile.icon}
                  </div>
                  <span
                    className="text-[10px] tracking-widest uppercase font-semibold"
                    style={{ color: tile.accent, fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    {tile.eyebrow}
                  </span>
                </div>
                <ArrowUpRight
                  size={14}
                  className="opacity-0 group-hover:opacity-60 transition-opacity duration-200"
                  style={{ color: tile.accent }}
                />
              </div>

              {/* Headline */}
              <div>
                <div className="text-xl font-bold tracking-tight leading-snug mb-1.5" style={{ color: "#e0eaff" }}>
                  {tile.headline}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(224,234,255,0.5)" }}>
                  {tile.body}
                </p>
              </div>

              {/* Bullets */}
              <ul className="flex flex-col gap-1.5">
                {tile.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs" style={{ color: "rgba(224,234,255,0.55)" }}>
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: tile.accent }} />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Visual decoration */}
              <div className="mt-auto pt-3 border-t" style={{ borderColor: "rgba(100,150,255,0.08)" }}>
                {tile.visual}
              </div>
              </motion.div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
