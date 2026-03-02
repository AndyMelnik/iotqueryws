"use client";

import { FileCheck, Shield, Scale, Clock } from "lucide-react";

const riskItems = [
  { label: "Driver risk score", value: "0–100", trend: "↓ 12% vs last month" },
  { label: "Overspeed events", value: "23", sub: "80–100 km/h bucket" },
  { label: "Fatigue / rest compliance", value: "98%", sub: "7-day rolling" },
];

const complianceItems = [
  { rule: "EU Regulation 165/2014", area: "Tachograph", status: "Compliant", detail: "Driving & rest hours" },
  { rule: "EU AETR", area: "International", status: "In scope", detail: "Cross-border journeys" },
  { rule: "Working Time Directive", area: "WTD", status: "Tracked", detail: "Weekly limits" },
];

const tachoExample = [
  { period: "Driving", max: "9h", current: "7h 20m", pct: 81 },
  { period: "Break (min 45m)", required: "1 × 45m or 2 × 15m+30m", current: "✓ 52m" },
  { period: "Daily rest", required: "11h (reduced 9h × 3/week)", current: "12h 05m" },
];

export default function ComplianceReportingFrame() {
  return (
    <div className="flex flex-col gap-4">
      {/* Risk & compliance intro */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: <Shield size={14} />, label: "Risk", color: "#ff3366" },
          { icon: <FileCheck size={14} />, label: "Compliance", color: "#00f0ff" },
          { icon: <Scale size={14} />, label: "Regulatory", color: "#b300ff" },
        ].map((c) => (
          <div
            key={c.label}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
            style={{ background: `${c.color}0c`, border: `1px solid ${c.color}25` }}
          >
            <span style={{ color: c.color }}>{c.icon}</span>
            <span className="text-sm font-semibold" style={{ color: "#e0eaff" }}>{c.label}</span>
          </div>
        ))}
      </div>

      {/* Risk snapshot */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(100,150,255,0.12)" }}>
        <div className="px-4 py-2.5 text-[9px] font-semibold tracking-widest uppercase" style={{ background: "rgba(100,150,255,0.06)", color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)" }}>
          Risk snapshot
        </div>
        <div className="divide-y" style={{ borderColor: "rgba(100,150,255,0.08)" }}>
          {riskItems.map((r, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-2.5">
              <span className="text-sm" style={{ color: "rgba(224,234,255,0.65)" }}>{r.label}</span>
              <div className="text-right">
                <span className="text-sm font-bold" style={{ color: "#b300ff" }}>{r.value}</span>
                {r.sub && <div className="text-[10px]" style={{ color: "rgba(224,234,255,0.4)" }}>{r.sub}</div>}
                {r.trend && <div className="text-[10px]" style={{ color: "#00f0ff" }}>{r.trend}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory — Tacho (EU) example */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(179,0,255,0.2)" }}>
        <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: "rgba(179,0,255,0.08)", borderBottom: "1px solid rgba(179,0,255,0.15)" }}>
          <Clock size={12} style={{ color: "#b300ff" }} />
          <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#b300ff", fontFamily: "var(--font-jetbrains-mono)" }}>
            Example: EU tachograph rules (Reg. 165/2014)
          </span>
        </div>
        <div className="p-4 space-y-3">
          {tachoExample.map((row, i) => (
            <div key={i} className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-medium" style={{ color: "#e0eaff" }}>{row.period}</span>
              <div className="flex items-center gap-3" style={{ color: "rgba(224,234,255,0.55)" }}>
                {"required" in row && <span>{row.required}</span>}
                {"max" in row && <span>Max {row.max}</span>}
                <span className="font-semibold" style={{ color: "#00f0ff" }}>{row.current}</span>
                {"pct" in row && <span className="text-[10px]" style={{ color: "rgba(224,234,255,0.4)" }}>{row.pct}% used</span>}
              </div>
            </div>
          ))}
          <p className="text-[11px] pt-1" style={{ color: "rgba(224,234,255,0.4)" }}>
            Custom reports can combine telematics events with driver/vehicle dimensions to output compliance-ready views for EU tacho, AETR, WTD, and your own rules.
          </p>
        </div>
      </div>

      {/* Compliance rules table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(100,150,255,0.12)" }}>
        <div className="px-4 py-2.5 text-[9px] font-semibold tracking-widest uppercase" style={{ background: "rgba(100,150,255,0.06)", color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)" }}>
          Regulatory scope (examples)
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr style={{ background: "rgba(100,150,255,0.04)" }}>
                <th className="px-4 py-2 text-left font-semibold" style={{ color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)", fontSize: 9 }}>Rule / standard</th>
                <th className="px-4 py-2 text-left font-semibold" style={{ color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)", fontSize: 9 }}>Area</th>
                <th className="px-4 py-2 text-left font-semibold" style={{ color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)", fontSize: 9 }}>Status</th>
                <th className="px-4 py-2 text-left font-semibold" style={{ color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)", fontSize: 9 }}>Detail</th>
              </tr>
            </thead>
            <tbody>
              {complianceItems.map((r, i) => (
                <tr key={i} style={{ borderTop: "1px solid rgba(100,150,255,0.07)" }}>
                  <td className="px-4 py-2" style={{ color: "#e0eaff" }}>{r.rule}</td>
                  <td className="px-4 py-2" style={{ color: "rgba(224,234,255,0.55)" }}>{r.area}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold" style={{ background: "rgba(0,240,255,0.12)", color: "#00f0ff" }}>{r.status}</span>
                  </td>
                  <td className="px-4 py-2" style={{ color: "rgba(224,234,255,0.45)" }}>{r.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
