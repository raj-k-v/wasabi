"use client";

import { useEffect, useState } from "react";

import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { Card } from "@/components/ui/card";
import { searchIntelligence, toAlertItems, type BackendSearchResponse } from "@/lib/backend-client";

export function LiveSearchResults({ query }: { query: string }) {
  const [result, setResult] = useState<BackendSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setResult(null);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    let cancelled = false;

    async function runSearch() {
      setLoading(true);
      setError(null);

      try {
        const response = await searchIntelligence(query, query, { signal: controller.signal });
        if (!cancelled) {
          setResult(response);
        }
      } catch (err) {
        if (cancelled || controller.signal.aborted) return;
        setResult(null);
        setError(err instanceof Error ? err.message : "Search failed.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    runSearch();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [query]);

  if (!query) {
    return (
      <EmptyState
        title="Search the backend"
        description="Run a company query above to fetch real Bright Data results and a Groq-generated intelligence summary."
      />
    );
  }

  if (loading) {
    return (
      <Card className="p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Live search result</p>
        <h2 className="mt-2 text-2xl font-semibold">Searching {query}</h2>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Fetching Bright Data results and waiting for Groq to synthesize the intelligence summary.
        </p>
      </Card>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Live search failed"
        description={error}
      />
    );
  }

  if (!result) {
    return (
      <EmptyState
        title="No search result"
        description="The backend did not return a search result for this query."
      />
    );
  }

  const generatedAlerts = toAlertItems(result.alerts);

  return (
    <Card className="p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Live search result</p>
      <h2 className="mt-2 text-2xl font-semibold">{result.company}</h2>
      <p className="mt-4 text-sm leading-7 text-slate-300">{result.summary}</p>
      <div className="mt-5 space-y-3">
        {generatedAlerts.map((alert) => (
          <div key={alert.id} className="rounded-2xl border border-white/6 bg-white/[0.03] p-4">
            <p className="text-sm font-medium text-white">{alert.title}</p>
            <p className="mt-2 text-sm text-slate-400">{alert.summary}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-3">
        {result.results.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border border-white/6 bg-white/[0.03] p-4 transition hover:border-cyan/20"
          >
            <p className="font-medium text-white">{item.title}</p>
            <p className="mt-1 text-sm text-slate-400">{item.snippet ?? item.domain ?? item.url}</p>
          </a>
        ))}
      </div>
    </Card>
  );
}
