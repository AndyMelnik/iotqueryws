"use client";

import { motion } from "framer-motion";
import { BarChart2, FileCheck, RefreshCw, MessageSquare, TrendingUp, CheckCircle2 } from "lucide-react";
import dynamic from "next/dynamic";

// Lazy-load frames (client-only, chart-heavy)
const DashboardFrame         = dynamic(() => import("@/components/analytics/DashboardFrame"), { ssr: false, loading: () => <FrameLoader /> });
const ComplianceReportingFrame = dynamic(() => import("@/components/analytics/ComplianceReportingFrame"), { ssr: false, loading: () => <FrameLoader /> });
const TransformFrame         = dynamic(() => import("@/components/analytics/TransformFrame"), { ssr: false, loading: () => <FrameLoader /> });
const AIChatFrame            = dynamic(() => import("@/components/analytics/AIChatFrame"), { ssr: false, loading: () => <FrameLoader /> });
const ForecastFrame          = dynamic(() => import("@/components/analytics/ForecastFrame"), { ssr: false, loading: () => <FrameLoader /> });

function FrameLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex items-center gap-3" style={{ color: "rgba(224,234,255,0.35)" }}>
        <RefreshCw size={15} className="animate-spin" />
        <span className="text-sm" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>Loading…</span>
      </div>
    </div>
  );
}

interface SectionDef {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
  usps: string[];
  component: React.ComponentType;
  flip: boolean; // true = interactive left, text right
}

const SECTIONS: SectionDef[] = [
  {
    id: "analytics-dashboard",
    eyebrow: "Realtime Dashboards",
    title: "Live KPIs and charts from your telematics data.",
    description:
      "Filter by vehicle, driver, or time range. Dashboards update in real time — every metric is a direct SQL query. No exports, no waiting.",
    accent: "#b300ff",
    icon: <BarChart2 size={18} />,
    usps: [
      "Analyze your fleet data from different perspectives — vehicle, driver, department, depot, etc",
      "Track operational performance in real time — trips, vehicle statuses, idle time, shift activity, and route progress",
      "Monitor sensor data and operational conditions — temperature, humidity, cargo status, engine RPM",
      "Measure operational costs and efficiency metrics - cost per kilometer, trip, or driver",
      "Identify operational delays and bottlenecks — loading time, idling time, route deviations",
    ],
    component: DashboardFrame,
    flip: false,
  },
  {
    id: "analytics-compliance",
    eyebrow: "Custom Reporting",
    title: "Risk, compliance, and regulatory — built for your rules.",
    description:
      "Build reports for driver risk, fatigue, and regulatory compliance. Example: EU tachograph rules (Reg. 165/2014) for driving and rest hours and your own policies.",
    accent: "#ff3366",
    icon: <FileCheck size={18} />,
    usps: [
      "Generate reports based on your operational structure — by vehicle, driver, department, depot, route, or customer contract",
      "Create compliance reports for regulatory requirements - driver working hours, tachograph (Tacho) data",
      "Produce automated reports for fleet performance - trips completed, utilization rates, idle time, and operational productivity",
      "Produce customer-facing reports for contracts and SLAs - delivery performance, service reliability, and operational compliance",
      "Export reports for internal and external stakeholders such as management, regulators, insurance providers, or logistics partners",
    ],
    component: ComplianceReportingFrame,
    flip: true,
  },
  {
    id: "analytics-transform",
    eyebrow: "Data Transformation & Aggregation",
    title: "Custom states and statuses that match how you work.",
    description:
      "Define and aggregate custom statuses — e.g. drilling, loading goods, on trip — from raw telemetry. Roll up by time window, vehicle, or driver for dashboards and models.",
    accent: "#00f0ff",
    icon: <RefreshCw size={18} />,
    usps: [
      "Create meaningful operational states - trips started, loading in progress, vehicle idle",
      "Work with your custom-created events — what happened at a point in time (e.g. an accident)",
      "Combine multiple data signals into one business status — i.e GPS stop + door sensor + time window = Dwelling - warehouse loading event",
      "Aggregate vehicle activity into operational views - trips per day, active vehicles per depot, or fleet utilization by department",
      "Standardize operational data across multiple fleets or customers so dashboards and reports can compare performance consistently",
    ],
    component: TransformFrame,
    flip: false,
  },
  {
    id: "analytics-ai",
    eyebrow: "AI-Readiness",
    title: "Build custom Assistants and Agents with MCP.",
    description:
      "Your telematics data is queryable via SQL — ready for AI. Use Model Context Protocol (MCP) to power custom assistants, agents, and workflows without rebuilding your stack.",
    accent: "#b300ff",
    icon: <MessageSquare size={18} />,
    usps: [
      "Create AI assistants that analyze operational data automatically and highlight inefficiencies in routes, fuel usage, or vehicle utilization",
      "Enable AI agents to trigger workflows automatically such as scheduling maintenance tasks, notifying managers about risks, or generating reports",
      "Generate automated operational summaries showing daily fleet performance, driver activity, and operational efficiency",
      "Provide instant explanations for operational changes such as increases in fuel costs, delays in deliveries, or drops in vehicle utilization",
      "Automate and digitize your workflows with AI-based tools and resources — notifications, reports, and more",
    ],
    component: AIChatFrame,
    flip: true,
  },
  {
    id: "analytics-forecast",
    eyebrow: "Data Modeling",
    title: "ML and forecasting on unified telematics.",
    description:
      "Combine data modeling with ML and forecasting: predict costs, fuel, and utilization from your unified dataset. Historical + forecast views with confidence intervals.",
    accent: "#00f0ff",
    icon: <TrendingUp size={18} />,
    usps: [
      "Model operational costs across your fleet — estimate cost per vehicle, route, trip, or depot based on real usage patterns",
      "Predict vehicle availability and fleet capacity to plan upcoming deliveries, shifts, or seasonal demand",
      "Identify unusual patterns and operational anomalies such as sudden fuel spikes, abnormal idle time, or unexpected downtime",
      "Forecast maintenance needs based on vehicle usage including mileage, operating hours, and engine performance trends",
      "Support strategic planning with predictive insights such as expected fleet demand, fuel budgets, and maintenance scheduling"
    ],
    component: ForecastFrame,
    flip: false,
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" as const } },
};

const slideIn = (flip: boolean) => ({
  hidden: { opacity: 0, x: flip ? 32 : -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: "easeInOut" as const } },
});

export default function AnalyticsHub() {
  return (
    <div id="analytics">
      {/* Global section header */}
      <div className="py-16 px-4 text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn}>
          <p className="text-xs font-medium mb-4 tracking-widest uppercase" style={{ color: "#b300ff", fontFamily: "var(--font-jetbrains-mono)" }}>
            Live Analytics Modules
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#e0eaff" }}>
            Interactive Fleet Intelligence
          </h2>
          <p className="mt-4 text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(224,234,255,0.5)" }}>
            Every module runs on a live demo fleet dataset. Filters, charts, and AI responses are fully interactive — no backend setup needed.
          </p>
        </motion.div>
      </div>

      {/* Neon divider */}
      <div className="neon-divider mx-auto max-w-6xl" />

      {/* Alternating sections */}
      {SECTIONS.map((sec, idx) => {
        const ActiveFrame = sec.component;
        return (
          <section
            key={sec.id}
            id={sec.id}
            className="py-20 px-4 scroll-mt-24"
            style={{
              background: idx % 2 === 1 ? "rgba(100,150,255,0.015)" : "transparent",
              borderTop: idx > 0 ? "1px solid rgba(100,150,255,0.07)" : undefined,
            }}
          >
            <div className="max-w-6xl mx-auto">
              <div className={`flex flex-col ${sec.flip ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-start`}>

                {/* ── Description column ── */}
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={slideIn(!sec.flip)}
                  className="lg:w-[38%] shrink-0 flex flex-col gap-6 lg:sticky lg:top-28"
                >
                  {/* Eyebrow */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${sec.accent}18`, border: `1px solid ${sec.accent}40`, color: sec.accent }}
                    >
                      {sec.icon}
                    </div>
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{ color: sec.accent, fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      {sec.eyebrow}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight" style={{ color: "#e0eaff" }}>
                    {sec.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base leading-relaxed" style={{ color: "rgba(224,234,255,0.55)" }}>
                    {sec.description}
                  </p>

                  {/* USP bullets */}
                  <ul className="flex flex-col gap-2.5">
                    {sec.usps.map((usp) => (
                      <li key={usp} className="flex items-center gap-2.5">
                        <CheckCircle2 size={14} style={{ color: sec.accent }} className="shrink-0" />
                        <span className="text-sm" style={{ color: "rgba(224,234,255,0.65)" }}>{usp}</span>
                      </li>
                    ))}
                  </ul>

                </motion.div>

                {/* ── Interactive frame column ── */}
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={slideIn(sec.flip)}
                  className="flex-1 min-w-0"
                >
                  <div
                    className="rounded-[2rem] p-5 md:p-7"
                    style={{
                      background: "rgba(10,16,43,0.75)",
                      border: "1px solid rgba(100,150,255,0.15)",
                      backdropFilter: "blur(20px)",
                      boxShadow: `0 0 50px ${sec.accent}0d, 0 24px 60px rgba(0,0,0,0.4)`,
                    }}
                  >
                    {/* Frame header */}
                    <div className="flex items-center gap-2 mb-5 pb-4 border-b" style={{ borderColor: "rgba(100,150,255,0.1)" }}>
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,90,90,0.6)" }} />
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,190,60,0.6)" }} />
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(50,210,100,0.6)" }} />
                      </div>
                      <span className="text-[10px] tracking-widest ml-1" style={{ color: "rgba(224,234,255,0.3)", fontFamily: "var(--font-jetbrains-mono)" }}>
                        {sec.eyebrow.toLowerCase().replace(/ /g, "_")}.module
                      </span>
                      <div className="ml-auto">
                        <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: `${sec.accent}18`, color: sec.accent, fontFamily: "var(--font-jetbrains-mono)", border: `1px solid ${sec.accent}30` }}>
                          INTERACTIVE
                        </span>
                      </div>
                    </div>

                    <ActiveFrame />
                  </div>
                </motion.div>

              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
