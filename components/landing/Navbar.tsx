"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
    >
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className={`w-full max-w-6xl rounded-[2rem] px-5 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "glass shadow-lg shadow-purple-500/10"
            : "bg-transparent"
        }`}
        style={{
          backdropFilter: scrolled ? "blur(16px)" : undefined,
          border: scrolled ? "1px solid rgba(100, 150, 255, 0.2)" : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
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

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                style={{ color: "rgba(224,234,255,0.65)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e0eaff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(224,234,255,0.65)")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + status */}
        <div className="hidden md:flex items-center gap-3">
          <div className="status-tag">
            <span
              className="pulse-dot w-1.5 h-1.5 rounded-full inline-block"
              style={{ background: "#b300ff" }}
            />
            Live
          </div>
          <a
            href="#cta"
            className="neon-btn text-sm font-bold"
            style={{ padding: "0.5rem 1.25rem" }}
          >
            Request a Demo
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-xl"
          style={{ color: "#e0eaff" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 rounded-[1.5rem] p-5 flex flex-col gap-2 z-50"
            style={{
              background: "rgba(10, 16, 43, 0.97)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(100, 150, 255, 0.2)",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                style={{ color: "rgba(224,234,255,0.8)" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              className="neon-btn text-sm font-bold text-center mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Request a Demo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
