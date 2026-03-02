// ─── Mock Fleet Dataset ────────────────────────────────────────────────────────
// Mirrors the schema from the demos seed-db.js

export const vehicles = [
  { id: "V001", name: "Truck Alpha", plate: "ABC-123", type: "Truck" },
  { id: "V002", name: "Truck Beta", plate: "DEF-456", type: "Truck" },
  { id: "V003", name: "Van Gamma", plate: "GHI-789", type: "Van" },
  { id: "V004", name: "Van Delta", plate: "JKL-012", type: "Van" },
  { id: "V005", name: "Truck Epsilon", plate: "MNO-345", type: "Truck" },
];

export const employees = [
  { id: "E001", name: "John Smith", dept: "Logistics", group: "North" },
  { id: "E002", name: "Jane Doe", dept: "Delivery", group: "South" },
  { id: "E003", name: "Bob Johnson", dept: "Delivery", group: "East" },
  { id: "E004", name: "Alice Williams", dept: "Logistics", group: "West" },
  { id: "E005", name: "Charlie Brown", dept: "Warehouse", group: "North" },
];

// Last 7 days of daily KPIs
const today = new Date();
export const dailyKPIs = Array.from({ length: 7 }, (_, dayOffset) => {
  const day = new Date(today);
  day.setDate(today.getDate() - (6 - dayOffset));
  const dayStr = day.toISOString().split("T")[0];
  return vehicles.map((v, idx) => ({
    day: dayStr,
    vehicle_id: v.id,
    vehicle_name: v.name,
    employee_id: employees[idx].id,
    employee_name: employees[idx].name,
    trip_count: Math.floor(5 + (dayOffset + idx) * 1.7 % 10),
    distance_km: parseFloat((150 + Math.sin(dayOffset + idx) * 80 + idx * 40).toFixed(1)),
    idle_time_s: Math.floor(1800 + (dayOffset * 300 + idx * 400) % 3600),
    violation_count: Math.floor((dayOffset + idx) % 5),
    total_cost_est: parseFloat((80 + Math.cos(dayOffset + idx) * 30 + idx * 15).toFixed(2)),
    fuel_consumed_liters: parseFloat((45 + Math.sin(dayOffset) * 15 + idx * 8).toFixed(1)),
  }));
}).flat();

// Trips with anomaly labels
const anomalyTypes = ["normal", "normal", "normal", "high_speed", "low_efficiency", "excessive_idle"];
export const trips = vehicles.flatMap((v, vIdx) =>
  Array.from({ length: 20 }, (_, i) => {
    const daysAgo = Math.floor(i / 4);
    const start = new Date(today);
    start.setDate(today.getDate() - daysAgo);
    start.setHours(6 + (i % 10), (i * 7) % 60);
    const durationS = 1800 + (i * 400 + vIdx * 200) % 5400;
    const distanceKm = parseFloat((20 + (i * 3.7 + vIdx * 8) % 180).toFixed(1));
    const avgSpeed = parseFloat(((distanceKm / (durationS / 3600))).toFixed(1));
    return {
      trip_id: `T-${v.id}-${i}`,
      vehicle_id: v.id,
      vehicle_name: v.name,
      employee_id: employees[vIdx].id,
      employee_name: employees[vIdx].name,
      start_ts: start.toISOString(),
      distance_km: distanceKm,
      duration_s: durationS,
      avg_speed: avgSpeed,
      anomaly_type: anomalyTypes[(i + vIdx) % anomalyTypes.length],
    };
  })
);

// Fuel daily
export const fuelDaily = Array.from({ length: 7 }, (_, dayOffset) => {
  const day = new Date(today);
  day.setDate(today.getDate() - (6 - dayOffset));
  const dayStr = day.toISOString().split("T")[0];
  return vehicles.map((v, idx) => ({
    day: dayStr,
    vehicle_id: v.id,
    vehicle_name: v.name,
    refuel_liters: parseFloat((40 + Math.sin(dayOffset + idx) * 20).toFixed(1)),
    consumed_liters: parseFloat((35 + Math.cos(dayOffset + idx) * 15 + idx * 5).toFixed(1)),
    l_per_100km: parseFloat((9 + Math.sin(dayOffset * 0.7 + idx) * 3).toFixed(2)),
    anomaly_type:
      idx === 2 && dayOffset === 3 ? "high_consumption"
      : idx === 4 && dayOffset === 1 ? "suspicious_low"
      : "normal",
  }));
}).flat();

// Sensor alerts
export const sensorAlerts = vehicles.flatMap((v, vIdx) =>
  Array.from({ length: 6 }, (_, i) => {
    const ts = new Date(today);
    ts.setDate(today.getDate() - Math.floor(i / 2));
    ts.setHours(8 + i * 2);
    return {
      alert_id: `ALT-${v.id}-${i}`,
      device_id: `D00${vIdx + 1}`,
      vehicle_id: v.id,
      vehicle_name: v.name,
      ts_utc: ts.toISOString(),
      signal: ["temperature", "battery_voltage", "rpm", "accelerometer"][i % 4],
      alert_type: ["threshold_exceeded", "rapid_change", "offline_event"][i % 3],
      value: parseFloat((30 + (i + vIdx) * 4.5).toFixed(1)),
      threshold: 45,
    };
  })
);

// Forecast: 3 days historical + 7 days projected
export const forecastData = {
  historical: Array.from({ length: 3 }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (2 - i));
    const base = dailyKPIs.filter((k) => k.day === day.toISOString().split("T")[0]);
    return {
      day: day.toISOString().split("T")[0],
      total_cost_est: parseFloat((base.reduce((s, r) => s + r.total_cost_est, 0)).toFixed(2)),
      fuel_consumed_liters: parseFloat((base.reduce((s, r) => s + r.fuel_consumed_liters, 0)).toFixed(1)),
      distance_km: parseFloat((base.reduce((s, r) => s + r.distance_km, 0)).toFixed(1)),
    };
  }),
  forecast: Array.from({ length: 7 }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() + i + 1);
    const trend = 1 + i * 0.02;
    return {
      day: day.toISOString().split("T")[0],
      predicted_cost: parseFloat((480 * trend + Math.sin(i) * 25).toFixed(2)),
      predicted_fuel: parseFloat((220 * trend + Math.cos(i) * 12).toFixed(1)),
      predicted_distance: parseFloat((800 * trend + Math.sin(i * 0.5) * 40).toFixed(1)),
      confidence: parseFloat((0.95 - i * 0.04).toFixed(2)),
    };
  }),
  metrics: {
    avg_daily_cost: 482.4,
    avg_daily_fuel: 218.6,
    avg_daily_distance: 812.3,
  },
};

// Status time-series (5-min buckets, last 2 hours)
export const statusTimeSeries = Array.from({ length: 24 }, (_, i) => {
  const ts = new Date(today);
  ts.setHours(today.getHours() - 2);
  ts.setMinutes(i * 5);
  return {
    ts_5min: ts.toISOString(),
    label: `${String(ts.getHours()).padStart(2, "0")}:${String(ts.getMinutes()).padStart(2, "0")}`,
    online_count: 3 + (i % 3),
    moving_count: 2 + (i % 2),
    idling_count: Math.floor(i % 3 > 1 ? 1 : 0),
  };
});

// Event transformation hourly
export const eventHourly = Array.from({ length: 12 }, (_, i) => {
  const h = new Date(today);
  h.setHours(today.getHours() - 11 + i, 0, 0);
  return {
    hour: h.toISOString(),
    label: `${String(h.getHours()).padStart(2, "0")}:00`,
    event_count: 8 + (i * 3 + 5) % 20,
    state_name: ["Moving", "Idling", "Parked", "Moving", "Moving", "Idling", "Moving", "Parked", "Moving", "Moving", "Idling", "Moving"][i],
  };
});

// Vehicle aggregation
export const vehicleAgg = vehicles.map((v, idx) => ({
  vehicle_id: v.id,
  vehicle_name: v.name,
  trip_count: 12 + idx * 3,
  total_distance: parseFloat((350 + idx * 80).toFixed(1)),
  total_idle_time: (idx + 2) * 3600,
  idle_hours: parseFloat(((idx + 2)).toFixed(1)),
}));

// Sensor aggregation
export const sensorAgg = [
  { day: "2d ago", sensor_name: "Temperature", avg_value: 38.2, min_value: 31.0, max_value: 48.7 },
  { day: "1d ago", sensor_name: "Temperature", avg_value: 40.1, min_value: 33.4, max_value: 51.2 },
  { day: "Today",  sensor_name: "Temperature", avg_value: 37.5, min_value: 29.8, max_value: 46.3 },
  { day: "2d ago", sensor_name: "Battery V",   avg_value: 12.4, min_value: 11.8, max_value: 12.9 },
  { day: "1d ago", sensor_name: "Battery V",   avg_value: 12.2, min_value: 11.5, max_value: 12.8 },
  { day: "Today",  sensor_name: "Battery V",   avg_value: 12.6, min_value: 12.0, max_value: 13.1 },
];

// AI Chat responses (keyword-based)
export const chatResponses: { keywords: string[]; sql: string; answer: string }[] = [
  {
    keywords: ["fuel", "waste", "consume"],
    sql: `SELECT v.vehicle_name, SUM(f.consumed_liters) AS total_fuel
FROM fact_fuel_daily f
JOIN dim_vehicles v ON f.vehicle_id = v.id
GROUP BY v.vehicle_name ORDER BY total_fuel DESC LIMIT 5;`,
    answer: `🔍 **Top fuel consumers (last 7 days):**

| Vehicle | Fuel (L) |
|---------|----------|
| Truck Alpha | 318.4 L |
| Truck Beta | 297.1 L |
| Truck Epsilon | 285.8 L |
| Van Gamma | 201.3 L |
| Van Delta | 189.6 L |

Truck Alpha consumes **18% more** than fleet average. Recommend reviewing route efficiency and idle reduction for this asset.`,
  },
  {
    keywords: ["risk", "driver", "violation", "dangerous"],
    sql: `SELECT e.employee_name, SUM(k.violation_count) AS violations
FROM agg_entity_daily_kpis k
JOIN dim_employees e ON k.employee_id = e.id
GROUP BY e.employee_name ORDER BY violations DESC LIMIT 5;`,
    answer: `⚠️ **Risk ranking by violations (last 7 days):**

| Driver | Violations |
|--------|------------|
| Charlie Brown | 14 |
| Bob Johnson | 11 |
| John Smith | 8 |
| Jane Doe | 5 |
| Alice Williams | 3 |

Charlie Brown has **40% above-average** violations. Primary type: overspeed (bucket 80–100 km/h). Recommend coaching session.`,
  },
  {
    keywords: ["utilization", "utilise", "utilization", "active", "how many"],
    sql: `SELECT COUNT(*) AS total, SUM(moving_flag) AS moving, SUM(idling_flag) AS idling
FROM agg_current_device_status;`,
    answer: `📊 **Fleet utilization — right now:**

- **5 / 5** vehicles online
- **3** actively moving
- **1** idling
- **1** parked

Fleet utilization: **60% moving** (above industry avg of 45%). Idle ratio: 20% — within acceptable range.`,
  },
  {
    keywords: ["cost", "expense", "spend", "analytics"],
    sql: `SELECT day, SUM(total_cost_est) AS daily_cost
FROM agg_entity_daily_kpis
GROUP BY day ORDER BY day DESC LIMIT 7;`,
    answer: `💰 **Cost analytics — last 7 days:**

| Date | Daily Cost |
|------|------------|
| Today | €492.30 |
| Yesterday | €478.50 |
| 2 days ago | €501.20 |
| 3 days ago | €455.80 |
| 4 days ago | €489.10 |
| 5 days ago | €512.40 |
| 6 days ago | €468.90 |

**7-day total: €3,398.20** · Avg: €485.46/day · Highest single-vehicle cost: Truck Alpha at €118.50/day.`,
  },
  {
    keywords: ["anomal", "alert", "unusual", "detect"],
    sql: `SELECT anomaly_type, COUNT(*) AS cnt
FROM fact_trips WHERE anomaly_type != 'normal'
GROUP BY anomaly_type ORDER BY cnt DESC;`,
    answer: `🚨 **Anomaly summary (last 7 days):**

| Type | Count |
|------|-------|
| High speed | 18 |
| Low efficiency | 14 |
| Excessive idle | 9 |

**41 anomalous trips** out of 100 total (41%). High-speed events are most frequent — concentrated in North region routes. Recommend geofence speed enforcement on these corridors.`,
  },
  {
    keywords: ["forecast", "predict", "next week", "next month"],
    sql: `SELECT day, predicted_cost, confidence
FROM forecast_daily ORDER BY day ASC LIMIT 7;`,
    answer: `📈 **7-day cost forecast:**

Next week predicted spend: **€3,520 ± €140**

Forecast confidence: 95% → 67% (degrades over time)

Key risk factors:
- **+12% fuel price trend** (external signal)
- Charlie Brown's vehicle due for maintenance (flag)
- North region high-traffic period next Thursday

Recommended action: Pre-schedule maintenance for V005 to avoid cost spike.`,
  },
];
