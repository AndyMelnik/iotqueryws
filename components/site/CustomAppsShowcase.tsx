"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Sparkles, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type MetricKey = "trips" | "idle";
type AppSlideKey = "forecast" | "chat" | "suspected";

type ForecastPoint = {
  day: string;
  period: "actual" | "forecast";
  tripsActual: number | null;
  tripsForecast: number | null;
  idleActual: number | null;
  idleForecast: number | null;
};

const forecastData: ForecastPoint[] = [
  { day: "D-6", period: "actual", tripsActual: 310, tripsForecast: null, idleActual: 128, idleForecast: null },
  { day: "D-5", period: "actual", tripsActual: 326, tripsForecast: null, idleActual: 120, idleForecast: null },
  { day: "D-4", period: "actual", tripsActual: 334, tripsForecast: null, idleActual: 116, idleForecast: null },
  { day: "D-3", period: "actual", tripsActual: 342, tripsForecast: null, idleActual: 111, idleForecast: null },
  { day: "D-2", period: "actual", tripsActual: 351, tripsForecast: null, idleActual: 107, idleForecast: null },
  { day: "D-1", period: "actual", tripsActual: 360, tripsForecast: null, idleActual: 103, idleForecast: null },
  { day: "Today", period: "actual", tripsActual: 368, tripsForecast: null, idleActual: 100, idleForecast: null },
  { day: "F+1", period: "forecast", tripsActual: null, tripsForecast: 374, idleActual: null, idleForecast: 98 },
  { day: "F+2", period: "forecast", tripsActual: null, tripsForecast: 380, idleActual: null, idleForecast: 96 },
  { day: "F+3", period: "forecast", tripsActual: null, tripsForecast: 388, idleActual: null, idleForecast: 94 },
  { day: "F+4", period: "forecast", tripsActual: null, tripsForecast: 396, idleActual: null, idleForecast: 91 },
  { day: "F+5", period: "forecast", tripsActual: null, tripsForecast: 404, idleActual: null, idleForecast: 88 },
  { day: "F+6", period: "forecast", tripsActual: null, tripsForecast: 410, idleActual: null, idleForecast: 86 },
  { day: "F+7", period: "forecast", tripsActual: null, tripsForecast: 418, idleActual: null, idleForecast: 84 },
];

const chatTopics = [
  {
    id: "trips",
    question: "How many trips did we complete today?",
    answer:
      "Today: 368 completed trips (+2.2% vs yesterday). Top depots: North Hub 112, Central 96, South 84. Forecast for tomorrow: ~374 trips.",
  },
  {
    id: "distance",
    question: "What distance was covered this week?",
    answer:
      "Total distance this week: 126,400 km. Avg per vehicle: 3,510 km. Long-haul routes contributed 54% of mileage.",
  },
  {
    id: "status",
    question: "Who is online and who is offline now?",
    answer:
      "Current fleet status: 142 online, 23 offline, 11 in maintenance mode. Highest offline concentration: East region (9 units).",
  },
  {
    id: "speeding",
    question: "Who exceeded speed limits today?",
    answer:
      "Speeding events: 27 total across 12 drivers. Highest-risk drivers: D-204 (5), D-118 (4), D-317 (3). Recommend coaching action for top 3.",
  },
];

const suspectedTrips = [
  { id: "TR-12984", route: "North Hub -> East DC", risk: "High", reason: "Unexpected stop + geofence mismatch" },
  { id: "TR-13021", route: "Central Depot -> Port", risk: "Medium", reason: "Idle spike near restricted zone" },
  { id: "TR-13077", route: "South Hub -> Retail Cluster", risk: "High", reason: "Off-route detour for 38 minutes" },
];

export default function CustomAppsShowcase() {
  const [metric, setMetric] = useState<MetricKey>("trips");
  const [topicIndex, setTopicIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTopicIndex((prev) => (prev + 1) % chatTopics.length);
    }, 5200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % 3);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const activeTopic = chatTopics[topicIndex];
  const slides: { key: AppSlideKey; label: string }[] = [
    { key: "forecast", label: "Forecast dashboard" },
    { key: "chat", label: "AI Ops Chat" },
    { key: "suspected", label: "Suspected trips" },
  ];
  const activeSlide = slides[slideIndex];

  return (
    <div className="relative h-full flex flex-col min-h-0">
      <div
        className="rounded-2xl p-3 flex-1 min-h-0 overflow-hidden"
        style={{
          background: "rgba(10,16,43,0.78)",
          border: "1px solid rgba(100,150,255,0.24)",
        }}
      >
        <div className="h-full min-h-[144px] overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
          {activeSlide.key === "forecast" ? (
            <motion.div
              key="forecast"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="rounded-xl p-2.5 min-h-0 h-full flex flex-col overflow-hidden"
              style={{ background: "rgba(100,150,255,0.08)", border: "1px solid rgba(100,150,255,0.22)" }}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} style={{ color: "#00f0ff" }} />
                  <p className="text-xs uppercase tracking-[0.14em]" style={{ color: "rgba(224,234,255,0.72)" }}>
                    Forecast dashboard
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setMetric("trips")}
                    className="px-2 py-0.5 rounded text-[10px]"
                    style={{
                      color: metric === "trips" ? "#050a22" : "rgba(224,234,255,0.75)",
                      background: metric === "trips" ? "rgba(0,240,255,0.9)" : "rgba(100,150,255,0.16)",
                    }}
                  >
                    Trips
                  </button>
                  <button
                    type="button"
                    onClick={() => setMetric("idle")}
                    className="px-2 py-0.5 rounded text-[10px]"
                    style={{
                      color: metric === "idle" ? "#050a22" : "rgba(224,234,255,0.75)",
                      background: metric === "idle" ? "rgba(0,240,255,0.9)" : "rgba(100,150,255,0.16)",
                    }}
                  >
                    Idle time
                  </button>
                </div>
              </div>
              <div className="h-[122px] overflow-hidden flex-1 min-h-0">
                <LineChart width={320} height={122} data={forecastData} margin={{ top: 6, right: 2, left: -22, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(100,150,255,0.15)" strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fill: "rgba(224,234,255,0.55)", fontSize: 9 }} tickLine={false} axisLine={false} interval={1} />
                  <YAxis tick={{ fill: "rgba(224,234,255,0.55)", fontSize: 9 }} tickLine={false} axisLine={false} width={26} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(5,10,34,0.92)",
                      border: "1px solid rgba(100,150,255,0.2)",
                      color: "#e0eaff",
                      fontSize: "11px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey={metric === "trips" ? "tripsActual" : "idleActual"}
                    stroke="#00f0ff"
                    strokeWidth={2}
                    dot={false}
                    connectNulls
                    isAnimationActive
                  />
                  <Line
                    type="monotone"
                    dataKey={metric === "trips" ? "tripsForecast" : "idleForecast"}
                    stroke="#b300ff"
                    strokeWidth={2}
                    strokeDasharray="5 4"
                    dot={false}
                    connectNulls
                    isAnimationActive
                  />
                </LineChart>
              </div>
              <p className="text-[10px] mt-1" style={{ color: "rgba(224,234,255,0.62)" }}>
                Last 7 days (actual) + next 7 days (forecast)
              </p>
            </motion.div>
          ) : activeSlide.key === "chat" ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="rounded-xl p-2.5 min-h-0 h-full flex flex-col overflow-hidden"
              style={{ background: "rgba(179,0,255,0.08)", border: "1px solid rgba(179,0,255,0.26)" }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Bot size={14} style={{ color: "#b300ff" }} />
                <p className="text-xs uppercase tracking-[0.14em]" style={{ color: "rgba(224,234,255,0.72)" }}>
                  AI Ops Chat
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mb-1">
                {chatTopics.map((topic, idx) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setTopicIndex(idx)}
                    className="px-2 py-0.5 rounded text-[10px]"
                    style={{
                      color: idx === topicIndex ? "#050a22" : "rgba(224,234,255,0.75)",
                      background: idx === topicIndex ? "rgba(179,0,255,0.9)" : "rgba(100,150,255,0.16)",
                    }}
                  >
                    {topic.id}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTopic.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 min-h-0 overflow-hidden"
                >
                  <div
                    className="rounded-lg px-2.5 py-1 text-[10px] mb-1"
                    style={{ background: "rgba(100,150,255,0.16)", color: "rgba(224,234,255,0.9)" }}
                  >
                    {activeTopic.question}
                  </div>
                  <div
                    className="rounded-lg px-2.5 py-1 text-[10px] leading-snug line-clamp-3"
                    style={{ background: "rgba(5,10,34,0.45)", color: "rgba(224,234,255,0.86)" }}
                  >
                    {activeTopic.answer}
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="mt-1 flex items-center gap-1">
                <Sparkles size={12} style={{ color: "#00f0ff" }} />
                <span className="text-[9px] truncate" style={{ color: "rgba(224,234,255,0.62)" }}>
                  AI answers across trips, mileage, status, and speeding topics
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="suspected"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="rounded-xl p-2.5 min-h-0 h-full flex flex-col overflow-hidden"
              style={{ background: "rgba(255,206,84,0.07)", border: "1px solid rgba(255,206,84,0.28)" }}
            >
              <p className="text-[11px] uppercase tracking-[0.12em] mb-1" style={{ color: "rgba(255,220,140,0.85)" }}>
                Suspected trips
              </p>
              <div className="flex-1 min-h-0 overflow-hidden space-y-1">
                {suspectedTrips.slice(0, 2).map((trip) => (
                  <div
                    key={trip.id}
                    className="rounded-lg px-2 py-1 text-[9px] leading-tight"
                    style={{ background: "rgba(5,10,34,0.45)", border: "1px solid rgba(255,206,84,0.2)" }}
                  >
                    <p className="font-semibold text-white/90 text-[9px]">
                      {trip.id} - {trip.risk} risk
                    </p>
                    <p className="text-white/75 truncate text-[9px]">{trip.route}</p>
                    <p className="text-white/70 truncate text-[9px]">{trip.reason}</p>
                  </div>
                ))}
              </div>
              <p className="text-[8px] mt-0.5 truncate" style={{ color: "rgba(255,220,140,0.8)" }}>
                Auto-flagged routes for review by operations team
              </p>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-center gap-1.5">
        {slides.map((slide, idx) => (
          <button
            key={slide.key}
            type="button"
            onClick={() => setSlideIndex(idx)}
            className="h-2.5 w-2.5 rounded-full transition-all"
            style={{
              border:
                idx === slideIndex
                  ? "1px solid rgba(0,240,255,0.95)"
                  : "1px solid rgba(100,150,255,0.45)",
              background:
                idx === slideIndex
                  ? "rgba(0,240,255,0.85)"
                  : "rgba(100,150,255,0.22)",
              opacity: idx === slideIndex ? 1 : 0.9,
            }}
            aria-label={`Show ${slide.label}`}
          />
        ))}
      </div>
    </div>
  );
}
