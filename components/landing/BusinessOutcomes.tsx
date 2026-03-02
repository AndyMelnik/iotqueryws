"use client";

import { motion } from "framer-motion";
import { Zap, FileX, Eye, BarChart3, Layers } from "lucide-react";
import { businessOutcomes } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Zap,
  FileX,
  Eye,
  BarChart3,
  Layers,
};

export default function BusinessOutcomes() {
  return (
    <section className="py-24 px-4" id="outcomes">
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
            Business Outcomes
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "#e0eaff" }}
          >
            What teams achieve with{" "}
            <span className="neon-text">IoT Query</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {businessOutcomes.map((outcome, i) => {
            const Icon = iconMap[outcome.icon];
            return (
              <motion.div
                key={outcome.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-5 p-5 rounded-[1.5rem] group transition-all duration-300"
                style={{
                  background: "rgba(100,150,255,0.04)",
                  border: "1px solid rgba(100,150,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(179,0,255,0.25)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(179,0,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(100,150,255,0.1)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(100,150,255,0.04)";
                }}
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(179,0,255,0.1)",
                    border: "1px solid rgba(179,0,255,0.2)",
                  }}
                >
                  <Icon size={16} style={{ color: "#b300ff" }} />
                </div>
                <span className="text-sm font-medium leading-relaxed" style={{ color: "rgba(224,234,255,0.8)" }}>
                  {outcome.title}
                </span>
                <div
                  className="ml-auto w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(0,240,255,0.1)" }}
                >
                  <span style={{ color: "#00f0ff", fontSize: "10px" }}>✓</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
