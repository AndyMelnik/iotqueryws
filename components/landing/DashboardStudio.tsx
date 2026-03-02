"use client";

import { motion } from "framer-motion";
import { BarChart3, FileDown, RefreshCw, Code2 } from "lucide-react";
import { dashboardFeatures } from "@/lib/data";

const featureIcons = [RefreshCw, Code2, BarChart3, FileDown];

export default function DashboardStudio() {
  return (
    <section className="py-24 px-4" id="dashboard">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div>
              <p
                className="text-xs font-medium mb-4 tracking-widest uppercase"
                style={{ color: "#b300ff", fontFamily: "var(--font-jetbrains-mono)" }}
              >
                Dashboard Studio
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight"
                style={{ color: "#e0eaff" }}
              >
                Built-in dashboards —{" "}
                <span className="neon-text">without buying a separate BI platform</span>
              </h2>
            </div>
            <p className="text-base leading-relaxed" style={{ color: "rgba(224,234,255,0.55)" }}>
              Dashboard Studio turns IoT Query access into visual answers. Build and
              share dashboards without external BI tools, waiting for custom
              development, or exporting spreadsheets.
            </p>

            <ul className="flex flex-col gap-3">
              {dashboardFeatures.map((feat, i) => {
                const Icon = featureIcons[i];
                return (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: "rgba(0,240,255,0.1)",
                        border: "1px solid rgba(0,240,255,0.2)",
                      }}
                    >
                      <Icon size={14} style={{ color: "#00f0ff" }} />
                    </div>
                    <span className="text-sm leading-relaxed" style={{ color: "rgba(224,234,255,0.7)" }}>
                      {feat}
                    </span>
                  </li>
                );
              })}
            </ul>

            <a href="#cta" className="neon-btn inline-flex items-center gap-2 self-start text-sm">
              See Dashboard Studio
            </a>
          </motion.div>

          {/* Right: mockup dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="rounded-[2rem] overflow-hidden"
              style={{
                background: "rgba(10,16,43,0.85)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(100,150,255,0.2)",
                boxShadow: "0 0 60px rgba(0,240,255,0.08), 0 40px 80px rgba(0,0,0,0.4)",
              }}
            >
              {/* Header */}
              <div
                className="px-5 py-4 border-b flex items-center justify-between"
                style={{ borderColor: "rgba(100,150,255,0.15)" }}
              >
                <span
                  className="text-xs font-semibold"
                  style={{
                    color: "rgba(224,234,255,0.6)",
                    fontFamily: "var(--font-jetbrains-mono)",
                    letterSpacing: "0.1em",
                  }}
                >
                  FLEET OVERVIEW — OCT 2024
                </span>
                <div className="flex gap-2">
                  <span
                    className="text-xs px-2 py-1 rounded-lg"
                    style={{
                      background: "rgba(0,240,255,0.1)",
                      color: "#00f0ff",
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: "10px",
                    }}
                  >
                    LIVE
                  </span>
                </div>
              </div>

              {/* KPI cards */}
              <div className="grid grid-cols-3 gap-3 p-5">
                {[
                  { label: "Active Vehicles", value: "1,284", delta: "+3.2%" },
                  { label: "Avg Fuel Eff.", value: "38.4 mpg", delta: "+1.8%" },
                  { label: "Incidents", value: "12", delta: "-40%" },
                ].map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-2xl p-4"
                    style={{
                      background: "rgba(100,150,255,0.05)",
                      border: "1px solid rgba(100,150,255,0.12)",
                    }}
                  >
                    <div
                      className="text-xs mb-2"
                      style={{
                        color: "rgba(224,234,255,0.4)",
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: "9px",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {kpi.label}
                    </div>
                    <div
                      className="text-lg font-bold tracking-tight"
                      style={{ color: "#e0eaff" }}
                    >
                      {kpi.value}
                    </div>
                    <div
                      className="text-xs mt-1"
                      style={{ color: kpi.delta.startsWith("+") ? "#00f0ff" : "#b300ff" }}
                    >
                      {kpi.delta}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart area */}
              <div className="px-5 pb-5">
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: "rgba(100,150,255,0.04)",
                    border: "1px solid rgba(100,150,255,0.1)",
                  }}
                >
                  <div
                    className="text-xs mb-4"
                    style={{
                      color: "rgba(224,234,255,0.4)",
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.1em",
                    }}
                  >
                    DISTANCE DRIVEN / WEEK (km)
                  </div>
                  {/* Fake bar chart */}
                  <div className="flex items-end gap-2 h-20">
                    {[65, 80, 55, 90, 75, 88, 70].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-lg" style={{ height: `${h}%` }}>
                        <div
                          className="w-full h-full rounded-t-lg"
                          style={{
                            background:
                              i === 5
                                ? "linear-gradient(to top, #b300ff, #00f0ff)"
                                : "rgba(100,150,255,0.2)",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                      <span
                        key={d}
                        className="flex-1 text-center"
                        style={{
                          color: "rgba(224,234,255,0.3)",
                          fontFamily: "var(--font-jetbrains-mono)",
                          fontSize: "9px",
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
