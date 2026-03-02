"use client";

import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { RefreshCw } from "lucide-react";
import { statusTimeSeries, eventHourly, vehicleAgg, sensorAgg } from "@/lib/mockFleetData";

type TabKey = "status" | "events" | "aggregation" | "sensor";

const tooltipStyle = {
  backgroundColor: "#0a102b",
  border: "1px solid rgba(100,150,255,0.25)",
  borderRadius: 12,
  color: "#e0eaff",
  fontSize: 12,
};

export default function TransformFrame() {
  const [tab, setTab] = useState<TabKey>("status");
  const [refreshKey, setRefreshKey] = useState(0);

  const tabs: { key: TabKey; label: string }[] = [
    { key: "status", label: "Custom statuses (e.g. drilling, loading, trips)" },
    { key: "events", label: "Event Transformation" },
    { key: "aggregation", label: "Vehicle Aggregation" },
    { key: "sensor", label: "Sensor Aggregation" },
  ];

  const renderChart = () => {
    if (tab === "status") {
      return (
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={statusTimeSeries}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,150,255,0.1)" />
            <XAxis dataKey="label" tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 9 }} axisLine={false} tickLine={false} interval={3} />
            <YAxis tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "rgba(224,234,255,0.6)" }} />
            <Line type="monotone" dataKey="online_count" stroke="#00f0ff" strokeWidth={2} dot={false} name="Online" />
            <Line type="monotone" dataKey="moving_count" stroke="#b300ff" strokeWidth={2} dot={false} name="Moving / Trips" />
            <Line type="monotone" dataKey="idling_count" stroke="#ffaa00" strokeWidth={2} dot={false} name="Idling / Loading" />
          </LineChart>
        </ResponsiveContainer>
      );
    }
    if (tab === "events") {
      return (
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={eventHourly}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,150,255,0.1)" />
            <XAxis dataKey="label" tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="event_count" fill="#b300ff" fillOpacity={0.7} name="Events" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    }
    if (tab === "aggregation") {
      return (
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={vehicleAgg}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,150,255,0.1)" />
            <XAxis dataKey="vehicle_name" tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} yAxisId="left" />
            <YAxis orientation="right" tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} yAxisId="right" />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "rgba(224,234,255,0.6)" }} />
            <Bar yAxisId="left" dataKey="trip_count" fill="#b300ff" fillOpacity={0.7} name="Trips" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="idle_hours" fill="#ffaa00" fillOpacity={0.7} name="Idle hrs" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    }
    // sensor
    const bySensor = sensorAgg.reduce<Record<string, any[]>>((acc, r) => {
      acc[r.sensor_name] = acc[r.sensor_name] || [];
      acc[r.sensor_name].push(r);
      return acc;
    }, {});
    return (
      <div className="flex flex-col gap-4">
        {Object.entries(bySensor).map(([name, rows]) => (
          <div key={name}>
            <div className="text-xs mb-2" style={{ color: "rgba(224,234,255,0.45)", fontFamily: "var(--font-jetbrains-mono)" }}>{name}</div>
            <ResponsiveContainer width="100%" height={90}>
              <LineChart data={rows}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,150,255,0.1)" />
                <XAxis dataKey="day" tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="avg_value" stroke="#b300ff" strokeWidth={2} dot name="Avg" />
                <Line type="monotone" dataKey="max_value" stroke="#ff3366" strokeWidth={1.5} strokeDasharray="4 2" dot={false} name="Max" />
                <Line type="monotone" dataKey="min_value" stroke="#00f0ff" strokeWidth={1.5} strokeDasharray="4 2" dot={false} name="Min" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    );
  };

  const tableData = () => {
    if (tab === "status") return statusTimeSeries.slice(0, 5) as any[];
    if (tab === "events") return eventHourly.slice(0, 5) as any[];
    if (tab === "aggregation") return vehicleAgg as any[];
    return sensorAgg.slice(0, 5) as any[];
  };

  const tableColumns = () => {
    const data = tableData();
    if (!data.length) return [];
    return Object.keys(data[0]);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Tabs + Refresh */}
      <div className="flex items-start gap-3 flex-wrap">
        <div className="flex flex-wrap gap-2 flex-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={
                tab === t.key
                  ? { background: "rgba(179,0,255,0.2)", border: "1px solid rgba(179,0,255,0.5)", color: "#b300ff", cursor: "pointer" }
                  : { background: "rgba(100,150,255,0.05)", border: "1px solid rgba(100,150,255,0.2)", color: "rgba(224,234,255,0.55)", cursor: "pointer" }
              }
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setRefreshKey((k) => k + 1)}
          className="p-2.5 rounded-xl transition-all duration-200"
          style={{ background: "rgba(100,150,255,0.06)", border: "1px solid rgba(100,150,255,0.2)", color: "rgba(224,234,255,0.55)", cursor: "pointer" }}
          title="Refresh"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Chart */}
      <div className="p-4 rounded-2xl" style={{ background: "rgba(100,150,255,0.04)", border: "1px solid rgba(100,150,255,0.12)" }} key={refreshKey}>
        <div className="text-xs font-semibold mb-3 tracking-wide uppercase" style={{ color: "rgba(224,234,255,0.5)", fontFamily: "var(--font-jetbrains-mono)" }}>
          {tab === "status" && "Custom status aggregation (e.g. drilling, loading goods, trips) — 5-min"}
          {tab === "events" && "Event State Transformation — hourly"}
          {tab === "aggregation" && "Vehicle-Level Aggregation"}
          {tab === "sensor" && "Sensor Signal Aggregation"}
        </div>
        {renderChart()}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(100,150,255,0.12)" }}>
        <div className="px-4 py-2.5 text-[9px] font-semibold tracking-widest uppercase" style={{ background: "rgba(100,150,255,0.06)", color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)" }}>
          Transformed data sample
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: "rgba(100,150,255,0.04)" }}>
                {tableColumns().map((col) => (
                  <th key={col} className="px-4 py-2 text-left font-semibold whitespace-nowrap" style={{ color: "rgba(224,234,255,0.35)", fontFamily: "var(--font-jetbrains-mono)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData().map((row, i) => (
                <tr key={i} style={{ borderTop: "1px solid rgba(100,150,255,0.07)" }}>
                  {Object.values(row).map((val: any, j) => (
                    <td key={j} className="px-4 py-2 whitespace-nowrap" style={{ color: typeof val === "number" ? "#b300ff" : "rgba(224,234,255,0.55)" }}>
                      {typeof val === "number" ? parseFloat(val.toFixed(2)) : String(val).slice(0, 20)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
