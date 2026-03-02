"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  LineChart,
  Bot,
  Rocket,
  BarChart2,
  Settings,
  Brain,
  Code,
  Truck,
  UserCheck,
  Wrench,
  Fuel,
  Activity,
  ArrowRight,
  ChevronLeft,
  Check,
  Send,
  CheckCircle2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FunnelState {
  outcomeGoal: string[];
  customerType: string[];
  operationsArea: string[];
}

const defaultFunnel: FunnelState = {
  outcomeGoal: [],
  customerType: [],
  operationsArea: [],
};

// ─── Shared style helpers (no backdrop-filter on interactive elements) ─────────
const cardBase: React.CSSProperties = {
  background: "rgba(100,150,255,0.05)",
  border: "1px solid rgba(100,150,255,0.2)",
  cursor: "pointer",
};

const cardSelected: React.CSSProperties = {
  border: "1px solid rgba(179,0,255,0.55)",
  background: "rgba(179,0,255,0.1)",
  boxShadow: "0 0 24px rgba(179,0,255,0.15)",
  cursor: "pointer",
};

const cardHover: React.CSSProperties = {
  border: "1px solid rgba(179,0,255,0.3)",
  background: "rgba(179,0,255,0.06)",
  cursor: "pointer",
};

// ─── Step Progress Bar ─────────────────────────────────────────────────────────
function StepBar({ step, total }: { step: number; total: number }) {
  const labels = ["Objectives", "Operations", "Capabilities", "Solution"];
  return (
    <div className="flex items-center gap-2 mb-8 justify-center">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i + 1 === step;
        const isDone = i + 1 < step;
        return (
          <div key={i} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={
                  isDone
                    ? { background: "rgba(0,240,255,0.2)", border: "1px solid #00f0ff", color: "#00f0ff" }
                    : isActive
                    ? { background: "linear-gradient(135deg,#b300ff,#00f0ff)", color: "#050a22" }
                    : { background: "rgba(100,150,255,0.08)", border: "1px solid rgba(100,150,255,0.2)", color: "rgba(224,234,255,0.3)" }
                }
              >
                {isDone ? <Check size={12} /> : i + 1}
              </div>
              <span
                className="text-[9px] tracking-widest uppercase hidden sm:block"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  color: isActive ? "#b300ff" : isDone ? "#00f0ff" : "rgba(224,234,255,0.25)",
                }}
              >
                {labels[i]}
              </span>
            </div>
            {i < total - 1 && (
              <div
                className="w-8 sm:w-14 h-px mt-[-10px]"
                style={{
                  background: isDone
                    ? "linear-gradient(90deg,#00f0ff,rgba(179,0,255,0.4))"
                    : "rgba(100,150,255,0.15)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Big Option Card ──────────────────────────────────────────────────────────
function BigCard({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const style = selected ? cardSelected : hovered ? cardHover : cardBase;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-200"
      style={style}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
        style={
          selected
            ? { background: "rgba(179,0,255,0.2)", border: "1px solid rgba(179,0,255,0.4)" }
            : hovered
            ? { background: "rgba(179,0,255,0.1)", border: "1px solid rgba(179,0,255,0.25)" }
            : { background: "rgba(100,150,255,0.08)", border: "1px solid rgba(100,150,255,0.15)" }
        }
      >
        <span style={{ color: selected || hovered ? "#b300ff" : "rgba(224,234,255,0.5)" }}>
          {icon}
        </span>
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div
          className="text-sm font-bold leading-snug"
          style={{ color: selected ? "#e0eaff" : hovered ? "#e0eaff" : "rgba(224,234,255,0.75)" }}
        >
          {label}
        </div>
      </div>
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200"
        style={
          selected
            ? { background: "rgba(179,0,255,0.3)", border: "1px solid rgba(179,0,255,0.5)" }
            : { background: "rgba(100,150,255,0.08)", border: "1px solid rgba(100,150,255,0.15)" }
        }
      >
        {selected && <Check size={11} style={{ color: "#b300ff" }} />}
      </div>
    </button>
  );
}

// ─── Step transition variants ─────────────────────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: "easeInOut" as const } },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0, transition: { duration: 0.25 } }),
};

// ─── Main CTAFunnel ───────────────────────────────────────────────────────────
export default function CTAFunnel() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [funnel, setFunnel] = useState<FunnelState>(defaultFunnel);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    email: "",
    company: "",
    role: "",
    country: "",
    comment: "",
    wantsDemo: false,
    wantsPartner: false,
  });

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const updateFunnel = (key: keyof FunnelState, val: FunnelState[keyof FunnelState]) => {
    setFunnel((f) => ({ ...f, [key]: val }));
  };

  const toggleGoal = (label: string) => {
    setFunnel((f) => ({
      ...f,
      outcomeGoal: f.outcomeGoal.includes(label) ? f.outcomeGoal.filter((x) => x !== label) : [...f.outcomeGoal, label],
    }));
  };
  const toggleCustomerType = (label: string) => {
    setFunnel((f) => ({
      ...f,
      customerType: f.customerType.includes(label) ? f.customerType.filter((x) => x !== label) : [...f.customerType, label],
    }));
  };
  const toggleOperationsArea = (label: string) => {
    setFunnel((f) => ({
      ...f,
      operationsArea: f.operationsArea.includes(label) ? f.operationsArea.filter((x) => x !== label) : [...f.operationsArea, label],
    }));
  };

  const isPartner = funnel.customerType.some((c) => c.toLowerCase().includes("resell"));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-24 px-4" id="cta">
      <div className="max-w-3xl mx-auto">
        {/* Section label */}
        <div className="text-center mb-10">
          <p
            className="text-xs font-medium mb-3 tracking-widest uppercase"
            style={{ color: "#b300ff", fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Interactive Analytics Builder
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "#e0eaff" }}
          >
            Find your{" "}
            <span className="neon-text">analytics starting point</span>
          </h2>
          <p className="mt-3 text-sm" style={{ color: "rgba(224,234,255,0.45)" }}>
            4 quick steps — then we send you a tailored plan.
          </p>
        </div>

        {/* Card shell — backdrop-filter on a non-interactive div is fine */}
        <div
          className="relative rounded-[2.5rem] p-6 sm:p-8 overflow-hidden"
          style={{
            background: "rgba(10,16,43,0.92)",
            border: "1px solid rgba(100,150,255,0.2)",
            boxShadow: "0 0 80px rgba(179,0,255,0.1), 0 40px 80px rgba(0,0,0,0.4)",
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: "linear-gradient(90deg, transparent, #b300ff, #00f0ff, transparent)" }}
          />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(179,0,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(179,0,255,0.06) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10">
            {!submitted && <StepBar step={step} total={4} />}

            <AnimatePresence mode="wait" custom={dir}>
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-6 py-10 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(0,240,255,0.12)", border: "2px solid #00f0ff", boxShadow: "0 0 30px rgba(0,240,255,0.2)" }}
                  >
                    <CheckCircle2 size={28} style={{ color: "#00f0ff" }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-2" style={{ color: "#e0eaff" }}>
                      Your analytics plan is on its way!
                    </h3>
                    <p className="text-sm" style={{ color: "rgba(224,234,255,0.55)" }}>
                      We&apos;ll email you a recommended dashboard set, model template, and next steps — tailored to your choices.
                    </p>
                  </div>
                  <div
                    className="w-full p-5 rounded-[1.5rem] text-left flex flex-col gap-2"
                    style={{ background: "rgba(100,150,255,0.05)", border: "1px solid rgba(100,150,255,0.15)" }}
                  >
                    <span className="text-[9px] tracking-widest uppercase mb-1" style={{ color: "rgba(224,234,255,0.35)", fontFamily: "var(--font-jetbrains-mono)" }}>
                      YOUR SELECTIONS
                    </span>
                    {[
                      { label: "Goal", val: funnel.outcomeGoal.join(", ") || "—" },
                      { label: "Who", val: funnel.customerType.join(", ") || "—" },
                      { label: "Where", val: funnel.operationsArea.join(", ") || "—" },
                    ].map((r) => (
                      <div key={r.label} className="flex items-start gap-2">
                        <Check size={12} className="mt-0.5 shrink-0" style={{ color: "#b300ff" }} />
                        <span className="text-xs" style={{ color: "rgba(224,234,255,0.65)" }}>
                          <span style={{ color: "#e0eaff", fontWeight: 600 }}>{r.label}: </span>{r.val}
                        </span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="#capabilities"
                    className="flex items-center gap-2 text-sm px-6 py-3 rounded-full transition-all duration-200"
                    style={{ background: "rgba(100,150,255,0.07)", border: "1px solid rgba(100,150,255,0.2)", color: "#e0eaff" }}
                  >
                    Explore features while you wait
                    <ArrowRight size={14} />
                  </a>
                </motion.div>
              ) : step === 1 ? (
                /* ── Step 1: What do you want to prove ── */
                <motion.div key="step1" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold tracking-tight mb-1" style={{ color: "#e0eaff" }}>
                      Choose who is going to operate with data
                    </h3>
                    <p className="text-sm" style={{ color: "rgba(224,234,255,0.45)" }}>
                      Pick one or more — we&apos;ll show you the right setup.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 mb-8">
                    {[
                      { label: "Build custom dashboards for operational efficiency", icon: <LayoutDashboard size={18} /> },
                      { label: "Generate custom reports for compliance and control", icon: <FileText size={18} /> },
                      { label: "Transform and model data for forecasting and optimization", icon: <LineChart size={18} /> },
                      { label: "Use your fleet data to power AI tools and assistants", icon: <Bot size={18} /> },
                      { label: "Offer advanced analytics as a service to your customers", icon: <Rocket size={18} /> },
                    ].map((opt) => (
                      <BigCard
                        key={opt.label}
                        icon={opt.icon}
                        label={opt.label}
                        selected={funnel.outcomeGoal.includes(opt.label)}
                        onClick={() => toggleGoal(opt.label)}
                      />
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <button type="button" className="neon-btn flex items-center gap-2 text-sm" disabled={funnel.outcomeGoal.length === 0} onClick={() => go(2)}>
                      Choose capabilities <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ) : step === 2 ? (
                /* ── Step 2: Who (capability) ── */
                <motion.div key="step2" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold tracking-tight mb-1" style={{ color: "#e0eaff" }}>
                      Choose exact capabilities you want to use
                    </h3>
                    <p className="text-sm" style={{ color: "rgba(224,234,255,0.45)" }}>
                      Pick one or more — we&apos;ll tailor the plan to these.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 mb-8">
                    {[
                      { label: "We want ready-to-use dashboards and reports", icon: <BarChart2 size={18} /> },
                      { label: "We can customize dashboards and reports internally", icon: <Settings size={18} /> },
                      { label: "We have data analysts who build models and insights", icon: <Brain size={18} /> },
                      { label: "We have developers building custom solutions", icon: <Code size={18} /> },
                      { label: "We just resell this solution AS IS", icon: <Rocket size={18} /> },
                    ].map((opt) => (
                      <BigCard
                        key={opt.label}
                        icon={opt.icon}
                        label={opt.label}
                        selected={funnel.customerType.includes(opt.label)}
                        onClick={() => toggleCustomerType(opt.label)}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <button type="button" onClick={() => go(1)} className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(224,234,255,0.45)", cursor: "pointer" }}>
                      <ChevronLeft size={14} /> Back
                    </button>
                    <button type="button" className="neon-btn flex items-center gap-2 text-sm" disabled={funnel.customerType.length === 0} onClick={() => go(3)}>
                      Choose where to apply <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ) : step === 3 ? (
                /* ── Step 3: Where to apply ── */
                <motion.div key="step3" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold tracking-tight mb-1" style={{ color: "#e0eaff" }}>
                      Choose where to apply
                    </h3>
                    <p className="text-sm" style={{ color: "rgba(224,234,255,0.45)" }}>
                      Pick one or more areas — we&apos;ll show you how it works in a real scenario.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 mb-8">
                    {[
                      { label: "Fleet operations & trip monitoring", icon: <Truck size={18} /> },
                      { label: "Driver performance & workforce management", icon: <UserCheck size={18} /> },
                      { label: "Maintenance planning & asset health", icon: <Wrench size={18} /> },
                      { label: "Fuel consumption & cost control", icon: <Fuel size={18} /> },
                      { label: "Sensor & operational event monitoring", icon: <Activity size={18} /> },
                    ].map((opt) => (
                      <BigCard
                        key={opt.label}
                        icon={opt.icon}
                        label={opt.label}
                        selected={funnel.operationsArea.includes(opt.label)}
                        onClick={() => toggleOperationsArea(opt.label)}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <button type="button" onClick={() => go(2)} className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(224,234,255,0.45)", cursor: "pointer" }}>
                      <ChevronLeft size={14} /> Back
                    </button>
                    <button
                      type="button"
                      className="neon-btn flex items-center gap-2 text-sm"
                      disabled={funnel.operationsArea.length === 0}
                      onClick={() => { setForm((f) => ({ ...f, role: funnel.customerType.join(", ") })); go(4); }}
                    >
                      Finalize & get demo <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="step4" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold tracking-tight mb-1" style={{ color: "#e0eaff" }}>
                      Finalize request and get a demo
                    </h3>
                    <p className="text-sm" style={{ color: "rgba(224,234,255,0.45)" }}>
                      We&apos;ll email you a recommended dashboard set, model template, and next steps based on your choices.
                    </p>
                  </div>

                  {/* Selections summary */}
                  <div
                    className="mb-6 p-4 rounded-[1.25rem] flex flex-wrap gap-2"
                    style={{ background: "rgba(100,150,255,0.04)", border: "1px solid rgba(100,150,255,0.12)" }}
                  >
                    {[
                      ...funnel.outcomeGoal,
                      ...funnel.customerType,
                      ...funnel.operationsArea,
                    ].filter(Boolean).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(179,0,255,0.1)", border: "1px solid rgba(179,0,255,0.25)", color: "#b300ff", fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: "email", label: "Work Email *", placeholder: "you@company.com", type: "email", required: true },
                        { id: "company", label: "Company *", placeholder: "Your company", type: "text", required: true },
                        { id: "role", label: "Your Role", placeholder: "Auto-filled from step 2", type: "text", required: false },
                        { id: "country", label: "Country (optional)", placeholder: "e.g. United States", type: "text", required: false },
                      ].map((field) => (
                        <div key={field.id} className="flex flex-col gap-1.5">
                          <label className="text-[9px] tracking-widest uppercase" style={{ color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)" }}>
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            required={field.required}
                            placeholder={field.placeholder}
                            value={form[field.id as keyof typeof form] as string}
                            onChange={(e) => setForm((f) => ({ ...f, [field.id]: e.target.value }))}
                            className="rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200"
                            style={{
                              background: "rgba(100,150,255,0.06)",
                              border: "1px solid rgba(100,150,255,0.18)",
                              color: "#e0eaff",
                            }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(179,0,255,0.4)")}
                            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(100,150,255,0.18)")}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] tracking-widest uppercase" style={{ color: "rgba(224,234,255,0.4)", fontFamily: "var(--font-jetbrains-mono)" }}>
                        What system do you use today? (optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Wialon, Geotab, Samsara..."
                        value={form.comment}
                        onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                        className="rounded-xl px-4 py-2.5 text-sm outline-none resize-none transition-all duration-200"
                        style={{
                          background: "rgba(100,150,255,0.06)",
                          border: "1px solid rgba(100,150,255,0.18)",
                          color: "#e0eaff",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(179,0,255,0.4)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(100,150,255,0.18)")}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      {[
                        { id: "wantsDemo", label: "I want a demo call" },
                        ...(isPartner
                          ? [{ id: "wantsPartner", label: "I want a partner / reseller conversation" }]
                          : []),
                      ].map((cb) => (
                        <label key={cb.id} className="flex items-center gap-3 cursor-pointer group">
                          <div
                            className="w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200"
                            style={
                              form[cb.id as keyof typeof form]
                                ? { background: "rgba(179,0,255,0.25)", border: "1px solid #b300ff" }
                                : { background: "rgba(100,150,255,0.06)", border: "1px solid rgba(100,150,255,0.2)" }
                            }
                            onClick={() => setForm((f) => ({ ...f, [cb.id]: !f[cb.id as keyof typeof form] }))}
                          >
                            {form[cb.id as keyof typeof form] && <Check size={11} style={{ color: "#b300ff" }} />}
                          </div>
                          <span className="text-sm" style={{ color: "rgba(224,234,255,0.65)" }}>{cb.label}</span>
                        </label>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button type="button" onClick={() => go(3)} className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(224,234,255,0.45)", cursor: "pointer" }}>
                        <ChevronLeft size={14} /> Back
                      </button>
                      <button
                        type="submit"
                        className="neon-btn flex items-center gap-2 text-sm"
                        disabled={!form.email || !form.company}
                        style={{ opacity: !form.email || !form.company ? 0.5 : 1 }}
                      >
                        <Send size={14} />
                        Send my plan
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
