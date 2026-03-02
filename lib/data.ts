export const navLinks = [
  { label: "Dashboards", href: "#analytics-dashboard" },
  { label: "Reports", href: "#analytics-compliance" },
  { label: "Events", href: "#analytics-transform" },
  { label: "AI-Readiness", href: "#analytics-ai" },
  { label: "Forecasts", href: "#analytics-forecast" },
  { label: "Get Started!", href: "#cta" },
];

export const impactStats = [
  {
    icon: "⚡",
    stat: "Up to 5×",
    label: "Faster insight delivery",
    description:
      "Eliminate API chains and manual exports. Query unified data directly and reduce time-to-answer from hours to minutes.",
  },
  {
    icon: "📉",
    stat: "Up to 70%",
    label: "Less manual reporting work",
    description:
      "Replace spreadsheet stitching and custom exports with automated, reusable queries and dashboards.",
  },
  {
    icon: "🚀",
    stat: "15 mins",
    label: "First insight",
    description:
      "From monitoring to predictive in weeks — not months. Start building forecasting models and advanced KPIs without rebuilding your telematics stack.",
  },
];

export const trustFacts = [
  {
    title: "Your Data. Your Rules.",
    description:
      "Work with your data your way. Run complex reports and analyze the full spectrum of telematics and business data that belongs to you.",
  },
  {
    title: "BI Freedom.",
    description:
      "Use built-in Dashboard Studio or connect your preferred BI tools like Power BI, Tableau, Metabase, Apache Superset, and more.",
  },
  {
    title: "AI-Ready.",
    description:
      "Leverage AI-based tools such as MCP servers, n8n flows, or AI assistants to automate processes, generate insights, and support decision-making using your telematics data.",
  },
];

export const comparisonRows = [
  {
    instead: "Wasting time stitching exports and reports together",
    canDo: "Retrieve exactly what you need in one structured query",
  },
  {
    instead: "Chaining multiple API calls just to retrieve specific data",
    canDo: "Analyze data across vehicles, drivers, geofences, tasks, and business entities",
  },
  {
    instead: "Working with fragmented dashboards",
    canDo: "Answer custom questions fast",
  },
  {
    instead: "Delayed insights with no forecasting capability",
    canDo: "Turn operational data into proactive decisions, automation, and forecasting",
  },
];

export const uspPoints = [
  {
    title: "White-label dashboards and reports",
    description:
      "Deliver branded, comprehensive analytics built on telematics and business data.",
  },
  {
    title: "Instant integration flexibility",
    description:
      "Connect to your CRM, ERP, BI tools, or data platforms using secure credentials — no complex middleware required.",
  },
  {
    title: "Direct SQL access without bottlenecks",
    description:
      "Work with your data directly in a secure environment — no rate limits, no fragmented exports.",
  },
];

export const analyticsFeatures = [
  {
    title: "Custom Dashboards & KPI Reporting",
    description:
      "Build role-based dashboards for dispatchers, operations teams, finance leaders, and executives — using your BI stack or the built-in Dashboard Studio.",
    icon: "LayoutDashboard",
    accent: false,
  },
  {
    title: "Data Modeling & Unified Metrics",
    description:
      "Combine telematics streams with business tables (users, assets, tasks, contracts) to build true operational and financial models with shared definitions across teams.",
    icon: "Database",
    accent: false,
  },
  {
    title: "Forecasting & Planning",
    description:
      "Run predictive analysis on utilization, maintenance patterns, fuel trends, demand capacity, and long-term performance.",
    icon: "TrendingUp",
    accent: true,
  },
  {
    title: "Scoring & Benchmarking",
    description:
      "Create scoring systems for drivers, assets, routes, and SLA compliance. Benchmark performance across regions, branches, and customers.",
    icon: "Award",
    accent: false,
  },
  {
    title: "Embedded Analytics",
    description:
      "Deliver analytics directly inside your own portals, applications, or partner products — powered by secure SQL access.",
    icon: "Code2",
    accent: false,
  },
  {
    title: "Operational & Historical Analysis",
    description:
      "Combine real-time KPIs with historical data to investigate anomalies, identify patterns, and continuously improve operations.",
    icon: "History",
    accent: false,
  },
];

export const dataLayers = [
  {
    label: "RAW",
    title: "Raw Device Data",
    description:
      "GPS points, sensor readings, device messages — ideal for deep technical analysis, troubleshooting, and custom pipelines.",
    items: ["GPS coordinates", "Sensor readings", "Device messages", "Raw event logs"],
    color: "cyan",
  },
  {
    label: "AGGREGATED",
    title: "Aggregated & Enriched",
    description:
      "Trips, stops, events, KPIs, utilization metrics, business-linked performance views — ready for dashboards, reporting, and executive analytics.",
    items: ["Trip summaries", "Stop analysis", "Utilization KPIs", "Business entity links"],
    color: "purple",
  },
];

export const dashboardFeatures = [
  "Dashboards powered by SQL, automatically updating with new telemetry",
  "Visual editor: analysts define queries; operators consume dashboards without coding",
  "Reports combining tables, charts, and maps from a single query",
  "Export options: HTML, Excel, PDF",
];

export const businessOutcomes = [
  {
    title: "Faster answers to complex business questions",
    icon: "Zap",
  },
  {
    title: "Reduced manual reporting and fewer data exports",
    icon: "FileX",
  },
  {
    title: "Better visibility into operational performance",
    icon: "Eye",
  },
  {
    title: "Stronger forecasting and planning",
    icon: "BarChart3",
  },
  {
    title: "Analytics that scale from dashboards to AI-driven models and embedded solutions",
    icon: "Layers",
  },
];

export const biTools = [
  "Power BI",
  "Tableau",
  "Metabase",
  "Apache Superset",
  "Grafana",
  "Looker",
];

export const faqs = [
  {
    question: "What telematics platforms does IoT Query support?",
    answer:
      "IoT Query is platform-agnostic — it connects to your existing telematics provider and unifies the data in a secure single-tenant environment. Whether you use Wialon, Geotab, Samsara, or a custom platform, we integrate directly.",
  },
  {
    question: "Do I need to replace my existing telematics system?",
    answer:
      "No. IoT Query works alongside your existing platform. It extends your monitoring capabilities with analytics without disrupting your current workflows or requiring migration.",
  },
  {
    question: "How quickly can I get my first report?",
    answer:
      "Most teams generate their first insight within 15 minutes of onboarding. Our structured data layers mean you don't need to build pipelines before querying.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. IoT Query operates in a single-tenant environment — your data is isolated, never shared, and fully under your control. We support role-based access and audit logging.",
  },
  {
    question: "Can I use my own BI tools?",
    answer:
      "Absolutely. Connect Power BI, Tableau, Metabase, Apache Superset, or any SQL-compatible tool using secure credentials. Dashboard Studio is also available if you prefer a built-in option.",
  },
  {
    question: "What AI capabilities does IoT Query support?",
    answer:
      "IoT Query is AI-ready. You can connect MCP servers, n8n automation flows, or any AI assistant that supports SQL data sources to automate insights and decision-making workflows.",
  },
];

export const pricingTiers = [
  {
    name: "Starter",
    price: "Custom",
    description: "For teams exploring telematics analytics for the first time.",
    features: [
      "Single-tenant data environment",
      "Up to 500 vehicles",
      "Dashboard Studio access",
      "Standard BI connectors",
      "Email support",
    ],
    cta: "Request a Demo",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "Custom",
    description: "For operations teams building advanced analytics workflows.",
    features: [
      "Everything in Starter",
      "Unlimited vehicles",
      "Direct SQL access",
      "Forecasting & scoring models",
      "Embedded analytics",
      "Priority support + SLA",
    ],
    cta: "Request a Demo",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large fleets and multi-tenant platform deployments.",
    features: [
      "Everything in Professional",
      "Multi-tenant architecture",
      "White-label dashboards",
      "AI / MCP integrations",
      "Dedicated success engineer",
      "Custom SLA & compliance",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];
