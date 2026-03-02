"use client";

import { useState, useMemo } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { AlertTriangle, Zap } from "lucide-react";
import { trips, fuelDaily, sensorAlerts } from "@/lib/mockFleetData";

type TabKey = "trip" | "fuel" | "sensor";

const anomalyColor: Record<string, string> = {
  high_speed: "#ff3366",
  low_efficiency: "#ffaa00",
  excessive_idle: "#ff6600",
  high_consumption: "#ff3366",
  suspicious_low: "#ffaa00",
  threshold_exceeded: "#ff3366",
  rapid_change: "#ffaa00",
  offline_event: "#b300ff",
  normal: "#00f0ff",
};

const tooltipStyle = {
  backgroundColor: "#0a102b",
  border: "1px solid rgba(100,150,255,0.25)",
  borderRadius: 12,
  color: "#e0eaff",
  fontSize: 12,
};

export default function AnomalyFrame() {
  const [tab, setTab] = useState<TabKey>("trip");

  const tripAnomalies = useMemo(() =>
    trips.filter((t) => t.anomaly_type !== "normal"), []);

  const fuelAnomalies = useMemo(() =>
    fuelDaily.filter((f) => f.anomaly_type !== "normal"), []);

  const activeData = tab === "trip" ? tripAnomalies : tab === "fuel" ? fuelAnomalies : sensorAlerts;

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    activeData.forEach((r: any) => {
      const t = r.anomaly_type || r.alert_type || "unknown";
      map[t] = (map[t] || 0) + 1;
    });
    return map;
  }, [activeData]);

  const scatterData = useMemo(() =>
    tab === "trip"
      ? tripAnomalies.filter((t) => t.avg_speed && t.distance_km).map((t) => ({
          x: parseFloat(t.avg_speed.toFixed(1)),
          y: parseFloat(t.distance_km.toFixed(1)),
          type: t.anomaly_type,
          label: t.vehicle_name,
        }))
      : [], [tab, tripAnomalies]);

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["trip", "fuel", "sensor"] as TabKey[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
            style={
              tab === t
                ? { background: "rgba(179,0,255,0.2)", border: "1px solid rgba(179,0,255,0.5)", color: "#b300ff", cursor: "pointer" }
                : { background: "rgba(100,150,255,0.05)", border: "1px solid rgba(100,150,255,0.2)", color: "rgba(224,234,255,0.55)", cursor: "pointer" }
            }
          >
            {t === "trip" ? "Trip Anomalies" : t === "fuel" ? "Fuel Anomalies" : "Sensor Alerts"}
          </button>
        ))}
      </div>

      {/* Count badges */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(counts).map(([type, count]) => (
          <div key={type} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(100,150,255,0.06)", border: "1px solid rgba(100,150,255,0.15)" }}>
            <AlertTriangle size={13} style={{ color: anomalyColor[type] || "#ffaa00" }} />
            <span className="text-xs" style={{ color: "rgba(224,234,255,0.6)", textTransform: "capitalize" }}>{type.replace(/_/g, " ")}</span>
            <span className="text-sm font-bold" style={{ color: anomalyColor[type] || "#ffaa00" }}>{count}</span>
          </div>
        ))}
        {Object.keys(counts).length === 0 && (
          <div className="text-sm" style={{ color: "rgba(224,234,255,0.4)" }}>No anomalies detected in this category.</div>
        )}
      </div>

      {/* Scatter chart for trips */}
      {tab === "trip" && scatterData.length > 0 && (
        <div className="p-4 rounded-2xl" style={{ background: "rgba(100,150,255,0.04)", border: "1px solid rgba(100,150,255,0.12)" }}>
          <div className="text-xs font-semibold mb-3 tracking-wide uppercase" style={{ color: "rgba(224,234,255,0.5)", fontFamily: "var(--font-jetbrains-mono)" }}>
            Speed vs Distance — anomaly distribution
          </div>
          <ResponsiveContainer width="100%" height={110}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,150,255,0.1)" />
              <XAxis dataKey="x" name="Avg Speed km/h" tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: "Avg Speed (km/h)", fill: "rgba(224,234,255,0.3)", fontSize: 10, dy: 14 }} />
              <YAxis dataKey="y" name="Distance km" tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={scatterData} name="Trips">
                {scatterData.map((entry, i) => (
                  <Cell key={i} fill={anomalyColor[entry.type] || "#00f0ff"} fillOpacity={0.8} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-3">
            {Object.entries(anomalyColor).filter(([k]) => k !== "normal").map(([type, color]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                <span className="text-[10px]" style={{ color: "rgba(224,234,255,0.45)", textTransform: "capitalize" }}>{type.replace(/_/g, " ")}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Anomaly list */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(100,150,255,0.12)" }}>
        <div className="px-4 py-3 text-xs font-semibold tracking-widest uppercase" style={{ background: "rgba(100,150,255,0.06)", color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)", fontSize: 9 }}>
          Recent Anomalies
        </div>
        <div className="flex flex-col divide-y" style={{ borderColor: "rgba(100,150,255,0.08)" }}>
          {(activeData as any[]).slice(0, 5).map((row, i) => {
            const type = row.anomaly_type || row.alert_type || "unknown";
            const color = anomalyColor[type] || "#ffaa00";
            return (
              <div key={i} className="flex items-start gap-3 px-4 py-3">
                <div className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}18`, border: `1px solid ${color}40` }}>
                  <Zap size={12} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold" style={{ color: "#e0eaff" }}>{row.vehicle_name || row.device_id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${color}18`, color, fontFamily: "var(--font-jetbrains-mono)", textTransform: "capitalize" }}>
                      {type.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs" style={{ color: "rgba(224,234,255,0.45)" }}>
                    <span>{new Date(row.start_ts || row.ts_utc).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                    {row.avg_speed && <span>Speed: {row.avg_speed.toFixed(1)} km/h</span>}
                    {row.distance_km && <span>Dist: {row.distance_km.toFixed(1)} km</span>}
                    {row.value && <span>Value: {row.value.toFixed(1)} (threshold: {row.threshold})</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
