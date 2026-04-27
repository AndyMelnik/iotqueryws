import Link from "next/link";
import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  Factory,
  ShieldCheck,
  Snowflake,
  Truck,
  UserCog,
  Wallet,
} from "lucide-react";
import type { SitePage } from "@/lib/site-config";
import InteractiveHeroHeadline from "@/components/site/InteractiveHeroHeadline";
import DashboardStudioCollage from "@/components/site/DashboardStudioCollage";
import OpenBiLogoCloud from "@/components/site/OpenBiLogoCloud";
import CustomAppsShowcase from "@/components/site/CustomAppsShowcase";

type Props = {
  page: SitePage;
};

export default function PageTemplate({ page }: Props) {
  const centeredHomeSections = new Set(["Roles", "Industries", "Tools"]);
  const homeBlockTitleClass = "text-3xl md:text-4xl font-semibold text-center";
  const homeBlockSubtitleClass = "mt-3 max-w-3xl mx-auto text-base md:text-lg text-center";
  const getIndustryCardStyle = (title: string) => {
    switch (title) {
      case "Transport & Logistics":
        return { icon: Truck, style: { background: "rgba(0,240,255,0.08)", border: "1px solid rgba(0,240,255,0.3)" } };
      case "Heavy Machinery":
        return { icon: Factory, style: { background: "rgba(179,0,255,0.10)", border: "1px solid rgba(179,0,255,0.32)" } };
      case "Cold Chain":
        return { icon: Snowflake, style: { background: "rgba(100,150,255,0.12)", border: "1px solid rgba(100,150,255,0.3)" } };
      case "Leasing":
        return { icon: Building2, style: { background: "rgba(0,190,255,0.09)", border: "1px solid rgba(0,190,255,0.28)" } };
      default:
        return { icon: BadgeCheck, style: { background: "rgba(100,150,255,0.08)", border: "1px solid rgba(100,150,255,0.22)" } };
    }
  };

  const getRoleCardStyle = (title: string) => {
    switch (title) {
      case "Fleet Manager":
        return {
          icon: UserCog,
          style: { background: "rgba(0,240,255,0.08)", border: "1px solid rgba(0,240,255,0.3)" },
        };
      case "Operations Leader":
        return {
          icon: Factory,
          style: { background: "rgba(179,0,255,0.10)", border: "1px solid rgba(179,0,255,0.32)" },
        };
      case "Safety Manager":
        return {
          icon: ShieldCheck,
          style: { background: "rgba(255,95,95,0.10)", border: "1px solid rgba(255,95,95,0.28)" },
        };
      case "Finance Leader":
        return {
          icon: Wallet,
          style: { background: "rgba(255,206,84,0.10)", border: "1px solid rgba(255,206,84,0.32)" },
        };
      default:
        return {
          icon: BadgeCheck,
          style: { background: "rgba(100,150,255,0.08)", border: "1px solid rgba(100,150,255,0.22)" },
        };
    }
  };

  const isHomePage = page.slug === "/";

  return (
    <main className="relative overflow-x-hidden">
      <section
        className={`relative flex items-center px-4 ${
          isHomePage ? "pt-28 pb-2 min-h-0" : "pt-28 pb-6 min-h-[70vh]"
        }`}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(179, 0, 255, 0.22) 0%, rgba(0, 240, 255, 0.06) 50%, transparent 70%)"
          }}
        />
        <div className={`relative z-10 max-w-6xl mx-auto w-full ${isHomePage ? "grid gap-8 lg:grid-cols-12 items-center" : ""}`}>
          <div className={isHomePage ? "lg:col-span-7" : ""}>
            <p className="status-tag mb-4">Fleet decision intelligence</p>
            {page.heroIntroLine && page.heroRotatingPhrases?.length ? (
              <InteractiveHeroHeadline intro={page.heroIntroLine} phrases={page.heroRotatingPhrases} />
            ) : (
              <h1
                className="font-bold leading-[1.05] tracking-[-0.06em] max-w-5xl"
                style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)", color: "#e0eaff" }}
              >
                {page.heroHeadline}
              </h1>
            )}
            {page.subtitle ? (
              <p className="mt-4 text-lg max-w-3xl" style={{ color: "rgba(224,234,255,0.7)" }}>
                {page.subtitle}
              </p>
            ) : null}
            {page.ctas?.length ? (
              <div className="mt-7 flex flex-wrap gap-3">
                {page.ctas.map((cta, index) => (
                  <Link
                    key={cta.label}
                    href={cta.href}
                    className={index === 0 ? "neon-btn text-sm font-bold" : "px-6 py-3 rounded-full text-sm font-semibold"}
                    style={
                      index === 0
                        ? undefined
                        : {
                            border: "1px solid rgba(100,150,255,0.25)",
                            color: "#e0eaff",
                            background: "rgba(100,150,255,0.07)"
                          }
                    }
                  >
                    {cta.label}
                  </Link>
                ))}
              </div>
            ) : null}
            {page.proof?.length ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {page.proof.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-full text-xs"
                    style={{ color: "rgba(224,234,255,0.9)", border: "1px solid rgba(100,150,255,0.3)", background: "rgba(100,150,255,0.1)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          {isHomePage ? (
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <Image
                src="/hero-reference.png"
                alt="IoT Query connected data ecosystem"
                width={600}
                height={400}
                priority
                className="w-full max-w-[560px] h-auto"
              />
            </div>
          ) : null}
        </div>
      </section>

      {page.metricCards?.length ? (
        <section className="px-4 pb-12">
          <div className="max-w-6xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {page.metricCards.map((item) => (
              <article key={`${item.value}-${item.label}`} className="glass rounded-3xl p-6">
                <p className="text-3xl font-semibold neon-text">{item.value}</p>
                <p className="mt-1 text-sm" style={{ color: "rgba(224,234,255,0.65)" }}>
                  {item.label}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {page.sections?.map((section) => (
        <section key={`${section.title || "outcomes"}-${page.slug}`} className="px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {section.title ? (
              <h2
                className={
                  page.slug === "/" && centeredHomeSections.has(section.title)
                    ? homeBlockTitleClass
                    : "text-3xl md:text-4xl font-semibold"
                }
              >
                {section.title}
              </h2>
            ) : null}
            {section.description ? (
              <p
                className={
                  page.slug === "/" && centeredHomeSections.has(section.title)
                    ? homeBlockSubtitleClass
                    : "mt-3 max-w-3xl text-base md:text-lg"
                }
                style={{ color: "rgba(224,234,255,0.7)" }}
              >
                {section.description}
              </p>
            ) : null}
            {section.bullets?.length ? (
              <ul className="mt-5 grid gap-3 md:grid-cols-2">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="glass rounded-2xl p-4 text-sm" style={{ color: "rgba(224,234,255,0.8)" }}>
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
            {section.metrics?.length ? (
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {section.metrics.map((item) => (
                  <article key={`${item.value}-${item.label}`} className="glass rounded-3xl p-5">
                    <p className="text-3xl font-semibold neon-text">{item.value}</p>
                    <p className="mt-1 text-sm" style={{ color: "rgba(224,234,255,0.65)" }}>
                      {item.label}
                    </p>
                  </article>
                ))}
              </div>
            ) : null}
            {section.outcomeRows?.length ? (
              <div className="mt-2 flex flex-col gap-3">
                {section.outcomeRows.map((row, rowIndex) => (
                  <article
                    key={row.title}
                    className="py-5 md:py-7"
                  >
                    <div className="mb-3">
                      <p className={homeBlockTitleClass}>{row.title}</p>
                      <h3 className={`${homeBlockSubtitleClass} mt-2`} style={{ color: "rgba(224,234,255,0.72)" }}>
                        {row.subtitle}
                      </h3>
                    </div>
                    <div className="h-1 md:h-2" />
                    <div className={`w-full ${rowIndex % 2 === 0 ? "flex justify-start" : "flex justify-end"}`}>
                      <div
                        className={`inline-grid items-stretch gap-1 md:gap-2 ${
                          rowIndex % 2 === 0
                            ? "grid-cols-1 md:grid-cols-[max-content_max-content]"
                            : "grid-cols-1 md:grid-cols-[max-content_max-content]"
                        }`}
                      >
                        {rowIndex % 2 === 0 ? (
                          <>
                            <div className="text-left">
                              {row.stats.map((s) => (
                                <div key={`${s.value}-${s.label}`} className="mb-2 last:mb-0">
                                  <p className="text-7xl md:text-8xl font-bold leading-none neon-text">{s.value}</p>
                                  <p className="text-base mt-1" style={{ color: "rgba(224,234,255,0.78)" }}>
                                    {s.label}
                                  </p>
                                </div>
                              ))}
                            </div>
                            <ul className="text-left list-disc pl-6 flex flex-col justify-center gap-1 min-h-full">
                              {row.context.map((item) => (
                                <li
                                  key={item}
                                  className="text-sm md:text-[15px] whitespace-nowrap"
                                  style={{ color: "rgba(224,234,255,0.78)" }}
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <>
                            <ul className="text-left list-disc pl-6 flex flex-col justify-center gap-1 min-h-full">
                              {row.context.map((item) => (
                                <li
                                  key={item}
                                  className="text-sm md:text-[15px] whitespace-nowrap"
                                  style={{ color: "rgba(224,234,255,0.78)" }}
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                            <div className="text-left">
                              {row.stats.map((s) => (
                                <div key={`${s.value}-${s.label}`} className="mb-2 last:mb-0">
                                  <p className="text-7xl md:text-8xl font-bold leading-none neon-text">{s.value}</p>
                                  <p className="text-base mt-1" style={{ color: "rgba(224,234,255,0.78)" }}>
                                    {s.label}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
            {section.kpiStrip?.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {section.kpiStrip.map((kpi) => (
                  <span
                    key={kpi}
                    className="px-4 py-2 rounded-full text-xs"
                    style={{ color: "#00f0ff", border: "1px solid rgba(0,240,255,0.28)", background: "rgba(0,240,255,0.08)" }}
                  >
                    {kpi}
                  </span>
                ))}
              </div>
            ) : null}
            {section.cards?.length ? (
              section.title === "Roles" && page.slug === "/" ? (
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {section.cards.map((card) => (
                    (() => {
                      const roleStyle = getRoleCardStyle(card.title);
                      const RoleIcon = roleStyle.icon;
                      return (
                    <article
                      key={card.title}
                      className="p-5 h-full flex flex-col items-center text-center rounded-2xl"
                      style={roleStyle.style}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                        style={{ background: "rgba(5,10,34,0.42)", border: "1px solid rgba(224,234,255,0.15)" }}
                      >
                        <RoleIcon size={18} style={{ color: "#e0eaff" }} />
                      </div>
                      <h3 className="text-xl font-semibold">{card.title}</h3>
                      {card.text ? (
                        <p className="mt-2 text-sm" style={{ color: "rgba(224,234,255,0.75)" }}>
                          {card.text}
                        </p>
                      ) : null}
                      {card.href ? (
                        <Link href={card.href} className="inline-block mt-4 text-sm font-semibold neon-text">
                          Learn more
                        </Link>
                      ) : null}
                    </article>
                      );
                    })()
                  ))}
                </div>
              ) : section.title === "Tools" ? (
                <div className="mt-5 flex flex-col gap-5">
                  {section.cards.map((card) => (
                    <article
                      key={card.title}
                      className="glass rounded-[1.75rem] p-4 md:p-5 grid gap-4 lg:grid-cols-12 items-stretch min-h-[260px] lg:h-[280px]"
                    >
                      <div
                        className={
                          card.title === "Open BI Ecosystem"
                            ? "lg:col-span-7 lg:order-2 flex flex-col h-full"
                            : "lg:col-span-7 flex flex-col h-full"
                        }
                      >
                        <h3 className="text-xl md:text-2xl font-semibold leading-tight">{card.title}</h3>
                        {card.text ? (
                          <p className="mt-2 text-sm md:text-base leading-snug" style={{ color: "rgba(224,234,255,0.72)" }}>
                            {card.text}
                          </p>
                        ) : null}
                        {card.examples?.length ? (
                          <ul className="mt-3 list-disc pl-5 flex flex-col gap-1.5">
                            {card.examples.map((example) => (
                              <li key={example} className="text-sm md:text-[15px] leading-snug" style={{ color: "rgba(224,234,255,0.78)" }}>
                                {example}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {card.href ? (
                          <Link href={card.href} className="inline-block mt-auto pt-3 text-sm font-semibold neon-text">
                            Learn more
                          </Link>
                        ) : null}
                      </div>
                      <div
                        className={
                          card.title === "Open BI Ecosystem"
                            ? "lg:col-span-5 lg:order-1 h-full flex items-stretch"
                            : "lg:col-span-5 h-full flex items-stretch"
                        }
                      >
                        {card.title === "Dashboard Studio" ? (
                          <div className="w-full">
                            <DashboardStudioCollage />
                          </div>
                        ) : card.title === "Open BI Ecosystem" ? (
                          <div className="w-full">
                            <OpenBiLogoCloud />
                          </div>
                        ) : card.title === "Custom Apps" ? (
                          <div className="w-full">
                            <CustomAppsShowcase />
                          </div>
                        ) : (
                          <div
                            className="rounded-2xl p-4 w-full h-full"
                            style={{
                              background: "rgba(10,16,43,0.72)",
                              border: "1px solid rgba(100,150,255,0.22)"
                            }}
                          >
                            <div className="mt-3 grid grid-cols-2 gap-2">
                              {(card.interfacePreview ?? []).map((item) => (
                                <span
                                  key={item}
                                  className="rounded-lg px-3 py-2 text-xs"
                                  style={{ background: "rgba(100,150,255,0.1)", border: "1px solid rgba(100,150,255,0.22)" }}
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
              <div
                className={`mt-5 grid gap-4 ${
                  section.columns === 4
                    ? "md:grid-cols-2 lg:grid-cols-4"
                    : "md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {section.cards.map((card) => (
                  (() => {
                    const industryStyle = section.title === "Industries" ? getIndustryCardStyle(card.title) : null;
                    const Icon = industryStyle?.icon;
                    const metricTags =
                      section.title === "Industries" && card.text?.includes(":")
                        ? card.text
                            .split(":")[1]
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean)
                        : [];
                    return (
                      <article
                        key={card.title}
                        className={
                          section.title === "Industries"
                            ? "rounded-3xl p-5 relative overflow-hidden"
                            : `glass glass-hover rounded-3xl p-5 ${
                                section.title === "Roles" ? "text-center" : ""
                              }`
                        }
                        style={section.title === "Industries" ? industryStyle?.style : industryStyle?.style}
                      >
                        <h3 className="text-xl font-semibold">{card.title}</h3>
                        {Icon ? (
                          <div
                            className="mt-3 w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: "rgba(10,16,43,0.55)", border: "1px solid rgba(224,234,255,0.15)" }}
                          >
                            <Icon size={16} style={{ color: "#00f0ff" }} />
                          </div>
                        ) : null}
                        {card.text ? (
                          <p className="mt-2 text-sm" style={{ color: "rgba(224,234,255,0.78)" }}>
                            {card.text}
                          </p>
                        ) : null}
                        {metricTags.length ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {metricTags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 rounded-full text-[11px]"
                                style={{ color: "#e0eaff", background: "rgba(5,10,34,0.45)", border: "1px solid rgba(224,234,255,0.18)" }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}
                        {card.href ? (
                          <Link href={card.href} className="inline-block mt-4 text-sm font-semibold neon-text">
                            Learn more
                          </Link>
                        ) : null}
                      </article>
                    );
                  })()
                ))}
              </div>
              )
            ) : null}
            {section.relatedLinks?.length ? (
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {section.relatedLinks.map((link) => (
                  <article key={link.label} className="glass rounded-2xl p-5">
                    <h3 className="text-base font-semibold">{link.label}</h3>
                    {link.text ? (
                      <p className="mt-2 text-sm" style={{ color: "rgba(224,234,255,0.68)" }}>
                        {link.text}
                      </p>
                    ) : null}
                    <Link href={link.href} className="inline-block mt-3 text-sm font-semibold neon-text">
                      Explore
                    </Link>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ))}

      <section id="cta" className="px-4 pt-6 pb-16">
        <div className="max-w-6xl mx-auto glass rounded-[2rem] p-8 md:p-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold">Ready to map your decision intelligence journey?</h3>
            <p className="mt-2 text-sm" style={{ color: "rgba(224,234,255,0.7)" }}>
              Start from one use case and scale by solution, industry and role.
            </p>
          </div>
          <Link href="/" className="neon-btn text-sm font-bold self-start">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
