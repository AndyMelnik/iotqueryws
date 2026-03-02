"use client";

import { motion } from "framer-motion";
import { impactStats } from "@/lib/data";

export default function ImpactStats() {
  return (
    <section className="relative py-20 px-4" id="impact">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs font-medium mb-4 tracking-widest uppercase"
            style={{
              color: "#b300ff",
              fontFamily: "var(--font-jetbrains-mono)",
            }}
          >
            Proven Impact
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "#e0eaff" }}
          >
            Turn complexity into clarity —{" "}
            <span className="neon-text">faster.</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {impactStats.map((item, i) => (
            <motion.div
              key={item.stat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="glass glass-hover p-7 flex flex-col gap-4"
            >
              <span className="text-3xl">{item.icon}</span>
              <div>
                <div
                  className="text-4xl font-bold tracking-tight neon-text"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  {item.stat}
                </div>
                <div
                  className="text-base font-semibold mt-1"
                  style={{ color: "#e0eaff" }}
                >
                  {item.label}
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(224,234,255,0.55)" }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {[
            { title: "Your Data. Your Rules.", desc: "Work with your data your way. Run complex reports and analyze the full spectrum of telematics and business data that belongs to you." },
            { title: "BI Freedom.", desc: "Use built-in Dashboard Studio or connect Power BI, Tableau, Metabase, Apache Superset, and more." },
            { title: "AI-Ready.", desc: "Leverage MCP servers, n8n flows, or AI assistants to automate processes, generate insights, and support decision-making." },
          ].map((fact, i) => (
            <div
              key={fact.title}
              className="flex flex-col gap-2 p-5 rounded-[1.5rem] transition-all duration-300"
              style={{
                background: "rgba(100,150,255,0.04)",
                border: "1px solid rgba(100,150,255,0.12)",
              }}
            >
              <div
                className="text-sm font-bold"
                style={{ color: "#e0eaff" }}
              >
                {fact.title}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(224,234,255,0.5)" }}>
                {fact.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
