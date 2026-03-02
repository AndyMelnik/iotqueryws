"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { pricingTiers } from "@/lib/data";

export default function Pricing() {
  return (
    <section className="py-24 px-4" id="pricing">
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
            Pricing
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "#e0eaff" }}
          >
            Plans tailored to your{" "}
            <span className="neon-text">fleet size & ambition</span>
          </h2>
          <p
            className="mt-5 text-base max-w-xl mx-auto"
            style={{ color: "rgba(224,234,255,0.5)" }}
          >
            All plans include a single-tenant secure environment. Contact us for a
            custom quote tailored to your data volume and use case.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col rounded-[2rem] overflow-hidden"
              style={
                tier.highlighted
                  ? {
                      background: "rgba(10,16,43,0.9)",
                      border: "1px solid rgba(179,0,255,0.4)",
                      boxShadow: "0 0 50px rgba(179,0,255,0.15)",
                    }
                  : {
                      background: "rgba(100,150,255,0.04)",
                      border: "1px solid rgba(100,150,255,0.15)",
                    }
              }
            >
              {/* Highlight badge */}
              {tier.highlighted && (
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: "linear-gradient(90deg, #b300ff, #00f0ff)" }}
                />
              )}
              {tier.highlighted && (
                <div
                  className="absolute top-4 right-5 text-xs px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(179,0,255,0.15)",
                    color: "#b300ff",
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    border: "1px solid rgba(179,0,255,0.3)",
                  }}
                >
                  Most Popular
                </div>
              )}

              <div className="p-7 flex flex-col gap-6 flex-1">
                <div>
                  <h3
                    className="text-lg font-bold tracking-tight mb-1"
                    style={{ color: "#e0eaff" }}
                  >
                    {tier.name}
                  </h3>
                  <p className="text-sm" style={{ color: "rgba(224,234,255,0.5)" }}>
                    {tier.description}
                  </p>
                </div>

                <div>
                  <div
                    className="text-3xl font-bold neon-text tracking-tight"
                  >
                    {tier.price}
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ color: "rgba(224,234,255,0.35)", fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    pricing — talk to us
                  </div>
                </div>

                <ul className="flex flex-col gap-2.5 flex-1">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: tier.highlighted ? "#b300ff" : "#00f0ff" }}
                      />
                      <span className="text-sm" style={{ color: "rgba(224,234,255,0.7)" }}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#cta"
                  className="mt-auto text-center py-3.5 px-6 rounded-full text-sm font-bold transition-all duration-200"
                  style={
                    tier.highlighted
                      ? {
                          background: "linear-gradient(135deg, #b300ff, #00f0ff)",
                          color: "#050a22",
                          boxShadow: "0 0 25px rgba(179,0,255,0.3)",
                        }
                      : {
                          background: "rgba(100,150,255,0.08)",
                          border: "1px solid rgba(100,150,255,0.2)",
                          color: "#e0eaff",
                        }
                  }
                >
                  {tier.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
