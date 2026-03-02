"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCheck, Shield, Scale, Clock } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { dailyKPIs, trips } from "@/lib/mockFleetData";

const complianceItems = [
  { rule: "EU Regulation 165/2014", area: "Tachograph", status: "Compliant", detail: "Driving & rest hours" },
  { rule: "EU AETR", area: "International", status: "In scope", detail: "Cross-border journeys" },
  { rule: "Working Time Directive", area: "WTD", status: "Tracked", detail: "Weekly limits" },
];

const tachoDrivers = [
  { id: "d1", name: "Current driver", drivingPct: 81, breakMins: 52, restHours: "12h 05m" },
  { id: "d2", name: "Driver 2", drivingPct: 65, breakMins: 45, restHours: "11h 30m" },
  { id: "d3", name: "Driver 3", drivingPct: 92, breakMins: 38, restHours: "9h 00m" },
];

const tooltipStyle = {
  backgroundColor: "#0a102b",
  border: "1px solid rgba(179,0,255,0.25)",
  borderRadius: 8,
  color: "#e0eaff",
  fontSize: 11,
};

export default function ComplianceReportingFrame() {
  const [activeTab, setActiveTab] = useState<"risk" | "tacho" | "regulatory">("risk");
  const [daysBack, setDaysBack] = useState(7);
  const [selectedDriver, setSelectedDriver] = useState(tachoDrivers[0].id);

  const riskMetrics = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysBack);
    const cutoffStr = cutoff.toISOString().split("T")[0];
    const kpis = dailyKPIs.filter((k) => k.day >= cutoffStr);
    const tripList = trips.filter((t) => t.start_ts >= cutoff.toISOString());
    const totalViolations = kpis.reduce((s, r) => s + r.violation_count, 0);
    const overspeedCount = tripList.filter((t) => t.anomaly_type === "high_speed").length;
    const driverRiskScore = Math.max(0, Math.min(100, 100 - totalViolations * 3 - overspeedCount * 4));
    const fatigueCompliance = kpis.length > 0 ? Math.min(100, 100 - totalViolations * 2) : 98;
    return {
      driverRiskScore,
      overspeedCount,
      fatigueCompliance: Math.round(fatigueCompliance),
      totalViolations,
    };
  }, [daysBack]);

  const violationsByDay = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysBack);
    const cutoffStr = cutoff.toISOString().split("T")[0];
    const kpis = dailyKPIs.filter((k) => k.day >= cutoffStr);
    const byDay: Record<string, number> = {};
    kpis.forEach((k) => {
      byDay[k.day] = (byDay[k.day] || 0) + k.violation_count;
    });
    return Object.entries(byDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([day, count]) => ({
        day: new Date(day).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        dayKey: day,
        violations: count,
      }));
  }, [daysBack]);

  const riskScoreByDay = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysBack);
    const cutoffStr = cutoff.toISOString().split("T")[0];
    const kpis = dailyKPIs.filter((k) => k.day >= cutoffStr);
    const tripList = trips.filter((t) => t.start_ts >= cutoff.toISOString());
    const byDay: Record<string, { violations: number; overspeed: number }> = {};
    kpis.forEach((k) => {
      if (!byDay[k.day]) byDay[k.day] = { violations: 0, overspeed: 0 };
      byDay[k.day].violations += k.violation_count;
    });
    tripList.forEach((t) => {
      const day = t.start_ts.split("T")[0];
      if (day >= cutoffStr) {
        if (!byDay[day]) byDay[day] = { violations: 0, overspeed: 0 };
        if (t.anomaly_type === "high_speed") byDay[day].overspeed += 1;
      }
    });
    return Object.entries(byDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([day, v]) => {
        const score = Math.max(0, Math.min(100, 100 - v.violations * 3 - v.overspeed * 4));
        return {
          day: new Date(day).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          riskScore: score,
          compliance: Math.min(100, 100 - v.violations * 2),
        };
      });
  }, [daysBack]);

  const driverComparisonData = useMemo(() => [
    { driver: tachoDrivers[0].name, drivingPct: tachoDrivers[0].drivingPct },
    { driver: tachoDrivers[1].name, drivingPct: tachoDrivers[1].drivingPct },
    { driver: tachoDrivers[2].name, drivingPct: tachoDrivers[2].drivingPct },
  ], []);

  const complianceStatusData = [
    { status: "Compliant", count: 4 },
    { status: "In scope", count: 2 },
    { status: "Tracked", count: 3 },
  ];

  const selectedTachoDriver = tachoDrivers.find((d) => d.id === selectedDriver) ?? tachoDrivers[0];

  const tabs = [
    { id: "risk" as const, label: "Risk snapshot", icon: <Shield size={12} /> },
    { id: "tacho" as const, label: "Tacho (EU)", icon: <Clock size={12} /> },
    { id: "regulatory" as const, label: "Regulatory", icon: <FileCheck size={12} /> },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Tab navigation */}
      <div className="flex flex-wrap gap-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200"
            style={
              activeTab === tab.id
                ? { background: "rgba(179,0,255,0.15)", border: "1px solid rgba(179,0,255,0.4)", color: "#e0eaff" }
                : { background: "rgba(100,150,255,0.06)", border: "1px solid rgba(100,150,255,0.15)", color: "rgba(224,234,255,0.6)" }
            }
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "risk" && (
          <motion.div
            key="risk"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {/* Time range filter */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] tracking-widest uppercase" style={{ color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)" }}>
                Risk snapshot
              </span>
              <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(100,150,255,0.2)" }}>
                {[7, 30].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDaysBack(d)}
                    className="px-2.5 py-1 text-[10px] font-medium transition-colors"
                    style={
                      daysBack === d
                        ? { background: "rgba(179,0,255,0.2)", color: "#e0eaff" }
                        : { background: "transparent", color: "rgba(224,234,255,0.5)" }
                    }
                  >
                    Last {d}d
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { label: "Driver risk score", value: riskMetrics.driverRiskScore, suffix: "", trend: "0–100", color: "#b300ff" },
                { label: "Overspeed events", value: riskMetrics.overspeedCount, suffix: "", trend: "80–100 km/h", color: "#ff3366" },
                { label: "Fatigue / rest compliance", value: riskMetrics.fatigueCompliance, suffix: "%", trend: "7-day rolling", color: "#00f0ff" },
              ].map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl px-3 py-2.5"
                  style={{ background: "rgba(100,150,255,0.06)", border: "1px solid rgba(100,150,255,0.12)" }}
                >
                  <div className="text-[10px]" style={{ color: "rgba(224,234,255,0.6)" }}>{m.label}</div>
                  <div className="text-lg font-bold" style={{ color: m.color }}>{m.value}{m.suffix}</div>
                  <div className="text-[9px]" style={{ color: "rgba(224,234,255,0.4)" }}>{m.trend}</div>
                </motion.div>
              ))}
            </div>
            {violationsByDay.length > 0 && (
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(100,150,255,0.1)" }}>
                <div className="px-3 py-1.5 text-[9px] tracking-widest uppercase" style={{ background: "rgba(100,150,255,0.05)", color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)" }}>
                  Violations by day
                </div>
                <ResponsiveContainer width="100%" height={80}>
                  <BarChart data={violationsByDay} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
                    <XAxis dataKey="day" tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 8 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [v != null ? `${v} violations` : "", ""]} />
                    <Bar dataKey="violations" fill="#b300ff" fillOpacity={0.7} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
            {riskScoreByDay.length > 0 && (
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(100,150,255,0.1)" }}>
                <div className="px-3 py-1.5 text-[9px] tracking-widest uppercase" style={{ background: "rgba(100,150,255,0.05)", color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)" }}>
                  Risk score trend
                </div>
                <ResponsiveContainer width="100%" height={90}>
                  <LineChart data={riskScoreByDay} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
                    <CartesianGrid strokeDasharray="2 2" stroke="rgba(100,150,255,0.1)" />
                    <XAxis dataKey="day" tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 8 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 8 }} width={24} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [v != null ? v : "", "Risk score"]} />
                    <Line type="monotone" dataKey="riskScore" stroke="#b300ff" strokeWidth={2} dot={{ fill: "#b300ff", r: 3 }} name="Risk score" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "tacho" && (
          <motion.div
            key="tacho"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(179,0,255,0.08)", border: "1px solid rgba(179,0,255,0.15)" }}>
              <Clock size={12} style={{ color: "#b300ff" }} />
              <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#b300ff", fontFamily: "var(--font-jetbrains-mono)" }}>
                EU tachograph (Reg. 165/2014)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[10px]" style={{ color: "rgba(224,234,255,0.5)" }}>Driver:</label>
              <select
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="rounded-lg px-2.5 py-1.5 text-xs outline-none"
                style={{ background: "rgba(100,150,255,0.08)", border: "1px solid rgba(100,150,255,0.2)", color: "#e0eaff" }}
              >
                {tachoDrivers.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-medium" style={{ color: "#e0eaff" }}>Driving (max 9h)</span>
                <span className="font-semibold" style={{ color: "#00f0ff" }}>{selectedTachoDriver.drivingPct}% used</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(100,150,255,0.1)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #b300ff, #00f0ff)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedTachoDriver.drivingPct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-medium" style={{ color: "#e0eaff" }}>Break (min 45m)</span>
                <span style={{ color: "rgba(224,234,255,0.55)" }}>1 × 45m or 2 × 15m+30m</span>
                <span className="font-semibold" style={{ color: "#00f0ff" }}>✓ {selectedTachoDriver.breakMins}m</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-medium" style={{ color: "#e0eaff" }}>Daily rest</span>
                <span style={{ color: "rgba(224,234,255,0.55)" }}>11h (reduced 9h × 3/week)</span>
                <span className="font-semibold" style={{ color: "#00f0ff" }}>{selectedTachoDriver.restHours}</span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(100,150,255,0.1)" }}>
              <div className="px-3 py-1.5 text-[9px] tracking-widest uppercase" style={{ background: "rgba(100,150,255,0.05)", color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)" }}>
                Driver comparison — driving time used
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={driverComparisonData} layout="vertical" margin={{ top: 4, right: 4, bottom: 4, left: 2 }}>
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 8 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="driver" tick={{ fill: "rgba(224,234,255,0.6)", fontSize: 9 }} width={92} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => [v != null ? `${v}%` : "", "Driving used"]} />
                  <Legend wrapperStyle={{ fontSize: 10 }} iconType="circle" iconSize={8} formatter={() => "Driving % used"} />
                  <Bar dataKey="drivingPct" fill="#b300ff" fillOpacity={0.8} radius={[0, 3, 3, 0]} name="Driving % used" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] pt-1" style={{ color: "rgba(224,234,255,0.4)" }}>
              Custom reports combine telematics events with driver/vehicle dimensions for EU tacho, AETR, WTD.
            </p>
          </motion.div>
        )}

        {activeTab === "regulatory" && (
          <motion.div
            key="regulatory"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(100,150,255,0.1)" }}>
              <div className="px-3 py-1.5 text-[9px] tracking-widest uppercase" style={{ background: "rgba(100,150,255,0.05)", color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)" }}>
                Compliance status overview
              </div>
              <ResponsiveContainer width="100%" height={80}>
                <BarChart data={complianceStatusData} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                  <XAxis dataKey="status" tick={{ fill: "rgba(224,234,255,0.5)", fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 8 }} width={20} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => [v != null ? v : "", "Rules"]} />
                  <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                    <Cell fill="#00f0ff" />
                    <Cell fill="#b300ff" />
                    <Cell fill="rgba(224,234,255,0.5)" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(100,150,255,0.12)" }}>
              <div className="px-4 py-2.5 text-[9px] font-semibold tracking-widest uppercase flex items-center gap-2" style={{ background: "rgba(100,150,255,0.06)", color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)" }}>
                <Scale size={10} />
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
                      <motion.tr
                        key={r.rule}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        style={{ borderTop: "1px solid rgba(100,150,255,0.07)" }}
                        className="transition-colors duration-150 hover:bg-[rgba(179,0,255,0.06)]"
                      >
                        <td className="px-4 py-2" style={{ color: "#e0eaff" }}>{r.rule}</td>
                        <td className="px-4 py-2" style={{ color: "rgba(224,234,255,0.55)" }}>{r.area}</td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold" style={{ background: "rgba(0,240,255,0.12)", color: "#00f0ff" }}>{r.status}</span>
                        </td>
                        <td className="px-4 py-2" style={{ color: "rgba(224,234,255,0.45)" }}>{r.detail}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
