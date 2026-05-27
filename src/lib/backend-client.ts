import type { AlertItem } from "@/types";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000";
const CLIENT_FETCH_TIMEOUT_MS = 20000;

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

async function fetchBackend<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const abortExternal = () => controller.abort(init?.signal?.reason);
  const timeoutId = setTimeout(() => {
    controller.abort(new Error(`Backend request timed out after ${CLIENT_FETCH_TIMEOUT_MS}ms.`));
  }, CLIENT_FETCH_TIMEOUT_MS);

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
