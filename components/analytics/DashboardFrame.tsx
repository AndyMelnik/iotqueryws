"use client";

import { useState, useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { dailyKPIs, vehicles, employees } from "@/lib/mockFleetData";

const inputCls =
  "rounded-xl px-3 py-2 text-sm outline-none transition-all duration-200 w-full";
const inputStyle = {
  background: "rgba(100,150,255,0.06)",
  border: "1px solid rgba(100,150,255,0.2)",
  color: "#e0eaff",
};

export default function DashboardFrame() {
  const [vehicleId, setVehicleId] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const filtered = useMemo(() => {
    let rows = dailyKPIs;
    if (vehicleId) rows = rows.filter((r) => r.vehicle_id === vehicleId);
    if (employeeId) rows = rows.filter((r) => r.employee_id === employeeId);
    return rows;
  }, [vehicleId, employeeId]);

  // Aggregate by day
  const byDay = useMemo(() => {
    const map: Record<string, { day: string; trips: number; distance: number; cost: number; violations: number }> = {};
    filtered.forEach((r) => {
      if (!map[r.day]) map[r.day] = { day: r.day, trips: 0, distance: 0, cost: 0, violations: 0 };
      map[r.day].trips += r.trip_count;
      map[r.day].distance += r.distance_km;
      map[r.day].cost += r.total_cost_est;
      map[r.day].violations += r.violation_count;
    });
    return Object.values(map)
      .sort((a, b) => a.day.localeCompare(b.day))
      .map((r) => ({
        ...r,
        day: new Date(r.day).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        distance: parseFloat(r.distance.toFixed(0)),
        cost: parseFloat(r.cost.toFixed(0)),
      }));
  }, [filtered]);

  const totals = useMemo(() => ({
    trips: filtered.reduce((s, r) => s + r.trip_count, 0),
    distance: filtered.reduce((s, r) => s + r.distance_km, 0).toFixed(0),
    cost: filtered.reduce((s, r) => s + r.total_cost_est, 0).toFixed(0),
    violations: filtered.reduce((s, r) => s + r.violation_count, 0),
  }), [filtered]);

  const tooltipStyle = {
    backgroundColor: "#0a102b",
    border: "1px solid rgba(100,150,255,0.25)",
    borderRadius: 12,
    color: "#e0eaff",
    fontSize: 12,
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[140px]">
          <label className="block text-[9px] tracking-widest uppercase mb-1.5" style={{ color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)" }}>
            Vehicle
          </label>
          <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} className={inputCls} style={inputStyle}>
            <option value="">All Vehicles</option>
            {vehicles.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-[140px]">
          <label className="block text-[9px] tracking-widest uppercase mb-1.5" style={{ color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)" }}>
            Driver
          </label>
          <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} className={inputCls} style={inputStyle}>
            <option value="">All Drivers</option>
            {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Trips", value: totals.trips, color: "#b300ff" },
          { label: "Distance (km)", value: totals.distance, color: "#00f0ff" },
          { label: "Total Cost (€)", value: `€${totals.cost}`, color: "#b300ff" },
          { label: "Violations", value: totals.violations, color: "#ff6060" },
        ].map((kpi) => (
          <div key={kpi.label} className="p-4 rounded-2xl flex flex-col gap-1" style={{ background: "rgba(100,150,255,0.05)", border: "1px solid rgba(100,150,255,0.15)" }}>
            <div className="text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</div>
            <div className="text-xs" style={{ color: "rgba(224,234,255,0.45)", fontFamily: "var(--font-jetbrains-mono)" }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl" style={{ background: "rgba(100,150,255,0.04)", border: "1px solid rgba(100,150,255,0.12)" }}>
          <div className="text-xs font-semibold mb-3 tracking-wide uppercase" style={{ color: "rgba(224,234,255,0.5)", fontFamily: "var(--font-jetbrains-mono)" }}>
            Trips & Distance
          </div>
          <ResponsiveContainer width="100%" height={110}>
            <LineChart data={byDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,150,255,0.1)" />
              <XAxis dataKey="day" tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} yAxisId="left" />
              <YAxis orientation="right" tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} yAxisId="right" />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "rgba(224,234,255,0.6)" }} />
              <Line yAxisId="left" type="monotone" dataKey="trips" stroke="#b300ff" strokeWidth={2} dot={false} name="Trips" />
              <Line yAxisId="right" type="monotone" dataKey="distance" stroke="#00f0ff" strokeWidth={2} dot={false} name="Distance km" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 rounded-2xl" style={{ background: "rgba(100,150,255,0.04)", border: "1px solid rgba(100,150,255,0.12)" }}>
          <div className="text-xs font-semibold mb-3 tracking-wide uppercase" style={{ color: "rgba(224,234,255,0.5)", fontFamily: "var(--font-jetbrains-mono)" }}>
            Cost & Violations
          </div>
          <ResponsiveContainer width="100%" height={110}>
            <BarChart data={byDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,150,255,0.1)" />
              <XAxis dataKey="day" tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} yAxisId="left" />
              <YAxis orientation="right" tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} yAxisId="right" />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "rgba(224,234,255,0.6)" }} />
              <Bar yAxisId="left" dataKey="cost" fill="#b300ff" fillOpacity={0.7} name="Cost €" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="violations" fill="#ff6060" fillOpacity={0.7} name="Violations" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(100,150,255,0.12)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: "rgba(100,150,255,0.06)" }}>
                {["Date", "Vehicle", "Driver", "Trips", "Distance", "Cost", "Violations"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold tracking-widest uppercase" style={{ color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)", fontSize: 9 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 5).map((r, i) => (
                <tr key={i} style={{ borderTop: "1px solid rgba(100,150,255,0.08)" }}>
                  <td className="px-4 py-2.5" style={{ color: "rgba(224,234,255,0.55)" }}>{new Date(r.day).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td>
                  <td className="px-4 py-2.5" style={{ color: "#e0eaff" }}>{r.vehicle_name}</td>
                  <td className="px-4 py-2.5" style={{ color: "rgba(224,234,255,0.55)" }}>{r.employee_name}</td>
                  <td className="px-4 py-2.5" style={{ color: "#b300ff" }}>{r.trip_count}</td>
                  <td className="px-4 py-2.5" style={{ color: "rgba(224,234,255,0.55)" }}>{r.distance_km} km</td>
                  <td className="px-4 py-2.5" style={{ color: "#00f0ff" }}>€{r.total_cost_est}</td>
                  <td className="px-4 py-2.5" style={{ color: r.violation_count > 3 ? "#ff6060" : "rgba(224,234,255,0.55)" }}>{r.violation_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
