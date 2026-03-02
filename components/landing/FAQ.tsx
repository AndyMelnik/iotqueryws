"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 px-4" id="faq">
      <div className="max-w-3xl mx-auto">
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
            FAQ
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "#e0eaff" }}
          >
            Common questions,{" "}
            <span className="neon-text">straight answers</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-[1.5rem] overflow-hidden transition-all duration-300"
              style={{
                background: open === i ? "rgba(179,0,255,0.06)" : "rgba(100,150,255,0.04)",
                border: open === i
                  ? "1px solid rgba(179,0,255,0.3)"
                  : "1px solid rgba(100,150,255,0.12)",
              }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span
                  className="text-sm font-semibold leading-snug"
                  style={{ color: "#e0eaff" }}
                >
                  {faq.question}
                </span>
                <span
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200"
                  style={{
                    background: open === i ? "rgba(179,0,255,0.2)" : "rgba(100,150,255,0.1)",
                  }}
                >
                  {open === i ? (
                    <Minus size={13} style={{ color: "#b300ff" }} />
                  ) : (
                    <Plus size={13} style={{ color: "rgba(224,234,255,0.5)" }} />
                  )}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <div
                        className="h-px mb-4"
                        style={{ background: "rgba(179,0,255,0.15)" }}
                      />
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(224,234,255,0.6)" }}>
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
