"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] },
  }),
};

const codeSnippet = `SELECT
  d.name,
  ROUND(AVG(t.fuel_eff), 1)  AS mpg,
  SUM(t.distance_km)         AS total_km,
  COUNT(*)                   AS trips
FROM drivers d
JOIN trips t ON t.driver_id = d.id
WHERE t.created_at >= NOW() - INTERVAL '30d'
GROUP BY d.name
ORDER BY mpg DESC
LIMIT 5;`;

const tableRows = [
  { name: "Sarah M.",   mpg: 42.3, km: "4,820", trips: 38, pct: 100 },
  { name: "James K.",   mpg: 39.1, km: "3,290", trips: 31, pct: 92  },
  { name: "Alice W.",   mpg: 37.8, km: "5,110", trips: 44, pct: 89  },
  { name: "Bob J.",     mpg: 35.2, km: "2,980", trips: 27, pct: 83  },
  { name: "Charlie B.", mpg: 31.7, km: "3,640", trips: 33, pct: 75  },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-4 overflow-hidden"
      id="hero"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(179, 0, 255, 0.22) 0%, rgba(0, 240, 255, 0.06) 50%, transparent 70%)",
        }}
      />

      {/* Glow spheres */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(179,0,255,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,240,255,0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: text */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Label */}
          {/* H1 */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="font-bold leading-[1.05] tracking-[-0.06em]"
            style={{
              fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
              color: "#e0eaff",
            }}
          >
            Build Your Custom{" "}
            <span className="neon-text">Telematics Intelligence</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-lg leading-relaxed max-w-xl"
            style={{ color: "rgba(224,234,255,0.65)", fontWeight: 400 }}
          >
            IoT Query gives you direct access to unified telematics and business
            data in a secure, single-tenant environment — so you can deliver
            advanced analytics: dashboards, forecasting, scoring, embedded
            insights, and AI-ready data pipelines.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex flex-wrap gap-4 items-center"
          >
            <a href="#cta" className="neon-btn flex items-center gap-2 text-sm">
              Request a Demo
              <ArrowRight size={16} />
            </a>
            <a
              href="#capabilities"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                background: "rgba(100,150,255,0.07)",
                border: "1px solid rgba(100,150,255,0.25)",
                color: "#e0eaff",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(179,0,255,0.45)";
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(179,0,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(100,150,255,0.25)";
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(100,150,255,0.07)";
              }}
            >
              <Play size={14} />
              See What You Can Build
            </a>
          </motion.div>

        </div>

        {/* Right: SQL → Results mockup */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="lg:col-span-5 float-anim"
        >
          <div
            className="relative rounded-[2rem] overflow-hidden flex flex-col"
            style={{
              background: "rgba(10,16,43,0.85)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(100,150,255,0.2)",
              boxShadow: "0 0 60px rgba(179,0,255,0.12), 0 40px 80px rgba(0,0,0,0.5)",
            }}
          >
            {/* Window bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "rgba(100,150,255,0.12)" }}>
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ background: "rgba(255,90,90,0.7)" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "rgba(255,190,60,0.7)" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "rgba(50,210,100,0.7)" }} />
              </div>
              <span className="text-[10px] tracking-widest" style={{ fontFamily: "var(--font-jetbrains-mono)", color: "rgba(224,234,255,0.35)" }}>
                driver_efficiency.sql
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full tracking-widest" style={{ background: "rgba(179,0,255,0.15)", color: "#b300ff", fontFamily: "var(--font-jetbrains-mono)" }}>
                LIVE
              </span>
            </div>

            {/* SQL Code */}
            <pre className="px-5 pt-4 pb-3 text-[11px] leading-[1.7] overflow-x-auto" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              <code>
                {codeSnippet.split("\n").map((line, i) => {
                  const colored = line.replace(
                    /\b(SELECT|FROM|JOIN|WHERE|GROUP|ORDER|LIMIT|ON|BY|AS|AVG|SUM|COUNT|ROUND|DESC|INTERVAL)\b/g,
                    (m) => {
                      const c = ["SELECT","FROM","JOIN","WHERE","GROUP","ORDER","LIMIT"].includes(m) ? "#b300ff"
                               : ["AVG","SUM","COUNT","ROUND"].includes(m) ? "#00f0ff"
                               : "#e0eaff";
                      return `<span style="color:${c};font-weight:600">${m}</span>`;
                    }
                  ).replace(/'[^']*'/g, (s) => `<span style="color:#00f0ff">${s}</span>`)
                   .replace(/--.*$/g, (s) => `<span style="color:rgba(224,234,255,0.3)">${s}</span>`);
                  return <span key={i} dangerouslySetInnerHTML={{ __html: colored + "\n" }} />;
                })}
              </code>
            </pre>

            {/* Execution bar */}
            <div className="flex items-center gap-3 px-5 py-2 border-t border-b" style={{ borderColor: "rgba(100,150,255,0.12)", background: "rgba(0,240,255,0.03)" }}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#00f0ff" }} />
              <span className="text-[10px] flex-1" style={{ fontFamily: "var(--font-jetbrains-mono)", color: "rgba(224,234,255,0.4)" }}>
                5 rows · 38ms
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: "rgba(0,240,255,0.1)", color: "#00f0ff", fontFamily: "var(--font-jetbrains-mono)" }}>
                ✓ Query OK
              </span>
            </div>

            {/* Results table */}
            <div className="overflow-x-auto">
              <table className="w-full text-[10px]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                <thead>
                  <tr style={{ background: "rgba(100,150,255,0.05)" }}>
                    {["name", "mpg", "total_km", "trips"].map((h) => (
                      <th key={h} className="px-4 py-2 text-left tracking-widest uppercase" style={{ color: "rgba(224,234,255,0.3)", fontSize: 9, fontWeight: 600, letterSpacing: "0.1em" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, i) => (
                    <tr key={i} style={{ borderTop: "1px solid rgba(100,150,255,0.07)" }}>
                      <td className="px-4 py-2 font-medium" style={{ color: "#e0eaff" }}>{row.name}</td>
                      <td className="px-4 py-2 font-bold" style={{ color: i === 0 ? "#b300ff" : "rgba(224,234,255,0.7)" }}>{row.mpg}</td>
                      <td className="px-4 py-2" style={{ color: "rgba(224,234,255,0.5)" }}>{row.km}</td>
                      <td className="px-4 py-2" style={{ color: "rgba(224,234,255,0.5)" }}>{row.trips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mini bar chart */}
            <div className="px-5 pt-3 pb-4 border-t" style={{ borderColor: "rgba(100,150,255,0.1)" }}>
              <div className="text-[9px] tracking-widest uppercase mb-3" style={{ color: "rgba(224,234,255,0.3)", fontFamily: "var(--font-jetbrains-mono)" }}>
                avg_mpg — driver comparison
              </div>
              <div className="flex flex-col gap-1.5">
                {tableRows.map((row, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[9px] w-16 truncate shrink-0" style={{ color: "rgba(224,234,255,0.45)", fontFamily: "var(--font-jetbrains-mono)" }}>
                      {row.name.split(" ")[0]}
                    </span>
                    <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "rgba(100,150,255,0.08)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${row.pct}%`,
                          background: i === 0
                            ? "linear-gradient(90deg, #b300ff, #00f0ff)"
                            : `rgba(179,0,255,${0.25 + (5 - i) * 0.12})`,
                          transition: "width 0.8s ease",
                        }}
                      />
                    </div>
                    <span className="text-[9px] w-8 text-right shrink-0" style={{ color: i === 0 ? "#b300ff" : "rgba(224,234,255,0.45)", fontFamily: "var(--font-jetbrains-mono)", fontWeight: i === 0 ? 700 : 400 }}>
                      {row.mpg}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
