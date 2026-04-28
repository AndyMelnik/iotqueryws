import Link from "next/link";
import Image from "next/image";
import {
  BadgeCheck,
  BookOpenText,
  Building2,
  CircleCheck,
  CircleX,
  Database,
  Factory,
  History,
  Layers3,
  ShieldCheck,
  Truck,
  UserCog,
  Wallet,
} from "lucide-react";
import type { SitePage } from "@/lib/site-config";
import InteractiveHeroHeadline from "@/components/site/InteractiveHeroHeadline";
import DashboardStudioCollage from "@/components/site/DashboardStudioCollage";
import OpenBiLogoCloud from "@/components/site/OpenBiLogoCloud";
import CustomAppsShowcase from "@/components/site/CustomAppsShowcase";
import LogisticsReadyCarousel from "@/components/site/LogisticsReadyCarousel";
import CTAFunnel from "@/components/site/CTAFunnel";
import ThreeUpCarousel from "@/components/site/ThreeUpCarousel";

type Props = {
  page: SitePage;
};

export default function PageTemplate({ page }: Props) {
  const centeredHomeSections = new Set(["Roles", "Industries", "Tools"]);
  const homeBlockTitleClass = "text-3xl md:text-4xl font-semibold text-center";
  const homeBlockSubtitleClass = "mt-3 max-w-3xl mx-auto text-base md:text-lg text-center";
  const toTitleCase = (value: string) =>
    value
      .split("-")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  const breadcrumbParts =
    page.slug === "/"
      ? ["Navixy IoT Query", "Home"]
      : ["Navixy IoT Query", ...page.slug.split("/").filter(Boolean).map(toTitleCase)];
  const breadcrumbText = breadcrumbParts.join(" * ");
  const toSentenceCase = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "";
    const sentence = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    return sentence
      .replace(/\biot query\b/gi, "IoT Query")
      .replace(/\bnavixy\b/gi, "Navixy")
      .replace(/\bpowerbi\b/gi, "PowerBI")
      .replace(/\broi\b/gi, "ROI")
      .replace(/\bbi\b/g, "BI");
  };
  const splitHeadlineTwoLines = (value: string) => {
    const normalized = toSentenceCase(value);
    const words = normalized.split(/\s+/).filter(Boolean);
    if (words.length <= 2) return [words[0] ?? "", words.slice(1).join(" ")];
    const lineTwoWords = words.slice(-2).join(" ");
    const lineOneWords = words.slice(0, -2).join(" ");
    return [lineOneWords, lineTwoWords];
  };
  const getIndustryCardStyle = (title: string) => {
    switch (title) {
      case "Transport & Logistics":
        return { icon: Truck, style: { background: "rgba(0,240,255,0.08)", border: "1px solid rgba(0,240,255,0.3)" } };
      case "Heavy Machinery":
        return { icon: Factory, style: { background: "rgba(179,0,255,0.10)", border: "1px solid rgba(179,0,255,0.32)" } };
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
      case "Data Analyst":
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
  const isFleetManagerPage = page.slug === "/roles/fleet-manager";
  const isDataAnalystPage = page.slug === "/roles/data-analyst";
  const isSafetyManagerPage = page.slug === "/roles/safety-manager";
  const isFinanceLeaderPage = page.slug === "/roles/finance-leader";
  const isTransportLogisticsPage = page.slug === "/industries/transport-logistics";
  const isLeasingPage = page.slug === "/industries/leasing";
  const isHeavyMachineryPage = page.slug === "/industries/heavy-machinery";
  const isAssetUtilizationPage = page.slug === "/solutions/asset-utilization";
  const isTripsDeliveryPage = page.slug === "/solutions/trips-delivery";
  const isDriverSafetyPage = page.slug === "/solutions/driver-safety";
  const isMaintenancePage = page.slug === "/solutions/maintenance";
  const isCompliancePage = page.slug === "/solutions/compliance";
  const isPricingPage = page.slug === "/pricing";
  const isDashboardStudioPage = page.slug === "/tools/dashboard-studio";
  const isThirdPartyBiPage = page.slug === "/tools/third-party-bi";
  const isCustomAppsPage = page.slug === "/tools/custom-apps";
  const isSolutionsPage =
    isAssetUtilizationPage || isTripsDeliveryPage || isDriverSafetyPage || isMaintenancePage || isCompliancePage;
  const isRoleShowcasePage =
    isFleetManagerPage ||
    isDataAnalystPage ||
    isSafetyManagerPage ||
    isFinanceLeaderPage ||
    isTransportLogisticsPage ||
    isLeasingPage ||
    isHeavyMachineryPage ||
    isAssetUtilizationPage ||
    isTripsDeliveryPage ||
    isDriverSafetyPage ||
    isMaintenancePage ||
    isCompliancePage ||
    isDashboardStudioPage ||
    isThirdPartyBiPage;
  const sectionPaddingClass = isRoleShowcasePage ? "px-4 py-8" : "px-4 py-10";
  const sectionContentMarginClass = isRoleShowcasePage ? "mt-4" : "mt-5";
  const fleetPainHighlights = [
    "different fuel numbers",
    "review time is lost on reconciliation",
    "idling or fuel leakage",
    "cost is already locked in",
    "Custom performance reports take days",
    "too late for daily decisions",
    "assembled manually",
    "right before deadlines",
    "trusted data",
    "still a bottleneck",
  ];

  const renderFleetPainBullet = (text: string) => {
    if (!(isFleetManagerPage && text)) {
      return text;
    }
    const sortedHighlights = [...fleetPainHighlights].sort((a, b) => b.length - a.length);
    const escaped = sortedHighlights.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
    const parts = text.split(pattern);

    return parts.map((part, idx) => {
      const isHighlighted = sortedHighlights.some((phrase) => phrase.toLowerCase() === part.toLowerCase());
      return isHighlighted ? (
        <strong
          key={`${part}-${idx}`}
          className="font-bold"
          style={{ color: "inherit" }}
        >
          {part}
        </strong>
      ) : (
        <span key={`${part}-${idx}`}>{part}</span>
      );
    });
  };

  return (
    <main className="relative overflow-x-hidden">
      <section
        className={`relative flex items-center px-4 ${
          isHomePage || isRoleShowcasePage ? "pt-28 pb-2 min-h-0" : "pt-28 pb-6 min-h-[70vh]"
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
            <p className="status-tag mb-4">{breadcrumbText}</p>
            {page.heroIntroLine && page.heroRotatingPhrases?.length ? (
              <InteractiveHeroHeadline intro={page.heroIntroLine} phrases={page.heroRotatingPhrases} />
            ) : (
              <h1
                className="font-bold leading-[1.05] tracking-[-0.06em] max-w-5xl"
                style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)", color: "#e0eaff" }}
              >
                {(() => {
                  const [lineOne, lineTwo] = splitHeadlineTwoLines(page.heroHeadline);
                  return (
                    <>
                      <span className="block">{lineOne}</span>
                      <span className="block">{lineTwo || "\u00A0"}</span>
                    </>
                  );
                })()}
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

      {isHomePage ? (
        <section className="px-4 pt-20 pb-3">
          <div className="max-w-3xl mx-auto grid grid-cols-2 gap-y-4 md:grid-cols-4 md:gap-y-0 text-center">
            {[
              { value: "<2h", label: "to first query" },
              { value: "90+", label: "days of history" },
              { value: "3", label: "data layers" },
              { value: "1", label: "query for dataset" },
            ].map((fact, idx, arr) => (
              <div key={fact.value + fact.label} className="px-0 relative">
                <p
                  className="text-xl md:text-2xl font-semibold leading-none"
                  style={{
                    color: "#9ff8ff",
                    textShadow: "0 0 14px rgba(0,240,255,0.4)",
                    fontFamily: "var(--font-jetbrains-mono)",
                  }}
                >
                  {fact.value}
                </p>
                <p
                  className="mt-1 text-[11px] md:text-xs uppercase tracking-[0.12em]"
                  style={{ color: "rgba(224,234,255,0.68)" }}
                >
                  {fact.label}
                </p>
                {idx < arr.length - 1 ? (
                  <span
                    className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-9 w-px"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,240,255,0.0) 0%, rgba(0,240,255,0.75) 50%, rgba(179,0,255,0.0) 100%)",
                      boxShadow: "0 0 8px rgba(0,240,255,0.35)",
                    }}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

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
        <section
          key={`${section.title || "outcomes"}-${page.slug}`}
          className={`${sectionPaddingClass} ${isHomePage && section.title === "Roles" ? "pt-[50px]" : ""}`}
        >
          <div className="max-w-6xl mx-auto">
            {section.title ? (
              <h2
                className={
                  (page.slug === "/" && centeredHomeSections.has(section.title)) ||
                  isRoleShowcasePage ||
                  isCustomAppsPage ||
                  isPricingPage
                    ? homeBlockTitleClass
                    : "text-3xl md:text-4xl font-semibold"
                }
              >
                {toSentenceCase(section.title)}
              </h2>
            ) : null}
            {section.description ? (
              <p
                className={
                  (page.slug === "/" && centeredHomeSections.has(section.title)) || isRoleShowcasePage || isPricingPage
                    ? homeBlockSubtitleClass
                    : "mt-3 max-w-3xl text-base md:text-lg"
                }
                style={{ color: "rgba(224,234,255,0.7)" }}
              >
                {section.description}
              </p>
            ) : null}
            {isCustomAppsPage && section.title === "App Connect: embedded access inside navixy" ? (
              <div className={`${sectionContentMarginClass} flex flex-col items-center`}>
                {section.kpiStrip?.length ? (
                  <div className="flex flex-wrap justify-center gap-2 max-w-5xl">
                    {section.kpiStrip.map((kpi) => (
                      <span
                        key={kpi}
                        className="px-4 py-2 rounded-full text-xs text-center"
                        style={{ color: "#00f0ff", border: "1px solid rgba(0,240,255,0.28)", background: "rgba(0,240,255,0.08)" }}
                      >
                        {kpi}
                      </span>
                    ))}
                  </div>
                ) : null}
                {section.cards?.length ? (
                  <div className="mt-6 grid gap-4 md:grid-cols-3 w-full max-w-6xl">
                    {section.cards.map((card) => (
                      <article
                        key={card.title}
                        className="rounded-2xl p-5 text-center"
                        style={{ background: "rgba(100,150,255,0.07)", border: "1px solid rgba(100,150,255,0.22)" }}
                      >
                        <h3 className="text-lg font-semibold">{toSentenceCase(card.title)}</h3>
                        <p className="mt-2 text-sm md:text-base leading-relaxed" style={{ color: "rgba(224,234,255,0.78)" }}>
                          {card.text}
                        </p>
                      </article>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
            {section.bullets?.length ? (
              (() => {
                const isPainSection = section.title === "Does this sound familiar?";
                const isFiveCardPainSection = isPainSection && section.bullets.length === 5;
                return (
              <ul
                className={`${sectionContentMarginClass} grid gap-3 ${
                  isFiveCardPainSection
                    ? "md:grid-cols-2 lg:grid-cols-6 max-w-6xl mx-auto"
                    : isPainSection
                    ? "md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
                    : isRoleShowcasePage && section.title === "Does this sound familiar?"
                    ? "md:grid-cols-2 xl:grid-cols-3"
                    : "md:grid-cols-2"
                }`}
              >
                {section.bullets.map((bullet, bulletIndex) => {
                  const bulletStyle =
                    isPainSection
                      ? { color: "rgba(224,234,255,0.9)" }
                      : { color: "rgba(224,234,255,0.8)" };

                  return (
                  <li
                    key={bullet}
                    className={`${isPainSection ? "" : "glass rounded-2xl"} p-4 text-sm ${
                      isFiveCardPainSection
                        ? `lg:col-span-2 ${
                            bulletIndex === 3
                              ? "lg:col-start-2"
                              : bulletIndex === 4
                              ? "lg:col-start-4"
                              : ""
                          }`
                        : ""
                    } ${
                      isPainSection
                        ? "relative bg-transparent border-0 rounded-none shadow-none text-base md:text-lg text-center min-h-[176px] flex items-center justify-center leading-relaxed px-4"
                        : ""
                    } ${
                      !isPainSection && isRoleShowcasePage && section.title === "Does this sound familiar?"
                        ? "text-left flex items-start min-h-[170px] leading-relaxed whitespace-normal break-words hover:-translate-y-0.5 transition-transform duration-200"
                        : ""
                    }`}
                    style={bulletStyle}
                  >
                    {!isPainSection && isRoleShowcasePage && section.title === "Does this sound familiar?" ? (
                      <div className="flex gap-3">
                        <span
                          className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold shrink-0 mt-0.5"
                          style={{ background: "rgba(5,10,34,0.55)", border: "1px solid rgba(224,234,255,0.18)" }}
                        >
                          {bulletIndex + 1}
                        </span>
                        <span>{bullet}</span>
                      </div>
                    ) : (
                      bullet
                    )}
                    {isPainSection && bulletIndex < (section.bullets?.length ?? 0) - 1 ? (
                      <span
                        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,240,255,0) 0%, rgba(0,240,255,0.78) 50%, rgba(179,0,255,0) 100%)",
                          boxShadow: "0 0 9px rgba(0,240,255,0.35)",
                        }}
                      />
                    ) : null}
                  </li>
                  );
                })}
              </ul>
                );
              })()
            ) : null}
            {section.metrics?.length ? (
              <div className={`${sectionContentMarginClass} grid gap-4 md:grid-cols-2 lg:grid-cols-4`}>
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
                      <p className={homeBlockTitleClass}>{toSentenceCase(row.title)}</p>
                      <h3 className={`${homeBlockSubtitleClass} mt-2`} style={{ color: "rgba(224,234,255,0.72)" }}>
                        {row.subtitle}
                      </h3>
                    </div>
                    <div className="h-1 md:h-2" />
                    {(isAssetUtilizationPage && row.title === "Utilization Control You Can Defend") ||
                    (isTripsDeliveryPage && row.title === "Trip & Delivery Control You Can Defend") ||
                    (isDriverSafetyPage && row.title === "Safety Control You Can Defend") ||
                    (isMaintenancePage && row.title === "Maintenance Control You Can Defend") ||
                    (isCompliancePage && row.title === "Compliance Control You Can Defend") ? (
                      <div
                        className="rounded-3xl p-4 md:p-5"
                        style={{
                          background: "rgba(100,150,255,0.06)",
                        }}
                      >
                        <div className="grid gap-4 md:grid-cols-12 items-stretch">
                          <div className="md:col-span-5 grid gap-3">
                            {row.stats.map((s) => (
                              <article
                                key={`${s.value}-${s.label}`}
                                className="rounded-2xl p-3"
                                style={{
                                  background: "rgba(10,16,43,0.62)",
                                }}
                              >
                                <p className="text-5xl md:text-6xl font-bold leading-none neon-text">{s.value}</p>
                                <p className="mt-1 text-sm md:text-base" style={{ color: "rgba(224,234,255,0.8)" }}>
                                  {s.label}
                                </p>
                              </article>
                            ))}
                          </div>
                          <div
                            className="md:col-span-7 rounded-2xl p-4 h-full flex flex-col justify-center"
                            style={{ background: "rgba(10,16,43,0.62)" }}
                          >
                            <ul className="list-disc pl-5 flex flex-col gap-2">
                              {row.context.map((item) => (
                                <li
                                  key={item}
                                  className="text-base md:text-lg"
                                  style={{ color: "rgba(224,234,255,0.84)" }}
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                    <div className={`w-full ${rowIndex % 2 === 0 ? "flex justify-start" : "flex justify-end"}`}>
                      {row.stats?.length ? (
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
                                  className={
                                    (isAssetUtilizationPage && row.title === "Utilization Control You Can Defend") ||
                                    (isTripsDeliveryPage && row.title === "Trip & Delivery Control You Can Defend")
                                      ? "text-base md:text-lg"
                                      : "text-sm md:text-[15px]"
                                  }
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
                                  className={
                                    (isAssetUtilizationPage && row.title === "Utilization Control You Can Defend") ||
                                    (isTripsDeliveryPage && row.title === "Trip & Delivery Control You Can Defend")
                                      ? "text-base md:text-lg"
                                      : "text-sm md:text-[15px]"
                                  }
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
                      ) : (
                        <ul className="text-left list-disc pl-6 flex flex-col gap-2 max-w-4xl">
                          {row.context.map((item) => (
                            <li
                              key={item}
                              className="text-sm md:text-base"
                              style={{ color: "rgba(224,234,255,0.8)" }}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    )}
                  </article>
                ))}
              </div>
            ) : null}
            {section.kpiStrip?.length && !(isCustomAppsPage && section.title === "App Connect: embedded access inside navixy") ? (
              <div className={`${sectionContentMarginClass} flex flex-wrap gap-2`}>
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
            {section.cards?.length && !(isCustomAppsPage && section.title === "App Connect: embedded access inside navixy") ? (
              isRoleShowcasePage &&
              (section.title === "From scattered data to a dashboard your whole team trusts" ||
                section.title === "From data access request to working analysis" ||
                section.title === "From scattered signals to a safety system your whole team follows" ||
                section.title === "From scattered cost data to a finance view your whole team trusts" ||
                section.title === "From 5 regional data sources to one cost picture that updates daily" ||
                section.title === "From contract signing to return: full asset visibility at every stage" ||
                section.title === "Connect operator behavior to asset cost" ||
                section.title === "From fragmented fleet signals to one utilization decision model" ||
                section.title === "From trip signal noise to a delivery decision model" ||
                section.title === "From trip event noise to delivery decisions that scale" ||
                section.title === "From event counts to risk decisions that reduce loss" ||
                section.title === "From reactive repairs to maintenance decisions before failure" ||
                section.title === "From tracking violations to preventing them" ||
                section.title === "From SQL access to operational dashboards in one workflow" ||
                section.title === "From tool selection to production-ready analytics delivery") ? (
                <div className={`${sectionContentMarginClass} relative`}>
                  <div
                    className="absolute left-[18px] top-2 bottom-2 w-px"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,240,255,0.45) 0%, rgba(179,0,255,0.42) 100%)",
                    }}
                  />
                  <div className="flex flex-col gap-4">
                    {section.cards.map((card, idx) => (
                      <article
                        key={card.title}
                        className="relative pl-12 pr-4 py-3 rounded-2xl glass"
                        style={
                          (isAssetUtilizationPage &&
                            section.title === "From fragmented fleet signals to one utilization decision model") ||
                          (isTripsDeliveryPage &&
                            section.title === "From trip signal noise to a delivery decision model") ||
                          (isDriverSafetyPage &&
                            section.title === "From event counts to risk decisions that reduce loss") ||
                          (isMaintenancePage &&
                            section.title === "From reactive repairs to maintenance decisions before failure")
                            ? { border: "none" }
                            : undefined
                        }
                      >
                        <div
                          className="absolute left-0 top-4 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                          style={{
                            background: "linear-gradient(135deg, rgba(0,240,255,0.9), rgba(179,0,255,0.9))",
                            color: "#050a22",
                            boxShadow: "0 0 12px rgba(0,240,255,0.28)",
                          }}
                        >
                          {idx + 1}
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold">
                          {toSentenceCase(card.title.replace(/^\d+\)\s*/, ""))}
                        </h3>
                        {card.text ? (
                          <p className="mt-1 text-sm md:text-base" style={{ color: "rgba(224,234,255,0.78)" }}>
                            {card.text}
                          </p>
                        ) : null}
                      </article>
                    ))}
                  </div>
                </div>
              ) : isRoleShowcasePage && section.title === "What the job looks like when the data is always ready" ? (
                <div className={`${sectionContentMarginClass} grid gap-4 md:grid-cols-2 md:gap-0`}>
                  {section.cards.map((card) => {
                    const points = (card.text ?? "")
                      .split("||")
                      .map((item) => item.trim())
                      .filter(Boolean);
                    const beforeCard = card.title.toLowerCase().includes("before");
                    return (
                      <article key={card.title} className={`p-4 md:p-6 ${beforeCard ? "md:pr-7" : "md:pl-7"}`}>
                        <h3
                          className="text-xl font-semibold text-center"
                          style={{ color: beforeCard ? "rgba(255,180,180,0.95)" : "rgba(140,245,255,0.95)" }}
                        >
                          {toSentenceCase(card.title)}
                        </h3>
                        <ul className="mt-3 flex flex-col gap-2">
                          {points.map((point) => (
                            <li key={point} className="text-sm md:text-[15px] flex items-start gap-2" style={{ color: "rgba(224,234,255,0.82)" }}>
                              {beforeCard ? (
                                <CircleX size={16} style={{ color: "rgba(255,120,120,0.95)" }} className="mt-0.5 shrink-0" />
                              ) : (
                                <CircleCheck size={16} style={{ color: "rgba(0,240,255,0.95)" }} className="mt-0.5 shrink-0" />
                              )}
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </article>
                    );
                  })}
                </div>
              ) :
              section.title === "Roles" && page.slug === "/" ? (
                <div className={`${sectionContentMarginClass} grid gap-4 md:grid-cols-2 xl:grid-cols-4`}>
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
                        <h3 className="text-xl font-semibold">{toSentenceCase(card.title)}</h3>
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
                <div className={`${sectionContentMarginClass} flex flex-col gap-5`}>
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
                        <h3 className="text-xl md:text-2xl font-semibold leading-tight">{toSentenceCase(card.title)}</h3>
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
              ) : isTransportLogisticsPage && section.title === "What is ready for logistics operations in IoT Query today" ? (
                <div className={`${sectionContentMarginClass}`}>
                  <LogisticsReadyCarousel slides={section.cards} />
                </div>
              ) : isLeasingPage && section.title === "What's ready for leasing operations in IoT Query today" ? (
                <div className={`${sectionContentMarginClass}`}>
                  <LogisticsReadyCarousel slides={section.cards} />
                </div>
              ) : isHeavyMachineryPage && section.title === "What's ready for heavy machinery operations in IoT Query today" ? (
                <div className={`${sectionContentMarginClass}`}>
                  <LogisticsReadyCarousel slides={section.cards} />
                </div>
              ) : isAssetUtilizationPage && section.title === "What's available in IoT Query for fleet operations today" ? (
                <div className={`${sectionContentMarginClass}`}>
                  <LogisticsReadyCarousel slides={section.cards} />
                </div>
              ) : isDriverSafetyPage && section.title === "What's available in IoT Query for fleet safety today" ? (
                <div className={`${sectionContentMarginClass}`}>
                  <LogisticsReadyCarousel slides={section.cards} />
                </div>
              ) : isMaintenancePage && section.title === "What's available in IoT Query for maintenance operations today" ? (
                <div className={`${sectionContentMarginClass}`}>
                  <LogisticsReadyCarousel slides={section.cards} />
                </div>
              ) : isCompliancePage && section.title === "What's available in IoT Query for compliance operations today" ? (
                <div className={`${sectionContentMarginClass}`}>
                  <LogisticsReadyCarousel slides={section.cards} />
                </div>
              ) : isTripsDeliveryPage && section.title === "What's available in IoT Query for trip and delivery operations today" ? (
                <div className={`${sectionContentMarginClass}`}>
                  <LogisticsReadyCarousel slides={section.cards} />
                </div>
              ) : (isAssetUtilizationPage || isTripsDeliveryPage || isDriverSafetyPage || isMaintenancePage || isCompliancePage) && section.title === "Use cases and decission patterns" ? (
                <div className={`${sectionContentMarginClass} grid gap-4 md:grid-cols-3`}>
                  {section.cards.map((card) => {
                    const [problemRaw, solutionRaw] = (card.text ?? "").split("||");
                    const problem = (problemRaw ?? "").replace(/^Problem:\s*/i, "").trim();
                    const solution = (solutionRaw ?? "").replace(/^Solution:\s*/i, "").trim();
                    const titleWords = toSentenceCase(card.title ?? "").trim().split(/\s+/).filter(Boolean);
                    const splitIndex = Math.max(1, Math.ceil(titleWords.length / 2));
                    const titleLineOne = titleWords.slice(0, splitIndex).join(" ");
                    const titleLineTwo = titleWords.slice(splitIndex).join(" ");
                    return (
                      <article
                        key={card.title}
                        className="rounded-3xl p-5"
                        style={{ background: "rgba(100,150,255,0.07)", border: "1px solid rgba(100,150,255,0.22)" }}
                      >
                        <h3 className="text-lg font-semibold leading-snug min-h-[3.5rem]">
                          <span className="block">{titleLineOne}</span>
                          <span className="block">{titleLineTwo || "\u00A0"}</span>
                        </h3>
                        <div className="mt-3 space-y-3">
                          <div className="rounded-xl p-3" style={{ background: "rgba(255,95,95,0.09)", border: "1px solid rgba(255,95,95,0.22)" }}>
                            <p className="text-[11px] uppercase tracking-[0.12em] font-semibold" style={{ color: "rgba(255,190,190,0.92)" }}>
                              Problem
                            </p>
                            <p className="mt-1 text-sm" style={{ color: "rgba(224,234,255,0.78)" }}>
                              {problem}
                            </p>
                          </div>
                          <div className="rounded-xl p-3" style={{ background: "rgba(0,240,255,0.09)", border: "1px solid rgba(0,240,255,0.22)" }}>
                            <p className="text-[11px] uppercase tracking-[0.12em] font-semibold" style={{ color: "rgba(130,245,255,0.95)" }}>
                              Solution
                            </p>
                            <p className="mt-1 text-sm" style={{ color: "rgba(224,234,255,0.78)" }}>
                              {solution}
                            </p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : isCustomAppsPage &&
                (section.title === "Sensoriqua: custom warehouse monitoring app" ||
                  section.title === "Trips Intelli: custom trip intelligence app") ? (
                <div className={`${sectionContentMarginClass} relative pl-1`}>
                  <div
                    className="absolute left-[20px] top-2 bottom-2 w-px"
                    style={{
                      background: "linear-gradient(180deg, rgba(0,240,255,0.4) 0%, rgba(179,0,255,0.34) 100%)",
                    }}
                  />
                  <div className="flex flex-col gap-5">
                    {section.cards.map((card) => {
                      const lower = card.title.toLowerCase();
                      const kind = lower.includes("problem")
                        ? "problem"
                        : lower.includes("solution")
                        ? "solution"
                        : "effect";
                      const labelColor =
                        kind === "problem"
                          ? { color: "rgba(255,190,190,0.95)", bg: "rgba(255,95,95,0.12)", border: "rgba(255,95,95,0.28)" }
                          : kind === "solution"
                          ? { color: "rgba(130,245,255,0.95)", bg: "rgba(0,240,255,0.1)", border: "rgba(0,240,255,0.26)" }
                          : { color: "rgba(204,243,180,0.95)", bg: "rgba(163,230,53,0.12)", border: "rgba(163,230,53,0.28)" };
                      const titleWithoutNumber = toSentenceCase(card.title.replace(/^\d+\)\s*/, ""));
                      const stepNumber = card.title.match(/^(\d+)\)/)?.[1] ?? "1";

                      return (
                        <article key={card.title} className="relative pl-12">
                          <div
                            className="absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                            style={{
                              background: "linear-gradient(135deg, rgba(0,240,255,0.92), rgba(179,0,255,0.9))",
                              color: "#050a22",
                              boxShadow: "0 0 12px rgba(0,240,255,0.24)",
                            }}
                          >
                            {stepNumber}
                          </div>
                          <div className="pt-1">
                            <span
                              className="inline-flex items-center rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.12em] font-semibold"
                              style={{
                                color: labelColor.color,
                                background: labelColor.bg,
                                border: `1px solid ${labelColor.border}`,
                              }}
                            >
                              {titleWithoutNumber}
                            </span>
                            <p className="mt-3 text-base md:text-lg leading-relaxed" style={{ color: "rgba(224,234,255,0.82)" }}>
                              {card.text}
                            </p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ) : isCustomAppsPage && section.title === "Why is IoT Query database preferable compared to API?" ? (
                <div className={`${sectionContentMarginClass} grid gap-4 md:grid-cols-2`}>
                  {section.cards.map((card, index) => {
                    const points = (card.text ?? "")
                      .split("||")
                      .map((item) => item.trim())
                      .filter(Boolean);
                    const isApi = index === 0;
                    return (
                      <article
                        key={card.title}
                        className="rounded-3xl p-5"
                        style={{
                          background: isApi ? "rgba(255,95,95,0.08)" : "rgba(0,240,255,0.08)",
                          border: isApi ? "1px solid rgba(255,95,95,0.24)" : "1px solid rgba(0,240,255,0.24)",
                        }}
                      >
                        <h3 className="text-xl font-semibold">{toSentenceCase(card.title)}</h3>
                        <ul className="mt-3 space-y-2">
                          {points.map((point) => (
                            <li
                              key={point}
                              className="text-sm md:text-base leading-relaxed"
                              style={{ color: "rgba(224,234,255,0.82)" }}
                            >
                              {point}
                            </li>
                          ))}
                        </ul>
                      </article>
                    );
                  })}
                </div>
              ) : isDashboardStudioPage && section.title === "Featured dashboard blueprints you can launch first" ? (
                <div className={`${sectionContentMarginClass}`}>
                  <LogisticsReadyCarousel slides={section.cards} />
                </div>
              ) : isPricingPage && section.title === "What helps justify investment quickly" ? (
                <div className={sectionContentMarginClass}>
                  <ThreeUpCarousel cards={section.cards} />
                </div>
              ) : isThirdPartyBiPage && section.title === "Connection playbooks for your first dashboard" ? (
                <div className={`${sectionContentMarginClass}`}>
                  <LogisticsReadyCarousel slides={section.cards} />
                </div>
              ) : isPricingPage && section.title === "Value outcomes" ? (
                <div className={`${sectionContentMarginClass} grid gap-6 md:grid-cols-3`}>
                  {section.cards.map((card, idx) => (
                    <article key={card.title} className="relative px-3 text-center">
                      <h3 className="text-xl font-semibold">{toSentenceCase(card.title)}</h3>
                      {card.text ? (
                        <p className="mt-2 text-sm md:text-base leading-relaxed" style={{ color: "rgba(224,234,255,0.8)" }}>
                          {card.text}
                        </p>
                      ) : null}
                      {idx < (section.cards?.length ?? 0) - 1 ? (
                        <span
                          className="hidden md:block absolute right-[-12px] top-1/2 -translate-y-1/2 h-20 w-px"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(0,240,255,0) 0%, rgba(0,240,255,0.8) 50%, rgba(179,0,255,0) 100%)",
                            boxShadow: "0 0 10px rgba(0,240,255,0.35)",
                          }}
                        />
                      ) : null}
                    </article>
                  ))}
                </div>
              ) : (
              <div
                className={`${sectionContentMarginClass} grid gap-4 ${
                  page.slug === "/" && section.title === "Industries"
                    ? "md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
                    : section.columns === 4
                    ? "md:grid-cols-2 lg:grid-cols-4"
                    : "md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {section.cards.map((card) => (
                  (() => {
                    const industryStyle = section.title === "Industries" ? getIndustryCardStyle(card.title) : null;
                    const Icon = industryStyle?.icon;
                    const isDataAccessSection =
                      isDataAnalystPage && section.title === "What disappears when data is directly accessible";
                    const isBiToolChoiceSection =
                      isThirdPartyBiPage && section.title === "How to choose the right BI tool for your team";
                    const biToolLogoByTitle: Record<string, { src: string; alt: string; w: number; h: number }> = {
                      "Power BI": { src: "/logo-powerbi.png", alt: "Power BI", w: 28, h: 28 },
                      "Apache Superset": { src: "/logo-superset.png", alt: "Apache Superset", w: 28, h: 28 },
                      "Python + Streamlit": { src: "/logo-python.png", alt: "Python", w: 32, h: 32 },
                      Grafana: { src: "/logo-grafana.png", alt: "Grafana", w: 24, h: 24 },
                    };
                    const biLogo = isBiToolChoiceSection ? biToolLogoByTitle[card.title] : undefined;
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
                            ? "rounded-3xl p-5 relative overflow-hidden text-center"
                            : `glass glass-hover rounded-3xl p-5 ${
                                section.title === "Roles" ? "text-center" : ""
                              }`
                        }
                        style={section.title === "Industries" ? industryStyle?.style : industryStyle?.style}
                      >
                        {biLogo ? (
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: "rgba(10,16,43,0.55)", border: "1px solid rgba(224,234,255,0.15)" }}
                            >
                              <Image src={biLogo.src} alt={biLogo.alt} width={biLogo.w} height={biLogo.h} className="object-contain" />
                            </div>
                            <h3 className="text-xl font-semibold">{toSentenceCase(card.title)}</h3>
                          </div>
                        ) : (
                          <h3 className="text-xl font-semibold">{toSentenceCase(card.title)}</h3>
                        )}
                        {Icon ? (
                          <div
                            className={`mt-3 w-8 h-8 rounded-lg flex items-center justify-center ${
                              section.title === "Industries" ? "mx-auto" : ""
                            }`}
                            style={{ background: "rgba(10,16,43,0.55)", border: "1px solid rgba(224,234,255,0.15)" }}
                          >
                            <Icon size={16} style={{ color: "#00f0ff" }} />
                          </div>
                        ) : null}
                        {isDataAccessSection ? (
                          <div
                            className="mt-3 w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: "rgba(10,16,43,0.55)", border: "1px solid rgba(224,234,255,0.15)" }}
                          >
                            {card.title === "Every BI tool connects" ? (
                              <Database size={16} style={{ color: "#00f0ff" }} />
                            ) : card.title === "Three data layers, one decision flow" ? (
                              <Layers3 size={16} style={{ color: "#00f0ff" }} />
                            ) : card.title === "Documented schema, no archaeology" ? (
                              <BookOpenText size={16} style={{ color: "#00f0ff" }} />
                            ) : card.title === "History that is actually usable" ? (
                              <History size={16} style={{ color: "#00f0ff" }} />
                            ) : (
                              <BadgeCheck size={16} style={{ color: "#00f0ff" }} />
                            )}
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
              isRoleShowcasePage ? (
                <div className={`${isRoleShowcasePage ? "mt-5" : "mt-6"} flex flex-col gap-2`}>
                  {section.relatedLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="py-2 border-b border-white/10 text-sm md:text-base font-medium neon-text"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className={`${isRoleShowcasePage ? "mt-5" : "mt-6"} grid gap-4 md:grid-cols-3`}>
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
              )
            ) : null}
          </div>
        </section>
      ))}

      <CTAFunnel />
    </main>
  );
}
