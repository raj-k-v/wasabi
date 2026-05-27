import { CompetitorCard } from "@/components/competitors/competitor-card";
import { ComparisonTable } from "@/components/competitors/comparison-table";
import { CompetitorTimeline } from "@/components/competitors/competitor-timeline";
import { HiringSignals } from "@/components/competitors/hiring-signals";
import { SearchBar } from "@/components/dashboard/search-bar";
import {
  getAlerts,
  getCompetitors,
  getDashboard,
  getSettledValue,
  toCompetitorCards,
  toComparisonRows,
  toHiringSignals,
  toSearchSuggestions,
  toTimelineEvents,
} from "@/lib/backend";

export default async function CompetitorsPage() {
  const [competitorsResult, alertsResult, dashboardResult] = await Promise.allSettled([
    getCompetitors(),
    getAlerts(),
    getDashboard(),
  ]);

  const competitors = getSettledValue(competitorsResult, []);
  const alerts = getSettledValue(alertsResult, []);
  const dashboard = getSettledValue(dashboardResult, {
    stats: {
      monitored_companies: 0,
      active_alerts: 0,
      signals_detected: 0,
      reports_generated: 0,
    },
    recent_signals: [],
    recent_activity: [],
  });

  return (
    <div className="space-y-6">
      <SearchBar suggestions={toSearchSuggestions(competitors)} />
      <div className="grid gap-6 xl:grid-cols-2">
        {toCompetitorCards(competitors).map((item) => (
          <CompetitorCard key={item.id} item={item} />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ComparisonTable rows={toComparisonRows(competitors, alerts)} />
        <div className="space-y-6">
          <HiringSignals signals={toHiringSignals(alerts)} />
          <CompetitorTimeline timeline={toTimelineEvents(dashboard.recent_activity)} />
        </div>
      </div>
    </div>
  );
}
