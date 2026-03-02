"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 px-4" id="cta">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-16 text-center"
          style={{
            background: "rgba(10,16,43,0.9)",
            border: "1px solid rgba(179,0,255,0.3)",
            boxShadow: "0 0 80px rgba(179,0,255,0.15), 0 0 40px rgba(0,240,255,0.05)",
          }}
        >
          {/* Glow background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(179,0,255,0.15) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: "linear-gradient(90deg, transparent, #b300ff, #00f0ff, transparent)" }}
          />

          {/* Grid overlay in cta box */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(179,0,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(179,0,255,0.08) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(179,0,255,0.15)",
                border: "1px solid rgba(179,0,255,0.3)",
              }}
            >
              <Calendar size={24} style={{ color: "#b300ff" }} />
            </div>

            <div>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
                style={{ color: "#e0eaff" }}
              >
                Ready to turn fleet data{" "}
                <span className="neon-text">into decisions?</span>
              </h2>
              <p
                className="text-base max-w-2xl mx-auto leading-relaxed"
                style={{ color: "rgba(224,234,255,0.55)" }}
              >
                Get a personalized walkthrough of IoT Query, Dashboard Studio, and
                real-world analytics examples tailored to your workflows.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <a
                href="mailto:hello@iotquery.io"
                className="neon-btn flex items-center gap-2 text-sm font-bold"
              >
                Request a Demo
                <ArrowRight size={15} />
              </a>
              <a
                href="#capabilities"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: "rgba(100,150,255,0.07)",
                  border: "1px solid rgba(100,150,255,0.2)",
                  color: "#e0eaff",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,240,255,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(100,150,255,0.2)";
                }}
              >
                Explore Features
              </a>
            </div>

            {/* Social proof */}
            <div
              className="flex items-center gap-2 text-xs mt-2"
              style={{
                color: "rgba(224,234,255,0.35)",
                fontFamily: "var(--font-jetbrains-mono)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: "#00f0ff" }}
              />
              No commitment required · Setup in 15 minutes · Single-tenant secure
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
