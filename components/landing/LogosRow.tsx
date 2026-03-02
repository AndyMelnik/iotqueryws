"use client";

import { motion } from "framer-motion";
import { biTools } from "@/lib/data";

export default function LogosRow() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="neon-divider mb-10" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <p
            className="text-xs tracking-widest uppercase text-center"
            style={{
              color: "rgba(224,234,255,0.4)",
              fontFamily: "var(--font-jetbrains-mono)",
            }}
          >
            Connects with your BI stack
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {biTools.map((tool, i) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300"
                style={{
                  background: "rgba(100,150,255,0.05)",
                  border: "1px solid rgba(100,150,255,0.15)",
                  color: "rgba(224,234,255,0.55)",
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {tool}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="px-5 py-2.5 rounded-2xl text-sm"
              style={{
                background: "rgba(179,0,255,0.08)",
                border: "1px solid rgba(179,0,255,0.2)",
                color: "rgba(179,0,255,0.8)",
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              + any SQL tool
            </motion.div>
          </div>
        </motion.div>
        <div className="neon-divider mt-10" />
      </div>
    </section>
  );
}
