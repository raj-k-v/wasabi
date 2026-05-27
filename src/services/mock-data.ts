import {
  Activity,
  BellRing,
  BrainCircuit,
  Building2,
  Radar,
} from "lucide-react";

import type {
  AlertItem,
  CompetitorComparison,
  MetricCard,
  MonitoringEvent,
  ReportItem,
  SearchSuggestion,
  TimelineEvent,
} from "@/types";

export const metricCards: MetricCard[] = [
  {
    label: "Active Alerts",
    value: "148",
    trend: "+12.4%",
    trendUp: true,
    icon: BellRing,
    points: [12, 18, 16, 22, 24, 28, 26, 31],
  },
  {
    label: "Companies Monitored",
    value: "1,284",
    trend: "+8.1%",
    trendUp: true,
    icon: Building2,
    points: [22, 24, 27, 31, 34, 39, 42, 45],
  },
  {
    label: "Signals Detected",
    value: "3,942",
    trend: "+18.9%",
    trendUp: true,
    icon: Radar,
    points: [28, 32, 29, 36, 41, 47, 52, 56],
  },
  {
    label: "AI Insights Generated",
    value: "892",
    trend: "+6.7%",
    trendUp: true,
    icon: BrainCircuit,
    points: [8, 11, 15, 14, 18, 20, 24, 29],
  },
];

export const alerts: AlertItem[] = [
  {
    id: "a1",
    company: "Tesla",
    companyMark: "TS",
    severity: "critical",
    timestamp: "2 min ago",
    title: "Enterprise pricing page changed",
    summary: "Detected a new tier bundle with seat-based add-ons across North America.",
    source: "Pricing Crawler",
    category: "pricing",
  },
  {
    id: "a2",
    company: "OpenAI",
    companyMark: "OA",
    severity: "high",
    timestamp: "14 min ago",
    title: "Hiring spike in GTM operations",
    summary: "AI sales engineering and security roles increased by 40% week-over-week.",
    source: "Hiring Graph",
    category: "hiring",
  },
  {
    id: "a3",
    company: "Anthropic",
    companyMark: "AN",
    severity: "medium",
    timestamp: "32 min ago",
    title: "Positive sentiment acceleration",
    summary: "Developer sentiment improved after API latency improvements in product discussions.",
    source: "Sentiment Engine",
    category: "sentiment",
  },
  {
    id: "a4",
    company: "Rivian",
    companyMark: "RV",
    severity: "high",
    timestamp: "1 hr ago",
    title: "Product launch signal detected",
    summary: "Three new feature pages and updated release notes were discovered across docs.",
    source: "Launch Watcher",
    category: "launch",
  },
  {
    id: "a5",
    company: "Perplexity",
    companyMark: "PX",
    severity: "low",
    timestamp: "3 hr ago",
    title: "Funding rumor coverage increased",
    summary: "Media mentions referencing strategic investment conversations rose materially.",
    source: "News Stream",
    category: "funding",
  },
];

export const chartSeries = {
  pricing: [
    { name: "Mon", value: 32 },
    { name: "Tue", value: 36 },
    { name: "Wed", value: 34 },
    { name: "Thu", value: 40 },
    { name: "Fri", value: 52 },
    { name: "Sat", value: 49 },
    { name: "Sun", value: 56 },
  ],
  hiring: [
    { name: "Jan", value: 18 },
    { name: "Feb", value: 22 },
    { name: "Mar", value: 28 },
    { name: "Apr", value: 31 },
    { name: "May", value: 39 },
    { name: "Jun", value: 44 },
  ],
  sentiment: [
    { name: "Week 1", positive: 68, neutral: 21, negative: 11 },
    { name: "Week 2", positive: 70, neutral: 18, negative: 12 },
    { name: "Week 3", positive: 74, neutral: 16, negative: 10 },
    { name: "Week 4", positive: 77, neutral: 14, negative: 9 },
  ],
  frequency: [
    { name: "00h", value: 8 },
    { name: "04h", value: 5 },
    { name: "08h", value: 14 },
    { name: "12h", value: 22 },
    { name: "16h", value: 18 },
    { name: "20h", value: 12 },
  ],
};

export const monitoringFeed: MonitoringEvent[] = [
  {
    id: "m1",
    status: "running",
    title: "Searching Tesla",
    detail: "Cross-referencing pricing pages, careers, and changelog surfaces.",
    time: "Live",
  },
  {
    id: "m2",
    status: "signal",
    title: "Signal detected",
    detail: "New enterprise SKU naming pattern found across two product pages.",
    time: "10:43",
  },
  {
    id: "m3",
    status: "completed",
    title: "Analyzing hiring trends",
    detail: "Growth in applied AI recruiting normalized against prior 30 days.",
    time: "10:39",
  },
  {
    id: "m4",
    status: "queued",
    title: "Monitoring Anthropic docs",
    detail: "Queued to scan release notes, pricing language, and API reference diffs.",
    time: "10:51",
  },
];

export const competitors: CompetitorComparison[] = [
  {
    id: "c1",
    pair: "Tesla vs Rivian",
    focus: "EV intelligence",
    pricingDelta: "+11% Tesla",
    hiringDelta: "+24 roles Rivian",
    sentiment: "Tesla leads by 14 pts",
    launches: "2 launches this month",
    insight: "Tesla is optimizing enterprise energy packaging while Rivian is accelerating hiring in autonomy and fleet software.",
  },
  {
    id: "c2",
    pair: "OpenAI vs Anthropic",
    focus: "Foundation model market",
    pricingDelta: "Stable",
    hiringDelta: "+31 roles OpenAI",
    sentiment: "OpenAI leads by 8 pts",
    launches: "3 launch signals detected",
    insight: "OpenAI activity indicates heavier GTM scaling while Anthropic remains concentrated around research and platform reliability.",
  },
];

export const timeline: TimelineEvent[] = [
  {
    time: "10:42",
    title: "Pricing change detected",
    detail: "Tesla enterprise pricing module updated with usage-based footnotes.",
  },
  {
    time: "10:44",
    title: "AI generated alert",
    detail: "Severity classified as critical due to competitive impact and direct monetization change.",
  },
  {
    time: "10:45",
    title: "Monitoring completed",
    detail: "Cross-source validation finished across pricing, jobs, and press pages.",
  },
  {
    time: "10:49",
    title: "Competitor comparison refreshed",
    detail: "OpenAI and Anthropic scorecards were recalculated with latest market signals.",
  },
];

export const reports: ReportItem[] = [
  {
    id: "r1",
    title: "AI Infrastructure Leaders Weekly",
    category: "Market intelligence",
    updatedAt: "Updated 22 min ago",
    excerpt: "Signals across pricing, hiring, and product launches reveal a widening platform moat among top model providers.",
    status: "Ready",
  },
  {
    id: "r2",
    title: "EV Competitor Shift Report",
    category: "Competitive analysis",
    updatedAt: "Updated 2 hours ago",
    excerpt: "Tesla and Rivian moved in different directions across fleet pricing and autonomy recruiting over the last 7 days.",
    status: "Draft",
  },
  {
    id: "r3",
    title: "Enterprise AI Sentiment Snapshot",
    category: "Sentiment",
    updatedAt: "Exported today",
    excerpt: "Developer sentiment remains constructive, but pricing transparency and performance claims drive the strongest swings.",
    status: "Exported",
  },
];

export const reportMarkdown = `# OpenAI vs Anthropic Weekly Intelligence

## Executive Summary
OpenAI accelerated go-to-market activity while Anthropic concentrated on platform maturity and infrastructure reliability.

## Key Signals
- **Pricing** remained stable, but packaging language shifted toward enterprise governance.
- **Hiring** expanded fastest in security engineering and developer relations.
- **Sentiment** improved after recent reliability and latency updates.

## Recommended Actions
1. Monitor enterprise pricing copy for bundle unification.
2. Flag new partnership pages as launch-adjacent signals.
3. Prioritize alerts tied to hiring spikes in platform and GTM teams.
`;

export const suggestions: SearchSuggestion[] = [
  { name: "Tesla", category: "Automotive AI" },
  { name: "OpenAI", category: "Foundation Models" },
  { name: "NVIDIA", category: "Compute" },
  { name: "Anthropic", category: "Foundation Models" },
  { name: "Rivian", category: "Mobility" },
  { name: "Perplexity", category: "Search AI" },
];

export const landingStats = [
  { label: "Signals ingested daily", value: "18.4M" },
  { label: "Markets monitored", value: "72" },
  { label: "AI summaries generated", value: "240k+" },
];

export const showcaseMetrics = [
  {
    label: "Autonomous crawlers active",
    value: "1,248",
    icon: Activity,
  },
  {
    label: "Intelligence models orchestrated",
    value: "16",
    icon: BrainCircuit,
  },
  {
    label: "Alerts routed with context",
    value: "94%",
    icon: BellRing,
  },
];
