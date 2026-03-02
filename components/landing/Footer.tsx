"use client";

import { motion } from "framer-motion";
import { navLinks } from "@/lib/data";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Dashboards", href: "#analytics-dashboard" },
      { label: "Custom Reporting", href: "#analytics-compliance" },
      { label: "Data Transform", href: "#analytics-transform" },
      { label: "AI Assistant", href: "#analytics-ai" },
      { label: "Data Modeling", href: "#analytics-forecast" },
      { label: "Get Started", href: "#cta" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "https://www.navixy.com/docs/analytics", external: true },
      { label: "IoT Query (Navixy)", href: "https://www.navixy.com/en/iot-query", external: true },
      { label: "Capabilities", href: "#capabilities" },
      { label: "Privacy policy", href: "https://www.navixy.com/legal/privacy-policy/", external: true },
      { label: "Terms of service", href: "https://www.navixy.com/legal/terms-of-service/", external: true },
      { label: "Legal center", href: "https://www.navixy.com/legal/", external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-8 px-4 overflow-hidden">
      {/* Watermark */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none leading-none"
        style={{
          fontSize: "clamp(5rem, 15vw, 12rem)",
          fontWeight: 700,
          color: "rgba(179,0,255,0.04)",
          letterSpacing: "-0.06em",
          whiteSpace: "nowrap",
        }}
      >
        IOTQUERY
      </div>

      <div className="neon-divider mb-12" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top: logo + links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <a href="#" className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #b300ff, #00f0ff)", color: "#050a22" }}
              >
                IQ
              </div>
              <span className="font-semibold text-base tracking-tight" style={{ color: "#e0eaff" }}>
                IoT Query
              </span>
            </a>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(224,234,255,0.4)" }}>
              Telematics intelligence for teams who demand answers, not exports.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.navixy.com/en/iot-query"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium px-4 py-2 rounded-full transition-all duration-200"
                style={{
                  background: "rgba(179,0,255,0.12)",
                  border: "1px solid rgba(179,0,255,0.3)",
                  color: "#b300ff",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(179,0,255,0.2)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 12px rgba(179,0,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(179,0,255,0.12)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                More details
              </a>
              <a
                href="https://www.navixy.com/docs/analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium px-4 py-2 rounded-full transition-all duration-200"
                style={{
                  background: "rgba(0,240,255,0.08)",
                  border: "1px solid rgba(0,240,255,0.25)",
                  color: "#00f0ff",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,240,255,0.15)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 12px rgba(0,240,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,240,255,0.08)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                Documentation
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.heading} className="flex flex-col gap-4">
              <h4
                className="text-xs font-semibold tracking-widest uppercase"
                style={{
                  color: "rgba(224,234,255,0.35)",
                  fontFamily: "var(--font-jetbrains-mono)",
                }}
              >
                {group.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "rgba(224,234,255,0.5)" }}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "#e0eaff")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "rgba(224,234,255,0.5)")
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </footer>
  );
}
