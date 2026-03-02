# IoT Query — Mini Site Documentation

A modern SaaS-style landing page for **IoT Query** (telematics intelligence platform). Dark mode–first, developer-oriented UI with interactive analytics demos and a 4-step CTA funnel.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4, shadcn/ui, tw-animate-css |
| Fonts | Space Grotesk (UI), JetBrains Mono (code/labels) |
| Motion | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |

---

## Project Structure

```
mini-site/
├── app/
│   ├── globals.css       # Theme, design tokens, utilities
│   ├── layout.tsx         # Root layout, fonts, metadata
│   └── page.tsx           # Single-page route: Navbar → Hero → Capabilities → Analytics → CTA → Footer
├── components/
│   ├── landing/           # Page sections
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── CapabilitiesGrid.tsx   # Platform capabilities tiles (links to modules)
│   │   ├── AnalyticsHub.tsx       # Wrapper for 5 live analytics sections
│   │   ├── CTAFunnel.tsx          # 4-step interactive funnel + lead form
│   │   └── Footer.tsx
│   ├── analytics/         # Interactive demo frames (client-only)
│   │   ├── DashboardFrame.tsx
│   │   ├── ComplianceReportingFrame.tsx
│   │   ├── TransformFrame.tsx
│   │   ├── AIChatFrame.tsx
│   │   └── ForecastFrame.tsx
│   └── ui/                # shadcn components (button, card, badge, tabs, etc.)
├── lib/
│   ├── data.ts            # Nav links, FAQs, pricing, copy (not all used on current page)
│   └── mockFleetData.ts   # In-memory mock data for analytics demos
├── DOCUMENTATION.md       # This file
└── SECURITY.md            # Security and safety notes
```

---

## Page Sections (in order)

1. **Navbar** — Fixed; links to Dashboards, Reports, Events, AI-Readiness, Forecasts, Get Started; “Request a Demo” CTA.
2. **Hero** — Headline, subhead (incl. AI-ready data pipelines), CTAs, SQL + results mockup.
3. **Platform Capabilities** — Five tiles (Realtime Dashboards, Custom Reporting, Data Transformation, AI-Readiness, Data Modeling). Each tile links to its module below (`#analytics-dashboard`, etc.).
4. **Live Analytics Modules** — Five alternating left/right sections:
   - Realtime Dashboards (filters, KPIs, charts, table)
   - Custom Reporting (risk, compliance, EU tacho example)
   - Data Transformation & Aggregation (tabs: status, events, aggregation, sensor)
   - AI-Readiness (chat UI with mock SQL-backed answers, MCP mention)
   - Data Modeling (historical + forecast charts, toggles)
5. **CTA Funnel** — 4 steps: Objectives → Operations → Capabilities → Solution (lead form). Multi-select options; form submits in-memory only (no backend yet).
6. **Footer** — Brand, “More details” / “Documentation” (Navixy), Product and Resources link groups.

---

## Design System

- **Background:** Deep navy `#050a22`; surfaces `#0a102b`; grid + noise overlay.
- **Accents:** Neon purple `#b300ff`, cyan `#00f0ff`.
- **Typography:** Space Grotesk (headings/body), JetBrains Mono (labels, code).
- **Glass:** `rgba(100,150,255,0.05)` + `backdrop-filter: blur(16px)`.
- **Radius:** ~1.5–2.5rem for cards and CTAs.

---

## Data and Interactivity

- **Mock data:** `lib/mockFleetData.ts` — vehicles, employees, daily KPIs, trips, fuel, forecasts, status time series, AI chat responses. All client-side; no API calls.
- **Analytics frames:** Loaded with `next/dynamic` and `ssr: false` (client-only) to avoid recharts/SSR issues and reduce bundle on first paint.
- **CTA form:** State only; `handleSubmit` sets `submitted` to true. When you add a backend, validate and sanitize on the server and use CSRF (see SECURITY.md).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (default port 3000) |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

---

## Content and Copy

- **Nav:** `lib/data.ts` exports `navLinks`; Footer uses its own `footerLinks` aligned with sections.
- **Hero, Capabilities, Analytics, CTA:** Copy lives in each component or in `AnalyticsHub`’s `SECTIONS` array.
- **Grammar and typos:** Content has been reviewed; “ans” → “and”, “digitilize” → “digitize”, “on time” → “in time”, and similar fixes applied. CTA success link points to `#capabilities` (not `#features`).

---

## Security

- **XSS:** User- and bot-generated text in the AI chat is escaped before being rendered with `dangerouslySetInnerHTML` (bold markdown only). Hero SQL mockup uses a static snippet and known regex replacements only.
- **External links:** `target="_blank"` is used with `rel="noopener noreferrer"` (Footer, Capabilities).
- **Form:** No submission to server yet. When adding an API, implement server-side validation, rate limiting, and CSRF. See SECURITY.md.

---

## Browser Support

- Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses CSS grid, flexbox, `backdrop-filter`, and standard ES features.

---

## Optional Next Steps

- Connect CTA form to an API or email service.
- Add analytics (e.g. section visibility, funnel step completion).
- Add tests (e.g. Jest + React Testing Library for CTA flow and key links).
