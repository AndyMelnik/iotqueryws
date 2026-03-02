"use client";

import { motion } from "framer-motion";
import { Layers, Radio } from "lucide-react";
import { dataLayers } from "@/lib/data";

export default function DataFoundation() {
  return (
    <section className="py-24 px-4" id="data">
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
            Data Foundation
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "#e0eaff" }}
          >
            From raw telemetry to{" "}
            <span className="neon-text">business-ready insight</span>
          </h2>
          <p
            className="mt-5 text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(224,234,255,0.55)" }}
          >
            IoT Query structures your data so teams can work at the level they
            need — from raw device messages to aggregated, business-facing metrics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dataLayers.map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass glass-hover p-8 flex flex-col gap-5 relative overflow-hidden"
            >
              {/* Glow */}
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
                style={{
                  background:
                    layer.color === "cyan"
                      ? "radial-gradient(circle, rgba(0,240,255,0.12) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(179,0,255,0.12) 0%, transparent 70%)",
                }}
              />

              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background:
                      layer.color === "cyan"
                        ? "rgba(0,240,255,0.12)"
                        : "rgba(179,0,255,0.12)",
                    color: layer.color === "cyan" ? "#00f0ff" : "#b300ff",
                    fontFamily: "var(--font-jetbrains-mono)",
                    letterSpacing: "0.15em",
                    border: `1px solid ${
                      layer.color === "cyan"
                        ? "rgba(0,240,255,0.25)"
                        : "rgba(179,0,255,0.25)"
                    }`,
                  }}
                >
                  {layer.label}
                </span>
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      layer.color === "cyan"
                        ? "rgba(0,240,255,0.1)"
                        : "rgba(179,0,255,0.1)",
                  }}
                >
                  {layer.color === "cyan" ? (
                    <Radio size={15} style={{ color: "#00f0ff" }} />
                  ) : (
                    <Layers size={15} style={{ color: "#b300ff" }} />
                  )}
                </div>
              </div>

              <div>
                <h3
                  className="text-xl font-bold tracking-tight mb-2"
                  style={{ color: "#e0eaff" }}
                >
                  {layer.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(224,234,255,0.55)" }}>
                  {layer.description}
                </p>
              </div>

              <ul className="flex flex-col gap-2 mt-1">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "rgba(224,234,255,0.65)" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full inline-block"
                      style={{
                        background: layer.color === "cyan" ? "#00f0ff" : "#b300ff",
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Connector */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p
            className="text-sm"
            style={{ color: "rgba(224,234,255,0.45)", fontStyle: "italic" }}
          >
            You keep full detail while gaining structured, analytics-ready layers.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
