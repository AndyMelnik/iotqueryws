"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { comparisonRows } from "@/lib/data";

export default function WhySection() {
  return (
    <section className="py-24 px-4" id="why">
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
            Why IoT Query
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight max-w-3xl mx-auto"
            style={{ color: "#e0eaff" }}
          >
            Tracking tells you{" "}
            <span style={{ color: "rgba(224,234,255,0.45)" }}>what happened.</span>
            <br />
            Intelligence tells you{" "}
            <span className="neon-text">what to do next.</span>
          </h2>
          <p
            className="mt-5 text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(224,234,255,0.55)" }}
          >
            Standard telematics reports are great for monitoring. But real business
            questions require deeper, flexible analysis across your complete dataset.
            IoT Query gives you unified, queryable access — without limitations.
          </p>
        </motion.div>

        {/* Comparison table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Instead of */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[2rem] overflow-hidden"
            style={{
              background: "rgba(100,150,255,0.03)",
              border: "1px solid rgba(100,150,255,0.12)",
            }}
          >
            <div
              className="px-6 py-4 border-b"
              style={{ borderColor: "rgba(100,150,255,0.1)" }}
            >
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "rgba(224,234,255,0.35)", fontFamily: "var(--font-jetbrains-mono)" }}
              >
                Instead of…
              </span>
            </div>
            <ul className="p-5 flex flex-col gap-3">
              {comparisonRows.map((row, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: "rgba(255,80,80,0.04)" }}
                >
                  <X size={15} className="mt-0.5 shrink-0" style={{ color: "rgba(255,80,80,0.6)" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(224,234,255,0.5)" }}>
                    {row.instead}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* You can */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[2rem] overflow-hidden"
            style={{
              background: "rgba(179,0,255,0.04)",
              border: "1px solid rgba(179,0,255,0.18)",
            }}
          >
            <div
              className="px-6 py-4 border-b"
              style={{ borderColor: "rgba(179,0,255,0.15)" }}
            >
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "#b300ff", fontFamily: "var(--font-jetbrains-mono)" }}
              >
                You can…
              </span>
            </div>
            <ul className="p-5 flex flex-col gap-3">
              {comparisonRows.map((row, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: "rgba(179,0,255,0.05)" }}
                >
                  <Check size={15} className="mt-0.5 shrink-0" style={{ color: "#00f0ff" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(224,234,255,0.8)" }}>
                    {row.canDo}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Focus statement */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-10 text-base"
          style={{ color: "rgba(224,234,255,0.5)" }}
        >
          Focus on what truly matters:{" "}
          <span style={{ color: "#e0eaff", fontWeight: 600 }}>cost control</span>,{" "}
          <span style={{ color: "#e0eaff", fontWeight: 600 }}>efficiency</span>,{" "}
          <span style={{ color: "#e0eaff", fontWeight: 600 }}>risk reduction</span>, and{" "}
          <span style={{ color: "#e0eaff", fontWeight: 600 }}>performance</span>.
        </motion.p>
      </div>
    </section>
  );
}
