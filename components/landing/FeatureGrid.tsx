"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Database,
  TrendingUp,
  Award,
  Code2,
  History,
} from "lucide-react";
import { analyticsFeatures } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Database,
  TrendingUp,
  Award,
  Code2,
  History,
};

export default function FeatureGrid() {
  return (
    <section className="py-24 px-4" id="features">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs font-medium mb-4 tracking-widest uppercase"
            style={{ color: "#00f0ff", fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Advanced Analytics Toolkit
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "#e0eaff" }}
          >
            Create anything.{" "}
            <span className="neon-text">Orchestrate everything.</span>
          </h2>
          <p
            className="mt-5 text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(224,234,255,0.55)" }}
          >
            Use IoT Query as your analytics foundation — and deliver insights through
            your BI tools, your applications, or Dashboard Studio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {analyticsFeatures.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            const isAccent = feature.accent;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative p-7 rounded-[2rem] flex flex-col gap-4 group transition-all duration-300 overflow-hidden ${
                  isAccent ? "" : "glass glass-hover"
                }`}
                style={
                  isAccent
                    ? {
                        background: "linear-gradient(135deg, rgba(179,0,255,0.18), rgba(0,240,255,0.1))",
                        border: "1px solid rgba(179,0,255,0.35)",
                        boxShadow: "0 0 40px rgba(179,0,255,0.12)",
                      }
                    : undefined
                }
              >
                {/* Background glow on accent */}
                {isAccent && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 80% at 50% 0%, rgba(179,0,255,0.15) 0%, transparent 70%)",
                    }}
                  />
                )}

                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center relative z-10"
                  style={
                    isAccent
                      ? {
                          background: "rgba(179,0,255,0.25)",
                          border: "1px solid rgba(179,0,255,0.4)",
                        }
                      : {
                          background: "rgba(100,150,255,0.08)",
                          border: "1px solid rgba(100,150,255,0.2)",
                        }
                  }
                >
                  <Icon
                    size={18}
                    style={{ color: isAccent ? "#b300ff" : "#00f0ff" }}
                  />
                </div>
                <h3
                  className="text-base font-bold tracking-tight relative z-10"
                  style={{ color: "#e0eaff" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed relative z-10"
                  style={{ color: "rgba(224,234,255,0.55)" }}
                >
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(90deg, transparent, #b300ff, transparent)",
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
