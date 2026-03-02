"use client";

import { useState, useMemo } from "react";
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { forecastData } from "@/lib/mockFleetData";

const tooltipStyle = {
  backgroundColor: "#0a102b",
  border: "1px solid rgba(100,150,255,0.25)",
  borderRadius: 12,
  color: "#e0eaff",
  fontSize: 12,
};

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });

export default function ForecastFrame() {
  const [showHistorical, setShowHistorical] = useState(true);
  const [showForecast, setShowForecast] = useState(true);

  // Historical points, one bridge (forecast starts where historical ends), then forecast points — trajectories connect
  const chartData = useMemo(() => {
    const histRows = forecastData.historical;
    const hist = histRows.map((r) => ({
      label: fmt(r.day),
      day: r.day,
      historical_cost: r.total_cost_est,
      forecast_cost: undefined as number | undefined,
      historical_fuel: r.fuel_consumed_liters,
      forecast_fuel: undefined as number | undefined,
      historical_distance: r.distance_km,
      forecast_distance: undefined as number | undefined,
    }));
    const last = histRows[histRows.length - 1];
    const bridge = {
      label: fmt(last.day),
      day: last.day,
      historical_cost: last.total_cost_est,
      forecast_cost: last.total_cost_est,
      historical_fuel: last.fuel_consumed_liters,
      forecast_fuel: last.fuel_consumed_liters,
      historical_distance: last.distance_km,
      forecast_distance: last.distance_km,
    };
    const fc = forecastData.forecast.map((r) => ({
      label: fmt(r.day),
      day: r.day,
      historical_cost: undefined as number | undefined,
      forecast_cost: r.predicted_cost,
      historical_fuel: undefined as number | undefined,
      forecast_fuel: r.predicted_fuel,
      historical_distance: undefined as number | undefined,
      forecast_distance: r.predicted_distance,
    }));
    return [...hist.slice(0, -1), bridge, ...fc];
  }, []);

  const hasAnySeries = showHistorical || showForecast;

  return (
    <div className="flex flex-col gap-4">
      {/* Toggles: choose which lines to show */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)" }}>
          Show lines:
        </span>
        <button
          type="button"
          onClick={() => setShowHistorical((v) => !v)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
          style={
            showHistorical
              ? { background: "rgba(179,0,255,0.2)", border: "1px solid rgba(179,0,255,0.5)", color: "#b300ff", cursor: "pointer" }
              : { background: "rgba(100,150,255,0.06)", border: "1px solid rgba(100,150,255,0.2)", color: "rgba(224,234,255,0.4)", cursor: "pointer" }
          }
        >
          <span className="w-2 h-0.5 rounded-full" style={{ background: showHistorical ? "#b300ff" : "transparent", border: "1px solid rgba(255,255,255,0.3)" }} />
          Historical
        </button>
        <button
          type="button"
          onClick={() => setShowForecast((v) => !v)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
          style={
            showForecast
              ? { background: "rgba(0,240,255,0.15)", border: "1px solid rgba(0,240,255,0.45)", color: "#00f0ff", cursor: "pointer" }
              : { background: "rgba(100,150,255,0.06)", border: "1px solid rgba(100,150,255,0.2)", color: "rgba(224,234,255,0.4)", cursor: "pointer" }
          }
        >
          <span className="w-2 h-0.5 rounded-full border-t-2 border-dashed" style={{ borderColor: showForecast ? "#00f0ff" : "rgba(255,255,255,0.2)" }} />
          Forecast
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Avg Daily Cost", value: `€${forecastData.metrics.avg_daily_cost}`, color: "#b300ff" },
          { label: "Avg Daily Fuel", value: `${forecastData.metrics.avg_daily_fuel} L`, color: "#00f0ff" },
          { label: "Avg Daily Distance", value: `${forecastData.metrics.avg_daily_distance} km`, color: "#b300ff" },
        ].map((m) => (
          <div key={m.label} className="p-4 rounded-2xl flex flex-col gap-1" style={{ background: "rgba(100,150,255,0.05)", border: "1px solid rgba(100,150,255,0.15)" }}>
            <div className="text-2xl font-bold" style={{ color: m.color }}>{m.value}</div>
            <div className="text-xs" style={{ color: "rgba(224,234,255,0.45)", fontFamily: "var(--font-jetbrains-mono)" }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Cost chart — Historical (solid) + Forecast (dashed) */}
      <div className="p-4 rounded-2xl" style={{ background: "rgba(100,150,255,0.04)", border: "1px solid rgba(100,150,255,0.12)" }}>
        <div className="text-xs font-semibold mb-3 tracking-wide uppercase" style={{ color: "rgba(224,234,255,0.5)", fontFamily: "var(--font-jetbrains-mono)" }}>
          Cost — Historical vs 7-day forecast
        </div>
        <ResponsiveContainer width="100%" height={120}>
          {hasAnySeries ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,150,255,0.1)" />
              <XAxis dataKey="label" tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="line" wrapperStyle={{ fontSize: 11, color: "rgba(224,234,255,0.6)" }} />
              {showHistorical && (
                <Line
                  type="monotone"
                  dataKey="historical_cost"
                  stroke="#b300ff"
                  strokeWidth={2}
                  dot={{ fill: "#b300ff", r: 3 }}
                  connectNulls
                  name="Historical (Cost €)"
                />
              )}
              {showForecast && (
                <Line
                  type="monotone"
                  dataKey="forecast_cost"
                  stroke="#00f0ff"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "#00f0ff", r: 3 }}
                  connectNulls
                  name="Forecast (Cost €)"
                />
              )}
            </LineChart>
          ) : (
            <div className="flex items-center justify-center h-full" style={{ color: "rgba(224,234,255,0.35)", fontSize: 12 }}>Toggle Historical or Forecast to see chart</div>
          )}
        </ResponsiveContainer>
      </div>

      {/* Fuel + Distance charts — same pattern */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { keyFuel: "historical_fuel", keyFc: "forecast_fuel", label: "Fuel (L)", colorH: "#b300ff", colorF: "#00f0ff" },
          { keyFuel: "historical_distance", keyFc: "forecast_distance", label: "Distance (km)", colorH: "#b300ff", colorF: "#00f0ff" },
        ].map((cfg) => (
          <div key={cfg.label} className="p-4 rounded-2xl" style={{ background: "rgba(100,150,255,0.04)", border: "1px solid rgba(100,150,255,0.12)" }}>
            <div className="text-xs font-semibold mb-3 tracking-wide uppercase" style={{ color: "rgba(224,234,255,0.5)", fontFamily: "var(--font-jetbrains-mono)" }}>{cfg.label} — Historical vs forecast</div>
            <ResponsiveContainer width="100%" height={90}>
              {hasAnySeries ? (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,150,255,0.1)" />
                  <XAxis dataKey="label" tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(224,234,255,0.4)", fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend iconType="line" wrapperStyle={{ fontSize: 10 }} />
                  {showHistorical && (
                    <Line type="monotone" dataKey={cfg.keyFuel} stroke={cfg.colorH} strokeWidth={2} dot={{ r: 2 }} connectNulls name="Historical" />
                  )}
                  {showForecast && (
                    <Line type="monotone" dataKey={cfg.keyFc} stroke={cfg.colorF} strokeWidth={2} strokeDasharray="5 5" dot={{ r: 2 }} connectNulls name="Forecast" />
                  )}
                </LineChart>
              ) : (
                <div className="flex items-center justify-center h-full" style={{ color: "rgba(224,234,255,0.35)", fontSize: 11 }}>Toggle to see chart</div>
              )}
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      {/* Forecast table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(100,150,255,0.12)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: "rgba(100,150,255,0.06)" }}>
                {["Date", "Predicted Cost", "Predicted Fuel", "Distance", "Confidence"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold tracking-widest uppercase" style={{ color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)", fontSize: 9 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {forecastData.forecast.map((r, i) => (
                <tr key={i} style={{ borderTop: "1px solid rgba(100,150,255,0.08)" }}>
                  <td className="px-4 py-2.5" style={{ color: "rgba(224,234,255,0.55)" }}>{fmt(r.day)}</td>
                  <td className="px-4 py-2.5 font-semibold" style={{ color: "#b300ff" }}>€{r.predicted_cost}</td>
                  <td className="px-4 py-2.5" style={{ color: "#00f0ff" }}>{r.predicted_fuel} L</td>
                  <td className="px-4 py-2.5" style={{ color: "rgba(224,234,255,0.55)" }}>{r.predicted_distance} km</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(100,150,255,0.15)" }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${r.confidence * 100}%`, background: r.confidence > 0.8 ? "#00f0ff" : r.confidence > 0.6 ? "#ffaa00" : "#ff6060" }} />
                      </div>
                      <span style={{ color: "rgba(224,234,255,0.55)" }}>{(r.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
