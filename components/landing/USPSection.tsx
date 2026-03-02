"use client";

import { motion } from "framer-motion";
import { Tag, Plug, Database } from "lucide-react";
import { uspPoints } from "@/lib/data";

const icons = [Tag, Plug, Database];

export default function USPSection() {
  return (
    <section className="py-24 px-4" id="usp">
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
            style={{ color: "#b300ff", fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Unique Advantage
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "#e0eaff" }}
          >
            A single source of truth —{" "}
            <span className="neon-text">ready for analytics in minutes.</span>
          </h2>
          <p
            className="mt-5 text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(224,234,255,0.55)" }}
          >
            Get direct access to unified telematics and business data — without API
            constraints — so you can build dashboards, models, and integrations from
            day one.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {uspPoints.map((point, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass glass-hover p-7 flex flex-col gap-4 relative overflow-hidden"
              >
                {/* Glow accent */}
                <div
                  className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                  style={{
                    background: i % 2 === 0
                      ? "radial-gradient(circle, rgba(179,0,255,0.12) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(0,240,255,0.1) 0%, transparent 70%)",
                  }}
                />
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(179,0,255,0.12)",
                    border: "1px solid rgba(179,0,255,0.25)",
                  }}
                >
                  <Icon size={18} style={{ color: "#b300ff" }} />
                </div>
                <h3
                  className="text-lg font-bold tracking-tight"
                  style={{ color: "#e0eaff" }}
                >
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(224,234,255,0.55)" }}>
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
