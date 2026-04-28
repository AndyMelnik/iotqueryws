"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Briefcase,
  ChevronRight,
  Cog,
  CreditCard,
  Factory,
  ShieldUser,
  Wrench,
  Menu,
  X
} from "lucide-react";
import { siteNavigation } from "@/lib/site-config";

const navIcons: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Solutions: Cog,
  Industries: Factory,
  Roles: ShieldUser,
  Tools: Wrench,
  Pricing: CreditCard
};

const submenuIcons: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  "Asset Utilization": Briefcase,
  "Trips & Delivery": Briefcase,
  "Driver Safety": ShieldUser,
  Maintenance: Wrench,
  Compliance: ShieldUser,
  "Transport & Logistics": Factory,
  Leasing: Briefcase,
  "Heavy Machinery": Wrench,
  "Fleet Manager": ShieldUser,
  "Data Analyst": Briefcase,
  "Safety Manager": ShieldUser,
  Finance: CreditCard,
  "Dashboard Studio": Wrench,
  "3rd Party BI": Factory,
  "Custom Apps": Cog
};

const nonClickableSectionHrefs = new Set(["/solutions", "/industries", "/roles", "/tools"]);

export default function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "rgba(5,10,34,0.92)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(100,150,255,0.12)"
        }}
      />
      <nav
        className="w-full max-w-6xl rounded-[2rem] px-5 py-3 flex items-center justify-between glass relative"
        style={{ border: "1px solid rgba(100, 150, 255, 0.2)" }}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/iotquery-logo.svg"
            alt="IoT Query logo"
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
            priority
          />
          <span className="font-semibold text-base tracking-tight" style={{ color: "#e0eaff" }}>
            IoT Query
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {siteNavigation.map((link) => (
            <li
              key={link.label}
              className="relative"
              onMouseEnter={() => setActiveMenu(link.children?.length ? link.label : null)}
            >
              {(() => {
                const Icon = navIcons[link.label] ?? ChevronRight;
                const disableTopLevelLink = nonClickableSectionHrefs.has(link.href);
                return (
                  disableTopLevelLink ? (
                    <span
                      className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 inline-flex items-center gap-2 cursor-default"
                      style={{ color: "rgba(224,234,255,0.7)" }}
                    >
                      <Icon size={14} style={{ color: "#00f0ff" }} />
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      href={link.href}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 inline-flex items-center gap-2"
                      style={{ color: "rgba(224,234,255,0.7)" }}
                    >
                      <Icon size={14} style={{ color: "#00f0ff" }} />
                      {link.label}
                    </Link>
                  )
                );
              })()}
              {activeMenu === link.label && link.children?.length ? (
                <div
                  className="absolute top-[calc(100%+10px)] left-0 rounded-2xl p-2 min-w-[240px]"
                  style={{
                    background: "rgba(10,16,43,0.96)",
                    border: "1px solid rgba(100,150,255,0.25)",
                    backdropFilter: "blur(16px)"
                  }}
                >
                  <div className="flex flex-col gap-1">
                    {link.children.map((child) => (
                      (() => {
                        const SubIcon = submenuIcons[child.label] ?? ChevronRight;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="rounded-xl px-3 py-2.5 transition-colors flex items-center gap-2"
                            style={{
                              background: "rgba(100,150,255,0.08)",
                              border: "1px solid rgba(100,150,255,0.14)",
                              color: "#e0eaff"
                            }}
                          >
                            <SubIcon size={14} style={{ color: "#00f0ff" }} />
                            <span className="text-sm font-medium">{child.label}</span>
                          </Link>
                        );
                      })()
                    ))}
                  </div>
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        <Link href="#cta" className="hidden md:inline-flex neon-btn text-sm font-bold" style={{ padding: "0.5rem 1.25rem" }}>
          Book Demo
        </Link>

        <button
          className="md:hidden p-2 rounded-xl"
          style={{ color: "#e0eaff" }}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open ? (
        <div
          className="absolute top-20 left-4 right-4 rounded-[1.5rem] p-5 flex flex-col gap-2 z-50"
          style={{
            background: "rgba(10, 16, 43, 0.97)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(100, 150, 255, 0.2)"
          }}
        >
          {siteNavigation.map((link) => (
            <div key={link.label} className="rounded-xl border p-2" style={{ borderColor: "rgba(100,150,255,0.2)" }}>
              {(() => {
                const Icon = navIcons[link.label] ?? ChevronRight;
                const disableTopLevelLink = nonClickableSectionHrefs.has(link.href);
                return (
                  disableTopLevelLink ? (
                    <span
                      className="px-2 py-2 rounded-xl text-sm font-medium flex items-center gap-2"
                      style={{ color: "rgba(224,234,255,0.9)" }}
                    >
                      <Icon size={14} style={{ color: "#00f0ff" }} />
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      href={link.href}
                      className="px-2 py-2 rounded-xl text-sm font-medium flex items-center gap-2"
                      style={{ color: "rgba(224,234,255,0.9)" }}
                      onClick={() => setOpen(false)}
                    >
                      <Icon size={14} style={{ color: "#00f0ff" }} />
                      {link.label}
                    </Link>
                  )
                );
              })()}
              {link.children?.length ? (
                <div className="mt-1 grid gap-1">
                  {link.children.map((child) => (
                    (() => {
                      const SubIcon = submenuIcons[child.label] ?? ChevronRight;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="px-3 py-2 rounded-lg text-xs flex items-center gap-2"
                          style={{ color: "rgba(224,234,255,0.72)", background: "rgba(100,150,255,0.08)" }}
                          onClick={() => setOpen(false)}
                        >
                          <SubIcon size={12} style={{ color: "#00f0ff" }} />
                          {child.label}
                        </Link>
                      );
                    })()
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </header>
  );
}
