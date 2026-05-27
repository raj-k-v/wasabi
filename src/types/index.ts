import { LucideIcon } from "lucide-react";

export type Severity = "low" | "medium" | "high" | "critical";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface MetricCard {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: LucideIcon;
  points: number[];
}

export interface AlertItem {
  id: string;
  company: string;
  companyMark: string;
  severity: Severity;
  timestamp: string;
  title: string;
  summary: string;
  source: string;
  category: "pricing" | "hiring" | "sentiment" | "funding" | "launch";
}

export interface MonitoringEvent {
  id: string;
  status: "running" | "completed" | "signal" | "queued";
  title: string;
  detail: string;
  time: string;
}

export interface CompetitorComparison {
  id: string;
  pair: string;
  focus: string;
  pricingDelta: string;
  hiringDelta: string;
  sentiment: string;
  launches: string;
  insight: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  detail: string;
}

export interface ReportItem {
  id: string;
  title: string;
  category: string;
  updatedAt: string;
  excerpt: string;
  status: "Draft" | "Ready" | "Exported";
}

export interface SearchSuggestion {
  name: string;
  category: string;
}
