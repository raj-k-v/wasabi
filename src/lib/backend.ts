import "server-only";

import {
  Activity,
  BellRing,
  BrainCircuit,
  Building2,
  Radar,
} from "lucide-react";

import type {
  AlertItem,
  CompetitorCardItem,
  ComparisonRow,
  MetricCardViewModel,
  MonitoringEvent,
  MonitoringStatusItem,
  ReportItem,
  SearchSuggestion,
  SignalHighlight,
  TimelineEvent,
  TrendChartsData,
} from "@/types";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000";
const SERVER_FETCH_TIMEOUT_MS = 4000;

interface BackendAlert {
  id: string;
  company: string;
  severity: "low" | "medium" | "high" | "critical";
  signal_type: string;
  summary: string;
  timestamp: string;
  read: boolean;
  source_urls: string[];
}

interface BackendDashboardStats {
  monitored_companies: number;
  active_alerts: number;
  signals_detected: number;
  reports_generated: number;
}

interface BackendDashboardActivity {
  id: string;
  message: string;
  created_at: string;
}

interface BackendDashboardResponse {
  stats: BackendDashboardStats;
  recent_signals: BackendAlert[];
  recent_activity: BackendDashboardActivity[];
}

interface BackendCompetitor {
  id: string;
  name: string;
  industry: string;
  website: string;
  risk_level: "low" | "medium" | "high" | "critical";
  signals_count: number;
  last_checked_at: string | null;
}

interface BackendMonitoringTask {
  id: string;
  company: string;
  target: string;
  target_url: string;
  frequency: string;
  status: string;
  last_run_at: string | null;
}

interface BackendSignal {
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  confidence?: number | null;
  evidence: string[];
}

interface BackendSearchResult {
  id: string;
  title: string;
  url: string;
  source: string;
  snippet?: string | null;
  rank?: number | null;
  domain?: string | null;
  published_at?: string | null;
}

export interface BackendSearchResponse {
  company: string;
  query: string;
  summary: string;
  signals: BackendSignal[];
  alerts: BackendAlert[];
  results: BackendSearchResult[];
  generated_at: string;
}

interface BackendReportListItem {
  id: string;
  title: string;
  summary: string;
  signals_count: number;
  created_at: string;
}

async function fetchBackend<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const abortExternal = () => controller.abort(init?.signal?.reason);
  const timeoutId = setTimeout(() => {
    controller.abort(new Error(`Backend request timed out after ${SERVER_FETCH_TIMEOUT_MS}ms.`));
  }, SERVER_FETCH_TIMEOUT_MS);

  if (init?.signal) {
    if (init.signal.aborted) {
      controller.abort(init.signal.reason);
    } else {
      init.signal.addEventListener("abort", abortExternal, { once: true });
    }
  }

  try {
    const response = await fetch(`${BACKEND_BASE_URL}${path}`, {
      ...init,
      cache: "no-store",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Backend request failed for ${path}: ${response.status} ${body}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error(`Backend request timed out for ${path}.`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
    init?.signal?.removeEventListener("abort", abortExternal);
  }
}

export async function getDashboard() {
  return fetchBackend<BackendDashboardResponse>("/api/dashboard");
}

export async function getAlerts(refresh = false) {
  return fetchBackend<BackendAlert[]>(`/api/alerts?refresh=${refresh ? "true" : "false"}`);
}

export async function getCompetitors() {
  return fetchBackend<BackendCompetitor[]>("/api/competitors");
}

export async function getMonitoringTasks() {
  return fetchBackend<BackendMonitoringTask[]>("/api/monitoring");
}

export async function getReports() {
  return fetchBackend<BackendReportListItem[]>("/api/reports");
}

export async function searchIntelligence(query: string, company?: string, init?: RequestInit) {
  return fetchBackend<BackendSearchResponse>("/api/search", {
    ...init,
    method: "POST",
    body: JSON.stringify({
      query,
      company: company || query,
      max_results: 5,
    }),
  });
}

export function getSettledValue<T>(result: PromiseSettledResult<T>, fallback: T): T {
  return result.status === "fulfilled" ? result.value : fallback;
}

export function toAlertItems(alerts: BackendAlert[]): AlertItem[] {
  return alerts.map((alert) => ({
    id: alert.id,
    company: alert.company,
    companyMark: getCompanyMark(alert.company),
    severity: alert.severity,
    timestamp: formatTimestamp(alert.timestamp),
    title: prettifySignalType(alert.signal_type),
    summary: alert.summary,
    source: alert.source_urls[0] ?? "AI Intelligence",
    category: normalizeAlertCategory(alert.signal_type),
  }));
}

export function toMetricCards(stats: BackendDashboardStats): MetricCardViewModel[] {
  return [
    {
      label: "Active Alerts",
      value: stats.active_alerts.toString(),
      trend: `+${Math.max(1, Math.round(stats.active_alerts / 3))}%`,
      trendUp: true,
      iconKey: "alerts",
      points: buildTrendSeries(stats.active_alerts),
    },
    {
      label: "Companies Monitored",
      value: stats.monitored_companies.toString(),
      trend: `+${Math.max(1, Math.round(stats.monitored_companies / 4))}%`,
      trendUp: true,
      iconKey: "companies",
      points: buildTrendSeries(stats.monitored_companies),
    },
    {
      label: "Signals Detected",
      value: stats.signals_detected.toString(),
      trend: `+${Math.max(1, Math.round(stats.signals_detected / 5))}%`,
      trendUp: true,
      iconKey: "signals",
      points: buildTrendSeries(stats.signals_detected),
    },
    {
      label: "Reports Generated",
      value: stats.reports_generated.toString(),
      trend: `+${Math.max(1, Math.round(Math.max(stats.reports_generated, 1) / 2))}%`,
      trendUp: true,
      iconKey: "reports",
      points: buildTrendSeries(stats.reports_generated || 1),
    },
  ];
}

export function toTimelineEvents(activities: BackendDashboardActivity[]): TimelineEvent[] {
  return activities.map((activity) => ({
    time: formatTime(activity.created_at),
    title: activity.message.split(".")[0] ?? activity.message,
    detail: activity.message,
  }));
}

export function toCompetitorCards(competitors: BackendCompetitor[]): CompetitorCardItem[] {
  return competitors.map((competitor) => ({
    id: competitor.id,
    name: competitor.name,
    industry: competitor.industry,
    website: competitor.website,
    riskLevel: competitor.risk_level,
    signalsCount: competitor.signals_count,
    lastCheckedAt: competitor.last_checked_at ? formatTimestamp(competitor.last_checked_at) : "Pending",
    insight: `${competitor.name} is being monitored in ${competitor.industry} with ${competitor.signals_count} tracked signals.`,
  }));
}

export function toMonitoringEvents(tasks: BackendMonitoringTask[]): MonitoringEvent[] {
  return tasks.map((task) => ({
    id: task.id,
    status: task.status === "active" ? "running" : task.status === "paused" ? "queued" : "completed",
    title: `Monitoring ${task.company}`,
    detail: `${task.target} checked on a ${task.frequency.replaceAll("_", " ")} cadence.`,
    time: task.last_run_at ? formatTime(task.last_run_at) : "Pending",
  }));
}

export function toMonitoringStatus(tasks: BackendMonitoringTask[], alerts: BackendAlert[]): MonitoringStatusItem[] {
  const activeTasks = tasks.filter((task) => task.status === "active");
  const activeCompanies = new Set(activeTasks.map((task) => task.company)).size;
  const highSeverityAlerts = alerts.filter((alert) => alert.severity === "high" || alert.severity === "critical").length;

  return [
    { label: "Active jobs", value: activeTasks.length.toString() },
    { label: "Companies monitored", value: activeCompanies.toString() },
    { label: "High-priority alerts", value: highSeverityAlerts.toString() },
  ];
}

export function toSignalHighlight(search: BackendSearchResponse | null, alerts: BackendAlert[]): SignalHighlight {
  if (search?.signals[0]) {
    return {
      title: prettifySignalType(search.signals[0].type),
      description: search.signals[0].message,
    };
  }

  if (alerts[0]) {
    return {
      title: prettifySignalType(alerts[0].signal_type),
      description: alerts[0].summary,
    };
  }

  return {
    title: "Waiting for fresh intelligence",
    description: "Run a company search to generate a new high-confidence signal.",
  };
}

export function toComparisonRows(competitors: BackendCompetitor[], alerts: BackendAlert[]): ComparisonRow[] {
  return competitors.map((competitor) => {
    const companyAlerts = alerts.filter((alert) => alert.company === competitor.name);
    const pricingAlerts = companyAlerts.filter((alert) => alert.signal_type.includes("pricing")).length;
    const hiringAlerts = companyAlerts.filter((alert) => alert.signal_type.includes("hiring")).length;

    return {
      company: competitor.name,
      pricing: pricingAlerts > 0 ? `${pricingAlerts} pricing signals` : "No pricing signal",
      hiring: hiringAlerts > 0 ? `${hiringAlerts} hiring signals` : "No hiring signal",
      risk: competitor.risk_level,
      launches: `${companyAlerts.length} total alerts`,
    };
  });
}

export function toHiringSignals(alerts: BackendAlert[]): string[] {
  return alerts
    .filter((alert) => alert.signal_type.includes("hiring"))
    .map((alert) => `${alert.company}: ${alert.summary}`);
}

export function toReportItems(reports: BackendReportListItem[]): ReportItem[] {
  return reports.map((report) => ({
    id: report.id,
    title: report.title,
    category: report.signals_count > 0 ? "Market intelligence" : "Generated brief",
    updatedAt: formatTimestamp(report.created_at),
    excerpt: report.summary,
    status: report.signals_count > 0 ? "Ready" : "Draft",
  }));
}

export function toSearchSuggestions(competitors: BackendCompetitor[]): SearchSuggestion[] {
  return competitors.map((competitor) => ({
    name: competitor.name,
    category: competitor.industry,
  }));
}

export function toIntelligencePanel(reports: BackendReportListItem[], dashboard: BackendDashboardResponse) {
  const leadReport = reports[0];
  if (leadReport) {
    return {
      title: leadReport.title,
      paragraphs: [
        leadReport.summary,
        `The platform is currently tracking ${dashboard.stats.monitored_companies} companies and ${dashboard.stats.active_alerts} active alerts.`,
      ],
    };
  }

  const summaries = dashboard.recent_signals.slice(0, 2).map((alert) => alert.summary);
  return {
    title: "Autonomous briefing",
    paragraphs: summaries.length > 0 ? summaries : ["No report has been generated yet. Run a search to create the first intelligence brief."],
  };
}

export function toTrendChartsData(alerts: BackendAlert[], competitors: BackendCompetitor[]): TrendChartsData {
  const pricingCount = alerts.filter((alert) => alert.signal_type.includes("pricing")).length;
  const hiringCount = alerts.filter((alert) => alert.signal_type.includes("hiring")).length;
  const criticalCount = alerts.filter((alert) => alert.severity === "critical").length;
  const highCount = alerts.filter((alert) => alert.severity === "high").length;

  return {
    pricing: [
      { name: "Mon", value: Math.max(1, pricingCount) },
      { name: "Tue", value: Math.max(1, pricingCount + 1) },
      { name: "Wed", value: Math.max(1, pricingCount + 2) },
      { name: "Thu", value: Math.max(1, pricingCount + 1) },
      { name: "Fri", value: Math.max(1, pricingCount + 3) },
      { name: "Sat", value: Math.max(1, pricingCount + 2) },
      { name: "Sun", value: Math.max(1, pricingCount + 4) },
    ],
    hiring: competitors.slice(0, 6).map((competitor, index) => ({
      name: competitor.name.slice(0, 3).toUpperCase(),
      value: Math.max(1, competitor.signals_count + index),
    })),
    sentiment: [
      { name: "Week 1", positive: 54, neutral: 28, negative: 18 },
      { name: "Week 2", positive: 58, neutral: 25, negative: 17 },
      { name: "Week 3", positive: 62, neutral: 23, negative: 15 },
      { name: "Week 4", positive: 65, neutral: 21, negative: 14 },
    ],
    frequency: [
      { name: "00h", value: Math.max(1, alerts.length - 1) },
      { name: "04h", value: Math.max(1, criticalCount) },
      { name: "08h", value: Math.max(1, highCount) },
      { name: "12h", value: Math.max(1, alerts.length) },
      { name: "16h", value: Math.max(1, alerts.length + 1) },
      { name: "20h", value: Math.max(1, Math.floor(alerts.length / 2) + 1) },
    ],
  };
}

export function toLandingStats(dashboard: BackendDashboardResponse) {
  return [
    { label: "Signals detected", value: dashboard.stats.signals_detected.toString() },
    { label: "Companies monitored", value: dashboard.stats.monitored_companies.toString() },
    { label: "Reports generated", value: dashboard.stats.reports_generated.toString() },
  ];
}

export function toShowcaseMetrics(dashboard: BackendDashboardResponse, monitoringTasks: BackendMonitoringTask[]) {
  return [
    { label: "Autonomous crawlers active", value: monitoringTasks.length.toString() },
    { label: "Intelligence summaries live", value: dashboard.stats.active_alerts.toString() },
    { label: "Reports generated", value: dashboard.stats.reports_generated.toString() },
  ];
}

export const statIconMap = {
  alerts: BellRing,
  companies: Building2,
  signals: Radar,
  reports: BrainCircuit,
};

export const showcaseIconMap = {
  monitoring: Activity,
};

function getCompanyMark(company: string) {
  return company
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function normalizeAlertCategory(signalType: string): AlertItem["category"] {
  const value = signalType.toLowerCase();
  if (value.includes("pricing")) return "pricing";
  if (value.includes("hiring")) return "hiring";
  if (value.includes("funding")) return "funding";
  if (value.includes("sentiment")) return "sentiment";
  return "launch";
}

function prettifySignalType(signalType: string) {
  return signalType
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function buildTrendSeries(seed: number) {
  const baseline = Math.max(seed, 1);
  return [0.64, 0.72, 0.68, 0.78, 0.82, 0.88, 0.91, 1].map((multiplier) =>
    Math.max(1, Math.round(baseline * multiplier)),
  );
}
